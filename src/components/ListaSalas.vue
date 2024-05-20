<template>
  <div>
    <h1>Salas de Juntas</h1>
    <ul>
      <li v-for="sala in salas" :key="sala.id">
        {{ sala.nombre }} ({{ sala.ubicacion }})
        <button @click="reservarSala(sala.id)">Reservar</button>
      </li>
    </ul>
    <form @submit.prevent="hacerReserva">
      <select v-model="reserva.SaladeJuntasId">
        <option v-for="sala in salas" :key="sala.id" :value="sala.id">
          {{ sala.nombre }}
        </option>
      </select>
      <input type="datetime-local" v-model="reserva.HoraInicio" />
      <input type="datetime-local" v-model="reserva.HoraFin" />
      <button type="submit">Reservar</button>
    </form>
  </div>
</template>

<script>
import axios from "axios"; // Asegúrate de que la ruta es correcta

export default {
  data() {
    return {
      salas: [], // Lista de salas de juntas
      reserva: {
        SaladeJuntasId: null,
        HoraInicio: "",
        HoraFin: "",
      },
    };
  },
  created() {
    this.obtenerSalas();
  },
  methods: {
    async obtenerSalas() {
      try {
        const respuesta = await axios.get(
          "https://localhost:7238/api/SaladeJuntas"
        );
        this.salas = respuesta.data;
      } catch (error) {
        console.error("Error al obtener las salas:", error);
        alert("Error al obtener las salas: " + error.message);
      }
    },
    async hacerReserva() {
      try {
        await axios.post("https://localhost:7238/api/Reservas", this.reserva);
        alert("Reserva exitosa");
        this.limpiarFormulario();
      } catch (error) {
        console.error("Error al reservar:", error);
        alert("Error al reservar: " + JSON.stringify(error.response.data));
      }
    },
    reservarSala(salaId) {
      this.reserva.SaladeJuntasId = salaId;
    },
    limpiarFormulario() {
      this.reserva.SaladeJuntasId = null;
      this.reserva.HoraInicio = "";
      this.reserva.HoraFin = "";
    },
  },
};
</script>
