import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView, SafeAreaProvider, } from 'react-native-safe-area-context'
import { useLayoutEffect, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import PreferencesWrapper from './looking-for-comp/preferences-wrapper';
import CommpantText from '../../../components/logo-text/commpant-text';

import CongratulationsIndex from '../../../components/congratulations/congratulations-index';
import YourInterestsIndex from '../your-interests/your-interests-index';

import { useDispatch, useSelector } from "react-redux";
const PreferListIndex = (props) => {
  // const {  showCongrats, setShowCongrats, showInterests, setShowInterests } = props;
  // const insets = useSafeAreaInsets();

  // const Preferences = useSelector(state => state.profilesApi.profilesState);

    const profiles = useSelector(
      state => state.profilesApi.profilesState
    );

const preferences = [
  ...new Set(
    profiles.map(p => p.PreferencesType).filter(Boolean)
  )
];

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
        <SafeAreaView style={styles.root}>
          {showInterests ? (
            <YourInterestsIndex Preferences={preferences} onBack={() => setShowInterests(false)} />
          ) : (
            <View>
              <CommpantText
                HeaderIingText="I am Looking for..."
                SummaryText="Provide us with further insights into your preferences"
              />

              <PreferencesWrapper
                onContinue={() => setShowCongrats(true)}
                showCongrats={showCongrats}
                setShowCongrats={setShowCongrats}
                Preferences={preferences}
              />
            </View>
          )}

          {showCongrats && (
            <CongratulationsIndex
              visible={showCongrats}
               onDone={(data) => {
                setSelectedPreferences(data)   // 👈 receive data
                setShowCongrats(true)
              }}
            />
          )}
        </SafeAreaView>
      </SafeAreaProvider>

    </>
  )
}

export default PreferListIndex

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  }

});
