import api from "@/lib/axios";
import { SignUpInputState } from "@/schema/userSchema";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type User = {
  //ts -> is used to set the shape of your data or fields
  //we set the type of user that  is came from backend
  fullname: string;
  email: string;
  contact: Number;
  address: string;
  city: string;
  country: string;
  profilePicture: string;
  admin: boolean;
  isVerified: boolean;
};

type UserState = {
  //this define the type of this glbal store
  user: User | null;
  isAuthenticated: boolean;
  checkingAuth: boolean;
  loading: boolean;
  setUser: (user: User | null) => void;
  setAuthenticated: (value: boolean) => void;
  signup: (input: SignUpInputState) => Promise<boolean>;
  verifyEmail: (verificationCode: string) => Promise<boolean>;
  checkAuthentication: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  updateProfile: (formData: FormData) => Promise<void>;

  // login: (input: LoginInputState) => Promise<boolean>;
  // logout: () => Promise<any>;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      checkingAuth: true,
      loading: false,

      setUser: (user) => {
        set({ user });
      },
      setAuthenticated: (value) => {
        set({ isAuthenticated: value });
      },
      //api integration/implemention
      signup: async (input: SignUpInputState) => {
        try {
          set({ loading: true });
          const response = await api.post(`/api/v1/user/signup`, input, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.data.success) {
            
            toast.success(response.data.message);
            set({
              loading: false,
            });
            return true;
          }
          return false;
        } catch (error: any) {
          set({ loading: false });
          toast.error(error?.response?.data.message);
          return false;
        }
      },

      verifyEmail: async (verificationCode: string) => {
        try {
          set({ loading: true });
          const response = await api.post(
            `/api/v1/user/verify-email`,
            { verificationCode },
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
          );
          if (response.data.success) {
            toast.success(response.data.message);
            set({
              loading: false,
              user: response.data.user,
              isAuthenticated: true,
            });
            return true;
          }
          return false;
        } catch (error: any) {
          set({ loading: false });
          toast.error(error?.response?.data.message);
          return false;
        }
      },

      // login: async (input: LoginInputState) => {
      //   try {
      //     set({ loading: true });
      //     const response = await api.post(`/api/v1/user/login`, input, {
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //     });
      //     if (response.data.success) {
      

      //       toast.success(response.data.message);
      //       set({
      //         loading: false,
      //         isAuthenticated: true,
      //         user: response.data.user,
      //       });
      //       return true;
      //     }
      //     return false;
      //     // return response;
      //   } catch (error: any) {
      //     set({ loading: false });
      //     toast.error(error?.response?.data.message);
      //     return false;
      //   }
      // },

      // logout: async () => {
      //   try {
      //     set({ loading: true });
      //     const response = await api.post(`/api/v1/user/logout`);
      //     if (response.data.success) {
      //       toast.success(response.data.message);
      //       set({ loading: false, isAuthenticated: false, user: null });
      //     }
      //     return response;
      //   } catch (error: any) {
      //     set({ loading: false });
      //     toast.error(error.response.data.message);
      //     return false;
      //   }
      // },

      checkAuthentication: async () => {
        try {
          set({ checkingAuth: true });
          const response = await api.get(`/api/v1/user/check-auth`);
          if (response.data.success) {
            // toast.success(response.data.message);
            set({
              isAuthenticated: true,
              user: response.data.user,
              checkingAuth: false,
            });
          }
        } catch (error: any) {
          set({ checkingAuth: false, isAuthenticated: false, user: null });
          // toast.error(error.response.data.message);
        }
      },

      forgotPassword: async (email: string) => {
        try {
          set({ loading: true });
          const response = await api.post(`/api/v1/user/forgot-password`, {
            email,
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({
              loading: false,
            });
          }
        } catch (error: any) {
          set({ loading: false });
          toast.error(error.response.data.message);
        }
      },

      resetPassword: async (token: string, newPassword: string) => {
        try {
          set({ loading: true });
          const response = await api.post(
            `/api/v1/user/reset-password/${token}`,
            { newPassword },
          );
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false });
          }
        } catch (error: any) {
          set({ loading: false });
          toast.error(error.response.data.message);
        }
      },

      updateProfile: async (formData: FormData) => {
        try {
          const response = await api.put(
            `/api/v1/user/profile/update`,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            },
          );
          if (response.data.success) {
            
            toast.success(response.data.message);
            set({ user: response.data.user });
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
        }
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
