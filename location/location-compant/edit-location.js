import { StyleSheet, Text, View, Pressable } from "react-native";
import EditFormMap from "./edit-form-map";
// import { useState } from "react";
import IconBtn from "../../components/button/icon-btn";
import COLORS from "../../assets/style/color"; // Assuming you have a color file
import {setEditFrom,setAddress, setLocationAdded,setRegion ,setShowBtn} from "../../react-redux-store/store-comp/locationSlice";
import { useDispatch, useSelector } from "react-redux";



const EditLocation = () => {

  const dispatch = useDispatch();

  const { locationAdded, address, region, editFrom } = useSelector(
    (state) => state.locationStore
  );
  // const [showBnt, setShowBnt] = useState(false); 

  // ✏️ Edit Location

  const editLocationHandler = () => {
         dispatch(setShowBtn (false));
     dispatch(setEditFrom(true));
     
    // setRegion(null);
    // setAddress(null);

  };

  // ❌ Remove Location
  const removeLocationHandler = () => {
    // setLocationAdded(false);
             dispatch(setLocationAdded(false));
              dispatch( setRegion(null));
               dispatch( setAddress(null));
                dispatch( setShowBtn(false));
   
  };


  if (!address) return null;

  return (
    <>

      {!editFrom && (
        <View style={styles.locationCard}>

          {address.houseNo ? (<Text style={styles.locationTitle}>
            <Text style={styles.titles}>House No:</Text>
            {address.houseNo.trim()}
          </Text>) : null}

          {address.plotNo ? (<Text style={styles.locationTitle}>
            <Text style={styles.titles}>Plot No:</Text>
            {address.plotNo.trim() ? `Plot ${address.plotNo.trim()}` : null}
          </Text>) : null}

          {address.premisesNo ? (<Text style={styles.locationTitle}>
            <Text style={styles.titles}>Premises No:</Text>
            {address.premisesNo.trim()}
          </Text>) : null}


          <Text style={styles.locationTitle}>
            <Text style={styles.titles}>City:</Text>
            {address.city}
          </Text>

          <Text style={styles.locationSub}>
            <Text style={styles.titles}>District:</Text>
            {address.district &&
              address.district.toLowerCase() !== address.city.toLowerCase()
              ? `${address.district}, `
              : ""}
            {address.state}
          </Text>

          <Text style={styles.locationSub}>
            <Text style={styles.titles}>Country:</Text>
            {address.country}
          </Text>
          <Text style={styles.locationSub}>
            <Text style={styles.titles}>Pin:</Text>
            {address.pin}
          </Text>

          <View>
            <View style={styles.actionRow}>
              <Pressable onPress={editLocationHandler}>
                <Text style={styles.editText}>Edit</Text>
              </Pressable>

              <Pressable onPress={removeLocationHandler}>
                <Text style={styles.removeText}>Remove</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}



      {/* ✅ FIXED: Conditional rendering logic */}
      {editFrom && (
        <EditFormMap
        // setShowBnt={setShowBnt}
          // address={address}
          // setAddress={setAddress}
          // setLocationAdded={setLocationAdded}
          // setRegion={setRegion}
          closeForm={() =>   dispatch(setEditFrom(false))}
        />
      )}

      {/* {showBnt && (

        <IconBtn
        IonName="arrow-forward-outline"

      />
      )} */}

      {/* <IconBtn
        IonName="arrow-forward-outline"
IconHeader={styles.IconHeader}
      /> */}


    </>
  );
};

export default EditLocation;

const styles = StyleSheet.create({
  IconHeader:{ 
    flex:1,
  },
  locationCard: {
    width: 340,
    padding: 16,
    marginTop: 20,
    borderRadius: 14,
    backgroundColor: "#F8F8F8",
  },

  locationTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  locationSub: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    fontWeight: "600",
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },

  editText: {
    color: "#E91E63",
    fontWeight: "500",
  },


  removeText: {
    color: "#999",
  },
});
