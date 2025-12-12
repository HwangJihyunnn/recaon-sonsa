
// 메인 커버 이미지
const images = document.querySelectorAll('.main-img img');
let current = 0;

setInterval(() => {
  images[current].classList.remove('active');
  current = (current + 1) % images.length;
  images[current].classList.add('active');
}, 2000); // 3초 간격



// 스크롤 시 헤더 변화
/*  window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }); */



  // 모바일 메뉴
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

  // 메뉴 컬러 고정
document.addEventListener("DOMContentLoaded", function() {
  const navLinks = document.querySelectorAll(".nav a");
  const currentPath = window.location.pathname.split("/").pop(); // 현재 파일명

  navLinks.forEach(link => {
    const linkPath = link.getAttribute("href").split("/").pop();
    if (linkPath === currentPath) {
      link.classList.add("active");
    }
  });
});


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


// footer 팝업 
document.querySelectorAll('.bottom-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = e.target.getAttribute('data-popup');
    document.getElementById(`popup-${target}`).style.display = 'flex';
  });
});

document.querySelectorAll('.popup-close').forEach(btn => {
  btn.addEventListener('click', e => {
    e.target.closest('.popup').style.display = 'none';
  });
});

document.querySelectorAll('.popup').forEach(popup => {
  popup.addEventListener('click', e => {
    // 바깥 영역 클릭 시 닫기
    if (e.target === popup) popup.style.display = 'none';
  });
});




