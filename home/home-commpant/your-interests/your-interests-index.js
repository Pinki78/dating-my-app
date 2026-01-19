import { StyleSheet, } from "react-native";
import { SafeAreaView, SafeAreaProvider, } from 'react-native-safe-area-context'
import { useLayoutEffect, useState , useEffect } from 'react'
import { useNavigation } from "@react-navigation/native";
import HeaderIocnText from "../../../components/cutom-header/header-iocn-text";
import CommpantText from "../../../components/logo-text/commpant-text";
import InterestsList from "./interests-list";
import UploadPhotoScreen from "../../../upload-your-photo";



const YourInterestsIndex = (props) => {
  const { onBack, } = props;
  const [showUploadPhoto, setShowUploadPhoto] = useState(false)
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      title: "",
      animation: "fade",
    });
  }, [navigation]);


  const [selectedInterests, setSelectedInterests] = useState([]);

  // Restore saved interests (optional but recommended)
  useEffect(() => {
    const loadInterests = async () => {
      const saved = await AsyncStorage.getItem("USER_INTERESTS");
      if (saved) {
        setSelectedInterests(JSON.parse(saved));
      }
    };
    loadInterests();
  }, []);

  return (
    <>
      {showUploadPhoto ? (
        <UploadPhotoScreen interests={selectedInterests} onBack={() => setShowUploadPhoto(false)} />
      ) : (
        <>

          <HeaderIocnText
            icon="arrow-back-circle-outline"

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
selectedInterests={selectedInterests}
                setSelectedInterests={setSelectedInterests}
                setShowUploadPhoto={setShowUploadPhoto}

              />

            </SafeAreaView>

          </SafeAreaProvider>
        </>
      )}




    </>
  );
};

export default YourInterestsIndex;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    // alignItems: "center",
    flexShrink: 1,
  },

  backheaderStyle: {
    paddingRight: 0,
    paddingLeft: 0,
  }
});
