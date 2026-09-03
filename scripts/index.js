
function recallSettings(){
    if (localStorage.getItem("prefs") === null) {
      console.log('No prefs set previously, creating anew...');
      let arrPrefs={"theme":"Тёмная","decimal separator":",","reported strings":{"Киоск, продажи и Киоск, чек": true, "Напитки": true,"Саб дня 15см": true,"Саб дня 30см": true,"Комбо Трио": true},"measurement units":{"Люди":" 👤","Люди, много":" 👥","Деньги":" ₽","Доставки":" 📦","Сэндвичи 15см":" 🥪","Сэндвичи 30см":" 🥖","Напитки":" 🥤","Комбо-трио":" 🥖🥤🍪"}}
      let jsonedPrefs=JSON.stringify(arrPrefs);;
      localStorage.setItem("prefs", jsonedPrefs);
    }
    let jsonedPrefsRead=JSON.parse(localStorage.getItem("prefs"));
    // console.log(jsonedPrefsRead);
    document.querySelector('#pref_decimal_separator').value=jsonedPrefsRead['decimal separator'];
    let pref_theme_selector=document.querySelector('#pref_theme');
    // let pref_theme_selectedOption = [...pref_theme_selector.options].find(
    //   option => option.value === jsonedPrefsRead['theme']
    // );
    // console.log(pref_theme_selectedOption);
    pref_theme_selector.value = jsonedPrefsRead['theme'];
    document.querySelector('#pref_peeps').value=jsonedPrefsRead['measurement units']['Люди'];
    document.querySelector('#pref_peeps_lots').value=jsonedPrefsRead['measurement units']['Люди, много'];
    document.querySelector('#pref_cash').value=jsonedPrefsRead['measurement units']['Деньги'];
    document.querySelector('#pref_deliveries').value=jsonedPrefsRead['measurement units']['Доставки'];
    document.querySelector('#pref_sixinches').value=jsonedPrefsRead['measurement units']['Сэндвичи 15см'];
    document.querySelector('#pref_footlongs').value=jsonedPrefsRead['measurement units']['Сэндвичи 30см'];
    document.querySelector('#pref_trios').value=jsonedPrefsRead['measurement units']['Комбо-трио'];
    document.querySelector('#pref_drinks').value=jsonedPrefsRead['measurement units']['Напитки'];
    // console.log(jsonedPrefsRead['measurement units']);


    console.log(jsonedPrefsRead['reported strings']);
    // console.log((JSON.parse(localStorage.getItem("prefs")))['measurement units']['Деньги']);
}

function fixDecimals(numToFix){
 return (String(numToFix)).replace(".", (JSON.parse(localStorage.getItem("prefs")))['decimal separator']);
}

