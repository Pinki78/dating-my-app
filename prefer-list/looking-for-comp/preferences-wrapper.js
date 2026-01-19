import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useDispatch, useSelector } from "react-redux";


import PreferencesList from './preferences-list'

// export const selectUniquePreferences = state =>
//   [...new Set(
//     state.profilesApi.profilesState.map(p => p.PreferencesType)
//   )];

const PreferencesWrapper = () => {

//  const Preferences = useSelector(state => state.profilesApi.profilesState);

//  const profiles = useSelector(state => state.profilesApi.profilesState);

  // ✅ Create UNIQUE PreferencesType list
  // const preferences = useMemo(() => {
  //   return [...new Set(
  //     profiles
  //       .map(item => item.PreferencesType)
  //       .filter(Boolean)
  //   )];
  // }, [profiles]);

  // profilesSelectors.js
// const preferences = useSelector(selectUniquePreferences);


  const profiles = useSelector(
    state => state.profilesApi.profilesState
  );
  const shownpreferences = new Set();
  // ✅ REMOVE DUPLICATES HERE
  // const preferences = [
  //   ...new Set(
  //     profiles
  //       .map(item => item.PreferencesType)
  //       .filter(Boolean)
  //   )
  // ];

//  const uniquePreferences = profiles.filter(item => {
//   if (shownpreferences.has(item.PreferencesType)) return false;
//   shownpreferences.add(item.PreferencesType);
//   return true;
// });

// const preferences = [
//   ...new Set(
//     profiles.map(p => p.PreferencesType).filter(Boolean)
//   )
// ];


  return (
    <>
      <View>
        <PreferencesList Preferences={preferences} />
      </View>
    </>
  )
}

export default PreferencesWrapper

const styles = StyleSheet.create({})