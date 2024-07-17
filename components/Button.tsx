import type { PressableProps } from 'react-native'
import type { PropsWithChildren } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import React from 'react'

interface ButtonProps extends PressableProps {
  icon?: string
  variant?: 'primary' | 'secondary'
}

export default function Button({ 
  icon, 
  children, 
  variant = 'primary', 
  ...props 
}: PropsWithChildren<ButtonProps>) {
  
  return (
    <View style={[styles.container, getVariant(variant).container]}>
      <Pressable style={styles.button} {...props}>
        { icon && 
          <FontAwesome 
            name={icon as any}
            size={18}
            style={[styles.icon, getVariant(variant).icon]}
          />
        }
        <Text style={[styles.text, getVariant(variant).text]}>
          {children}
        </Text>
    </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    borderRadius: 10,
  },
  button: {
    width: '100%',
    height: '100%',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 5,
  }
})

function getVariant(type: 'primary' | 'secondary') {
  switch (type) {
    case 'primary':
      return StyleSheet.create({
        container: {
          backgroundColor: 'white',
          borderColor: 'black',
          borderWidth: 2,
        },
        text: {
          color: 'black',
        },
        icon: {
          color: 'black',
        }
      })
    case 'secondary':
      return StyleSheet.create({
        container: {
          backgroundColor: 'black',
        },
        text: {
          color: 'white',
        },
        icon: {
          color: 'white',
        }
      })
    default:
      return {
        container: {},
        text: {},
        icon: {}
      }
  }
}