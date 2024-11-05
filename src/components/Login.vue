<template>
  <div class="login-container">
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="login">
      <label for="username">Nombre de Usuario</label>
      <input v-model="username" type="text" id="username" required />

      <label for="password">Contraseña</label>
      <input v-model="password" type="password" id="password" required />

      <button type="submit">Iniciar Sesión</button>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const username = ref("");
const password = ref("");
const errorMessage = ref("");

const login = async () => {
  try {
    const response = await axios.post(
      "http://localhost:5555/api/login",
      {
        username: username.value,
        password: password.value,
      },
      { withCredentials: true }
    );

    if (response.data.message === "Inicio de sesión exitoso") {
      router.push("/game");
    }
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message || "Error al iniciar sesión";
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 5em auto;
  padding: 2em;
  background-color: #1a1e23;
  color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
}

h2 {
  margin-bottom: 1.5em;
  font-size: 1.8em;
  color: #4caf50;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1.2em;
}

label {
  font-weight: bold;
  text-align: left;
  color: #cccccc;
}

input {
  padding: 0.8em;
  border-radius: 4px;
  border: 1px solid #4caf50;
  background-color: #333333;
  color: #ffffff;
  transition: border-color 0.3s;
}

input:focus {
  outline: none;
  border-color: #45a049;
}

button[type="submit"] {
  padding: 0.8em;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: white;
  font-size: 1em;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

button[type="submit"]:hover {
  background-color: #45a049;
}

.error-message {
  margin-top: 1em;
  color: #ff4d4f;
  font-weight: bold;
}
</style>
