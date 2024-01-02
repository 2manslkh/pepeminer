import type { PepeMinerData } from "../stores";
import {
    type Chain,
    getAccount,
    getNetwork,
    readContracts,
    readContract,
} from "@wagmi/core";
import { getPepeMiner } from "../generated";


export async function fetchPepeMiningData(): Promise<PepeMinerData> {
    let network = await getNetwork();
    let account = await getAccount();
    if (!account.address) {
        return {
            user_chickens: 0n,
            contract_balance: 0n,
            user_miners: 0n,
            halving_percentage: 0n,
            chickens_since_last_hatch: 0n
        }
    };

    // Get currently connected chain
    let chain: Chain = network.chain as Chain;
    let pepeContract = getPepeMiner({ chainId: chain.id as any });

    let results = await readContracts({
        contracts: [
            { ...pepeContract, functionName: "getBalance" },
            { ...pepeContract, functionName: "getHalvingPercentage" },
            { ...pepeContract, functionName: "getChickensSinceLastHatch", args: [account.address] },
        ],
    });

    let _data: PepeMinerData = {
        contract_balance: results[0].result as bigint,
        halving_percentage: results[1].result as bigint,
        chickens_since_last_hatch: results[2].result as bigint,
    };

    // Get user chickens
    let userChickens = await readContract({
        address: pepeContract.address,
        abi: pepeContract.abi,
        chainId: chain.id as any,
        functionName: "getMyChickens",
        account: account.address,
    });

    _data.user_chickens = userChickens;

    // Get user miners
    let userMiners = await readContract({
        address: pepeContract.address,
        abi: pepeContract.abi,
        chainId: chain.id as any,
        functionName: "getMyMiners",
        account: account.address,
    });

    _data.user_miners = userMiners;

    // Get user Profit
    let userProfit = await readContract({
        address: pepeContract.address,
        abi: pepeContract.abi,
        chainId: chain.id as any,
        functionName: "calculateChickenSell",
        args: [userChickens],
        account: account.address,
    });
    _data.user_profit = userProfit;

    // Get user Profit
    let claimPower = await readContract({
        address: pepeContract.address,
        abi: pepeContract.abi,
        chainId: chain.id as any,
        functionName: "getHalvingPercentage",
        account: account.address,
    });
    _data.claim_power = claimPower;


    return _data;
}