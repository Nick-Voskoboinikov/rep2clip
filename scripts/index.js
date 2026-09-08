
function recallSettings(){
  let settingsNeedUpdate=false;
    if ((localStorage.getItem("prefs") === null) || settingsNeedUpdate ){
      console.log('No prefs set previously, creating anew...');
      let arrPrefs={"theme":"Тёмная","decimal separator":",","apply formatting":false,"reported strings":{"Киоск, продажи и Киоск, чек": true, "Напитки": true,"Саб дня 15см": true,"Саб дня 30см": true,"Комбо Трио": true},"measurement units":{"Люди":" 👤","Люди, много":" 👥","Деньги":" ₽","Доставки":" 📦","Сэндвичи 15см":" 🥪","Сэндвичи 30см":" 🥖","Напитки":" 🥤","Комбо-трио":" 🥖🥤🍪"}}
      let jsonedPrefs=JSON.stringify(arrPrefs);;
      localStorage.setItem("prefs", jsonedPrefs);
    }
    let jsonedPrefsRead=JSON.parse(localStorage.getItem("prefs"));
    // console.log(jsonedPrefsRead);
    
    document.querySelector('#pref_decimal_separator').value=jsonedPrefsRead['decimal separator'];
    document.querySelector('#pref_decimal_separator').addEventListener('change',()=>{
      updateSettings();
    });
    let pref_theme_selector=document.querySelector('#pref_theme');
    // let pref_theme_selectedOption = [...pref_theme_selector.options].find(
    //   option => option.value === jsonedPrefsRead['theme']
    // );
    // console.log(pref_theme_selectedOption);
    pref_theme_selector.value = jsonedPrefsRead['theme'];
    pref_theme_selector.addEventListener('change',()=>{
      updateSettings();
    });
    document.querySelector('#pref_peeps').value=jsonedPrefsRead['measurement units']['Люди'];
    document.querySelector('#pref_peeps').addEventListener('change',()=>{
      updateSettings();
    });
    document.querySelector('#pref_peeps_lots').value=jsonedPrefsRead['measurement units']['Люди, много'];
    document.querySelector('#pref_peeps_lots').addEventListener('change',()=>{
      updateSettings();
    });
    document.querySelector('#pref_cash').value=jsonedPrefsRead['measurement units']['Деньги'];
    document.querySelector('#pref_cash').addEventListener('change',()=>{
      updateSettings();
    });
    document.querySelector('#pref_deliveries').value=jsonedPrefsRead['measurement units']['Доставки'];
    document.querySelector('#pref_deliveries').addEventListener('change',()=>{
      updateSettings();
    });
    document.querySelector('#pref_sixinches').value=jsonedPrefsRead['measurement units']['Сэндвичи 15см'];
    document.querySelector('#pref_sixinches').addEventListener('change',()=>{
      updateSettings();
    });
    document.querySelector('#pref_footlongs').value=jsonedPrefsRead['measurement units']['Сэндвичи 30см'];
    document.querySelector('#pref_footlongs').addEventListener('change',()=>{
      updateSettings();
    });
    document.querySelector('#pref_trios').value=jsonedPrefsRead['measurement units']['Комбо-трио'];
    document.querySelector('#pref_trios').addEventListener('change',()=>{
      updateSettings();
    });
    document.querySelector('#pref_drinks').value=jsonedPrefsRead['measurement units']['Напитки'];
    document.querySelector('#pref_drinks').addEventListener('change',()=>{
      updateSettings();
    });
    document.querySelector('#pref_include_kiosk').checked=(!!jsonedPrefsRead['reported strings']['Киоск, продажи и Киоск, чек']);
    document.querySelector('#pref_include_kiosk').addEventListener('change',()=>{
      updateSettings();
    });
    document.querySelector('#pref_include_drinks').checked=(!!jsonedPrefsRead['reported strings']['Напитки']);
    document.querySelector('#pref_include_drinks').addEventListener('change',()=>{
      updateSettings();
    });
    document.querySelector('#pref_include_sixinches').checked=(!!jsonedPrefsRead['reported strings']['Саб дня 15см']);
    document.querySelector('#pref_include_sixinches').addEventListener('change',()=>{
      updateSettings();
    });
    document.querySelector('#pref_include_footlongs').checked=(!!jsonedPrefsRead['reported strings']['Саб дня 30см']);
    document.querySelector('#pref_include_footlongs').addEventListener('change',()=>{
      updateSettings();
    });
    document.querySelector('#pref_include_combo_trio').checked=(!!jsonedPrefsRead['reported strings']['Комбо Трио']);
    document.querySelector('#pref_include_combo_trio').addEventListener('change',()=>{
      updateSettings();
    });
    document.querySelector('#pref_attempt_formatting').checked=(!!jsonedPrefsRead['apply formatting']);
    document.querySelector('#pref_attempt_formatting').addEventListener('change',()=>{
      updateSettings();
    });
}
function updateSettings(){
  let arrPrefs={"theme":document.querySelector('#pref_theme').value,"decimal separator":document.querySelector('#pref_decimal_separator').value,"apply formatting":document.querySelector('#pref_attempt_formatting').checked,"reported strings":{"Киоск, продажи и Киоск, чек": document.querySelector('#pref_include_kiosk').checked, "Напитки": document.querySelector('#pref_include_drinks').checked,"Саб дня 15см": document.querySelector('#pref_include_sixinches').checked,"Саб дня 30см": document.querySelector('#pref_include_footlongs').checked,"Комбо Трио": document.querySelector('#pref_include_combo_trio').checked},"measurement units":{"Люди":document.querySelector('#pref_peeps').value,"Люди, много":document.querySelector('#pref_peeps_lots').value,"Деньги":document.querySelector('#pref_cash').value,"Доставки":document.querySelector('#pref_deliveries').value,"Сэндвичи 15см":document.querySelector('#pref_sixinches').value,"Сэндвичи 30см":document.querySelector('#pref_footlongs').value,"Напитки":document.querySelector('#pref_drinks').value,"Комбо-трио":document.querySelector('#pref_trios').value}};
  localStorage.setItem("prefs", JSON.stringify(arrPrefs));
  // console.log("settings updated");
  // console.log(arrPrefs);
  
  alertus.show('Настройки обновлены.');
  checkSettings();
}

