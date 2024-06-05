import { createContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserProfile } from "./pages/sign-in/SignInTypes";

export const useAppContext = () => {
  const tokenStorage = window.localStorage.getItem("token");
  const meStorage = window.localStorage.getItem("me");

  const [token, setToken] = useState<string | null>(null);
  const [me, setMe] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (tokenStorage && meStorage && !token && !me) {
      setToken(tokenStorage);
      setMe(JSON.parse(meStorage));
    }
  }, [tokenStorage, token, me, meStorage]);

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  return {
    methods,
    token,
    me,
  };
};

export const AppContext = createContext({} as ReturnType<typeof useAppContext>);
