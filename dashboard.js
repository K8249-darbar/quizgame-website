(() => {
const DASHBOARD_RESULT_STORAGE_KEY = "ce_quiz_results_v1";
const DASHBOARD_PASS_MARK = 40;

function getDashboardStoredResults() {
  try {
    const results = JSON.parse(
      localStorage.getItem(DASHBOARD_RESULT_STORAGE_KEY) || "[]"
    );
    return Array.isArray(results) ? results : [];
  } catch (error) {
    return [];
  }
}

function getDashboardQuestionCount() {
  return typeof QUESTION_BANK === "undefined" ? 0 : QUESTION_BANK.length;
}

function getDashboardSubjectCount() {
  return typeof SUBJECT_QUESTIONS === "undefined"
    ? 0
    : Object.keys(SUBJECT_QUESTIONS).length;
}

function formatDashboardPercentage(value) {
  return `${value.toFixed(2)}%`;
}

function setDashboardMetric(metricId, value) {
  const metric = document.getElementById(metricId);
  if (metric) {
    metric.textContent = value;
  }
}

function renderDashboardActivity(results) {
  const activityList = document.getElementById("dashboard-recent-activity");
  if (!activityList) {
    return;
  }

  activityList.innerHTML = "";
  const recentResults = [...results]
    .sort((first, second) => new Date(second.submittedAt) - new Date(first.submittedAt))
    .slice(0, 5);

  if (!recentResults.length) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "dashboard-empty-state";
    emptyItem.textContent = "No quiz attempts yet.";
    activityList.appendChild(emptyItem);
    return;
  }

  recentResults.forEach((result) => {
    const activityItem = document.createElement("li");
    activityItem.className = "dashboard-activity-item";

    const activityTitle = document.createElement("strong");
    activityTitle.textContent = `${result.candidateName} completed ${result.subject}`;

    const activityDetails = document.createElement("span");
    activityDetails.textContent = `${formatDashboardPercentage(Number(result.percentage) || 0)} score · ${new Date(result.submittedAt).toLocaleString()}`;

    activityItem.append(activityTitle, activityDetails);
    activityList.appendChild(activityItem);
  });
}

function renderAdminDashboard() {
  const results = getDashboardStoredResults();
  const uniqueStudents = new Set(
    results.map((result) => String(result.rollNumber || "").trim()).filter(Boolean)
  );
  const totalPercentage = results.reduce(
    (sum, result) => sum + (Number(result.percentage) || 0),
    0
  );
  const averageScore = results.length ? totalPercentage / results.length : 0;
  const highestScore = results.reduce(
    (highest, result) => Math.max(highest, Number(result.percentage) || 0),
    0
  );
  const passedAttempts = results.filter(
    (result) => (Number(result.percentage) || 0) >= DASHBOARD_PASS_MARK
  ).length;
  const passPercentage = results.length
    ? (passedAttempts / results.length) * 100
    : 0;

  setDashboardMetric("dashboard-total-students", String(uniqueStudents.size));
  setDashboardMetric("dashboard-total-subjects", String(getDashboardSubjectCount()));
  setDashboardMetric("dashboard-total-attempts", String(results.length));
  setDashboardMetric("dashboard-average-score", formatDashboardPercentage(averageScore));
  setDashboardMetric("dashboard-highest-score", formatDashboardPercentage(highestScore));
  setDashboardMetric("dashboard-pass-percentage", formatDashboardPercentage(passPercentage));
  renderDashboardActivity(results);
}

window.renderAdminDashboard = renderAdminDashboard;

window.addEventListener("quiz:results-updated", renderAdminDashboard);
window.addEventListener("storage", (event) => {
  if (event.key === DASHBOARD_RESULT_STORAGE_KEY) {
    renderAdminDashboard();
  }
});

renderAdminDashboard();
})();
