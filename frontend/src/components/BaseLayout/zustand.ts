import { create } from 'zustand'

type tokenUseStoreType = {
  token: string,
  updateToken: (newToken: string) => void
}

export const tokenUseStore = create<tokenUseStoreType>((set) => ({
  token: '',
  updateToken: (newToken: string) => set({ token: newToken }),
}));