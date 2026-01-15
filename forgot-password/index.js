import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView, SafeAreaProvider,useSafeAreaInsets } from 'react-native-safe-area-context'
import  { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
const ForGotPasswordindex = () => {

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      title: '',
        animation: 'fade',
    });
  }, [navigation]);

    const insets = useSafeAreaInsets();
    return (
        <>
            <SafeAreaProvider>
                <SafeAreaView style={[styles.container, { paddingTop: insets.top + 15 }]}> 
                     <Text>ForGotPasswordindex</Text>
                 </SafeAreaView>
            </SafeAreaProvider>
        </>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
});


export default ForGotPasswordindex