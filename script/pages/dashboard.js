// script/pages/dashboard.js
// Módulo sencillo que exporta una función para obtener los paneles del dashboard

export function getDashboardPanels(user) {
  // Evitar optional chaining para compatibilidad
  const email = (user && user.email) ? user.email : 'usuario';
  // Simple fragmento HTML: dos paneles de ejemplo usando las clases ya presentes en style.css
  return `
    <div style="display:flex;flex-direction:column;gap:18px;">
      <!-- Row: KPIs -->
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <div class="card" style="flex:1;min-width:160px;min-height:300px;padding:12px;">
          <div class="card-body">
            <h1 class="card-title">Predios evaluados</h1>
            <p class="card-sub" style="font-size:1.2rem;">32</p>
            <p class="muted">Total de predios con evaluación reciente</p>
          </div>
        </div>
        <div class="card" style="flex:1;min-width:160px;min-height:300px;padding:12px;">
          <div class="card-body">
            <h1 class="card-title">Cumplimiento medio</h1>
            <p class="card-sub" style="font-size:1.2rem;">78%</p>
            <p class="muted">Media ponderada de cumplimiento</p>
          </div>
        </div>
        <div class="card" style="flex:1;min-width:160px;min-height:300px;padding:12px;">
          <div class="card-body">
            <h1 class="card-title">Alertas abiertas</h1>
            <p class="card-sub" style="font-size:1.2rem;color:var(--primary-red);">6</p>
            <p class="muted">Alertas importantes sin resolver</p>
          </div>
        </div>
        <div class="card" style="flex:1;min-width:160px;min-height:300px;padding:12px;">
          <div class="card-body">
            <h1 class="card-title">Última actualización</h1>
            <p class="card-sub" style="font-size:1.0rem;">${new Date().toLocaleDateString()}</p>
            <p class="muted">Fecha de los datos mostrados</p>
          </div>
        </div>
      </div>

      <!-- Row: principales gráficos (placeholders) -->
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <div class="card" style="flex:2;min-width:260px;">
          <div class="card-body">
            <h1 class="card-title">Tendencia de cumplimiento</h1>
            <div style="min-width:160px;min-height:300pxdisplay:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.02);border-radius:8px">[Gráfico de líneas placeholder]</div>
            <p class="muted">Evolución trimestral del cumplimiento</p>
          </div>
        </div>
        <div class="card" style="flex:1;min-width:220px;">
          <div class="card-body">
            <h1 class="card-title">Distribución por tipo</h1>
            <div style="min-width:160px;min-height:300pxdisplay:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.02);border-radius:8px">[Pie chart placeholder]</div>
            <p class="muted">Porcentajes de alertas por categoría</p>
          </div>
        </div>
      </div>

      <!-- Row: tabla de items recientes y lista de alertas -->
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <div class="card" style="flex:2;min-width:160px;min-height:300px;">
          <div class="card-body">
            <h1 class="card-title">Actividades recientes</h1>
            <table style="width:100%;border-collapse:collapse;color:var(--white);">
              <thead>
                <tr style="text-align:left;font-weight:600;color:var(--primary-pink)">
                  <th style="padding:6px">Actividad</th>
                  <th style="padding:6px">Responsable</th>
                  <th style="padding:6px">Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style="padding:6px">Auditoría interna</td><td style="padding:6px">L. García</td><td style="padding:6px">En progreso</td></tr>
                <tr><td style="padding:6px">Actualización documentos</td><td style="padding:6px">M. Rojas</td><td style="padding:6px">Pendiente</td></tr>
                <tr><td style="padding:6px">Capacitación residuos</td><td style="padding:6px">N. Gómez</td><td style="padding:6px">Completo</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="card" style="flex:1;min-width:220px;min-height:300px;">
          <div class="card-body">
            <h1 class="card-title">Alertas recientes</h1>
            <ul style="margin:0;padding-left:16px">
              <li><strong style="color:var(--primary-red)">Documental</strong> — Matriz no actualizada en Ciudad Universitaria</li>
              <li><strong style="color:var(--primary-red)">Operativa</strong> — Falta control de residuos en Hospital Universitario</li>
              <li><strong style="color:var(--primary-orange)">Emergencias</strong> — Simulacro no registrado en Campus Santa Rosa</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Row: acciones rápidas -->
      <div style="display:flex;gap:8px;justify-content:flex-end;">
        <button class="btn secondary" style="background:transparent;color:var(--primary-pink);border:1px solid rgba(255,255,255,0.08)">Exportar CSV</button>
        <button class="btn" style="background:var(--primary-violet)">Crear nuevo reporte</button>
      </div>
    </div>
  `;
}
