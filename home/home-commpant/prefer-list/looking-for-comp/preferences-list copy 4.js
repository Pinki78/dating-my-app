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
import COLORS from '../../../../assets/style/color'
// import CongratulationsIndex from '../../../../components/congratulations/congratulations-index'
import PressableIconButtonGradient from '../../../../components/button/pressable-gradient-icon-button'

// import YourInterestsIndex from '../../your-interests/your-interests-index'

const PreferencesList = ({ Preferences, onContinue, }) => {
  const navigation = useNavigation()

  const [selectedIds, setSelectedIds] = useState([])
//   const [showCongrats, setShowCongrats] = useState(false)
// const [showInterests, setShowInterests] = useState(false);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const savePreferences = async () => {
    await AsyncStorage.setItem(
      'USER_PREFERENCES',
      JSON.stringify(selectedIds)
    )
    onContinue()
  }

  const renderItem = ({ item }) => {
    const isSelected = selectedIds.includes(item.id)

    return (
      <Pressable
        onPress={() => toggleSelect(item.id)}
        style={[styles.card, isSelected && styles.activeCard]}
      >
        <Text style={styles.pref}>{item.PreferencesType}</Text>

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

      <PressableIconButtonGradient 
      
       ButtonTitle={'Continue'}
                onPress={savePreferences}
                 PressableClass={{ marginTop: 20 }}
                // disabled={loading}
       />
       

      {/* 🎉 Congratulations Modal */}
      {/* <CongratulationsIndex
        visible={showCongrats}
        onDone={() => {
          setShowCongrats(false)
          navigation.replace('Home')
        }}
      /> */}

   {/* 🎉 Congratulations overlay */}
    
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
    fontFamily: 'Mulish_700Bold',
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
  saveBtn: {
    backgroundColor: COLORS.pinkiDark,
    margin: 20,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})
