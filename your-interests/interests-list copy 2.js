import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import React, { useEffect, useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";

import COLORS from "../assets/style/color";
import PressableIconButtonGradient from "../components/button/pressable-gradient-icon-button";

import { useDispatch, useSelector } from "react-redux";
import { loadProfiles } from "../react-redux-store/store-comp/uploadProfiles";
import { toggleInterest } from "../react-redux-store/store-comp/interestsSlice";

const InterestsList = ({ setShowUploadPhoto }) => {
  const dispatch = useDispatch();

  const { profilesState } = useSelector(state => state.profilesApi);
  const selectedInterests = useSelector(
    state => state.interestsStore.selected
  );

  // Load profiles
  useEffect(() => {
    dispatch(loadProfiles());
  }, []);

  // Build unique interests
  const interestsList = useMemo(() => {
    const map = new Map();
    profilesState.forEach(profile => {
      (profile.ProInterests ?? []).forEach(interest => {
        map.set(interest.id, interest);
      });
    });
    return Array.from(map.values());
  }, [profilesState]);

  const saveInterests = () => {
    if (!selectedInterests.length) return;
    setShowUploadPhoto(true);
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedInterests.includes(item.id);
    return (
      <Pressable
        onPress={() => dispatch(toggleInterest(item.id))}
        style={[styles.item, isSelected && styles.selectedItem]}
      >
        <Ionicons
          name={item.icon}
          size={16}
          color={isSelected ? "#fff" : COLORS.pinkiDark}
        />
        <Text style={[styles.text, isSelected && styles.selectedText]}>
          {item.name}
        </Text>
      </Pressable>
    );
  };

  return (
    <>
      <FlatList
        data={interestsList}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={{ padding: 12 }}
      />

      <PressableIconButtonGradient
        ButtonTitle="Continue"
        onPress={saveInterests}
        disabled={selectedInterests.length === 0}
      />
    </>
  );
};

export default InterestsList;

const styles = StyleSheet.create({
  item: {
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
