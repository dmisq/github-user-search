import { create } from 'zustand'

interface AppState {
  searchInput: string
  setSearchInput: (input: string) => void
  currentSearchQuery: string
  setCurrentSearchQuery: (query: string) => void
}

const useSearchStore = create<AppState>((set) => ({
  searchInput: '',
  setSearchInput: (input) => set({ searchInput: input }),
  currentSearchQuery: '',
  setCurrentSearchQuery: (query) => set({ currentSearchQuery: query }),
}))

export default useSearchStore
