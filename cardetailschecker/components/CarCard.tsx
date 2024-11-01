import React from "react";
import { IconButton, List, Text, useTheme } from "react-native-paper";
import { CarResponse } from "../service/CarService";
import { StyleSheet, View } from "react-native";

export interface CarProps {
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
}: CarProps) => {
  const [expanded, setExpanded] = React.useState(false);

  const handlePress = () => setExpanded(!expanded);

  const theme = useTheme();
  return (
    <List.Accordion
      style={
        expanded
          ? {
              backgroundColor: theme.colors.secondary,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              overflow: "hidden",
            }
          : {
              backgroundColor: theme.colors.secondary,
              borderRadius: 8,
              overflow: "hidden",
            }
      }
      title={Name}
      description={`Year ${Year}`}
      right={(props) => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <IconButton {...props} icon="pencil" onPress={() => {}} />
          <IconButton {...props} icon="delete" onPress={() => {}} />
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
        <List.Item
          titleStyle={{ height: 20, backgroundColor: theme.colors.primary }}
          title={"hello"}
        />
        <List.Item
          title={
            <Text
              style={{
                fontSize: 15,
              }}
            >{`Cylinders: ${Cylinders}`}</Text>
          }
        />
        <List.Item
          title={
            <Text
              style={{
                fontSize: 15,
              }}
            >{`Displacement: ${Displacement}`}</Text>
          }
        />
        <List.Item
          title={
            <Text
              style={{
                fontSize: 15,
              }}
            >{`Horsepower: ${Horsepower}`}</Text>
          }
        />
        <List.Item
          title={
            <Text
              style={{
                fontSize: 15,
              }}
            >{`Weight in lbs: ${Weight_in_lbs}`}</Text>
          }
        />
        <List.Item
          title={
            <Text
              style={{
                fontSize: 15,
              }}
            >{`Acceleration: ${Acceleration}`}</Text>
          }
        />
        <List.Item
          title={
            <Text
              style={{
                fontSize: 15,
              }}
            >{`Origin: ${Origin}`}</Text>
          }
        />
      </View>
    </List.Accordion>
  );
};
