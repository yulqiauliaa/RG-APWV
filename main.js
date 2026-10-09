/* ===== Content data (edit here) ===== */
const areas = [
  'Sustainable Biomass Valorization','Organic Waste Management','Fermentation & Bioprocessing',
  'Bioenergy & Bioconversion','Biomass-Derived Materials','Feed & Biological Resources'
];
const approach = [
  ['Agricultural & Plantation Residues','Raw residual biomass'],
  ['Biological · Chemical · Material · Energy','Conversion pathways'],
  ['Valorization & Sustainable Resources','Value-added products']
];
const outputs = [
  ['Review Articles','Research synthesis and literature reviews'],
  ['Research Articles','Scientific studies and experimental findings'],
  ['Conceptual Frameworks','Research concepts and frameworks'],
];
// Only the first item is from the client brief. The rest are placeholders: replace or delete.
const updates = [
  {date:'07 OCT 2026',tag:'Website Development',title:'RG-APWV Official Website Launched',
    text:'The official RG-APWV website has been developed to introduce the research group identity, research focus, scientific activities, and collaborative initiatives in agricultural and plantation waste valorization.'},
];
const people = [
  {group:'Scientific Leadership',cols:'md:grid-cols-2',list:[
    ['Byan Baihaqi, S.T., M.T.','Founder & Scientific Lead'],
    ['Muhammad Rafi Ramadhan Taufik, S.T.','Deputy Scientific Lead'],
    ['Ade Dimas Kurnia, S.Pt., M.Si.','Deputy Scientific Lead'],
    ['Dea Nurmastin Novianti, S.Bns., MOS','Deputy Scientific Lead']]},
  {group:'Research Member',cols:'md:grid-cols-3',list:[
    ['Risdiyana','Research Member (Co-Founder)'],['Dede Anissa Khumairoh','Research Member'],['Yulqi Aulia','Research Member & Web Developer']]},
  {group:'Supporter',cols:'md:grid-cols-2',list:[
    ['Sukayat','Co-Founder, Facilities Provider, and Guardian']]}
];

/* ===== Render ===== */
const $ = s => document.querySelector(s);
const initials = n => n.replace(/,.*$/,'').split(' ').filter(w=>/^[A-Z]/.test(w)).slice(0,2).map(w=>w[0]).join('');

$('#areas').innerHTML = areas.map((a,i)=>`
  <div class="card reveal ${i===6?'lg:col-span-2':''}">
    <span class="font-head font-bold text-2xl text-leaf">${String(i+1).padStart(2,'0')}</span>
    <h3 class="mt-3 font-head font-semibold text-ink leading-snug">${a}</h3>
  </div>`).join('');

$('#approach').innerHTML = approach.map((a,i)=>`
  <li class="reveal relative">
    <div class="w-12 h-12 rounded-full bg-leaf text-ink font-head font-extrabold grid place-items-center mb-4">${i+1}</div>
    <h3 class="font-head font-semibold">${a[0]}</h3>
    <p class="text-sm text-white/60 mt-1">${a[1]}</p>
  </li>`).join('');

$('#outputList').innerHTML = outputs.map(o=>`
  <div class="card reveal border-t-2 border-t-earth">
    <h3 class="font-head font-semibold text-sm uppercase tracking-wide">${o[0]}</h3>
    <p class="text-sm text-ink/70 mt-2">${o[1]}</p>
  </div>`).join('');

$('#updateList').innerHTML = updates.map(u=>`
  <article class="reveal py-5 grid md:grid-cols-[130px_1fr] gap-2 md:gap-6">
    <time class="font-head font-bold text-brand text-sm">${u.date}</time>
    <div><p class="text-[11px] tracking-widest uppercase text-earth font-semibold">${u.tag}</p>
    <h3 class="font-head font-semibold">${u.title}</h3><p class="text-sm text-ink/70">${u.text}</p></div>
  </article>`).join('');

$('#peopleWrap').innerHTML = people.map(g=>`
  <div class="reveal"><h3 class="text-xs tracking-[.2em] uppercase text-earth font-semibold mb-4">${g.group}</h3>
  <div class="grid gap-4 ${g.cols}">${g.list.map(p=>`
    <div class="card flex items-center gap-4">
      <span class="w-12 h-12 shrink-0 rounded-full bg-brand/10 text-brand font-head font-bold grid place-items-center">${initials(p[0])}</span>
      <div><p class="font-head font-semibold leading-snug">${p[0]}</p><p class="text-sm text-ink/60">${p[1]}</p></div>
    </div>`).join('')}</div></div>`).join('');

/* ===== Behavior ===== */
const header = $('#header'), btn = $('#menuBtn'), mnav = $('#mobileNav');
btn.addEventListener('click',()=>{const o=mnav.classList.toggle('hidden');btn.setAttribute('aria-expanded',String(!o));});
mnav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mnav.classList.add('hidden')));
addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>8),{passive:true});

const io = new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

const links = [...document.querySelectorAll('#nav a')];
const spy = new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting) links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+e.target.id));
}),{rootMargin:'-40% 0px -55% 0px'});
links.forEach(l=>{const s=document.querySelector(l.getAttribute('href'));if(s)spy.observe(s);});
