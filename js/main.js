
// 메인 커버 이미지
const images = document.querySelectorAll('.main-img img');
let current = 0;

setInterval(() => {
  images[current].classList.remove('active');
  current = (current + 1) % images.length;
  images[current].classList.add('active');
}, 2000); // 3초 간격



 // header
  let navList = document.querySelector("header");
  navList.addEventListener("mouseover", function(){
  navList.querySelectorAll(".sub-menu").forEach(sub=>{
      sub.style.height = "165px";
    });
  });
  navList.addEventListener("mouseout", function(){
  navList.querySelectorAll(".sub-menu").forEach(sub=>{
      sub.style.height = "0";
    });
  });


// 모바일 header - Vanilla JS
let w_w, w_h;
let re_resize_timer;

function resize() {
  clearTimeout(re_resize_timer);
  re_resize_timer = setTimeout(() => {
    w_w = window.innerWidth;
    w_h = window.innerHeight;

    const gnb = document.querySelector("#header .gnb");
    const openBg = document.querySelector("#header .open-bg");

    if (w_w < 1000) {
      if (gnb) gnb.style.height = `${w_h}px`;
      if (openBg && openBg.classList.contains("open")) {
        openBg.style.height = `${w_h}px`;
      }
    } else {
      if (gnb) gnb.removeAttribute("style");
      document.documentElement.classList.remove("open-menu");
    }
  }, 100);
}

// DOM 로드 후
document.addEventListener("DOMContentLoaded", () => {
  resize();

  const openTargets = document.querySelectorAll(
    "#header .open-btn, #header .open-bg"
  );
  const openBg = document.querySelector("#header .open-bg");

  openTargets.forEach(el => {
    el.addEventListener("click", () => {
      if (w_w < 1000) {
        resize();
        document.documentElement.classList.toggle("open-menu");

        if (openBg) {
          if (openBg.classList.contains("open")) {
            openBg.classList.remove("open");
            openBg.removeAttribute("style");
          } else {
            openBg.classList.add("open");
          }
        }
      }
    });
  });

  const mainMenus = document.querySelectorAll(
    "#header ul.nav .main-menu"
  );

  mainMenus.forEach(menu => {
    menu.addEventListener("click", () => {
      if (menu.classList.contains("open")) {
        menu.classList.remove("open");
      } else {
        mainMenus.forEach(m => m.classList.remove("open"));
        menu.classList.add("open");
      }
    });
  });
});

// window load
window.addEventListener("load", resize);

// window resize
window.addEventListener("resize", resize);




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




