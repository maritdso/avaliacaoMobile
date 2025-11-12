import axios from "axios";

const api = axios.create({
  baseURL: "https://viacep.com.br/ws/",
});

export async function buscarEndereco(cep) {
  const response = await api.get(`${cep}/json/`);
  return response.data;
}
