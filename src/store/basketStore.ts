// src/store/basketStore.ts
import { create } from 'zustand';
import type { Product } from '../apı/models/Products';

export type CartItem = { product: Product; qty: number };

type BasketState = {
  items: CartItem[];

  // actions
  add: (p: Product, qty?: number) => void;
  remove: (id: number) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void; // 0'a inerse otomatik siler
  setQty: (id: number, qty: number) => void;
  clear: () => void;

  // selectors/helpers
  total: () => number;
  getQty: (id: number) => number;
  has: (id: number) => boolean;
};

export const useBasketStore = create<BasketState>((set, get) => ({
  items: [],

  add: (p, qty = 1) =>
    set(state => {
      const idx = state.items.findIndex(ci => ci.product.id === p.id);
      if (idx === -1) return { items: [...state.items, { product: p, qty }] };

      const next = [...state.items];
      next[idx] = { ...next[idx], qty: next[idx].qty + qty };
      return { items: next };
    }),

  remove: id =>
    set(state => ({ items: state.items.filter(ci => ci.product.id !== id) })),

  increment: id =>
    set(state => ({
      items: state.items.map(ci =>
        ci.product.id === id ? { ...ci, qty: ci.qty + 1 } : ci,
      ),
    })),

  decrement: id =>
    set(state => ({
      items: state.items
        .map(ci => (ci.product.id === id ? { ...ci, qty: ci.qty - 1 } : ci))
        .filter(ci => ci.qty > 0), // 0 olanı listeden at
    })),

  setQty: (id, qty) =>
    set(state => ({
      items: state.items.map(ci =>
        ci.product.id === id ? { ...ci, qty: Math.max(1, qty) } : ci,
      ),
    })),

  clear: () => set({ items: [] }),

  total: () =>
    get().items.reduce((sum, ci) => sum + ci.product.price * ci.qty, 0),

  getQty: id => get().items.find(ci => ci.product.id === id)?.qty ?? 0,

  has: id => get().items.some(ci => ci.product.id === id),
}));
