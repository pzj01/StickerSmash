import type { ImageSourcePropType } from 'react-native'
import { StyleSheet } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

interface EmojiStickerProps {
  imageSize: number;
  stickerSource: ImageSourcePropType;
}

export default function EmojiSticker({
  imageSize,
  stickerSource
}: EmojiStickerProps) {
  const imageSizeDoubled = imageSize * 2
  const scale = useSharedValue(imageSize)
  const translate = useSharedValue({
    x: 0,
    y: 0
  })
  // 拖拽
  const drag = Gesture.Pan()
    .onChange(({ changeX, changeY }) => {    
      const { x, y } = translate.value
      translate.value = {
        x: x + changeX,
        y: y + changeY
      }        
    })
  // 双击
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scale.value !== imageSizeDoubled) {
        scale.value = imageSizeDoubled
      } else {
        scale.value = imageSize
      }
    })
  const doubleTapAnimatedStyle = useAnimatedStyle(() => ({
    width: withSpring(scale.value),
    height: withSpring(scale.value),
  }))
  const dragAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translate.value.x },
      { translateY: translate.value.y }
    ]
  }))

  return (
    <GestureDetector gesture={drag}>
      <Animated.View style={[dragAnimatedStyle, styles.container]}>
        <GestureDetector gesture={doubleTap}>
          <Animated.Image
            source={stickerSource}
            resizeMode="contain"
            style={[doubleTapAnimatedStyle, { width: imageSize, height: imageSize }]}
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 100,
    left: 100,
  },
})