import { StyleSheet, Text, View } from 'react-native'
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import AboutIndex from '../../../about';

const Drawer = createDrawerNavigator();

const HeaderDrawer = () => {
  return (
    <>

    {/* <Text>Header f</Text> */}
    {/* <NavigationContainer>
      <Drawer.Navigator>
      
      <Drawer.Screen name="about" component={AboutIndex} />
    </Drawer.Navigator>
    </NavigationContainer> */}
    </>
  )
}

export default HeaderDrawer

const styles = StyleSheet.create({})