let elName = document.querySelector(`.elName`);
let qNum = document.querySelector(`.qNum`);
let elementSen = document.querySelector(`.elementSen`);
let elementName = document.querySelector(`.elementName`);
let heart = document.getElementById(`heart`);

let hTime;

// geting the value of element name
function getValue(val) {
     // clearing the inputs
     if (elName.value.length <= 2) {
          // 💗H💗
          if (elName.value === `h` || elName.value === `H`) {
          heart.style.display = `block`;
          hTime = setTimeout(() => heart.style.display = `none`, 5000);
          }
          else{
               heart.style.display = `none`;
               hTime ? clearTimeout(hTime): null;
          }

          elementName.innerText = val + `: `;
          if (elementName.innerText == `` || elementName.innerText == `:`) {
               elementName.innerText = `h: `;
          }
     }
}

let n = document.querySelector(`.n`);
let l = document.querySelector(`.l`);
let ml = document.querySelector(`.ml`);
let ms = document.querySelector(`.ms`);

let quants = [`1s`, `2s`, `2p`, `3s`, `3p`, `4s`, `3d`, `4p`, `5s`, `4d`, `5p`, `6s`, `5f`, `5d`, `6p`, `7s`, `6f`, `6d`, `7p`]
// getting the sens
function getQuant(val) {
     // clearing the inputs
     if (qNum.value < 1) {
          val = 1;
          qNum.value = 1
     }
     else if (qNum.value > 118) {
          val = 118;
          qNum.value = 118;
     }

     let sens = ` `;
     let result = Number(val);
     let senRes = 0;
     for (let i = 0; i < quants.length; i++) {
          if (result <= 0) break;
          if (quants[i][1] == `s`) {
               result -= 2;
               senRes = result + 2;
               sens += ` ${quants[i]} `;
          }
          else if (quants[i][1] == `p`) {
               result -= 6;
               senRes = result + 6;
               sens += ` ${quants[i]} `;
          }
          else if (quants[i][1] == `d`) {
               result -= 10;
               senRes = result + 10;
               sens += ` ${quants[i]} `;
          }
          else if (quants[i][1] == `f`) {
               result -= 14;
               senRes = result + 14;
               sens += ` ${quants[i]} `;
          }
     }
     lastNum = sens.charAt(sens.length - 3);
     lastChar = sens.charAt(sens.length - 2);
     let qNums = getQuantsNums(lastNum, lastChar, senRes);

     n.innerText = `N = ${qNums.n ? qNums.n : ``}`;
     l.innerText = `L = ${qNums.l >= 0 ? qNums.l : ``}`;
     ml.innerText = `ml = ${qNums.ml >= -3 ? qNums.ml : ``}`;
     ms.innerText = `ms = ${qNums.ms ? qNums.ms : ``}`;

     elementSen.innerText = sens;
}

// getting quantity numbers
function getQuantsNums(lastNum, lastChar, senRes) {
     let quantsNums = {};

     // find N number (the easiest)
     quantsNums.n = lastNum;

     // find L number
     if (lastChar == `s`) quantsNums.l = 0;
     else if (lastChar == `p`) quantsNums.l = 1;
     else if (lastChar == `d`) quantsNums.l = 2;
     else if (lastChar == `f`) quantsNums.l = 3;

     // find MS number (1/2 or -1/2)
     if (lastChar == `s`) quantsNums.ms = senRes > 2 / 2 ? `-1/2` : `1/2`;
     else if (lastChar == `p`) quantsNums.ms = senRes > 6 / 2 ? `-1/2` : `1/2`;
     else if (lastChar == `d`) quantsNums.ms = senRes > 10 / 2 ? `-1/2` : `1/2`;
     else if (lastChar == `f`) quantsNums.ms = senRes > 14 / 2 ? `-1/2` : `1/2`;

     // find ML number
     if (lastChar == `s`) quantsNums.ml = 0;
     else if (lastChar == `p`) {
          if (senRes == 1 || senRes == 4) quantsNums.ml = -1;
          else if (senRes == 2 || senRes == 5) quantsNums.ml = 0;
          else if (senRes == 3 || senRes == 6) quantsNums.ml = 1;
     }
     else if (lastChar == `d`) {
          if (senRes == 1 || senRes == 6) quantsNums.ml = -2;
          else if (senRes == 2 || senRes == 7) quantsNums.ml = -1;
          else if (senRes == 3 || senRes == 8) quantsNums.ml = 0;
          else if (senRes == 4 || senRes == 9) quantsNums.ml = 1;
          else if (senRes == 5 || senRes == 10) quantsNums.ml = 2;
     }
     else if (lastChar == `f`) {
          if (senRes == 1 || senRes == 8) quantsNums.ml = -3;
          else if (senRes == 2 || senRes == 9) quantsNums.ml = -2;
          else if (senRes == 3 || senRes == 10) quantsNums.ml = -1;
          else if (senRes == 4 || senRes == 11) quantsNums.ml = 0;
          else if (senRes == 5 || senRes == 12) quantsNums.ml = 1;
          else if (senRes == 6 || senRes == 13) quantsNums.ml = 2;
          else if (senRes == 7 || senRes == 14) quantsNums.ml = 3;
     }

     return quantsNums;
}