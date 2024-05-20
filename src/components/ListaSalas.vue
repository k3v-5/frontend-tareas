<template>
  <div class="container">
    <!-- Encabezado principal -->
    <h1 class="header">Salas de Juntas</h1>

    <!-- Lista de salas de juntas disponibles -->
    <ul class="room-list">
      <li v-for="sala in salas" :key="sala.id" class="room-item">
        <div class="room-info">
          <span class="room-name">{{ sala.nombre }}</span>
        </div>
        <!-- Botón para reservar una sala específica -->
        <button @click="reservarSala(sala.id)" class="reserve-button">
          Reservar
        </button>
      </li>
    </ul>

    <!-- Formulario para crear o actualizar una reserva -->
    <form @submit.prevent="hacerReserva" class="reservation-form">
      <!-- Selector de sala de juntas -->
      <select v-model="reserva.SalaDeJuntasId" class="form-control">
        <option v-for="sala in salas" :key="sala.id" :value="sala.id">
          {{ sala.nombre }}
        </option>
      </select>
      <!-- Campo para la hora de inicio de la reserva -->
      <input
        type="datetime-local"
        v-model="reserva.HoraInicio"
        class="form-control"
      />
      <!-- Campo para la hora de fin de la reserva -->
      <input
        type="datetime-local"
        v-model="reserva.HoraFin"
        class="form-control"
      />
      <!-- Botón para enviar el formulario -->
      <button type="submit" class="submit-button">
        {{ reserva.id ? "Actualizar Reserva" : "Reservar" }}
      </button>
      <!-- Botón para cancelar y limpiar el formulario -->
      <button type="button" @click="limpiarFormulario" class="cancel-button">
        Cancelar
      </button>
    </form>

    <!-- Encabezado de la lista de reservas -->
    <h2 class="header">Reservas</h2>

    <!-- Lista de reservas existentes -->
    <ul class="reservation-list">
      <li
        v-for="reserva in reservas"
        :key="reserva.id"
        class="reservation-item"
      >
        <div class="reservation-info">
          <span>Sala ID: {{ reserva.salaDeJuntasId }}</span>
          <span>Inicio: {{ reserva.horaInicio }}</span>
          <span>Fin: {{ reserva.horaFin }}</span>
        </div>
        <!-- Botón para editar una reserva existente -->
        <button @click="editarReserva(reserva)" class="edit-button">
          Editar
        </button>
        <!-- Botón para eliminar una reserva existente -->
        <button @click="eliminarReserva(reserva.id)" class="delete-button">
          Eliminar
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      salas: [], // Lista de salas de juntas disponibles
      reservas: [], // Lista de reservas existentes
      reserva: {
        id: null,
        SalaDeJuntasId: null,
        HoraInicio: "",
        HoraFin: "",
      },
    };
  },
  created() {
    this.obtenerSalas(); // Obtener las salas de juntas al crear el componente
    this.obtenerReservas(); // Obtener las reservas existentes al crear el componente
  },
  methods: {
    // Método para obtener las salas de juntas desde la API
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
    // Método para obtener las reservas desde la API
    async obtenerReservas() {
      try {
        const respuesta = await axios.get(
          "https://localhost:7238/api/Reservas"
        );
        this.reservas = respuesta.data;
        console.log(this.reservas);
      } catch (error) {
        console.error("Error al obtener las reservas:", error);
        alert("Error al obtener las reservas: " + error.message);
      }
    },
    // Método para crear o actualizar una reserva
    async hacerReserva() {
      try {
        if (this.reserva.id) {
          await axios.put(
            `https://localhost:7238/api/Reservas/${this.reserva.id}`,
            this.reserva
          );
          alert("Reserva actualizada");
        } else {
          await axios.post("https://localhost:7238/api/Reservas", this.reserva);
          alert("Reserva exitosa");
        }
        this.limpiarFormulario();
        this.obtenerReservas();
      } catch (error) {
        console.error("Error al reservar:", error);
        alert("Error al reservar: " + JSON.stringify(error.response.data));
      }
    },
    // Método para eliminar una reserva
    async eliminarReserva(id) {
      try {
        await axios.delete(`https://localhost:7238/api/Reservas/${id}`);
        alert("Reserva eliminada");
        this.obtenerReservas();
      } catch (error) {
        console.error("Error al eliminar la reserva:", error);
        alert("Error al eliminar la reserva: " + error.message);
      }
    },
    // Método para seleccionar una sala de juntas para la reserva
    reservarSala(salaId) {
      this.reserva.SalaDeJuntasId = salaId;
    },
    // Método para limpiar el formulario de reserva
    limpiarFormulario() {
      this.reserva = {
        id: null,
        SalaDeJuntasId: null,
        HoraInicio: "",
        HoraFin: "",
      };
    },
    // Método para editar una reserva existente
    editarReserva(reserva) {
      this.reserva = { ...reserva };
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

.room-list,
.reservation-list {
  list-style: none;
  padding: 0;
}

.room-item,
.reservation-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.room-info,
.reservation-info {
  display: flex;
  flex-direction: column;
}

.room-name {
  font-weight: bold;
}

.reserve-button,
.edit-button,
.delete-button {
  padding: 10px 15px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.reserve-button {
  background-color: #007bff;
}

.reserve-button:hover {
  background-color: #0056b3;
}

.edit-button {
  background-color: #ffc107;
}

.edit-button:hover {
  background-color: #e0a800;
}

.delete-button {
  background-color: #dc3545;
}

.delete-button:hover {
  background-color: #c82333;
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

.cancel-button {
  padding: 10px 15px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-button:hover {
  background-color: #5a6268;
}
</style>
