import { StyleSheet, View } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { useLayoutEffect, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
// import { useSelector } from 'react-redux'

import PreferencesWrapper from './looking-for-comp/preferences-wrapper'
import CommpantText from '../components/logo-text/commpant-text'
// import CongratulationsIndex from '../../../components/congratulations/congratulations-index'
import YourInterestsIndex from '../your-interests'
import {

  Text,

} from 'react-native'
// import { setShowInterests, setSelectedPreferences } from '../react-redux-store/store-comp/uploadProfiles'
import { useSelector, useDispatch } from "react-redux";
import { setShowInterests, setSelectedPreferences } from '../react-redux-store/store-comp/preferencesSlice'


const PreferListIndex = () => {
  const navigation = useNavigation()
   const dispatch = useDispatch();

  const { showInterests ,} = useSelector(
    (state) => state.preferencesStore
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      title: '',
      animation: 'fade',
    })
  }, [navigation])

  useEffect(() => {
    const loadPre = async () => {
      const saved = await AsyncStorage.getItem("USER_PREFERENCES");
      if (saved) {
        setSelectedPreferences(JSON.parse(saved));
      }
    };
    loadPre();
  }, []);

  const handleBack = () => {
    dispatch(setShowInterests(false)); // 👈 RESET
      
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.root}>
        {showInterests ? (
          <YourInterestsIndex
            // Preferences={preferences}
            handleBackInterests={handleBack}
          />
        ) : (
          <View>
            <CommpantText
              HeaderIingText="I am Looking for..."
              SummaryText="Provide us with further insights into your preferences"
            />

            <PreferencesWrapper
              //     selectedPreferences={selectedPreferences}
              // setSelectedPreferences={setSelectedPreferences}
              // setShowInterests={setShowInterests}
              //  showInterests={showInterests}
            />
          </View>
        )}

        {/* {showCongrats && (
          <CongratulationsIndex
            visible={showCongrats}
            // selectedPreferences={selectedPreferences}
            onDone={() => {
              setShowCongrats(false)
              setShowInterests(true)
            }}
          />
        )} */}
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default PreferListIndex

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center'
  },
})
