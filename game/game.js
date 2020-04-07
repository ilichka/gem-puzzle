const game = {
    size: {
        threeXthree: 3,
        fourXfour: 4,
        fiveXfive: 5,
        sixXsix: 6,
        sevenXseven: 7,
        eightXeight: 8,
    },
    elementsSize: {
        main: null,
        button: null,
    },
    elementsField: {
        main: null,
        button: null,
        field: null,
        time: null,
        turns: null,
        info: null,
    },
    selectedSize: '',
    nothingPosition: null,

    classes: {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        'seven': 7,
        'eight': 8,
        'nine': 9,
        'ten': 10,
        'eleven': 11,
        'twelve': 12,
        'thirteen': 13,
        'fourteen': 14,
        'fifteen': 15,
        'sixteen': 16,
        'seventeen': 17,
        'eighteen': 18,
        'nineteen': 19,
        'twenty': 20,
        'twenty-one': 21,
        'twenty-two': 22,
        'twenty-three': 23,
        'twenty-four': 24,
        'twenty-five': 25,
        'twenty-six': 26,
        'twenty-seven': 27,
        'twenty-eight': 28,
        'twenty-nine': 29,
        'thirty': 30,
        'thirty-one': 31,
        'thirty-two': 32,
        'thirty-three': 33,
        'thirty-four': 34,
        'thirty-five': 35,
        'thirty-six': 36,
        'thirty-seven': 37,
        'thirty-eight': 38,
        'thirty-nine': 39,
        'forty': 40,
        'forty-one': 41,
        'forty-two': 42,
        'forty-three': 43,
        'forty-four': 44,
        'forty-five': 45,
        'forty-six': 46,
        'forty-seven': 47,
        'forty-eight': 48,
        'forty-nine': 49,
        'fifty': 50,
        'fifty-one': 51,
        'fifty-two': 52,
        'fifty-three': 53,
        'fifty-four': 54,
        'fifty-five': 55,
        'fifty-six': 56,
        'fifty-seven': 57,
        'fifty-eight': 58,
        'fifty-nine': 59,
        'sixty': 60,
        'sixty-one': 61,
        'sixty-two': 62,
        'sixty-three': 63,
        'nothing': ' ',
    }
};


let base = 60;
let clocktimer, dateObj, dh, dm, ds, ms;
let readout = '';
let h = 1,
    m = 1,
    tm = 1,
    s = 0,
    ts = 0;

//функция для очистки поля
function ClearСlock() {
    clearTimeout(clocktimer);
    h = 1;
    m = 1;
    tm = 1;
    s = 0;
    ts = 0;
    ms = 0;
    init = 0;
    readout = '00:00:00';
    document.MyForm.stopwatch.value = readout;
}

//функция для старта секундомера
function StartTIME() {
    let cdateObj = new Date();
    let t = (cdateObj.getTime() - dateObj.getTime()) - (s * 1000);
    if (t > 999) {
        s++;
    }
    if (s >= (m * base)) {
        ts = 0;
        m++;
    } else {
        ts = parseInt((ms / 100) + s);
        if (ts >= base) {
            ts = ts - ((m - 1) * base);
        }
    }
    if (m > (h * base)) {
        tm = 1;
        h++;
    } else {
        tm = parseInt((ms / 100) + m);
        if (tm >= base) {
            tm = tm - ((h - 1) * base);
        }
    }
    ms = Math.round(t / 10);
    if (ms > 99) {
        ms = 0;
    }
    if (ms == 0) {
        ms = '00';
    }
    if (ms > 0 && ms <= 9) {
        ms = '0' + ms;
    }
    if (ts > 0) {
        ds = ts;
        if (ts < 10) {
            ds = '0' + ts;
        }
    } else {
        ds = '00';
    }
    dm = tm - 1;
    if (dm > 0) {
        if (dm < 10) {
            dm = '0' + dm;
        }
    } else {
        dm = '00';
    }
    dh = h - 1;
    if (dh > 0) {
        if (dh < 10) {
            dh = '0' + dh;
        }
    } else {
        dh = '00';
    }
    readout = dh + ':' + dm + ':' + ds;
    document.MyForm.stopwatch.value = readout;
    clocktimer = setTimeout("StartTIME()", 1);
}

//Функция запуска и остановки
function StartStop() {
    if (init == 0) {
        ClearСlock();
        dateObj = new Date();
        StartTIME();
        init = 1;
    } else {
        clearTimeout(clocktimer);
        init = 0;
    }
}


let nothingPosition, pressedActive, squareNumber = [], innerTxt = [], pressedActiveNum, turn = 0;

function shuffle(squareNumberay) {
    let currentIndex = squareNumberay.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = squareNumberay[currentIndex];
        squareNumberay[currentIndex] = squareNumberay[randomIndex];
        squareNumberay[randomIndex] = temporaryValue;
    }

    return squareNumberay;
}

function init(n) {
    if (n) {
    } else {
        turn = localStorage.getItem('turn');
    }
    game.elementsField.main = document.createElement("div");
    game.elementsField.button = document.createElement("div");
    game.elementsField.field = document.createElement("div");
    game.elementsField.info = document.createElement('div');


    // Setup main elementsSize
    game.elementsField.main.classList.add("gameField"/*, "keyboard--hidden"*/);
    game.elementsField.button.classList.add("knopOchka");
    game.elementsField.field.classList.add("field");
    game.elementsField.info.classList.add('info');
    game.elementsField.button.appendChild(knopOchka());
    game.elementsField.info.appendChild(info());
    if (n) {
        game.elementsField.field.appendChild(createField(game.selectedSize));
    } else {
        turn = localStorage.getItem('turn');
        game.elementsField.field.appendChild(createSavedField(game.selectedSize));
    }

    // Add to DOM
    game.elementsField.main.appendChild(game.elementsField.button);
    game.elementsField.main.appendChild(game.elementsField.info);
    game.elementsField.main.appendChild(game.elementsField.field);
    document.body.appendChild(game.elementsField.main);
}

