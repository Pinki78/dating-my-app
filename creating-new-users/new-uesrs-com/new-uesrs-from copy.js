import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import { formFields } from '../data-form-user/formFields';

import { Ionicons } from '@expo/vector-icons';

import { useForm, Controller } from "react-hook-form";
import React, { useState } from 'react'

const NewUesrsFrom = () => {
    const [openSelect, setOpenSelect] = useState(null);
const { control, handleSubmit, watch } = useForm();
  return (
    <>
      {formFields.map(field => (
  <View key={field.id} style={styles.inputWrapper}>
    {field.type === 'select' && (
      <Controller
        control={control}
        name={field.id}
        rules={{ required: true }}
        render={({ field: { value, onChange } }) => (
          <>
            <Pressable
              style={styles.input}
              onPress={() => setOpenSelect(field.id)}
            >
              <Text style={[styles.placeholder, value && { color: '#000' }]}>
                {value
                  ? field.options.find(o => o.value === value)?.label
                  : field.placeholder}
              </Text>
              <Ionicons name="chevron-down" size={18} color="#aaa" />
            </Pressable>

            {openSelect === field.id && (
              <View style={styles.dropdown}>
                {field.options.map(option => (
                  <Pressable
                    key={option.value}
                    style={styles.option}
                    onPress={() => {
                      onChange(option.value);
                      setOpenSelect(null);
                    }}
                  >
                    <Text style={styles.optionText}>{option.label}</Text>
                  </Pressable>
                ))}
              </View>
            )}
          </>
        )}
      />
    )}
  </View>
))}


    </>
  )
}

export default NewUesrsFrom

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        padding: 12,
        marginBottom: 10,
        fontFamily: 'Urbanist_600SemiBold',
    },
    passwordWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        padding: 12,
        marginBottom: 20,
    },
})