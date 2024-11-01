import { axiosInstance } from "../api/Api";

export interface CarResponse {
  name: string;
  miles_per_Gallon: number;
  cylinders: number;
  displacement: number;
  horsepower: number;
  weight_in_lbs: number;
  acceleration: number;
  year: string;
  origin: string;
  id: number;
}

export interface CarRequest {
  name: string;
  miles_per_Gallon: number;
  cylinders: number;
  displacement: number;
  horsepower: number;
  weight_in_lbs: number;
  acceleration: number;
  year: string;
  origin: string;
}

export const postCar = (content: CarRequest) => {
  return axiosInstance.post<CarResponse>("/car", {
    content: content,
  });
};

export const deleteCar = (id: number) => {
  axiosInstance.delete<CarResponse>(`/car/${id}`);
};

export const putCar = (id: number, content: CarRequest) => {
  axiosInstance.put<CarResponse>(`/car/${id}`, {
    content: content,
  });
};

export const getCar = (id: number) => {
  axiosInstance.get<CarResponse>(`/car/${id}`);
};

export const getAllCars = () => {
  return axiosInstance.get<CarResponse>(`/car`);
};
