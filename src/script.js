window.onload = function () {
var kolN = 132000,  // Кол-во итераций
    kolCol = 9,     // Кол-во колонок в табл
    // --- Константы ------------------
    fi = 1.37,
    epsilon = 0.00001,
    cosFi = Math.cos(fi),
    sinFi = Math.sin(fi),
    ctgFi = Math.cos(fi)/Math.sin(fi),
    Massht = 2,
    // --------------------------------
    masPQ1 = [],    // Массив с подходящими 1
    masPQ2 = [],    // Массив с подходящими 2
    masPQ3 = [],    // Массив с подходящими 3
    masPQ4 = [],    // Массив с подходящими 4
    masR1 = [],     // Массив с результ Модуля (r)
    masFi1 = [],    // Массив с результ аргумента (fi) 
    iMasBeg1 = [],
    iMasEnd1 = [],
    yMasBeg1 = [],
    yMasEnd1 = [], 
    iMasBeg2 = [],
    iMasEnd2 = [],
    yMasBeg2 = [],
    yMasEnd2 = [], 
    iMasBeg3 = [],
    iMasEnd3 = [],
    yMasBeg3 = [],
    yMasEnd3 = [], 
    iMasBeg4 = [],
    iMasEnd4 = [],
    yMasBeg4 = [],
    yMasEnd4 = [], 

    iMasBeg5 = [],
    iMasEnd5 = [],
    yMasBeg5 = [],
    yMasEnd5 = [], 

    countPQ = 0,    // Счётчик для массивов подходящих и модуля
    countgraf = 0,

    k = 0,
    P = 1,
    Numb = 1,       // Номер подходяшей (номер строки в табл)
    kOtr = 0,       // Кол-во отрицательных подходящих
    summ = 0,       // Сумма логорифмов
    count = 0,      // для вывода в табл
    kolcifr = 12,   // Кол-во отображаемых цифр в ячейках (вместе с '.' и '-')

    sell_1 = document.getElementsByClassName('s1'),
    temp = document.getElementsByClassName('temp'),
    const1 = document.getElementsByClassName('const1'),
    btn = document.getElementsByTagName("button")[0],
    btn_test = document.getElementsByTagName("button")[1];
    btn_clear = document.getElementsByTagName("button")[2];

    // temp[0].innerHTML = Math.sin(fi);
    const1[0].innerHTML = 'fi = ' + fi + ',';
    const1[1].innerHTML = 'epsilon = ' + epsilon + ',';
    const1[2].innerHTML = 'cos(fi) = ' + obrezka(Math.cos(fi), kolcifr) + ',';
    const1[3].innerHTML = 'sin(fi) = ' + obrezka(Math.sin(fi), kolcifr) + ',';
    // const1[4].innerHTML = 'ctg(fi) = ' + obrezka(ctgFi, kolcifr) + ',';

// =================================================================

// ---- Создание строки в табл. ------------------------------------
    function createTr() {
        tr = document.createElement('tr');  // Создаём элемент tr
        tr.className = 'tabl'; // Присваеваем ему класс
        mainT.appendChild(tr); // Добавляем внутрь (tbody className="mainT") новый tr
    };
// ---- Создание ячейки в табл. ------------------------------------
    function createTd(n) {
        td = document.createElement('td'); // Создаём элемент td
        td.className = 's1';    // Присваеваем ему класс
        document.getElementsByClassName('tabl')[n].appendChild(td); // Добавляем внутрь (tr className="tabl") новый td
    };

// ---- Процедуры вычисления подходящей дроби для sin --------------
    function podhodPQsin_n_1 (n) {
        var Rez;
        Rez = Math.sin((n+1)*fi) / Math.sin(n*fi);
        return Rez;
    };
    function podhodPQsin_n (n) {
        var Rez;
        Rez = Math.sin(n*fi) / Math.sin((n+1)*fi);
        return Rez;
    };
    function podhodPQsin_nPi (n) {
        var Rez;
        Rez = Math.sin(n*(Math.PI/2 - epsilon)) / Math.sin((n+1)*(Math.PI/2 - epsilon));
        return Rez;
    };
    function podhodPQsin_n_1_Pi (n) {
        var Rez;
        Rez = Math.sin((n+1)*(Math.PI/2 - epsilon)) / Math.sin(n*(Math.PI/2 - epsilon));
        return Rez;
    };
    function podhodPQsin_n_m_fi(n) {
        var Rez;
        Rez = Math.sin(n*(Math.PI/2 - fi)) / Math.sin((n+1)*(Math.PI/2 - fi));
        return Rez;
    };
    function podhodPQsin_n_p_fi(n) {
        var Rez;
        Rez = Math.sin(n*(Math.PI/2 + fi)) / Math.sin((n+1)*(Math.PI/2 + fi));
        return Rez;
    };

// ---- Процедуры вычисления подходящей дроби для cos --------------
    function podhodPQcos_n_1 (n) {
        var Rez;
        Rez = Math.cos((n+1)*fi) / Math.cos(n*fi);
        return Rez;
    };
    function podhodPQcos_n (n) {
        var Rez;
        Rez = Math.cos(n*fi) / Math.cos((n+1)*fi);
        return Rez;
    };
    function podhodPQcos_nPi (n) {
        var Rez;
        Rez = Math.cos(n*(Math.PI/2 - epsilon)) / Math.cos((n+1)*(Math.PI/2 - epsilon));
        return Rez;
    };
    function podhodPQcos_n_1_Pi (n) {
        var Rez;
        Rez = Math.cos((n+1)*(Math.PI/2 - epsilon)) / Math.cso(n*(Math.PI/2 - epsilon));
        return Rez;
    };

// ---- Нахождение модуля r ----------------------------------------- 
    function modulR(mass, i) {
        var Rez = 0;
        summ = summ+Math.log(Math.abs(mass[i])); // Сумма логорифмов 
        Rez = Math.exp( (1/Numb) * summ );   // корень n-й степени из произведение подходящих  
        return Rez;
    };
// ---- Нахождение модуля r ----------------------------------------- 
    // P = 1;
    // function modulR(mass, i) {
    //     P = P* mass[i];
    //     masR[i] = Math.exp( (1/Numb) * Math.log(P) );   // корень n-й степени из произведение подходящих    
    // };
// ---- Нахождение аргумента fi -------------------------------------
    function argumentFi(mass, i) {  // где mas - массив с подходящими для которых нужно вычислить r
        var Rez = 0;  
        if (mass[i] < 0) {          // Кол-во отрицательных подходящих
            kOtr +=1;
        };
        Rez = (kOtr / Numb) * Math.PI;
        return Rez;
    };
// ---- Погрешность модуля ------------------------------------------
    // function pogreshnostR(etalon, R, i) {
    //     pogrR[i] = Math.abs(etalon - R);
    // };
// ---- Погрешность аргумента ---------------------------------------
    // function pogreshnostFi(etalon, Fi_, i) {
    //     pogrFi[i] = etalon - Fi_;
    // };

    function ClearAll() { 
        masPQ1 = [];   
        masPQ2 = [];   
        masPQ3 = [];   
        masPQ4 = [];   
        masR1 = [];
        masFi1 = [];
        kOtr = 0; 
        summ = 0; 
        k = 0;
        Numb = 1;
        countPQ = 0;
        count = 0;
    }
// ---- Функция проверки кратности степени 2 ------------------------
    function tempSt(i){     
        // if (i<90) return true; 
        // if (i==0) return true; 
        if (i==1) return true;
        if (i==3) return true;
        if (i==7) return true;
        if (i==15) return true;
        if (i==31) return true;
        if (i==63) return true;
        if (i==127) return true;
        if (i==255) return true;
        if (i==511) return true;
        if (i==1023) return true;
        if (i==2047) return true;
        if (i==4095) return true;
        if (i==8191) return true;
        if (i==16383) return true;
        if (i==32767) return true;
        if (i==65535) return true;
        if (i==131071) return true;
        if (i==262143) return true;
        if (i==524287) return true;
        if (i==1048575) return true;
        if (i==2097151) return true;
        if (i==4194303) return true;        
    };

    function obrezka(a, kolcifr) {
    var
        stepen = 0,
        kol = 0,
        str = a.toString(),
        newstr = '',
        e = str.indexOf("e");
        if (str.length > 10) {
            if (e != -1) {
                newstr = str.substring(e+1, str.length);
                kol = str.length-e;
                stepen = +newstr;
                if (stepen<0) {
                    if (a>0) {
                        newstr = '0.';
                        for (i = 0; i < (Math.abs(stepen)-1); i++) {
                        newstr = newstr+'0'; 
                        }
                        newstr = newstr+str[0]+str.substring(2, str.length-kol);
                    }
                    if (a<0) { 
                        newstr = '-0.';
                        for (i = 0; i < (Math.abs(stepen)-1); i++) {
                        newstr = newstr+'0'; 
                        }
                        newstr = newstr+str[1]+str.substring(3, str.length-kol);
                    }
                } else {
                    return newstr = 'Степень положительная, недописал пока';
                }
                return newstr = newstr.substring(0, kolcifr);
            }
            return newstr = str.substring(0, kolcifr);
        }
        return str;
    }

// ---- Масштабирование графика -------------------------------------
    function masshtGraf(x) {
        if (Math.abs(x) > Massht) {
            if (x<0) {
                return Massht*(-1);
            } else {
                return Massht;
            }
        } else {
            return x;
        }
    }
// ---- Получение данных для графиков ------------------------------
    function dataGrafik(i, mas_x, mas_y, rezMasBeginX, rezMasEndX, rezMasBeginY, rezMasEndY,) {
        if (i<100) {
            rezMasBeginX[countgraf] = mas_x+1,
            rezMasEndX[countgraf] = mas_y;
            countgraf += 1; 
        };
        if (i == (kolN-101)) {
            countgraf = 0;
        }
        if ( (i>(kolN-100)) && (i<kolN) ) {
            rezMasBeginY[countgraf] = mas_x+1,
            rezMasEndY[countgraf] = mas_y;
            countgraf += 1; 
        };
    }

    function testGrafik(i, mas_x, mas_y, rezMasX, rezMasE_X) {
        if (i<100) {
            rezMasX[countgraf] = mas_x+1,
            rezMasE_X[countgraf] = mas_y;
            countgraf += 1; 
        };

    }

// ------ Процедура вывода на экран ---------------------------------
    function Vivod(col, k) {   // где k - порядковый номер ячейки табицы куда выводим 
        switch(col) {          // где col - колонка таблицы в которую будет выводится
            case 0 :    // Номер (1 столбца)
                sell_1[k].innerHTML = Numb;
                break
            case 1:     // Подходящих Pn1/Qn1 (2 столбец)
                sell_1[k].innerHTML = obrezka(masPQ1[countPQ], kolcifr);
                break
            case 2:     // Подходящих Pn2/Qn2 (3 столбец)
                sell_1[k].innerHTML = obrezka(masPQ2[countPQ], kolcifr);
                break
            case 3:     // Подходящих Pn3/Qn3 (4 столбец)
                sell_1[k].innerHTML = obrezka(masPQ3[countPQ], kolcifr);
                break
            case 4:     // Подходящих Pn4/Qn4 (5 столбец)
                sell_1[k].innerHTML = obrezka(masPQ4[countPQ], kolcifr);
                break    
            case 5:     // Модуль r (6 столбец)
                sell_1[k].innerHTML = obrezka(masR1[countPQ], kolcifr);
                break 
            case 6:     // Аргумент fi (7 столбец)
                sell_1[k].innerHTML = obrezka(masFi1[countPQ], kolcifr);
                break 
            case 7:     // Погрешность модуля r 8 столбец)
                sell_1[k].innerHTML = obrezka(Math.abs(sinFi - masR1[countPQ]), kolcifr);
                break 
            case 8:     // Погрешность аргумента fi (9 столбец)
                sell_1[k].innerHTML = obrezka(Math.abs(0 - masFi1[countPQ]), kolcifr);
                break 
            default:
                sell_1[k].innerHTML = 'нет';
            break
        }
    };
// ---- Отчистка таблицы -------------------------------------------
    btn_clear.onclick = function () {
        // mainT.removeChild(tr);
        var obj=document.querySelectorAll('.tabl')
        for(let i = 0; i < obj.length; i++) {
            obj[i].remove();
        }
    };

// -----------------------------------------------------------------
//      Начала вычислений по нажатию на кнопку "Вычислить"
// -----------------------------------------------------------------
    btn.onclick = function() { 
        kolN = document.getElementsByTagName("input")[0].value;
        ClearAll();
        masPQ1[-1] = 0;
        masPQ2[-1] = 0;
        masPQ3[-1] = 0;
        masPQ4[-1] = 0;
        for (var j = 0; j < kolN; j++) {
            for (var i = 0; i < kolCol; i++) {
                Numb +=1;                                       // Номер итеррации
                masPQ1[countPQ] = podhodPQsin_n_m_fi(Numb);              // Подходящие дроби 1
                masPQ2[countPQ] = podhodPQsin_n_p_fi(Numb);              // Подходящие дроби 2
                masPQ3[countPQ] = masPQ1[countPQ-1]; 
                masPQ4[countPQ] = 0.5 * (masPQ3[countPQ] - masPQ2[countPQ]);
                
                masR1[countPQ]  = modulR(masPQ4, countPQ);      // Модуль r
                masFi1[countPQ] = argumentFi(masPQ4, countPQ);  // Аргумент Fi

                countPQ += 1;           // Счётчик элементов массива
            };
        };
        // -------  Вывод на экран ---
        k = 0;
        Numb = 1;
        countPQ = 0;
        count = 0;
        countgraf = 0;
        for (var j = 0; j < kolN; j++) {   
            dataGrafik(j, j, masshtGraf(masPQ1[j]), iMasBeg1, yMasBeg1, iMasEnd1, yMasEnd1);  
            dataGrafik(j, j, masshtGraf(masPQ2[j]), iMasBeg2, yMasBeg2, iMasEnd2, yMasEnd2);  
            dataGrafik(j, j, masshtGraf(masPQ3[j]), iMasBeg3, yMasBeg3, iMasEnd3, yMasEnd3);  
            // dataGrafik(j, j, masshtGraf(masPQ4[j]), iMasBeg4, yMasBeg4, iMasEnd4, yMasEnd4);  
            // dataGrafik(j, j, masshtGraf(masR1[j]),  iMasBeg5, yMasBeg5, iMasEnd5, yMasEnd5);  
            // testGrafik(j, j, masshtGraf(masPQ3[j]), iMasBeg3, yMasBeg3);
            // testGrafik(j, j, masshtGraf(masPQ4[j]), iMasBeg4, yMasBeg4);

            if (tempSt(j) == true) {
                createTr();
                for (var i = 0; i < kolCol; i++) {
                    createTd(count);
                    Vivod(i,k);
                    k +=1;
                }
                count +=1;
            }
            Numb +=1;
            countPQ += 1;
        };   
        // console.log(iMasBeg1,iMasEnd1);
    }

// -----------------------------------------------------------------
//      Вывод диагрвм на кнопку "Графики"
// -----------------------------------------------------------------
    function drowGraphik(ctx, x1, y1, nameG) {
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: x1,              // Масив с данными (по ось х)
                datasets: [{
                    label: nameG,   // Имя графика
                    data: y1,          // Масив с данными (по ось у)
                    backgroundColor: 
                        'black'
                    ,
                    borderColor: 'none',
                    borderWidth: 0
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        gridLines: 0,       // Отключаем линни сетки (по ось у)
                        ticks: {
                            beginAtZero:true
                        }
                    }],
                    xAxes: [{
                        gridLines: 0        // Отключаем линни сетки (по ось х)
                    }]
                }
            }
        });
    }


