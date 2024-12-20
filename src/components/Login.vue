<template>
    <Header />
    <div class="login-container">
        <h2>Iniciar Sesión</h2>
        <form @submit.prevent="login">
            <label for="username">Nombre de Usuario</label>
            <input v-model="username" type="text" id="username" required />

            <label for="password">Contraseña</label>
            <input v-model="password" type="password" id="password" required />

            <button type="submit">Iniciar Sesión</button>

            <button type="button" @click="goToRegister" class="register-button">
                Registrarse
            </button>

            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Header from "./Header.vue";
import axios from "axios";

const router = useRouter();
const username = ref("");
const password = ref("");
const errorMessage = ref("");

const checkSession = async () => {
    try {
        const response = await axios.get(
            "http://localhost:5555/api/check-session",
            {
                withCredentials: true,
            }
        );
        if (response.data.loggedIn) {
            router.push("/game");
        }
    } catch (error) {
        console.error("Error al verificar la sesión:", error);
    }
};

onMounted(() => {
    checkSession();
});

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

const goToRegister = () => {
    router.push("/register");
};
</script>

<style scoped>
.login-container {
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

.login-container:hover {
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

button[type="submit"],
button.register-button {
    padding: 0.8em;
    border: none;
    border-radius: 6px;
    font-size: 1em;
    cursor: pointer;
    font-weight: 600;
    transition:
        background-color 0.3s,
        box-shadow 0.3s;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

button[type="submit"] {
    background-color: #4caf50;
    color: white;
}

button[type="submit"]:hover {
    background-color: #45a049;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
}

button.register-button {
    background-color: #2196f3;
    color: white;
    margin-top: 0.5em;
}

button.register-button:hover {
    background-color: #1976d2;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
}

.error-message {
    margin-top: 1em;
    color: #ff4d4f;
    font-weight: 600;
    font-size: 0.95em;
}
</style>
