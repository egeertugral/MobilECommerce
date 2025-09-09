import { create } from 'zustand';
import type { Product } from '../apı/models/Products';

/**
 * Çok basit global favori store'u.
 * items: favorideki ürünler
 * toggle: varsa çıkarır, yoksa ekler
 * isFavorite: UI'da kalp rengini belirlemek için
 */
type FavoritesState = {
  items: Product[];
  add: (p: Product) => void;
  remove: (id: number) => void;
  toggle: (p: Product) => void;
  isFavorite: (id: number) => boolean;
  clear: () => void;
};

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  items: [],

  add: p => set(s => (get().isFavorite(p.id) ? s : { items: [...s.items, p] })),

  remove: id => set(s => ({ items: s.items.filter(x => x.id !== id) })),

  toggle: p => (get().isFavorite(p.id) ? get().remove(p.id) : get().add(p)),

  isFavorite: id => !!get().items.find(x => x.id === id),

  clear: () => set({ items: [] }),
}));
