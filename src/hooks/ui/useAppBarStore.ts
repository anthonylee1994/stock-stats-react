import create from 'zustand';

interface AppBarStore {
  searchMode: 'symbol' | 'name';
  value: string;
  setValue: (value: string) => void;
  toggleSearchMode: () => void;
}

export const useAppBarStore = create<AppBarStore>((set) => ({
  searchMode: 'symbol',
  value: '',
  setValue(value) {
    set({ value });
  },
  toggleSearchMode() {
    set((state) => ({
      value: '',
      searchMode: state.searchMode === 'symbol' ? 'name' : 'symbol',
    }));
  },
}));
