import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import api from '../api/axiosInstance';
import { saveTokens } from '../utils/auth';
import { globalStyles } from './styles';
import { setAccessToken } from '../utils/tokenStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await api.post('/api/1.0/login', {
        username: email,
        password
      });
		setAccessToken(res.data.access);
		      navigation.replace('MainTabs');
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.bgShape1} />
      <View style={globalStyles.bgShape2} />
        <View style={globalStyles.card}>
          <Text style={globalStyles.title}>Login</Text>
          <TextInput
            placeholder="Email"
            placeholderTextColor="rgba(255,255,255,0.7)"
            value={email}
            onChangeText={setEmail}
            style={globalStyles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="rgba(255,255,255,0.7)"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={globalStyles.input}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={handleLogin} style={globalStyles.button}>
            <Text style={globalStyles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
}