import { colors } from "./styles/colors";

export default () => {
  return {
    expo: {
      name: "StickTasksApp",
      slug: "stick-stack-app",
      version: "1.0.0",
      orientation: "portrait",
      icon: "./assets/icon.png",
      userInterfaceStyle: "light",
      newArchEnabled: true,
      splash: {
        image: "./assets/splash-icon.png",
        resizeMode: "contain",
        backgroundColor: colors.primary,
      },
      ios: {
        supportsTablet: true,
      },
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/adaptive-icon.png",
          backgroundColor: colors.primary,
        },
        edgeToEdgeEnabled: true,
        predictiveBackGestureEnabled: false,
      },
      web: {
        favicon: "./assets/favicon.png",
      },
      plugins: [
        [
          "expo-sqlite",
          {
            enableFTS: true,
            useSQLCipher: true,
            android: {
              enableFTS: false,
              useSQLCipher: false,
            },
            ios: {
              customBuildFlags: [
                "-DSQLITE_ENABLE_DBSTAT_VTAB=1 -DSQLITE_ENABLE_SNAPSHOT=1",
              ],
            },
          },
        ],
      ],
    },
  };
};
