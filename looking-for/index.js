import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView, SafeAreaProvider, } from 'react-native-safe-area-context'
import { useLayoutEffect, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import PreferencesWrapper from './looking-for-comp/preferences-wrapper';

const LookingForIndex = () => {
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
        <SafeAreaView style={[styles.container, ]}>
          <PreferencesWrapper />
        </SafeAreaView>
      </SafeAreaProvider>

    </>
  )
}

export default LookingForIndex

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
});
