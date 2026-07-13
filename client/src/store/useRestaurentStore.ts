import api from "@/lib/axios";
import { Order } from "@/types/orderTypes";
import { MenuItem, RestaurentState } from "@/types/restaurentTypes";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useRestaurentStore = create<RestaurentState>()(
  persist(
    (set, get) => ({
      restaurent: null,
      searchItems: null,
      appliedFilter: [],
      singleRestaurent: null,
      restaurentOrders: [],
      //create restaurent
      createRestaurent: async (formData: FormData) => {
        try {
          const response = await api.post("/api/v1/restaurant", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          if (response.data.success) {
            toast.success(response.data.message);
          }
        } catch (error: any) {
          toast.error(error?.response.data.message);
        }
      },

      //update restaurent
      updateRestaurent: async (formData: FormData) => {
        try {
          const response = await api.put(`/api/v1/restaurant`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          if (response.data.success) {
            // set({ restaurent: response.data.restaurent });
            toast.success(response.data.message);
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
        }
      },

      //get restaurent
      getRestaurent: async () => {
        try {
          const response = await api.get(`/api/v1/restaurant`);
          if (response.data.success) {
            set({ restaurent: response.data.restaurent });
            toast.success(response.data.message);
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
        }
      },

      getRestaurentById: async (id: string) => {
        try {
          const response = await api.get(`/api/v1/restaurant/${id}`);
          if (response.data.success) {
            set({ singleRestaurent: response.data.restaurent });
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
        }
      },

      //add menu to menus array of restaurent
      addMenuToRestaurent: (menu: any) => {
        set((state: any) => ({
          restaurent: state.restaurent
            ? { ...state.restaurent, menus: [...state.restaurent.menus, menu] }
            : null,
        }));
      },

      updateMenuToRestaurent: (updatedMenu: MenuItem) => {
        //updatemenu coming from menu store
        set((state: any) => {
          if (state.restaurent) {
            const updatedMenuList = state.restaurent.menus.map((menu: any) =>
              menu._id === updatedMenu._id ? updatedMenu : menu,
            );
            return {
              //create new restaurent object { restaname : restora, menu : [ pizz, burger ,...]}
              restaurent: {
                ...state.restaurent,
                menus: updatedMenuList,
              },
            };
          }
          return state; //if there is no state so keep empty
        });
      },

      //search restaurnet
      searchRestaurent: async (
        searchText: string,
        searchQuery: string,
        selectedCuisine: any,
      ) => {
        try {
          const params = new URLSearchParams();
          params.set("searchQuery", searchQuery);
          params.set("selectedCuisine", selectedCuisine.join(","));
          const response = await api.get(
            `/api/v1/restaurant/search/${searchText}?${params.toString()}`,
          );
          if (response.data.success) {
            // console.log(r1", response.data);
            set({ searchItems: response.data });
          }
        } catch (error: any) {
          toast.error(error);
        }
      },

      setAppliedFilter: (value: string) => {
        set((state) => {
          const isAlreadyApplied = state.appliedFilter.includes(value);
          const updatedFilter = isAlreadyApplied
            ? state.appliedFilter.filter((item) => item !== value)
            : [...state.appliedFilter, value];
          return { appliedFilter: updatedFilter };
        });
      },

      resetAppliedFilter: () => {
        set({ appliedFilter: [] });
      },

      getRestaurentOrders: async () => {
        try {
          const response = await api.get(`/api/v1/restaurant/orders`);
          if (response.data.success) {
            set({ restaurentOrders: response.data.orders });
          }
        } catch (error: any) {
          toast.error(error);
        }
      },

      updateOrderStatus: async (orderId: string, status: string) => {
        try {
          const response = await api.put(
            `/api/v1/restaurant/order/${orderId}/status`,
            { status },
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
          );
          if (response.data.success) {
            const updatedOrder = get().restaurentOrders.map((order: Order) => {
              return order._id === orderId
                ? { ...order, status: response.data.status }
                : order;
            });
            set({ restaurentOrders: updatedOrder });
          }
        } catch (error: any) {
          toast.error(error);
        }
      },
    }),
    {
      name: "restaurent-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