function initSizeSelecting() {
    // Create main elementsSize
    game.elementsSize.main = document.createElement("div");
    game.elementsSize.button = document.createElement("div");

    // Setup main elementsSize
    game.elementsSize.main.classList.add("size__select"/*, "keyboard--hidden"*/);
    game.elementsSize.button.classList.add("buttons");
    game.elementsSize.button.appendChild(selectSize());

    // Add to DOM
    game.elementsSize.main.appendChild(game.elementsSize.button);
    document.body.appendChild(game.elementsSize.main);
}

function info() {
    const fragment = document.createDocumentFragment();
    let i = 0;
    const tt = ['time', 'turns'];
    const innerTxt = [`time: 0  `, `turns: ${turn}`];
    tt.forEach(key => {
        const elem = document.createElement('div');
        elem.classList.add('information', `${tt[i]}`);
        elem.innerHTML = innerTxt[i];
        i++;
        fragment.appendChild(elem);
    });
    return fragment
}

function selectSize() {
    const fragment = document.createDocumentFragment();
    let i = 0;
    const sizes = ['threeXthree', 'fourXfour', 'fiveXfive', 'sixXsix', 'sevenXseven', 'eightXeight'];
    const innerSize = ['3X3', '4X4', '5X5', '6X6', '7X7', '8X8'];
    const button = document.createElement('button');
    button.setAttribute("type", "button");
    button.classList.add( `loadSave`);
    button.innerHTML = 'Load saved game';
    fragment.appendChild(button);
    sizes.forEach(key => {
        const button = document.createElement('button');
        button.setAttribute("type", "button");
        button.classList.add('button', `${sizes[i]}`);
        button.innerHTML = innerSize[i];
        i++;
        fragment.appendChild(button);
    });
    return fragment;
}

function knopOchka() {
    const fragment = document.createDocumentFragment();
    let i = 0;
    const controls = ['back','start', 'stop', 'save', 'results'];
    const innerTxt = ['<------','Размешать и начать', 'Стоп', 'Сохранить', 'Резуьтаты'];
    controls.forEach(key => {
        const button = document.createElement('button');
        button.setAttribute("type", "button");
        button.classList.add('button', `${controls[i]}`, 'blue');
        button.innerHTML = innerTxt[i];
        i++;
        fragment.appendChild(button);
    });
    return fragment;
}

