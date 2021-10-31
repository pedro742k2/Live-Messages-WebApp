import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
};

type AuthContextData = {
  user: User | null;
  signInUrl: string;
  signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextData);

type AuthProvider = {
  children: ReactNode;
};

type AuthResponse = {
  jwt_token: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  };
};

export const AuthProvider = (props: AuthProvider) => {
  const [user, setUser] = useState<User | null>(null);

  const signInUrl =
    "https://github.com/login/oauth/authorize?scope=user&client_id=5ae191c49d7f2d8f7833";

  const signIn = async (githubCode: string) => {
    const response = await api.post<AuthResponse>("/authenticate", {
      code: githubCode,
    });

    const { jwt_token, user } = response.data;

    localStorage.setItem("@dowhile:token", jwt_token);

    api.defaults.headers.common.authorization = `Bearer ${jwt_token}`;

    setUser(user);
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("@dowhile:token");
  };

  useEffect(() => {
    const token = localStorage.getItem("@dowhile:token");

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api.get<User>("/profile").then((response) => {
        setUser(response.data);
      });
    }
  }, []);

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes("?code=");

    if (hasGithubCode) {
      const [urlWithoutCode, code] = url.split("?code=");

      window.history.pushState({}, "", urlWithoutCode);

      signIn(code);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signInUrl, user, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
};
