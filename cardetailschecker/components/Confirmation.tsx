import * as React from "react";
import { View } from "react-native";
import { Dialog, Portal, PaperProvider, Text } from "react-native-paper";
import { Button } from "./Button";

interface ConfirmationProps {
  submitAction: () => void;
  cancleAction: () => void;
  isVisible: boolean;
}

/**
 * A confirmation dialog component.
 *
 * This component is a portal that renders a `Dialog` component
 * conditionally based on the `isVisible` prop. The `Dialog` component
 * displays a title, a message, and two buttons: "Cancel" and "Done".
 * When the user presses the "Cancel" button, the `cancleAction` prop
 * is called. When the user presses the "Done" button, the `submitAction`
 * prop is called.
 *
 * @param {ConfirmationProps} props
 * @prop {boolean} isVisible Whether the dialog is visible.
 * @prop {() => void} submitAction The function to call when the user
 * presses the "Done" button.
 * @prop {() => void} cancleAction The function to call when the user
 * presses the "Cancel" button.
 *
 * @example
 * <Confirmation
 *   isVisible={true}
 *   submitAction={() => console.log("User confirmed!")}
 *   cancleAction={() => console.log("User cancelled!")}
 * />
 */
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
          <Button title="Cancel" onPress={cancleAction} />
          <Button title="Done" onPress={submitAction} />
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default Confirmation;
