import { StyleSheet, Text, View, Image, Pressable, ActivityIndicator, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

import PressableIconButtonGradient from "../../components/button/pressable-gradient-icon-button";
import EditLocation from "./edit-location";
import COLORS from "../../assets/style/color"; // Assuming you have a color file


import {

  saveLocationToStorage,
  setLocation,
  setLocationAdded,
  setAddress,
  setRegion,
  setShowBtn

} from "../../react-redux-store/store-comp/locationSlice";
// import AsyncStorage from "@react-native-async-storage/async-storage";

import { useDispatch, useSelector } from "react-redux";

const PickLocation = () => {

  const dispatch = useDispatch();

  const { locationAdded, address, region, editFrom } = useSelector(
    (state) => state.locationStore
  );

  const [isLoading, setIsLoading] = useState(false);

  // 🔁 Restore from AsyncStorage on mount


  // 📍 Reverse Geocode
  const performPick = async (latitude, longitude) => {
    try {
      const addressArr = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (!addressArr?.length) return;

      const addr = addressArr[0];
      const normalizedDistrict =
        addr.district &&
          addr.city &&
          addr.district.toLowerCase() === addr.city.toLowerCase()
          ? addr.subregion || addr.district
          : addr.district;

      // Build new address object
      const newAddress = {
        houseNo: addr.name || addr.street || "",
        plotNo: "",
        premisesNo: addr.street || "",
        city: addr.city || addr.subregion || addr.district || "Unknown City",
        district: normalizedDistrict || "",
        state: addr.region || "",
        pin: addr.postalCode || "",
        country: addr.country || "",
      };

      // Save in Redux
      dispatch(setAddress(newAddress));
    } catch (e) {
      console.error("Pick error:", e);
    }
  };

  // 📍 Current location
  const getCurrentLocation = async () => {
    setIsLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission denied");
        return;
      }

      let location = await Location.getLastKnownPositionAsync({});
      if (!location) {
        location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
      }

      const { latitude, longitude } = location.coords;
      const regionData = {
        latitude,
        longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };
      dispatch(setRegion(regionData));
      // setRegion(regionData);
      await performPick(latitude, longitude);
    } finally {
      setIsLoading(false);
    }
  };

  // 🗺️ Map drag
  const handleRegionChange = (newRegion) => {
    // setRegion(newRegion);
    dispatch(setRegion(newRegion));
    performPick(newRegion.latitude, newRegion.longitude);
  };

  // ✅ Confirm location
  const addLocationHandler = async () => {
    if (!address?.houseNo?.trim()) {
      alert("Please enter house / flat number");
      return;
    }

    const payload = { region, address };

    // ✅ Save to Redux
    dispatch(setLocation(payload));
    dispatch(setLocationAdded(true));
    dispatch(setShowBtn(true));

    // ✅ Save to AsyncStorage
    await saveLocationToStorage(payload);
  };



  return (
    <>
      <View style={styles.LocationWrapper}>
        {!region && !locationAdded && !isLoading && (
          <>
            <View style={styles.imageWrapper}>
              <Image
                source={require("../../assets/image/icon/location.png")}
                style={styles.image}
                resizeMode="contain"
              />
            </View>

            <View style={styles.btnGroup}>
              <PressableIconButtonGradient
                ButtonTitle="Allow Location Access"
                PressableClass={styles.pressable}
                onPress={getCurrentLocation}
              />

              <Pressable>
                <Text style={styles.manualText}>Enter Location Manually</Text>
              </Pressable>
            </View>
          </>
        )}

        {/* Loading State */}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#E91E63" />
            <Text style={styles.loadingText}>Fetching your location...</Text>
          </View>
        )}

        {region && !locationAdded && !isLoading && (
          <>
            <View style={styles.mapWrapper}>
              <MapView style={styles.map} onRegionChangeComplete={handleRegionChange} region={region} showsUserLocation>
                <Marker coordinate={region} />
              </MapView>
            </View>

            {address && (
              <View style={styles.addressBox}>
                <Text style={styles.addressText}>
                  {[
                    address.houseNo?.trim() || null,
                    address.plotNo?.trim() ? `Plot ${address.plotNo.trim()}` : null,
                    address.premisesNo?.trim() || null,
                    address.city || null,
                    address.district &&
                      address.district.toLowerCase() !== address.city?.toLowerCase()
                      ? address.district
                      : null,
                    address.state || null,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </Text>

                <Text style={styles.addressSubText}>
                  {[address.pin, address.country].filter(Boolean).join(", ")}
                </Text>
              </View>
            )}

            <PressableIconButtonGradient
              ButtonTitle="Confirm Location"
              PressableClass={styles.pressable}
              onPress={addLocationHandler}
            />
          </>
        )}
        
        {locationAdded && address && !isLoading && (
          <EditLocation
            editFrom={editFrom}
            // setEditFrom={setEditFrom}
            address={address}
            // setLocationAdded={setLocationAdded}
            setRegion={setRegion}
            setAddress={setAddress}
          />
        )}


      </View>




    </>
  );
};

export default PickLocation;

const styles = StyleSheet.create({
  LocationWrapper: {

    alignItems: "center",
    paddingHorizontal: 16,
    width: "100%",
  },
  imageWrapper: {
    marginTop: 40,
  },
  image: {
    width: 120,
    height: 120,
  },
  btnGroup: {
    width: "100%",
    justifyContent: "center",
    marginTop: 20,
    alignItems: "center",
  },
  manualText: {
    color: "#E91E63",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 12,
  },
  pressable: {
    width: "100%",
    marginTop: 20,
  },
  loadingContainer: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
  },
  mapWrapper: {
    width: "100%",
    marginTop: 20,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  map: {
    width: "100%",
    height: 250,
  },
  addressBox: {
    marginVertical: 20,
    alignItems: "center",
  },
  addressText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  addressSubText: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
});