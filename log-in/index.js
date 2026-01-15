import { StyleSheet,TouchableWithoutFeedback,Keyboard, } from 'react-native'
import { SafeAreaView, SafeAreaProvider,  } from 'react-native-safe-area-context'
import LogoText from '../components/logo-text/logo-and-text'
import ModuleLogIn from './login-compo/log-in-module'
import { useLayoutEffect, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
const LogInIndex = () => {
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
        <TouchableWithoutFeedback>
          <SafeAreaView style={[styles.container,]} >
            <LogoText
              LogoHeader="Welcome Back"
              Summary='Login to continue'
              headerStyle={{
                fontFamily: 'Urbanist_600SemiBold',
                fontSize: 25,
              }}
              summaryStyle={{
                fontSize: 14,
                fontFamily: 'Urbanist_600SemiBold',
              }}
            />

            <ModuleLogIn />


          </SafeAreaView>
        </TouchableWithoutFeedback>
      </SafeAreaProvider>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: "#fdecef",
    justifyContent:'center',
  },



});

export default LogInIndex