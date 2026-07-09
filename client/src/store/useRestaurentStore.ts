import api from "@/lib/axios";

import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useRestaurentStore = create<any>()(
  persist(
    (set) => ({
      restaurent: null,
      searchItems: null,
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

      //add menu to menus array of restaurent
      addMenuToRestaurent: (menu: any) => {
        set((state: any) => ({
          restaurent: state.restaurent
            ? { ...state.restaurent, menus: [...state.restaurent.menus, menu] }
            : null,
        }));
      },

      updateMenuToRestaurent: (updatedMenu: any) => {
        set((state: any) => {
          if (state.restaurent) {
            const updatedMenuList = state.restaurent.menus.map((menu: any) =>
              menu._id === updatedMenu._id ? updatedMenu : menu,
            );
            return {
              restaurent: {
                ...state.restaurant,
                menus: updatedMenuList,
              }, 
            };
          }
          return state;
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
            set({ searchItems: response.data.restaurent });
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
