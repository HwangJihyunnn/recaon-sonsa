





 async function loadHistory() { 
  try {
    const response = await fetch("/js/history.json");
    const data = await response.json();

    // ✅ 최신순으로 정렬 (date가 "2000.03" 형식일 때)
    data.sort((a, b) => b.date.localeCompare(a.date));

    const historyContainer = document.getElementById("history");
    historyContainer.innerHTML = ""; // 초기화

    data.forEach(item => {
      const p = document.createElement("p");

      const dateSpan = document.createElement("span");
      dateSpan.classList.add("history-date"); // 날짜용 클래스
      dateSpan.textContent = item.date;

      const eventSpan = document.createElement("span");
      eventSpan.classList.add("history-event"); // 이벤트용 클래스
      eventSpan.textContent = item.event;

      p.appendChild(dateSpan);
      p.appendChild(eventSpan);

      historyContainer.appendChild(p);
    });
  } catch (error) {
    console.error("연혁 로딩 실패:", error);
  }
}

loadHistory();

