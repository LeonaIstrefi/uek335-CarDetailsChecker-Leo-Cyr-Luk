import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import {
  ActivityIndicator,
  FAB,
  Searchbar,
  useTheme,
} from "react-native-paper";
import { CarCard } from "../components/CarCard";
import { CarResponse, getAllCars } from "../service/CarService";
import { loginUser } from "../service/UserService";

export default function Overview() {
  const [searchValue, setSearchValue] = useState("");

  const [cars, setCars] = useState<CarResponse[]>([]);
  const [originalCars, setOriginalCars] = useState<CarResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
          <CarCard key={car.Id} {...car} />
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
        onPress={() => console.log("Pressed")}
      />
    </View>
  );
}
