import React from "react";

export default function AppStatistic() {
  const fetchStatus = React.useRef<"succes" | "crash" | "initial">("initial");

  async function pushStatistic() {
    const statistic =
      navigator.doNotTrack !== "yes"
        ? {
            agent: window.navigator.userAgent,
            language: window.navigator.language,
            dateTIme: Date.now(),
          }
        : { agent: null, language: null, dateTIme: null };

    const response = await fetch(`/statistic/datenote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(statistic),
    });
    if (response.ok) {
      const json = await response.json();
      if (json.savedStatus !== null) {
        fetchStatus.current = "succes";
      } else {
        fetchStatus.current = "crash";
        pushStatistic();
      }
    } else {
      fetchStatus.current = "crash";
      pushStatistic();
    }
  }

  React.useEffect(() => {
    console.log("fetched");
    if (fetchStatus.current !== "succes") {
      pushStatistic();
    }
  });

  return null;
}
