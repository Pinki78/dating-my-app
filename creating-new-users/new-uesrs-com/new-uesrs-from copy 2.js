import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { formFields } from '../data-form-user/formFields';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from "react-hook-form";
import React, { useState } from 'react';

const NewUsersForm = () => {
  const [openSelect, setOpenSelect] = useState(null);
  const { control, handleSubmit } = useForm();
    const [showPassword, setShowPassword] = useState(false);

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <>
      {formFields.map(field => (
  <View key={field.id} style={styles.inputWrapper}>
    {field.type === 'select' ? (
      <Controller
        control={control}
        name={field.id}
        rules={{ required: true }}
        render={({ field: { value, onChange } }) => (
          <>
            <Pressable style={styles.input} onPress={() => setOpenSelect(field.id)}>
              <Text style={[styles.placeholder, value && styles.selected]}>
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
    ) : field.type === 'password' ? (
      <Controller
        control={control}
        name={field.id}
        rules={{ required: true }}
        render={({ field: { value, onChange } }) => (
          <View style={styles.passwordWrapper}>
            <TextInput
              style={[styles.input, { fontFamily: "Mulish_400Regular", flex: 1, borderWidth: 0, marginBottom: 0, paddingVertical: 0, paddingHorizontal: 2 }]}
              placeholder={field.placeholder}
              value={value}
              onChangeText={onChange}
              secureTextEntry={!showPassword}
            />
            <Pressable onPress={() => setShowPassword(prev => !prev)}>
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#999"
              />
            </Pressable>
          </View>
        )}
      />
    ) : (
      <Controller
        control={control}
        name={field.id}
        rules={{ required: true }}
        render={({ field: { value, onChange } }) => (
          <View style={styles.input}>
            <TextInput
              style={styles.input}
              placeholder={field.placeholder}
              value={value}
              onChangeText={onChange}
              keyboardType={
                field.type === 'phone'
                  ? 'phone-pad'
                  : field.type === 'email'
                  ? 'email-address'
                  : 'default'
              }
            />
          </View>
        )}
      />
    )}
  </View>
))}


      {/* <Pressable style={styles.submitBtn} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.submitText}>Submit</Text>
      </Pressable> */}
    </>
  );
};

export default NewUsersForm;
const styles = StyleSheet.create({
    or: {
        textAlign: 'center',
        marginTop: 24,
        marginBottom: 15
    },
    btnTextStylesClass: {
        fontFamily: 'Urbanist_600SemiBold',
        fontSize: 18,
    }
})