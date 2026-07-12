import { CartState } from "@/types/cartTypes";
import { MenuItem } from "@/types/restaurentTypes";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (item: MenuItem) => {
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem._id === item._id,
          ); //it match means itemx is there

          if (existingItem) {
            // if item existing so we increase quantity
            return {
              cart: state?.cart.map((cartItem) =>
                cartItem._id === item._id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem,
              ),
            };
          } else {
            return {
              cart: [...state.cart, { ...item, quantity: 1 }], //imp , keep in mind
            };
          }
        });
      },

      clearCart: () => {
        set({ cart: [] });
      },
      removeFromCart: (id: string) => {
        set((state) => ({
          cart: state.cart.filter((item) => item._id !== id),
        }));
      },
      incrementQuantity: (id: string) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item._id === id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        }));
      },

      decrementQuantity: (id: string) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item._id === id && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          ),
        }));
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
