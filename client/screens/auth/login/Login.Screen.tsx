import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  Entypo,
  FontAwesome,
  Fontisto,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { LinearGradient } from "expo-linear-gradient";
import {
  useFonts,
  Raleway_700Bold,
  Raleway_600SemiBold,
} from "@expo-google-fonts/raleway";
import {
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_700Bold,
  Nunito_600SemiBold,
} from "@expo-google-fonts/nunito";
import { useState } from "react";
import { commonStyles } from "@/styles/common/commn.styles";
import { router } from "expo-router";
// import { styles } from "@/styles/onboarding/onboard";

export default function LoginScreen() {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [buttonSpinner, setButtonSpinner] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [required, setRequired] = useState("");
  const [error, setError] = useState({
    password: "",
  });
  const handlePasswordValidation = (value: string) => {
    const password = value;
    const passwordSpecialCharacter = /(?=.*[!@#$&*])/;
    const passwordOneNumber = /(?=.*[0-9])/;
    const passwordSixValue = /(?=.{6,})/;

    if (!passwordSpecialCharacter.test(password)) {
      setError({
        ...error,
        password: "Write at least one special character",
      });
      setUserInfo({ ...userInfo, password: "" });
    } else if (!passwordOneNumber.test(password)) {
      setError({
        ...error,
        password: "Write at least one number",
      });
      setUserInfo({ ...userInfo, password: "" });
    } else if (!passwordSixValue.test(password)) {
      setError({
        ...error,
        password: "Write at least 6 characters",
      });
      setUserInfo({ ...userInfo, password: "" });
    } else {
      setError({
        ...error,
        password: "",
      });
      setUserInfo({ ...userInfo, password: value });
    }
  };

  const handleSignIn = () => {};

  let [fontsLoaded, fontError] = useFonts({
    Raleway_600SemiBold,
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_700Bold,
    Nunito_600SemiBold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <LinearGradient
      colors={["#E5ECF9", "#F6F7F9"]}
      style={{ flex: 1, paddingTop: 20 }}
    >
      <ScrollView>
        <Image
          source={require("@/assets/sign-in/sign_in.png")}
          style={styles.signInImage}
        />

        <Text style={[styles.welcomeText, { fontFamily: "Raleway_700Bold" }]}>
          Our School 🏤
        </Text>
        <Text style={styles.learningText}>SignIn Your Account Of Learning Management System Application</Text>

        <View style={styles.inputContainer}>
          <View>
            {/* Input Email Start */}
            <TextInput
              style={[styles.input, { paddingLeft: 40 }]}
              keyboardType="email-address"
              value={userInfo.email}
              placeholder="Your Email "
              onChangeText={(value) =>
                setUserInfo({ ...userInfo, email: value })
              }
            />
            {/* Input Email End */}

            <Fontisto
              style={{ position: "absolute", left: 26, top: 17.8 }}
              name="email"
              size={20}
              color={"#A1A1A1"}
            />
            {/* Error Icon Start */}
            {required && (
              <View style={commonStyles.errorContainer}>
                <Entypo name="cross" size={18} color={"red"} />
              </View>
            )}
            {/* Error Icon end */}
            {/* Input Passsword Start */}
            <View style={{ marginTop: 15 }}>
              <TextInput
                style={commonStyles.input}
                keyboardType="default"
                secureTextEntry={!isPasswordVisible}
                defaultValue=""
                placeholder="********"
                onChangeText={handlePasswordValidation}
              />

              <TouchableOpacity
                style={styles.visibleIcon}
                onPress={() => setPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? (
                  <Ionicons
                    name="eye-off-outline"
                    size={23}
                    color={"#747474"}
                  />
                ) : (
                  <Ionicons name="eye-outline" size={23} color={"#747474"} />
                )}
              </TouchableOpacity>
              <SimpleLineIcons
                style={styles.icon2}
                name="lock"
                size={20}
                color={"#A1A1A1"}
              />
            </View>
            {/* Input Passsword End */}

            {/* Input Passsword show */}
            {error.password && (
              <View style={[commonStyles.errorContainer, { top: 145 }]}>
                <Entypo name="cross" size={18} color={"red"} />
                <Text style={{ color: "red", fontSize: 11, marginTop: -1 }}>
                  {error.password}
                </Text>
              </View>
            )}
            {/* Input Passsword Hide */}

            {/* forgot-password start */}
            <TouchableOpacity onPress={() => router.push("forgot-password")}>
              <Text
                style={[
                  styles.forgotSection,
                  { fontFamily: " Nunito_600SemiBold" },
                ]}
              >
                Forgot Password
              </Text>
            </TouchableOpacity>
            {/* forgot-password End */}

            {/* SignIn Button Start */}
            <TouchableOpacity
              style={{
                padding: 16,
                borderRadius: 8,
                marginHorizontal: 16,
                backgroundColor: "#2467EC",
                marginTop: 15,
              }}
              onPress={handleSignIn}
            >
              {buttonSpinner ? (
                <ActivityIndicator size="small" color={"white"} />
              ) : (
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontSize: 16,
                    fontFamily: "Raleway_700Bold",
                  }}
                >
                  Sign In
                </Text>
              )}
            </TouchableOpacity>
            {/* SignIn Button End */}

            {/*   Link Start*/}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
                gap: 10,
              }}
            >
              <TouchableOpacity>
                <FontAwesome name="google" size={30} />
              </TouchableOpacity>
              <TouchableOpacity>
                <FontAwesome name="facebook" size={30} />
              </TouchableOpacity>
              <TouchableOpacity>
                <FontAwesome6 name="x-twitter" size={30} />
              </TouchableOpacity>
              <TouchableOpacity>
                <FontAwesome name="github" size={30} />
              </TouchableOpacity>
            </View>
            {/*   Link End */}

            {/*  SiginUp Link Start*/}

            <View style={styles.signupRedirect}>
              <Text style={{ fontSize: 18, fontFamily: "Raleway_600SemiBold" }}>
                Don't have an account?
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/(routes)/sign-up")}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "Raleway_600SemiBold",
                    color: "#2467EC",
                    marginLeft: 5,
                  }}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
            {/*  SiginUp Link end*/}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  signInImage: {
    width: "60%",
    height: 250,
    alignSelf: "center",
    marginTop: 50,
  },
  welcomeText: {
    textAlign: "center",
    fontSize: 24,
  },
  learningText: {
    textAlign: "center",
    color: "#575757",
    fontSize: 15,
    marginTop: 5,
  },
  inputContainer: {
    marginHorizontal: 16,
    marginTop: 30,
    rowGap: 30,
  },
  input: {
    height: 55,
    marginHorizontal: 16,
    borderRadius: 8,
    paddingLeft: 35,
    fontSize: 16,
    backgroundColor: "white",
    color: "#A1A1A1",
  },
  visibleIcon: {
    position: "absolute",
    right: 30,
    top: 15,
  },
  icon2: {
    position: "absolute",
    left: 23,
    top: 17.8,
    marginTop: -2,
  },
  forgotSection: {
    marginHorizontal: 16,
    textAlign: "right",
    fontSize: 16,
    marginTop: 10,
  },
  signupRedirect: {
    flexDirection: "row",
    marginHorizontal: 16,
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20,
  },
});
