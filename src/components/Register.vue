<template>
    <Header />
    <div class="register-container">
        <h2>Registrarse</h2>
        <form @submit.prevent="register">
            <label for="username">Nombre de Usuario</label>
            <input v-model="username" type="text" id="username" required />

            <label for="password">Contraseña</label>
            <input v-model="password" type="password" id="password" required />

            <label for="confirmPassword">Confirmar Contraseña</label>
            <input
                v-model="confirmPassword"
                type="password"
                id="confirmPassword"
                required
            />

            <button type="submit">Registrarse</button>

            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
            <p v-if="successMessage" class="success-message">
                {{ successMessage }}
            </p>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Header from "./Header.vue";
import axios from "axios";

const router = useRouter();
const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");
const successMessage = ref("");

const register = async () => {
    if (password.value !== confirmPassword.value) {
        errorMessage.value = "Las contraseñas no coinciden";
        return;
    }

    try {
        const response = await axios.post(
            "http://localhost:5555/api/register",
            {
                username: username.value,
                password: password.value,
            }
        );

        successMessage.value = response.data.message;
        errorMessage.value = "";

        setTimeout(() => {
            router.push("/login");
        }, 1500);
    } catch (error) {
        errorMessage.value =
            error.response?.data?.message || "Error al registrarse";
        successMessage.value = "";
    }
};
</script>

<style scoped>
.register-container {
    max-width: 400px;
    margin: 5em auto;
    padding: 2.5em;
    background-color: #1a1e23;
    color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    text-align: center;
    transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;
}

.register-container:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.4);
}

h2 {
    margin-bottom: 1.5em;
    font-size: 2em;
    color: #4caf50;
    font-weight: 700;
}

form {
    display: flex;
    flex-direction: column;
    gap: 1.5em;
}

label {
    font-weight: 600;
    text-align: left;
    color: #b3b3b3;
    font-size: 0.9em;
    margin-bottom: -0.5em;
}

input {
    padding: 0.8em 1em;
    border-radius: 6px;
    border: 1px solid #4caf50;
    background-color: #2b2b2b;
    color: #e0e0e0;
    transition:
        border-color 0.3s,
        background-color 0.3s;
    font-size: 1em;
}

input:focus {
    outline: none;
    border-color: #45a049;
    background-color: #3a3a3a;
}

button[type="submit"] {
    padding: 0.8em;
    border: none;
    border-radius: 6px;
    background-color: #4caf50;
    color: white;
    font-size: 1em;
    cursor: pointer;
    font-weight: 600;
    transition:
        background-color 0.3s,
        box-shadow 0.3s;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

button[type="submit"]:hover {
    background-color: #45a049;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
}

.error-message {
    margin-top: 1em;
    color: #ff4d4f;
    font-weight: 600;
    font-size: 0.95em;
}

.success-message {
    margin-top: 1em;
    color: #4caf50;
    font-weight: 600;
    font-size: 0.95em;
}
</style>
