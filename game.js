console.log("hp is:", document.getElementById("hp"));
const eventText = document.getElementById("eventText");
const hpDisplay = document.getElementById("hp");
const weaponDisplay = document.getElementById("weapon");

function updateStatus() {
    hpDisplay.innerText = player.hp;
    weaponDisplay.innerText = player.weapon ? player.weapon.name : "None";
    document.getElementById("power").innerText = player.power;
    document.getElementById("evade").innerText = `${Math.floor(player.evade * 100)}%`;
    document.getElementById("attribute").innerText = player.attribute;
    document.getElementById("weaponList").innerText = player.weaponList.join(", ");
    const listEL = document.getElementById("weaponList");
    listEL.innerText = " ";
    player.weaponList.forEach(W => {
        const li = document.createElement("li");
        li.textContent = `${W.name} (Attack +${W.power})`;
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
                playSE("会話8.mp3");
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

function typeText(text, callback) {
    const target = document.getElementById("eventText");
    target.innerText = "";
    let i = 0;

    function showNextChar() {
        if (i < text.length) {
            target.innerText += text[i];
            i++;
            setTimeout(showNextChar, 40); //表示速度
        } else {
            if (callback) callback();
        }
    }

    showNextChar();
}

events.push(makeStartEvent());
showEvent(0);