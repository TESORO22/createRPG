const events = [];
audio.pause();
let paperFlag = true;
let neutralFlag = true;
let flagNum = -1;

function makeStartEvent() {
    return {
        text: "あなたは、森の入り口に立っている・・・",
        choices: [
            {
                label: "森に入る",
                action: function () {
                    audio.volume = 0.4;
                    audio.play();
                    addWeapon("木の枝");
                    listenForSecretInput();
                    stepForward();
                    showNextEvent();
                }
            }
        ]
    };
}


function makeCrossroadEvent() {
    const road = [{
        text: "人か獣か、踏み跡は左右に続いている。",
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
                    //stepForward();
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
    {
        text: "ふと振り向くと、歩いてきたはずの道は落ち葉に覆われていた。",
        choices: [
            {
                label: "前へ進む",
                action: function () {
                    //stepForward();
                    showNextEvent();
                }
            }
        ]
    },
    {
        text: "暗い森の道は、無限に続いているように感じる・・・",
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
    {
        text: "分かれ道だ。",
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
        text: "森の形は、歩みを進めるたびに変化しているのではないか。",
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
        text: "誰かに見られているような気がする。",
        choices: [
            {
                label: "右へ走る",
                action: function () {
                    stepForward();
                    showNextEvent("right");
                }
            },
            {
                label: "左へ走る",
                action: function () {
                    stepForward();
                    showNextEvent("left");
                }
            }
        ]
    },
    {
        text: "森も、自分自身もループしているのではないだろうか？",
        choices: [
            {
                label: "進む",
                action: function () {
                    stepForward();
                    showNextEvent();
                }
            }
        ]
    },
    {
        text: "この道は、既に来たことがあるような気がする・・・",
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
        text: "行き止まりだ。しかし、そこには紙が落ちていた。",
        choices: [
            {
                label: "拾いに行く",
                action: function () {
                    document.getElementById("choices").innerHTML = "";
                    if (hasAttribute("neutral")) {
                        typeText("『森から抜け出すには、３つの方法がある、運か、実力か、知恵か。』\n ...そう書かれていた。");
                        updateStatus();
                    } else {
                        typeText("紙は、風に舞いどこかに消えてしまった。");
                    }
                    stepForward();
                    document.getElementById("choices").innerHTML = `
                            <button onclick="showNextEvent()">進む</button>
                        `;
                }
            },
            {
                label: "引き返す",
                action: function () {
                    document.getElementById("choices").innerHTML = "";
                    if (paperFlag == true) {
                        typeText("森は、迷い込んだ者の思想や行動を見ている。\n それは、あの紙も例外ではないだろう...");
                        paperFlag = false;
                    } else {
                        typeText("この森には意思があるのかもしれない。");
                        stepDown(1);
                    }
                    stepForward();
                    document.getElementById("choices").innerHTML = `
                            <button onclick="showNextEvent()">進む</button>
                    `;
                }
            }
        ]
    },
        {
        text: "大きな木の幹に、中立を示す魔術印が描かれている。",
        choices: [
            {
                label: "触れる",
                action: function () {
                    document.getElementById("choices").innerHTML = "";
                    if (hasAttribute("neutral") && neutralFlag == true) {
                        typeText("印から、強い力を感じる。");
                        changeHP(50);
                        player.evade += 0.15;
                        neutralFlag = false;
                        updateStatus();
                    } else if(neutralFlag == false) {
                        typeText("もう何も起こらない。");
                    }else {
                        typeText("触れた途端、強い痛みを感じた。");
                        player.attribute = "neutral";
                        changeHP(-50);
                        updateStatus();
                    }
                    stepForward();
                    document.getElementById("choices").innerHTML = `
                            <button onclick="showNextEvent()">進む</button>
                        `;
                }
            },
            {
                label: "無視する",
                action: function () {
                    document.getElementById("choices").innerHTML = "";
                    typeText("いったい誰が？");
                    paperFlag = false;
                    stepForward();
                    document.getElementById("choices").innerHTML = `
                            <button onclick="showNextEvent()">進む</button>
                    `;
                }
            }
        ]
    },
    ];
    let idxRoad;
    do {
        idxRoad = Math.floor(Math.random() * road.length);
    } while (road.length > 1 && idxRoad === flagNum); // 前回と同じは回避

    flagNum = idxRoad;
    return road[idxRoad];
}


function makeRightEvent() {
    const poolR = [{
        text: "明るい光に満ちた場所に出た。",
        choices: [
            {
                label: "光を浴びる",
                action: function () {
                    if (player.attribute === "holy" || player.attribute === "neutral") {
                        stepDown(2);
                        changeHP(+10);
                        showNextEvent();
                    } else {
                        document.getElementById("choices").innerHTML = "";
                        typeText("思考が浄化されていく・・・");
                        player.attribute = "neutral";
                        document.getElementById("choices").innerHTML = `
                            <button onclick="showNextEvent()">進む</button>
                    `;
                    }
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
        text: "袋小路で、食べられそうな草を発見した。",
        choices: [
            {
                label: "食べる",
                action: function () {
                    changeHP(30);
                    updateStatus();
                    stepForward();
                    showNextEvent();
                }
            },
            {
                label: "食べずに引き返す",
                action: function () {
                    stepDown(1);
                    //stepForward();
                    showNextEvent();
                }
            }
        ]
    },
    {
        text: "木の葉が落ちてきた。",
        choices: [
            {
                label: "観察する",
                action: function () {
                    eventText.innerText = "木の葉は、上から八の字で落ちてきた。";
                    playSE("hirameki.mp3");
                    listenForSecretInput();
                    document.getElementById("choices").innerHTML = `
                            <button onclick="showNextEvent()">進む？</button>
                    `;
                }
            },
            {
                label: "通り過ぎる",
                action: function () {
                    stepForward();
                    showNextEvent();
                }
            },
        ]
    },
    {
        text: "木で作られた小さな祠を見つけた。",
        choices: [
            {
                label: "祈る",
                action: function () {
                    document.getElementById("choices").innerHTML = "";
                    if (hasAttribute("holy")) {
                        typeText("身体がかなり身軽になるのを感じた。");
                        player.evade += 0.3;
                        updateStatus();
                    } else {
                        typeText("信仰が足りないようだ。");
                    }
                    stepForward();
                    document.getElementById("choices").innerHTML = `
                            <button onclick="showNextEvent()">進む</button>
                        `;
                }
            },
            {
                label: "立ち去る",
                action: function () {
                    document.getElementById("choices").innerHTML = "";
                    typeText("思想と結果は一致する。");
                    stepForward();
                    document.getElementById("choices").innerHTML = `
                            <button onclick="showNextEvent()">進む</button>
                    `;
                }
            }
        ]
    },
    {
        text: "生きている人間に出逢った。",
        choices: [
            {
                label: "近づく",
                action: function () {
                    //typeText("旅人は語りかけてきた。");
                    document.getElementById("choices").innerHTML = "";
                    talkToNPC();
                }
            },
            {
                label: "無視して進む",
                action: function () {
                    document.getElementById("choices").innerHTML = "";
                    typeText("この森に、なぜ生きている人間が？");
                    stepForward();
                    document.getElementById("choices").innerHTML = `
                            <button onclick="showNextEvent()">進む</button>
                        `;
                    //showNextEvent();
                }
            }
        ]
    },
    ];
    const idxR = Math.floor(Math.random() * poolR.length);
    return poolR[idxR];
}

function makeLeftEvent() {
    const poolL = [{
        text: "赤い川が現れた。向こう岸に、光るものが見える。",
        choices: [
            {
                label: "渡る",
                action: function () {
                    const died = changeHP(-50);
                    if (died) return;
                    playSE("hirameki.mp3");
                    addWeapon("血塗れの剣");
                    stepForward();
                    showNextEvent();
                }
            },
            {
                label: "引き返す",
                action: function () {
                    //stepForward();
                    showNextEvent();
                }
            }
        ]
    },
    {
        text: "邪悪な怪物を象った偶像が倒れている。直すこともできるが・・・",
        choices: [
            {
                label: "直す",
                action: function () {
                    playSE("computer_down.mp3");
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
        text: "人ではない何かが自分を呼んでいる・・・",
        choices: [
            {
                label: "先に進む",
                action: function () {
                    document.getElementById("choices").innerHTML = "";
                    if (player.attribute === "evil") {
                        typeText("呼びかけに答えると、羽の生えた怪物が現れ、力を分け与えた。", function () {
                            changeHP(50);
                            player.power += 15;
                            updateStatus();
                            document.getElementById("choices").innerHTML = `
                            <button onclick="showNextEvent()">進む</button>
                            `;
                        });
                    } else {
                        typeText("得体のしれないものが自分を呼んでいる恐怖で、体が震えた。", function () {
                            document.getElementById("choices").innerHTML = `
                            <button onclick="showNextEvent()">進む</button>
                            `;
                        });
                        const died = changeHP(-30);
                        if (died) return;
                    }
                    stepDown(-1);
                    updateStatus();
                    stepForward();
                    //showNextEvent();
                }
            }
        ]
    },
    {
        text: "これ以上進むと、森からもう出られないのではないかと思った。",
        choices: [
            {
                label: "決意して進む",
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
                    document.getElementById("choices").innerHTML = "";
                    typeText("悪い思考は体を蝕む。気分が悪い。", function () {
                        document.getElementById("choices").innerHTML = `
                            <button onclick="showNextEvent()">進む</button>
                            `;
                    });
                    playSE("play.mp3");
                    const died = changeHP(-20);
                    if (died) return;
                    updateStatus();
                    //stepForward();
                }
            },
        ]
    },
    {
        text: "ふと見た道端の石に、文字が刻まれていた。",
        choices: [
            {
                label: "観察する",
                action: function () {
                    document.getElementById("choices").innerHTML = "";
                    typeText("『方向は、数字で表すことができる』　どういうことだろう。", function () {
                        document.getElementById("choices").innerHTML = `
                        <button onclick="showNextEvent()">進む</button>
                        `;
                    });
                    playSE("hirameki.mp3");
                    listenForSecretInput();
                }
            },
            {
                label: "通り過ぎる",
                action: function () {
                    stepForward();
                    showNextEvent();
                }
            },
        ]
    },
    {
        text: "道端に、得体の知れない呪符が落ちていた。",
        choices: [
            {
                label: "手に取る",
                action: function () {
                    document.getElementById("choices").innerHTML = "";
                    if (hasAttribute("evil")) {
                        typeText("拾うと、あなたの体に変化が生じた。筋肉が隆起する。");
                        player.power += 10;
                        player.evade = 0.01;
                        updateStatus();
                    } else {
                        typeText("思考が黒く染まっていく・・・");
                        player.attribute = "evil";
                        const died = changeHP(-50);
                        if (died) return;
                    }
                    stepForward();
                    document.getElementById("choices").innerHTML = `
                            <button onclick="showNextEvent()">進む</button>
                        `;
                }
            },
            {
                label: "立ち去る",
                action: function () {
                    document.getElementById("choices").innerHTML = "";
                    typeText("やめておいたほうがいい。");
                    stepForward();
                    document.getElementById("choices").innerHTML = `
                            <button onclick="showNextEvent()">進む</button>
                    `;
                }
            }
        ]
    },
    ];
    const idxL = Math.floor(Math.random() * poolL.length);
    return poolL[idxL];
}

function getRandomEvent() {
    const skeleton = new Enemy("スケルトン", 15, 60, "evil");
    const gob = new Enemy("ゴブリン", 10, 45, "evil", 0.1);
    const Spir = new Enemy("精霊", 30, 100, "holy", 0.2);
    const dra = new Enemy("竜", 50, 1000, "neutral", 0.5);
    const pool = [
        {
            text: "精霊が、あなたを排除するために現れた。",
            choices: [
                {
                    label: "戦う",
                    action: function () {
                        battle(Spir);
                    }
                },
                {
                    label: "逃げる",
                    action: function () {
                        const died = changeHP(-Spir.power);

                        if (died) {
                            return;
                        } else {
                            document.getElementById("choices").innerHTML = "";
                            typeText("なんとか逃げ出した。");
                            document.getElementById("choices").innerHTML = `
                            <button onclick="showNextEvent()">進む</button>
                        `;
                        }
                        stepForward();
                        //showNextEvent();
                    }
                }
            ]
        },
        {
            text: "森の奥で、真紅の竜に出会ってしまった。後ろに道はない。",
            choices: [
                {
                    label: "戦う",
                    action: function () {
                        battle(dra);
                    }
                },
                //{ label: "無視する", action: function () { changeHP(-5); stepForward(); showNextEvent(); } }
            ]
        },
        {
            text: "人間と出会った。ポーションを売っているらしい。",
            choices: [
                {
                    label: "買う",
                    action: function () {
                        changeHP(+30);
                        stepForward();
                        showNextEvent();
                    }
                },
                {
                    label: "無視",
                    action: function () {
                        document.getElementById("choices").innerHTML = "";
                        typeText("なぜ森の中に人間が？");
                        document.getElementById("choices").innerHTML = `
                            <button onclick="showNextEvent()">進む</button>
                        `;
                        stepForward();
                        //showNextEvent();
                    }
                }
            ]
        },
        {
            text: "人間と出会った。ポーションを売っているらしい・・・",
            choices: [
                {
                    label: "買う", action: function () {
                        document.getElementById("choices").innerHTML = "";
                        typeText("渡されたものは毒薬だった。");
                        const died = changeHP(-30);
                        if (died) return;
                        stepForward();
                        document.getElementById("choices").innerHTML = `
                            <button onclick="showNextEvent()">進む</button>
                        `;
                        //showNextEvent();
                    }
                },
                {
                    label: "無視",
                    action: function () {
                        stepForward(); showNextEvent();
                    }
                }
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
                    document.getElementById("choices").innerHTML = "";
                    typeText("少し気分が楽になった。", function () {
                        document.getElementById("choices").innerHTML = `
                            <button onclick="showNextEvent()">進む</button>
                            `;
                    });
                    changeHP(15);
                    stepDown(-2);
                    //showNextEvent();

                }
            }]
        },
        {
            text: "倒れている旅人を見つけた。まだ息がありそうだ。",
            choices: [
                {
                    label: "助ける",
                    action: function () {
                        document.getElementById("choices").innerHTML = "";
                        typeText("旅人は敵と勘違いして切りかかってきた。", function () {
                            document.getElementById("choices").innerHTML = `
                            <button onclick="showNextEvent()">進む</button>
                            `;
                        });
                        playSE("play.mp3");
                        const died = changeHP(-30);
                        if (died) return;
                        //stepForward();
                    }
                },
                {
                    label: "無視して通り過ぎる",
                    action: function () {
                        stepForward();
                        showNextEvent();
                    }
                }
            ]
        },
        {
            text: "醜い小人が現れた。",
            choices: [
                {
                    label: "武器を手に取る",
                    action: function () {
                        battle(gob);
                        stepForward();
                        //showNextEvent();
                    }
                },
                {
                    label: "逃げる",
                    action: function () {
                        audio.pause();
                        eventText.innerText = "あなたは逃げ出したが、小人は道を消していた。\n そのまま道がわからなくなってしまった・・・";
                        document.getElementById("choices").innerHTML = `<button onclick="restartGame()">最初から</button>`;
                    }
                }
            ]
        },
        {
            text: "苔に覆われた箱を見つけた。",
            choices: [
                {
                    label: "開ける",
                    action: function () {
                        addWeapon("探していた剣");
                        playSE("play.mp3");
                        document.getElementById("choices").innerHTML = "";
                        typeText("探しものを見つけた。もうこの森に用はない。", function () {
                            document.getElementById("choices").innerHTML = `
                            <button onclick="showNextEvent()">進む</button>
                            `;
                        });
                        //stepForward();
                        //showNextEvent();
                    }
                },
                {
                    label: "無視して進む",
                    action: function () {
                        playSE("play.mp3");
                        document.getElementById("choices").innerHTML = "";
                        typeText("あなたは、罠を警戒した。", function () {
                            document.getElementById("choices").innerHTML = `
                            <button onclick="showNextEvent()">進む</button>
                            `;
                        });
                        stepForward();
                        //showNextEvent();
                    }
                }
            ],
        },
        {
            text: "突然、装飾の施された箱を見つけた。",
            choices: [
                {
                    label: "開ける",
                    action: function () {
                        playSE("shu.mp3");
                        document.getElementById("choices").innerHTML = "";
                        typeText("箱を開けると、矢があなたに向かって飛んできた。", function () {
                            document.getElementById("choices").innerHTML = `
                            <button onclick="showNextEvent()">進む</button>
                            `;
                        });
                        const died = changeHP(-50);
                        if (died) return;
                        //stepForward();
                        //showNextEvent();
                    }
                },
                {
                    label: "無視して進む",
                    action: function () {
                        playSE("play.mp3");
                        typeText("あなたは、罠を警戒した。", function () {
                            document.getElementById("choices").innerHTML = `
                            <button onclick="showNextEvent()">進む</button>
                            `;
                        });
                        stepForward();
                        //showNextEvent();
                    }
                }
            ],
        },
        {
            text: `${skeleton.name} があなたの行く手を塞いだ。`,
            choices: [
                {
                    label: "戦う",
                    action: function () {
                        battle(skeleton, player);
                    }
                },
                {
                    label: "逃げる",
                    action: function () {
                        eventText.innerText = "あなたは逃げた。逃げることも、時には必要だ。";
                        const died = changeHP(-skeleton.power);
                        if (died) return;
                        document.getElementById("choices").innerHTML = `
                            <button onclick="showNextEvent()">進む</button>
                        `;
                        playSE("play.mp3");
                    }
                }
            ],
        },
        {
            text: "地面に矢印のようなものが刻まれているのを見つけた。",
            choices: [
                {
                    label: "観察する",
                    action: function () {
                        document.getElementById("choices").innerHTML = "";
                        typeText("↑↓←→ と指し示しているようだが、どういうことだろう。", function () {
                            document.getElementById("choices").innerHTML = `
                            <button onclick="showNextEvent()">進む？</button>
                            `;
                        });
                        playSE("hirameki.mp3");
                        listenForSecretInput();
                    }
                },
                {
                    label: "無視する",
                    action: function () {
                        stepForward();
                        showNextEvent();
                    }
                },
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
            text: "この森から出るには、結局、運が必要なのではないか。",
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
            text: "陽気な精霊が現れた。彼は、手のひらの上の草を薬草だと言う。",
            choices: [
                {
                    label: "食べる",
                    action: function () {
                        const died = changeHP(-150);
                        if (died) return;
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
                        document.getElementById("choices").innerHTML = "";
                        typeText("長旅はできないのではないか？", function () {
                            document.getElementById("choices").innerHTML = `
                            <button onclick="showNextEvent()">進む</button>
                            `;
                        });
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
    if (player.weaponList.some(w => w.name === "探していた剣")) {
        playSE("hakushu.mp3");
        return {
            text: "気が付けば、森の入り口にたどり着いていた。\n 帰ろう。",
            choices: [{ label: "立ち去る", action: restartGame }]
        };
    } else if (player.bag === "赤の宝玉") {
        playSE("hakushu.mp3");
        return {
            text: "傷ついた竜が目の前に現れた。\n かつて戦った竜は、あなたの力を認め、あなたを街まで乗せてくれるようだ。",
            choices: [{ label: "竜の背に乗る", action: restartGame }]
        };
    } else if (player.attribute === "evil" && player.power > 30) {
        playSE("computer_down.mp3");
        return {
            text: "あなたはその悪意と強大な力で森を支配した。",
            choices: [{ label: "初めから", action: restartGame }]
        };
    } else {
        return {
            text: "あなたはそのまま森の中をさまよい続け、\n ついに森から出ることは出来なかった・・・",
            choices: [{ label: "やり直す", action: restartGame, countBadEnd, }]
        };
    }
}

function triggerEscapeEnding() {
    eventText.innerText = "君は天からの指示を読み解き、森を越え、街にたどり着いた・・・";
    audio.pause();
    setBackground("image/Amsterdam-at-night-high_rgb_5725-990x656.jpg");
    playSE("hakushu.mp3");
    document.getElementById("choices").innerHTML =
        `<button onclick="restartGame()">クリア</button>`;
}