import type { PropsWithChildren } from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface EmojiPickerProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function EmojiPicker({ 
  isVisible, 
  children, 
  onClose 
}: PropsWithChildren<EmojiPickerProps>) {
  return (
    <Modal animationType="slide" transparent visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Choose a sticker</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons
              name="close" 
              size={24}
              style={styles.closeIcon}
            />
          </Pressable>
        </View>
        {children}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'black',
  },
  titleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#191919',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  closeIcon: {
    color: 'white',
  }
})