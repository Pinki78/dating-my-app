import { StyleSheet, Text, View, FlatList } from 'react-native'
import PressableBtn from '../../components/button/pressable-btn';

const SocialMeadia = () => {

    let Idsocial = 0;

    const getSocialId = (suffix = "") => {
        Idsocial++
        return `${Idsocial}-${suffix}`
    }

    const socialList = [
        {
            id: getSocialId("Social"),
            name: "Facebook",
            ImageUrl: require("../../assets/image/media/facebook.png")
        },
        {
            id: getSocialId("Social"),
            name: "Instagram",
            ImageUrl: require("../../assets/image/media/instagram.png")
        },
        {
            id: getSocialId("Social"),
            name: "Google",
            ImageUrl: require("../../assets/image/media/google.png")
        },
        {
            id: getSocialId("Social"),
            name: "Iphone",
            ImageUrl: require("../../assets/image/media/iphone.png")
        },
    ];


    const socialRenderItem = ({ item }) => {
        return (
            <View style={styles.socialContainer}>
                <PressableBtn
                    altText={item.name}
                    imageSource={item.ImageUrl}
                    btnText={item.name}
                    TouchableBtn={{
                        shadowColor: "#000",
                        elevation: 6,
                    }}
                    imageClass={{
                        width: 35,
                        height: 35,
                        alignItems: "center",
                    }}

                    summaryStyle={{
                        fontSize: 20,
                        fontWeight: "600",
                        color: "#000",
                    }}
                />
            </View>
        );
    };


    return (
        <>
            <View style={styles.container}>
                <FlatList
                    data={socialList}
                    keyExtractor={(item) => item.id}
                    renderItem={socialRenderItem}
                />
            </View>
        </>
    )
}

export default SocialMeadia

const styles = StyleSheet.create({})