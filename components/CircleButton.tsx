import { View, Pressable, StyleSheet } from 'react-native'
import type { PressableProps } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

interface CircleButtonProps extends PressableProps {
  icon: string
}

export default function CircleButton({
  icon,
  ...props
}: CircleButtonProps) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} {...props}>
        <MaterialIcons
          name={icon as any}
          size={38} 
          style={styles.icon}
        />
      </Pressable>
    </View>
  )
}

const size = 84

const styles = StyleSheet.create({
  container: {
    width: size,
    height: size,
    borderRadius: size / 2,
    borderColor: 'black',
    backgroundColor: 'white',
    borderWidth: 2,
    padding: 3
  },
  button: {
    width: '100%',
    height: '100%',
    borderRadius: size / 2,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: 'white',
  },
})