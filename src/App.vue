<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand bg-light px-3 shadow-sm">
      <div class="container-fluid">
        <RouterLink to="/" class="navbar-brand fw-bold">Pollos Dumbo</RouterLink>
        <div class="ms-auto d-flex gap-2">
          <RouterLink to="/" class="btn btn-sm btn-outline-secondary">Inicio</RouterLink>
          <RouterLink to="/pollo" class="btn btn-sm btn-outline-primary">Menú</RouterLink>
          <RouterLink to="/pedido" class="btn btn-sm btn-outline-success">Pedido</RouterLink>
        </div>
      </div>
    </nav>

    <!-- Contenido de las vistas -->
    <router-view />
  </div>
</template>

<script>
export default { name: "App" };
</script>
