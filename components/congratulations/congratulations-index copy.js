import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

const CongratulationsIndex = (props) => {
  const { replacePath } = props;
  const navigation = useNavigation()
  const [preferences, setPreferences] = useState([])

  useEffect(() => {
    const loadData = async () => {
      const data = await AsyncStorage.getItem('USER_PREFERENCES')
      if (data) {
        setPreferences(JSON.parse(data))
      }
    }

    loadData()

    const timer = setTimeout(() => {
      navigation.replace(replacePath)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Congratulations!</Text>

      <Text style={styles.subtitle}>Your preferences saved</Text>

      <View style={styles.list}>
        {preferences.map((item, index) => (
          <Text key={index} style={styles.item}>
            • {item}
          </Text>
        ))}
      </View>
    </View>
  )
}

export default CongratulationsIndex


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ff2e93',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
  },
  list: {
    marginTop: 10,
  },
  item: {
    fontSize: 14,
    color: '#000',
    marginVertical: 2,
  },
})
