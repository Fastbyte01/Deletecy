document.addEventListener("DOMContentLoaded", () => {
    const infoDiv = document.getElementById("info");
    const openUrlButton = document.getElementById("open-url");
  
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      chrome.runtime.sendMessage({ action: "getSiteInfo", url: activeTab.url }, (response) => {
        if (response && response.info) {
          const { name, notes, url, difficulty } = response.info;
  
          // Map the difficulty level with textual descriptions
          const difficultyText = {
            easy: "Easy",
            medium: "Medium",
            hard: "Hard",
            impossible: "Impossible"
          }[difficulty] || "Non specificato";
  
          infoDiv.innerHTML = `
            <p><strong>Site:</strong> ${name}</p>
            <p><strong>Notes:</strong> ${notes || "No notes available."}</p>
            <p><strong>Difficulty:</strong> ${difficultyText}</p>
          `;
          openUrlButton.disabled = false;
          openUrlButton.onclick = () => {
            chrome.tabs.create({ url });
          };
        } else {
          infoDiv.textContent = "No account deletion info available for this site.";
        }
      });
    });
  });
  