function checkSettings(){
  (document.querySelector('html')).setAttribute('data-theme', (JSON.parse(localStorage.getItem("prefs")))['theme']);
  if((JSON.parse(localStorage.getItem("prefs")))['theme'] === 'Психоделика'){
    RunPsychodelica();
  }
  if((JSON.parse(localStorage.getItem("prefs")))['reported strings']['Киоск, продажи и Киоск, чек'] === false){
    document.querySelector('tr:has(#kioskSum)').style.display='none';
    document.querySelector('tr:has(#kioskGuests)').style.display='none';
  } else {
    document.querySelector('tr:has(#kioskSum)').style.display='table-row';
    document.querySelector('tr:has(#kioskGuests)').style.display='table-row';
  }
  if((JSON.parse(localStorage.getItem("prefs")))['reported strings']['Напитки'] === false){
    document.querySelector('tr:has(#drinks)').style.display='none';
  } else {
    document.querySelector('tr:has(#drinks)').style.display='table-row';
  }
  if((JSON.parse(localStorage.getItem("prefs")))['reported strings']['Саб дня 15см'] === false){
    document.querySelector('tr:has(#sixInchesOfTheDay)').style.display='none';
  } else {
    document.querySelector('tr:has(#sixInchesOfTheDay)').style.display='table-row';
  }
  if((JSON.parse(localStorage.getItem("prefs")))['reported strings']['Саб дня 30см'] === false){
    document.querySelector('tr:has(#footlongsOfTheDay)').style.display='none';
  } else {
    document.querySelector('tr:has(#footlongsOfTheDay)').style.display='table-row';
  }
  if((JSON.parse(localStorage.getItem("prefs")))['reported strings']['Комбо Трио'] === false){
    document.querySelector('tr:has(#trio)').style.display='none';
  } else {
    document.querySelector('tr:has(#trio)').style.display='table-row';
  }
}
function RunPsychodelica(){
  if((JSON.parse(localStorage.getItem("prefs")))['theme'] === 'Психоделика'){
    console.log((JSON.parse(localStorage.getItem("prefs")))['theme']);
    console.log(getRandomColor());
    let r = document.querySelector(':root');
    r.style.setProperty('--main-bg-color', getRandomColor());
    r.style.setProperty('--main-inputs-bg-color', getRandomColor());
    r.style.setProperty('--main-bg-active-color', getRandomColor());
    r.style.setProperty('--main-text-color', getRandomColor());
    r.style.setProperty('--main-special-color', getRandomColor());
    r.style.setProperty('--main-active-color', getRandomColor());

    setTimeout(RunPsychodelica, 1500);
  } else {
    let r = document.querySelector(':root');
    r.style.setProperty('--main-bg-color', '');
    r.style.setProperty('--main-inputs-bg-color', '');
    r.style.setProperty('--main-bg-active-color', '');
    r.style.setProperty('--main-text-color', '');
    r.style.setProperty('--main-special-color', '');
    r.style.setProperty('--main-active-color', '');
  }
}

function StopPsychodelica(psychodelicaThemeInterval){
  clearInterval(psychodelicaThemeInterval);
}

