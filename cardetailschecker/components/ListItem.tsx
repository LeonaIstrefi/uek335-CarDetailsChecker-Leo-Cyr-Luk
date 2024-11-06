import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { List } from "react-native-paper";

export default function ListItem({ content }: { content: string }) {
  return (
    <List.Item
      titleStyle={{ height: 50 }}
      style={{ height: 25 }}
      title={
        <Text
          style={{
            fontSize: 15,
          }}
        >
          {content}
        </Text>
      }
    />
  );
}
