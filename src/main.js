import { supabase } from './supabaseClient'
import { renderDashboard } from '/script/pages/dashboard.js'

// Element refs (login UI in index.html)
const loginBtn = document.getElementById('loginBtn')
const logoutBtn = document.getElementById('logoutBtn')
const demoUser = document.getElementById('demoUser')
const demoPwd = document.getElementById('demoPwd')
const authStatus = document.getElementById('authStatus') || document.createElement('div')
if (!authStatus.id) authStatus.id = 'authStatus'

function setStatus(text){
  authStatus.textContent = text
  authStatus.style.color = 'var(--color-muted)'
}

// Sign in with email/password
async function signIn(){
  const email = demoUser.value.trim()
  const password = demoPwd.value
  if(!email || !password){ alert('Ingrese correo y contraseña'); return }
  setStatus('Intentando iniciar sesión...')
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if(error){
    setStatus('Error: ' + error.message)
    console.error(error)
    return
  }
  setStatus('Conectado como ' + (data.user?.email || 'usuario'))
}

async function signOut(){
  const { error } = await supabase.auth.signOut()
  if(error){ setStatus('Error al cerrar sesión: ' + error.message); return }
  setStatus('Sesión cerrada')
}

// Update UI on auth change
supabase.auth.onAuthStateChange((event, session) => {
  if(session && session.user){
    setStatus('Autenticado: ' + (session.user.email || session.user?.id))
    if(loginBtn) loginBtn.disabled = true
    if(logoutBtn) logoutBtn.disabled = false
    // Renderizar el dashboard cuando el usuario se autentica
    try{ renderDashboard('#app').catch(err=>console.error(err)); }catch(e){ console.error('No se pudo renderizar dashboard', e) }
  } else {
    setStatus('No autenticado')
    if(loginBtn) loginBtn.disabled = false
    if(logoutBtn) logoutBtn.disabled = true
    // Limpiar contenido de la app al cerrar sesión
    const app = document.getElementById('app')
    if(app) app.innerHTML = ''
  }
})

// Init check
;(async ()=>{
  const { data } = await supabase.auth.getSession()
  if(data?.session?.user) {
    setStatus('Autenticado: ' + (data.session.user.email || data.session.user.id))
    // Si ya hay sesión activa al iniciar, renderizamos el dashboard
    try{ await renderDashboard('#app') }catch(e){ console.error(e) }
  }
  else setStatus('No autenticado')
})()

if(loginBtn) loginBtn.addEventListener('click', (e)=>{ e.preventDefault(); signIn() })
if(logoutBtn) logoutBtn.addEventListener('click', (e)=>{ e.preventDefault(); signOut() })

// Expose for debugging
window.supabase = supabase
