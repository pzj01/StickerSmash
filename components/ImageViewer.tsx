import type { ImageSourcePropType } from 'react-native'
import { View, Image, StyleSheet } from 'react-native'
import React from 'react'

interface ImageViewerProps {
  image?: ImageSourcePropType
  placeholderImage: ImageSourcePropType
}

export default function ImageViewer({
  image,
  placeholderImage
}: ImageViewerProps) {
  return (
    <View>
      <Image style={styles.image} source={image || placeholderImage} />
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 20,
  },
})