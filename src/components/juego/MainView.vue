<template>
    <Header />
    <section class="hero-section">
        <h1 class="title">Mortal Kumbiat</h1>
        <h2 class="title">Selección de personaje</h2>
        <div class="card-container">
            <CharacterCard
                v-for="character in characters"
                :key="character.name"
                :character="character"
                :selectedPlayer="getPlayerSelection(character.name)"
                @select="selectCharacter(character)"
            />
        </div>
        <div class="stats-container">
            <PlayerStats :player="player1" title="Jugador 1 (J1)" />
            <PlayerStats :player="player2" title="Jugador 2 (J2)" />
        </div>
        <button v-if="playersSelected" @click="startBattle">
            Empezar Pelea
        </button>
    </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import CharacterCard from "./CharacterCard.vue";
import PlayerStats from "./PlayerStats.vue";
import Header from "../Header.vue";

const router = useRouter();
const isAuthenticated = ref(false);
const characters = ref([
    {
        name: "Liu Kang",
        description:
            "Shaolin monk who fights to protect Earthrealm in Mortal Kombat.",
        image: "src/assets/liukang.png",
        stats: {
            hp: 200,
            minDamage: 20,
            maxDamage: 25,
            attackSpeed: 30,
            speed: 5,
            attackRange: 200,
        },
    },
    {
        name: "Sub Zero",
        description:
            "Ice-powered ninja from the Lin Kuei, master of cryomancy.",
        image: "src/assets/sub-zero.jpg",
        stats: {
            hp: 200,
            minDamage: 18,
            maxDamage: 22,
            attackSpeed: 30,
            speed: 6,
            attackRange: 180,
        },
    },
    {
        name: "Sektor",
        description:
            "Cyborg ninja assassin from the Lin Kuei clan, uses technology.",
        image: "src/assets/sektor.jpeg",
        stats: {
            hp: 270,
            minDamage: 24,
            maxDamage: 28,
            attackSpeed: 15,
            speed: 3,
            attackRange: 250,
        },
    },
    {
        name: "Scorpion",
        description:
            "Undead ninja seeking revenge after being killed by Sub-Zero.",
        image: "src/assets/scorpion.png",
        stats: {
            hp: 150,
            minDamage: 23,
            maxDamage: 27,
            attackSpeed: 50,
            speed: 8,
            attackRange: 220,
        },
    },
]);

const player1 = ref(null);
const player2 = ref(null);

const checkAuthentication = async () => {
    try {
        const response = await axios.get(
            "http://localhost:5555/api/check-session",
            { withCredentials: true }
        );

        isAuthenticated.value = response.data.loggedIn;

        if (!isAuthenticated.value) router.push("/login");
    } catch (error) {
        console.error("Error al verificar sesión", error);
        router.push("/login");
    }
};

onMounted(checkAuthentication);

const getPlayerSelection = (name) =>
    player1.value?.name === name
        ? "J1"
        : player2.value?.name === name
          ? "J2"
          : null;

const selectCharacter = (character) => {
    console.log("Seleccionando personaje:", character.name);
    if (player1.value && player1.value.name === character.name) {
        player1.value = null;
        console.log("Deseleccionado como Jugador 1");
    } else if (player2.value && player2.value.name === character.name) {
        player2.value = null;
        console.log("Deseleccionado como Jugador 2");
    } else if (!player1.value) {
        player1.value = character;
        console.log("Asignado a Jugador 1:", player1.value.name);
    } else if (!player2.value) {
        player2.value = character;
        console.log("Asignado a Jugador 2:", player2.value.name);
    }
};

const playersSelected = computed(() => player1.value && player2.value);

const startBattle = () => {
    if (player1.value && player2.value) {
        sessionStorage.setItem("j1Stats", JSON.stringify(player1.value.stats));
        sessionStorage.setItem("j2Stats", JSON.stringify(player2.value.stats));
        sessionStorage.setItem("j1Character", player1.value.name);
        sessionStorage.setItem("j2Character", player2.value.name);

        // debug
        console.log("Datos guardados en sessionStorage:");
        console.log("Jugador 1:", player1.value.name, player1.value.stats);
        console.log("Jugador 2:", player2.value.name, player2.value.stats);

        router.push("/logic");
    } else {
        console.error(
            "Ambos jugadores deben estar seleccionados antes de empezar la pelea."
        );
    }
};
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    height: 100vh;
    font-size: 1rem;
    overflow-y: hidden;
    background-color: #1a1e23;
    font-family: Arial, sans-serif;
}

.hero-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    padding-top: 120px;
    background: linear-gradient(to bottom, #1a1e23, #23272b);
}

.title {
    margin-bottom: 3em;
    color: #ffffff;
    font-size: 2.5rem;
    font-weight: bold;
    text-align: center;
}

.card-container {
    display: flex;
    gap: 40px;
    width: fit-content;
    height: 450px;
    justify-content: center;
    padding: 0 20px;
}

.stats-container {
    display: flex;
    justify-content: space-between;
    width: 90%;
    margin-top: 25px;
    color: #ffffff;
    font-size: 1.1rem;
}

.hidden {
    display: none;
}

#start-battle-btn {
    margin-top: 25px;
    padding: 12px 25px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1.4rem;
    transition: background-color 0.3s ease;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
}

#start-battle-btn:hover {
    background-color: #45a049;
}

button {
    margin-top: 25px;
    padding: 14px 28px;
    background: linear-gradient(135deg, #ff5733, #c70039);
    color: #ffffff;
    border: none;
    border-radius: 8px;
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
    transition:
        background 0.3s ease,
        transform 0.2s ease;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
}

button:hover {
    background: linear-gradient(135deg, #d14b5d, #ff6b5a);
    transform: scale(1.08);
}

button:active {
    background: linear-gradient(135deg, #c70039, #900c3f);
    transform: scale(0.98);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
}
</style>
