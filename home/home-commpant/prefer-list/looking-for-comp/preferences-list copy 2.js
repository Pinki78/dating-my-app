import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import COLORS from '../../assets/style/color';
import CongratulationsIndex from '../../components/congratulations/congratulations-index';
const PreferencesList = ({ Preferences }) => {
  
  const navigation = useNavigation()

  const [selectedIds, setSelectedIds] = useState([])

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter(item => item !== id) // unselect
        : [...prev, id] // select
    )
  }

  const savePreferences = async () => {
    await AsyncStorage.setItem(
      'USER_PREFERENCES',
      JSON.stringify(selectedIds)
    )
    navigation.navigate('Home')
  }

  const renderItem = ({ item }) => {
    const isSelected = selectedIds.includes(item.id)

    return (
      <Pressable
        onPress={() => toggleSelect(item.id)}
        style={[
          styles.card,
          isSelected && styles.activeCard,
        ]}
      >
        <Text style={styles.pref}>{item.PreferencesType}</Text>

        <View
          style={[
            styles.radio,
            isSelected && styles.radioActive,
          ]}
        >
          {isSelected && <View style={styles.radioDot} />}
        </View>
      </Pressable>
    )
  }

  return (
    <>
      <FlatList
        data={Preferences}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />

      <Pressable style={styles.saveBtn} onPress={savePreferences}>
        <Text style={styles.saveText}>Save & Go Home</Text>
      </Pressable>
    </>
  )
}

export default PreferencesList
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
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
    color: '#000',
    fontFamily:'Mulish_700Bold'
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#bbb',
    justifyContent: 'center',
    alignItems: 'center',
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
});
