import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const InterestsList = ({ interestsList = [] }) => {
  const [selectedInterests, setSelectedInterests] = useState([]);

  // 🔹 Toggle select
  const toggleSelect = (id) => {
    setSelectedInterests((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // 🔹 Save to storage
  useEffect(() => {
    AsyncStorage.setItem(
      "USER_INTERESTS",
      JSON.stringify(selectedInterests)
    );
  }, [selectedInterests]);

  // 🔹 Render each interest
  const renderItem = ({ item }) => {
    const isSelected = selectedInterests.includes(item.id);

    return (
      <Pressable
        onPress={() => toggleSelect(item.id)}
        style={[
          styles.item,
          isSelected && styles.selectedItem,
        ]}
      >
        <Ionicons
          name={item.icon}
          size={16}
          color={isSelected ? "#fff" : "#000"}
        />
        <Text
          style={[
            styles.text,
            isSelected && styles.selectedText,
          ]}
        >
          {item.name}
        </Text>
      </Pressable>
    );
  };

  return (
    <FlatList
      data={interestsList}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      numColumns={2}
      contentContainerStyle={{ padding: 12 }}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default InterestsList;

const styles = StyleSheet.create({
 
});