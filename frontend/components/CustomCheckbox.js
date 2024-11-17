import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const CustomCheckbox = ({ label, selected, onChange }) => {
  return (
    <TouchableOpacity
      className="flex-row items-center mb-2"
      onPress={onChange}
    >
      <View
        className={`w-6 h-6 rounded-md border-2 ${
          selected ? "bg-blue-500 border-blue-500" : "bg-white border-gray-400"
        } flex items-center justify-center`}
      >
        {selected && <View className="w-3 h-3 bg-white rounded-full" />}
      </View>
      <Text className="ml-2 text-black">{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomCheckbox;