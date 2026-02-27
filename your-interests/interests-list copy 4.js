import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { getAuth } from "firebase/auth";
import { auth } from "../firebase/firebase";

import COLORS from "../assets/style/color";
import PressableIconButtonGradient from "../components/button/pressable-gradient-icon-button";

import { useDispatch, useSelector } from 'react-redux';
import { loadProfiles, uploadProfilesFirebase } from "../react-redux-store/store-comp/uploadProfiles";

import { saveInterests,setShowUploadPhoto, setSelectedInterests, toggleInterest } from "../react-redux-store/store-comp/interestsSlice";






const InterestsList = (props) => {
  // const { selectedInterests, setSelectedInterests, setShowUploadPhoto } = props;

  const dispatch = useDispatch();
  const { profilesState, loading } = useSelector(state => state.profilesApi);

  const { showUploadPhoto, selectedInterests } = useSelector(
    state => state.interestsStore
  )

  // const [hydrated, setHydrated] = useState(false);

  // 🔹 Load Firebase profiles
  useEffect(() => {
    dispatch(uploadProfilesFirebase()).then(() => {
      dispatch(loadProfiles());
    });
  }, [dispatch]);

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


  // const toggleSelect = (id) => {
  //   setSelectedInterests(prev =>
  //     prev.includes(id)
  //       ? prev.filter(x => x !== id)
  //       : [...prev, id]
  //   );
  // };

  // const saveInterests = async () => {
  //   try {
  //     if (!selectedInterests.length) return;

  //     const userId = auth.currentUser?.uid;
  //     if (!userId) return;

  //     const STORAGE_KEY = `USER_INTERESTS_${userId}`;

  //     await AsyncStorage.setItem(
  //       STORAGE_KEY,
  //       JSON.stringify(selectedInterests)
  //     );

  //     setShowUploadPhoto(true);
  //   } catch (error) {
  //     console.log("Save error:", error);
  //   }
  // };



  // const saveInterests = () => {
  //   if (!selectedInterests.length) return;
  //   setShowUploadPhoto(true);
  // };

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

  if (loading) {
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
         onPress={() => dispatch(saveInterests())}
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
