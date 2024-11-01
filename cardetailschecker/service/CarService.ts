import { axiosInstance } from "../api/Api";

export interface CarResponse {
  Name: string;
  Miles_per_Gallon: number;
  Cylinders: number;
  Displacement: number;
  Horsepower: number;
  Weight_in_lbs: number;
  Acceleration: number;
  Year: string;
  Origin: string;
  Id: number;
}

export interface CarRequest {
  Name: string;
  Miles_per_Gallon: number;
  Cylinders: number;
  Displacement: number;
  Horsepower: number;
  Weight_in_lbs: number;
  Acceleration: number;
  Year: string;
  Origin: string;
}

export const postCar = (content: CarRequest) => {
  return axiosInstance.post<CarResponse>("/cars", {
    content: content,
  });
};

export const deleteCar = (id: number) => {
  axiosInstance.delete<CarResponse>(`/cars/${id}`);
};

export const putCar = (id: number, content: CarRequest) => {
  axiosInstance.put<CarResponse>(`/cars/${id}`, {
    content: content,
  });
};

export const getCar = async (id: number) => {
  return axiosInstance.get<CarResponse>(`/cars/${id}`);
};

export const getAllCars = async () => {
  return await axiosInstance.get<CarResponse[]>(`/cars`);
};
