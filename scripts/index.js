
function goClip(){
const d = new Date();
let datey;
const options = { day: '2-digit', month: '2-digit', year: 'numeric' }; // Define options for formatting
if (document.querySelector('input#forStrictDate:checked')!= null){
datey = d.toLocaleDateString('ru-RU', options).replace(/\//g, '.'); // Format and replace slashes with dots
} else if( (document.querySelector('input#forInterMed:checked')) != null ) {
datey = 'Промежуточная статистика на 21:00 ' + d.toLocaleDateString('ru-RU', options).replace(/\//g, '.');
} else {
  datey = d.toLocaleDateString('ru-RU', options).replace(/\//g, '.');
}


let cashierDrinks = parseInt((document.querySelector('#drinks').value), 10);
let cashierGuests = parseInt((document.querySelector('#cashierBoxGuests').value), 10);
let cashierBoxSum = parseInt((document.querySelector('#cashierBoxSum').value), 10);
let yandexDeliveries = parseInt((document.querySelector('#yandexDeliveries').value), 10);
let kioskSum = parseInt((document.querySelector('#kioskSum').value), 10);
let kioskGuests = parseInt((document.querySelector('#kioskGuests').value), 10);
navigator.clipboard.writeText(`${datey}:

Выручка общая: <code>${kioskSum+cashierBoxSum}</code> ₽
Киоск продажи: \`\`\`${kioskSum}\`\`\` ₽
Киоск чек: \`\`\`${(kioskSum/kioskGuests).toFixed(2)}\`\`\` ₽
Касса продажи: \`\`\`${cashierBoxSum}\`\`\` ₽
Касса чек: \`\`\`${(cashierBoxSum/cashierGuests).toFixed(2)}\`\`\` ₽
Количество гостей: (${kioskGuests}+${cashierGuests})=\`\`\`${kioskGuests+cashierGuests}\`\`\` 👥
Средний чек: \`\`\`${((kioskSum+cashierBoxSum)/(kioskGuests+cashierGuests)).toFixed(2)}\`\`\` ₽
Напитки: \`\`\`${cashierDrinks}\`\`\`🥤
Оффлайн: \`\`\`${(kioskGuests+cashierGuests)-yandexDeliveries}\`\`\` 👤
`)
}

function reportStats(){
const d = new Date();
const options = { day: '2-digit', month: '2-digit', year: 'numeric' }; // Define options for formatting
const datey = d.toLocaleDateString('ru-RU', options).replace(/\//g, '.'); // Format and replace slashes with dots

  let cashierDrinks = parseInt((prompt("Касса, напитки", "0")), 10);
if (cashierDrinks != null) {
    let cashierGuests = parseInt((prompt("Касса, люди", "0")), 10);
  if (cashierGuests != null) {
      let cashierBoxSum = parseInt((prompt("Касса, выручка", "0")), 10);
    if (cashierBoxSum != null) {
        let yandexDeliveries = parseInt((prompt("Яндекс доставок", "0")), 10);
      if (yandexDeliveries != null) {
          let kioskSum = parseInt((prompt("Киоск, выручка", "0")), 10);
        if (kioskSum != null) {
            let kioskGuests = parseInt((prompt("Киоск, люди", "0")), 10);
          if (kioskGuests != null) {
navigator.clipboard.writeText(`${datey}:

Выручка общая: \`\`\`${kioskSum+cashierBoxSum}\`\`\` ₽
Киоск продажи: \`\`\`${kioskSum}\`\`\` ₽
Киоск чек: \`\`\`${(kioskSum/kioskGuests).toFixed(2)}\`\`\` ₽
Касса продажи: \`\`\`${cashierBoxSum}\`\`\` ₽
Касса чек: \`\`\`${(cashierBoxSum/cashierGuests).toFixed(2)}\`\`\` ₽
Количество гостей: (${kioskGuests}+${cashierGuests})=\`\`\`${kioskGuests+cashierGuests}\`\`\` 👥
Средний чек: \`\`\`${((kioskSum+cashierBoxSum)/(kioskGuests+cashierGuests)).toFixed(2)}\`\`\` ₽
Напитки: \`\`\`${cashierDrinks}\`\`\`🥤
Оффлайн: \`\`\`${(kioskGuests+cashierGuests)-yandexDeliveries}\`\`\` 👤
`)
          }
        }
      }
    }
  }
}
}