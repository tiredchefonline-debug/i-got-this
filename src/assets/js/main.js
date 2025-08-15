// Year
const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
// Mobile menu
const btn = document.querySelector('.nav-toggle'); const nav = document.getElementById('nav');
if (btn && nav){ btn.addEventListener('click',()=>{const open = btn.getAttribute('aria-expanded')==='true';btn.setAttribute('aria-expanded',String(!open));nav.style.display=open?'none':'flex';});}
// Netlify form success UX
document.addEventListener('submit', (e)=>{ if(e.target.matches('form[data-netlify="true"]')){ setTimeout(()=>alert('Thanks! We will reply soon.'), 10); } });
