<template>
  <div>
    <h1 class="display-4 text-center">Listado de Horarios</h1>
    <hr />
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <div class="card mt-4">
          <div class="card-body">
            <div class="input-group">
              <input
                type="text"
                v-model="horario"
                class="form-control form-control-lg"
                placeholder="Agregar Horario "
              />
              <div class="input-group-append">
                <button
                  v-on:click="agregarHorario()"
                  class="btn btn-success btn-lg"
                >
                  Agregar
                </button>
              </div>
            </div>
            <br />
            <div class="text-center">
              <div
                v-if="loading"
                class="spinner-border text-success"
                role="status"
              >
                <span class="sr-only">Loading...</span>
              </div>
            </div>

            <h5 v-if="listHorarios.length == 0">
              No hay horarios para realizar
            </h5>
            <ul v-if="!loading" class="list-group">
              <li
                v-for="(horario, index) of listHorarios"
                :key="index"
                class="list-group-item d-flex justify-content-between"
              >
                <span
                  class="cursor"
                  v-bind:class="{ 'text-success': horario.estado }"
                  v-on:click="editarHorario(horario, horario.id)"
                >
                  <i
                    v-bind:class="[
                      horario.estado ? 'fas fa-check-circle' : 'far fa-circle',
                    ]"
                  ></i>
                </span>
                {{ horario.nombre }}
                <span
                  class="text-danger cursor"
                  v-on:click="eliminarHorario(horario.id)"
                >
                  <i class="fas fa-trash-alt"></i>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const URL = "https://localhost:7238/api/Horario/";
export default {
  name: "MyHorario",
  data() {
    return {
      horario: "",
      listHorarios: [],
      loading: false,
    };
  },
  methods: {
    agregarHorario() {
      const horario = {
        nombre: this.horario,
        estado: false,
      };
      /*  this.listTareas.push(tarea); */
      this.loading = true;
      axios
        .post(URL, horario)
        .then((response) => {
          console.log(response);
          this.loading = false;
          this.obtenerHorarios();
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        });
      this.horario = "";
    },
    eliminarHorario(id) {
      /* this.listTareas.splice(index, 1) */
      this.loading = true;
      axios
        .delete(URL + id)
        .then((response) => {
          console.log(response);
          this.obtenerHorarios();
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
    editarHorario(horario, id) {
      /*  this.listTareas[index].estado = !tarea.estado; */
      this.loading = true;
      axios
        .put(URL + id, horario)
        .then(() => {
          this.obtenerHorarios();
          this.loading = false;
        })
        .catch(() => (this.loading = false));
    },
    obtenerHorarios() {
      this.loading = true;
      axios
        .get(URL)
        .then((response) => {
          console.log(response);
          this.listHorarios = response.data;
          this.loading = false;
        })
        .catch(() => (this.loading = false));
    },
  },
  created: function () {
    this.obtenerHorarios();
  },
};
</script>

<style scoped>
.cursor {
  cursor: pointer;
}
</style>
