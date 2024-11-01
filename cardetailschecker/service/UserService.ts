import { axiosInstance } from "../api/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  birthday: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  accessToken: string;
  user: {
    firstname: string;
    lastname: string;
    email: string;
    birthday: string;
    id: number;
  };
}

export const loginUser = async (credentials: LoginRequest) => {
  const token = await axiosInstance
    .post<UserResponse>("/login", {
      email: credentials.email,
      password: credentials.password,
    })
  await AsyncStorage.setItem("token", token.data.accessToken);
  return token.data;
};

export const registerUser = (Credentials: User) => {
  axiosInstance.post<UserResponse>("/register").then((response) => {
    AsyncStorage.setItem("token", response.data.accessToken);
    return response.data;
  });
};
