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

/**
 * CarPopup component for displaying and editing car details.
 *
 * This component renders a dialog that allows users to view and edit
 * details of a car. It uses a `Portal` to display a `Dialog` with a
 * customizable title. The dialog contains multiple `TextField` components
 * for editing various car attributes and a `DatePicker` for selecting
 * the car's year.
 *
 * The component fetches car data based on the provided `carId` and
 * updates the form fields accordingly. It displays a loading indicator
 * while fetching the data. Once the data is loaded, the form fields are
 * populated with the car details.
 *
 * The dialog includes "Cancel" and "Done" buttons. The "Cancel" button
 * triggers the `cancleAction` prop, and the "Done" button triggers the
 * `submitAction` prop with the current car data.
 *
 * @param {CarPopupProps} props - The props for the CarPopup component.
 * @prop {string} title - The title of the dialog.
 * @prop {number} [carId] - The ID of the car to fetch and display.
 * @prop {(data: CarResponse) => void} submitAction - The function to call
 * when the "Done" button is pressed.
 * @prop {() => void} cancleAction - The function to call when the "Cancel"
 * button is pressed.
 * @prop {boolean} isVisible - Whether the dialog is visible.
 */
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

  /**
   * Fetches the car data from the server based on the provided `carId`
   * and updates the component's state with the fetched data.
   *
   * If `carId` is null or undefined, the component's state is not
   * updated.
   *
   * The function also sets the component's `isLoading` state to `false`
   * after the data has been fetched.
   */
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
            <Button title="Cancel" onPress={cancleAction} />
            <Button title="Done" onPress={() => submitAction(car)} />
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
