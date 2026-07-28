
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
let cashierGuests = parseInt((document.querySelector('#cashierBoxGuests').value), 10);
let cashierBoxSum = parseInt((document.querySelector('#cashierBoxSum').value), 10);
let yandexDeliveries = parseInt((document.querySelector('#yandexDeliveries').value), 10);
let kioskSum = parseInt((document.querySelector('#kioskSum').value), 10);
let kioskGuests = parseInt((document.querySelector('#kioskGuests').value), 10);
// navigator.clipboard.writeText(`**${datey}**:

// **Выручка общая: \`\`\`${kioskSum+cashierBoxSum}\`\`\` ₽**
// Киоск продажи: \`\`\`${kioskSum}\`\`\` ₽
// Киоск чек: \`\`\`${(kioskSum/kioskGuests).toFixed(2)}\`\`\` ₽
// Касса продажи: \`\`\`${cashierBoxSum}\`\`\` ₽
// Касса чек: \`\`\`${(cashierBoxSum/cashierGuests).toFixed(2)}\`\`\` ₽
// Количество гостей: (${kioskGuests}+${cashierGuests})=\`\`\`${kioskGuests+cashierGuests}\`\`\` 👥
// Средний чек: \`\`\`${((kioskSum+cashierBoxSum)/(kioskGuests+cashierGuests)).toFixed(2)}\`\`\` ₽
// Напитки: \`\`\`${cashierDrinks}\`\`\`🥤
// Офф​лайн: \`\`\`${(kioskGuests+cashierGuests)-yandexDeliveries}\`\`\` 👤
// `);
navigator.clipboard.writeText(`${datey}:

Выручка общая: ${kioskSum+cashierBoxSum}
Киоск продажи: ${kioskSum}
Киоск чек: ${(kioskSum/kioskGuests).toFixed(2)}
Касса продажи: ${cashierBoxSum}
Касса чек: ${(cashierBoxSum/cashierGuests).toFixed(2)}
Количество гостей: (${kioskGuests}+${cashierGuests})=${kioskGuests+cashierGuests}
Средний чек: ${((kioskSum+cashierBoxSum)/(kioskGuests+cashierGuests)).toFixed(2)}
Напитки: ${cashierDrinks}🥤
Офф​лайн: ${(kioskGuests+cashierGuests)-yandexDeliveries}
`);
// navigator.clipboard.writeText(`${datey}:

// Выручка общая: ${kioskSum+cashierBoxSum} ₽
// Киоск продажи: ${kioskSum} ₽
// Киоск чек: ${(kioskSum/kioskGuests).toFixed(2)} ₽
// Касса продажи: ${cashierBoxSum} ₽
// Касса чек: ${(cashierBoxSum/cashierGuests).toFixed(2)} ₽
// Количество гостей: (${kioskGuests}+${cashierGuests})=${kioskGuests+cashierGuests} 👥
// Средний чек: ${((kioskSum+cashierBoxSum)/(kioskGuests+cashierGuests)).toFixed(2)} ₽
// Напитки: ${cashierDrinks}🥤
// Офф​лайн: ${(kioskGuests+cashierGuests)-yandexDeliveries} 👤
// `);
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