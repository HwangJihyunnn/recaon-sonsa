
// 메인 커버 이미지
const images = document.querySelectorAll('.main-img img');
let current = 0;

setInterval(() => {
  images[current].classList.remove('active');
  current = (current + 1) % images.length;
  images[current].classList.add('active');
}, 3000); // 3초 간격




 window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });



  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("navMenu");
  const closeBtn = document.getElementById("closeBtn");

  menuToggle.addEventListener("click", () => {
    nav.classList.add("active");
    menuToggle.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    nav.classList.remove("active");
    menuToggle.classList.remove("active");
  });

