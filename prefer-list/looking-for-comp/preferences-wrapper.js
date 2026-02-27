import { View } from 'react-native'
import PreferencesList from './preferences-list'

const PreferencesWrapper = (porps) => {

  // const {setShowInterests, showInterests,  selectedPreferences, setSelectedPreferences} = porps;
  return (
    <View>
      <PreferencesList
        // Preferences={Preferences}
        // onContinue={onContinue}
        // selectedPreferences={selectedPreferences}
        // setSelectedPreferences={setSelectedPreferences}
        // setShowInterests={setShowInterests}
        //  showInterests={showInterests}
      />
    </View>
  )
}

export default PreferencesWrapper
