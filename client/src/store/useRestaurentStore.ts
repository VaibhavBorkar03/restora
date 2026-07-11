import api from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type MenuItem = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

type Restaurent = {
  _id: string;
  restaurentName: string;
  user: string;
  city: string;
  country: string;
  deliveryTime: number;
  menus: MenuItem[];
  imageUrl: string;
  cuisines: string[];
};

type searchItems = {
  data: Restaurent[];
};

type RestaurentState = {
  restaurent: Restaurent | null;
  searchItems: searchItems | null;
  appliedFilter: string[];
  createRestaurent: (formData: FormData) => Promise<void>;
  updateRestaurent: (formData: FormData) => Promise<void>;
  getRestaurent: () => Promise<void>;
  getRestaurentById: (restaurentId: string) => Promise<void>;
  addMenuToRestaurent: (menu: MenuItem) => void;
  updateMenuToRestaurent: (updatedMenu: MenuItem) => void;
  searchRestaurent: (
    searchText: string,
    searchQuery: string,
    selectedCuisine: any,
  ) => Promise<void>;
  setAppliedFilter: (value: string) => void;
  resetAppliedFilter: () => void;
};

export const useRestaurentStore = create<RestaurentState>()(
  persist(
    (set) => ({
      restaurent: null,
      searchItems: null,
      appliedFilter: [],
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

      getRestaurentById: async (restaurentId: string) => {
        try {
          const response = await api.get(`/api/v1/restaurant/${restaurentId}`);
          if (response.data.success) {
            console.log(response.data);
          }
        } catch (error: any) {
          toast.error(error);
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

      
    }),
    {
      name: "restaurent-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
