import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
} from 'react-native'
import React, { useState,   useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import COLORS from '../../../../assets/style/color'
import PressableIconButtonGradient from '../../../../components/button/pressable-gradient-icon-button'

import CongratulationsIndex from '../../../../components/congratulations/congratulations-index'
import { useDispatch, useSelector } from 'react-redux'
import { loadProfiles } from '../../../../react-redux-store/store-comp/uploadProfiles'


const PreferencesList = (props) => {
  const { setShowInterests, selectedPreferences, setSelectedPreferences } = props

  const dispatch = useDispatch()

  const { profilesState, loading } = useSelector(
    state => state.profilesApi
  )

  const [showCongrats, setShowCongrats] = useState(false)

  // 🔥 LOAD FIREBASE DATA
  useEffect(() => {
    dispatch(loadProfiles())
  }, [])

  // 🔥 SAFE preferences extraction (STRING OR ARRAY)
  const preferences = [
    ...new Set(
      profilesState.flatMap(p => {
        if (Array.isArray(p.PreferencesType)) {
          return p.PreferencesType
        }
        if (typeof p.PreferencesType === 'string') {
          return [p.PreferencesType]
        }
        return []
      })
    )
  ]

  const toggleSelect = (value) => {
    setSelectedPreferences(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    )
  }

  const savePreferences = async () => {
    if (!selectedPreferences.length) return

    await AsyncStorage.setItem(
      'USER_PREFERENCES',
      JSON.stringify(selectedPreferences)
    )

    setShowCongrats(true)
  }

  const renderItem = ({ item }) => {
    const isSelected = selectedPreferences.includes(item)

    return (
      <Pressable
        onPress={() => toggleSelect(item)}
        style={[styles.card, isSelected && styles.activeCard]}
      >
        <Text style={styles.pref}>{item}</Text>

        <Text style={styles.radio}>
          {isSelected ? '●' : '○'}
        </Text>
      </Pressable>
    )
  }

  if (loading) {
    return <Text style={{ textAlign: 'center' }}>Loading...</Text>
  }

  return (
    <>
      {preferences.length === 0 ? (
        <Text style={{ textAlign: 'center' }}>No preferences found</Text>
      ) : (
        <FlatList
          data={preferences}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={renderItem}
        />
      )}

      <PressableIconButtonGradient
        ButtonTitle="Continue"
        onPress={savePreferences}
        PressableClass={{ marginTop: 20 }}
        disabled={selectedPreferences.length === 0}
      />

      {showCongrats && (
        <CongratulationsIndex
          visible={showCongrats}
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
