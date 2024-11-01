import axios from "axios";
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

export const loginUser = (credentials: LoginRequest) => {
  axios
    .post<UserResponse>("http://10.40.16.98:3000/login", {
      email: credentials.email,
      password: credentials.password,
    })
    .then((response) => {
      AsyncStorage.setItem("token", response.data.accessToken);
      return response.data;
    })
    .catch((e) => console.log(e));
};

export const registerUser = (Credentials: User) => {
  axiosInstance.post<UserResponse>("/register").then((response) => {
    AsyncStorage.setItem("token", response.data.accessToken);
    return response.data;
  });
};
