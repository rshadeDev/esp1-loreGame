<template>
  <Header />
  <div class="container">
    <h1>Mortal Kumbiat: El combate del Ritmo</h1>
    <p>
      En una dimensión oculta conocida como <span class="highlight-orange">Cumbiaverse</span>, los
      campeones más poderosos del mundo de las artes marciales no solo luchan
      por el honor y la gloria, sino también por el ritmo. En esta tierra, la
      fuerza bruta se combina con el poder de la música. En lugar de controlar
      los elementos o la tecnología avanzada, los luchadores dominan los ritmos
      pegajosos de la cumbia para realizar sus movimientos especiales.
    </p>
    <h2>Personajes:</h2>
    <ul>
      <li>
        <strong class="highlight-blue">Frío Flow (Sub Zero)</strong>: Un guerrero que puede congelar a
        sus enemigos al ritmo de una cumbia gélida. Su poder es tan helado que
        convierte cualquier pista de baile en una pista de patinaje.
      </li>
      <li>
        <strong class="highlight-red">Sektor Sonidero (Sektor)</strong>: Ha reemplazado sus armas
        cibernéticas por un poderoso equipo de sonido. Con cada golpe, lanza
        bajos tan intensos que desestabilizan a sus oponentes, todo mientras
        ajusta los controles de su mixer.
      </li>
      <li>
        <strong class="highlight-yellow">Cumbia Mortal (Scorpion)</strong>: Un bailarín vengativo que usa
        sus cadenas para arrastrar a sus enemigos directamente a la pista de
        baile, donde los envuelve en un torbellino de pasos letales.
      </li>
      <li>
        <strong class="highlight-lightblue">El Cumbiero Dragón (Liu Kang)</strong>: Combina la tradición del
        kung-fu con el arte del acordeón. Con cada acorde de su instrumento,
        lanza ondas de energía que hipnotizan a sus rivales y los obliga a
        seguir el compás.
      </li>
    </ul>
    <p>
      El torneo <span class="highlight-orange">Kumbia Kombat</span> decidirá quién es el verdadero rey
      del ritmo. Solo los mejores podrán sobrevivir a esta batalla épica de
      golpes, patadas y cumbia.
    </p>
  </div>
</template>

<script setup>
import Header from "./Header.vue";
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 2em auto;
  padding: 1.5em;
  background-color: #1a1e23;
  color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

h1 {
  color: #4caf50;
  font-size: 2rem;
  margin-top: 1.5rem;
  text-align: center;
}

h2 {
  color: #4caf50;
  font-size: 1.5rem;
  margin: 2rem 0 1rem;
  text-align: center;
}

p,
ul {
  color: #e0f2f1;
  font-size: 1.1rem;
  margin: 1rem 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 1rem 0;
  background-color: #2a2e35;
  padding: 10px;
  border-radius: 4px;
}

.highlight-blue {
  color: #1e90ff; 
}

.highlight-red {
  color: #ff4500; 
}

.highlight-yellow {
  color: #ffd700;
}

.highlight-lightblue {
  color: #b0e0e6; 
}

.highlight-orange {
  color: #ff8c00; 
}
</style>
