import { create } from 'zustand';

type QtyState = {
  /** ürün id -> adet */
  qtyById: Record<number, number>;
  /** ürünün mevcut adedi (yoksa 1 döner) */
  getQty: (id: number) => number;
  /** ürüne yeni adet yaz */
  setQty: (id: number, value: number) => void;
  inc: (id: number) => void;
  dec: (id: number, min?: number) => void;
};

export const useQtyStore = create<QtyState>((set, get) => ({
  qtyById: {},

  getQty: id => get().qtyById[id] ?? 1,

  setQty: (id, value) =>
    set(s => ({
      qtyById: { ...s.qtyById, [id]: Math.max(1, Math.floor(value)) },
    })),

  inc: id => {
    const cur = get().getQty(id);
    set(s => ({ qtyById: { ...s.qtyById, [id]: cur + 1 } }));
  },

  dec: (id, min = 1) => {
    const cur = get().getQty(id);
    set(s => ({ qtyById: { ...s.qtyById, [id]: Math.max(min, cur - 1) } }));
  },
}));
