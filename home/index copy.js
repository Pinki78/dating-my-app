import { StyleSheet, Text, View } from 'react-native'
// import ImageCarousel from "./home-commpant/swipe-side";
import { SafeAreaView, SafeAreaProvider, } from 'react-native-safe-area-context'
import { useLayoutEffect, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import PreferListIndex from "./home-commpant/prefer-list/prefer-index";
import YourInterestsIndex from './home-commpant/your-interests/your-interests-index';
import CongratulationsIndex from '../components/congratulations/congratulations-index';
// PreferListIndex

const HomeIndex = () => {
  const [showCongrats, setShowCongrats] = useState(false);
  const [showInterests, setShowInterests] = useState(false);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      title: '',
      animation: 'fade',
    });
  }, [navigation]);


  return (
    <>

    {/* <SafeAreaView>
 <ImageCarousel />
      <ScrollView>

        
         
      </ScrollView>

    </SafeAreaView> */}

      <SafeAreaProvider>
        <SafeAreaView style={[styles.container, ]} 
        >
          <View style={{ flex: 1 }}>
      {/* Preferences always mounted */}
      {!showInterests && (
        <PreferListIndex
          // Preferences={Preferences}
          
          onContinue={() => setShowInterests(true)}
        />
      )}

      {/* 🎉 Congrats overlay */}
      {showCongrats && (
        <CongratulationsIndex
          visible={showCongrats}
          onDone={() => {
            setShowCongrats(false);
            setShowInterests(true);
          }}
        />
      )}

      {/* ⭐ Interests overlay */}
      {showInterests && (
        <YourInterestsIndex onBack={() => setShowInterests(false)} />
      )}
    </View>
        </SafeAreaView>
      </SafeAreaProvider>

    
    </>
  )
}

export default HomeIndex

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdecef",
    justifyContent:'center',
    paddingHorizontal: 24,
  },



});