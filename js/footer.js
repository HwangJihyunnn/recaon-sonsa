// 현재 스크립트의 기준 경로 계산 (GitHub Pages 호환)
function getBasePath() {
  const scripts = document.getElementsByTagName("script");
  for (let script of scripts) {
    if (script.src && script.src.includes("footer.js")) {
      const scriptPath = script.src;
      // header.js의 디렉토리까지만 추출
      const basePath = scriptPath.substring(0, scriptPath.lastIndexOf("/js/"));
      return basePath || ".";
    }
  }
  return ".";
}

// 푸터 동적 로드
function loadFooter() {
  const basePath = getBasePath();

  fetch(`${basePath}/component/footer.html`)
    .then((response) => response.text())
    .then((data) => {
      const placeholder = document.getElementById("footer-placeholder");
      if (placeholder) {
        // 경로 치환: header.html 내부의 절대경로를 상대경로로 변환
        const processedData = data
          .replace(/href="\/css\//g, `href="${basePath}/css/`)
          .replace(/href="\/index\.html"/g, `href="${basePath}/index.html"`)
          .replace(/href="\/subpage\//g, `href="${basePath}/subpage/`)
          .replace(/src="\/img\//g, `src="${basePath}/img/`);

        placeholder.innerHTML = processedData;

        // DOM 삽입 후 이벤트 리스너 초기화
        initFooterEvents();
      }
    })
    .catch((error) => console.error("푸터 로드 에러:", error));
}

// 헤더 이벤트 초기화
function initFooterEvents() {
  // 중복 실행 방지
  if (window.footerInitialized) return;

  // footer 팝업
  document.querySelectorAll(".bottom-links a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = e.target.getAttribute("data-popup");
      document.getElementById(`popup-${target}`).style.display = "flex";
    });
  });

  document.querySelectorAll(".popup-close").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.target.closest(".popup").style.display = "none";
    });
  });

  document.querySelectorAll(".popup").forEach((popup) => {
    popup.addEventListener("click", (e) => {
      // 바깥 영역 클릭 시 닫기
      if (e.target === popup) popup.style.display = "none";
    });
  });

  window.footerInitialized = true;
}

// DOM 로드 완료시 헤더 로드
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadFooter);
} else {
  loadFooter();
}
