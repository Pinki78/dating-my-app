import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { useState } from "react";
import COLORS from "../../assets/style/color";

const EditFormMap = ({ address, setAddress, closeForm }) => {
  // Local state for the input fields
  const [newCity, setNewCity] = useState(address.city);
  const [newDistrict, setNewDistrict] = useState(address.district);
    const [newCountry, setNewCountry] = useState(address.country);
  const [newPin, setNewPin] = useState(address.pin);
  const [newState, setNewState] = useState(address.state);
  const saveHandler = () => {
    // Update the parent state with the new values
    setAddress({
      ...address,
      city: newCity,
      district: newDistrict,
      country: newCountry,
      state: newState,
      pin:newPin


    });
    closeForm(); // Hide the form and go back to the card
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Edit City</Text>
      <TextInput
        style={styles.input}
        value={newCity}
        onChangeText={setNewCity}
        placeholder="Enter City"
      />

      <Text style={styles.label}>Edit District</Text>
      <TextInput
        style={styles.input}
        value={newDistrict}
        onChangeText={setNewDistrict}
        placeholder="Enter District"
      />

      <Text style={styles.label}>Edit District</Text>
      <TextInput
        style={styles.input}
        value={newDistrict}
        onChangeText={setNewDistrict}
        placeholder="Enter District"
      />

      <Text style={styles.label}>Edit District</Text>
      <TextInput
        style={styles.input}
        value={newDistrict}
        onChangeText={setNewDistrict}
        placeholder="Enter District"
      />

      <View style={styles.btnRow}>
        <Pressable style={styles.saveBtn} onPress={saveHandler}>
          <Text style={styles.saveText}>Save Changes</Text>
        </Pressable>
        
        <Pressable onPress={closeForm}>
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default EditFormMap;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  label: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  btnRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  saveBtn: {
    backgroundColor: "#E91E63",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  saveText: {
    color: "#fff",
    fontWeight: "600",
  },
  cancelText: {
    color: "#999",
  },
});