function createField(n) {
    const fragment = document.createDocumentFragment();
    let i = 0, j = 0, keyPos = 0;
    if (n === '3X3') {
        for (let key in game.classes) {
            if (j < 8) {
                squareNumber.push(key);
                /*console.log(game.classes[key]);
                console.log(key);*/
                j++;
            } else {
                break;
            }
        }
        squareNumber.push('nothing');
        shuffle(squareNumber);
        for (let i = 0; i < squareNumber.length; i++) {
            innerTxt.push(game.classes[squareNumber[i]]);
        }
        console.log(squareNumber);
        console.log(innerTxt);
        /*console.log(game.classes[squareNumber[i]]);
        console.log(1);*/
        /* const squareNumber = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nothing'];
         const innerTxt = ['1', '2', '3', '4', '5', '6', '7', '8', ''];*/
        /* console.log(squareNumber.indexOf('nothing'));*/
        nothingPosition = squareNumber.indexOf('nothing');
        /*console.log(nothingPosition);*/
        squareNumber.forEach(key => {
            const button = document.createElement('div');
            button.classList.add('square', `${squareNumber[i]}`);
            if (keyPos === nothingPosition - 1 && keyPos + 1 !== 3 && keyPos + 1 !== 6 || keyPos === nothingPosition + 1 && keyPos !== 3 && keyPos !== 6 || keyPos === nothingPosition - 3 /*&& keyPos - 3 > 0 && keyPos + 3 < 8*/ || keyPos === nothingPosition + 3) {
                button.classList.add('active');
            }
            button.innerHTML = innerTxt[i];
            i++;
            fragment.appendChild(button);
            keyPos++;
        });
    } else {
        if (n === '4X4') {
            for (let key in game.classes) {
                if (j < 15) {
                    squareNumber.push(key);
                    console.log(game.classes[key]);
                    console.log(key);
                    j++;
                } else {
                    break;
                }
            }
            squareNumber.push('nothing');
            shuffle(squareNumber);
            for (let i = 0; i < squareNumber.length; i++) {
                innerTxt.push(game.classes[squareNumber[i]]);
            }
            console.log(squareNumber);
            console.log(innerTxt);
            console.log(game.classes[squareNumber[i]]);
            console.log(2);
            nothingPosition = squareNumber.indexOf('nothing');
            game.elementsField.field.classList.add("field2");
            /*const squareNumber = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'nothing'];
            const innerTxt = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', ''];*/
            squareNumber.forEach(key => {
                const button = document.createElement('div');
                button.classList.add('square', `${squareNumber[i]}`);
                if (keyPos === nothingPosition - 1 && keyPos + 1 !== 4 && keyPos + 1 !== 8 && keyPos + 1 !== 12 || keyPos === nothingPosition + 1 && keyPos !== 4 && keyPos !== 8 && keyPos !== 12 || keyPos === nothingPosition - 4 /*&& keyPos - 3 > 0 && keyPos + 3 < 8*/ || keyPos === nothingPosition + 4) {
                    button.classList.add('active');
                }
                button.innerHTML = innerTxt[i];
                i++;
                fragment.appendChild(button);
                keyPos++;
            });
        } else {
            if (n === '5X5') {
                for (let key in game.classes) {
                    if (j < 24) {
                        squareNumber.push(key);
                        console.log(game.classes[key]);
                        console.log(key);
                        j++;
                    } else {
                        break;
                    }
                }
                squareNumber.push('nothing');
                shuffle(squareNumber);
                for (let i = 0; i < squareNumber.length; i++) {
                    innerTxt.push(game.classes[squareNumber[i]]);
                }
                console.log(squareNumber);
                console.log(innerTxt);
                console.log(game.classes[squareNumber[i]]);
                console.log(3);
                nothingPosition = squareNumber.indexOf('nothing');
                game.elementsField.field.classList.add("field3");
                /*const squareNumber = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty', 'twenty-one', 'twenty-two', 'twenty-three', 'twenty-four', 'nothing'];
                const innerTxt = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', ''];*/
                squareNumber.forEach(key => {
                    const button = document.createElement('div');
                    button.classList.add('square', `${squareNumber[i]}`);
                    if (keyPos === nothingPosition - 1 && keyPos + 1 !== 5 && keyPos + 1 !== 10 && keyPos + 1 !== 15 && keyPos + 1 !== 20 || keyPos === nothingPosition + 1 && keyPos !== 5 && keyPos !== 10 && keyPos !== 15 && keyPos !== 20 || keyPos === nothingPosition - 5 /*&& keyPos - 3 > 0 && keyPos + 3 < 8*/ || keyPos === nothingPosition + 5) {
                        button.classList.add('active');
                    }
                    button.innerHTML = innerTxt[i];
                    i++;
                    fragment.appendChild(button);
                    keyPos++;
                });
            } else {
                if (n === '6X6') {
                    for (let key in game.classes) {
                        if (j < 35) {
                            squareNumber.push(key);
                            console.log(game.classes[key]);
                            console.log(key);
                            j++;
                        } else {
                            break;
                        }
                    }
                    squareNumber.push('nothing');
                    shuffle(squareNumber);
                    for (let i = 0; i < squareNumber.length; i++) {
                        innerTxt.push(game.classes[squareNumber[i]]);
                    }
                    console.log(squareNumber);
                    console.log(innerTxt);
                    console.log(game.classes[squareNumber[i]]);
                    console.log(4);
                    nothingPosition = squareNumber.indexOf('nothing');
                    game.elementsField.field.classList.add("field4");
                    /*const squareNumber = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty', 'twenty-one', 'twenty-two', 'twenty-three', 'twenty-four', 'twenty-five', 'twenty-six', 'twenty-seven', 'twenty-eight', 'twenty-nine', 'thirty', 'thirty-one', 'thirty-two', 'thirty-three', 'thirty-four', 'thirty-five', 'nothing'];
                    const innerTxt = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', ''];*/
                    squareNumber.forEach(key => {
                        console.log(game.classes[`${key}`]);
                        const button = document.createElement('div');
                        button.classList.add('square', `${squareNumber[i]}`);
                        if (keyPos === nothingPosition - 1 && keyPos + 1 !== 6 && keyPos + 1 !== 12 && keyPos + 1 !== 18 && keyPos + 1 !== 24 && keyPos + 1 !== 30 || keyPos === nothingPosition + 1 && keyPos !== 6 && keyPos !== 12 && keyPos !== 18 && keyPos !== 24 && keyPos !== 30 || keyPos === nothingPosition - 6 /*&& keyPos - 3 > 0 && keyPos + 3 < 8*/ || keyPos === nothingPosition + 6) {
                            button.classList.add('active');
                        }
                        button.innerHTML = innerTxt[i];
                        i++;
                        fragment.appendChild(button);
                        keyPos++;
                    });
                } else {
                    if (n === '7X7') {
                        for (let key in game.classes) {
                            if (j < 48) {
                                squareNumber.push(key);
                                console.log(game.classes[key]);
                                console.log(key);
                                j++;
                            } else {
                                break;
                            }
                        }
                        squareNumber.push('nothing');
                        shuffle(squareNumber);
                        for (let i = 0; i < squareNumber.length; i++) {
                            innerTxt.push(game.classes[squareNumber[i]]);
                        }
                        console.log(squareNumber);
                        console.log(innerTxt);
                        console.log(game.classes[squareNumber[i]]);
                        console.log(5);
                        nothingPosition = squareNumber.indexOf('nothing');
                        game.elementsField.field.classList.add("field5");
                        /* const squareNumber = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty', 'twenty-one', 'twenty-two', 'twenty-three', 'twenty-four', 'twenty-five', 'twenty-six', 'twenty-seven', 'twenty-eight', 'twenty-nine', 'thirty', 'thirty-one', 'thirty-two', 'thirty-three', 'thirty-four', 'thirty-five', 'thirty-six', 'thirty-seven', 'thirty-eight', 'thirty-nine', 'forty', 'forty-one', 'forty-two', 'forty-three', 'forty-four', 'forty-five', 'forty-six', 'forty-seven', 'forty-eight', 'nothing'];
                         const innerTxt = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', ''];*/
                        squareNumber.forEach(key => {
                            const button = document.createElement('div');
                            button.classList.add('square', `${squareNumber[i]}`);
                            if (keyPos === nothingPosition - 1 && keyPos + 1 !== 7 && keyPos + 1 !== 14 && keyPos + 1 !== 21 && keyPos + 1 !== 28 && keyPos + 1 !== 35 && keyPos + 1 !== 42 || keyPos === nothingPosition + 1 && keyPos !== 7 && keyPos !== 14 && keyPos !== 21 && keyPos !== 28 && keyPos !== 35 && keyPos !== 42 || keyPos === nothingPosition - 7 /*&& keyPos - 3 > 0 && keyPos + 3 < 8*/ || keyPos === nothingPosition + 7) {
                                button.classList.add('active');
                            }
                            button.innerHTML = innerTxt[i];
                            i++;
                            fragment.appendChild(button);
                            keyPos++;
                        });
                    } else {
                        if (n === '8X8') {
                            for (let key in game.classes) {
                                if (j < 63) {
                                    squareNumber.push(key);
                                    console.log(game.classes[key]);
                                    console.log(key);
                                    j++;
                                } else {
                                    break;
                                }
                            }
                            squareNumber.push('nothing');
                            shuffle(squareNumber);
                            for (let i = 0; i < squareNumber.length; i++) {
                                innerTxt.push(game.classes[squareNumber[i]]);
                            }
                            console.log(squareNumber);
                            console.log(innerTxt);
                            console.log(game.classes[squareNumber[i]]);
                            console.log(6);
                            nothingPosition = squareNumber.indexOf('nothing');
                            game.elementsField.field.classList.add("field6");
                            /*  const squareNumber = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty', 'twenty-one', 'twenty-two', 'twenty-three', 'twenty-four', 'twenty-five', 'twenty-six', 'twenty-seven', 'twenty-eight', 'twenty-nine', 'thirty', 'thirty-one', 'thirty-two', 'thirty-three', 'thirty-four', 'thirty-five', 'thirty-six', 'thirty-seven', 'thirty-eight', 'thirty-nine', 'forty', 'forty-one', 'forty-two', 'forty-three', 'forty-four', 'forty-five', 'forty-six', 'forty-seven', 'forty-eight', 'forty-nine', 'fifty', 'fifty-one', 'fifty-two', 'fifty-three', 'fifty-four', 'fifty-five', 'fifty-six', 'fifty-seven', 'fifty-eight', 'fifty-nine', 'sixty', 'sixty-one', 'sixty-two', 'sixty-three', 'nothing'];
                              const innerTxt = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', ''];*/
                            squareNumber.forEach(key => {
                                const button = document.createElement('div');
                                button.classList.add('square', `${squareNumber[i]}`);
                                if (keyPos === nothingPosition - 1 && keyPos + 1 !== 8 && keyPos + 1 !== 16 && keyPos + 1 !== 24 && keyPos + 1 !== 32 && keyPos + 1 !== 40 && keyPos + 1 !== 48 && keyPos + 1 !== 56 || keyPos === nothingPosition + 1 && keyPos !== 8 && keyPos !== 16 && keyPos !== 24 && keyPos !== 32 && keyPos !== 40 && keyPos !== 48 && keyPos !== 56 || keyPos === nothingPosition - 8 /*&& keyPos - 3 > 0 && keyPos + 3 < 8*/ || keyPos === nothingPosition + 8) {
                                    button.classList.add('active');
                                }
                                button.innerHTML = innerTxt[i];
                                i++;
                                fragment.appendChild(button);
                                keyPos++;
                            });
                        }
                    }
                }
            }
        }
    }
    /* localStorage.setItem('fill', 'true');
     localStorage.setItem('innerTXT', innerTxt);
     localStorage.setItem('squareNumber', squareNumber);
     localStorage.setItem('turn', turn);*/
    /* const controls = ['start', 'stop', 'save', 'results'];
     const innerSize = ['Размешать и начать','Стоп','Сохранить','Резуьтаты'];
     controls.forEach(key => {
         const button = document.createElement('button');
         button.setAttribute("type", "button");
         button.classList.add('button', `${controls[i]}`, 'blue');
         button.innerHTML = innerSize[i];
         i++;
         fragment.appendChild(button);
     });*/
    return fragment;
}

