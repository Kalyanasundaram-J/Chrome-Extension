document.addEventListener("DOMContentLoaded", () => {
    const date = new Date().toLocaleDateString();
    chrome.storage.local.get("currentRewardPoint", (result) => {
        const rewardPoint = result.currentRewardPoint;
        console.log("reward point", rewardPoint);
        document.getElementById("rewardPoint").textContent = rewardPoint;
    });
    console.log(localStorage.getItem("rewardPoint"));
    console.log("chrome local storage", chrome.storage.local);

    if (!localStorage.getItem("lastExecuted")) {
        localStorage.setItem("lastExecuted", date);
    } else if (localStorage.getItem("lastExecuted") < date) {
        localStorage.setItem("lastExecuted", date);
        chrome.runtime.sendMessage({ startTodayExecution: "True" });
    }
    // chrome.storage.local.get("todayCollectedPoints", (result) => {
    //     const todayRewardPoint = result.todayCollectedPoints;
    //     document.getElementById("rewardCount").textContent = todayRewardPoint;
    // });
    const restartButton = document.getElementById("restartButton");
    restartButton.addEventListener("click", function () {
        chrome.runtime.sendMessage({ restartRewardCollection: "True" });
    });
});
