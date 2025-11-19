// script/pages/login.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
import { renderDashboard as renderDashboardModule, renderQuestionResponder, renderProgressByPredio } from "./dashboard.js";

console.log('[login.js] cargado');

const SUPABASE_URL = "https://hkxugotjfkyalmlkojhq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhreHVnb3RqZmt5YWxtbGtvamhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxODk3MTAsImV4cCI6MjA3Nzc2NTcxMH0.mV21rbO4K5gfmYWF_ZB5mcjPG2TLu80w0SOMBCoDkaE";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const app = document.getElementById("app");

// ============================
// Render de vistas dinámicas
// ============================

function renderLogin() {
app.innerHTML = `
    <section class="login-container">
        <h2>Iniciar sesión</h2>
        <form id="loginForm">
            <div class="input-box">
                <i>👤</i>
                <input type="email" id="email" placeholder="Correo electrónico" required />
            </div>
            <div class="input-box">
                <i>🔒</i>
                <input type="password" id="password" placeholder="Contraseña" required />
            </div>
            <button type="submit" class="btn">Entrar</button>
        </form>

        <p style="margin:16px 0;"></p>  
        <p>¿No tienes cuenta? <a href="#" id="signupLink">Regístrate</a></p>

        <div id="register" style="display:none; margin-top:20px;">
            <h2>Crear cuenta</h2>
            <div class="input-box">
                <i>👤</i>
                <input type="email" id="regEmail" placeholder="Correo electrónico" />
            </div>
            <div class="input-box">
                <i>🔒</i>
                <input type="password" id="regPass" placeholder="Contraseña" />
            </div>
            <button id="btnRegister" class="btn">Registrar</button>
        </div>
    </section>
`;
  // Asegurar que el body tenga la clase para centrar el login
  document.body.classList.add('auth-page');

  // Eventos del login
  document.getElementById("loginForm").addEventListener("submit", loginUser);
  document.getElementById("signupLink").addEventListener("click", toggleRegister);
  document.getElementById("btnRegister").addEventListener("click", registerUser);
}

async function renderDashboard(user){
  // Render header con pestañas + contenedor principal
  app.innerHTML = `
    <nav>
      <label class="logo">Bienvenido, ${user?.email || 'Invitado'}</label>
      <ul>
          <li><a href="#" id="tabAvance">Dashboard</a></li>
          <li><a href="#" id="tabResponder">Calificar</a></li>
          <li><a href="#" id="tabRespuestas">Respuestas</a></li>
          ${user ? `<li><a href="#" id="btnLogout" class="btn btn-danger">Salir</a></li>` : `<li><a href="#" id="btnLogin" class="btn">Entrar</a></li>`}
      </ul>
    </nav>
    <main id="dashboardContent" class="dashboard-main"></main>
  `;

  document.body.classList.remove('auth-page');

  // Registrar evento de logout/login
  const logoutEl = document.getElementById("btnLogout");
  if(logoutEl) logoutEl.addEventListener("click", logoutUser);
  const loginEl = document.getElementById("btnLogin");
  if(loginEl) loginEl.addEventListener("click", (e)=>{ e.preventDefault(); renderLogin(); });

  // Enrutado simple por pestañas
  const dashContent = document.getElementById('dashboardContent');
  const tabResponder = document.getElementById('tabResponder');
  const tabAvance = document.getElementById('tabAvance');
  const tabRespuestas = document.getElementById('tabRespuestas');

  function setActive(tab){
    [tabResponder, tabAvance, tabRespuestas].forEach(a => a && a.classList.remove('active'));
    if(tab) tab.classList.add('active');
  }

  async function loadView(view){
    if(!dashContent) return;
    dashContent.innerHTML = '';
    try{
      if(view === 'responder'){
        const { data: { session } } = await supabase.auth.getSession();
        if(!session || !session.user){
          dashContent.innerHTML = `
            <div class="card">
              <h3>Inicia sesión para calificar</h3>
              <p class="small">Para responder preguntas necesitas una cuenta activa.</p>
              <button id="goLogin1" class="btn">Entrar</button>
            </div>`;
          const btn = document.getElementById('goLogin1');
          btn?.addEventListener('click', ()=> renderLogin());
          return;
        }
        await renderQuestionResponder('#dashboardContent');
      } else if(view === 'avance'){
        await renderProgressByPredio('#dashboardContent');
      } else if(view === 'respuestas'){
        const { data: { session } } = await supabase.auth.getSession();
        if(!session || !session.user){
          dashContent.innerHTML = `
            <div class="card">
              <h3>Inicia sesión para ver respuestas</h3>
              <p class="small">El listado de respuestas requiere autenticación.</p>
              <button id="goLogin2" class="btn">Entrar</button>
            </div>`;
          const btn = document.getElementById('goLogin2');
          btn?.addEventListener('click', ()=> renderLogin());
          return;
        }
        await renderDashboardModule('#dashboardContent');
      }
    }catch(err){ console.error('Error cargando vista', view, err); }
  }

  // Eventos de pestañas
  tabResponder?.addEventListener('click', async (e)=>{ e.preventDefault(); setActive(tabResponder); await loadView('responder'); });
  tabAvance?.addEventListener('click', async (e)=>{ e.preventDefault(); setActive(tabAvance); await loadView('avance'); });
  tabRespuestas?.addEventListener('click', async (e)=>{ e.preventDefault(); setActive(tabRespuestas); await loadView('respuestas'); });

  // Vista por defecto: Avance por predio
  setActive(tabAvance);
  await loadView('avance');
}

// ============================
// Autenticación Supabase
// ============================

async function loginUser(e) {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return alert("❌ " + error.message);
  renderDashboard(data.user);
}

async function registerUser() {
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPass").value.trim();

  const { error } = await supabase.auth.signUp({ email, password });
  if (error) return alert("❌ " + error.message);
  alert("✅ Cuenta creada. Revisa tu correo para confirmar.");
}

async function logoutUser(e) {
  // Si se llama desde un evento de click en un enlace, prevenir navegación
  if (e && typeof e.preventDefault === 'function') e.preventDefault();
  await supabase.auth.signOut();
  renderLogin();
}

// ============================
// Utilidades
// ============================

function toggleRegister(e) {
  e.preventDefault();
  const regBox = document.getElementById("register");
  regBox.style.display = regBox.style.display === "none" ? "block" : "none";
}

// ============================
// Inicialización
// ============================

window.onload = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  // Siempre mostrar el dashboard (vista de avance) como landing, incluso sin sesión
  await renderDashboard(session?.user || null);
};
