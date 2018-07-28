window.onload = function () {
var kolN = 132000,  // До какого номера считать
    kolCol = 9,     // Кол-во колонок в табл
    fi = 1.23456,
    epsilon = 0.00001,
    cosFi = Math.cos(fi),
    sinFi = Math.sin(fi),
    ctgFi = Math.cos(fi)/Math.sin(fi),
    k = 0,
    P = 1,
    Numb = 1,       // Номер подходяшей (номер строки в табл)
    masPQ1 = [],    // Массив с подходящими
    masPQ2 = [],    // Массив с подходящими
    masPQ3 = [],    // Массив с подходящими
    masPQ4 = [],    // Массив с подходящими
    masPQrazn = [],
    masR = [],      // Массив с результ Модуля (r)
    masFi = [],     // Массив с результ аргумента (fi) 
    countPQ = 0,    // Счётчик для массивов подходящих и модуля
    kOtr = 0,       // Кол-во отрицательных подходящих
    summ = 0,       // Сумма логорифмов
    count = 0,      // для вывода в табл
    kolcifr = 12,   // Кол-во отображаемых цифр в ячейках (вместе с '.' и '-')
    sell_1 = document.getElementsByClassName('s1'),
    temp = document.getElementsByClassName('temp'),
    const1 = document.getElementsByClassName('const1'),
    btn = document.getElementsByTagName("button")[0],
    btn_test = document.getElementsByTagName("button")[1];
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

// ---- Вычисляем очередную подходящую дробь -----------------------
    function podhodPQ1 (n) {
        var Rez;
        Rez = ( Math.sin((n+1)*(Math.PI/2 - epsilon)) / Math.sin( n*(Math.PI/2 - epsilon) ) );
        return Rez;
    };

    function podhodPQ2 (n) {
        var Rez;
        Rez = Math.sin(n*fi) / Math.sin((n+1)*fi);
        return Rez;
    };
    function podhodPQ3 (n) {
        var Rez;
        Rez = Math.sin((n+1)*fi) / Math.sin(n*fi);
        return Rez;
    };
    function podhodPQ4 (n) {
        var Rez;
        Rez = ( Math.sin( n*(Math.PI/2 - epsilon) ) / Math.sin((n+1)*(Math.PI/2 - epsilon)) );
        return Rez;
    };
// ---- Нахождение модуля r ----------------------------------------- 
    function modulR(mass, i) {
        summ = summ+Math.log(Math.abs(mass[i])); // Сумма логорифмов 
        masR[i] = Math.exp( (1/Numb) * summ );   // корень n-й степени из произведение подходящих    
    };
// ---- Нахождение модуля r ----------------------------------------- 
    // P = 1;
    // function modulR(mass, i) {
    //     P = P* mass[i];
    //     masR[i] = Math.exp( (1/Numb) * Math.log(P) );   // корень n-й степени из произведение подходящих    
    // };
// ---- Нахождение аргумента fi -------------------------------------
    function argumentFi(mass, i) {  // где mas - массив с подходящими для которых нужно вычислить r
        if (mass[i] < 0) {          // Кол-во отрицательных подходящих
            kOtr +=1;
        };
        masFi[i] = (kOtr / Numb) * Math.PI;
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
        masR = [];
        masFi = [];
        kOtr = 0; 
        summ = 0; 
        k = 0;
        Numb = 1;
        countPQ = 0;
        count = 0;
    }
// ---- Функция проверки кратности степени 2 ------------------------
    function tempSt(i){     
        // if (i<11) return true; 
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

    // btn_test.onclick = function() { 
    //     temp[0].innerHTML = obrezka(8.29136813207398e+25, 12);
    // }

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
                sell_1[k].innerHTML = obrezka(masR[countPQ], kolcifr);
                break 
            case 6:     // Аргумент fi (7 столбец)
                sell_1[k].innerHTML = obrezka(masFi[countPQ], kolcifr);
                break 
            case 7:     // Погрешность модуля r 8 столбец)
                sell_1[k].innerHTML = obrezka(Math.abs(sinFi - masR[countPQ]), kolcifr);
                break 
            case 8:     // Погрешность аргумента fi (9 столбец)
                sell_1[k].innerHTML = obrezka(Math.abs(0 - masFi[countPQ]), kolcifr);
                break 
            default:
                sell_1[k].innerHTML = 'нет';
            break
        }
    };

// -----------------------------------------------------------------
//      Начала вычислений по нажатию на кнопку "Вычислить"
// -----------------------------------------------------------------
    btn.onclick = function() { 
        kolN = document.getElementsByTagName("input")[0].value;
        ClearAll();
        masPQ3[-2] = 1;
        masPQ3[-1] = 1;
        for (var j = 0; j < kolN; j++) {
            for (var i = 0; i < kolCol; i++) {
                Numb +=1;                               // Номер итеррации
                masPQ1[countPQ] = podhodPQ4(Numb);      // Подходящие дроби 1
                masPQ2[countPQ] = podhodPQ3(Numb);      // Подходящие дроби 2
                masPQ3[countPQ] = masPQ2[countPQ] - cosFi; 
                masPQ4[countPQ] = masPQ1[countPQ] * masPQ3[countPQ];
                
                modulR(masPQ4, countPQ);                    // Модуль r
                argumentFi(masPQ4, countPQ);                // Аргумент Fi

                countPQ += 1;
            };
        };
        // -------  Вывод на экран 
        k = 0;
        Numb = 1;
        countPQ = 0;
        count = 0;
        for (var j = 0; j < kolN; j++) {     
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
    }


}