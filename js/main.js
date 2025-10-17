
// 메인 커버 이미지
const images = document.querySelectorAll('.main-img img');
let current = 0;

setInterval(() => {
  images[current].classList.remove('active');
  current = (current + 1) % images.length;
  images[current].classList.add('active');
}, 3000); // 3초 간격




document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    const gnbBg = document.querySelector('.gnb-bg');
    const subMenus = document.querySelectorAll('.nav-sub');
    const headerHeight = 80; // CSS의 메인 메뉴 높이와 일치해야 함
    const paddingOffset = 300; // 서브메뉴 패딩 및 여유 공간 고려

    // 1. 가장 높은 서브메뉴 높이를 계산하는 함수
    function calculateMaxSubHeight() {
        let maxHeight = 0;
        subMenus.forEach(subMenu => {
            // 서브메뉴의 현재 높이 (패딩, 마진 포함)
            const currentHeight = subMenu.offsetHeight; 
            if (currentHeight > maxHeight) {
                maxHeight = currentHeight;
            }
        });
        return maxHeight;
    }

    // 2. 마우스 오버/아웃 이벤트 리스너 설정
    header.addEventListener('mouseenter', function() {
        // 서브메뉴가 하나라도 있을 경우에만 작동
        if (subMenus.length === 0) return;

        // 배경 높이 계산 및 적용
        const maxSubHeight = calculateMaxSubHeight();
        const finalHeight = maxSubHeight + paddingOffset; 
        
        // 배경 높이를 인라인 스타일로 설정하여 CSS의 height: 0을 덮어씀
        gnbBg.style.height = `${finalHeight}px`;
        
        // active 클래스 추가 (배경 늘어나고 서브메뉴 보이게 함)
        header.classList.add('active');
        
        // 서브메뉴에 max-height를 다시 설정해 높이 계산 오류 방지
        subMenus.forEach(subMenu => {
            subMenu.style.maxHeight = `${maxSubHeight}px`;
        });
    });

    header.addEventListener('mouseleave', function() {
        // active 클래스 제거
        header.classList.remove('active');
        
        // 배경 높이를 0으로 되돌림 (CSS transition 발동)
        gnbBg.style.height = '0';
        
        // 서브메뉴의 max-height를 다시 초기화하여 완전히 숨기도록 준비
        subMenus.forEach(subMenu => {
            subMenu.style.maxHeight = '0';
        });
    });

    // 3. 페이지 로드 시 서브메뉴 높이를 미리 계산해 두기 (옵션)
    // 이 부분이 없으면 첫 마우스 오버 시 높이 계산이 틀릴 수 있음
    // 임시로 display:block 상태에서 높이 계산 후 다시 숨겨야 정확함.
    // 여기서는 간단하게 첫 mouseenter 시 계산하도록 했습니다.
});