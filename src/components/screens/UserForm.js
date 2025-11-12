import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Alert, ScrollView } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UserForm({ route, navigation }) {
  const [user, setUser] = useState({
    nome: "",
    telefone: "",
    cpf: "",
    cep: "",
    logradouro: "",
    bairro: "",
    cidade: "",
    uf: "",
  });

  const editUser = route.params?.user;

  useEffect(() => {
    if (editUser) setUser(editUser);
  }, [editUser]);

  async function handleCep(cep) {
    setUser({ ...user, cep });
    if (cep.length === 8) {
      try {
        const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        setUser({
          ...user,
          cep,
          logradouro: data.logradouro || "",
          bairro: data.bairro || "",
          cidade: data.localidade || "",
          uf: data.uf || "",
        });
      } catch {
        Alert.alert("Erro", "CEP inválido ou não encontrado.");
      }
    }
  }

  async function saveUser() {
    const data = await AsyncStorage.getItem("users");
    let users = data ? JSON.parse(data) : [];

    if (editUser) {
      users = users.map(u => (u.cpf === user.cpf ? user : u));
    } else {
      users.push(user);
    }

    await AsyncStorage.setItem("users", JSON.stringify(users));
    Alert.alert("Sucesso", "Usuário salvo com sucesso!");
    navigation.goBack();
  }

  return (
    <ScrollView style={{ padding: 16 }}>
      <TextInput placeholder="Nome" value={user.nome} onChangeText={(v) => setUser({ ...user, nome: v })} />
      <TextInput placeholder="Telefone" value={user.telefone} onChangeText={(v) => setUser({ ...user, telefone: v })} />
      <TextInput placeholder="CPF" value={user.cpf} onChangeText={(v) => setUser({ ...user, cpf: v })} />
      <TextInput placeholder="CEP" value={user.cep} onChangeText={handleCep} />
      <TextInput placeholder="Logradouro" value={user.logradouro} onChangeText={(v) => setUser({ ...user, logradouro: v })} />
      <TextInput placeholder="Bairro" value={user.bairro} onChangeText={(v) => setUser({ ...user, bairro: v })} />
      <TextInput placeholder="Cidade" value={user.cidade} onChangeText={(v) => setUser({ ...user, cidade: v })} />
      <TextInput placeholder="UF" value={user.uf} onChangeText={(v) => setUser({ ...user, uf: v })} />
      <Button title="Salvar" onPress={saveUser} />
    </ScrollView>
  );
}
