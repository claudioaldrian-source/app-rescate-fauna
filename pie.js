/* ============================================================
   PIE DE PÁGINA FIJO · Reporte Fauna Santa Fe
   Lo usan la app (index.html) y el panel (panel.html).
   «Desarrollado por Macla-IA» + Política de privacidad + Términos y condiciones.
   USO: antes de </body> →  <script src="pie.js"></script>
   Para cambiar textos o datos de contacto, editá solo este archivo.
   ============================================================ */
(function () {
  const CONTACTO_TEL = '3482-530384';
  const CONTACTO_WA = 'https://wa.me/5493482530384';
  const ACTUALIZADO = 'noviembre de 2026';

  const css = `
  .pie-fijo{position:fixed;left:0;right:0;bottom:0;z-index:900;display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;
    min-height:34px;padding:4px 12px calc(4px + env(safe-area-inset-bottom));background:#0F3B47;color:#CFE3E4;
    font:12px/1.3 'Nunito','Segoe UI',Roboto,sans-serif;box-shadow:0 -2px 8px rgba(0,0,0,.18)}
  .pie-fijo b{color:#F2E8CF}
  .pie-fijo .pie-sep{opacity:.45}
  .pie-fijo button{background:none;border:none;color:#A9D18E;font:inherit;font-weight:700;cursor:pointer;padding:4px 2px;text-decoration:underline;text-underline-offset:2px}
  .pie-fijo button:hover{color:#F2E8CF}
  body.con-pie{padding-bottom:calc(42px + env(safe-area-inset-bottom))}
  .pie-modal{position:fixed;inset:0;z-index:20000;background:rgba(8,37,45,.7);display:none;align-items:center;justify-content:center;padding:16px}
  .pie-modal.abierto{display:flex}
  .pie-caja{position:relative;background:#fff;color:#11262B;border-radius:16px;width:100%;max-width:560px;max-height:88vh;overflow-y:auto;
    padding:22px 20px 18px;box-shadow:0 14px 40px rgba(0,0,0,.35);font:15px/1.55 'Nunito','Segoe UI',Roboto,sans-serif}
  .pie-caja h2{font-size:20px;color:#0F3B47;margin:0 34px 4px 0}
  .pie-caja .pie-fecha{font-size:12px;color:#6B7477;margin-bottom:10px}
  .pie-caja h3{font-size:15px;color:#174652;margin:14px 0 4px}
  .pie-caja p,.pie-caja li{margin:0 0 6px}
  .pie-caja ul{padding-left:20px;margin:0 0 6px}
  .pie-caja a{color:#1E5B6B;font-weight:700}
  .pie-x{position:absolute;top:10px;right:10px;width:38px;height:38px;border:none;border-radius:50%;background:#EDE6D6;color:#0F3B47;font-size:16px;cursor:pointer}
  .pie-ok{display:block;width:100%;margin-top:14px;min-height:44px;border:none;border-radius:10px;background:#0F3B47;color:#fff;font:700 15px inherit;font-family:inherit;cursor:pointer}
  @media (max-width:480px){.pie-fijo{font-size:11px;gap:6px;flex-wrap:nowrap;white-space:nowrap}.pie-largo{display:none}}`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  const TEXTOS = {
    privacidad: `
      <h2>Política de privacidad</h2>
      <div class="pie-fecha">Última actualización: ${ACTUALIZADO}</div>
      <p>Reporte Fauna Santa Fe es una herramienta para avisar cuando se ve un animal silvestre que necesita rescate. Esta política explica qué datos se usan y para qué.</p>
      <h3>Quién es responsable</h3>
      <p>Macla-IA · Claudio Aldrian. Contacto: <a href="${CONTACTO_WA}" target="_blank" rel="noopener">WhatsApp ${CONTACTO_TEL}</a>.</p>
      <h3>Qué datos se recolectan</h3>
      <ul>
        <li><b>Tus datos de contacto:</b> nombre, apellido y teléfono. Se guardan en tu celular y se envían con cada reporte.</li>
        <li><b>La ubicación</b> del lugar, tomada del GPS solo cuando usás la app para reportar.</li>
        <li><b>Lo que enviás en el reporte:</b> tipo de animal, descripción, urgencia, fotos, videos y audios.</li>
      </ul>
      <h3>Para qué se usan</h3>
      <ul>
        <li>Para que el equipo de rescate sepa qué pasa, dónde ir y cómo comunicarse con vos.</li>
        <li>Para avisarte en la app cuando tu reporte fue tomado o completado.</li>
        <li>Para estadísticas generales de fauna de la zona, sin identificar a las personas.</li>
      </ul>
      <h3>Quién puede verlos</h3>
      <p>Solo el personal autorizado del panel de rescate, que entra con usuario y contraseña. <b>Tus datos no se venden ni se comparten con fines comerciales.</b> Los comercios que aparecen en «Nos acompañan» no reciben ningún dato tuyo.</p>
      <h3>Dónde se guardan</h3>
      <p>En servidores de Supabase, con acceso protegido. Las fotos de los reportes no son públicas en la app.</p>
      <h3>Tus derechos</h3>
      <p>Podés pedir ver, corregir o borrar tus datos escribiendo al contacto de arriba (Ley 25.326 de Protección de Datos Personales). Para cambiar nombre o teléfono en tu celular, tocá «Cambiar» arriba del formulario.</p>`,
    terminos: `
      <h2>Términos y condiciones</h2>
      <div class="pie-fecha">Última actualización: ${ACTUALIZADO}</div>
      <h3>Uso de la app</h3>
      <p>La app sirve para avisar avistajes de fauna silvestre que necesite ayuda o rescate. Al enviar un reporte aceptás estos términos.</p>
      <h3>Tu seguridad primero</h3>
      <ul>
        <li><b>No toques, no agarres ni intentes atrapar al animal.</b> Mantené distancia y esperá al rescatista.</li>
        <li>Si hay una persona herida o en peligro, llamá primero al <b>911</b>.</li>
      </ul>
      <h3>Qué podés esperar</h3>
      <p>El equipo de rescate atiende los reportes según su urgencia y disponibilidad. No se garantiza un tiempo de llegada.</p>
      <h3>Reportes responsables</h3>
      <p>Enviá información real. Los reportes falsos o con contenido ofensivo pueden ser borrados.</p>
      <h3>Publicidad</h3>
      <p>Los espacios «Nos acompañan» son de comercios e instituciones que apoyan el proyecto. Cada uno es responsable de lo que ofrece.</p>
      <h3>Propiedad</h3>
      <p>La app, su diseño y su código son de Macla-IA · Claudio Aldrian. © 2026. Todos los derechos reservados.</p>
      <p>Consultas: <a href="${CONTACTO_WA}" target="_blank" rel="noopener">WhatsApp ${CONTACTO_TEL}</a>.</p>`
  };

  const pie = document.createElement('footer');
  pie.className = 'pie-fijo';
  pie.innerHTML = `<span><span class="pie-largo">Desarrollado por </span><b>Macla-IA</b> · Claudio Aldrian</span>
    <span class="pie-sep">|</span>
    <button type="button" data-doc="privacidad">Privacidad</button>
    <span class="pie-sep">|</span>
    <button type="button" data-doc="terminos">Términos</button>`;
  document.body.appendChild(pie);
  document.body.classList.add('con-pie');

  const modal = document.createElement('div');
  modal.className = 'pie-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.innerHTML = `<div class="pie-caja"><button type="button" class="pie-x" aria-label="Cerrar">✕</button><div class="pie-texto"></div><button type="button" class="pie-ok">Entendido</button></div>`;
  document.body.appendChild(modal);

  const cerrar = () => modal.classList.remove('abierto');
  pie.querySelectorAll('button[data-doc]').forEach(b => b.addEventListener('click', () => {
    modal.querySelector('.pie-texto').innerHTML = TEXTOS[b.dataset.doc];
    modal.classList.add('abierto');
    modal.querySelector('.pie-caja').scrollTop = 0;
  }));
  modal.querySelector('.pie-x').onclick = cerrar;
  modal.querySelector('.pie-ok').onclick = cerrar;
  modal.addEventListener('click', e => { if (e.target === modal) cerrar(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('abierto')) cerrar(); });
})();