function getRandomColor() {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
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
let cashierBoxSum = parseInt((document.querySelector('#cashierBoxSum').value), 10);
if(isNaN(cashierBoxSum)){alert('Не указана ваыручка с кассы, заполните хотя бы нолём.');return;}
let cashierGuests = parseInt((document.querySelector('#cashierBoxGuests').value), 10);
if(isNaN(cashierGuests)){alert('Не указано количество чеков с кассы , заполните хотя бы нолём.');return;}
let yandexDeliveries = parseInt((document.querySelector('#yandexDeliveries').value), 10);
if(isNaN(yandexDeliveries)){alert('Не указано количество яндекс-доставок, заполните хотя бы нолём.');return;}
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

output = `${datey}:

Выручка общая:  ${af(kioskSum+cashierBoxSum)}${(JSON.parse(localStorage.getItem("prefs")))['measurement units']['Деньги']}
`;
if((JSON.parse(localStorage.getItem("prefs")))['reported strings']['Киоск, продажи и Киоск, чек']){
output += `Киоск, продажи:  ${af(kioskSum)}${(JSON.parse(localStorage.getItem("prefs")))['measurement units']['Деньги']}
Киоск, чек: ${af(fixDecimals(kioskCheque))}${(JSON.parse(localStorage.getItem("prefs")))['measurement units']['Деньги']}
`;
}
output += `Касса, продажи:  ${af(cashierBoxSum)}${(JSON.parse(localStorage.getItem("prefs")))['measurement units']['Деньги']}
Касса, чек:  ${af(fixDecimals((cashierBoxSum/cashierGuests).toFixed(2)))}${(JSON.parse(localStorage.getItem("prefs")))['measurement units']['Деньги']}
Количество гостей: `;
if((JSON.parse(localStorage.getItem("prefs")))['reported strings']['Киоск, продажи и Киоск, чек']){
  output += `(${kioskGuests}+${cashierGuests})=`;
}
output += `${af(kioskGuests+cashierGuests)}${(JSON.parse(localStorage.getItem("prefs")))['measurement units']['Люди, много']}
Средний чек:  ${af(fixDecimals(((kioskSum+cashierBoxSum)/(kioskGuests+cashierGuests)).toFixed(2)))}${(JSON.parse(localStorage.getItem("prefs")))['measurement units']['Деньги']}
`;
if((JSON.parse(localStorage.getItem("prefs")))['reported strings']['Напитки']){
output += `Напитки:  ${af(cashierDrinks)}${(JSON.parse(localStorage.getItem("prefs")))['measurement units']['Напитки']}
`;
}
output += `Офф​лайн:  ${af(((kioskGuests+cashierGuests)-yandexDeliveries))}${(JSON.parse(localStorage.getItem("prefs")))['measurement units']['Люди']}
`;
if((JSON.parse(localStorage.getItem("prefs")))['reported strings']['Саб дня 15см']){
output += `Саб дня 15см: ${af(sixInchesOfTheDay)}${(JSON.parse(localStorage.getItem("prefs")))['measurement units']['Сэндвичи 15см']}
`;
}
if((JSON.parse(localStorage.getItem("prefs")))['reported strings']['Саб дня 30см']){
output += `Саб дня 30см:  ${af(footlongsOfTheDay)}${(JSON.parse(localStorage.getItem("prefs")))['measurement units']['Сэндвичи 30см']}
`;
}
if((JSON.parse(localStorage.getItem("prefs")))['reported strings']['Комбо Трио']){
output += `Комбо Трио:  ${af(triosN)}${(JSON.parse(localStorage.getItem("prefs")))['measurement units']['Комбо-трио']}`;
}

navigator.clipboard.writeText(output);
alertu.show('Скопировано в буфер обмена.<br>Теперь можно вставить в чат.');
}

// function applies formatting if needed
function af(numberForFormattingApplication=0){
  if((JSON.parse(localStorage.getItem("prefs")))['apply formatting']){
    return '```'+numberForFormattingApplication+'```';
  }else{
    return numberForFormattingApplication;
  }
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

var alertus=new AlertBox('#alert-area', {
		    closeTime: 2000,
		    persistent: false,
		    hideCloseButton: false
		    });
var alertu=new AlertBox('#alertu-area', {
		    closeTime: 2000,
		    persistent: false,
		    hideCloseButton: false
		    });

document.addEventListener("DOMContentLoaded",()=>{
  recallSettings();
  checkSettings();
});


document.querySelector('#settingsBtn').addEventListener('click',()=>{
  document.querySelector('#settings_dialog').showModal();
});

document.querySelector('#close_prefs').addEventListener('click',()=>{
  document.querySelector('#settings_dialog').close();
});