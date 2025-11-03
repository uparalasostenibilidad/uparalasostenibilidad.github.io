import{createClient as u}from"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(e){if(e.ep)return;e.ep=!0;const n=r(e);fetch(e.href,n)}})();const p="https://dokiun-OGA-ISO.supabase.co",m="TU_ANON_KEY_AQUI",s=u(p,m),d=document.getElementById("app");function c(){d.innerHTML=`
    <section class="login-container">
      <h2>Login Form</h2>
      <form id="loginForm">
        <div class="input-box">
          <i>👤</i>
          <input type="email" id="email" placeholder="Email" required />
        </div>
        <div class="input-box">
          <i>🔒</i>
          <input type="password" id="password" placeholder="Password" required />
        </div>
        <small><a href="#">¿Olvidaste tu contraseña?</a></small>
        <button type="submit" class="btn">Login</button>
      </form>

      <p>¿No tienes cuenta? <a href="#" id="signupLink">Regístrate</a></p>

      <div id="register" style="display:none; margin-top:20px;">
        <h3 style="color:#0b5345">Crear cuenta</h3>
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
  `,document.getElementById("loginForm").addEventListener("submit",g),document.getElementById("signupLink").addEventListener("click",b),document.getElementById("btnRegister").addEventListener("click",f)}function l(t){d.innerHTML=`
    <section class="card dashboard">
      <h2>Bienvenido, ${t.email} 👋</h2>
      <p>Panel principal de seguimiento ISO 14001</p>
      <div style="margin-top:20px;">
        <button id="btnLogout" class="btn btn-danger">Salir</button>
      </div>
    </section>
  `,document.getElementById("btnLogout").addEventListener("click",y)}async function g(t){t.preventDefault();const i=document.getElementById("email").value.trim(),r=document.getElementById("password").value.trim(),{data:o,error:e}=await s.auth.signInWithPassword({email:i,password:r});if(e)return alert("❌ "+e.message);l(o.user)}async function f(){const t=document.getElementById("regEmail").value.trim(),i=document.getElementById("regPass").value.trim(),{error:r}=await s.auth.signUp({email:t,password:i});if(r)return alert("❌ "+r.message);alert("✅ Cuenta creada. Revisa tu correo para confirmar.")}async function y(){await s.auth.signOut(),c()}function b(t){t.preventDefault();const i=document.getElementById("register");i.style.display=i.style.display==="none"?"block":"none"}window.onload=async()=>{const{data:{session:t}}=await s.auth.getSession();t?l(t.user):c()};
