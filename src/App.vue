<template>
  <lista-salas></lista-salas>
</template>

<script>
import ListaSalas from "./components/ListaSalas.vue";

export default {
  name: "App",

  methods: {
    navigate(route) {
      if (this.progressOverlay) return 0;
      if (this.$forceUpdate.name != route) this.$router.push({ name: route });
    },
  },
  components: {
    ListaSalas,
  },
};
</script>

<style></style>
