<template>
    <nav class="navbar">
        <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/lore">Lore</router-link></li>
            <li v-if="isAuthenticated">
                <router-link to="/game">Game</router-link>
            </li>
            <li v-else><router-link to="/login">Login</router-link></li>
            <li v-if="isAuthenticated">
                <button @click="logout">Cerrar Sesión</button>
            </li>
        </ul>
    </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const isAuthenticated = ref(false);

async function checkSession() {
    try {
        const response = await axios.get(
            "http://localhost:5555/api/check-session",
            {
                withCredentials: true,
            }
        );
        isAuthenticated.value = response.data.loggedIn;
    } catch (error) {
        console.error("Error al verificar la sesión", error);
    }
}

onMounted(() => {
    checkSession();
});

async function logout() {
    try {
        await axios.post(
            "http://localhost:5555/api/logout",
            {},
            { withCredentials: true }
        );
        isAuthenticated.value = false;
        router.push("/");
    } catch (error) {
        console.error("Error al cerrar sesión", error);
    }
}
</script>

<style scoped>
.navbar {
    background-color: #1a1e23;
    padding: 1em;
    display: flex;
    justify-content: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.navbar ul {
    list-style: none;
    display: flex;
    gap: 1.5em;
}

.navbar li {
    position: relative;
}

.navbar a {
    text-decoration: none;
    color: #ffffff;
    font-weight: bold;
    transition: color 0.3s ease;
}

.navbar a:hover {
    color: #4caf50;
}

button {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 0.5em 1em;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #45a049;
}
</style>
