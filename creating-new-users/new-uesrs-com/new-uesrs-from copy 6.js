import { StyleSheet, Text, View, TextInput, Pressable, Alert,  } from 'react-native';
import { formFields } from '../data-form-user/formFields';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from "react-hook-form";
import React, { useState } from 'react';
import PressableIconButton from '../../components/button/pressable-icon-button';
import { Platform } from "react-native";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../../firebase/firebase';
const NewUsersForm = () => {
  const [openSelect, setOpenSelect] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: '',
    }
  });

  const onSubmit = async (data) => {
    try {
      const { email, password, name, role } = data;

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        role,
        createdAt: new Date(),
      });

      Alert.alert("Success", "Account created successfully!");
    } catch (error) {
        debugger
      Alert.alert("Error", error.message);
    }
  };

  return (
    <>

      {formFields.map(fieldItms => (
        <View key={fieldItms.id} style={styles.inputWrapper}>

          {fieldItms.type === 'select' ? (
            <Controller
              control={control}
              name={fieldItms.id}
              rules={{ required: `${fieldItms.placeholder} is required` }}
              render={({ field: { onChange, value } }) => (
                <View style={styles.selectWrapper}>
                  <Pressable
                    style={[styles.input, styles.selectoption]}
                    onPress={() => setOpenSelect(prev => prev === fieldItms.id ? null : fieldItms.id)}
                  >
                    <Text style={[styles.placeholder, value && styles.selected, { color: "#aaa" }]}>
                      {value ? fieldItms.options.find(o => o.value === value)?.label : fieldItms.placeholder}
                    </Text>
                    <Ionicons name="chevron-down" size={18} color="#aaa" />
                  </Pressable>

                  {openSelect === fieldItms.id && (
                    <View style={styles.dropdown}>
                      {fieldItms.options.map(option => (
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
                </View>
              )}
            />
          ) : fieldItms.type === 'password' ? (
            <Controller
              control={control}
              name={fieldItms.id}
              rules={{
                required: `${fieldItms.placeholder} is required`,
                minLength: { value: 6, message: "Password must be at least 6 characters" },
                pattern: { value: /^(?=.*[A-Z])(?=.*\d).{6,}$/, message: "Must contain 1 uppercase and 1 number" },
              }}
              render={({ field: { onChange, value } }) => (
                <View style={styles.passwordWrapper}>
                  <TextInput
                    style={[styles.input, { flex: 1, borderWidth: 0, marginBottom: 0, paddingVertical: 0 }]}
                    placeholder={fieldItms.placeholder}
                    placeholderTextColor="#aaa"
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={!showPassword}
                  />
                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#999" />
                  </Pressable>
                </View>
              )}
            />
          ) : (
            <Controller
              control={control}
              name={fieldItms.id}
              rules={
                fieldItms.type === 'email'
                  ? {
                    required: `${fieldItms.placeholder} is required`,
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter valid email" },
                  }
                  : { required: `${fieldItms.placeholder} is required` }
              }
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder={fieldItms.placeholder}
                  placeholderTextColor="#aaa"
                  value={value}
                  onChangeText={onChange}
                  autoCapitalize="none"
                  keyboardType={fieldItms.type === 'email' ? 'email-address' : 'default'}
                />
              )}
            />
          )}

          {errors[fieldItms.id]?.message && (
            <Text style={styles.errorText}>{errors[fieldItms.id]?.message}</Text>
          )}
        </View>
      ))}

      <PressableIconButton ButtonTitle="Sign Up" onPress={handleSubmit(onSubmit)} />
    
    </>
  );
};

export default NewUsersForm;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
  },
  inputWrapper: { width: '100%', marginBottom: 8 },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 10,
  },
  selectWrapper: { position: 'relative', width: '100%' },
  selectoption: { flexDirection: 'row', justifyContent: 'space-between' },
  dropdown: {
    position: 'absolute',
    top: 52,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.15)',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 5,
    zIndex: 1000,
    elevation: 5,
  },
  optionText: { fontSize: 14 },
  errorText: { color: '#ff0000', fontSize: 12, marginTop: 4 },
});
