// src/context/cart.tsx
import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";

export type CartItem = {
  id: string;          // stable unique id (ex: "intl-headlight-right")
  name: string;
  unitPrice: number;   // dollars (ex: 440)
  quantity: number;
  partNumber?: string;
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: "ADD"; item: Omit<CartItem, "quantity">; qty?: number }
  | { type: "SET_QTY"; id: string; quantity: number }
  | { type: "REMOVE"; id: string }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; state: CartState };

const STORAGE_KEY = "fleetforge_cart_v1";

function clampQty(n: number) {
  if (!Number.isFinite(n)) return 1;
  return Math.max(1, Math.min(99, Math.floor(n)));
}

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return action.state;

    case "ADD": {
      const qty = clampQty(action.qty ?? 1);
      const existing = state.items.find((i) => i.id === action.item.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.item.id ? { ...i, quantity: clampQty(i.quantity + qty) } : i
          ),
        };
      }
      return { items: [...state.items, { ...action.item, quantity: qty }] };
    }

    case "SET_QTY": {
      const q = clampQty(action.quantity);
      return { items: state.items.map((i) => (i.id === action.id ? { ...i, quantity: q } : i)) };
    }

    case "REMOVE":
      return { items: state.items.filter((i) => i.id !== action.id) };

    case "CLEAR":
      return { items: [] };

    default:
      return state;
  }
}

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  setQty: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;

  subtotal: number; // dollars
  itemCount: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  // Load from localStorage once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as CartState;
      if (parsed?.items && Array.isArray(parsed.items)) {
        dispatch({ type: "HYDRATE", state: parsed });
      }
    } catch {
      // ignore bad storage
    }
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore quota errors
    }
  }, [state]);

  const subtotal = useMemo(() => {
    return state.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  }, [state.items]);

  const itemCount = useMemo(() => {
    return state.items.reduce((sum, i) => sum + i.quantity, 0);
  }, [state.items]);

  const value: CartContextValue = {
    items: state.items,
    addItem: (item, qty) => dispatch({ type: "ADD", item, qty }),
    setQty: (id, quantity) => dispatch({ type: "SET_QTY", id, quantity }),
    removeItem: (id) => dispatch({ type: "REMOVE", id }),
    clearCart: () => dispatch({ type: "CLEAR" }),

    subtotal,
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
