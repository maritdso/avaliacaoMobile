import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function usarItem({ user, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{user.nome}</Text>
      <Text>{user.telefone}</Text>
      <TouchableOpacity onPress={onEdit}>
        <Text style={styles.edit}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete}>
        <Text style={styles.delete}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 12, borderWidth: 1, marginBottom: 8, borderRadius: 8 },
  name: { fontSize: 18, fontWeight: "bold" },
  edit: { color: "blue", marginTop: 5 },
  delete: { color: "red", marginTop: 5 },
});
