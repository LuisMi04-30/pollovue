<template>
  <div>
    <!-- Badge ABIERTO/CERRADO -->
    <div :class="['alert', abierto ? 'alert-success' : 'alert-secondary','text-center','topbar']" role="alert">
      {{ abierto ? 'Abierto' : 'Cerrado' }} • {{ horario.open }}–{{ horario.close }} (Llallagua)
    </div>

    <div class="container-fluid g-0">
      <div class="row g-0">
        <!-- Sidebar -->
        <aside class="col-lg-4 col-xl-3 side">
          <img src="/img/escudo.png" alt="Pollos Dumbo" class="brand-logo" />
          <div class="brand-title">Pollos Dumbo</div>

          <div class="d-flex flex-column gap-2 w-100" style="max-width: 320px;">
            <RouterLink to="/" class="btn btn-light text-dark w-100">Inicio</RouterLink>
            <RouterLink to="/pollo" class="btn btn-dark w-100">Ver Menú</RouterLink>
          </div>

          <div class="mt-4 text-center" style="opacity:.9;">
            <small>Atendemos de <b>15:00</b> a <b>21:00</b><br/> Llallagua</small>
          </div>
        </aside>

        <!-- Formulario -->
        <section class="col-lg-8 col-xl-9 form-wrap">
          <div class="card">
            <div class="card-header">Pedido de Pollos Dumbo</div>
            <div class="card-body">
              <form id="pedidoForm" @submit.prevent="enviarPedido">
                <!-- Datos personales -->
                <div class="mb-3">
                  <label for="nombre" class="form-label">Nombre completo</label>
                  <input type="text" class="form-control" id="nombre" v-model="form.nombre" required />
                </div>

                <div class="mb-3">
                  <label for="direccion" class="form-label">Dirección</label>
                  <input type="text" class="form-control" id="direccion" v-model="form.direccion" required />
                </div>

                <div class="mb-3">
                  <label for="telefono" class="form-label">Teléfono</label>
                  <input type="tel" class="form-control" id="telefono" v-model="form.telefono" />
                </div>

                <!-- Producto -->
                <div class="mb-3">
                  <label for="productos" class="form-label">Producto</label>
                  <select class="form-select" id="productos" v-model="form.producto" @change="calcularTotal" required>
                    <option value="">Seleccione...</option>
                    <option value="entero">Pollo Entero</option>
                    <option value="broaster">Pollo Broaster</option>
                    <option value="frito">Pollo Frito Tradicional</option>
                  </select>
                </div>

                <!-- Porción -->
                <div class="mb-3">
                  <label for="porciones" class="form-label">Porción</label>
                  <select class="form-select" id="porciones" v-model="form.porcion" @change="calcularTotal">
                    <option value="">Ninguna</option>
                    <option value="arroz">Arroz</option>
                    <option value="papa">Papa frita</option>
                    <option value="fideo">Fideo</option>
                    <option value="salsa">Salsa</option>
                  </select>
                </div>

                <!-- Refresco -->
                <div class="mb-3">
                  <label for="refrescos" class="form-label">Refresco</label>
                  <select class="form-select" id="refrescos" v-model="form.refresco" @change="toggleGaseosaBox">
                    <option value="">Ninguno</option>
                    <option value="maracuya">Refresco de maracuyá</option>
                    <option value="limonada">Limonada</option>
                    <option value="gaseosa">Gaseosa (elige marca y tamaño)</option>
                  </select>
                </div>

                <!-- Submenú de gaseosas -->
                <div id="gaseosaBox" class="row g-2" v-show="form.refresco==='gaseosa'">
                  <div class="col-sm-6">
                    <label for="gaseosaMarca" class="form-label">Marca</label>
                    <select id="gaseosaMarca" class="form-select" v-model="form.gaseosaMarca" @change="calcularTotal">
                      <option value="coca">Coca-Cola</option>
                      <option value="fanta">Fanta</option>
                      <option value="sprite">Sprite</option>
                    </select>
                  </div>
                  <div class="col-sm-6">
                    <label for="gaseosaTam" class="form-label">Tamaño</label>
                    <select id="gaseosaTam" class="form-select" v-model="form.gaseosaTam" @change="calcularTotal">
                      <option value="mini">Mini (2.50)</option>
                      <option value="popular">Popular (8.00)</option>
                      <option value="mediana">Mediana (18.00)</option>
                    </select>
                  </div>
                </div>

                <!-- Método de pago -->
                <div class="mb-3">
                  <label class="form-label">Método de pago</label>
                  <div class="list-group">
                    <label class="list-group-item">
                      <input class="form-check-input me-2" type="radio" value="caja" v-model="form.pago" />
                      Pagar en caja (efectivo)
                    </label>
                    <label class="list-group-item">
                      <input class="form-check-input me-2" type="radio" value="qr" v-model="form.pago" />
                      QR (Billetera/APP)
                    </label>
                  </div>
                </div>

                <!-- Panel QR (ahora sí se ve) -->
                <div id="pagoQrBox" class="subpanel" v-show="form.pago==='qr'">
                  <strong>Pago por QR</strong>
                  <p class="mb-2">Escanea este código para pagar y coloca la referencia si deseas.</p>

                  <img src="/img/QR.jpg" alt="QR de pago Banco Unión" class="qr-img">


                  <!-- Botón para abrir el QR en otra pestaña -->
                  <a href="/img/QR.jpg" target="_blank" class="btn btn-outline-secondary btn-sm mt-2">
                    Abrir QR en otra pestaña
                  </a>

                  <label for="qrRef" class="form-label mt-2">Referencia (opcional)</label>
                  <input type="text" id="qrRef" class="form-control" v-model="form.qrRef" placeholder="Ej: Pedido Juan 19:30">
                </div>

                <!-- Total -->
                <div class="total-box">
                  <span>Total estimado</span>
                  <span>{{ totalBs }}</span>
                </div>

                <!-- Acciones -->
                <div class="mb-2 d-grid gap-2">
                  <button type="submit" class="btn btn-primary btn-lg" style="background: var(--accent); border:none;">
                    Realizar pedido
                  </button>
                  <button type="button" id="btnWhats" class="btn btn-success btn-lg" @click="enviarWhatsApp">
                    Enviar por WhatsApp
                  </button>
                </div>

                <p class="text-muted mb-0" style="font-size:12px;">
                  *El total puede variar por disponibilidad o cambios menores.
                </p>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import CATALOGO from "@/data/catalogo";

