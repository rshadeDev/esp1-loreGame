<template>
  <div
    class="card"
    :class="{ j1: selectedPlayer === 'J1', j2: selectedPlayer === 'J2' }"
    @click="handleSelect"
  >
    <div
      class="card-background"
      :style="{ backgroundImage: `url(${character.image})` }"
    ></div>
    <div class="content">
      <div class="card-name">{{ character.name }}</div>
      <h3 class="card-description">{{ character.description }}</h3>
    </div>
    <div
      v-if="selectedPlayer"
      :class="`indicator ${selectedPlayer.toLowerCase()}-indicator`"
    >
      {{ selectedPlayer }}
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  character: Object,
  selectedPlayer: String,
});

const emit = defineEmits(["select"]);

const handleSelect = () => {
  console.log("Personaje seleccionado:", props.character.name);
  emit("select", props.character);
};
</script>

<style scoped>
.card {
  position: relative;
  list-style: none;
  width: 220px;
  border: 5px solid transparent;
  transition: 0.3 ease;
  border-radius: 20px;
}

.card::before {
  content: "";
  display: block;
  padding-bottom: 150%;
  width: 100%;
}

.card-background {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 450px;
  border-radius: 20px;
  background-size: cover;
  background-position: center;
  filter: brightness(0.9) saturate(1) contrast(1);
  transform-origin: bottom;
  transform: scale(1) translateZ(0);
  transition: 0.3s ease;
}

.card:hover .card-background {
  transform: scale(1.2) translateZ(0);
  background-size: cover;
}

.card-container:hover .card:not(:hover) {
  transform: scale(0.95);
}

.card-container:hover > .card:not(:hover) .card-background,
.card-container:hover > .card:not(:hover) .card-name {
  filter: brightness(0.5) saturate(0) contrast(1.2) blur(20px);
}

.content {
  top: 50%;
  left: 0;
  padding: 15px;
  position: absolute;
}

.card-name {
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 5px;
  margin-bottom: 8px;
  text-transform: uppercase;
}

.card-description {
  color: #fff;
  font-size: 1.5rem;
  line-height: 1;
  text-shadow: 2px 2px 20px rgba(0, 0, 0, 0.2);
}

.j1 {
  border-color: blue;
}

.j2 {
  border-color: red;
}

.indicator {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
}

.j1-indicator {
  background-color: blue;
}

.j2-indicator {
  background-color: red;
}
</style>
