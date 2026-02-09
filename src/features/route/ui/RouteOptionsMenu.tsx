import { EllipsisVertical, Pencil, Trash2, X } from "lucide-react-native";
import { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { DeleteDialog } from "./DeleteDialog";

interface RouteOptionsMenuProps {
  id: string;
  onEdit: () => void;
}

export function RouteOptionsMenu({ id, onEdit }: RouteOptionsMenuProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);

  return (
    <>
      <Pressable
        onPress={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setMenuVisible(true);
        }}
        className=" active:opacity-50"
      >
        <EllipsisVertical size={15} color="#d1d5db" />
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <View className="flex-1 justify-end">
          <Pressable className="flex-1" onPress={() => setMenuVisible(false)} />

          <View className="bg-white rounded-t-3xl pb-8">
            <View className="items-center pt-3 pb-4">
              <View className="w-12 h-1 bg-gray-300 dark:bg-gray-700 rounded-full" />
            </View>
            <View className="flex-row items-center justify-between px-6 pb-4">
              <Text className="text-lg font-bold text-gray-900 dark:text-white">
                Options
              </Text>
              <Pressable
                onPress={() => setMenuVisible(false)}
                className="p-2 active:opacity-50"
              >
                <X color="#999" size={24} />
              </Pressable>
            </View>

            <View className="px-4">
              <Pressable
                onPress={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setMenuVisible(false);
                  onEdit();
                }}
                className="flex-row items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl mb-3 active:opacity-70"
              >
                <View className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl mr-4">
                  <Pencil color="#3b82f6" size={24} />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold text-gray-900 dark:text-white mb-0.5">
                    Edit Route
                  </Text>
                  <Text className="text-sm text-gray-500 dark:text-gray-400">
                    Modify route details
                  </Text>
                </View>
              </Pressable>

              <Pressable
                onPress={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setMenuVisible(false);
                  setDeleteDialogVisible(true);
                }}
                className="flex-row items-center p-4 bg-red-50 dark:bg-red-900/20 rounded-xl active:opacity-70"
              >
                <View className="bg-red-100 dark:bg-red-900/30 p-3 rounded-xl mr-4">
                  <Trash2 color="#ef4444" size={24} />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold text-red-600 dark:text-red-400 mb-0.5">
                    Delete Route
                  </Text>
                  <Text className="text-sm text-red-500 dark:text-red-400/70">
                    Remove permanently
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {deleteDialogVisible && (
        <DeleteDialog
          id={id}
          visible={deleteDialogVisible}
          onClose={() => setDeleteDialogVisible(false)}
        />
      )}
    </>
  );
}
