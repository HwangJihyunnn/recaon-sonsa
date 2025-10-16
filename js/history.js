 fetch("../js/history.json")
      .then(response => response.json())
      .then(data => {
        const historyContainer = document.getElementById("history");
        historyContainer.classList.add("timeline");
        historyContainer.innerHTML = "";

        data.sort((a, b) => {
      // "YYYY.MM" 문자열을 날짜 비교 가능하게 변환
      const dateA = new Date(a.date.replace(".", "-") + "-01");
      const dateB = new Date(b.date.replace(".", "-") + "-01");
      return dateB - dateA; // 내림차순
      });

        data.forEach(item => {
          const entry = document.createElement("div");
          entry.className = "timeline-item";

          entry.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <span class="timeline-date">${item.date}</span>
              <span class="timeline-event">${item.event}</span>
            </div>
          `;

          historyContainer.appendChild(entry);
        });
        // 스크롤 애니메이션
      const items = document.querySelectorAll(".timeline-item");

      const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        items.forEach(item => {
          const itemTop = item.getBoundingClientRect().top;
          if (itemTop < triggerBottom) {
            item.classList.add("show");
          }
        });
      };

      window.addEventListener("scroll", revealOnScroll);
      revealOnScroll(); // 처음 로드 시 체크
    })
      .catch(error => console.error("JSON 불러오기 오류:", error));