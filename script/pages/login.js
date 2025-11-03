// script/pages/login.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
import { getDashboardPanels } from "./dashboard.js";

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

function renderDashboard(user) {
  // Renderizamos un encabezado (head) con la info de login y un contenedor para los paneles
  app.innerHTML = `
    <nav>
      <!-- Barra de navegación página -->
      <label class="logo">Bienvenido, ${user.email}</label>
      <ul>
          <li><a href="#" id="btnLogout" class="btn btn-danger">Salir</a></li>
      </ul>
    </nav>

    <main id="dashboardContent" class="dashboard-main">
      <!-- Los paneles se insertarán aquí -->
    </main>
  `;

  // Quitar la clase de centrado al mostrar el dashboard
  document.body.classList.remove('auth-page');

  // Insertar los paneles de dashboard desde el módulo
  const dashContainer = document.getElementById('dashboardContent');
  if (dashContainer) dashContainer.innerHTML = getDashboardPanels(user);

  // Registrar eventos
  document.getElementById("btnLogout").addEventListener("click", logoutUser);
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
