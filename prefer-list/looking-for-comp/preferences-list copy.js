import { StyleSheet, Text, View, FlatList, TextInput , Pressable } from 'react-native'
import React, {useState} from 'react'
import COLORS from '../../assets/style/color';

const PreferencesList = (props) => {
  const { Preferences } = props;

  // const ListPreferences =({item} =>{
  //   return(
      
  //   )
  // })

const [selectedId, setSelectedId] = useState(null);



   const renderItem = ({ item }) => {
        const isSelected = selectedId === item.id;
    return (
       <Pressable
        onPress={() => setSelectedId(item.id)}
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
    );
  };

  return (
    <>
       <FlatList
      data={Preferences}
      keyExtractor={(item) => item.id}
      renderItem={ renderItem}
    />
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
