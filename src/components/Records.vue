<template>
    <Header />
    <div class="records-container">
        <h2>Tabla de Récords</h2>
        <table>
            <thead>
                <tr>
                    <th>Nombre de Usuario</th>
                    <th>Partidas</th>
                    <th>Victorias</th>
                    <th>Derrotas</th>
                    <th>Winrate (%)</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="record in records" :key="record.username">
                    <td>{{ record.username }}</td>
                    <td>{{ record.matches }}</td>
                    <td>{{ record.wins }}</td>
                    <td>{{ record.losses }}</td>
                    <td>{{ record.winrate }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Header from "./Header.vue";

const records = ref([]);

const fetchRecords = async () => {
    try {
        const response = await axios.get("http://localhost:5555/api/records");
        records.value = response.data.map((record) => ({
            ...record,
            winrate: record.matches
                ? ((record.wins / record.matches) * 100).toFixed(2)
                : "0",
        }));
    } catch (error) {
        console.error("Error al obtener los récords:", error);
    }
};

onMounted(() => {
    fetchRecords();
});
</script>

<style scoped>
.records-container {
    max-width: 800px;
    margin: 2em auto;
    padding: 1.5em;
    background-color: #1a1e23;
    color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

h2 {
    text-align: center;
    color: #4caf50;
    margin-bottom: 1em;
}

table {
    width: 100%;
    border-collapse: collapse;
    background-color: #2a2e35;
    margin-top: 1em;
}

th,
td {
    padding: 0.8em;
    text-align: center;
    border: 1px solid #4caf50;
}

th {
    background-color: #333333;
    color: #4caf50;
    font-weight: bold;
}

tr:nth-child(even) {
    background-color: #3a3e44;
}

tr:hover {
    background-color: #4caf50;
    color: #1a1e23;
    transition: 0.3s;
}

td:last-child {
    font-weight: bold;
    color: #ffd700;
}
</style>
