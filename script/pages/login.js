// script/pages/login.js
import { renderDashboard as renderDashboardModule, renderQuestionResponder, renderProgressByPredio } from "./dashboard.js";
import { supabase } from "../../src/supabaseClient.js";

console.log('[login.js] cargado');

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
  // Render header + contenedor
  app.innerHTML = `
    <nav>
      <label class="logo">Bienvenido, ${user.email}</label>
      <ul>
          <li><a href="#" id="btnLogout" class="btn btn-danger">Salir</a></li>
      </ul>
    </nav>
    <main id="dashboardContent" class="dashboard-main"></main>
  `;

  document.body.classList.remove('auth-page');

  // Registrar evento de logout
  const logoutEl = document.getElementById("btnLogout");
  if(logoutEl) logoutEl.addEventListener("click", logoutUser);

  // Delegar renderizado del contenido al módulo dashboard: primero el formulario, luego la tabla
  try{
    // Preparar dos contenedores dentro de dashboardContent: primero el form, luego la tabla
    const dashContent = document.getElementById('dashboardContent');
    if(dashContent){
      dashContent.innerHTML = `<div id="app-question"></div><div id="app-respuestas" style="margin-top:16px"></div><div id="app-progress" style="margin-top:18px"></div>`;
      console.log('[login.js] renderizando form de preguntas (primero)...');
      await renderQuestionResponder('#app-question');
      console.log('[login.js] renderizando tabla de respuestas (después)...');
      await renderDashboardModule('#app-respuestas');
      console.log('[login.js] renderizando tablero de progreso por predio (último)...');
      await renderProgressByPredio('#app-progress');
    } else {
      // fallback: si no existe dashboardContent, renderizar normalmente en él
      console.log('[login.js] dashboardContent no encontrado, renderizando en #dashboardContent');
      await renderDashboardModule('#dashboardContent');
      let qroot = document.getElementById('app-question');
      if(!qroot){ qroot = document.createElement('div'); qroot.id = 'app-question'; document.getElementById('dashboardContent').appendChild(qroot); }
      await renderQuestionResponder('#app-question');
    }
  }catch(err){
    console.error('Error renderizando dashboard:', err);
  }
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
  if (session) renderDashboard(session.user);
  else renderLogin();
};
