import { useMutation, useQuery } from "@tanstack/react-query";
import { createContext, useState } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { useAppContext } from "../../AppContext";
import AXIOS from "../../services";
import { HobbyTypes } from "../hobby/HobbyTypes";
import { UserProfile, UserTypes } from "./UserTypes";

type CreateUserPayload = {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  hobby_ids?: string[];
  password: string;
  confirmPassword: string;
};

type UpdateUserPayload = {
  userId: string;
  payload: CreateUserPayload;
};

export const useUserContext = () => {
  const [isUserDrawerOpen, setIsUserDrawerOpen] = useState(false);
  const [userDetail, setUserDetail] = useState<UserProfile | null>(null);

  const { token } = useAppContext();

  // GET ALL USERS
  const useGetAllHobbies = async () => {
    const response = await AXIOS.get("/getAllHobbies", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token,
      },
    });
    return response?.data.data;
  };

  const {
    data: hobby,
    isLoading: isLoadingHobby,
    refetch: refetchHobby,
  } = useQuery({
    queryKey: ["AllHobbies"],
    queryFn: useGetAllHobbies,
  });

  const dataHobbies = hobby?.length
    ? hobby
        ?.filter((item: HobbyTypes) => item.active)
        .map((i: HobbyTypes) => ({
          id: i._id,
          label: i.name,
        }))
    : [];

  // CREATE USER
  const useCreateNewUser = () => {
    return useMutation({
      mutationKey: ["createUser"],
      mutationFn: async (payload: CreateUserPayload) => {
        const { data } = await AXIOS.post("/createUser", payload, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        });
        if (!data) {
          throw new Error("Failed to create user");
        }
        return data;
      },
    });
  };

  // UPDATE USER
  const useUpdateUser = () => {
    return useMutation({
      mutationKey: ["updateUser"],
      mutationFn: async (args: UpdateUserPayload) => {
        const { userId, payload } = args;
        const { data } = await AXIOS.put(`/updateUser/${userId}`, payload, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        });
        if (!data) {
          throw new Error("Failed to update user");
        }
        return data;
      },
    });
  };

  // GET ALL USERS
  const useGetAllUsers = async () => {
    const response = await AXIOS.get("/getAllUsers", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token,
      },
    });
    return response?.data.data;
  };

  // REMOVE USER
  const useRemoveUser = () => {
    return useMutation({
      mutationKey: ["removeUser"],
      mutationFn: async (userId: string) => {
        const { data } = await AXIOS.delete(`/removeUser/${userId}`, {
          headers: {
            Authorization: token,
          },
        });
        if (!data) {
          throw new Error("Failed to remove user");
        }
        return data;
      },
    });
  };

  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["Users"],
    queryFn: useGetAllUsers,
  });

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      age: "",
      email: "",
      hobby_ids: [],
      password: "",
      confirmPassword: "",
    },
  });

  const handleResetData = () => {
    methods.reset();
  };

  const navigate = useNavigate();

  const createUser = useCreateNewUser();
  const updateUser = useUpdateUser();

  const handleSaveChange = async () => {
    try {
      const isValidForm = await methods.trigger();

      if (!isValidForm) {
        toast.error("Please check required fields", {
          toastId: "user-required-error",
          transition: Bounce,
        });
        return;
      }

      const password = methods?.getValues("password");
      const confirmPassword = methods?.getValues("confirmPassword");

      if (password !== confirmPassword) {
        // setIsUserDrawerOpen(false);
        toast.error("Password not match!", {
          toastId: "user-password-error",
          transition: Bounce,
        });

        // setTimeout(() => {
        //   location.reload();
        // }, 2000);
        return;
      }

      const payload: UserTypes = {
        firstName: methods?.getValues("firstName"),
        lastName: methods?.getValues("lastName"),
        age: Number(methods?.getValues("age")),
        email: methods?.getValues("email"),
        hobby_ids: methods?.getValues("hobby_ids"),
        password,
        confirmPassword,
      };

      let response: any;
      if (userDetail?._id) {
        response = await updateUser.mutateAsync({
          userId: userDetail._id,
          payload,
        });
      } else {
        response = await createUser.mutateAsync(payload);
      }

      if (response?.success) {
        toast.success(response?.message, {
          toastId: "user-toast",
          transition: Bounce,
          onClose: () => {
            refetch();
            setIsUserDrawerOpen(false);
            setUserDetail(null);
            methods.reset();
          },
        });
      } else {
        toast.error(response?.message, {
          toastId: "user-failed",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.warn(error);
    }
  };

  // HANDLE REMOVE USER
  const removeUserMutation = useRemoveUser();
  const handleRemoveUser = async (userId: string) => {
    try {
      const response = await removeUserMutation.mutateAsync(userId);
      if (response?.success) {
        toast.success(response?.message, {
          toastId: "remove-user-success",
          transition: Bounce,
          onClose: () => refetch(),
        });
      } else {
        toast.error(response?.message, {
          toastId: "remove-user-failed",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.warn("Failed to remove user:", error);
    }
  };

  return {
    handleSaveChange,
    handleRemoveUser,
    handleResetData,
    methods,
    userDetail,
    setUserDetail,
    isUserDrawerOpen,
    setIsUserDrawerOpen,
    users,
    isLoading,
    dataHobbies,
  };
};

export const UserContext = createContext(
  {} as ReturnType<typeof useUserContext>
);
