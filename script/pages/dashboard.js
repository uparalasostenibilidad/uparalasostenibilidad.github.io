// script/pages/dashboard.js
// Módulo sencillo que exporta una función para obtener los paneles del dashboard

export function getDashboardPanels(user) {
  // Por ahora devolvemos dos paneles de ejemplo. Más adelante se pueden poblar con datos reales.
  return `
    <div class="cards">
      <section class="card">
        <img class="card-img" src="assets/sample-1.png" alt="Panel 1" />
        <div class="card-body">
          <h1 class="card-title">Panel 1</h1>
          <p class="card-sub">Resumen rápido: datos de ejemplo para ${user?.email || 'usuario'}.</p>
        </div>
      </section>

      <section class="card">
        <img class="card-img" src="assets/sample-2.png" alt="Panel 2" />
        <div class="card-body">
          <h1 class="card-title">Panel 2</h1>
          <p class="card-sub">Texto de ejemplo para mostrar la estructura del dashboard.</p>
        </div>
      </section>
    </div>
  `;
}
