import type { ImagePickerAsset } from 'expo-image-picker'
import type { ImageSourcePropType } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, Platform } from 'react-native'
import { launchImageLibraryAsync } from 'expo-image-picker'
import { usePermissions, saveToLibraryAsync } from 'expo-media-library'
import { captureRef } from 'react-native-view-shot'
import domtoimage from 'dom-to-image'
import Button from './components/Button'
import { useState, useRef } from 'react'
import ImageViewer from './components/ImageViewer'
import CircleButton from './components/CircleButton'
import IconButton from './components/IconButton'
import EmojiPicker from './components/EmojiPicker'
import EmojiList from './components/EmojiList'
import EmojiSticker from './components/EmojiSicker'

const AiHoshinoImage = require('./assets/Ai Hoshino.png')

export default function App() {
  const [image, setImage] = useState<ImagePickerAsset>()
  const [isShowOptions, setIsShowOptions] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedEmoji, setSelectedEmoji] = useState<ImageSourcePropType>()
  const [status, requestPermission] = usePermissions()
  const captureViewRef = useRef<any>()

  if (!status) {
    requestPermission()
  }

  const pickImage = async () => {
    const { assets, canceled } = await launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    })

    if (canceled) {
      alert('你没有选择图片!');
    } else {
      setIsShowOptions(true)
      setImage(assets[0]);
    }
  }

  const onReset = () => {
    setIsShowOptions(false)
    setSelectedEmoji(undefined)
  }

  const onAddSticker = () => {
    setIsModalVisible(true)
  }

  const onSave = async () => {

    try {
      // 处理android和ios的截图
      if (Platform.OS !== 'web') {
        const uri = await captureRef(captureViewRef, {
          width: 320,
          height: 440,
          quality: 1,
        })
  
        await saveToLibraryAsync(uri)
  
        if (uri) {
          alert('保存成功!')
        }
      } else {
        // 处理web的截图
        const dataUrl = await domtoimage.toJpeg(captureViewRef.current, {
          quality: 0.95,
          width: 320,
          height: 440
        })

        const a = document.createElement('a')
        a.download = `image-${Date.now()}.jpeg`
        a.href = dataUrl
        a.click()
      }
    } catch (e) {
      alert('保存失败!')
    }
  }

  const onSelectedEmoji = (emoji: ImageSourcePropType) => {
    setSelectedEmoji(emoji)
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="dark" />
      <View ref={captureViewRef} style={styles.imageViewerContainer}>
        <ImageViewer image={image} placeholderImage={AiHoshinoImage} />
        {selectedEmoji && <EmojiSticker imageSize={40} stickerSource={selectedEmoji} />}
      </View>
      {
        isShowOptions
          ? <View style={[styles.buttonGroup, { flexDirection: 'row', columnGap: 25 }]}>
            <IconButton icon="refresh" onPress={onReset}>重置</IconButton>
            <CircleButton icon="add" onPress={onAddSticker} />
            <IconButton icon="save-alt" onPress={onSave}>保存</IconButton>
          </View>
          : <View style={styles.buttonGroup}>
            <Button icon="picture-o" onPress={pickImage}>请选择图片</Button>
            <Button variant="secondary" onPress={() => setIsShowOptions(true)}>使用这张图片</Button>
          </View>
      }
      <EmojiPicker isVisible={isModalVisible} onClose={() => setIsModalVisible(false)}>
        <EmojiList onSelect={onSelectedEmoji} onCloseModal={() => setIsModalVisible(false)} />
      </EmojiPicker>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageViewerContainer: {
    overflow: 'hidden',
    position: 'relative',
  },
  buttonGroup: {
    marginTop: 50,
    width: '80%',
    marginHorizontal: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 10,
  }
});