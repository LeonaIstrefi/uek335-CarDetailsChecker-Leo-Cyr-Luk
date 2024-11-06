import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { ActivityIndicator, Dialog, Portal } from "react-native-paper";
import { TextField } from "./Textfield";
import { Button } from "./Button";
import { loginUser } from "../service/UserService";
import { CarResponse, getCar } from "../service/CarService";
import DatePicker from "./DatePicker";

interface CarPopupProps {
  title: string;
  carId?: number;
  submitAction: (data: CarResponse) => void;
  cancleAction: () => void;
  isVisible: boolean;
}

export default function CarPopup({
  title,
  carId,
  submitAction,
  cancleAction,
  isVisible,
}: CarPopupProps) {
  const [car, setCar] = useState<CarResponse>({
    Name: "",
    Miles_per_Gallon: 0,
    Cylinders: 0,
    Displacement: 0,
    Horsepower: 0,
    Weight_in_lbs: 0,
    Acceleration: 0,
    Year: "",
    Origin: "",
    id: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      loginUser({
        email: "olivier@mail.com",
        password: "bestPassw0rd",
      });
      if (carId !== null && carId !== undefined) {
        const response = await getCar(carId);
        setCar(response.data);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [carId]);

  return (
    <View>
      <Portal>
        <Dialog visible={isVisible}>
          <Dialog.Title>{title}</Dialog.Title>
          {isLoading ? (
            <ActivityIndicator animating={true} style={{ paddingTop: 20 }} />
          ) : (
            <Dialog.ScrollArea style={{ maxHeight: 400 }}>
              <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
                <TextField
                  label="Name"
                  onChangeText={(text) => setCar({ ...car, Name: text })}
                  value={car.Name}
                />
                <TextField
                  label="Miles per Gallon"
                  onChangeText={(text) =>
                    setCar({
                      ...car,
                      Miles_per_Gallon: text ? parseInt(text) : 0,
                    })
                  }
                  keyboardType="numeric"
                  value={car.Miles_per_Gallon.toString()}
                />
                <TextField
                  label="Cylinders"
                  onChangeText={(text) =>
                    setCar({ ...car, Cylinders: text ? parseInt(text) : 0 })
                  }
                  keyboardType="numeric"
                  value={car.Cylinders.toString()}
                />
                <TextField
                  label="Displacement"
                  onChangeText={(text) =>
                    setCar({ ...car, Displacement: text ? parseInt(text) : 0 })
                  }
                  keyboardType="numeric"
                  value={car.Displacement.toString()}
                />
                <TextField
                  label="Horsepower"
                  onChangeText={(text) =>
                    setCar({ ...car, Horsepower: text ? parseInt(text) : 0 })
                  }
                  keyboardType="numeric"
                  value={car.Horsepower.toString()}
                />
                <TextField
                  label="Weight in lbs"
                  onChangeText={(text) =>
                    setCar({ ...car, Weight_in_lbs: text ? parseInt(text) : 0 })
                  }
                  keyboardType="numeric"
                  value={car.Weight_in_lbs.toString()}
                />
                <TextField
                  label="Acceleration"
                  onChangeText={(text) =>
                    setCar({ ...car, Acceleration: text ? parseInt(text) : 0 })
                  }
                  keyboardType="numeric"
                  value={car.Acceleration.toString()}
                />
                <TextField
                  label="Year"
                  onChangeText={(text) => setCar({ ...car, Year: text })}
                  value={car.Year}
                />
                <DatePicker
                  value={car.Year}
                  onChange={(date) => setCar({ ...car, Year: date })}
                />
                <TextField
                  label="Origin"
                  onChangeText={(text) => setCar({ ...car, Origin: text })}
                  value={car.Origin}
                />
              </ScrollView>
            </Dialog.ScrollArea>
          )}

          <Dialog.Actions>
            <Button title="Cancle" onPress={cancleAction} />
            <Button title="Done" onPress={() => submitAction(car)} />
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
