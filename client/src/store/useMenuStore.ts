import api from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useRestaurentStore } from "./useRestaurentStore";

export const useMenuStore = create<any>()(
  persist(
    (set) => ({
      menu: null,

      //add menu
      addMenu: async (formData: FormData) => {
        try {
          const response = await api.post(`/api/v1/menu/add`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          if (response.data.success) {
            toast.success(response.data.message);
            set({ menu: response.data.menu });
          }

          useRestaurentStore.getState().addMenuToRestaurent(response.data.menu);
        } catch (error: any) {
          toast.error(error.response.data.message);
        }
      },

      //edit menu
      editMenu: async (menuId: string, formData: FormData) => {
        try {
          const response = await api.put(
            `/api/v1/menu/edit/${menuId}`,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            },
          );
          if (response.data.success) {
            toast.success(response.data.message);
            set({ menu: response.data.menu });
          }

          useRestaurentStore
            .getState()
            .updateMenuToRestaurent(response.data.menu);
        } catch (error: any) {
          toast.error(error.response.data.message);
        }
      },
    }),

    {
      name: "menu-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
