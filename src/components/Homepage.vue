<template>
  <Header />
  <div class="container">
    <h1>Mortal Kumbiat: El combate del Ritmo</h1>
    <p>
      En una dimensión oculta conocida como <strong>Cumbiaverse</strong>, los
      campeones más poderosos del mundo de las artes marciales no solo luchan
      por el honor y la gloria, sino también por el ritmo. En esta tierra, la
      fuerza bruta se combina con el poder de la música. En lugar de controlar
      los elementos o la tecnología avanzada, los luchadores dominan los ritmos
      pegajosos de la cumbia para realizar sus movimientos especiales.
    </p>
    <h2>Personajes:</h2>
    <ul>
      <li>
        <strong>Frío Flow (Sub Zero)</strong>: Un guerrero que puede congelar a
        sus enemigos al ritmo de una cumbia gélida. Su poder es tan helado que
        convierte cualquier pista de baile en una pista de patinaje.
      </li>
      <li>
        <strong>Sektor Sonidero (Sektor)</strong>: Ha reemplazado sus armas
        cibernéticas por un poderoso equipo de sonido. Con cada golpe, lanza
        bajos tan intensos que desestabilizan a sus oponentes, todo mientras
        ajusta los controles de su mixer.
      </li>
      <li>
        <strong>Cumbia Mortal (Scorpion)</strong>: Un bailarín vengativo que usa
        sus cadenas para arrastrar a sus enemigos directamente a la pista de
        baile, donde los envuelve en un torbellino de pasos letales.
      </li>
      <li>
        <strong>El Cumbiero Dragón (Liu Kang)</strong>: Combina la tradición del
        kung-fu con el arte del acordeón. Con cada acorde de su instrumento,
        lanza ondas de energía que hipnotizan a sus rivales y los obliga a
        seguir el compás.
      </li>
    </ul>
    <p>
      El torneo <strong>Kumbia Kombat</strong> decidirá quién es el verdadero rey
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
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}
h1 {
  color: white;
  font-size: 2rem;
  margin-top: 2rem;
}
h2 {
  color: white;
  font-size: 1.5rem;
  margin: 2rem 0 1rem;
}
p {
  color: white;
  font-size: 1.2rem;
  margin: 1rem 0;
}
ul {
  color: white;
  font-size: 1.2rem;
  margin: 1rem 0;
}
li {
  margin: 1rem 0;
}
strong {
  color: #ff6f61;
}
</style>
