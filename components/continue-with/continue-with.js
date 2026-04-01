import { Button } from 'react-native';
import { StyleSheet, Text, View, FlatList, Pressable, Image, Linking } from 'react-native'
import { Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
const ContinueWith = ({ textUsesrNameLink, headerText, handlePressurl, usesrUp2 }) => {
    const navigation = useNavigation();

    const handlePress = () => navigation.navigate(handlePressurl);
    let Idsocial = 0;

    const getSocialId = (suffix = "") => {
        Idsocial++;
        return `${Idsocial}-${suffix}`;
    };
    const socialList = [
        {
            id: getSocialId("Social"),
            name: "",
            ImageUrl: require("../../assets/image/media/facebook.png"),
            url: "",
            onPress: () => facebookLogin(),
        },
        // {
        //   id: getSocialId("Social"),
        //   name: " Login with Instagram",
        //   ImageUrl: require("../../assets/image/media/instagram.png"),
        //   url: "https://www.instagram.com/accounts/login/",
        //   //  onPress: () => googleLogin(),
        // },
        {
            id: getSocialId("Social"),
            name: "",
            ImageUrl: require("../../assets/image/media/google.png"),
            url: "",
            onPress: () => googleLogin(),
        },
        // {
        //   id: getSocialId("Social"),
        //   name: " Login with Iphone",
        //   ImageUrl: require("../../assets/image/media/iphone.png"),
        //   url: "https://appleid.apple.com/",
        // },
    ];


    const socialRenderItem = ({ item, index }) => {
        const isLast = index === socialList.length - 1;
        // const handlePress = () => {
        //   Linking.openURL(item.url);
        // };
        return (
            <View style={[styles.socialContainer]}>
                <Pressable

                    style={({ pressed }) => [
                        styles.iconBtn,
                        pressed && styles.pressed, //
                        Platform.OS === "ios" && pressed && { opacity: 0.7 },
                        { marginRight: isLast ? 0 : 12 },
                    ]}
                >
                    <Image
                        source={item.ImageUrl}
                        accessible={true}
                        accessibilityLabel={item.name}
                        style={[styles.image, { width: 20, height: 20, }]}
                    />
                </Pressable>
            </View>
        );
    };


    return (
        <>
            <View>
                
                <View style={styles.headerRow}>
                    <View style={styles.line} />
                    <Text style={styles.headerText}>{headerText}</Text>
                    <View style={styles.line} />
                </View>
                <View style={styles.flatListContainer}>
                    <FlatList
                        data={socialList}
                        keyExtractor={(item) => item.id}
                        renderItem={socialRenderItem}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.socialRow}
                    />
                </View>
                <View style={[styles.usesrUp, usesrUp2]}>
                    <Text style={[styles.signUptext,]}>Don’t have an account?</Text>

                    <Pressable
                        onPress={handlePress}
                        style={({ pressed }) => [
                            styles.resetHereBtn,
                            {
                                opacity: pressed ? 0.55 : 1,
                                transform: [{ scale: pressed ? 0.97 : 1 }],
                            },
                        ]}
                    >
                        {({ pressed }) => (
                            <Text
                                style={[
                                    styles.btnTextStyles,
                                    { color: pressed ? '#E94057' : '#2A3E93' },
                                ]}
                            >
                                {textUsesrNameLink}
                            </Text>
                        )}
                    </Pressable>


                </View>


            </View>
        </>
    )
}

export default ContinueWith

const styles = StyleSheet.create({

    usesrUp: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50
    },
    signUptext: {
        fontFamily: 'Urbanist_600SemiBold',
        marginRight: 6,
        color: '#555',
    },
    btnTextStyles: {
        fontFamily: 'Urbanist_600SemiBold',
        backgroundColor: 'transparent',
        color: '#E94057',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    headerText: {
        marginHorizontal: 10,
        fontSize: 12,
        fontWeight: '600',
        fontFamily: 'Inter_400Regular',
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#ccc',
    },

    iconBtn: {
        textAlign: 'center',
        // marginBottom:20,
        borderRadius: 56,
        shadowOffset: { width: 0, height: 8 },
        backgroundColor: "#fdf9f9",
        padding: 10,
        marginRight: 15

    },
    socialRow: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    // btnTextStyles: {
    //     fontFamily: 'Inter_600SemiBold',
    //     textAlign: 'left',
    //     width: '75%',
    // },

    pressed: {
        opacity: 0.75,
    },
    pressedPathe: {
        opacity: 0.55,
    }


});