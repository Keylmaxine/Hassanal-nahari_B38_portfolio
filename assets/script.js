/* Navigation and contact utilities; no server required. */
(()=>{
  const page=document.body.dataset.page;
  const nav=document.querySelector('.site-nav');
  const toggle=document.querySelector('.nav-toggle');
  const current=document.querySelector(`[data-nav="${page}"]`);
  if(current)current.setAttribute('aria-current','page');
  if(toggle&&nav){
    toggle.addEventListener('click',()=>{
      const open=toggle.getAttribute('aria-expanded')!=='true';
      toggle.setAttribute('aria-expanded',String(open));
      nav.classList.toggle('is-open',open);
    });
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');
    }));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'){
      nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');
    }});
  }
  const year=document.getElementById('current-year');if(year)year.textContent=new Date().getFullYear();
  document.querySelectorAll('[data-copy]').forEach(button=>{
    button.addEventListener('click',async()=>{
      const str=button.dataset.copy;const prev=button.innerHTML;
      try{if(!navigator.clipboard)throw new Error('unavailable');await navigator.clipboard.writeText(str);button.textContent='Copied ✓';}
      catch{button.textContent='Select the address above to copy';}
      window.setTimeout(()=>button.innerHTML=prev,2200);
    });
  });

})();
