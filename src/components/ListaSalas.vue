<template>
  <div class="container">
    <h1 class="header">Salas de Juntas</h1>
    <ul class="room-list">
      <li v-for="sala in salas" :key="sala.id" class="room-item">
        <div class="room-info">
          <span class="room-name">{{ sala.nombre }}</span>
          <span class="room-location">{{ sala.ubicacion }}</span>
        </div>
        <button @click="reservarSala(sala.id)" class="reserve-button">
          Reservar
        </button>
      </li>
    </ul>
    <form @submit.prevent="hacerReserva" class="reservation-form">
      <select v-model="reserva.SalaDeJuntasId" class="form-control">
        <option v-for="sala in salas" :key="sala.id" :value="sala.id">
          {{ sala.nombre }}
        </option>
      </select>
      <input
        type="datetime-local"
        v-model="reserva.HoraInicio"
        class="form-control"
      />
      <input
        type="datetime-local"
        v-model="reserva.HoraFin"
        class="form-control"
      />
      <button type="submit" class="submit-button">Reservar</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      salas: [], // Lista de salas de juntas
      reserva: {
        SalaDeJuntasId: null,
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
      //obtener lista de salas de juntas
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
      //reservacion de la sala
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
      //asignacion del id de la sala
      this.reserva.SalaDeJuntasId = salaId;
    },
    limpiarFormulario() {
      //restablece los campos del formulario
      this.reserva.SalaDeJuntasId = null;
      this.reserva.HoraInicio = "";
      this.reserva.HoraFin = "";
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2em;
  color: #333;
}

.room-list {
  list-style: none;
  padding: 0;
}

.room-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.room-info {
  display: flex;
  flex-direction: column;
}

.room-name {
  font-weight: bold;
}

.room-location {
  color: #777;
}

.reserve-button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.reserve-button:hover {
  background-color: #0056b3;
}

.reservation-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.form-control {
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-button {
  padding: 10px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #218838;
}
</style>
