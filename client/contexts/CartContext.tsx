import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import type { OrderItem, Product } from "@shared/api";

interface CartState {
  items: OrderItem[];
}

type Action =
  | { type: "add"; product: Product; quantity?: number }
  | { type: "remove"; productId: string }
  | { type: "set"; items: OrderItem[] }
  | { type: "clear" };

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "add": {
      const qty = action.quantity ?? 1;
      const existing = state.items.find((i) => i.productId === action.product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.productId === action.product.id ? { ...i, quantity: i.quantity + qty } : i,
          ),
        };
      }
      return {
        items: [
          ...state.items,
          {
            productId: action.product.id,
            name: action.product.name,
            unitPrice: action.product.price,
            quantity: qty,
            image: action.product.image,
          },
        ],
      };
    }
    case "remove":
      return { items: state.items.filter((i) => i.productId !== action.productId) };
    case "set":
      return { items: action.items };
    case "clear":
      return { items: [] };
    default:
      return state;
  }
}

const CartCtx = createContext<{
  state: CartState;
  add: (p: Product, quantity?: number) => void;
  remove: (id: string) => void;
  clear: () => void;
} | null>(null);

const STORAGE_KEY = "cart.v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  // Load
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.items)) dispatch({ type: "set", items: parsed.items });
      }
    } catch {}
  }, []);

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  const api = useMemo(
    () => ({
      state,
      add: (p: Product, q?: number) => dispatch({ type: "add", product: p, quantity: q }),
      remove: (id: string) => dispatch({ type: "remove", productId: id }),
      clear: () => dispatch({ type: "clear" }),
    }),
    [state],
  );

  return <CartCtx.Provider value={api}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
