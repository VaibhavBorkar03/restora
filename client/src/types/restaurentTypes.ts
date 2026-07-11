export type MenuItem = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export type Restaurent = {
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

export type searchItems = {
  data: Restaurent[];
};

export type RestaurentState = {
  restaurent: Restaurent | null;
  searchItems: searchItems | null;
  appliedFilter: string[];
  singleRestaurent: Restaurent | null;
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
