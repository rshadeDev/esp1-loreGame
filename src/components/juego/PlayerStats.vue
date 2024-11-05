<template>
  <div class="stats">
    <h3>{{ title }}</h3>
    <p>Personaje: {{ player?.name || "" }}</p>
    <p>HP: {{ player?.stats.hp || "" }}</p>
    <p>
      Damage:
      {{ player ? `${player.stats.minDamage}-${player.stats.maxDamage}` : "" }}
    </p>
    <p>AS: {{ player?.stats.attackSpeed || "" }}</p>
    <p>Velocidad: {{ player?.stats.speed || "" }}</p>
    <p>Rango de ataque: {{ player?.stats.attackRange || "" }}</p>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  player: Object,
  title: String,
});
</script>

<style scoped>
.stats {
  background-color: #1a1e23;
  padding: 20px;
  border-radius: 10px;
  width: 220px;
  text-align: center;
  color: white;
}
</style>
