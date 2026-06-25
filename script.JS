// 1. MODE SOMBRE
const btnTheme = document.getElementById('btn-theme');
function appliquerTheme(theme){
  document.body.classList.toggle('dark', theme==='dark');
  btnTheme.textContent = theme==='dark' ? '☀️' : '🌙';
  localStorage.setItem('theme', theme);
}
const themeSauvegarde = localStorage.getItem('theme') || 'light';
appliquerTheme(themeSauvegarde);
btnTheme.addEventListener('click', ()=>{
  const nouveau = document.body.classList.contains('dark') ? 'light' : 'dark';
  appliquerTheme(nouveau);
});

// 2. MENU HAMBURGER
const btnHamburger = document.getElementById('btn-hamburger');
const navMenu = document.getElementById('nav-menu');
btnHamburger.addEventListener('click', ()=> navMenu.classList.toggle('ouvert'));
navMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>navMenu.classList.remove('ouvert')));

// 3. ANIMATION BARRES
const barres = document.querySelectorAll('.barre');
const obs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.style.width = e.target.dataset.largeur + '%';
      obs.unobserve(e.target);
    }
  });
},{threshold:0.3});
barres.forEach(b=>obs.observe(b));

// 4. FORMULAIRE
const form = document.getElementById('form-contact');
if(form){
  form.addEventListener('submit', e=>{
    e.preventDefault();
    let ok=true;
    const nom=document.getElementById('nom');
    const email=document.getElementById('email');
    const msg=document.getElementById('message');
    
    document.getElementById('erreur-nom').textContent = !nom.value.trim() ? 'Champ requis' : '';
    document.getElementById('erreur-email').textContent = !email.value.includes('@') ? 'Email invalide' : '';
    document.getElementById('erreur-message').textContent = msg.value.trim().length<10 ? '10 caractères min' : '';
    
    if(!nom.value.trim()||!email.value.includes('@')||msg.value.trim().length<10) return;
    
    document.getElementById('form-succes').textContent='Message envoyé avec succes !';
    form.reset();
    setTimeout(()=>document.getElementById('form-succes').textContent='',4000);
  });
}

// 5. BOUTON TOP + ANNÉE
const btnTop = document.getElementById('btn-top');
window.addEventListener('scroll', ()=>btnTop.classList.toggle('visible', window.scrollY>300));
btnTop.addEventListener('click', ()=>window.scrollTo({top:0,behavior:'smooth'}));
document.getElementById('annee').textContent=new Date().getFullYear();