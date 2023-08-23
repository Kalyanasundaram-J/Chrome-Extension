function main() {
    init()
    if(localStorage.getItem('microsoftRewardStatus') === "START" && Number(localStorage.getItem('currentRewardPoint')) < 102) {
        localStorage.setItem('currentRewardPoint',Number(localStorage.getItem('currentRewardPoint'))+3)
        startAutoSearch()
    }
    if(Number(localStorage.getItem('currentRewardPoint')) == 102)
    {
        localStorage.setItem('microsoftRewardStatus',"STOP")
    }
    // handleCollectedRewardChange()
}
function init() {
    if(!localStorage.getItem('microsoftRewardStatus')) {
        localStorage.setItem('microsoftRewardStatus',"STOP");
    }
    if(!localStorage.getItem('currentRewardPoint')) {
        localStorage.setItem('currentRewardPoint',0);
    }
    setTimeout(()=>{handleRewardPointChange()},3000);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if((message.startTodayExecution && message.startTodayExecution === "True") || (message.restartRewardCollection && message.restartRewardCollection === "True")) {
        localStorage.setItem('microsoftRewardStatus',"START");
        localStorage.setItem('currentRewardPoint',0);
        startAutoSearch()
    }
});


function handleRewardPointChange() {
    const rewardPoint = document.getElementById("id_rc");
    if(rewardPoint) {
        chrome.runtime.sendMessage({currentRewardPoint:rewardPoint.textContent});
    }
}

// function handleCollectedRewardChange() {
//     const rewardPointCollectedToday = localStorage.getItem('currentRewardPoint');
//     if(rewardPointCollectedToday) {
//         chrome.runtime.sendMessage({rewardPointCollectedToday})
//     }

// }

main()


async function startAutoSearch() {
    const currentUrl = window.location.href;
    const urlSearchParams = new URLSearchParams(currentUrl.split('?')[1]);
    let searchParam = "microsoft rewards";
    if(urlSearchParams.has('q')) {
        searchParam = urlSearchParams.get('q');
    }
    const newUrlSearchParams = new URLSearchParams();
    newUrlSearchParams.set('q', searchParam + 's');
    const newUrl = `https://www.bing.com/search?${newUrlSearchParams.toString()}`;
    setTimeout(()=>{window.location.href = newUrl},1000)
}