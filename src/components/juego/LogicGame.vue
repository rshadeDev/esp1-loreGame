<template>
    <div class="game-container">
        <div class="back-button-container">
            <button @click="backToSelection" class="back-btn">
                Seleccionar Personaje
            </button>
        </div>
        <div class="health-bars-container">
            <div class="player-info player1-info">
                <div class="player-name">{{ player1Name }}</div>
                <div class="health-bar-container">
                    <div class="health-bar">
                        <div
                            class="health-fill"
                            :style="{ width: player1Health + '%' }"
                        ></div>
                    </div>
                    <div class="health-text">{{ player1Health }} HP</div>
                </div>
            </div>
            <div class="player-info player2-info">
                <div class="player-name">{{ player2Name }}</div>
                <div class="health-bar-container">
                    <div class="health-bar">
                        <div
                            class="health-fill"
                            :style="{ width: player2Health + '%' }"
                        ></div>
                    </div>
                    <div class="health-text">{{ player2Health }} HP</div>
                </div>
            </div>
        </div>
        <canvas ref="fightArena" width="1500" height="1080"></canvas>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { nextTick } from "vue";

import healBuff from "/src/assets/buffs/Heal.png";
import speedBuff from "/src/assets/buffs/speed.png";
import strengthBuff from "/src/assets/buffs/strenght.png";

const router = useRouter();
const fightArena = ref(null);
let isAttackingPlayer1 = false;
let isAttackingPlayer2 = false;
let lastDirectionPlayer1 = "right";
let lastDirectionPlayer2 = "left";
let activeBuff = null;
let buffTimeout = null;
let ctx;

const keys = reactive({});
const buffs = reactive([]);

const player1 = reactive({
    x: 100,
    y: 600,
    width: 150,
    height: 200,
    speed: JSON.parse(localStorage.getItem("j1Stats")).speed || 5,
    health: JSON.parse(localStorage.getItem("j1Stats")).hp || 100,
    maxHealth: JSON.parse(localStorage.getItem("j1Stats")).hp || 100,
    minDamage: JSON.parse(localStorage.getItem("j1Stats")).minDamage || 10,
    maxDamage: JSON.parse(localStorage.getItem("j1Stats")).maxDamage || 20,
    attackSpeed: JSON.parse(localStorage.getItem("j1Stats")).attackSpeed || 1,
    name: localStorage.getItem("j1Character") || "Jugador 1",
    lastAttackTime: 0,
    attackRange: 400,
    image: new Image(),
    damageImage: new Image(),
});

const player2 = reactive({
    x: 950,
    y: 600,
    width: 150,
    height: 200,
    speed: JSON.parse(localStorage.getItem("j2Stats")).speed || 5,
    health: JSON.parse(localStorage.getItem("j2Stats")).hp || 100,
    maxHealth: JSON.parse(localStorage.getItem("j2Stats")).hp || 100,
    minDamage: JSON.parse(localStorage.getItem("j2Stats")).minDamage || 10,
    maxDamage: JSON.parse(localStorage.getItem("j2Stats")).maxDamage || 20,
    attackSpeed: JSON.parse(localStorage.getItem("j2Stats")).attackSpeed || 1,
    name: localStorage.getItem("j2Character") || "Jugador 2",
    lastAttackTime: 0,
    attackRange: 400,
    image: new Image(),
    damageImage: new Image(),
});

const player1Name = computed(() => player1.name);
const player1Health = computed(
    () => (player1.health / player1.maxHealth) * 100
);
const player2Name = computed(() => player2.name);
const player2Health = computed(
    () => (player2.health / player2.maxHealth) * 100
);

const buffImages = [
    {
        type: "heal",
        src: healBuff,
        effect: (player) =>
            (player.health = Math.min(player.maxHealth, player.health + 20)),
    },
    { type: "speed", src: speedBuff, effect: (player) => (player.speed += 2) },
    {
        type: "strength",
        src: strengthBuff,
        effect: (player) => ((player.minDamage += 5), (player.maxDamage += 5)),
    },
];

