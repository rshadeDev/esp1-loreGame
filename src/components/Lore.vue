<template>
  <Header />
  <div class="lore-container">
    <h1>Mortal Kumbia: Lore del Cumbiaverse</h1>
    <p>
      En el <strong>Cumbiaverse</strong>, un mundo donde la música y la batalla
      se entrelazan, cuatro guerreros legendarios se enfrentan en un torneo de
      ritmo y habilidad. Cada uno con su propio estilo y motivaciones, buscan
      demostrar su dominio en el arte del combate y la cumbia.
    </p>
    <h2>Los Guerreros:</h2>
    <div class="character">
      <h3>Frío Flow (Sub Zero)</h3>
      <p>
        Criado en el frío norte de la tierra de los hielos, Frío Flow se
        especializa en el arte de la cumbia helada. Su misión es mantener el
        equilibrio en el Cumbiaverse, utilizando su habilidad para congelar a
        sus enemigos en plena danza. La cumbia gélida que toca hace que sus
        oponentes se enfrenten a una pista de baile congelada, donde cada
        movimiento se convierte en un desafío.
      </p>
    </div>
    <div class="character">
      <h3>Sektor Sonidero (Sektor)</h3>
      <p>
        Un antiguo guerrero que ha adoptado la música como su mayor arma. Sektor
        Sonidero es un maestro de los bajos y ritmos pulsantes. Armado con su
        poderoso equipo de sonido, usa el poder de la música para desestabilizar
        a sus enemigos. Cada golpe que lanza resuena con una vibración que puede
        romper la voluntad de cualquier rival, convirtiendo la batalla en un
        auténtico festival sonoro.
      </p>
    </div>
    <div class="character">
      <h3>Cumbia Mortal (Scorpion)</h3>
      <p>
        Un espíritu vengativo que regresa del inframundo para reclamar su lugar
        en el Cumbiaverse. Cumbia Mortal, conocido por su habilidad para
        arrastrar a sus enemigos a la pista de baile, usa sus cadenas en un
        estilo de baile letal. Su habilidad para controlar el ritmo de la lucha
        lo convierte en un oponente formidable. Cada paso que da provoca un
        torbellino de energía que envuelve a sus enemigos, llevándolos a la
        derrota en un arrastre rítmico.
      </p>
    </div>
    <div class="character">
      <h3>El Cumbiero Dragón (Liu Kang)</h3>
      <p>
        El Cumbiero Dragón es un maestro de las artes marciales y un virtuoso
        del acordeón. Con cada acorde que toca, lanza poderosas ondas de energía
        que hipnotizan a sus oponentes y los obligan a unirse a la danza. Liu
        Kang no solo lucha para ganar, sino para mantener viva la esencia de la
        cumbia en el Cumbiaverse. Su objetivo es mostrar a todos que el poder
        del ritmo puede ser tan fuerte como cualquier golpe.
      </p>
    </div>
    <h2>El Torneo Kumbia Kombat</h2>
    <p>
      En este épico torneo, los cuatro guerreros se enfrentarán para decidir
      quién es el verdadero rey del ritmo. La música sonará, los pasos se
      ejecutarán, y solo el mejor podrá bailar hacia la victoria. ¡Que comience
      el combate !
    </p>
  </div>
</template>

<script setup>
import Header from "./Header.vue";
</script>

<style scoped>
.lore-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  color: white;
}

h1 {
  color: #ff6f61;
  font-size: 2.5rem;
  margin: 2rem 0;
}

h2 {
  color: #ff6f61;
  font-size: 2rem;
  margin: 2rem 0 1rem;
}

.character {
  background-color: #000;
  margin: 1rem 0;
  padding: 15px;
  border-radius: 8px;
  max-width: 600px;
}

h3 {
  color: #ff6f61;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

p {
  font-size: 1.2rem;
  margin: 1rem 0;
  line-height: 1.5;
}
</style>
