import {  ScrollView } from "react-native";
import ImageCarousel from "./home-commpant/swipe-side";
import { SafeAreaView } from 'react-native-safe-area-context';


const HomeIndex = () => {
  return (
    <>

    <SafeAreaView>
 <ImageCarousel />
      <ScrollView>

        
         
      </ScrollView>

    </SafeAreaView>

    
    </>
  )
}

export default HomeIndex