
// 메인 커버 이미지
const images = document.querySelectorAll('.main-img img');
let current = 0;

setInterval(() => {
  images[current].classList.remove('active');
  current = (current + 1) % images.length;
  images[current].classList.add('active');
}, 3000); // 3초 간격


// 헤더 스크롤
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) { // 스크롤이 50px 이상 내려가면
      header.style.backgroundColor = 'rgba(0,0,0,0.8)'; // 검정색
      header.style.color = '#fff'; // 글자색 흰색
    } else {
      header.style.backgroundColor = 'rgba(255,255,255,0.3)'; // 원래색
      header.style.color = '#333'; // 원래 글자색
    }
  });

