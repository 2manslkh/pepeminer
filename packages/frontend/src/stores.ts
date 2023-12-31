import { readable, writable } from "svelte/store";

import type { GetAccountResult } from "@wagmi/core";
import type { Web3Modal } from "@web3modal/wagmi/dist/types/src/client";

export const wagmiClient = writable();
export const account = writable<GetAccountResult>();
export const web3Modal = writable<Web3Modal>();
export const signature = writable<string>("");
export const typedSignature = writable<string>("");


export const input = writable<string>("");
export const amountDeposited = writable<bigint>(0n);
export type PepeMinerData = {
    user_chickens: bigint,
    contract_balance: bigint,
    user_miners: bigint,
    halving_percentage: bigint,
    chickens_since_last_hatch: bigint
};
export const data = writable<PepeMinerData>({
    user_chickens: 0n,
    contract_balance: 0n,
    user_miners: 0n,
    halving_percentage: 0n,
    chickens_since_last_hatch: 0n
});


export const toasts = writable<Toast[]>([]);
export const showToast = writable<boolean>(false);


interface Toast {
    id?: number;
    type: "info" | "success" | "error";
    dismissible?: boolean;
    timeout?: number;
    message?: string;
}

export const addToast = (toast: Toast) => {
    // Create a unique ID so we can easily find/remove it
    // if it is dismissible/has a timeout.
    const id = Math.floor(Math.random() * 10000);

    // Setup some sensible defaults for a toast.
    const defaults: Toast = {
        id,
        type: "info",
        dismissible: true,
        timeout: 3000,
        message: "NO MESSAGE SET"
    };

    // Push the toast to the top of the list of toasts
    toasts.update((all) => [{ ...defaults, ...toast }, ...all]);

    // If toast is dismissible, dismiss it after "timeout" amount of time.
    if (toast.timeout) setTimeout(() => dismissToast(id), toast.timeout);
};

export const dismissToast = (id: number) => {
    toasts.update((all) => all.filter((t) => t.id !== id));
};
