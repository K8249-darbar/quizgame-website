const RESULT_STORAGE_KEY = "ce_quiz_results_v1";
const LOGIN_PAGE = "login.html";
const authManager = window.AuthManager;

if (!authManager || !authManager.isAuthenticated()) {
  window.location.replace(LOGIN_PAGE);
}

const state = {
  candidate: null,
  questions: [],
  answers: [],
  currentIndex: 0,
  timerSeconds: 0,
  totalSeconds: 0,
  timerId: null,
  submitted: false
};

const setupScreen = document.getElementById("setup-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const candidateForm = document.getElementById("candidate-form");
const setupMessage = document.getElementById("setup-message");
const candidatePill = document.getElementById("candidate-pill");
const timerDisplay = document.getElementById("timer-display");
const progressBar = document.getElementById("progress-bar");
const progressStats = document.getElementById("progress-stats");
const questionMeta = document.getElementById("question-meta");
const questionText = document.getElementById("question-text");
const optionsList = document.getElementById("options-list");
const questionPalette = document.getElementById("question-palette");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");
const resultSummary = document.getElementById("result-summary");
const nextCandidateBtn = document.getElementById("next-candidate-btn");
const leaderboardFilter = document.getElementById("leaderboard-filter");
const leaderboardBody = document.getElementById("leaderboard-body");
const clearResultsBtn = document.getElementById("clear-results-btn");
const exportResultsBtn = document.getElementById("export-results-btn");
const currentUserBadge = document.getElementById("current-user");
const logoutBtn = document.getElementById("logout-btn");

function shuffle(array) {
  for (let index = array.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
  }
  return array;
}

function showScreen(screenName) {
  setupScreen.classList.toggle("hidden", screenName !== "setup");
  quizScreen.classList.toggle("hidden", screenName !== "quiz");
  resultScreen.classList.toggle("hidden", screenName !== "result");
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function formatDate(dateIso) {
  return new Date(dateIso).toLocaleString();
}

function getStoredResults() {
  try {
    const parsed = JSON.parse(localStorage.getItem(RESULT_STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function setStoredResults(results) {
  localStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(results));
}

function getRankedResults(results) {
  return [...results].sort((a, b) => {
    if (b.percentage !== a.percentage) {
      return b.percentage - a.percentage;
    }
    if (b.correct !== a.correct) {
      return b.correct - a.correct;
    }
    if (a.timeUsedSeconds !== b.timeUsedSeconds) {
      return a.timeUsedSeconds - b.timeUsedSeconds;
    }
    return new Date(a.submittedAt) - new Date(b.submittedAt);
  });
}

function updateLeaderboardFilterOptions() {
  const currentValue = leaderboardFilter.value;
  const availableSubjects = [
    "All Subjects",
    ...Object.keys(SUBJECT_QUESTIONS),
    ...getStoredResults().map((result) => result.subject)
  ];
  const subjects = [...new Set(availableSubjects)];

  leaderboardFilter.innerHTML = "";
  subjects.forEach((subject) => {
    const option = document.createElement("option");
    option.value = subject;
    option.textContent = subject;
    leaderboardFilter.appendChild(option);
  });

  leaderboardFilter.value = subjects.includes(currentValue)
    ? currentValue
    : "All Subjects";
}

function renderLeaderboard() {
  updateLeaderboardFilterOptions();
  const selectedSubject = leaderboardFilter.value;
  const records = getRankedResults(getStoredResults());

  const filteredRecords =
    selectedSubject === "All Subjects"
      ? records
      : records.filter((record) => record.subject === selectedSubject);

  leaderboardBody.innerHTML = "";
  if (!filteredRecords.length) {
    leaderboardBody.innerHTML =
      '<tr><td colspan="10" class="empty-row">No records found for this filter.</td></tr>';
    return;
  }

  filteredRecords.forEach((record, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${record.candidateName}</td>
      <td>${record.rollNumber}</td>
      <td>${record.subject}</td>
      <td>${record.correct}/${record.totalQuestions} (${record.percentage.toFixed(2)}%)</td>
      <td>${record.correct}</td>
      <td>${record.incorrect}</td>
      <td>${record.unanswered}</td>
      <td>${formatTime(record.timeUsedSeconds)}</td>
      <td>${formatDate(record.submittedAt)}</td>
    `;
    leaderboardBody.appendChild(row);
  });
}

function setCurrentUserBadge() {
  if (!currentUserBadge || !authManager) {
    return;
  }
  const session = authManager.getSession();
  if (!session) {
    currentUserBadge.textContent = "";
    return;
  }
  currentUserBadge.textContent = `Logged in: ${session.username}`;
}

function handleLogout() {
  if (!confirm("Do you want to logout from the quiz portal?")) {
    return;
  }
  authManager.clearSession();
  window.location.href = LOGIN_PAGE;
}

function setSetupMessage(message) {
  setupMessage.textContent = message;
}

function clearSetupMessage() {
  setSetupMessage("");
}

function buildCandidatePill() {
  candidatePill.textContent = `${state.candidate.candidateName} (${state.candidate.rollNumber}) | ${state.candidate.subject}`;
}

function updateTimerUI() {
  timerDisplay.textContent = formatTime(state.timerSeconds);
  timerDisplay.classList.toggle("warning", state.timerSeconds <= 60);
}

function updateProgressUI() {
  const answered = state.answers.filter((answer) => answer !== null).length;
  const total = state.questions.length;
  const percentage = total ? (answered / total) * 100 : 0;
  progressBar.style.width = `${percentage}%`;
  progressStats.textContent = `Answered ${answered}/${total}`;
}

function renderQuestionPalette() {
  questionPalette.innerHTML = "";
  state.questions.forEach((question, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = String(index + 1);
    button.className = "palette-btn";
    if (state.answers[index] !== null) {
      button.classList.add("answered");
    }
    if (index === state.currentIndex) {
      button.classList.add("active");
    }
    button.addEventListener("click", () => {
      state.currentIndex = index;
      renderCurrentQuestion();
    });
    questionPalette.appendChild(button);
  });
}

function selectOption(optionIndex) {
  state.answers[state.currentIndex] = optionIndex;
  renderCurrentQuestion();
}

function renderCurrentQuestion() {
  const currentQuestion = state.questions[state.currentIndex];
  questionMeta.textContent = `Question ${state.currentIndex + 1} of ${state.questions.length} | ${currentQuestion.subject}`;
  questionText.textContent = currentQuestion.question;

  optionsList.innerHTML = "";
  currentQuestion.options.forEach((option, optionIndex) => {
    const wrapper = document.createElement("label");
    wrapper.className = "option-card";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "option";
    input.checked = state.answers[state.currentIndex] === optionIndex;
    input.addEventListener("change", () => selectOption(optionIndex));

    if (input.checked) {
      wrapper.classList.add("selected");
    }

    const optionText = document.createElement("span");
    optionText.textContent = option;

    wrapper.append(input, optionText);
    optionsList.appendChild(wrapper);
  });

  prevBtn.disabled = state.currentIndex === 0;
  nextBtn.disabled = state.currentIndex === state.questions.length - 1;
  submitBtn.textContent =
    state.currentIndex === state.questions.length - 1
      ? "Submit Quiz"
      : "Submit Now";

  updateProgressUI();
  renderQuestionPalette();
}

function stopTimer() {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
}

function startTimer() {
  stopTimer();
  updateTimerUI();
  state.timerId = setInterval(() => {
    if (state.submitted) {
      stopTimer();
      return;
    }

    state.timerSeconds -= 1;
    updateTimerUI();
    if (state.timerSeconds <= 0) {
      submitQuiz("Time expired. Auto-submitted.");
    }
  }, 1000);
}

function calculateResult(reason) {
  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;

  state.questions.forEach((question, index) => {
    const selected = state.answers[index];
    if (selected === null) {
      unanswered += 1;
      return;
    }

    if (selected === question.answer) {
      correct += 1;
    } else {
      incorrect += 1;
    }
  });

  const totalQuestions = state.questions.length;
  const percentage = totalQuestions ? (correct / totalQuestions) * 100 : 0;
  const timeUsedSeconds = Math.max(0, state.totalSeconds - state.timerSeconds);

  return {
    candidateName: state.candidate.candidateName,
    rollNumber: state.candidate.rollNumber,
    subject: state.candidate.subject,
    requestedQuestionCount: state.candidate.requestedQuestionCount,
    totalQuestions,
    correct,
    incorrect,
    unanswered,
    percentage,
    timeUsedSeconds,
    completionReason: reason,
    submittedAt: new Date().toISOString()
  };
}

function renderResultSummary(result) {
  resultSummary.innerHTML = `
    <div class="result-banner">
      <p><strong>Candidate:</strong> ${result.candidateName} (${result.rollNumber})</p>
      <p><strong>Subject:</strong> ${result.subject}</p>
      <p><strong>Status:</strong> ${result.completionReason}</p>
    </div>
    <div class="stat-grid">
      <div class="stat-box"><h3>Score</h3><p>${result.correct}/${result.totalQuestions}</p></div>
      <div class="stat-box"><h3>Percentage</h3><p>${result.percentage.toFixed(2)}%</p></div>
      <div class="stat-box"><h3>Correct</h3><p>${result.correct}</p></div>
      <div class="stat-box"><h3>Incorrect</h3><p>${result.incorrect}</p></div>
      <div class="stat-box"><h3>Unanswered</h3><p>${result.unanswered}</p></div>
      <div class="stat-box"><h3>Time Used</h3><p>${formatTime(result.timeUsedSeconds)}</p></div>
    </div>
  `;
}

function persistResult(result) {
  const existing = getStoredResults();
  existing.push(result);
  setStoredResults(existing);
}

function submitQuiz(reason) {
  if (state.submitted) {
    return;
  }

  state.submitted = true;
  stopTimer();

  const result = calculateResult(reason);
  persistResult(result);
  renderResultSummary(result);
  renderLeaderboard();
  showScreen("result");
}

function parseCandidateForm(formElement) {
  const formData = new FormData(formElement);
  return {
    candidateName: String(formData.get("candidateName") || "").trim(),
    rollNumber: String(formData.get("rollNumber") || "").trim(),
    subject: String(formData.get("subject") || "Mixed (All Subjects)").trim(),
    requestedQuestionCount: Number(formData.get("questionCount")),
    durationMinutes: Number(formData.get("duration"))
  };
}

function startQuiz(candidateData) {
  clearSetupMessage();
  stopTimer();
  state.submitted = false;

  const pool =
    candidateData.subject === "Mixed (All Subjects)"
      ? [...QUESTION_BANK]
      : QUESTION_BANK.filter((question) => question.subject === candidateData.subject);

  if (!pool.length) {
    setSetupMessage("No questions are available for the selected subject.");
    return;
  }

  let finalQuestionCount = candidateData.requestedQuestionCount;
  if (finalQuestionCount > pool.length) {
    finalQuestionCount = pool.length;
    alert(
      `Requested ${candidateData.requestedQuestionCount} questions, but only ${pool.length} are available for ${candidateData.subject}. The quiz will use ${pool.length} questions.`
    );
  }

  state.candidate = candidateData;
  state.questions = shuffle(pool).slice(0, finalQuestionCount);
  state.answers = Array(finalQuestionCount).fill(null);
  state.currentIndex = 0;
  state.totalSeconds = candidateData.durationMinutes * 60;
  state.timerSeconds = state.totalSeconds;

  buildCandidatePill();
  renderCurrentQuestion();
  showScreen("quiz");
  startTimer();
}

function resetForNextCandidate() {
  stopTimer();
  state.candidate = null;
  state.questions = [];
  state.answers = [];
  state.currentIndex = 0;
  state.timerSeconds = 0;
  state.totalSeconds = 0;
  state.submitted = false;

  candidateForm.reset();
  candidateForm.duration.value = "8";
  clearSetupMessage();
  showScreen("setup");
}

function exportResultsAsCsv() {
  const records = getRankedResults(getStoredResults());
  if (!records.length) {
    alert("No results available to export.");
    return;
  }

  const headers = [
    "Rank",
    "Candidate Name",
    "Roll Number",
    "Subject",
    "Correct",
    "Total Questions",
    "Percentage",
    "Incorrect",
    "Unanswered",
    "Time Used (mm:ss)",
    "Completion Reason",
    "Submitted At"
  ];

  const lines = [headers.join(",")];
  records.forEach((record, index) => {
    const values = [
      index + 1,
      record.candidateName,
      record.rollNumber,
      record.subject,
      record.correct,
      record.totalQuestions,
      record.percentage.toFixed(2),
      record.incorrect,
      record.unanswered,
      formatTime(record.timeUsedSeconds),
      record.completionReason,
      formatDate(record.submittedAt)
    ];
    lines.push(values.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(","));
  });

  const csvBlob = new Blob([lines.join("\n")], {
    type: "text/csv;charset=utf-8;"
  });
  const csvUrl = URL.createObjectURL(csvBlob);
  const link = document.createElement("a");
  link.href = csvUrl;
  link.download = `ce-quiz-results-${Date.now()}.csv`;
  link.click();
  URL.revokeObjectURL(csvUrl);
}

candidateForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const candidateData = parseCandidateForm(candidateForm);

  if (
    !candidateData.candidateName ||
    !candidateData.rollNumber ||
    !candidateData.subject ||
    Number.isNaN(candidateData.requestedQuestionCount) ||
    Number.isNaN(candidateData.durationMinutes)
  ) {
    setSetupMessage("Please complete all fields correctly before starting.");
    return;
  }

  if (candidateData.durationMinutes < 1 || candidateData.durationMinutes > 90) {
    setSetupMessage("Duration must be between 1 and 90 minutes.");
    return;
  }

  startQuiz(candidateData);
});

prevBtn.addEventListener("click", () => {
  if (state.currentIndex > 0) {
    state.currentIndex -= 1;
    renderCurrentQuestion();
  }
});

nextBtn.addEventListener("click", () => {
  if (state.currentIndex < state.questions.length - 1) {
    state.currentIndex += 1;
    renderCurrentQuestion();
  }
});

submitBtn.addEventListener("click", () => submitQuiz("Submitted manually."));
nextCandidateBtn.addEventListener("click", resetForNextCandidate);
leaderboardFilter.addEventListener("change", renderLeaderboard);
clearResultsBtn.addEventListener("click", () => {
  const isConfirmed = confirm("Are you sure you want to clear all stored quiz results?");
  if (!isConfirmed) {
    return;
  }
  setStoredResults([]);
  renderLeaderboard();
});
exportResultsBtn.addEventListener("click", exportResultsAsCsv);
if (logoutBtn) {
  logoutBtn.addEventListener("click", handleLogout);
}
window.addEventListener("beforeunload", stopTimer);

setCurrentUserBadge();
renderLeaderboard();