function createSavedField(n) {
    const fragment = document.createDocumentFragment();
    let keyPos = 0, i=0;
    if (n === '3X3') {
        squareNumber = localStorage.getItem('squareNumber');
        squareNumber = squareNumber.split(',');
        /*innerTxt = localStorage.getItem('innerTxt');
        for (let j=1;j<innerTxt.length;j++) {
            if(innerTxt[j]===innerTxt[j+1]) {
                innerTxt = innerTxt.replace(/,,/gi, ' ');
            }
        }
        if(innerTxt[0]===',') {
            innerTxt[0] = ' ';
        } else {
            if(innerTxt[8]===',') {
                innerTxt[8] = ' ';
            }
        }
        innerTxt = innerTxt.replace(/,/gi, '');*/
        for (let i = 0; i < squareNumber.length; i++) {
            innerTxt.push(game.classes[squareNumber[i]]);
        }
        console.log(innerTxt);
        nothingPosition = squareNumber.indexOf('nothing');
        squareNumber.forEach(key => {
            const button = document.createElement('div');
            button.classList.add('square', `${squareNumber[i]}`);
            if (keyPos === nothingPosition - 1 && keyPos + 1 !== 3 && keyPos + 1 !== 6 || keyPos === nothingPosition + 1 && keyPos !== 3 && keyPos !== 6 || keyPos === nothingPosition - 3 /*&& keyPos - 3 > 0 && keyPos + 3 < 8*/ || keyPos === nothingPosition + 3) {
                button.classList.add('active');
            }
            button.innerHTML = innerTxt[i];
            i++;
            fragment.appendChild(button);
            keyPos++;
        });
    } else {
        if (n === '4X4') {
            squareNumber = localStorage.getItem('squareNumber');
            squareNumber = squareNumber.split(',');
           /* innerTxt = localStorage.getItem('innerTxt');
            for (let j=1;j<innerTxt.length;j++) {
                if(innerTxt[j]===innerTxt[j+1]) {
                    innerTxt = innerTxt.replace(/,,/gi, ' ');
                }
            }
            if(innerTxt[0]===',') {
                innerTxt[0] = ' ';
            } else {
                if(innerTxt[15]===',') {
                    innerTxt[15] = ' ';
                }
            }
            innerTxt = innerTxt.replace(/,/gi, '');*/
            for (let i = 0; i < squareNumber.length; i++) {
                innerTxt.push(game.classes[squareNumber[i]]);
            }
            console.log(innerTxt);
            nothingPosition = squareNumber.indexOf('nothing');
            squareNumber.forEach(key => {
                const button = document.createElement('div');
                button.classList.add('square', `${squareNumber[i]}`);
                if (keyPos === nothingPosition - 1 && keyPos + 1 !== 4 && keyPos + 1 !== 8 && keyPos + 1 !== 12 || keyPos === nothingPosition + 1 && keyPos !== 4 && keyPos !== 8 && keyPos !== 12 || keyPos === nothingPosition - 4 /*&& keyPos - 3 > 0 && keyPos + 3 < 8*/ || keyPos === nothingPosition + 4) {
                    button.classList.add('active');
                }
                button.innerHTML = innerTxt[i];
                i++;
                fragment.appendChild(button);
                keyPos++;
            });
        } else {
            if (n === '5X5') {
                squareNumber = localStorage.getItem('squareNumber');
                squareNumber = squareNumber.split(',');
                /*innerTxt = localStorage.getItem('innerTxt');
                for (let j=1;j<innerTxt.length;j++) {
                    if(innerTxt[j]===innerTxt[j+1]) {
                        innerTxt = innerTxt.replace(/,,/gi, ' ');
                    }
                }
                if(innerTxt[0]===',') {
                    innerTxt[0] = ' ';
                } else {
                    if(innerTxt[24]===',') {
                        innerTxt[24] = ' ';
                    }
                }
                innerTxt = innerTxt.replace(/,/gi, '');*/
                for (let i = 0; i < squareNumber.length; i++) {
                    innerTxt.push(game.classes[squareNumber[i]]);
                }
                console.log(innerTxt);
                nothingPosition = squareNumber.indexOf('nothing');
                squareNumber.forEach(key => {
                    const button = document.createElement('div');
                    button.classList.add('square', `${squareNumber[i]}`);
                    if (keyPos === nothingPosition - 1 && keyPos + 1 !== 5 && keyPos + 1 !== 10 && keyPos + 1 !== 15 && keyPos + 1 !== 20 || keyPos === nothingPosition + 1 && keyPos !== 5 && keyPos !== 10 && keyPos !== 15 && keyPos !== 20 || keyPos === nothingPosition - 5 /*&& keyPos - 3 > 0 && keyPos + 3 < 8*/ || keyPos === nothingPosition + 5) {
                        button.classList.add('active');
                    }
                    button.innerHTML = innerTxt[i];
                    i++;
                    fragment.appendChild(button);
                    keyPos++;
                });
            } else {
                if (n === '6X6') {
                    squareNumber = localStorage.getItem('squareNumber');
                    squareNumber = squareNumber.split(',');
                    /*innerTxt = localStorage.getItem('innerTxt');
                    for (let j=1;j<innerTxt.length;j++) {
                        if(innerTxt[j]===innerTxt[j+1]) {
                            innerTxt = innerTxt.replace(/,,/gi, ' ');
                        }
                    }
                    if(innerTxt[0]===',') {
                        innerTxt[0] = ' ';
                    } else {
                        if(innerTxt[35]===',') {
                            innerTxt[35] = ' ';
                        }
                    }
                    innerTxt = innerTxt.replace(/,/gi, '');*/
                    for (let i = 0; i < squareNumber.length; i++) {
                        innerTxt.push(game.classes[squareNumber[i]]);
                    }
                    console.log(innerTxt);
                    nothingPosition = squareNumber.indexOf('nothing');
                    squareNumber.forEach(key => {
                        console.log(game.classes[`${key}`]);
                        const button = document.createElement('div');
                        button.classList.add('square', `${squareNumber[i]}`);
                        if (keyPos === nothingPosition - 1 && keyPos + 1 !== 6 && keyPos + 1 !== 12 && keyPos + 1 !== 18 && keyPos + 1 !== 24 && keyPos + 1 !== 30 || keyPos === nothingPosition + 1 && keyPos !== 6 && keyPos !== 12 && keyPos !== 18 && keyPos !== 24 && keyPos !== 30 || keyPos === nothingPosition - 6 /*&& keyPos - 3 > 0 && keyPos + 3 < 8*/ || keyPos === nothingPosition + 6) {
                            button.classList.add('active');
                        }
                        button.innerHTML = innerTxt[i];
                        i++;
                        fragment.appendChild(button);
                        keyPos++;
                    });
                } else {
                    if (n === '7X7') {
                        squareNumber = localStorage.getItem('squareNumber');
                        squareNumber = squareNumber.split(',');
                        /*innerTxt = localStorage.getItem('innerTxt');
                        for (let j=1;j<innerTxt.length;j++) {
                            if(innerTxt[j]===innerTxt[j+1]) {
                                innerTxt = innerTxt.replace(/,,/gi, ' ');
                            }
                        }
                        if(innerTxt[0]===',') {
                            innerTxt[0] = ' ';
                        } else {
                            if(innerTxt[48]===',') {
                                innerTxt[48] = ' ';
                            }
                        }
                        innerTxt = innerTxt.replace(/,/gi, '');*/
                        for (let i = 0; i < squareNumber.length; i++) {
                            innerTxt.push(game.classes[squareNumber[i]]);
                        }
                        console.log(innerTxt);
                        nothingPosition = squareNumber.indexOf('nothing');
                        squareNumber.forEach(key => {
                            const button = document.createElement('div');
                            button.classList.add('square', `${squareNumber[i]}`);
                            if (keyPos === nothingPosition - 1 && keyPos + 1 !== 7 && keyPos + 1 !== 14 && keyPos + 1 !== 21 && keyPos + 1 !== 28 && keyPos + 1 !== 35 && keyPos + 1 !== 42 || keyPos === nothingPosition + 1 && keyPos !== 7 && keyPos !== 14 && keyPos !== 21 && keyPos !== 28 && keyPos !== 35 && keyPos !== 42 || keyPos === nothingPosition - 7 /*&& keyPos - 3 > 0 && keyPos + 3 < 8*/ || keyPos === nothingPosition + 7) {
                                button.classList.add('active');
                            }
                            button.innerHTML = innerTxt[i];
                            i++;
                            fragment.appendChild(button);
                            keyPos++;
                        });
                    } else {
                        if (n === '8X8') {
                            squareNumber = localStorage.getItem('squareNumber');
                            squareNumber = squareNumber.split(',');
                            /*innerTxt = localStorage.getItem('innerTxt');
                            for (let j=1;j<innerTxt.length;j++) {
                                if(innerTxt[j]===innerTxt[j+1]) {
                                    innerTxt = innerTxt.replace(/,,/gi, ' ');
                                }
                            }
                            if(innerTxt[0]===',') {
                                innerTxt[0] = ' ';
                            } else {
                                if(innerTxt[63]===',') {
                                    innerTxt[63] = ' ';
                                }
                            }
                            innerTxt = innerTxt.replace(/,/gi, '');*/
                            for (let i = 0; i < squareNumber.length; i++) {
                                innerTxt.push(game.classes[squareNumber[i]]);
                            }
                            console.log(innerTxt);
                            nothingPosition = squareNumber.indexOf('nothing');
                            squareNumber.forEach(key => {
                                const button = document.createElement('div');
                                button.classList.add('square', `${squareNumber[i]}`);
                                if (keyPos === nothingPosition - 1 && keyPos + 1 !== 8 && keyPos + 1 !== 16 && keyPos + 1 !== 24 && keyPos + 1 !== 32 && keyPos + 1 !== 40 && keyPos + 1 !== 48 && keyPos + 1 !== 56 || keyPos === nothingPosition + 1 && keyPos !== 8 && keyPos !== 16 && keyPos !== 24 && keyPos !== 32 && keyPos !== 40 && keyPos !== 48 && keyPos !== 56 || keyPos === nothingPosition - 8 /*&& keyPos - 3 > 0 && keyPos + 3 < 8*/ || keyPos === nothingPosition + 8) {
                                    button.classList.add('active');
                                }
                                button.innerHTML = innerTxt[i];
                                i++;
                                fragment.appendChild(button);
                                keyPos++;
                            });
                        }
                    }
                }
            }
        }
    }
    /* localStorage.setItem('fill', 'true');
     localStorage.setItem('innerTXT', innerTxt);
     localStorage.setItem('squareNumber', squareNumber);
     localStorage.setItem('turn', turn);*/
    /* const controls = ['start', 'stop', 'save', 'results'];
     const innerSize = ['Размешать и начать','Стоп','Сохранить','Резуьтаты'];
     controls.forEach(key => {
         const button = document.createElement('button');
         button.setAttribute("type", "button");
         button.classList.add('button', `${controls[i]}`, 'blue');
         button.innerHTML = innerSize[i];
         i++;
         fragment.appendChild(button);
     });*/
    return fragment;
    console.log(2);
}

