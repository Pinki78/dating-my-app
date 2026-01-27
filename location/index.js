import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Image,
} from "react-native";
import { useLayoutEffect, useState, useEffect } from 'react'

import { useNavigation } from '@react-navigation/native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import HeaderIocnText from "../components/cutom-header/header-iocn-text";
import CommpantText from "../components/logo-text/commpant-text";

const LocationIndex = () => {

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            title: '',
            animation: 'fade',
        })
    }, [navigation])

    /* 🔹 SAVE Redux photos → AsyncStorage */



    const handleBack = () => {
        // navigation.goBack('upload-your-photo');
        navigation.goBack();
    };



    return (
        <>



            <SafeAreaProvider>

                <SafeAreaView style={[styles.container,]}>
                    <HeaderIocnText
                        icon="arrow-back-circle-outline"
                        onBack={handleBack}
                        BackheaderStyle={styles.backheaderStyle}
                    />

                    <CommpantText
                        HeaderIingText="Upload your photo"
                        SummaryText=" We'd love to see you. Upload a photo for your dating journey."
                    />

                    <Text>Pinki</Text>
                </SafeAreaView>

            </SafeAreaProvider>



        </>
    )
}

export default LocationIndex

const styles = StyleSheet.create({

    backheaderStyle: {
        paddingRight: 0,
        paddingLeft: 0,
    },

    container: {
        justifyContent: "flex-start",
        paddingHorizontal: 24,
        flexShrink: 1,
    },

})