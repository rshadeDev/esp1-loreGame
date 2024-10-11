<template>
  <nav class="navbar">
    <ul>
      <li><router-link to="/">Home</router-link></li
      ><li><router-link to="/lore">Lore</router-link></li>
      <li><router-link to="/game">Game</router-link></li>
    </ul>
  </nav>
</template>
<style scoped>
.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333;
  padding: 1rem;
}

.navbar ul {
  list-style-type: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;
}

.navbar li {
  font-size: 1.2rem;
}

.navbar a {
  color: white;
  text-decoration: none;
}

.navbar a:hover {
  text-decoration: underline;
}

</style>