function moveButton(n) {
    let vremenno, keyPos = 0, square;
    if (pressedActiveNum === nothingPosition - n) {
        document.querySelector('.nothing').innerHTML = document.querySelector(`.${pressedActive}`).innerHTML;
        document.querySelector('.nothing').setAttribute('class', `square ${pressedActive}`);
        document.querySelector(`.${pressedActive}`).innerHTML = ' ';
        document.querySelector(`.${pressedActive}`).setAttribute('class', ` square nothing`);
        vremenno = squareNumber[pressedActiveNum];
        squareNumber[pressedActiveNum] = squareNumber[nothingPosition];
        squareNumber[nothingPosition] = vremenno;
        vremenno = innerTxt[pressedActiveNum];
        innerTxt[pressedActiveNum] = innerTxt[nothingPosition];
        innerTxt[nothingPosition] = vremenno;
        nothingPosition = squareNumber.indexOf('nothing');
        squareNumber.forEach(key => {
            square = document.querySelectorAll('.square');
            if (keyPos === nothingPosition - 1 && keyPos + 1 !== n && keyPos + 1 !== 2 * n && keyPos + 1 !== 3 * n && keyPos + 1 !== 4 * n && keyPos + 1 !== 5 * n && keyPos + 1 !== 6 * n && keyPos + 1 !== 7 * n || keyPos === nothingPosition + 1 && keyPos !== n && keyPos !== 2 * n && keyPos !== 3 * n && keyPos !== 4 * n && keyPos !== 5 * n && keyPos !== 6 * n && keyPos !== 7 * n || keyPos === nothingPosition - n /*&& keyPos - 3 > 0 && keyPos + 3 < 8*/ || keyPos === nothingPosition + n) {
                square = square[keyPos];
                square.classList.add('active');
            }
            keyPos++;
        });
        console.log('top')
    } else {
        if (pressedActiveNum === nothingPosition - 1) {
            document.querySelector('.nothing').innerHTML = document.querySelector(`.${pressedActive}`).innerHTML;
            document.querySelector('.nothing').setAttribute('class', `square ${pressedActive}`);
            document.querySelector(`.${pressedActive}`).innerHTML = ' ';
            document.querySelector(`.${pressedActive}`).setAttribute('class', `square nothing`);
            vremenno = squareNumber[pressedActiveNum];
            squareNumber[pressedActiveNum] = squareNumber[nothingPosition];
            squareNumber[nothingPosition] = vremenno;
            vremenno = innerTxt[pressedActiveNum];
            innerTxt[pressedActiveNum] = innerTxt[nothingPosition];
            innerTxt[nothingPosition] = vremenno;
            nothingPosition = squareNumber.indexOf('nothing');
            squareNumber.forEach(key => {
                square = document.querySelectorAll('.square');
                if (keyPos === nothingPosition - 1 && keyPos + 1 !== n && keyPos + 1 !== 2 * n && keyPos + 1 !== 3 * n && keyPos + 1 !== 4 * n && keyPos + 1 !== 5 * n && keyPos + 1 !== 6 * n && keyPos + 1 !== 7 * n || keyPos === nothingPosition + 1 && keyPos !== n && keyPos !== 2 * n && keyPos !== 3 * n && keyPos !== 4 * n && keyPos !== 5 * n && keyPos !== 6 * n && keyPos !== 7 * n || keyPos === nothingPosition - n /*&& keyPos - 3 > 0 && keyPos + 3 < 8*/ || keyPos === nothingPosition + n) {
                    square = square[keyPos];
                    square.classList.add('active');
                }
                keyPos++;
            });
            console.log('left');
        } else {
            if (pressedActiveNum === nothingPosition + n) {
                document.querySelector('.nothing').innerHTML = document.querySelector(`.${pressedActive}`).innerHTML;
                document.querySelector(`.${pressedActive}`).innerHTML = ' ';
                document.querySelector(`.${pressedActive}`).setAttribute('class', `square nothing`);
                document.querySelector('.nothing').setAttribute('class', `square ${pressedActive}`);
                vremenno = squareNumber[pressedActiveNum];
                squareNumber[pressedActiveNum] = squareNumber[nothingPosition];
                squareNumber[nothingPosition] = vremenno;
                vremenno = innerTxt[pressedActiveNum];
                innerTxt[pressedActiveNum] = innerTxt[nothingPosition];
                innerTxt[nothingPosition] = vremenno;
                nothingPosition = squareNumber.indexOf('nothing');
                squareNumber.forEach(key => {
                    square = document.querySelectorAll('.square');
                    if (keyPos === nothingPosition - 1 && keyPos + 1 !== n && keyPos + 1 !== 2 * n && keyPos + 1 !== 3 * n && keyPos + 1 !== 4 * n && keyPos + 1 !== 5 * n && keyPos + 1 !== 6 * n && keyPos + 1 !== 7 * n || keyPos === nothingPosition + 1 && keyPos !== n && keyPos !== 2 * n && keyPos !== 3 * n && keyPos !== 4 * n && keyPos !== 5 * n && keyPos !== 6 * n && keyPos !== 7 * n || keyPos === nothingPosition - n /*&& keyPos - 3 > 0 && keyPos + 3 < 8*/ || keyPos === nothingPosition + n) {
                        square = square[keyPos];
                        square.classList.add('active');
                    }
                    keyPos++;
                });
                console.log('bot')
            } else {
                if (pressedActiveNum === nothingPosition + 1) {
                    document.querySelector('.nothing').innerHTML = document.querySelector(`.${pressedActive}`).innerHTML;
                    document.querySelector(`.${pressedActive}`).innerHTML = ' ';
                    document.querySelector(`.${pressedActive}`).setAttribute('class', `square nothing`);
                    document.querySelector('.nothing').setAttribute('class', `square ${pressedActive}`);
                    vremenno = squareNumber[pressedActiveNum];
                    squareNumber[pressedActiveNum] = squareNumber[nothingPosition];
                    squareNumber[nothingPosition] = vremenno;
                    vremenno = innerTxt[pressedActiveNum];
                    innerTxt[pressedActiveNum] = innerTxt[nothingPosition];
                    innerTxt[nothingPosition] = vremenno;
                    nothingPosition = squareNumber.indexOf('nothing');
                    squareNumber.forEach(key => {
                        square = document.querySelectorAll('.square');
                        if (keyPos === nothingPosition - 1 && keyPos + 1 !== n && keyPos + 1 !== 2 * n && keyPos + 1 !== 3 * n && keyPos + 1 !== 4 * n && keyPos + 1 !== 5 * n && keyPos + 1 !== 6 * n && keyPos + 1 !== 7 * n || keyPos === nothingPosition + 1 && keyPos !== n && keyPos !== 2 * n && keyPos !== 3 * n && keyPos !== 4 * n && keyPos !== 5 * n && keyPos !== 6 * n && keyPos !== 7 * n || keyPos === nothingPosition - n /*&& keyPos - 3 > 0 && keyPos + 3 < 8*/ || keyPos === nothingPosition + n) {
                            square = square[keyPos];
                            square.classList.add('active');
                        }
                        keyPos++;
                    });
                    console.log('right')
                }
            }
        }
    }
    turn++;
    /*localStorage.setItem('fill', 'true');
    localStorage.setItem('innerTXT', innerTxt);
    localStorage.setItem('squareNumber', squareNumber);
    localStorage.setItem('turn', turn);*/
    document.querySelector('.turns').innerHTML = `turns: ${turn}`;
}

