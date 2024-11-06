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
  getAllCars,
  postCar,
  putCar,
} from "../service/CarService";
import { loginUser } from "../service/UserService";
import CarPopup from "../components/CarPopup";

export default function Overview() {
  const [searchValue, setSearchValue] = useState("");

  const [cars, setCars] = useState<CarResponse[]>([]);
  const [originalCars, setOriginalCars] = useState<CarResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [editId, setEditId] = useState(0);

  const handleDelete = (id: number) => {
    setCars(cars.filter((car) => car.id !== id));
  };
  const handleEdit = (id: number) => {
    setEditId(id);
    setIsEditVisible(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      // For testing because login is not implemented
      loginUser({
        email: "olivier@mail.com",
        password: "bestPassw0rd",
      });
      // ---------------------
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
            onDelete={handleDelete}
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
    </View>
  );
}
