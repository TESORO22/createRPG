const events = [];

function makeStartEvent() {
    return {
        text: "あなたは、森の入り口に立っている・・・",
        choices: [
            {
                label: "森に入る",
                action: function () {
                        /*eventText.innerText = "木の枝を拾った。";
                        document.getElementById("choices").innerHTML = `
                            <button onclick="showNextEvent()">進む</button>
                    `;*/
                    //playSE("play.mp3");
                    //setBackground("image/forest-4996811_640.jpg");
                    //changeHP(-10);
                    addWeapon("Stick");
                    stepForward();
                    showNextEvent();
                    //showEvent(events.length - 1);
                }
            }/*,
            {
                label: "篝火を焚く",
                action: function () {
                    changeHP(5);
                    stepForward();
                    showNextEvent();
                    //showEvent(events.length - 1);
                }
            }*/
        ]
    };
}


function makeCrossroadEvent() {
    const road=[ {
        text: "何もない道だ。左右に道が続いている。",
        choices: [
            {
                label: "右へ進む",
                action: function () {
                    stepForward();
                    showNextEvent("right");
                }
            },
            {
                label: "左へ進む",
                action: function () {
                    stepForward();
                    showNextEvent("left");
                }
            }
        ]
    },
    {
        text: "行き止まりだ。",
        choices: [
            {
                label: "引き返す",
                action: function () {
                    stepForward();
                    showNextEvent();
                }
            }
        ]
    },
    {
        text: "この森は、どうやったら抜けられるのだろうか？",
        choices: [
            {
                label: "右へ進む",
                action: function () {
                    stepForward();
                    showNextEvent("right");
                }
            },
            {
                label: "左へ進む",
                action: function () {
                    stepForward();
                    showNextEvent("left");
                }
            }
        ]
    },
        {
        text: "目指す先は、まだまだ遠そうだ。",
        choices: [
            {
                label: "前へ進む",
                action: function () {
                    stepForward();
                    showNextEvent();
                }
            }
        ]
    },
];
    const idxRoad = Math.floor(Math.random() * road.length);
    return road[idxRoad];
}


function makeRightEvent() {
    const poolR= [ {
        text: "神殿のような光に満ちた場所に出た。祝福を受けることができる",
        choices: [
            {
                label: "祝福を受ける",
                action: function () {
                    stepDown(2);
                    changeHP(+10);
                    showNextEvent();
                }
            },
            {
                label: "通り過ぎる",
                action: function () {
                    stepForward();
                    showNextEvent();
                }
            }
        ]
    },
    {
        text: "突如現れた神々しい石碑に刻まれた女神は、あなたを見ている・・・",
        choices: [
            {
                label: "祈る",
                action: function () {
                    player.attribute = "holy";
                    stepDown(2);
                    updateStatus();
                    showNextEvent();
                }
            },
            {
                label: "無視する",
                action: function () {
                    stepForward();
                    showNextEvent();
                }
            }
        ]
    },
        {
        text: "足元に食べられそうな草を発見した。",
        choices: [
            {
                label: "食べる",
                action: function () {
                    changeHP(15);
                    updateStatus();
                    stepForward();
                    showNextEvent();
                }
            },
            {
                label: "食べない",
                action: function () {
                    stepForward();
                    showNextEvent();
                }
            }
        ]
    },
];
    const idxR = Math.floor(Math.random() * poolR.length);
    return poolR[idxR];
}

function makeLeftEvent() {
    const poolL = [ {
        text: "正体不明の真っ赤な川が現れた。向こう岸には、キラリと光るものがある。",
        choices: [
            {
                label: "渡る",
                action: function () {
                    changeHP(-10);
                    addWeapon("Curse Blade");
                    stepForward();
                    showNextEvent();
                }
            },
            {
                label: "引き返す",
                action: function () {
                    stepForward();
                    showNextEvent();
                }
            }
        ]
    },
{
        text: "邪悪な偶像が倒れている。直すこともできるが・・・",
        choices: [
            {
                label: "直す",
                action: function () {
                    player.attribute = "evil";
                    stepDown(3);
                    updateStatus();
                    showNextEvent();
                }
            },
            {
                label: "通り過ぎる",
                action: function () {
                    stepForward();
                    showNextEvent();
                }
            }
        ]
    },
    {
        text: "人ではない何かが自分を呼んでいる。",
        choices: [
            {
                label: "先に進む",
                action: function () {
                    changeHP(-30);
                    stepDown(-1);
                    updateStatus();
                    stepForward();
                    showNextEvent();
                }
            }
        ]
    },
     {
        text: "森からもう自分は出られないのではないかと思った。",
        choices: [
            {
                label: "それでも先に進む",
                action: function () {
                    changeHP(+100)
                    updateStatus();
                    stepForward();
                    showNextEvent();
                }
            },
             {
                label: "引き返す",
                action: function () {
                        eventText.innerText = "恐ろしい妄想に支配される。気分が悪い。";
                        document.getElementById("choices").innerHTML = `
                            <button onclick="showNextEvent()">進む</button>
                    `;
                    playSE("play.mp3");
                    changeHP(-50)
                    updateStatus();
                    stepForward();
                }
            },
        ]
    },
];
    const idxL = Math.floor(Math.random() * poolL.length);
    return poolL[idxL];
}

