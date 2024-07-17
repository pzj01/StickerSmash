import type { ImageSourcePropType } from 'react-native'
import { useState } from 'react'
import { StyleSheet, FlatList, Image, Platform, Pressable } from 'react-native'

const grinning = require('../assets/grinning.png')
const nail_care = require('../assets/nail_care.png')
const smiling_imp = require('../assets/smiling_imp.png')
const sweat_smile = require('../assets/sweat_smile.png')
const sunglasses = require('../assets/sunglasses.png')


interface EmojiListProps {
  onSelect?: (emoji: ImageSourcePropType) => void;
  onCloseModal: () => void;
}

export default function EmojiList({ 
  onSelect, 
  onCloseModal 
}: EmojiListProps) {
  const [emojis] = useState([
    grinning,
    nail_care,
    smiling_imp,
    sweat_smile,
    sunglasses
  ]);

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === 'web'}
      data={emojis}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => {
            onSelect?.(item)
            onCloseModal();
          }}>
          <Image source={item} key={index} style={styles.image} />
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 20,
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});
