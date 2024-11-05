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
    <button v-if="playersSelected" @click="startBattle">Empezar Pelea</button>
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
    description: "Ice-powered ninja from the Lin Kuei, master of cryomancy.",
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
    description: "Undead ninja seeking revenge after being killed by Sub-Zero.",
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
  if (player1.value?.name === character.name) player1.value = null;
  else if (player2.value?.name === character.name) player2.value = null;
  else if (!player1.value) player1.value = character;
  else if (!player2.value) player2.value = character;
};

const playersSelected = computed(() => player1.value && player2.value);
const startBattle = () => {
  sessionStorage.setItem("j1Stats", JSON.stringify(player1.value.stats));
  sessionStorage.setItem("j2Stats", JSON.stringify(player2.value.stats));
  sessionStorage.setItem("j1Character", player1.value.name);
  sessionStorage.setItem("j2Character", player2.value.name);
  router.push("/logic");
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  height: 100dvh;
  font-size: 0.9rem;
  overflow-y: hidden;
}

.hero-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
  background-color: #1a1e23;
  padding-top: 100px;
}

.title {
  margin-bottom: 3em;
  color: #fff;
  font-size: 2rem;
}

.card-container {
  display: flex;
  gap: 30px;
  width: fit-content;
  height: 500px;
  justify-content: center;
}

.stats-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
  color: white;
}

.hidden {
  display: none;
}

#start-battle-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background-color 0.3s ease;
}

button {
  margin-top: 20px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #ff5733, #c70039);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.3rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
}

button:hover {
  background: linear-gradient(135deg, #d14b5d, #ff6b5a);
  transform: scale(1.05);
}

button:active {
  background: linear-gradient(135deg, #c70039, #900c3f);
  transform: scale(0.98);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.4);
}

#start-battle-btn:hover {
  background-color: #45a049;
}

@media (min-width: 768px) {
  .stats-container {
    flex-direction: row;
    justify-content: space-between;
  }

  .title {
    font-size: 2.5rem;
  }

  .card-background {
    height: 400px;
  }
}

@media (min-width: 1200px) {
  .title {
    font-size: 3rem;
  }

  .card {
    width: 250px;
  }

  .card-background {
    height: 500px;
  }

  #start-battle-btn {
    font-size: 1.5rem;
  }
}
</style>
