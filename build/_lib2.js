
function mainPage(p,f){
  const sc=(p.toc&&p.toc.length>2)?['toc.js']:[];
  let h=hd(p,f)+hdr(p.nav||'')+cr(p.crumbs)+'\n<main id="icerik">\n  <article>\n    <header class="fx-hero"><div class="fx-hero__inner">\n      <p class="fx-hero__eyebrow"><span class="fx-label">'+e(p.label)+'</span></p>\n      <h1>'+e(p.h1)+'</h1>\n      <p class="fx-hero__answer">'+p.answer+'</p>\n'+(p.decision?'      <p class="fx-hero__decision">'+p.decision+'</p>\n':'')+(p.meta&&p.meta.length?'      <dl class="fx-hero__meta">\n'+p.meta.map(m=>'        <div><dt>'+e(m[0])+'</dt><dd>'+e(m[1])+'</dd></div>').join('\n')+'\n      </dl>\n':'')+'    </div></header>\n\n    <div class="fx-page">\n'+
  (p.toc&&p.toc.length?'      <nav class="fx-toc" data-toc aria-label="Bu sayfada">\n        <p class="fx-toc__label">BU SAYFADA</p>\n        <ol>\n'+p.toc.map(t=>'          <li><a href="#'+t[0]+'">'+e(t[1])+'</a></li>').join('\n')+'\n        </ol>\n      </nav>\n':'      <div></div>\n')+
  '      <div class="fx-body">\n';
  (p.body||[]).forEach(s=>h+=sec(s));
  if(p.grid)p.grid.forEach(g=>{
    h+='        <section class="fx-sec" id="'+g.id+'">\n          <h2>'+e(g.t)+'</h2>\n'+(g.d?'          <p>'+g.d+'</p>\n':'')+'          <div class="fx-cards" style="margin-top:16px">\n';
    g.cards.forEach(c=>h+='            <a class="fx-card" href="'+c.u+'"><span class="fx-card__t">'+e(c.t)+'</span><span class="fx-card__d">'+e(c.d)+'</span></a>\n');
    h+='          </div>\n        </section>\n';});
  if(p.next&&p.next.length)h+='        <nav class="fx-next" aria-label="İlgili sayfalar">\n          <p class="fx-next__label">İLGİLİ SAYFALAR</p>\n          <div class="fx-cards fx-cards--sm">\n'+p.next.map(n=>'            <a class="fx-card" href="'+n[0]+'"><span class="fx-card__t">'+e(n[1])+'</span><span class="fx-card__d">'+e(n[2])+'</span></a>').join('\n')+'\n          </div>\n        </nav>\n';
  h+='        <aside class="fx-cta">\n          <h2>'+e(p.ctaT)+'</h2>\n          <p>'+e(p.ctaB)+'</p>\n          <div class="fx-cta__row">\n            <a class="fx-btn fx-btn--primary" href="/iletisim/">Teklif Al <span aria-hidden="true">→</span></a>\n            <a class="fx-btn fx-btn--ghost-dark" href="tel:'+TEL+'">'+TD+'</a>\n          </div>\n        </aside>\n      </div>\n    </div>\n  </article>\n</main>'+ft(f,sc);
  return h;
}
function legalPage(p,f){
  let h=hd(p,f)+hdr('')+cr(p.crumbs)+'\n<main id="icerik">\n  <article>\n    <header class="fx-hero"><div class="fx-hero__inner">\n      <p class="fx-hero__eyebrow"><span class="fx-label">'+e(p.label)+'</span>'+(p.badge?'<span class="fx-badge fx-badge--'+p.badge[0]+'">'+p.badge[1]+'</span>':'')+'</p>\n      <h1>'+e(p.h1)+'</h1>\n      <p class="fx-hero__answer">'+p.answer+'</p>\n    </div></header>\n    <div class="fx-page">\n      <div></div>\n      <div class="fx-body">\n';
  if(p.gate)h+='        <aside class="fx-gate" id="kapi" aria-label="İçerik kapısı">\n          <p class="fx-gate__label">'+e(p.gate.label)+'</p>\n          <p class="fx-gate__why">'+p.gate.why+'</p>\n          <p class="fx-gate__need"><strong>Gereken:</strong> '+p.gate.need+'</p>\n        </aside>\n';
  (p.body||[]).forEach(s=>h+=sec(s));
  h+='      </div>\n    </div>\n  </article>\n</main>'+ft(f);
  return h;
}
