<template>
  <div>
    <!-- Badge -->
    <div
      :class="['alert', abierto ? 'alert-success' : 'alert-secondary', 'py-2','px-3','mb-0','text-center','badge-open']"
      role="alert"
    >
      {{ abierto ? "ABIERTO" : "CERRADO" }} • {{ horario.open }}–{{ horario.close }} (Llallagua)
    </div>

    <!-- Encabezado -->
    <header class="text-center py-4" style="background: linear-gradient(90deg, #ff512f, #f09819);">
      <img src="/img/escudo.png" alt="Pollos Dumbo" style="height:100px; width:auto; filter: drop-shadow(0 4px 10px rgba(0,0,0,.2));">
      <h1 class="mt-2 mb-3 brand-text" style="color:#fff; text-shadow:1px 2px 4px rgba(0,0,0,.4);">Pollos Dumbo</h1>
      <div class="d-flex justify-content-center gap-3 flex-wrap">
        <RouterLink to="/" class="btn btn-light btn-lg fw-bold px-4">Inicio</RouterLink>
        <RouterLink to="/pedido" class="btn btn-dark btn-lg fw-bold px-4">Hacer Pedido</RouterLink>
      </div>
    </header>

    <!-- Productos -->
    <main class="container py-5">
      <h2 class="text-center mb-4 brand-text section-title" style="color:#d35400;">Nuestro Menú</h2>
      <div class="row">
        <div class="col-sm-6 col-lg-4" v-for="p in productos" :key="p.key">
          <div class="card mb-4 shadow-sm h-100">
            <img :src="p.img" class="card-img-top" :alt="p.nombre">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">{{ p.nombre }}</h5>
              <p class="card-text text-muted">{{ p.desc }}</p>
              <div class="mt-auto d-flex justify-content-between align-items-center">
                <span class="fw-bold">Bs {{ p.precio.toFixed(2) }}</span>
                <!-- Botón Pedir con query -->
                <RouterLink
                  :to="{ name: 'pedido', query: { producto: p.tipo, porcion: p.tipo==='porcion' ? p.key : '' } }"
                  class="btn btn-sm btn-primary"
                >
                  Pedir
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bebidas Gaseosas -->
      <h2 class="text-center mt-5 mb-4 brand-text section-title" style="color:#0f5132;">
        Bebidas Gaseosas
      </h2>
      <div class="row">
        <div class="col-6 col-lg-4" v-for="b in bebidasCards" :key="b.nombre">
          <div class="card mb-4 shadow-sm h-100">
            <img :src="b.img" class="card-img-top drink-img" :alt="b.nombre" loading="lazy">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">{{ b.nombre }}</h5>
              <p class="card-text text-muted">Refresco gaseoso</p>
              <div class="mt-auto d-flex justify-content-between align-items-center">
                <span class="fw-bold">Bs {{ Number(b.precio).toFixed(2) }}</span>
                <!-- Botón Pedir bebida -->
                <RouterLink
                  :to="{ name: 'pedido', query: { refresco: 'gaseosa', gaseosaMarca: b.marca, gaseosaTam: b.tam } }"
                  class="btn btn-sm btn-outline-success"
                >
                  Pedir
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Refrescos Naturales -->
      <h2 class="text-center mt-5 mb-4 brand-text section-title" style="color:#0b5ed7;">
        Refrescos
      </h2>
      <div class="row">
        <div class="col-6 col-lg-4" v-for="r in refrescosNaturales" :key="r.nombre">
          <div class="card mb-4 shadow-sm h-100">
            <img :src="r.img" class="card-img-top drink-img" :alt="r.nombre" loading="lazy">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">{{ r.nombre }}</h5>
              <p class="card-text text-muted">Bebida natural</p>
              <div class="mt-auto d-flex justify-content-between align-items-center">
                <span class="fw-bold">Bs {{ Number(r.precio).toFixed(2) }}</span>
                <!-- Botón Pedir refresco natural -->
                <RouterLink
                  :to="{ name: 'pedido', query: { refresco: r.key } }"
                  class="btn btn-sm btn-outline-success"
                >
                  Pedir
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="text-center py-4 bg-light">
      <small>© {{ new Date().getFullYear() }} Pollos Dumbo • Llallagua</small>
    </footer>
  </div>
