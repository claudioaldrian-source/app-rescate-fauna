/* ============================================================
   «NOS ACOMPAÑAN» · App de rescate (la que usan las personas)
   (Se llama acompanan.js y no "publicidades": los bloqueadores de anuncios
    esconden todo lo que tenga la palabra "publicidad" en el nombre.)
   © 2026 Macla-IA · Claudio Aldrian
   Muestra hasta 3 casilleros que se cargan desde el panel → Publicidades → «App de rescate».
   Si hay menos de 3 cargados, los lugares libres muestran «Tu negocio acá».
   Colores: paleta Humedal.
   USO: en index.html poné  <div id="acompanan"></div>  donde quieras los casilleros
        y antes de </body>:  <script src="acompanan.js"></script>
   ============================================================ */
(function(){
  const URL_BASE='https://iilefvoxigwozzbzgdzb.supabase.co';
  const KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpbGVmdm94aWd3b3p6YnpnZHpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MzE4MTAsImV4cCI6MjA3ODIwNzgxMH0.NK5fR9dsYMlweLAICf4ZWIUVcusho1z3kW0AAfzXwqc';
  const CACHE='rescate-acompanan';
  const CASILLEROS=3;
  const WHATSAPP='https://wa.me/5493482530384?text='+encodeURIComponent('Hola, quiero aparecer en la app Reporte Fauna Santa Fe');
  const esc=t=>String(t==null?'':t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const iniciales=n=>String(n||'?').trim().split(/\s+/).slice(0,2).map(p=>p[0]).join('').toUpperCase();

  const css=`
  .pubr{margin:14px 0 4px;display:grid;gap:8px}
  .pubr-t{text-align:center;font-size:13px;font-weight:800;color:#174652;letter-spacing:.2px}
  .pubr-fila{display:grid;grid-template-columns:repeat(${CASILLEROS},minmax(0,1fr));gap:8px}
  .pubr-c{display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:6px;text-align:center;background:#fff;border:2px solid #D6D0C2;border-radius:14px;padding:10px 6px;cursor:pointer;font:inherit;color:#11262B;min-height:118px;box-shadow:0 2px 8px rgba(15,59,71,.08);transition:border-color .2s,transform .1s;text-decoration:none}
  .pubr-c:hover{border-color:#1E5B6B}
  .pubr-c:active{transform:scale(.97)}
  .pubr-c:focus-visible{outline:3px solid #1E5B6B;outline-offset:2px}
  .pubr-logo{width:52px;height:52px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:#EDE6D6;color:#0F3B47;font-weight:900;font-size:18px;overflow:hidden;flex-shrink:0}
  .pubr-logo img{width:100%;height:100%;object-fit:contain}
  .pubr-c b{display:block;font-size:13px;line-height:1.2;overflow-wrap:anywhere}
  .pubr-c small{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;font-size:11px;line-height:1.25;color:#4A5A5E}
  .pubr-c.libre{border-style:dashed;border-color:#9FB7BC;background:#F6F2E8;color:#174652}
  .pubr-c.libre .pubr-logo{background:#fff;border:2px dashed #9FB7BC;font-size:26px;font-weight:700}
  .pubr-m{position:fixed;inset:0;z-index:99999;background:rgba(8,37,45,.65);display:flex;align-items:center;justify-content:center;padding:16px}
  .pubr-m[hidden]{display:none}
  .pubr-mc{position:relative;background:#fff;border-radius:18px;max-width:440px;width:100%;max-height:100%;overflow-y:auto;padding:26px 20px 16px;text-align:center;display:grid;gap:12px;color:#11262B}
  .pubr-mc .pubr-logo{width:150px;height:150px;justify-self:center;border-radius:16px;font-size:44px}
  .pubr-mc h3{margin:0;font-size:20px;color:#0F3B47}
  .pubr-mc p{margin:0;font-size:16px;line-height:1.5}
  .pubr-link{display:inline-block;justify-self:center;background:#0F3B47;color:#F2E8CF;text-decoration:none;font-weight:800;padding:12px 20px;border-radius:12px}
  .pubr-link[hidden]{display:none}
  .pubr-x{position:absolute;top:8px;right:8px;width:40px;height:40px;border-radius:50%;border:none;background:#EDE6D6;color:#0F3B47;font-size:18px;cursor:pointer}
  .pubr-v{background:none;border:none;color:#174652;text-decoration:underline;font:inherit;cursor:pointer;padding:6px}
  @media (max-width:340px){.pubr-fila{gap:6px}.pubr-logo{width:44px;height:44px}}`;
  const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

  // Logo con respaldo: si la imagen falta o no carga, muestra las iniciales
  function logoHTML(s){
    const ini=esc(iniciales(s.nombre));
    if(!s.logo_url) return `<span class="pubr-logo">${ini}</span>`;
    return `<span class="pubr-logo" data-ini="${ini}"><img src="${esc(s.logo_url)}" alt="" loading="lazy"></span>`;
  }
  function activarRespaldo(raiz){
    raiz.querySelectorAll('.pubr-logo img').forEach(img=>{
      const caer=()=>{const c=img.parentElement;if(c)c.textContent=c.dataset.ini||'?';};
      if(img.complete&&!img.naturalWidth) caer(); else img.addEventListener('error',caer,{once:true});
    });
  }

  const modal=document.createElement('div');modal.className='pubr-m';modal.hidden=true;
  modal.innerHTML='<div class="pubr-mc" role="dialog" aria-modal="true"><button class="pubr-x" aria-label="Cerrar">✕</button><div class="pubr-logo-m"></div><h3></h3><p></p><a class="pubr-link" target="_blank" rel="noopener"></a><button class="pubr-v">Volver</button></div>';
  document.body.appendChild(modal);
  const cerrar=()=>{modal.hidden=true;};
  modal.querySelector('.pubr-x').onclick=cerrar;modal.querySelector('.pubr-v').onclick=cerrar;
  modal.addEventListener('click',e=>{if(e.target===modal)cerrar();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')cerrar();});

  function abrir(s){
    const zona=modal.querySelector('.pubr-logo-m');
    zona.innerHTML=logoHTML(s);activarRespaldo(zona);
    modal.querySelector('h3').textContent=s.titulo||s.nombre||'';
    modal.querySelector('p').textContent=s.texto||'';
    const a=modal.querySelector('.pubr-link'),ok=/^https?:\/\//i.test(s.link||'');
    a.hidden=!ok;if(ok){a.href=s.link;a.textContent=s.link_texto||'Visitar';}
    modal.hidden=false;
  }

  function pintar(lista){
    const cont=document.getElementById('acompanan');if(!cont)return;
    lista=Array.isArray(lista)?lista.slice(0,CASILLEROS):[];
    const libres=CASILLEROS-lista.length;

    const cards=lista.map((s,i)=>
      `<button type="button" class="pubr-c" data-i="${i}">${logoHTML(s)}<b>${esc(s.nombre)}</b>${s.frase?`<small>${esc(s.frase)}</small>`:''}</button>`
    ).join('')+Array.from({length:libres},()=>
      `<a class="pubr-c libre" href="${WHATSAPP}" target="_blank" rel="noopener"><span class="pubr-logo">+</span><b>Tu negocio acá</b><small>Escribinos</small></a>`
    ).join('');

    cont.innerHTML=`<div class="pubr"><div class="pubr-t">Nos acompañan</div><div class="pubr-fila">${cards}</div></div>`;
    cont.querySelectorAll('.pubr-c[data-i]').forEach(b=>b.onclick=()=>abrir(lista[+b.dataset.i]));
    activarRespaldo(cont);
  }

  // Primero lo guardado (aparece al instante), después lo actualizado del panel
  try{pintar(JSON.parse(localStorage.getItem(CACHE)));}catch(e){pintar([]);}
  fetch(URL_BASE+'/rest/v1/acompanan?app=eq.rescate&activo=eq.true&order=posicion.asc&select=*',{headers:{apikey:KEY,Authorization:'Bearer '+KEY}})
    .then(r=>r.ok?r.json():null)
    .then(d=>{if(!d)return;try{localStorage.setItem(CACHE,JSON.stringify(d));}catch(e){}pintar(d);})
    .catch(()=>{});
})();
