import { View, StyleSheet } from 'react-native'
import LetsYouIn from './com-get-started/lets-you-in'

import { SafeAreaView } from 'react-native-safe-area-context'

const GetStartedIndex = () => {
  return (
    <>
      <SafeAreaView style={[styles.container , styles.LetYouIn]}>
        <View>
          <LetsYouIn />
        </View>
      </SafeAreaView>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: "#fdecef",
  },

  LetYouIn:{
    justifyContent:'center',
    // alignItems:'center',

  }
  
});

export default GetStartedIndex