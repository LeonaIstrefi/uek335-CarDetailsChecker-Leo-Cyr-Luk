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
  axiosInstance
    .post<UserResponse>("/login", {
      email: credentials.email,
      password: credentials.password,
    })
    .then((response) => {
      AsyncStorage.setItem("token", response.data.accessToken);
      AsyncStorage.setItem("id", String(response.data.user.id));
      return response.data;
    })
    .catch((e) => console.log(e));
};

export const registerUser = (credentials: User) => {
  axiosInstance.post<UserResponse>("/register").then((response) => {
    AsyncStorage.setItem("token", response.data.accessToken);
    return response.data;
  });
};

export const getCurrentUser = async () => {
  const id = await AsyncStorage.getItem("id");
console.log('User ID from AsyncStorage:', id);
  return axiosInstance.get<UserResponse>(`/users/${id}`);
};

export const putUser = async (userData: User) => {
  const id = await AsyncStorage.getItem("id");
  return axiosInstance.put(`/users/${id}`, userData)
    .then(response => response.data)
    .catch(error => console.log(error));
};


