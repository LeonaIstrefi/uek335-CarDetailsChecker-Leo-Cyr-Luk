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
  id: number;
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

/**
 * Posts a new car to the server.
 *
 * This function sends a POST request to the server's /cars endpoint with the
 * provided `CarRequest` object.
 *
 * @param content The car to post to the server.
 * @returns A promise that resolves to the `CarResponse` object returned by the
 * server.
 */
export const postCar = (content: CarRequest) => {
  return axiosInstance.post<CarResponse>("/cars", {
    ...content,
  });
};

/**
 * Deletes a car from the server.
 *
 * This function sends a DELETE request to the server's /cars endpoint with
 * the provided id.
 *
 * @param id The id of the car to delete.
 */
export const deleteCar = (id: number) => {
  axiosInstance.delete<CarResponse>(`/cars/${id}`);
};

/**
 * Puts a car on the server.
 *
 * This function sends a PUT request to the server's /cars endpoint with the
 * provided id and `CarRequest` object.
 *
 * @param id The id of the car to put on the server.
 * @param content The car to put on the server.
 * @returns A promise that resolves to the `CarResponse` object returned by the
 * server.
 */
export const putCar = (id: number, content: CarRequest) => {
  axiosInstance.put<CarResponse>(`/cars/${id}`, {
    ...content,
  });
};

/**
 * Retrieves a car from the server.
 *
 * This function sends a GET request to the server's /cars/{id} endpoint with
 * the provided id.
 *
 * @param id The id of the car to retrieve.
 * @returns A promise that resolves to the `CarResponse` object returned by the
 * server.
 */
export const getCar = async (id: number) => {
  return axiosInstance.get<CarResponse>(`/cars/${id}`);
};

/**
 * Retrieves all cars from the server.
 *
 * This function sends a GET request to the server's /cars endpoint and
 * returns a promise that resolves to an array of `CarResponse` objects.
 *
 * @returns A promise that resolves to an array of `CarResponse` objects.
 */
export const getAllCars = async () => {
  return await axiosInstance.get<CarResponse[]>(`/cars`);
};