function getRandomEvent() {
    const skeleton = new Enemy("スケルトン", 15, 8, "cursed");
    const gob = new Enemy("ゾンビ", 11, 6, "cursed",0.1);
    const pool = [
        {
            text: "木陰から、さまよう骨が突然現れた！",
            choices: [
                { label: "戦う", action: function () { battle(skeleton); } },
                { label: "無視する", action: function () { changeHP(-5); stepForward(); showNextEvent(); } }
            ]
        },
        {
            text: "人間と出会った。ポーションを売っているらしい。",
            choices: [
                { label: "買う", action: function () { changeHP(+30); stepForward(); showNextEvent(); } },
                { label: "無視", action: function () { stepForward(); showNextEvent(); } }
            ]
        },
        {
            text: "何もない。前に進もう。",
            choices: [{
                label: "進む",
                action: function () {
                    //changeHP(-10);
                    addWeapon("Stick");
                    stepForward();
                    showNextEvent();

                }
            },
            {
                label: "篝火を焚く",
                action: function () {
                        eventText.innerText = "体力を少し回復した。";
                        document.getElementById("choices").innerHTML = `
                            <button onclick="showNextEvent()">進む</button>
                    `;
                    changeHP(5);
                    stepForward();
                    //showNextEvent();

                }
            }]
        },
        {
            text: "倒れている旅人を見つけた。まだ息がありそうだ。どうする？",
            choices: [
                {
                    label: "助ける",
                    action: function () {
                        eventText.innerText = "旅人は敵と勘違いして切りかかってきた。";
                        document.getElementById("choices").innerHTML = `
                            <button onclick="showNextEvent()">進む</button>
                    `;
                        playSE("play.mp3");
                        changeHP(-5);
                        stepForward();
                        //showNextEvent();
                    }
                },
                {
                    label: "無視して通り過ぎる",
                    action: function () {
                        changeHP(+0);
                        stepForward();
                        showNextEvent();
                    }
                }
            ]
        },
        {
            text: "敵が現れた！戦う？逃げる？",
            choices: [
                {
                    label: "戦う",
                    action: function () {
                        battle(gob);
                        stepForward();
                        //showNextEvent();
                    }
                },
                {
                    label: "逃げる",
                    action: function () {
                        eventText.innerText = "あなたは逃げ出した。勇者は逃げない。ゲームオーバー。";
                        document.getElementById("choices").innerHTML = `<button onclick="restartGame()">最初から</button>`;
                    }
                }
            ]
        },
        {
            text: "宝箱を発見した！開ける？",
            choices: [
                {
                    label: "開ける",
                    action: function () {
                        addWeapon("Legendary Sword");
                        eventText.innerText = "伝説の剣を手に入れた！";
                        document.getElementById("choices").innerHTML = "";
                        stepForward();
                        showNextEvent();
                    }
                },
                {
                    label: "無視して進む",
                    action: function () {
                        eventText.innerText = "あなたは静かにその場を立ち去った。";
                        document.getElementById("choices").innerHTML = "";
                        stepForward();
                        showNextEvent();
                    }
                }
            ],
            text: `${skeleton.name} が現れた！`,
            choices: [
                {
                    label: "戦う",
                    action: function () {
                        battle(skeleton,player);
                    }
                },
                {
                    label: "逃げる",
                    action: function () {
                        eventText.innerText = "あなたは逃げた。逃げることも、時には必要だ。";
                        document.getElementById("choices").innerHTML = `
                            <button onclick="showNextEvent()">進む</button>
                        `;
                        playSE("play.mp3");
                    }
                }
            ]
        },
         {
        text: "泉を見つけた。まっさらな気分になれそうだ。",
        choices: [
            {
                label: "泉に触れる",
                action: function () {
                    player.attribute = "neutral";
                    stepDown(1);
                    updateStatus();
                    showNextEvent();
                }
            },
            {
                label: "立ち去る",
                action: function () {
                    stepForward();
                    showNextEvent();
                }
            }
        ]
    },
             {
        text: "この森から出るには、運が必要なのではないか。",
        choices: [
            {
                label: "先に進む",
                action: function () {
                    stepForward();
                    showNextEvent();
                }
            }
        ]
    },
             {
        text: "森の精霊が現れた。彼は、手のひらの上の草を体力全快の草だと言っている。",
        choices: [
            {
                label: "食べる",
                action: function () {
                    changeHP(-150);
                    stepDown(5);
                    updateStatus();
                    showNextEvent();
                }
            },
            {
                label: "立ち去る",
                action: function () {
                    stepForward();
                    showNextEvent();
                }
            }
        ]
    },
                 {
        text: "Stepとは、何を表しているのだろうか？",
        choices: [
            {
                label: "考える",
                action: function () {
                    eventText.innerText = "どうやら、長旅はできないようだ。";
                        document.getElementById("choices").innerHTML = `
                            <button onclick="showNextEvent()">進む</button>
                    `;
                    playSE("play.mp3");
                }
            },
            {
                label: "気にしない",
                action: function () {
                    stepForward();
                    showNextEvent();
                }
            }
        ]
    },
    ];
    const idx = Math.floor(Math.random() * pool.length);
    return pool[idx];
}

function makeEndingEvent() {
    if (hp > 50 && weapon === "Legendary Sword") {
        return {
            text: "あなたは伝説の剣を手に森を切り開き、光の王となった…",
            choices: [{ label: "もう一度始める", action: restartGame }]
        };
    } else {
        return {
            text: "あなたは森から出ることは出来なかった・・・",
            choices: [{ label: "もう一度始める", action: restartGame }]
        };
    }
}

