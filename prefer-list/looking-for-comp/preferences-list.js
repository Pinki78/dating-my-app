import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import COLORS from "../../assets/style/color";
import PressableIconButtonGradient from "../../components/button/pressable-gradient-icon-button";
import CongratulationsIndex from "../../components/congratulations/congratulations-index";
import { useDispatch, useSelector } from "react-redux";
import {
  loadProfiles,
  uploadProfilesFirebase,
} from "../../react-redux-store/store-comp/uploadProfiles";
import { getAuth } from "firebase/auth";
import { toggleSelect, setShowInterests, setShowCongrats, savePreferences } from '../../react-redux-store/store-comp/preferencesSlice'

const PreferencesList = ({
  // setShowInterests,
  // selectedPreferences,
  // setSelectedPreferences,
}) => {
  const dispatch = useDispatch();

  const { profilesState, loading } = useSelector(
    (state) => state.profilesApi
  );

  const { showCongrats, selectedPreferences } = useSelector(
    state => state.preferencesStore
  )

  // const [showCongrats, setShowCongrats] = useState(false);

  // 🔥 Load Firebase Profiles
  useEffect(() => {
    dispatch(uploadProfilesFirebase()).then(() => {
      dispatch(loadProfiles());
    });
  }, [dispatch]);

  // ✅ Extract unique preferences safely
  const preferences = [
    ...new Set(
      profilesState.flatMap((p) => {
        if (Array.isArray(p.PreferencesType)) {
          return p.PreferencesType;
        }
        if (typeof p.PreferencesType === "string") {
          return [p.PreferencesType];
        }
        return [];
      })
    ),
  ];

  // ✅ Toggle selection
  // const toggleSelect = (value) => {
  //   setSelectedPreferences((prev) =>
  //     prev.includes(value)
  //       ? prev.filter((item) => item !== value)
  //       : [...prev, value]
  //   );
  // };

  // ✅ Save Preferences
  // const savePreferences = async () => {
  //   try {
  //     if (!selectedPreferences.length) return;

  //     const auth = getAuth();
  //     const userId = auth.currentUser?.uid;

  //     if (!userId) {
  //       console.log("User not logged in");
  //       return;
  //     }

  //     const STORAGE_KEY = `USER_PREFERENCES_${userId}`;

  //     await AsyncStorage.setItem(
  //       STORAGE_KEY,
  //       JSON.stringify(selectedPreferences)
  //     );

  //     console.log("Preferences Saved:", selectedPreferences);

  //     setShowCongrats(true);
  //   } catch (error) {
  //     console.log("Save error:", error);
  //   }
  // };

  const renderItem = ({ item }) => {
    const isSelected = selectedPreferences.includes(item);

    return (
      <Pressable
        onPress={() => dispatch(toggleSelect(item))} // ✅ correct
        style={[styles.card, isSelected && styles.activeCard]}
      >
        <Text style={styles.pref}>{item}</Text>

        <View
          style={[
            styles.radio,
            isSelected && styles.radioActive,
          ]}
        >
          {isSelected && <View style={styles.radioDot} />}
        </View>
      </Pressable>
    );
  };

  if (loading) {
    return <Text style={{ textAlign: "center" }}>Loading...</Text>;
  }

  return (
    <>
      {preferences.length === 0 ? (
        <Text style={{ textAlign: "center" }}>
          No preferences found
        </Text>
      ) : (
        <FlatList
          data={preferences}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={renderItem}
        />
      )}

      <PressableIconButtonGradient
        ButtonTitle="Continue"
        onPress={() => {
          console.log("Dispatching savePreferences…"); // ✅ optional pre-log
          dispatch(savePreferences());
          // savePreferences
        }}
        PressableClass={{ marginTop: 20 }}
        disabled={selectedPreferences.length === 0}
      />

      {showCongrats && (
        <CongratulationsIndex
          visible={showCongrats}
          onDone={() => {
            dispatch(setShowInterests(true));
            dispatch(setShowCongrats(false));// close interests
          }}
        />
      )}
    </>
  );
};

export default PreferencesList;


const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 10,
    marginHorizontal: 20,
    borderRadius: 100,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: COLORS.greyish,
  },
  activeCard: {
    borderColor: COLORS.pinkiDark,
  },
  pref: {
    fontSize: 14,
    fontFamily: 'Mulish_700Bold',
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#bbb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: {
    borderColor: COLORS.pinkiDark,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.pinkiDark,
  },
})