</template>

<script>
import CATALOGO from "@/data/catalogo";

export default {
  name: "PolloView",
  data() {
    return {
      horario: { open: "15:00", close: "21:00" },
      nowMins: this.getNowMins(),
      productos: [
        { key:'entero',   tipo:'producto', nombre:'Pollo Entero Frito',      desc:'Ideal para compartir.',      img:'/img/entero.PNG',     precio: CATALOGO.pollo.entero },
        { key:'broaster', tipo:'producto', nombre:'Pollo Broaster',          desc:'Crujiente y sabroso.',       img:'/img/broaster.jpg',   precio: CATALOGO.pollo.broaster },
        { key:'frito',    tipo:'producto', nombre:'Pollo Frito Tradicional', desc:'Receta clásica de la casa.', img:'/img/spiedo.jpg',     precio: CATALOGO.pollo.frito },
        { key:'arroz',    tipo:'porcion',  nombre:'Porción de Arroz',        desc:'Arroz blanco.',              img:'/img/arroz.PNG',      precio: CATALOGO.porciones.arroz },
        { key:'papa',     tipo:'porcion',  nombre:'Papa Frita',              desc:'Porción de papas.',          img:'/img/papita.png',     precio: CATALOGO.porciones.papa },
        { key:'fideo',    tipo:'porcion',  nombre:'Porción de Fideo',        desc:'Fideos al dente.',           img:'/img/fideo.PNG',      precio: CATALOGO.porciones.fideo },
      ],
    };
  },
  computed: {
    abierto() {
      const toMin = (s) => { const [h,m]=s.split(":").map(Number); return h*60+m; };
      return this.nowMins >= toMin(this.horario.open) && this.nowMins <= toMin(this.horario.close);
    },
    bebidasCards() {
      const G = CATALOGO.bebidas?.gaseosa || {};
      const nombres = { mini:'Mini', popular:'Popular', mediana:'Mediana' };
      const marcas  = { coca:'Coca-Cola', fanta:'Fanta', sprite:'Sprite' };

      const imgs = {
        coca:   { mini:'/img/coca_popular.png',  popular:'/img/coca_popular.png',  mediana:'/img/coca_popular.png' },
        fanta:  { mini:'/img/fanta_mini.jpg',    popular:'/img/fanta_flaca.webp',  mediana:'/img/fanta_flaca.webp' },
        sprite: { mini:'/img/sprite_mini.jpg',   popular:'/img/sprite_popular.webp', mediana:'/img/sprite_flaca.webp' },
      };

      const cards = [];
      ['coca','fanta','sprite'].forEach(marca => {
        ['mini','popular','mediana'].forEach(tam => {
          const precio = G[marca]?.[tam];
          if (typeof precio === 'number') {
            cards.push({
              nombre: `${marcas[marca]} ${nombres[tam]}`,
              img: imgs[marca][tam],
              precio,
              marca,
              tam
            });
          }
        });
      });
      return cards;
    },
    refrescosNaturales() {
      const R = [];
      if (typeof CATALOGO.bebidas?.maracuya === 'number') {
        R.push({ key:'maracuya', nombre:'Refresco de maracuyá', precio: CATALOGO.bebidas.maracuya, img:'/img/maracuya.jpg' });
      }
      if (typeof CATALOGO.bebidas?.limonada === 'number') {
        R.push({ key:'limonada', nombre:'Limonada', precio: CATALOGO.bebidas.limonada, img:'/img/limonada.jpg' });
      }
      return R;
    }
  },
  mounted(){ this.t = setInterval(() => this.nowMins = this.getNowMins(), 60000); },
  beforeUnmount(){ clearInterval(this.t); },
  methods: {
    getNowMins(){ const n=new Date(); return n.getHours()*60+n.getMinutes(); }
  }
};
</script>
