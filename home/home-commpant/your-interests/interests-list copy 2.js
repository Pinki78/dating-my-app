import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import COLORS from "../../../assets/style/color";
// const STORAGE_KEY = "USER_INTERESTS";
import PressableIconButtonGradient from "../../../components/button/pressable-gradient-icon-button";
const InterestsList = (porps) => {

  const { showUploadPhoto, setShowUploadPhoto } = porps;

  // 🔹 Get profiles from Redux
  const profiles = useSelector(
    state => state.profilesApi.profilesState
  );

  // 🔹 Merge + remove duplicate interests
  const interestsList = useMemo(() => {
    const allInterests = profiles.flatMap(
      profile => profile.ProInterests || []
    );

    // Deduplicate by id
    return Array.from(
      new Map(allInterests.map(item => [item.id, item])).values()
    );
  }, [profiles]);

  // 🔹 Selected interest IDs
  const [selectedInterests, setSelectedInterests] = useState([]);

  // 🔹 Load saved interests on mount
  //   useEffect(() => {
  //     const loadInterests = async () => {
  //       try {
  //         const saved = await AsyncStorage.getItem(STORAGE_KEY);
  //         if (saved) {
  //           setSelectedInterests(JSON.parse(saved));
  //         }
  //       } catch (e) {
  //         console.log("Failed to load interests", e);
  //       }
  //     };
  //     loadInterests();
  //   }, []);

  // 🔹 Save selected interests
  //   useEffect(() => {
  //     AsyncStorage.setItem(
  //       STORAGE_KEY,
  //       JSON.stringify(selectedInterests)
  //     );
  //   }, [selectedInterests]);

  // 🔹 Toggle select
  const toggleSelect = (id) => {
    setSelectedInterests(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const saveInterests = async () => {
    if (selectedInterests.length === 0) return;

    await AsyncStorage.setItem(
      'USER_INTERESTS',
      JSON.stringify(selectedInterests)
    );
    showUploadPhoto(true)
    console.log("Saved interests:", selectedInterests);
  };



  // 🔹 Render item
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
          color={isSelected ? "#fff" : COLORS.pinkiDark}
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
    <>
      <FlatList
        data={interestsList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={{ padding: 12 }}
        showsVerticalScrollIndicator={false}
      />

      <PressableIconButtonGradient
        ButtonTitle="Continue"
        onPress={saveInterests}
        PressableClass={{ marginTop: 20 }}
        disabled={selectedInterests.length === 0}
      />
    </>
  );
};

export default InterestsList;

const styles = StyleSheet.create({
  item: {
    // flex-shrink: 1;
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 12,
    margin: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  selectedItem: {
    backgroundColor: COLORS.pinkiDark,
    borderColor: COLORS.pinkiDark,
  },
  text: {
    fontSize: 14,
    color: "#000",
  },
  selectedText: {
    color: "#fff",
  },
});
