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
  const token = await axiosInstance.post<UserResponse>("/login", {
    email: credentials.email,
    password: credentials.password,
  });
  await AsyncStorage.setItem("token", token.data.accessToken);
  await AsyncStorage.setItem("id", String(token.data.user.id));
  return token.data;
};

export const registerUser = async (credentials: User) => {
  try {
    const response = await axiosInstance.post<UserResponse>(
      "/register",
      credentials
    );
    return response.data;
  } catch (e) {
    console.log("Registration error:", e);
    throw e;
  }
};

export const getCurrentUser = async () => {
  const id = await AsyncStorage.getItem("id");
  console.log("User ID from AsyncStorage:", id);
  return axiosInstance.get<UserResponse>(`/users/${id}`);
};

export const putUser = async (userData: User) => {
  const id = await AsyncStorage.getItem("id");
  return axiosInstance
    .put(`/users/${id}`, userData)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};
