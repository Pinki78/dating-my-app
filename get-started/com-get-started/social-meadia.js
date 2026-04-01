import { StyleSheet, View, FlatList } from "react-native";
import PressableBtn from "../../components/button/pressable-btn";
import { useNavigation } from "@react-navigation/native";
import { useGoogleLogin } from "../../firebase/googleLogin";
import { useFacebookLogin } from "../../firebase/facebook-login";

const SocialMeadia = () => {
  const navigation = useNavigation();

  // const { promptAsync: googleLogin } = useGoogleLogin();
  // const { promptAsync, request } = useGoogleLogin();
  const { promptAsync } = useGoogleLogin();
  const { facebookLogin, loading } = useFacebookLogin(navigation);

  const socialList = [
    {
      id: "facebook",
      name: loading ? "Please wait..." : "Login with Facebook",
      ImageUrl: require("../../assets/image/media/facebook.png"),
      onPress: facebookLogin,
    },
    {
      id: "google",
      name: "Login with Google",
      ImageUrl: require("../../assets/image/media/google.png"),
      // onPress: () => {
      //   if (request) {
      //     promptAsync();
      //   } else {
      //     console.log("Google request not ready");
      //   }
      // },
     onPress: () => promptAsync()
    },
  ];

  const socialRenderItem = ({ item, index }) => {
    const isLast = index === socialList.length - 1;

    return (
      <View>
        <PressableBtn
          altText={item.name}
          imageSource={item.ImageUrl}
          btnText={item.name}
          onPress={item.onPress}
          TouchableBtn={[
            styles.touchableBtn,
            { marginBottom: isLast ? 15 : 12 },
          ]}
          imageClass={{
            width: 35,
            height: 35,
            alignItems: "center",
          }}
          ViewContentClass={styles.viewContentClass}
          BtnTextStyles={styles.btnTextStyles}
        />
      </View>
    );
  };

  return (
    <View style={styles.flatListContainer}>
      <FlatList
        data={socialList}
        keyExtractor={(item) => item.id}
        renderItem={socialRenderItem}
      />
    </View>
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