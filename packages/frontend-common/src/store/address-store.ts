import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Address } from "../types/orders";

type AddressState = {
  // The last shipping address used at checkout, offered again next time
  address: Address | null;
  save: (address: Address) => void;
  clear: () => void;
};

export const useAddressStore = create<AddressState>()(
  persist(
    (set) => ({
      address: null,
      save: (address) => set({ address }),
      clear: () => set({ address: null }),
    }),
    { name: "oam:shipping-address", storage: createJSONStorage(() => localStorage) },
  ),
);
