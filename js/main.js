
// 메인 커버 이미지
const images = document.querySelectorAll('.main-img img');
let current = 0;

setInterval(() => {
  images[current].classList.remove('active');
  current = (current + 1) % images.length;
  images[current].classList.add('active');
}, 2000); // 3초 간격


// 숫자 카운트다운
window.onload = () => {
  const counters = document.querySelectorAll(".stat-item strong");

  counters.forEach(counter => {
    const target = Number(counter.dataset.count);
    let current = 0;
    const duration = 1500;
    const start = performance.now();

    function animate(time) {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out
      current = Math.floor(eased * target);

      counter.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        counter.textContent = target.toLocaleString();
      }
    }

    requestAnimationFrame(animate);
  });
};


// 사업메뉴 탭

/* ★ 추가됨: 탭 기능 */
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(target).classList.add('active');
  });
});

// 문의하기 - 자주하는 질문
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  const btn = item.querySelector(".faq-question");

  btn.addEventListener("click", () => {
    // 하나만 열리게
    faqItems.forEach(i => {
      if (i !== item) i.classList.remove("active");
    });

    item.classList.toggle("active");
  });
});


// 매출 그래프
window.addEventListener("load", () => {
  const bars = document.querySelectorAll(".bar");

  bars.forEach(bar => {
    const height = bar.dataset.height;
    bar.style.height = height + "%";
  });
});
