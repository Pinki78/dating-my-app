import { StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView, Text } from 'react-native'
import { SafeAreaView, SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useLayoutEffect, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const HomeIndex = () => {

  
  const insets = useSafeAreaInsets();
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      title: '',
      animation: 'fade',
    });
  }, [navigation]);

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', e => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hide = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);


  return (
    <>

      <SafeAreaProvider>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={[styles.container, { paddingTop: insets.top + 15 }]}


          >
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: keyboardHeight + 20,
              }}
            >
             
    <Text>pinki</Text>
           

            </ScrollView>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </SafeAreaProvider>

 

    </>
  )
}

export default HomeIndex

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdecef",
    paddingHorizontal: 24,

  },



});