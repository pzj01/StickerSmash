import { View, Text, Pressable, StyleSheet } from 'react-native'
import type { PressableProps } from 'react-native'
import React, { PropsWithChildren } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

interface IconButtonProps extends PressableProps {
  icon: string
}

export default function IconButton({
  icon,
  children,
  ...props
}: PropsWithChildren<IconButtonProps>) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} {...props}>
        <MaterialIcons
          name={icon as any}
          size={24}
          style={styles.icon}
        />
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
  },
  button: {
    width: '100%',
    height: '100%',
    rowGap: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    color: 'black',
  }
})