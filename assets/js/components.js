(() => {
  const path = location.pathname;
  const isPageFolder = /\/pages\/[^/]+\.html$/.test(path);
  const base = isPageFolder ? "../" : "";
  const header = document.querySelector("[data-site-header]");
  const footer = document.querySelector("[data-site-footer]");
  const current = path.split("/").pop() || "index.html";
  const navItems = [
    ["index.html#collection", "مجموعه آثار", ["gallery.html", "index.html"]],
    ["about.html", "درباره نفیس", ["about.html"]],
    ["index.html#custom-order", "سفارش اختصاصی", []]
  ];
  if (header) {
    header.className = "site-header";
    header.innerHTML = `
      <a class="brand" href="${base}index.html" aria-label="صفحه اصلی گالری نفیس"><span class="brand-mark">ن</span><span class="brand-copy"><strong>گالری نفیس</strong><small>NAFIS ART HOUSE</small></span></a>
      <nav class="desktop-nav" aria-label="ناوبری اصلی">
        <a href="${base}index.html#collection">مجموعه آثار</a><a href="${base}pages/about.html">درباره نفیس</a><a href="${base}index.html#custom-order">سفارش اختصاصی</a>
      </nav>
      <div class="header-actions">
        <button class="theme-toggle" type="button" data-theme-toggle aria-label="تغییر حالت رنگ" title="تغییر حالت رنگ"><span class="theme-icon" aria-hidden="true">☼</span><span class="theme-label">حالت روشن</span></button>
        <a class="header-contact" href="${base}pages/contact.html">ارتباط با ما <span aria-hidden="true">↙</span></a>
        <button class="menu-toggle" type="button" aria-label="باز کردن منو" aria-expanded="false" aria-controls="mobile-menu" data-menu-toggle><span></span><span></span></button>
      </div>
      <nav class="mobile-menu" id="mobile-menu" data-mobile-menu hidden aria-label="منوی موبایل">
        <a href="${base}index.html#collection">مجموعه آثار</a><a href="${base}pages/about.html">درباره نفیس</a><a href="${base}index.html#custom-order">سفارش اختصاصی</a><a href="${base}pages/contact.html">ارتباط با ما</a>
      </nav>`;
  }
  if (footer) {
    footer.className = "site-footer";
    footer.innerHTML = `
      <div class="footer-brand"><a class="brand" href="${base}index.html"><span class="brand-mark">ن</span><span class="brand-copy"><strong>گالری نفیس</strong><small>NAFIS ART HOUSE</small></span></a><p>آثاری برای دیدن، انتخاب کردن و به یاد سپردن.</p></div>
      <nav class="footer-links" aria-label="پیوندهای پایین صفحه"><a href="${base}pages/gallery.html">مجموعه آثار</a><a href="${base}pages/about.html">درباره گالری</a><a href="${base}pages/contact.html">سفارش اختصاصی</a></nav>
      <div class="footer-contact"><span>برای شروع گفت‌وگو</span><a href="mailto:hello@nafis.example">hello@nafis.example</a><span>این ایمیل نمونه است؛ قبل از انتشار جایگزین شود.</span></div>
      <div class="footer-bottom"><span>© گالری نفیس — تمامی حقوق محفوظ است.</span><span>ساخته‌شده با دقت و علاقه به هنر</span></div>`;
  }
})();