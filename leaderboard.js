(() => {
  if (!window.AuthManager || !window.AuthManager.isAuthenticated()) {
    window.location.replace("login.html");
  }

  const STORAGE_KEY = "ce_quiz_results_v1";

  const searchInput = document.getElementById("search-player");
  const difficultyFilter = document.getElementById("filter-difficulty");
  const sortBySelect = document.getElementById("sort-by");
  const refreshBtn = document.getElementById("refresh-btn");
  const tableBody = document.getElementById("leaderboard-table-body");
  const podiumContainer = document.getElementById("podium-cards");
  const userBadge = document.getElementById("current-user-badge");

  function initUserBadge() {
    if (!userBadge || !window.AuthManager) return;

    userBadge.style.cursor = "pointer";
    userBadge.title = "Click to view Profile";
    userBadge.onclick = () => {
      window.location.href = "profile.html";
    };

    const session = window.AuthManager.getSession();
    if (!session) {
      userBadge.innerHTML = `<span class="user-chip-guest">Guest Player</span>`;
      return;
    }
    const name = session.fullName || session.username || "User";
    const avatar = session.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D5C4E&color=fff&bold=true`;

    userBadge.innerHTML = `
      <span class="user-badge-flex">
        <img src="${avatar}" class="user-header-avatar" alt="${name}" onerror="this.onerror=null;this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D5C4E&color=fff&bold=true';" />
        <span class="user-name">${name}</span>
      </span>
    `;
  }

  function getRawResults() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error("Failed to load results:", e);
      return [];
    }
  }

  function formatTimeSeconds(seconds) {
    if (seconds === undefined || seconds === null) return "0s";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins > 0) {
      return `${mins}m ${secs}s`;
    }
    return `${secs}s`;
  }

  function formatDate(isoStr) {
    if (!isoStr) return "N/A";
    const date = new Date(isoStr);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  }

  function getProcessedResults() {
    let results = getRawResults();

    const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
    if (query) {
      results = results.filter((r) => {
        const name = (r.candidateName || "").toLowerCase();
        const roll = (r.rollNumber || "").toLowerCase();
        return name.includes(query) || roll.includes(query);
      });
    }

    const diff = difficultyFilter ? difficultyFilter.value : "All";
    if (diff !== "All") {
      results = results.filter((r) => (r.difficulty || "Medium") === diff);
    }

    const sortBy = sortBySelect ? sortBySelect.value : "score";
    results.sort((a, b) => {
      const scoreA = a.correct || 0;
      const scoreB = b.correct || 0;
      const percA = a.percentage || 0;
      const percB = b.percentage || 0;
      const timeA = a.timeUsedSeconds || 0;
      const timeB = b.timeUsedSeconds || 0;
      const dateA = new Date(a.submittedAt || 0).getTime();
      const dateB = new Date(b.submittedAt || 0).getTime();

      if (sortBy === "score") {
        if (scoreB !== scoreA) return scoreB - scoreA;
        if (percB !== percA) return percB - percA;
        return timeA - timeB;
      } else if (sortBy === "percentage") {
        if (percB !== percA) return percB - percA;
        if (scoreB !== scoreA) return scoreB - scoreA;
        return timeA - timeB;
      } else if (sortBy === "time") {
        if (timeA !== timeB) return timeA - timeB;
        return scoreB - scoreA;
      } else if (sortBy === "newest") {
        return dateB - dateA;
      }
      return 0;
    });

    return results.slice(0, 100);
  }

  function renderPodium(topThree) {
    if (!podiumContainer) return;
    podiumContainer.innerHTML = "";

    if (!topThree || topThree.length === 0) {
      podiumContainer.innerHTML = '<p class="empty-podium">No top players yet. Complete a quiz to claim rank #1!</p>';
      return;
    }

    const podiumTitles = [
      { rank: "🥇 1st Place", class: "gold-podium" },
      { rank: "🥈 2nd Place", class: "silver-podium" },
      { rank: "🥉 3rd Place", class: "bronze-podium" }
    ];

    topThree.forEach((player, idx) => {
      const meta = podiumTitles[idx];
      const card = document.createElement("div");
      card.className = `podium-card ${meta.class}`;
      card.innerHTML = `
        <div class="podium-badge">${meta.rank}</div>
        <h3 class="podium-name">${player.candidateName || "Anonymous"}</h3>
        <p class="podium-detail">Score: <strong>${player.correct}/${player.totalQuestions || 0}</strong> (${(player.percentage || 0).toFixed(1)}%)</p>
        <p class="podium-sub">🔥 Streak: ${player.highestStreak || 0} | ⏱ ${formatTimeSeconds(player.timeUsedSeconds)}</p>
      `;
      podiumContainer.appendChild(card);
    });
  }

  function renderLeaderboardTable() {
    const list = getProcessedResults();
    if (!tableBody) return;

    renderPodium(list.slice(0, 3));

    tableBody.innerHTML = "";
    if (list.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="8" class="empty-row">No candidates found for selected criteria.</td></tr>';
      return;
    }

    list.forEach((item, index) => {
      const rank = index + 1;
      const row = document.createElement("tr");

      if (rank === 1) row.className = "rank-1-row";
      else if (rank === 2) row.className = "rank-2-row";
      else if (rank === 3) row.className = "rank-3-row";

      const rankBadge = rank === 1 ? "🥇 1" : rank === 2 ? "🥈 2" : rank === 3 ? "🥉 3" : `#${rank}`;

      row.innerHTML = `
        <td><span class="rank-chip">${rankBadge}</span></td>
        <td><strong>${item.candidateName || "Unknown"}</strong> <span class="roll-sub">(${item.rollNumber || "N/A"})</span></td>
        <td>⭐ ${item.correct || 0}/${item.totalQuestions || 0}</td>
        <td>📈 ${(item.percentage || 0).toFixed(1)}%</td>
        <td><span class="diff-badge diff-${(item.difficulty || "medium").toLowerCase()}">${item.difficulty || "Medium"}</span></td>
        <td>🔥 ${item.highestStreak || 0}</td>
        <td>⏱ ${formatTimeSeconds(item.timeUsedSeconds)}</td>
        <td>📅 ${formatDate(item.submittedAt)}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  if (searchInput) searchInput.addEventListener("input", renderLeaderboardTable);
  if (difficultyFilter) difficultyFilter.addEventListener("change", renderLeaderboardTable);
  if (sortBySelect) sortBySelect.addEventListener("change", renderLeaderboardTable);
  if (refreshBtn) refreshBtn.addEventListener("click", renderLeaderboardTable);

  setInterval(renderLeaderboardTable, 5000);

  if (window.BroadcastChannel) {
    const bc = new BroadcastChannel("ce_quiz_leaderboard_channel");
    bc.onmessage = () => {
      renderLeaderboardTable();
    };
  }

  initUserBadge();
  renderLeaderboardTable();

  const leaderboardLogoutBtn = document.getElementById("logout-btn");
  if (leaderboardLogoutBtn) {
    leaderboardLogoutBtn.addEventListener("click", () => {
      if (confirm("Do you want to logout from the quiz portal?")) {
        if (window.AuthManager) {
          window.AuthManager.clearSession();
        }
        window.location.href = "login.html";
      }
    });
  }
})();
