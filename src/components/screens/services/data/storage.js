import AsyncStorage from "@react-native-async-storage/async-storage";

export async function salvarUsuarios(users) {
  await AsyncStorage.setItem("users", JSON.stringify(users));
}

export async function carregarUsuarios() {
  const data = await AsyncStorage.getItem("users");
  return data ? JSON.parse(data) : [];
}
