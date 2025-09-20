<template>
  <div class="page">
    <!-- Badge de horario -->
    <div class="container pt-3">
      <div :class="estadoClass" role="alert">{{ estadoTexto }}</div>
    </div>

    <!-- Centro -->
    <div class="hero-wrap">
      <div class="container cta-zone" style="max-width:900px;">
        <img src="/img/escudo.png" alt="Pollos Dumbo" class="logo" />
        <h1 class="brand">Pollos Dumbo</h1>
        <p class="subtitle">¡El mejor pollo de Llallagua!</p>
        <p class="copy">
          Abrimos de <strong>3:00 pm</strong> a <strong>9:00 pm</strong>. Pide para delivery o pasa a recoger.
        </p>

        <div class="d-flex justify-content-center gap-3 flex-wrap mt-3">
          <RouterLink class="btn btn-brand btn-lg px-4" to="/pollo">Ver menú</RouterLink>
          <RouterLink class="btn btn-outline-dark btn-lg px-4" to="/pedido">Hacer pedido</RouterLink>
        </div>
      </div>
    </div>

    <footer>
      © {{ year }} Pollos Dumbo • Llallagua
    </footer>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return { year: new Date().getFullYear() };
  },
  computed: {
    estadoTexto() {
      const horario = { open: "15:00", close: "21:00" };
      const toMin = (s) => { const [h,m] = s.split(":").map(Number); return h*60+m; };
      const now = new Date(), mins = now.getHours()*60 + now.getMinutes();
      const abierto = mins >= toMin(horario.open) && mins <= toMin(horario.close);
      return `${abierto ? "ABIERTO" : "CERRADO"} • ${horario.open}–${horario.close} (Llallagua)`;
    },
    estadoClass() {
      const horario = { open: "15:00", close: "21:00" };
      const toMin = (s) => { const [h,m] = s.split(":").map(Number); return h*60+m; };
      const now = new Date(), mins = now.getHours()*60 + now.getMinutes();
      const abierto = mins >= toMin(horario.open) && mins <= toMin(horario.close);
      return `alert ${abierto ? "alert-success" : "alert-secondary"} text-center py-2 mb-0`;
    },
  },
};
</script>
