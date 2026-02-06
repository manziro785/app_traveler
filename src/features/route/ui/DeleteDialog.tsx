import { MoreVertical } from "lucide-react-native";
import { AlertDialog, Button, XStack, YStack } from "tamagui";
import { useDeleteRoute } from "../model/useRoute";

export function AlertDialogDemo({ id }: { id: string }) {
  const { mutateAsync, isPending } = useDeleteRoute();

  // const onDelete = () => mutateAsync(id);

  return (
    <AlertDialog native>
      <AlertDialog.Trigger asChild>
        <MoreVertical color="#999" size={16} />
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay key="overlay" opacity={0.5} />
        <AlertDialog.Content elevate key="content">
          <YStack gap="$4">
            <AlertDialog.Title>Delete</AlertDialog.Title>
            <AlertDialog.Description>
              Are you sure you want to delete?
            </AlertDialog.Description>

            <XStack gap="$3" justify="flex-end">
              <AlertDialog.Cancel asChild>
                <Button disabled={isPending}>Cancel</Button>
              </AlertDialog.Cancel>

              <AlertDialog.Action asChild>
                <Button
                  theme="accent"
                  disabled={isPending}
                  onPress={() => mutateAsync(id)}
                >
                  {isPending ? "Deleting..." : "Delete"}
                </Button>
              </AlertDialog.Action>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
}