const gameMusic = new Audio("/src/assets/MortalKumbiat.mp3");
gameMusic.volume = 1;
gameMusic.loop = true;

const backToSelection = () => router.push("/game");

function movePlayers() {
    if (keys["w"] && player1.y > 0) {
        player1.y -= player1.speed;
        lastDirectionPlayer1 = "up";
    }
    if (keys["s"] && player1.y < fightArena.value.height - player1.height) {
        player1.y += player1.speed;
        lastDirectionPlayer1 = "down";
    }
    if (keys["a"] && player1.x > 0) {
        player1.x -= player1.speed;
        lastDirectionPlayer1 = "left";
    }
    if (keys["d"] && player1.x < fightArena.value.width - player1.width) {
        player1.x += player1.speed;
        lastDirectionPlayer1 = "right";
    }

    // Movimiento para player2
    if (keys["ArrowUp"] && player2.y > 0) {
        player2.y -= player2.speed;
        lastDirectionPlayer2 = "up";
    }
    if (
        keys["ArrowDown"] &&
        player2.y < fightArena.value.height - player2.height
    ) {
        player2.y += player2.speed;
        lastDirectionPlayer2 = "down";
    }
    if (keys["ArrowLeft"] && player2.x > 0) {
        player2.x -= player2.speed;
        lastDirectionPlayer2 = "left";
    }
    if (
        keys["ArrowRight"] &&
        player2.x < fightArena.value.width - player2.width
    ) {
        player2.x += player2.speed;
        lastDirectionPlayer2 = "right";
    }
}

