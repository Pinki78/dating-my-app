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
            {formFields.map(fieldItms => (
                <View key={fieldItms.id} style={styles.inputWrapper}>
                    <Controller
                        control={control}
                        name={fieldItms.id}
                        rules={{ required: true }}

                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={[styles.input, { fontFamily: "Mulish_400Regular" }]}
                                placeholder={fieldItms.placeholder}
                                placeholderTextColor="#aaa"
                                value={value}
                                onChangeText={onChange}
                                autoCapitalize="none"
                            />
                        )}
                    />
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
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        padding: 12,
        marginBottom: 10,
        fontFamily: 'Urbanist_600SemiBold',
    },
})