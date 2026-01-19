import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView, SafeAreaProvider, } from 'react-native-safe-area-context'
import { useLayoutEffect, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import PreferencesWrapper from './looking-for-comp/preferences-wrapper';
import CommpantText from '../../../components/logo-text/commpant-text';

import CongratulationsIndex from '../../../components/congratulations/congratulations-index';
import YourInterestsIndex from '../your-interests/your-interests-index';

const PreferListIndex = (props) => {
  // const {  showCongrats, setShowCongrats, showInterests, setShowInterests } = props;
  // const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [showCongrats, setShowCongrats] = useState(false);
  const [showInterests, setShowInterests] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      title: '',
      animation: 'fade',
    });
  }, [navigation]);


  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={[styles.container,]}
        >
          {!showInterests && (
            <View  >
              <CommpantText
                HeaderIingText='I am Looking for...'
                SummaryText='Provide us with further insights into your preferences'
              />
              <PreferencesWrapper
                onContinue={() => setShowCongrats(true)}   // 👈 trigger congrats
                showCongrats={showCongrats}
                setShowCongrats={setShowCongrats}
                showInterests={showInterests}
                setShowInterests={setShowInterests}
              />
            </View>
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
        </SafeAreaView>
      </SafeAreaProvider>


      {/* ⭐ Interests overlay */}
      {showInterests && (
  <View style={styles.overlay}>
    <YourInterestsIndex onBack={() => setShowInterests(false)} />
  </View>
)}

    </>
  )
}

export default PreferListIndex

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: "#fdecef",
    paddingHorizontal: 24,
  },

overlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: '#fff',
  zIndex: 10,
}

});
