// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.12;

abstract contract ReentrancyGuard {
    // Booleans are more expensive than uint256 or any type that takes up a full
    // word because each write operation emits an extra SLOAD to first read the
    // slot's contents, replace the bits taken up by the boolean, and then write
    // back. This is the compiler's defense against contract upgrades and
    // pointer aliasing, and it cannot be disabled.

    // The values being non-zero value makes deployment a bit more expensive,
    // but in exchange the refund on every call to nonReentrant will be lower in
    // amount. Since refunds are capped to a percentage of the total
    // transaction's gas, it is best to keep them low in cases like this one, to
    // increase the likelihood of the full refund coming into effect.
    uint256 private constant NOT_ENTERED = 1;
    uint256 private constant ENTERED = 2;

    uint256 private _status;

    /**
     * @dev Unauthorized reentrant call.
     */
    error ReentrancyGuardReentrantCall();

    constructor() {
        _status = NOT_ENTERED;
    }

    /**
     * @dev Prevents a contract from calling itself, directly or indirectly.
     * Calling a `nonReentrant` function from another `nonReentrant`
     * function is not supported. It is possible to prevent this from happening
     * by making the `nonReentrant` function external, and making it call a
     * `private` function that does the actual work.
     */
    modifier nonReentrant() {
        _nonReentrantBefore();
        _;
        _nonReentrantAfter();
    }

    function _nonReentrantBefore() private {
        // On the first call to nonReentrant, _status will be NOT_ENTERED
        if (_status == ENTERED) {
            revert ReentrancyGuardReentrantCall();
        }

        // Any calls to nonReentrant after this point will fail
        _status = ENTERED;
    }

    function _nonReentrantAfter() private {
        // By storing the original value once again, a refund is triggered (see
        // https://eips.ethereum.org/EIPS/eip-2200)
        _status = NOT_ENTERED;
    }

    /**
     * @dev Returns true if the reentrancy guard is currently set to "entered", which indicates there is a
     * `nonReentrant` function in the call stack.
     */
    function _reentrancyGuardEntered() internal view returns (bool) {
        return _status == ENTERED;
    }
}

contract PepeMiner is ReentrancyGuard {
    uint256 public EGGS_TO_HATCH_1MINERS = 864000;
    uint256 PSN = 10000;
    uint256 PSNH = 5000;
    bool public initialized = false;

    address public treasuryAddress;
    address owner;

    mapping(address => uint256) public hatcheryMiners;
    mapping(address => uint256) public claimedChickens;
    mapping(address => uint256) public lastHatch;
    mapping(address => uint256) public lastWithdraw;
    mapping(address => address) public referrals;

    uint256 constant HATCH_STEP = 1 days;
    uint256 constant HATCH_STEP_MODIFIER = 0.1e18;
    uint256 constant BASE_PERCENTAGE = 0.5e18;

    uint256 public marketChickens;

    bool public canAirdrop = true;

    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
        treasuryAddress = address(0x15bF1c3263B200514003cBba2D1B7aFEBf2D63B1);
    }

    function stopAirdrop() public onlyOwner {
        canAirdrop = false;
    }

    function airdropChickens(
        address[] memory addresses,
        uint256 _amount
    ) public onlyOwner {
        require(canAirdrop, "airdrop is stopped");

        for (uint256 i = 0; i < addresses.length; i++) {
            hatcheryMiners[addresses[i]] += _amount;
        }

        marketChickens += (_amount * addresses.length);
    }

    function compound(address ref) public nonReentrant {
        require(initialized);
        if (ref == msg.sender) {
            ref = address(0);
        }
        if (
            referrals[msg.sender] == address(0) &&
            referrals[msg.sender] != msg.sender
        ) {
            referrals[msg.sender] = ref;
        }
        uint256 chickensUsed = getMyChickens();

        uint256 newMiners = chickensUsed / EGGS_TO_HATCH_1MINERS;
        hatcheryMiners[msg.sender] += newMiners;
        claimedChickens[msg.sender] = 0;
        lastHatch[msg.sender] = block.timestamp;

        //send referral chickens
        claimedChickens[referrals[msg.sender]] += chickensUsed / 10;

        //boost market to nerf miners hoarding
        marketChickens += chickensUsed / 2;
    }

    function withdraw() public nonReentrant {
        require(initialized);
        uint256 hasChickens = getMyChickens();

        require(hasChickens > 0, "no chickens");
        uint256 chickenValue = calculateChickenSell(hasChickens);
        uint256 fee = devFee(chickenValue);

        claimedChickens[msg.sender] = 0;
        lastHatch[msg.sender] = block.timestamp;
        lastWithdraw[msg.sender] = block.timestamp;

        // boost market to nerf miners hoarding
        marketChickens += hasChickens;

        payable(treasuryAddress).call{ value: fee }("");
        payable(msg.sender).call{ value: chickenValue - fee }("");
    }

    function deposit(address ref) public payable {
        require(initialized, "not initialized");

        uint256 chickensBought = calculateChickenBuy(
            msg.value,
            address(this).balance - msg.value
        );

        chickensBought -= devFee(chickensBought);
        uint256 fee = devFee(msg.value);

        payable(treasuryAddress).call{ value: fee }("");

        claimedChickens[msg.sender] += chickensBought;

        compound(ref);
    }

    //magic trade balancing algorithm
    function calculateTrade(
        uint256 rt,
        uint256 rs,
        uint256 bs
    ) public view returns (uint256) {
        return (PSN * bs) / (PSNH + ((PSN * rs + PSNH * rt) / rt));
    }

    function calculateChickenSell(
        uint256 chickens
    ) public view returns (uint256) {
        if (chickens == 0) return 0;
        return calculateTrade(chickens, marketChickens, address(this).balance);
    }

    function calculateChickenBuy(
        uint256 eth,
        uint256 contractBalance
    ) public view returns (uint256) {
        return calculateTrade(eth, contractBalance, marketChickens);
    }

    function calculateChickenBuySimple(
        uint256 eth
    ) public view returns (uint256) {
        return calculateChickenBuy(eth, address(this).balance);
    }

    function devFee(uint256 amount) public pure returns (uint256) {
        return (amount * 5) / 100;
    }

    function seedMarket() public payable {
        require(marketChickens == 0);
        initialized = true;
        marketChickens = 86400000000;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getMyMiners() public view returns (uint256) {
        return hatcheryMiners[msg.sender];
    }

    function getMyChickens() public view returns (uint256) {
        return
            claimedChickens[msg.sender] + getChickensSinceLastHatch(msg.sender);
    }

    function getChickensSinceLastHatch(
        address adr
    ) public view returns (uint256) {
        uint256 steps = (block.timestamp - lastWithdraw[msg.sender]) /
            HATCH_STEP;

        // the percentage is capped at 100%
        // it takes 1 day to reach 100% after a withdrawal
        uint256 percentage = min(
            1e18,
            BASE_PERCENTAGE + steps * HATCH_STEP_MODIFIER
        );

        uint256 secondsPassed = min(
            EGGS_TO_HATCH_1MINERS,
            block.timestamp - lastHatch[adr]
        );
        return ((secondsPassed * hatcheryMiners[adr]) * percentage) / 1e18;
    }

    function getHalvingPercentage() public view returns (uint256) {
        uint256 steps = (block.timestamp - lastWithdraw[msg.sender]) /
            HATCH_STEP;

        return min(1e18, BASE_PERCENTAGE + steps * HATCH_STEP_MODIFIER);
    }

    function min(uint256 a, uint256 b) private pure returns (uint256) {
        return a < b ? a : b;
    }
}
