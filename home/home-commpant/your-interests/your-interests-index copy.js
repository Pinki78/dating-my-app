import { StyleSheet, } from "react-native";
import React, { useLayoutEffect } from "react";
import { SafeAreaView, SafeAreaProvider, } from 'react-native-safe-area-context'

import { useNavigation } from "@react-navigation/native";
import HeaderIocnText from "../../../components/cutom-header/header-iocn-text";
import CommpantText from "../../../components/logo-text/commpant-text";
import InterestsList
  from "./interests-list";
const YourInterestsIndex = (props) => {
  const { onBack , ListProfiles } = props;

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      title: "",
      animation: "fade",
    });
  }, [navigation]);


// 🔥 collect all interests
const allInterests = (ListProfiles || []).flatMap(
  profile => profile?.ProInterests || []
);

// 🔥 remove duplicates by name
const uniqueInterests = Object.values(
  allInterests.reduce((acc, item) => {
    if (!item?.name) return acc;
    acc[item.name] = item;
    return acc;
  }, {})
);




  return (
    <>
      <HeaderIocnText
        icon="arrow-back-circle-outline"
        headerTitle="Your Interests"
        onBack={onBack}
        BackheaderStyle={styles.backheaderStyle}
      />
      <SafeAreaProvider>

        <SafeAreaView style={[styles.container,]}>


          <CommpantText
            HeaderIingText="Your interests"
            SummaryText="Tell us what piques your curiosity and passions"
          />

          <InterestsList
          
          
          interestsList={uniqueInterests} />

        </SafeAreaView>

      </SafeAreaProvider>



    </>
  );
};

export default YourInterestsIndex;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    // alignItems: "center",
    flex: 1
  },

  backheaderStyle: {
    paddingRight: 0,
    paddingLeft: 0,
  }
});
