import api from "@/lib/axios";
import { CheckoutSessionRequest, OrderState } from "@/types/orderTypes";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      orders: [],
      createCheckoutSession: async (
        checkoutSession: CheckoutSessionRequest,
      ) => {
        try {
          const response = await api.post(
            `/api/v1/order/checkout/checkout-session`,
            checkoutSession,
            { headers: { "Content-Type": "application/json" } },
          );
          console.log("response", response);
          console.log("response.data.session.url", response.data.session.url);

          console.log("indow.location.href", window.location.href);

          window.location.href = response.data.session.url;
        } catch (error: any) {
          toast.error(error.response.data.message);
          console.log(error);
        }
      },
      getOrderDetails: async () => {
        try {
          const response = await api.get(`/api/v1/order`);
          set({ orders: response.data.orders });
        } catch (error: any) {
          toast.error(error.response.data.message);
        }
      },
    }),
    {
      name: "order-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
