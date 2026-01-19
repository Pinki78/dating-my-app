import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
} from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import COLORS from '../../assets/style/color'
import CongratulationsIndex from '../../components/congratulations/congratulations-index'

const PreferencesList = ({ Preferences }) => {
  const navigation = useNavigation()

  // ✅ SINGLE selected value
  const [selectedPreference, setSelectedPreference] = useState(null)
  const [showCongrats, setShowCongrats] = useState(false)

  const savePreferences = async () => {
    if (!selectedPreference) return

    await AsyncStorage.setItem(
      'USER_PREFERENCE',
      selectedPreference
    )

    setShowCongrats(true)
  }

  const renderItem = ({ item }) => {
    const isSelected = selectedPreference === item

    return (
      <Pressable
        onPress={() => setSelectedPreference(item)}
        style={[styles.card, isSelected && styles.activeCard]}
      >
       

        <View style={[styles.radio, isSelected && styles.radioActive]}>
          {isSelected && <View style={styles.radioDot} />}
        </View>
      </Pressable>
    )
  }

  return (
    <>
      <FlatList
        data={Preferences}
        keyExtractor={(item) => item}
        renderItem={renderItem}
      />

      <Pressable
        style={[
          styles.saveBtn,
          !selectedPreference && { opacity: 0.5 }
        ]}
        onPress={savePreferences}
        disabled={!selectedPreference}
      >
        <Text style={styles.saveText}>Continue</Text>
      </Pressable>

      
    </>
  )
}

export default PreferencesList