function goClip(){
const d = new Date();
let datey;
const options = { day: '2-digit', month: '2-digit', year: 'numeric' }; // Define options for formatting
if (document.querySelector('input#forStrictDate:checked')!= null){
datey = d.toLocaleDateString('ru-RU', options).replace(/\//g, '.'); // Format and replace slashes with dots
} else if( (document.querySelector('input#forInterMed:checked')) != null ) {
datey = 'Промежуточная статистика на 21:00 ' + d.toLocaleDateString('ru-RU', options).replace(/\//g, '.');
} else {
  let e=new Date;
  e.setDate(d.getDate()-1);
  datey =e.toLocaleDateString('ru-RU', options).replace(/\//g, '.')+' -- '+d.toLocaleDateString('ru-RU', options).replace(/\//g, '.');
}


let cashierDrinks = parseInt((document.querySelector('#drinks').value), 10);
if(isNaN(cashierDrinks)){cashierDrinks=0;}
cashierDrinks += ' 🥤';
let cashierBoxSum = parseInt((document.querySelector('#cashierBoxSum').value), 10);
if(isNaN(cashierBoxSum)){
  alert('Не указана ваыручка с кассы, заполните хотя бы нолём.');
  return;
}
let cashierGuests = parseInt((document.querySelector('#cashierBoxGuests').value), 10);
if(isNaN(cashierGuests)){
  alert('Не указано количество чеков с кассы , заполните хотя бы нолём.');
  return;
}
let yandexDeliveries = parseInt((document.querySelector('#yandexDeliveries').value), 10);
if(isNaN(yandexDeliveries)){
  alert('Не указано количество яндекс-доставок, заполните хотя бы нолём.');
  return;
}
console.log('ай!');
let kioskSum = parseInt((document.querySelector('#kioskSum').value), 10);
if(isNaN(kioskSum)){kioskSum=0;}
let kioskGuests = parseInt((document.querySelector('#kioskGuests').value), 10);
if(isNaN(kioskGuests)){kioskGuests=0;}
let sixInchesOfTheDay = parseInt((document.querySelector('#sixInchesOfTheDay').value), 10);
if(isNaN(sixInchesOfTheDay)){sixInchesOfTheDay=0;}
let footlongsOfTheDay = parseInt((document.querySelector('#footlongsOfTheDay').value), 10);
if(isNaN(footlongsOfTheDay)){footlongsOfTheDay=0;}
let triosN = parseInt((document.querySelector('#trio').value), 10);
if(isNaN(triosN)){triosN=0;}

let kioskCheque = (kioskGuests === 0) ? 0 : (kioskSum/kioskGuests).toFixed(2);

kioskCheque += ' ₽';
let trios = triosN + ' 🥖🥤🍪';
output = `${datey}:

Выручка общая: ${kioskSum+cashierBoxSum} ₽
Киоск, продажи: ${kioskSum} ₽
Киоск, чек: ${fixDecimals(kioskCheque)}
Касса, продажи: ${cashierBoxSum} ₽
Касса, чек: ${fixDecimals((cashierBoxSum/cashierGuests).toFixed(2))} ₽
Количество гостей: (${kioskGuests}+${cashierGuests})=${kioskGuests+cashierGuests} 👥
Средний чек: ${fixDecimals(((kioskSum+cashierBoxSum)/(kioskGuests+cashierGuests)).toFixed(2))} ₽
Напитки: ${cashierDrinks}
Офф​лайн: ${(kioskGuests+cashierGuests)-yandexDeliveries} 👤
`
output += `Саб дня 15см: ${sixInchesOfTheDay} 🥪
Саб дня 30см: ${footlongsOfTheDay} 🥖
Комбо Трио: ${trios}
`
navigator.clipboard.writeText(output);
}



// num input validation:
function validateInput(el) {
  el.addEventListener("beforeinput", function (e) {
    let beforeValue = el.value;
    e.target.addEventListener(
      "input",
      function () {
        if (el.validity.patternMismatch) {
          el.value = beforeValue;
        }
      },
      { once: true }
    );
  });
}
const numericInputs = document.querySelectorAll("[inputmode=numeric]");
numericInputs.forEach((input) => {
  validateInput(input);
});

let possiblePeriods=document.querySelectorAll('input[type=radio][name=period]');
possiblePeriods.forEach(item => {
    item.addEventListener('change',()=>{
  if(document.querySelector('#forInterMed').checked){
    document.querySelector('#interMedStatSumField').style.display='block';
  } else {
    document.querySelector('#interMedStatSumField').style.display='none';
  }
});
});

let kioskPreSum=document.querySelector('#kioskPreSum');
kioskPreSum.addEventListener('keyup',()=>{
  let vals=(kioskPreSum.value).split(' ');
  if((vals[vals.length - 1]).length !== 0 ){
    document.querySelector('#kioskGuests').value=vals.length;
  } else {
    document.querySelector('#kioskGuests').value=vals.length-1;
  }
  document.querySelector('#kioskSum').value=vals.reduce((acc, num) => acc + Number(num), 0);
},false);

document.addEventListener("DOMContentLoaded",recallSettings());
