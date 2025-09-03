import { create } from 'zustand';

type LoaderState = {
  loading: boolean; // True-False
  setLoading: (value: boolean) => void; // Güncellemek için fonksiyon
};
//zustand store
const useLoaderStore = create<LoaderState>(set => ({
  loading: false, // Başlangıçta kapalı olacak. default değer
  setLoading: (value: boolean) => set({ loading: value }), // Gelen değere göre güncelleyecek.
}));

export default useLoaderStore;
