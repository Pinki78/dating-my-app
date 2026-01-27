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
import { getAuth } from "firebase/auth";

import COLORS from "../../../assets/style/color";
import PressableIconButtonGradient from "../../../components/button/pressable-gradient-icon-button";

import { useDispatch, useSelector } from 'react-redux';
import { loadProfiles } from "../../../react-redux-store/store-comp/uploadProfiles";

const InterestsList = (props) => {
  const { selectedInterests, setSelectedInterests, setShowUploadPhoto } = props;

  const dispatch = useDispatch();
  const { profilesState } = useSelector(state => state.profilesApi);

  const [hydrated, setHydrated] = useState(false);

  // ✅ USER-BASED STORAGE KEY
  const auth = getAuth();
  const userId = auth.currentUser?.uid;
  const STORAGE_KEY = `USER_INTERESTS_${userId}`;

  // 🔹 Load saved interests (only for this user)
  useEffect(() => {
    const loadSavedInterests = async () => {
      if (!userId) {
        setHydrated(true);
        return;
      }

      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        setSelectedInterests(JSON.parse(saved));
      } else {
        setSelectedInterests([]); // ✅ first time login = empty
      }

      setHydrated(true);
    };

    loadSavedInterests();
  }, [userId]);

  // 🔹 Load Firebase profiles
  useEffect(() => {
    dispatch(loadProfiles());
  }, []);

  // 🔹 Build unique interest list
  const interestsList = useMemo(() => {
    const map = new Map();
    profilesState.forEach(profile => {
      (profile.ProInterests ?? []).forEach(interest => {
        map.set(interest.id, interest);
      });
    });
    return Array.from(map.values());
  }, [profilesState]);

  // 🔹 Save interests (only after hydration)
  useEffect(() => {
    if (hydrated && userId) {
      AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(selectedInterests)
      );
    }
  }, [selectedInterests, hydrated, userId]);

  const toggleSelect = (id) => {
    setSelectedInterests(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };

  const saveInterests = () => {
    if (!selectedInterests.length) return;
    setShowUploadPhoto(true);
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedInterests.includes(item.id);
    return (
      <Pressable
        onPress={() => toggleSelect(item.id)}
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

  if (!hydrated) {
    return <Text style={{ textAlign: "center" }}>Loading...</Text>;
  }

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