export default {
  name: "PedidoView",
  data() {
    return {
      horario: { open: "15:00", close: "21:00" },
      nowMins: this.getNowMins(),
      form: {
        nombre: "",
        direccion: "",
        telefono: "",
        producto: "",
        porcion: "",
        refresco: "",
        gaseosaMarca: "coca",
        gaseosaTam: "mini",
        pago: "caja",
        qrRef: ""
      },
      total: 0
    };
  },
  computed: {
    abierto() {
      const toMin = (s) => { const [h,m]=s.split(":").map(Number); return h*60+m; };
      return this.nowMins >= toMin(this.horario.open) && this.nowMins <= toMin(this.horario.close);
    },
    totalBs() {
      return `Bs ${this.total.toFixed(2)}`;
    }
  },
  mounted() {
    // Leer parámetros de la URL para autoseleccionar
    const q = this.$route.query;
    if (q.producto) this.form.producto = q.producto;
    if (q.porcion) this.form.porcion = q.porcion;
    if (q.refresco) this.form.refresco = q.refresco;
    if (q.gaseosaMarca) this.form.gaseosaMarca = q.gaseosaMarca;
    if (q.gaseosaTam) this.form.gaseosaTam = q.gaseosaTam;

    this.calcularTotal();
    this.t = setInterval(() => this.nowMins = this.getNowMins(), 60000);
  },
  beforeUnmount() { clearInterval(this.t); },
  methods: {
    getNowMins(){ const n=new Date(); return n.getHours()*60+n.getMinutes(); },
    toggleGaseosaBox(){ this.calcularTotal(); },
    calcularTotal() {
      const cat = CATALOGO;
      const pProd = (cat.pollo && cat.pollo[this.form.producto]) || 0;
      const pPorc = (cat.porciones && cat.porciones[this.form.porcion]) || 0;
      let pRef = 0;
      if (this.form.refresco === "gaseosa") {
        pRef = (((cat.bebidas||{}).gaseosa||{}))[this.form.gaseosaMarca]?.[this.form.gaseosaTam] || 0;
      } else {
        pRef = (cat.bebidas && cat.bebidas[this.form.refresco]) || 0;
      }
      this.total = Number(pProd) + Number(pPorc) + Number(pRef);
    },
    enviarPedido() {
      alert("Pedido enviado (demo). También puedes usar el botón de WhatsApp para completarlo por chat.");
    },
    enviarWhatsApp() {
      const toBs = n => `Bs ${Number(n).toFixed(2)}`;
      const cat = CATALOGO;
      const pProd = (cat.pollo && cat.pollo[this.form.producto]) || 0;
      const pPorc = (cat.porciones && cat.porciones[this.form.porcion]) || 0;

      let descRef = "-", pRef = 0;
      if (this.form.refresco === "gaseosa") {
        const nombres = { coca:"Coca-Cola", fanta:"Fanta", sprite:"Sprite", mini:"Mini", popular:"Popular", mediana:"Mediana" };
        descRef = `${nombres[this.form.gaseosaMarca]} ${nombres[this.form.gaseosaTam]}`;
        pRef = (((cat.bebidas||{}).gaseosa||{}))[this.form.gaseosaMarca]?.[this.form.gaseosaTam] || 0;
      } else if (this.form.refresco) {
        const mapaRef = { maracuya:"Refresco de maracuyá", limonada:"Limonada" };
        descRef = mapaRef[this.form.refresco] || this.form.refresco;
        pRef = (cat.bebidas && cat.bebidas[this.form.refresco]) || 0;
      }

      const pagoTxt = this.form.pago === "caja" ? "Pagar en caja (efectivo)" : "QR";
      const refPago = this.form.pago==="qr" && this.form.qrRef.trim() ? `Ref QR: ${this.form.qrRef}` : "";
      const total = Number(pProd)+Number(pPorc)+Number(pRef);

      const mapaNombre = {entero:"Pollo Entero Frito", broaster:"Pollo Broaster", frito:"Pollo Frito Tradicional"};
      const mapaPorcion = {arroz:"Arroz", papa:"Papa frita", fideo:"Fideo", salsa:"Salsa"};

      const lineas = [
        `*Pedido – Llallagua*`,
        `Cliente: ${this.form.nombre}`,
        `Dirección: ${this.form.direccion}`,
        `Tel: ${this.form.telefono}`,
        `Producto: ${mapaNombre[this.form.producto] || '-'} (${toBs(pProd)})`,
        `Porción: ${mapaPorcion[this.form.porcion] || '-'} (${toBs(pPorc)})`,
        `Bebida: ${descRef} (${toBs(pRef)})`,
        `Método de pago: *${pagoTxt}*`,
        ...(refPago ? [refPago] : []),
        `Total: *${toBs(total)}*`
      ];

      const numeroTuNegocio = "59174148930"; // cámbialo por el tuyo
      window.open(`https://wa.me/${numeroTuNegocio}?text=${encodeURI(lineas.join("\n"))}`, "_blank");
    }
  }
};
</script>

<style>
/* Fuerza a mostrarse el panel QR aunque un CSS global lo oculte */
.subpanel { display: block !important; }
</style>
