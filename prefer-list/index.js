import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView, SafeAreaProvider, } from 'react-native-safe-area-context'
import { useLayoutEffect, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import PreferencesWrapper from './looking-for-comp/preferences-wrapper';
import Headring from '../components/logo-text/headring';

const PreferListIndex = () => {
    // const insets = useSafeAreaInsets();
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
      <SafeAreaProvider>
        <SafeAreaView style={[styles.container, ]} 
        // contentContainerStyle={{ paddingTop: 20,
          
        //  }}
        >
          <Headring 
          HeaderIingText='I am Looking for...'
          SummaryText='Provide us with further insights into your preferences'
          />
          {/* <PreferencesWrapper /> */}
        </SafeAreaView>
      </SafeAreaProvider>

    </>
  )
}

export default PreferListIndex

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdecef",
    justifyContent:'center',
    paddingHorizontal: 24,
  },



});
