import { StyleSheet, Text, View, Modal } from 'react-native'
import React, { useEffect } from 'react'
import COLORS from '../../assets/style/color'

const CongratulationsIndex = ({ visible, onDone ,  }) => {

  useEffect(() => {
    if (!visible) return

    const timer = setTimeout(() => {
      onDone()
    }, 4000)

    return () => clearTimeout(timer)
  }, [visible])

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Text style={styles.title}>🎉 Congratulations!</Text>
          <Text style={styles.subtitle}>
            Your preferences have been saved successfully
          </Text>
        </View>
      </View>
    </Modal>
  )
}

export default CongratulationsIndex

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: '#fff',
    paddingVertical: 32,
    paddingHorizontal: 26,
    borderRadius: 22,
    alignItems: 'center',
    width: '80%',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.pinkiDark,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
})
