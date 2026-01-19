import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
} from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import COLORS from '../../../../assets/style/color'
import PressableIconButtonGradient from '../../../../components/button/pressable-gradient-icon-button'
import { useSelector } from 'react-redux'
import CongratulationsIndex from '../../../../components/congratulations/congratulations-index'



const PreferencesList = (porps) => {

const {setShowInterests, showInterests} = porps;
  const profiles = useSelector(
    state => state.profilesApi.profilesState
  )

  const [showCongrats, setShowCongrats] = useState(false)
  // ✅ MULTI SELECT STATE

  const preferences = [
    ...new Set(profiles.map(p => p.PreferencesType).filter(Boolean))
  ]


  const [selectedPreferences, setSelectedPreferences] = useState([])

  const toggleSelect = (value) => {
    setSelectedPreferences(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    )
  }

  const savePreferences = async () => {
    if (selectedPreferences.length === 0) return

    await AsyncStorage.setItem(
      'USER_PREFERENCES',
      JSON.stringify(selectedPreferences)
    )
setShowCongrats(true)
    // onContinue(selectedPreferences) // ✅ PASS TO PARENT
  }

  const renderItem = ({ item }) => {
    const isSelected = selectedPreferences.includes(item)

    return (
      <Pressable
        onPress={() => toggleSelect(item)}
        style={[styles.card, isSelected && styles.activeCard]}
      >
        <Text style={styles.pref}>{item}</Text>

        <View style={[styles.radio, isSelected && styles.radioActive]}>
          {isSelected && <View style={styles.radioDot} />}
        </View>
      </Pressable>
    )
  }

  return (
    <>
      <FlatList
        data={preferences}
        keyExtractor={(item) => item}
        renderItem={renderItem}
      />

      <PressableIconButtonGradient
        ButtonTitle="Continue"
        onPress={savePreferences}
        PressableClass={{ marginTop: 20 }}
        disabled={selectedPreferences.length === 0}
      />

      {showCongrats && (
          <CongratulationsIndex
            visible={showCongrats}
            // selectedPreferences={selectedPreferences}
            onDone={() => {
              setShowCongrats(false)
              setShowInterests(true)
            }}
          />
        )}
    </>
  )
}

export default PreferencesList

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 10,
    marginHorizontal: 20,
    borderRadius: 100,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: COLORS.greyish,
  },
  activeCard: {
    borderColor: COLORS.pinkiDark,
  },
  pref: {
    fontSize: 14,
    fontFamily: 'Mulish_700Bold',
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#bbb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: {
    borderColor: COLORS.pinkiDark,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.pinkiDark,
  },
})
