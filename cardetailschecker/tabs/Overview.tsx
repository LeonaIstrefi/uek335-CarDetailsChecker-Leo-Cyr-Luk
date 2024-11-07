import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import {
  ActivityIndicator,
  FAB,
  Searchbar,
  useTheme,
} from "react-native-paper";
import { CarCard } from "../components/CarCard";
import {
  CarResponse,
  deleteCar,
  getAllCars,
  postCar,
  putCar,
} from "../service/CarService";
import { loginUser } from "../service/UserService";
import CarPopup from "../components/CarPopup";
import Confirmation from "../components/Confirmation";

/**
 * The Overview component is a screen that displays all the cars in the system.
 * It renders a searchbar at the top, and a list of CarCards below.
 * The user can add a new car by pressing the FAB at the bottom right.
 * The user can edit a car by pressing the edit button on the CarCard.
 * The user can delete a car by pressing the delete button on the CarCard.
 * When the user deletes a car, a confirmation dialog is shown.
 * The user can search for cars by typing in the searchbar.
 * The list of cars is filtered in real-time as the user types.
 * The user can cancel the search by pressing the clear button on the searchbar.
 * The user can also cancel the search by pressing the back button on the navigation bar.
 * The Overview component is a functional component, so it does not have a constructor or lifecycle methods.
 * The Overview component uses the useState hook to manage its state.
 * The Overview component uses the useEffect hook to fetch the data from the server.
 * The Overview component uses the useTheme hook to get the theme object.
 * The Overview component renders a View component as its root element.
 * The Overview component renders a Searchbar component inside the View component.
 * The Overview component renders a ScrollView component inside the View component.
 * The Overview component renders a list of CarCards inside the ScrollView component.
 * The Overview component renders a FAB component inside the View component.
 * The Overview component renders a CarPopup component inside the View component.
 * The Overview component renders a Confirmation component inside the View component.
 */
export default function Overview() {
  const [searchValue, setSearchValue] = useState("");

  const [cars, setCars] = useState<CarResponse[]>([]);
  const [originalCars, setOriginalCars] = useState<CarResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [editId, setEditId] = useState(0);
  const [deleteId, setDeleteId] = useState(0);

  /**
   * Handles the deletion of a car.
   * @param id The id of the car to delete.
   */
  const handleDelete = (id: number) => {
    deleteCar(id);
    setCars(cars.filter((car) => car.id !== id));
  };
  /**
   * Handles the editing of a car.
   * @param id The id of the car to edit.
   */
  const handleEdit = (id: number) => {
    setEditId(id);
    setIsEditVisible(true);
  };

  /**
   * Shows the confirmation dialog for deleting a car.
   * @param id The id of the car to delete.
   */
  const handleConfitmation = (id: number) => {
    setIsDeleteVisible(true);
    setDeleteId(id);
  };

  /**
   * Fetches the data for the Overview component.
   * It fetches all the cars from the server, and sets the state with the received data.
   * It also sets the originalCars state with the received data.
   * The originalCars state is used to filter the cars when the user searches for something.
   * The component is rendered with a ActivityIndicator until the data is received.
   */
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllCars();
      setCars(response.data);
      setIsLoading(false);
      setOriginalCars(response.data);
    };
    fetchData();
  }, []);

  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Searchbar
        placeholder="Search"
        onChangeText={(query) => {
          setSearchValue(query);
          const filteredCars = originalCars.filter((car) =>
            car.Name.toLowerCase().includes(query.toLowerCase())
          );
          setCars(filteredCars);
        }}
        value={searchValue}
        style={{
          marginHorizontal: 15,
          marginTop: 30,
          backgroundColor: theme.colors.surface,
        }}
      />
      {isLoading ? (
        <ActivityIndicator animating={true} style={{ paddingTop: 20 }} />
      ) : null}

      <ScrollView
        contentContainerStyle={{
          padding: 15,
          gap: 10,
        }}
      >
        {cars.map((car) => (
          <CarCard
            {...car}
            key={car.id ? car.id : car.Name}
            onDelete={handleConfitmation}
            onEdit={handleEdit}
          />
        ))}
      </ScrollView>
      <FAB
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          margin: 15,
          backgroundColor: theme.colors.primary,
        }}
        customSize={80}
        color={theme.colors.outline}
        icon="plus"
        onPress={() => setIsCreateVisible(true)}
      />
      <CarPopup
        title="Add Car"
        isVisible={isCreateVisible}
        cancleAction={() => {
          setIsCreateVisible(false);
        }}
        submitAction={(data) => {
          postCar(data);
          cars.push(data);
          setIsCreateVisible(false);
        }}
      />
      <CarPopup
        title="Edit Car"
        carId={editId}
        isVisible={isEditVisible}
        cancleAction={() => {
          setIsEditVisible(false);
        }}
        submitAction={(data) => {
          putCar(data.id, data);
          const index = cars.findIndex((car) => car.id === data.id);
          cars[index] = data;
          setIsEditVisible(false);
        }}
      />
      <Confirmation
        isVisible={isDeleteVisible}
        cancleAction={() => setIsDeleteVisible(false)}
        submitAction={() => {
          handleDelete(deleteId);
          setIsDeleteVisible(false);
        }}
      />
    </View>
  );
}
