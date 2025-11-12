import React, { useEffect, useState } from "react";
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useIsFocused } from "@react-navigation/native";

export default function ListUsers() {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    loadUsers();
  }, [isFocused]);

  async function loadUsers() {
    const data = await AsyncStorage.getItem("users");
    setUsers(data ? JSON.parse(data) : []);
  }

  async function deleteUser(cpf) {
    const filtered = users.filter(u => u.cpf !== cpf);
    await AsyncStorage.setItem("users", JSON.stringify(filtered));
    setUsers(filtered);
    Alert.alert("Sucesso", "Usuário excluído com sucesso!");
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.cpf}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.nome}</Text>
            <Text>{item.telefone}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("UserForm", { user: item })}>
              <Text style={styles.edit}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteUser(item.cpf)}>
              <Text style={styles.delete}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("UserForm")}
      >
        <Text style={styles.addText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { padding: 12, borderWidth: 1, marginBottom: 8, borderRadius: 8 },
  name: { fontSize: 18, fontWeight: "bold" },
  edit: { color: "blue", marginTop: 5 },
  delete: { color: "red", marginTop: 5 },
  addButton: {
    backgroundColor: "#0080ff",
    position: "absolute",
    bottom: 30,
    right: 30,
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  addText: { color: "#fff", fontSize: 30 },
});
