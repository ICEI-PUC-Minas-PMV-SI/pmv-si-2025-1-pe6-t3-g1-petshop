import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Dimensions } from "react-native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import CustomRootLayout from "../components/CustomRootLayout";
import { TamaguiProvider } from "tamagui";
import config from "../tamagui.config";

import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const { height: screenHeight } = Dimensions.get('window');

const twoVh = screenHeight * 0.002;

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <TamaguiProvider config={config}>
      <CustomRootLayout>
        <Stack
          screenOptions={{
            header: ({}) => (
              <SafeAreaView style={{ backgroundColor: "#0050b3" }}>
                <View
                  style={{
                    height: twoVh,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></View>
              </SafeAreaView>
            ),
          }}
        >
          <Stack.Screen name="login/index" />
        </Stack>
      </CustomRootLayout>
    </TamaguiProvider>
  );
}
