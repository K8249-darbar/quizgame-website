(() => {
  const firebaseConfig = {
    apiKey: "AIzaSy_demo_key_placeholder",
    authDomain: "quiz-game-applet.firebaseapp.com",
    projectId: "quiz-game-applet",
    storageBucket: "quiz-game-applet.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:demo1234567890"
  };

  window.FirebaseApp = {
    config: firebaseConfig,
    isAvailable: function() {
      return typeof window.firebase !== "undefined" || typeof window.db !== "undefined";
    },
    saveLeaderboardEntry: async function(entry) {
      const STORAGE_KEY = "ce_quiz_results_v1";
      try {
        let currentResults = [];
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          currentResults = JSON.parse(raw);
        }
        currentResults.push(entry);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(currentResults));

        if (window.BroadcastChannel) {
          const bc = new BroadcastChannel("ce_quiz_leaderboard_channel");
          bc.postMessage({ type: "NEW_RESULT", entry });
          bc.close();
        }
        return { success: true, id: "local_" + Date.now() };
      } catch (e) {
        console.warn("Failed to save entry locally:", e);
        return { success: false, error: e };
      }
    }
  };
})();