function calculateDamage(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function attack(attacker, defender, attackerIsPlayer1) {
    const currentTime = Date.now();
    if (currentTime - attacker.lastAttackTime >= 1000 / attacker.attackSpeed) {
        const damage = calculateDamage(attacker.minDamage, attacker.maxDamage);
        defender.health = Math.max(defender.health - damage, 0);
        attacker.lastAttackTime = currentTime;

        if (attackerIsPlayer1) {
            isAttackingPlayer1 = true;
            setTimeout(() => (isAttackingPlayer1 = false), 200);
        } else {
            isAttackingPlayer2 = true;
            setTimeout(() => (isAttackingPlayer2 = false), 200);
        }
    }
}

function rangedAttack(attacker, direction) {
    const attackSprite = {
        x: attacker.x + attacker.width / 2,
        y: attacker.y + attacker.height / 2,
        width: 25,
        height: 25,
        direction: direction,
        range: attacker.attackRange,
        traveled: 0,
        attacker: attacker,
        attackerIsPlayer1: attacker === player1,
        image: attacker.damageImage,
    };

    buffs.push(attackSprite);
}

function drawBuffs() {
    buffs.forEach((buff, index) => {
        const speed = 10;
        if (buff.direction === "up") buff.y -= speed;
        if (buff.direction === "down") buff.y += speed;
        if (buff.direction === "left") buff.x -= speed;
        if (buff.direction === "right") buff.x += speed;

        buff.traveled += speed;

        const targetPlayer = buff.attackerIsPlayer1 ? player2 : player1;
        if (checkCollision(buff, targetPlayer)) {
            const damage = calculateDamage(
                buff.attacker.minDamage,
                buff.attacker.maxDamage
            );
            targetPlayer.health = Math.max(targetPlayer.health - damage, 0);
            buffs.splice(index, 1);
        } else if (buff.traveled >= buff.range) {
            buffs.splice(index, 1);
        } else {
            ctx.drawImage(buff.image, buff.x, buff.y, buff.width, buff.height);
        }
    });

    if (activeBuff) {
        ctx.drawImage(
            activeBuff.image,
            activeBuff.x,
            activeBuff.y,
            activeBuff.width,
            activeBuff.height
        );
    }
}

function checkCollision(buff, targetPlayer) {
    return (
        buff.x < targetPlayer.x + targetPlayer.width &&
        buff.x + buff.width > targetPlayer.x &&
        buff.y < targetPlayer.y + targetPlayer.height &&
        buff.y + buff.height > targetPlayer.y
    );
}

function checkBuffCollision(player) {
    if (
        activeBuff &&
        player.x < activeBuff.x + activeBuff.width &&
        player.x + player.width > activeBuff.x &&
        player.y < activeBuff.y + activeBuff.height &&
        player.y + player.height > activeBuff.y
    ) {
        activeBuff.effect(player);
        clearTimeout(buffTimeout);
        activeBuff = null;
        spawnBuff();
    }
}

function checkAttackRange(char1, char2) {
    const dx = char2.x - char1.x;
    const dy = char2.y - char1.y;
    return Math.sqrt(dx * dx + dy * dy) <= char1.attackRange;
}

function drawPlayers() {
    ctx.clearRect(0, 0, fightArena.value.width, fightArena.value.height);

    if (player1.image.complete && player2.image.complete) {
        ctx.drawImage(
            player1.image,
            player1.x,
            player1.y,
            player1.width,
            player1.height
        );
        ctx.drawImage(
            player2.image,
            player2.x,
            player2.y,
            player2.width,
            player2.height
        );
    }

    drawBuffs();
}

function spawnBuff() {
    const buff = buffImages[Math.floor(Math.random() * buffImages.length)];
    activeBuff = {
        ...buff,
        x: Math.random() * (fightArena.value.width - 50),
        y: Math.random() * (fightArena.value.height - 50),
        width: 50,
        height: 50,
        despawnTime: Date.now() + 4000,
        image: new Image(),
    };
    activeBuff.image.src = buff.src;

    buffTimeout = setTimeout(() => {
        activeBuff = null;
        spawnBuff();
    }, 4000);
}

async function updatePlayerRecord(winnerName) {
    try {
        const sessionResponse = await axios.get(
            "http://localhost:5555/api/check-session",
            {
                withCredentials: true,
            }
        );

        const loggedInUser = sessionResponse.data.user;

        if (!loggedInUser) {
            console.error("No hay usuario logueado");
            return;
        }

        const isWinner = winnerName === player1.name;
        const resultado = isWinner ? "victoria" : "derrota";

        const data = {
            username: loggedInUser.username,
            resultado: resultado,
        };

        await axios.post("http://localhost:5555/api/record", data);
        console.log("Record actualizado correctamente");
    } catch (error) {
        console.error("Error al actualizar el récord del jugador:", error);
    }
}

setInterval(() => {
    if (!activeBuff) spawnBuff();
}, 5000);

function gameLoop() {
    movePlayers();

    drawPlayers();
    drawBuffs();

    checkBuffCollision(player1);
    checkBuffCollision(player2);

    if (player1.health > 0 && player2.health > 0) {
        requestAnimationFrame(gameLoop);
    } else {
        endGame();
    }
}

function startGameLoop() {
    if (ctx && fightArena.value) {
        gameMusic.play();
        gameLoop();
    } else {
        console.error("Error: Contexto del canvas no inicializado.");
    }
}

function endGame() {
    const winner = player1.health > 0 ? player1.name : player2.name;

    setTimeout(async () => {
        alert(`¡Fin del juego! ${winner} ha ganado!`);
        await updatePlayerRecord(winner);

        router.push("/game");
        gameMusic.pause();
    }, 500);
}

onMounted(async () => {
    await nextTick();

    const j1Character = sessionStorage.getItem("j1Character");
    const j2Character = sessionStorage.getItem("j2Character");
    const j1Stats = JSON.parse(sessionStorage.getItem("j1Stats"));
    const j2Stats = JSON.parse(sessionStorage.getItem("j2Stats"));

    if (j1Character && j2Character && j1Stats && j2Stats) {
        player1.name = j1Character;
        player1.speed = j1Stats.speed || 5;
        player1.health = j1Stats.hp || 100;
        player1.maxHealth = j1Stats.hp || 100;
        player1.minDamage = j1Stats.minDamage || 10;
        player1.maxDamage = j1Stats.maxDamage || 20;
        player1.attackSpeed = j1Stats.attackSpeed || 1;

        player2.name = j2Character;
        player2.speed = j2Stats.speed || 5;
        player2.health = j2Stats.hp || 100;
        player2.maxHealth = j2Stats.hp || 100;
        player2.minDamage = j2Stats.minDamage || 10;
        player2.maxDamage = j2Stats.maxDamage || 20;
        player2.attackSpeed = j2Stats.attackSpeed || 1;

        console.log("Jugador 1:", player1.name);
        console.log("Jugador 2:", player2.name);

        player1.damageImage.src = `/src/assets/sprites/${player1.name.toLowerCase().replace(" ", "-")}-damage-sprite.png`;
        player1.image.src = `/src/assets/sprites/${player1.name.toLowerCase().replace(" ", "-")}-sprite.jpg`;
        player2.damageImage.src = `/src/assets/sprites/${player2.name.toLowerCase().replace(" ", "-")}-damage-sprite.png`;
        player2.image.src = `/src/assets/sprites/${player2.name.toLowerCase().replace(" ", "-")}-sprite.jpg`;

        player1.image.onload = () => {
            console.log(`${player1.name} cargado correctamente`);
            player1.imageLoaded = true;
            if (player2.imageLoaded) startGameLoop();
        };
        player1.image.onerror = () => {
            console.error(`Error al cargar la imagen de ${player1.name}`);
        };

        player2.image.onload = () => {
            console.log(`${player2.name} cargado correctamente`);
            player2.imageLoaded = true;
            if (player1.imageLoaded) startGameLoop();
        };
        player2.image.onerror = () => {
            console.error(`Error al cargar la imagen de ${player2.name}`);
        };
    } else {
        console.error(
            "Error: No se pudieron cargar los datos de los jugadores desde sessionStorage."
        );
    }

    if (fightArena.value) {
        ctx = fightArena.value.getContext("2d");
    } else {
        console.error("No se pudo encontrar el elemento del canvas.");
    }

    window.addEventListener("keydown", (event) => {
        keys[event.key] = true;
        if (event.key === "f") rangedAttack(player1, lastDirectionPlayer1);
        if (event.key === "Enter") rangedAttack(player2, lastDirectionPlayer2);
    });

    window.addEventListener("keyup", (event) => (keys[event.key] = false));
});

onBeforeUnmount(() => {
    window.removeEventListener("keydown", (event) => (keys[event.key] = true));
    window.removeEventListener("keyup", (event) => (keys[event.key] = false));
    gameMusic.pause();
});
</script>

<style scoped>
.game-body {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100dvh;
    background: linear-gradient(to right, #1a1a2e, #16213e, #1a1a2e);
    font-family: "Arial", sans-serif;
}

.game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
}

.health-bars-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 25px;
}

.player-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 45%;
}

.player-name {
    font-size: 28px;
    font-weight: bold;
    color: #fff;
    text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5);
    margin-bottom: 10px;
}

.health-bar-container {
    width: 100%;
}

.health-bar {
    width: 100%;
    height: 25px;
    background-color: #ddd;
    border-radius: 15px;
    overflow: hidden;
}

.health-fill {
    height: 100%;
    background-color: #76c7c0;
    transition: width 0.2s;
}

.health-text {
    text-align: center;
    color: #fff;
}

.back-button-container {
    margin-bottom: 20px;
}

.back-btn {
    background-color: #f39c12;
    color: white;
    border: none;
    padding: 12px 25px;
    border-radius: 7px;
    cursor: pointer;
    font-size: 18px;
    transition: background-color 0.3s;
}

.back-btn:hover {
    background-color: #e67e22;
}

.start-btn {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 12px 25px;
    border-radius: 7px;
    cursor: pointer;
    font-size: 18px;
    transition: background-color 0.3s;
}

.start-btn:hover {
    background-color: #2980b9;
}

canvas {
    border: 3px solid #fff;
    border-radius: 15px;
}
</style>