var ctx1 = document.getElementById("grafik1").getContext('2d');
var ctx2 = document.getElementById("grafik2").getContext('2d');
var ctx3 = document.getElementById("grafik3").getContext('2d');
var ctx4 = document.getElementById("grafik4").getContext('2d');
var ctx5 = document.getElementById("grafik5").getContext('2d');
var ctx6 = document.getElementById("grafik6").getContext('2d');
// var ctx7 = document.getElementById("grafik7").getContext('2d');
// var ctx8 = document.getElementById("grafik8").getContext('2d');
// var ctx9 = document.getElementById("grafik9").getContext('2d');
// var ctx10 = document.getElementById("grafik10").getContext('2d');


    btn_test.onclick = function() { 
        drowGraphik(ctx1, iMasBeg1, yMasBeg1, 'Подходящие Pn/Qn');
        drowGraphik(ctx2, iMasEnd1, yMasEnd1, 'Подходящие Pn/Qn');
        drowGraphik(ctx3, iMasBeg2, yMasBeg2, 'Подходящие Pn/Qn 2');
        drowGraphik(ctx4, iMasEnd2, yMasEnd2, 'Подходящие Pn/Qn 2');        
        drowGraphik(ctx5, iMasBeg3, yMasBeg3, 'Подходящие Pn/Qn 3');        
        drowGraphik(ctx6, iMasEnd3, yMasEnd3, 'Подходящие Pn/Qn 3');                
        // drowGraphik(ctx7, iMasBeg4, yMasBeg4, 'Модуль r');                
        // drowGraphik(ctx8, iMasEnd4, yMasEnd4, 'Модуль r');        
        // drowGraphik(ctx9, iMasBeg5, yMasBeg5, 'Test');                
        // drowGraphik(ctx10, iMasEnd5, yMasEnd5, 'Test');  
                
    }    

}