function save() {
    document.querySelector('.save').addEventListener('click', () => {
        localStorage.setItem('fill', 'true');
        localStorage.setItem('innerTxt', innerTxt);
        localStorage.setItem('squareNumber', squareNumber);
        localStorage.setItem('turn', turn);
        localStorage.setItem('selectedSize', game.selectedSize);
        alert('Your progress have been saved!');
    })
}

function start() {
    document.querySelector('.start').addEventListener('click', () => {
        let el = document.querySelector('.gameField');
        el.parentNode.removeChild(el);
        innerTxt = [];
        squareNumber = [];
        turn = 0;
        /*    delete localStorage.fill;
            delete localStorage.innerTXT;
            delete localStorage.squareNumber;
            delete localStorage.turn;*/
        init(true);
        anotherEvent();
        save();
        start();
        back();
    })
}

function back() {
    document.querySelector('.back').addEventListener('click',()=> {
        location.href=location.href;
    })
}

function event() {
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', (e) => {
            document.querySelector('.size__select').classList.add('display_none');
            console.log(e.currentTarget.innerHTML);
            game.selectedSize = e.currentTarget.innerHTML;
            init(true);
            anotherEvent();
            start();
            save();
            back();
        })
    });
}

function anotherEvent() {
    function listener(e) {
        document.querySelectorAll('.active').forEach(key => {
            key.removeEventListener('click', listener);
            key.classList.remove('active')
        });
        pressedActive = e.currentTarget.getAttribute('class');
        pressedActive = pressedActive.split(' ');
        pressedActive = pressedActive[1];
        pressedActiveNum = squareNumber.indexOf(pressedActive);
        console.log(`class = ${pressedActive}`);
        console.log(`nomer = ${pressedActiveNum}`);
        /*  console.log('da');*/
        if (game.selectedSize === '3X3') {
            moveButton(3);
            let psevdoresult = squareNumber.join('');
            let result = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nothing'];
            result = result.join('');
            if (psevdoresult === result) {
                alert(`turns: ${turn}\n time:`)
            }
        } else {
            if (game.selectedSize === '4X4') {
                moveButton(4);
                let psevdoresult = squareNumber.join('');
                let result = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'nothing'];
                result = result.join('');
                if (psevdoresult === result) {
                    alert(`turns: ${turn}\n time:`)
                }
            } else {
                if (game.selectedSize === '5X5') {
                    moveButton(5);
                    let psevdoresult = squareNumber.join('');
                    let result = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty', 'twenty-one', 'twenty-two', 'twenty-three', 'twenty-four', 'nothing'];
                    result = result.join('');
                    if (psevdoresult === result) {
                        alert(`turns: ${turn}\n time:`)
                    }
                } else {
                    if (game.selectedSize === '6X6') {
                        moveButton(6);
                        let psevdoresult = squareNumber.join('');
                        let result = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty', 'twenty-one', 'twenty-two', 'twenty-three', 'twenty-four', 'twenty-five', 'twenty-six', 'twenty-seven', 'twenty-eight', 'twenty-nine', 'thirty', 'thirty-one', 'thirty-two', 'thirty-three', 'thirty-four', 'thirty-five', 'nothing'];
                        result = result.join('');
                        if (psevdoresult === result) {
                            alert(`turns: ${turn}\n time:`)
                        }
                    } else {
                        if (game.selectedSize === '7X7') {
                            moveButton(7);
                            let psevdoresult = squareNumber.join('');
                            let result = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty', 'twenty-one', 'twenty-two', 'twenty-three', 'twenty-four', 'twenty-five', 'twenty-six', 'twenty-seven', 'twenty-eight', 'twenty-nine', 'thirty', 'thirty-one', 'thirty-two', 'thirty-three', 'thirty-four', 'thirty-five', 'thirty-six', 'thirty-seven', 'thirty-eight', 'thirty-nine', 'forty', 'forty-one', 'forty-two', 'forty-three', 'forty-four', 'forty-five', 'forty-six', 'forty-seven', 'forty-eight', 'nothing'];
                            result = result.join('');
                            if (psevdoresult === result) {
                                alert(`turns: ${turn}\n time:`)
                            }
                        } else {
                            if (game.selectedSize === '8X8') {
                                moveButton(8);
                                let psevdoresult = squareNumber.join('');
                                let result = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty', 'twenty-one', 'twenty-two', 'twenty-three', 'twenty-four', 'twenty-five', 'twenty-six', 'twenty-seven', 'twenty-eight', 'twenty-nine', 'thirty', 'thirty-one', 'thirty-two', 'thirty-three', 'thirty-four', 'thirty-five', 'thirty-six', 'thirty-seven', 'thirty-eight', 'thirty-nine', 'forty', 'forty-one', 'forty-two', 'forty-three', 'forty-four', 'forty-five', 'forty-six', 'forty-seven', 'forty-eight', 'forty-nine', 'fifty', 'fifty-one', 'fifty-two', 'fifty-three', 'fifty-four', 'fifty-five', 'fifty-six', 'fifty-seven', 'fifty-eight', 'fifty-nine', 'sixty', 'sixty-one', 'sixty-two', 'sixty-three', 'nothing'];
                                result = result.join('');
                                if (psevdoresult === result) {
                                    alert(`turns: ${turn}\n time:`)
                                }
                            }
                        }
                    }
                }
            }
        }
        anotherEvent();
    }

    console.log('srabotalo');
    document.querySelectorAll('.active').forEach(active => {
        active.addEventListener('click', listener)
    });
}

function loadSave() {
    document.querySelector('.loadSave').addEventListener('click', ()=>{
        console.log(1);
        init(false);
        document.querySelector('.size__select').classList.add('display_none');
        if(game.selectedSize === '4X4') {
            document.querySelector('.field').classList.add('field2')
        } else {
            if(game.selectedSize === '5X5') {
                document.querySelector('.field').classList.add('field3')
            } else {
                if(game.selectedSize === '6X6') {
                    document.querySelector('.field').classList.add('field4')
                } else {
                    if(game.selectedSize === '7X7') {
                        document.querySelector('.field').classList.add('field5')
                    } else {
                        if(game.selectedSize === '8X8') {
                            document.querySelector('.field').classList.add('field6')
                        }
                    }
                }
            }
        }
        start();
        anotherEvent();
        save();
        back();
        })
}

/*  document.addEventListener('click', () => {
      anotherEvent();
      console.log('srabotalo')
  });*/


document.addEventListener("DOMContentLoaded", function () {
    game.selectedSize = localStorage.getItem('selectedSize');
    initSizeSelecting();
    event();
    loadSave();
});


