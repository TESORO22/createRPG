console.log("hp is:", document.getElementById("hp"));
const eventText = document.getElementById("eventText");
const hpDisplay = document.getElementById("hp");
const weaponDisplay = document.getElementById("weapon");

function updateStatus() {
    hpDisplay.innerText = player.hp;
    document.getElementById("bag").innerText = player.bag ? player.bag : "なし";;
    document.getElementById("power").innerText = player.power;
    document.getElementById("evade").innerText = `${Math.floor(player.evade * 100)}%`;
    document.getElementById("attribute").innerText = player.attribute;
    document.getElementById("weaponList").innerText = player.weaponList.join(", ");
    const listEL = document.getElementById("weaponList");
    listEL.innerText = " ";
    player.weaponList.forEach(W => {
        const li = document.createElement("li");
        li.textContent = `${W.name} (攻撃力 +${W.power})`;
        listEL.appendChild(li);
    })
}

function showEvent(index) {
    const event = events[index];
    typeText(event.text, () => { // テキスト表示後に選択肢ボタンを出す
        event.choices.forEach(choice => {
            const btn = document.createElement("button");
            btn.innerText = choice.label;
            btn.onclick = function () {
                const allBtns = document.querySelectorAll("#choices button");
                allBtns.forEach(b => b.disabled = true);
                //playSE("会話8.mp3");
                choice.action();
            };
            document.getElementById("choices").appendChild(btn);
        });
    });
    document.getElementById("choices").innerHTML = "";

}

function showNextEvent(direction = null) {
    if (stepCount >= 15) {
        events.push(makeEndingEvent());
        audio.pause();
        audio.currentTime = 0;
    } else {
        if (direction === "right") {
            events.push(Math.random() < 0.5 ? makeRightEvent() : getRandomEvent());
        } else if (direction === "left") {
            events.push(Math.random() < 0.5 ? makeLeftEvent() : getRandomEvent());
        } else {
            events.push(makeCrossroadEvent());
        }
    }

    showEvent(events.length - 1);
}




function playSE(name) {
    const se = new Audio(`se/${name}`);
    se.play();
}

let typingSE = null;

function typeText(text, callback) {
    let i = 0;
    eventText.innerText = "";

    if (typingSE) {
        typingSE.pause();
        typingSE.currentTime = 0;
    }

    typingSE = new Audio("se/会話8.mp3");
    typingSE.loop = true;
    typingSE.play();

    if (text.length === 0) {
        typingSE.pause();
        typingSE.currentTime = 0;
        typingSE = null;
        if (callback) callback();
        return;
    }

    const interval = setInterval(() => {
        eventText.innerText += text[i];
        i++;
        if (i >= text.length) {
            clearInterval(interval);

            if (typingSE) {
                typingSE.pause();
                typingSE.currentTime = 0;
                typingSE = null;
            }

            if (callback) callback();
        }
    }, 50); // 文字速度調整
}

events.push(makeStartEvent());
showEvent(0);

function talkToNPC() {
    fetch("npcDialogue.json")
        .then(response => response.json())
        .then(data => {
            const badEnds = Number(localStorage.getItem("badEnds") || 0);
            let lines;

            if (badEnds > 4) {
                lines = data.hints2;
            } else if (badEnds >= 2) {
                lines = data.hint1;
            } else {
                const lineData = data.default;
                lines = lineData[Math.floor(Math.random() * lineData.length)];
            }
            typeText(lines.join("\n"), () => {
                document.getElementById("choices").innerHTML = `
          <button onclick="showNextEvent()">進む</button>
        `;
            });
        })
        .catch(err => {
            console.log("NPCデータが読み込みませんでした：", err);
            typeText("旅人はあなたを一瞥して、どこかに去っていった。");
            document.getElementById("choices").innerHTML = `
          <button onclick="showNextEvent()">進む</button>
        `;
        });
}