import { useMutation } from "@tanstack/react-query";
import { createContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import AXIOS from "../../services";
import { UserTypes } from "../user/UserTypes";

export const useSignUpContext = () => {
  type CreateUserPayload = {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    password: string;
    confirmPassword: string;
  };

  // CREATE USER
  const useCreateNewUser = () => {
    return useMutation({
      mutationKey: ["createUserRegister"],
      mutationFn: async (payload: CreateUserPayload) => {
        const { data } = await AXIOS.post("/createUserRegister", payload, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        if (!data) {
          throw new Error("Failed to create user register");
        }
        return data;
      },
    });
  };

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      age: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();

  const createUser = useCreateNewUser();

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

      const password = methods?.getValues("password");
      const confirmPassword = methods?.getValues("confirmPassword");

      if (password !== confirmPassword) {
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
        password,
        confirmPassword,
      };

      const response = await createUser.mutateAsync(payload);

      if (response?.success) {
        toast.success(response?.message, {
          toastId: "user-toast",
          transition: Bounce,
          onClose: () => {
            navigate("/");
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

  return {
    handleSaveChange,
    methods,
  };
};

export const SignUpContext = createContext(
  {} as ReturnType<typeof useSignUpContext>
);
