import { StyleSheet, Text, View, FlatList, Linking } from "react-native";
import PressableBtn from "../../components/button/pressable-btn";

const SocialMeadia = () => {
  let Idsocial = 0;

  const getSocialId = (suffix = "") => {
    Idsocial++;
    return `${Idsocial}-${suffix}`;
  };

  const socialList = [
    {
      id: getSocialId("Social"),
      name: " Login with Facebook",
      ImageUrl: require("../../assets/image/media/facebook.png"),
      url: "https://www.facebook.com/login",
    },
    {
      id: getSocialId("Social"),
      name: " Login with Instagram",
      ImageUrl: require("../../assets/image/media/instagram.png"),
      url: "https://www.instagram.com/accounts/login/",
    },
    {
      id: getSocialId("Social"),
      name: " Login with Google",
      ImageUrl: require("../../assets/image/media/google.png"),
      url: "https://accounts.google.com/",
    },
    {
      id: getSocialId("Social"),
      name: " Login with Iphone",
      ImageUrl: require("../../assets/image/media/iphone.png"),
      url: "https://appleid.apple.com/",
    },
  ];

  const socialRenderItem = ({ item, index }) => {
    const isLast = index === socialList.length - 1;
    const handlePress = () => {
      Linking.openURL(item.url);
    };
    return (
      <View style={[styles.socialContainer]}>
        <PressableBtn
          altText={item.name}
          imageSource={item.ImageUrl}
          btnText={item.name}
          onPress={handlePress}
          TouchableBtn={[
            styles.touchableBtn,
            { marginBottom: isLast ? 15 : 12 }, // 👈 dynamic
          ]}
          imageClass={{
            width: 35,
            height: 35,
            alignItems: "center",
          }}
          ViewContentClass={[styles.viewContentClass]}
          // summaryStyle={{
          //     fontSize: 20,
          //     fontWeight: "600",
          //     color: "#000",

          // }}

          BtnTextStyles={[styles.btnTextStyles]}
        />
      </View>
    );
  };

  return (
    <>
      <View style={styles.flatListContainer}>
        <FlatList
          data={socialList}
          keyExtractor={(item) => item.id}
          renderItem={socialRenderItem}
        />
      </View>
    </>
  );
};

export default SocialMeadia;

const styles = StyleSheet.create({
  flatListContainer: {
    marginBottom: 12,
  },

  touchableBtn: {
    shadowColor: "#000",
    elevation: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  btnTextStyles: {
    fontFamily: "Inter_600SemiBold",
    textAlign: "left",
    width: "75%",
  },
  viewContentClass: {
    justifyContent: "space-between",
  },
});
