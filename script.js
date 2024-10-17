let cookieCount = 0;
let cookiesPerClick = 1;
let cookiesPerSecond = 0;
let upgradeCost = 50;
let upgradeCount = 0;

function updateDisplay(){
    document.getElementById('cookieCount').textContent = "Cookies: " + Math.floor(cookieCount);
    document.getElementById('upgradeMessage').textContent = "Upgrades: " + Math.floor(upgradeCount);
    document.getElementById('upgradeButton').textContent = " Buy Upgrade (Cost: " + Math.floor(upgradeCost) + " Cookies)";
}



function saveGameState(){
    localStorage.setItem('cookieCount',cookieCount);
    localStorage.setItem('upgradeCount', upgradeCount);
    localStorage.setItem('upgradeCost',upgradeCost);
    localStorage.setItem('cookiePerSecond',cookiesPerSecond);



}

function loadGameState(){
    const saveCookieCount = localStorage.getItem('cookieCount');
    const saveUpgradeCount = localStorage.getItem('upgradeCount');
    const saveUpgradeCost = localStorage.getItem('upgradeCost',upgradeCost);
    const saveCookiesPerSecond = localStorage.getItem('cookiesPerSecond',cookiesPerSecond);
    
    if (saveCookieCount !== null){
        cookieCount = parseFloat(saveCookieCount);
    }
    if (saveUpgradeCount !== null){
        upgradeCount = parseFloat(saveUpgradeCount);
    }
    if (saveUpgradeCost !== null){
        upgradeCost = parseFloat(saveUpgradeCost);
    }
    if (saveCookiesPerSecond !== null){
        cookiesPerSecond = parseFloat(saveCookiesPerSecond);
    }

    updateDisplay();
}






document.getElementById('cookie').addEventListener('click',function(){
    cookieCount += cookiesPerClick;
    updateDisplay();
    saveGameState();
    if (cookieCount >= upgradeCost) {
        document.getElementById('upgradeButton').disabled = false;
    }
});

document.getElementById('upgradeButton').addEventListener('click', function(){

    if (cookieCount >= upgradeCost) {
        cookieCount -= upgradeCost;
        upgradeCount++;
        cookiesPerSecond++;
        upgradeCost *= 1.4;
        updateDisplay();
        saveGameState();
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6}
        });
    }

    if (cookieCount < upgradeCost) {
        document.getElementById('upgradeButton').disabled = true;
    }
    
});

setInterval(function(){
    cookieCount+=cookiesPerSecond;
    updateDisplay();
    saveGameState();
}, 1000);

window.onload = function(){
    loadGameState();
};