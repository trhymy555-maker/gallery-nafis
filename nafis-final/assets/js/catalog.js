import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, getDoc, query, where } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { firebaseConfig, isFirebaseConfigured } from "./firebase-config.js";

const grid = document.querySelector("#art-grid");
if (!grid) { /* this page has no catalog */ }
else if (!isFirebaseConfigured()) { console.info("Nafis: Firebase config is not set; showing bundled demo catalog."); }
else {
  try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const [artSnap, catSnap, settingSnap] = await Promise.all([
      getDocs(query(collection(db, "artworks"), where("published", "==", true))), getDocs(query(collection(db, "categories"), where("active", "==", true))), getDoc(doc(db, "siteSettings", "main"))
    ]);
    const categories = catSnap.docs.map(d => ({id:d.id,...d.data()})).filter(c => c.active !== false).sort((a,b)=>(a.order||0)-(b.order||0));
    const artworks = artSnap.docs.map(d => ({id:d.id,...d.data()})).filter(a => a.published === true).sort((a,b)=>(a.order||0)-(b.order||0));
    const settings = settingSnap.exists() ? settingSnap.data() : {};
    const title = document.querySelector(".hero h1"); if (title && settings.heroTitle) title.textContent = settings.heroTitle;
    const desc = document.querySelector(".hero-description"); if (desc && settings.heroDescription) desc.textContent = settings.heroDescription;
    const heroImage = document.querySelector(".hero-art-frame img"); if (heroImage && settings.heroImageUrl) heroImage.src = settings.heroImageUrl;
    const collectionHeading = document.querySelector("#collection .section-heading h2"); if (collectionHeading && settings.collectionTitle) collectionHeading.textContent = settings.collectionTitle;
    const storyTitle=document.querySelector("#story .manifesto-copy h2"); if(storyTitle&&settings.storyTitle) storyTitle.textContent=settings.storyTitle;
    const storyBody=document.querySelector("#story .manifesto-copy>p:not(.eyebrow)"); if(storyBody&&settings.storyBody) storyBody.textContent=settings.storyBody;
    const customTitle=document.querySelector("#custom-order .custom-copy h2"); if(customTitle&&settings.customTitle) customTitle.textContent=settings.customTitle;
    const customBody=document.querySelector("#custom-order .custom-copy>p:not(.eyebrow)"); if(customBody&&settings.customBody) customBody.textContent=settings.customBody;
    const footerEmail=document.querySelector(".footer-contact a[href^='mailto:']"); if(footerEmail&&settings.contactEmail){footerEmail.href=`mailto:${settings.contactEmail}`;footerEmail.textContent=settings.contactEmail;}
    for (const [selector, key] of [["#story", "showStory"],["#custom-order","showCustomOrder"],[".journal","showJournal"]]) {
      const el=document.querySelector(selector); if(el && settings[key]===false) el.hidden=true;
    }
    {
      grid.innerHTML = artworks.map((a,i) => {
        const cat = categories.find(c=>c.id===a.categoryId) || {name:a.categoryName || "اثر هنری",slug:a.categorySlug||"other"};
        const img = escapeAttr(a.imageUrl || "");
        return `<article class="art-card ${i===0?'art-card-tall':''} reveal is-visible" data-category="${escapeAttr(cat.slug||cat.id||'other')}" data-title="${escapeAttr(a.title||'اثر هنری')}" data-description="${escapeAttr(a.description||'')}" data-price="${escapeAttr(a.price||'برای اطلاع از قیمت تماس بگیرید')}" data-image="${img}"><button class="art-image" data-product-open aria-label="مشاهده جزئیات ${escapeAttr(a.title||'اثر')}"><img src="${img}" alt="${escapeAttr(a.altText||a.title||'اثر هنری')}" loading="lazy"><span class="image-index">NF — ${String(i+1).padStart(3,'0')}</span><span class="image-open">↗</span></button><div class="art-info"><div><span class="art-category">${escapeHtml(cat.name||'اثر هنری')}</span><h3>${escapeHtml(a.title||'بدون عنوان')}</h3></div><span class="art-price">${escapeHtml(a.price||'قیمت با استعلام')} </span></div></article>`;
      }).join("");
      const toolbar = document.querySelector(".filter-chips");
      if(toolbar){
        const all = `<button class="filter-chip is-active" data-filter="all" aria-pressed="true">همه آثار</button>`;
        toolbar.innerHTML = all + categories.map(c=>`<button class="filter-chip" data-filter="${escapeAttr(c.slug||c.id)}" aria-pressed="false">${escapeHtml(c.name)}</button>`).join("");
      }
      // catalog.js runs after main.js defer order, but re-dispatching enables the delegated listeners below.
      document.dispatchEvent(new CustomEvent("nafis:catalog-updated"));
    }
    document.title = settings.siteTitle ? `${settings.siteTitle} | هنر برای ماندن` : document.title;
  } catch (err) { console.error("Nafis catalog could not load from Firebase.",err); }
}
function escapeHtml(v){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function escapeAttr(v){return escapeHtml(v).replace(/`/g,'&#96;');}
