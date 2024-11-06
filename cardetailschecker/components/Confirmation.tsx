import * as React from "react";
import { View } from "react-native";
import { Dialog, Portal, PaperProvider, Text } from "react-native-paper";
import { Button } from "./Button";

interface ConfirmationProps {
  submitAction: () => void;
  cancleAction: () => void;
  isVisible: boolean;
}

const Confirmation = ({
  isVisible,
  submitAction,
  cancleAction,
}: ConfirmationProps) => {
  return (
    <Portal>
      <Dialog visible={isVisible}>
        <Dialog.Title>Are you sure?</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">This action is irreversible!</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button title="Cancle" onPress={cancleAction} />
          <Button title="Done" onPress={submitAction} />
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default Confirmation;
