import "dotenv/config";
export default {
  expo: {
    name: "music-store-app",
    slug: "music-store-app",
    plugins: [
      [
        "expo-image-picker",
        {
          photosPermission:
            "The app accesses your photos to let you share them with your friends.",
        },
      ],
    ],
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    // extra: {
    //   apiKey: process.env.API_KEY,
    //   authDomain: proccess.env.AUTH_DOMAIN,
    //   projectId: proccess.env.PROJECT_ID,
    //   storageBucket: proccess.env.STORAGE_BUCKET,
    //   messagingSenderId: proccess.env.MESSAGING_SENDER_ID,
    //   appID: proccess.env.APP_ID,
    //   measurementID: proccess.env.MEASUREMENT_ID,
    // },
  },
};
