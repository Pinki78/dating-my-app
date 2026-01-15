import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'

const PreferencesList = (props) => {
  const { Preferences } = props;

  // const ListPreferences =({item} =>{
  //   return(
      
  //   )
  // })

   const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.pref}> {item.PreferencesType}</Text>
      </View>
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
    padding: 12,
    margin: 8,
    borderRadius: 10,
    // backgroundColor: '#fff',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
  },
  pref: {
    marginTop: 6,
    fontStyle: 'italic',
    color: '#555',
  },
});