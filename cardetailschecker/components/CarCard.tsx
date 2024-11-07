import React from "react";
import { IconButton, List, Text, useTheme } from "react-native-paper";
import { CarResponse, deleteCar } from "../service/CarService";
import { StyleSheet, View } from "react-native";
import ListItem from "./ListItem";

/**
 * CarCard component for displaying car information.
 *
 * This component renders a card with car details, including its name and year.
 * The card is expandable to show additional information such as miles per gallon,
 * cylinders, displacement, horsepower, weight in lbs, acceleration, and origin.
 *
 * The card includes edit and delete button icons. The edit button triggers the
 * `onEdit` function with the car's ID, and the delete button triggers the
 * `onDelete` function with the car's ID.
 *
 * @param {CarResponse & { onDelete: (id: number) => void } & { onEdit: (id: number) => void }} props
 * @prop {string} Name - The name of the car.
 * @prop {number} Miles_per_Gallon - The miles per gallon of the car.
 * @prop {number} Cylinders - The number of cylinders in the car.
 * @prop {number} Displacement - The displacement of the car.
 * @prop {number} Horsepower - The horsepower of the car.
 * @prop {number} Weight_in_lbs - The weight of the car in pounds.
 * @prop {number} Acceleration - The acceleration of the car.
 * @prop {string} Year - The manufacturing year of the car.
 * @prop {string} Origin - The origin of the car.
 * @prop {number} id - The unique identifier of the car.
 * @prop {(id: number) => void} onDelete - The function to call when the delete button is pressed.
 * @prop {(id: number) => void} onEdit - The function to call when the edit button is pressed.
 */
export const CarCard = ({
  Name,
  Miles_per_Gallon,
  Cylinders,
  Displacement,
  Horsepower,
  Weight_in_lbs,
  Acceleration,
  Year,
  Origin,
  id,
  onDelete,
  onEdit,
}: CarResponse & { onDelete: (id: number) => void } & {
  onEdit: (id: number) => void;
}) => {
  const [expanded, setExpanded] = React.useState(false);

  const handlePress = () => setExpanded(!expanded);

  const theme = useTheme();
  return (
    <List.Accordion
      pointerEvents="box-none"
      style={
        expanded
          ? {
              backgroundColor: theme.colors.secondary,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }
          : {
              backgroundColor: theme.colors.secondary,
              borderRadius: 8,
            }
      }
      titleStyle={{ color: theme.colors.outline }}
      descriptionStyle={{ color: theme.colors.outline }}
      title={Name}
      description={`Year ${Year}`}
      right={(props) => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <IconButton
            {...props}
            icon="pencil"
            onPress={() => {
              onEdit(id);
            }}
          />
          <IconButton
            {...props}
            icon="delete"
            onPress={() => {
              onDelete(id);
            }}
          />
          <List.Icon
            icon={expanded ? "chevron-up" : "chevron-down"}
            color={theme.colors.outline}
          />
        </View>
      )}
      expanded={expanded}
      onPress={handlePress}
    >
      <View
        style={{
          backgroundColor: theme.colors.secondary,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        }}
      >
        <ListItem content={`Miles per Gallon: ${Miles_per_Gallon}`} />
        <ListItem content={`Cylinders: ${Cylinders}`} />
        <ListItem content={`Displacement: ${Displacement}`} />
        <ListItem content={`Horsepower: ${Horsepower}`} />
        <ListItem content={`Weight in lbs: ${Weight_in_lbs}`} />
        <ListItem content={`Acceleration: ${Acceleration}`} />
        <ListItem content={`Origin: ${Origin}`} />
      </View>
    </List.Accordion>
  );
};
