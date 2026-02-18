import { BlurView } from "expo-blur";
import { AlertCircle, X } from "lucide-react-native";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useDeleteRoute } from "../model/useRoute";

interface DeleteDialogProps {
  id: string;
  visible: boolean;
  onClose: () => void;
}

export function DeleteDialog({ id, visible, onClose }: DeleteDialogProps) {
  const { mutateAsync, isPending } = useDeleteRoute();

  const handleDelete = async () => {
    try {
      await mutateAsync(id);
      onClose();
    } catch (error) {
      console.error("DELETE ERROR", error);
      alert(
        "Error: " + (error instanceof Error ? error.message : String(error)),
      );
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 justify-center items-center px-5"
        onPress={onClose}
      >
        <BlurView intensity={24} tint="dark" style={StyleSheet.absoluteFill} />
        <View style={StyleSheet.absoluteFillObject} className="bg-black/20" />
        <Pressable onPress={(e) => e.stopPropagation()}>
          <View className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl">
            <Pressable
              onPress={onClose}
              className="absolute top-4 right-4 z-10 p-1 active:opacity-50"
            >
              <X color="#999" size={24} />
            </Pressable>

            <View className="items-center pt-8 pb-4">
              <View className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full">
                <AlertCircle color="#ef4444" size={40} />
              </View>
            </View>

            <View className="px-6 pb-6">
              <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                Delete Route?
              </Text>

              <Text className="text-base text-gray-600 dark:text-gray-400 mb-6 text-center leading-6">
                This action cannot be undone. The route will be permanently
                deleted.
              </Text>

              <View className="gap-3">
                <Pressable
                  onPress={handleDelete}
                  disabled={isPending}
                  className={`py-4 bg-red-500 rounded-xl active:opacity-80 ${
                    isPending ? "opacity-50" : ""
                  }`}
                >
                  <Text className="text-white font-bold text-base text-center">
                    {isPending ? "Deleting..." : "Delete Route"}
                  </Text>
                </Pressable>

                <Pressable
                  onPress={onClose}
                  disabled={isPending}
                  className="py-4 bg-gray-100 dark:bg-gray-800 rounded-xl active:opacity-70"
                >
                  <Text className="text-gray-700 dark:text-gray-200 font-semibold text-base text-center">
                    Cancel
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
