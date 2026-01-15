import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { formFields } from '../data-form-user/formFields';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from "react-hook-form";
import React, { useState } from 'react';
import PressableIconButton from '../../components/button/pressable-icon-button';

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
                    {fieldItms.type === 'select' ? (

                        <Controller
                            control={control}
                            name={fieldItms.id}
                            rules={{ required: true }}

                            render={({ field: { onChange, value } }) => (
                                <>
                                    <View style={styles.selectWrapper}>
                                        <Pressable style={[styles.input, styles.selectoption]}
                                            //  onPress={() => setOpenSelect(fieldItms.id)}
                                            onPress={() =>
                                                setOpenSelect(prev => (prev === fieldItms.id ? null : fieldItms.id))
                                            }


                                        >
                                            <Text style={[styles.placeholder, value && styles.selected , {   fontFamily: 'Urbanist_600SemiBold',}]}>
                                                {value
                                                    ? fieldItms.options.find(o => o.value === value)?.label
                                                    : fieldItms.placeholder}
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
                                </>
                            )}
                        />


                    ) : fieldItms.type === 'password' ? (
                        <Controller
                            control={control}
                            name={fieldItms.id}
                            rules={{ required: "Password is required" }}
                            render={({ field: { onChange, value } }) => (
                                <View style={styles.passwordWrapper}>
                                    <TextInput
                                        style={[styles.input, { fontFamily: "Urbanist_600SemiBold", flex: 1, borderWidth: 0, marginBottom: 0, paddingVertical: 0, paddingHorizontal: 2 }]}
                                        placeholder={fieldItms.placeholder}
                                         placeholderTextColor="#aaa"
                                        value={value}
                                        onChangeText={onChange}
                                        secureTextEntry={!showPassword}
                                    />
                                    <Pressable onPress={() => setShowPassword(!showPassword)}>
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
                            name={fieldItms.id}
                            rules={{ required: true }}

                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={[styles.input, { fontFamily: "Urbanist_600SemiBold" }]}
                                    placeholder={fieldItms.placeholder}
                                    placeholderTextColor="#aaa"
                                    value={value}
                                    onChangeText={onChange}
                                    autoCapitalize="none"
                                />
                            )}
                        />
                    )}

                </View>
            ))}


            <PressableIconButton
                    ButtonTitle="Log In"
                    onPress={handleSubmit(onSubmit)}
                />
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

    passwordInput: {
        flex: 1,
       fontFamily: 'Urbanist_600SemiBold',
        fontSize: 14,
        paddingVertical: 9,
        color: '#000',
    },

    selectWrapper: {

        position: 'relative',
        width: '100%',
    },

    selectoption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontFamily: 'Urbanist_600SemiBold',
    },

    dropdown: {
        position: 'absolute',
        top: 52,              // adjust based on input height
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.15)',
        borderRadius: 6,
        paddingVertical: 6,
        paddingHorizontal: 5,
        zIndex: 1000,
        elevation: 5,        // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 4 },
    },
optionText:{
       fontFamily: 'Urbanist_600SemiBold',
}

})