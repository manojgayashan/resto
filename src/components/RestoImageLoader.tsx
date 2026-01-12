import React, { useState } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ImageStyle,
  ViewStyle
} from "react-native";
import * as Animatable from "react-native-animatable";

interface ImageLoaderProps {
  uri: string;
  style?: ImageStyle;
  containerStyle?: ViewStyle;
  resizeMode?: "cover" | "contain" | "stretch" | "center";
}

const RestoImageLoader: React.FC<ImageLoaderProps> = ({
  uri,
  style,
  containerStyle,
  resizeMode = "cover"
}) => {
  const [loading, setLoading] = useState(true);

  return (
    <View style={[styles.container, containerStyle]}>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="small" color="#999" />
        </View>
      )}

      <Animatable.Image
        source={{ uri }}
        resizeMode={resizeMode}
        style={[styles.image, style]}
        onLoadEnd={() => setLoading(false)}
        animation={'fadeIn'}
      />
    </View>
  );
};

export default RestoImageLoader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center"
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: "100%",
    height: 150
  }
});
