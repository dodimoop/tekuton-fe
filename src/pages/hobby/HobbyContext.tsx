import { useMutation, useQuery } from "@tanstack/react-query";
import { createContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { useAppContext } from "../../AppContext";
import AXIOS from "../../services";
import { HobbyTypes } from "./HobbyTypes";

export const useHobbyContext = () => {
  const { token } = useAppContext();

  const [isHobbyDrawerOpen, setIsHobbyDrawerOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [detailHobby, setDetailHobby] = useState<HobbyTypes | null>(null);

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

  // CREATE HOBBY
  const useCreateNewHobby = () => {
    return useMutation({
      mutationKey: ["createHobby"],
      mutationFn: async (payload) => {
        const { data } = await AXIOS.post("/createHobby", payload, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        });
        if (!data) {
          throw new Error("Failed to create hobby");
        }
        return data;
      },
    });
  };

  // UPDATE HOBBY
  const useUpdateHobby = () => {
    return useMutation({
      mutationKey: ["updateHobby"],
      mutationFn: async (args: { userId: string; payload: any }) => {
        const { userId, payload } = args;
        const { data } = await AXIOS.put(`/updateHobby/${userId}`, payload, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        });
        if (!data) {
          throw new Error("Failed to update hobby");
        }
        return data;
      },
    });
  };

  // REMOVE USER
  const useRemoveHobby = () => {
    return useMutation({
      mutationKey: ["removeHobby"],
      mutationFn: async (userId: string) => {
        const { data } = await AXIOS.delete(`/removeHobby/${userId}`, {
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
    data: dataHobby,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["Hobbies"],
    queryFn: useGetAllHobbies,
  });

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      active: true,
    },
  });

  const handleResetData = () => {
    methods.reset();
  };

  const navigate = useNavigate();
  const createHobby = useCreateNewHobby();
  const updateHobby = useUpdateHobby();

  const handleSaveChange = async () => {
    try {
      const isValidForm = await methods.trigger();

      if (!isValidForm) {
        toast.error("Please check required fields", {
          toastId: "sign-in-error",
          transition: Bounce,
        });
        return;
      }

      const payload: any = {
        name: methods?.getValues("name"),
        active: methods?.getValues("active"),
      };

      let response: any;
      if (detailHobby?._id) {
        response = await updateHobby.mutateAsync({
          userId: detailHobby._id,
          payload,
        });
      } else {
        response = await createHobby.mutateAsync(payload);
      }

      if (response?.success) {
        toast.success(response?.message, {
          toastId: "create-hobby-success",
          transition: Bounce,
          onClose: () => {
            refetch();
            methods.reset();
            setIsHobbyDrawerOpen(false);
          },
        });
      } else {
        toast.error(response?.message, {
          toastId: "create-hobby-failed",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.warn(error);
    }
  };

  // HANDLE REMOVE USER
  const removeUserMutation = useRemoveHobby();
  const handleRemoveHobby = async (id: string) => {
    try {
      const response = await removeUserMutation.mutateAsync(id);
      if (response?.success) {
        toast.success(response?.message, {
          toastId: "remove-hobby-success",
          transition: Bounce,
          onClose: () => {
            location.reload();
          },
        });
      } else {
        toast.error(response?.message, {
          toastId: "remove-hobby-failed",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.warn("Failed to remove hobby:", error);
    }
  };

  return {
    handleSaveChange,
    handleRemoveHobby,
    handleResetData,
    methods,
    dataHobby,
    detailHobby,
    setDetailHobby,
    isHobbyDrawerOpen,
    setIsHobbyDrawerOpen,
    isLoading,
    openDialog,
    setOpenDialog,
  };
};

export const HobbyContext = createContext(
  {} as ReturnType<typeof useHobbyContext>
);
