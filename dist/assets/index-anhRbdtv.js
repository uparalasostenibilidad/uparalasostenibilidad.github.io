import{createClient as u}from"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(e){if(e.ep)return;e.ep=!0;const i=r(e);fetch(e.href,i)}})();const m="https://hkxugotjfkyalmlkojhq.supabase.co",p="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhreHVnb3RqZmt5YWxtbGtvamhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxODk3MTAsImV4cCI6MjA3Nzc2NTcxMH0.mV21rbO4K5gfmYWF_ZB5mcjPG2TLu80w0SOMBCoDkaE",o=u(m,p),c=document.getElementById("app");function l(){c.innerHTML=`
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
  `,document.getElementById("loginForm").addEventListener("submit",g),document.getElementById("signupLink").addEventListener("click",b),document.getElementById("btnRegister").addEventListener("click",f)}function d(t){c.innerHTML=`
    <section class="card dashboard">
      <h2>Bienvenido, ${t.email} 👋</h2>
      <p>Panel principal de seguimiento ISO 14001</p>
      <div style="margin-top:20px;">
        <button id="btnLogout" class="btn btn-danger">Salir</button>
      </div>
    </section>
  `,document.getElementById("btnLogout").addEventListener("click",y)}async function g(t){t.preventDefault();const n=document.getElementById("email").value.trim(),r=document.getElementById("password").value.trim(),{data:s,error:e}=await o.auth.signInWithPassword({email:n,password:r});if(e)return alert("❌ "+e.message);d(s.user)}async function f(){const t=document.getElementById("regEmail").value.trim(),n=document.getElementById("regPass").value.trim(),{error:r}=await o.auth.signUp({email:t,password:n});if(r)return alert("❌ "+r.message);alert("✅ Cuenta creada. Revisa tu correo para confirmar.")}async function y(){await o.auth.signOut(),l()}function b(t){t.preventDefault();const n=document.getElementById("register");n.style.display=n.style.display==="none"?"block":"none"}window.onload=async()=>{const{data:{session:t}}=await o.auth.getSession();t?d(t.user):l()};
