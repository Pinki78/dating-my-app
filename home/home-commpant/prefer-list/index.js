import { StyleSheet, View } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
// import { useSelector } from 'react-redux'

import PreferencesWrapper from './looking-for-comp/preferences-wrapper'
import CommpantText from '../../../components/logo-text/commpant-text'
// import CongratulationsIndex from '../../../components/congratulations/congratulations-index'
import YourInterestsIndex from '../your-interests/your-interests-index'

const PreferListIndex = () => {
  const navigation = useNavigation()



  // ✅ UNIQUE PREFERENCES

  // const [selectedPreferences, setSelectedPreferences] = useState([])
  
  const [showInterests, setShowInterests] = useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      title: '',
      animation: 'fade',
    })
  }, [navigation])

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.root}>
        {showInterests ? (
          <YourInterestsIndex
            // Preferences={preferences}
           
            onBack={() => setShowInterests(false)}
          />
        ) : (
          <View>
            <CommpantText
              HeaderIingText="I am Looking for..."
              SummaryText="Provide us with further insights into your preferences"
            />

            <PreferencesWrapper
              // Preferences={preferences}
              // onContinue={(data) => {
                
              //   setShowCongrats(true)
              // }}
              // selectedPreferences={selectedPreferences}
              // setSelectedPreferences={setSelectedPreferences}
              setShowInterests={setShowInterests}
              showInterests={showInterests}
            />
          </View>
        )}

        {/* {showCongrats && (
          <CongratulationsIndex
            visible={showCongrats}
            // selectedPreferences={selectedPreferences}
            onDone={() => {
              setShowCongrats(false)
              setShowInterests(true)
            }}
          />
        )} */}
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default PreferListIndex

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent:'center'
  },
})
