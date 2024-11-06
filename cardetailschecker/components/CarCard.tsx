import React from "react";
import { IconButton, List, Text, useTheme } from "react-native-paper";
import { CarResponse, deleteCar } from "../service/CarService";
import { StyleSheet, View } from "react-native";
import ListItem from "./ListItem";

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
          <List.Icon icon={expanded ? "chevron-up" : "chevron-down"} />
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
