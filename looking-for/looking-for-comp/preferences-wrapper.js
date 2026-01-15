import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useDispatch, useSelector } from "react-redux";


import PreferencesList from './preferences-list'

const PreferencesWrapper = () => {

 const Preferences = useSelector(state => state.profilesApi.profilesState);

  return (
    <>
      <View>
        <PreferencesList Preferences={Preferences} />
      </View>
    </>
  )
}

export default PreferencesWrapper

const styles = StyleSheet.create({})