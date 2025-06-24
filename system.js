const audio = document.getElementById("bgm");

function changeHP(amount) {
    player.hp += amount;
    updateStatus();
    if (amount > 0) {
        playSE("little_cure.mp3");
    } else {
        playSE("doon.mp3");
    }
    if (player.hp <= 0) {
        handleDeath();
        return true;
    }

    return false;
}

function handleDeath() {
    const messagesLost = [
        "力尽きた・・・",
        "あなたは森の中で息を引き取った。",
    ];
    countBadEnd();
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }

    eventText.innerText = "";
    document.getElementById("choices").innerHTML = "";

    messagesLost.forEach((line, index) => {
        setTimeout(() => {
            eventText.innerText += line + "\n";
            if (index === messagesLost.length - 1) {
                document.getElementById("choices").innerHTML = `
                    <button onclick="restartGame()">最初から</button>
                `;
            }
        }, index * 1000);
    });
}


function addWeapon(name) {
    const weaponData = weapons[name];
    console.log(weaponData);
    if (player.weaponList.find(w => w.name === name)) return;

    if (weaponData) {
        player.weaponList.push({
            name: name,
            power: weaponData.power,
            attribute: weaponData.attribute || "neutral",
        });
        updateStatus();
    }

    updateStatus();
}

function battle(enemy) {
    let total = player.power;
    let p = 0;
    console.log(player.weaponList);
    if (player.weaponList.length > 0) {
        player.weaponList.forEach(w => {
            if (p < w.power) {
                p = w.power;
                console.log(p);
            }
        });
    }
    total += p;
    console.log("totalPower:" + total);
    const attrRate = getAttributeMultiplier(player.attribute, enemy.attribute);
    total = Math.floor(total * attrRate);

    const evadeRoll = Math.random();

    if (evadeRoll < player.evade) {
        eventText.innerText = "奇跡！　攻撃を回避し、その隙に一撃を入れた。勝利！";
        document.getElementById("choices").innerHTML = `
        <button onclick="showNextEvent()">進む</button>
    `;
        playSE("shu.mp3");
    } else if (total >= enemy.hp) {
        const messagesWin = [
            "あなたの攻撃！",
            "致命的な一撃を与えた！",
            "勝利！"
        ];
        playSE("zubashu.mp3");
        eventText.innerText = ""; // 初期化

        messagesWin.forEach((line, index) => {
            setTimeout(() => {
                eventText.innerText += line + "\n";
            }, index * 1000); // 1秒ずつ表示
        });
        document.getElementById("choices").innerHTML = `
        <button onclick="showNextEvent()">進む</button>
    `;
        if (enemy.name === "竜") {
            player.bag = "赤の宝玉";
            document.getElementById("bag").innerText = player.bag;
            player.evade += 0.4;
            document.getElementById("evade").innerText = `${Math.floor(player.evade * 100)}%`;
        }
    } else {
        const messagesLose = [
            "致命的な一撃を受けて倒れた。",
            "あなたは敵に負けた…",
            "ゲームオーバー。"
        ];
        //changeHP(-1000);
        player.hp -= 1000;
        updateStatus();
        playSE("akuma.mp3");
        audio.pause();
        audio.currentTime = 0;
        eventText.innerText = ""; // 初期化

        messagesLose.forEach((line, index) => {
            setTimeout(() => {
                eventText.innerText += line + "\n";
            }, index * 1000); // 1秒ずつ表示
        });

        document.getElementById("choices").innerHTML = `<button onclick="restartGame()">最初から</button>`;
    }
}

let stepCount = 0;

function stepForward() {
    stepCount++;
    console.log("Step数 : ", stepCount);
    document.getElementById("step").innerHTML = "Step:" + stepCount;
}

function stepDown(amount) {
    stepCount -= amount;
    console.log("Step数 : ", stepCount);
    document.getElementById("step").innerHTML = "Step:" + stepCount;
}

function restartGame() {
    player.hp = 100;
    player.power = 10;
    player.evade = 0.1;
    player.attribute = "neutral";
    player.weapon = null;
    player.weaponList = [];

    stepCount = 0;
    updateStatus();

    events.length = 0;
    events.push(makeStartEvent());
    showEvent(0);
}
function getTotalPower() {
    let total = player.power;
    let p = 0;
    if (weaponList.length > 0) {
        weaponList.forEach(w => {
            if (p < Number[w]) {
                p = Number[w];
            }
        });
    }
    total += p;
    return total;
}

function getAttributeMultiplier(attackerAttr, defenderAttr) {
    if (attackerAttr === "neutral" || defenderAttr === "neutral") {
        return 1.0;
    }
    if ((attackerAttr === "holy" && defenderAttr === "evil") ||
        (attackerAttr === "evil" && defenderAttr === "holy")) {
        return 1.2;
    }
    return 1.0;
}


function setBackground(imagePath) {
    const bg = document.getElementById("background");
    bg.style.backgroundImage = `url('${imagePath}')`;
}


function setObjectImage(imagePath) {
    const obj = document.getElementById("object-image");
    obj.style.backgroundImage = imagePath ? `url('${imagePath}')` : "none";
}

let inputBuffer = [];

function listenForSecretInput() {
    inputBuffer = [];
    document.addEventListener("keydown", handleSecretInput);
}

function handleSecretInput(e) {
    const keyMap = {
        ArrowUp: "8",
        ArrowDown: "2",
        ArrowLeft: "4",
        ArrowRight: "6"
    };
    if (keyMap[e.key]) {
        inputBuffer.push(keyMap[e.key]);

        if (inputBuffer.length > 10) {
            inputBuffer.shift();
        }

        const Answer = ["8", "2", "4", "6"];
        console.log(inputBuffer);
        if (inputBuffer.join("") === Answer.join("")) {
            document.removeEventListener("keydown", handleSecretInput);
            triggerEscapeEnding();
        }
    }
}

function hasAttribute(attr) {
    return player.attribute === attr;
}

function countBadEnd() {
    const count = Number(localStorage.getItem("badEnds") || "0") + 1;
    localStorage.setItem("badEnds", count);
    return count;
}