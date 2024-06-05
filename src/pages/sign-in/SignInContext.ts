import { createContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import AXIOS from "../../services";

export const useSignInContext = () => {
  const [loading, setLoading] = useState(false);
  // LOGIN
  const handleLoginUser = async (payload: any) => {
    const response = await AXIOS.post("/loginUser", payload);
    return response;
  };

  // GET USER PROFILE
  const handleUserProfile = async (token: string) => {
    const response = await AXIOS.get("/meProfile", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  };

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      // Check error form
      const isValidForm = await methods.trigger();
      if (!isValidForm) {
        toast.error("Please check required fields", {
          toastId: "sign-in-error",
          transition: Bounce,
        });
        return;
      }
      setLoading((prev) => !prev);

      // Get values email and password
      const email = methods?.getValues("email");
      const password = methods?.getValues("password");

      const payload = {
        email: email,
        password: password,
      };

      const response = await handleLoginUser(payload);
      const { data } = response;
      if (data?.success) {
        localStorage.setItem("token", `Bearer ${data.token}`);

        // RESPONSE USER PROFILE
        const responseUserProfile = await handleUserProfile(data?.token);

        if (responseUserProfile?.data?.success) {
          localStorage.setItem(
            "me",
            JSON.stringify(responseUserProfile?.data?.data)
          );

          toast.success(data?.message, {
            toastId: "profile-success",
            transition: Bounce,
            onClose: () => {
              setLoading((prev) => !prev);
              navigate("/users");
            },
          });
        } else {
          toast.error(data?.message, {
            toastId: "profile-failed",
            transition: Bounce,
          });
        }
      }
    } catch (error) {
      console.warn(error);
      toast.error("Login failed!", {
        toastId: "profile-failed",
        transition: Bounce,
      });
      setLoading((prev) => !prev);
    }
  };

  return {
    methods,
    handleLogin,
    loading,
  };
};

export const SignInContext = createContext(
  {} as ReturnType<typeof useSignInContext>
);
