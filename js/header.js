// 현재 스크립트의 기준 경로 계산 (GitHub Pages 호환)
function getBasePath() {
  const scripts = document.getElementsByTagName('script');
  for (let script of scripts) {
    if (script.src && script.src.includes('header.js')) {
      const scriptPath = script.src;
      // header.js의 디렉토리까지만 추출
      const basePath = scriptPath.substring(0, scriptPath.lastIndexOf('/js/'));
      return basePath || '.';
    }
  }
  return '.';
}

// 헤더 동적 로드
function loadHeader() {
  const basePath = getBasePath();
  
  fetch(`${basePath}/component/header.html`)
    .then(response => response.text())
    .then(data => {
      const placeholder = document.getElementById('header-placeholder');
      if (placeholder) {
        // 경로 치환: header.html 내부의 절대경로를 상대경로로 변환
        const processedData = data
          .replace(/href="\/css\//g, `href="${basePath}/css/`)
          .replace(/href="\/index\.html"/g, `href="${basePath}/index.html"`)
          .replace(/href="\/subpage\//g, `href="${basePath}/subpage/`)
          .replace(/src="\/img\//g, `src="${basePath}/img/`);
        
        placeholder.innerHTML = processedData;
        
        // DOM 삽입 후 이벤트 리스너 초기화
        initHeaderEvents();
      }
    })
    .catch(error => console.error('헤더 로드 에러:', error));
}

// 헤더 이벤트 초기화
function initHeaderEvents() {
  // 중복 실행 방지
  if (window.headerMenuInitialized) return;
  
  const openBtn = document.querySelector('.open-btn');
  const bg = document.querySelector('.open-bg');
  const menuLinks = document.querySelectorAll('#header .main-menu > a');

  if (!openBtn || !bg) {
    console.error('헤더 요소를 찾을 수 없습니다');
    return;
  }

  // 햄버거 버튼 클릭
  openBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    document.documentElement.classList.toggle('open-menu');
  });

  // 배경 클릭시 메뉴 닫기
  bg.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    document.documentElement.classList.remove('open-menu');
  });

  // 모바일에서만 하위메뉴 토글
  menuLinks.forEach((link) => {
    link.addEventListener('click', function(e) {
      const isMobile = window.innerWidth <= 1000;
      
      if (isMobile) {
        e.preventDefault();
        e.stopPropagation();

        const parent = this.parentElement;

        // 다른 메뉴 닫기
        document.querySelectorAll('#header .main-menu').forEach(menu => {
          if (menu !== parent) {
            menu.classList.remove('open');
          }
        });

        // 현재 메뉴 토글
        parent.classList.toggle('open');
      }
    });
  });

  window.headerMenuInitialized = true;
}

// DOM 로드 완료시 헤더 로드
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadHeader);
} else {
  loadHeader();
}

