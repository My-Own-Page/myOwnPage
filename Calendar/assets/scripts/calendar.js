const today = new Date();
let year_ = today.getFullYear();
let month_ = today.getMonth() + 1;
let date_ = today.getDate();
let selectdateId = 1;
// ---------------------------- Handler ----------------------------------
const prevMonthHandler = (e) => {
  if (month_ === 1) {
    year_ -= 1;
    month_ = 13;
  }
  renderCalendar(
    calcDate({
      year: year_,
      month: --month_, //7 + 1
      date: date_,
    })
    );
    for(i=1;i<=42;i++){
      document.querySelector(`.date${i}`).classList.remove('selectdate');
    }
    
};

const nextMonthHandler = (e) => {
    if (month_ === 12) {
        year_ += 1;
        month_ = 0;
      }
  renderCalendar(
    calcDate({
      year: year_,
      month: ++month_, //7 + 1
      date: date_,
    })
  );
  for(i=1;i<=42;i++){
    document.querySelector(`.date${i}`).classList.remove('selectdate');
  }
};

const clickDateHandler = (e) =>{
  e.target.closest('.date-box').querySelector(`.date${selectdateId}`).classList.remove('selectdate');
  e.target.classList.add('selectdate');  
  selectdateId = e.target.dataset.id;
}

// ---------------------------------Function------------------------------- //
const calcDate = ({ year, month, date }) => {
  // 올해
  let calendarYear = year;
  // 이번달
  let calendarMonth = month; //0~11 까지 1월부터 12월
  // 오늘
  let calendarDate = date;

  // 한달 며칠있는지
  const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  //윤년 구하기
  if (calendarYear % 400 === 0) {
    monthDays[1] = 29;
  } else if (calendarYear % 100 === 0) {
    monthDays[1] = 28;
  } else if (calendarYear % 4 === 0) {
    monthDays[1] = 29;
  }

  let calendarMonthLastDay = monthDays[calendarMonth - 1]; // 마지막날
  let calendarStartMonthDay =
    new Date(calendarYear, calendarMonth - 1, 1).getDay() + 1; //처음날이 무슨요일인지 1~7 일~토  
  return {
    startDay: calendarStartMonthDay,
    lastDay: calendarMonthLastDay,
    year: calendarYear,
    month: calendarMonth,
    date: calendarDate,
    monthDays,
  };
};

// 날짜 빈틀 만드는 함수
const makeDate = () => {
  const $dateBox = document.querySelector('.date-box');
  // console.log($dateBox);
  for (let i = 1; i <= 42; i++) {
    const $emptyDate = document.createElement('div');    
    if(i===1 || i===8 || i === 15|| i === 22 || i===29 || i===36){              
        $emptyDate.classList.add('red');
    }
    if(i===7 || i===14 || i === 21|| i === 28 || i===35 || i===42){            
        $emptyDate.classList.add('blue');
      }
    
    $emptyDate.classList.add('date');    
    $emptyDate.classList.add(`date${i}`);
    $emptyDate.dataset.id = i;    
    $emptyDate.addEventListener('click', clickDateHandler);
    $dateBox.appendChild($emptyDate);
  }
};

const renderMonthTitle = (month) => {
  const $monthBox = document.querySelector('.month-box');
  const $monthBoxTitle = $monthBox.querySelector('h1');
  switch (month) {
    case 1:
      $monthBoxTitle.textContent = '1월';
      break;
    case 2:
      $monthBoxTitle.textContent = '2월';
      break;
    case 3:
      $monthBoxTitle.textContent = '3월';
      break;
    case 4:
      $monthBoxTitle.textContent = '4월';
      break;
    case 5:
      $monthBoxTitle.textContent = '5월';
      break;
    case 6:
      $monthBoxTitle.textContent = '6월';
      break;
    case 7:
      $monthBoxTitle.textContent = '7월';
      break;
    case 8:
      $monthBoxTitle.textContent = '8월';
      break;
    case 9:
      $monthBoxTitle.textContent = '9월';
      break;
    case 10:
      $monthBoxTitle.textContent = '10월';
      break;
    case 11:
      $monthBoxTitle.textContent = '11월';
      break;
    case 12:
      $monthBoxTitle.textContent = '12월';
      break;
  }
};

const renderYearTitle = () => {
  const $monthBox = document.querySelector('.month-box');
  const $yearBox = $monthBox.querySelector('h2');
  $yearBox.textContent = `${year_}년`;
};

const insertDate = ({ startDay, lastDay, monthDays, month }) => {
  const $dateBox = document.querySelector('.date-box');
  //이번달 날짜 만들기
  let startDate = 1;
  
  for (let i = startDay; i <= lastDay + startDay - 1; i++) {
    $dateBox.querySelector(`.date${i}`).textContent = `${startDate}`;
    $dateBox.querySelector(`.date${i}`).classList.remove('prevMonth');
    $dateBox.querySelector(`.date${i}`).classList.remove('nextMonth');
    if(i-startDay+1===date_){
      $dateBox.querySelector(`.date${i}`).classList.add('selectdate');
    }
    startDate++;
    
  }
  //지난달 날짜 만들기
  if(month===1){
    month=13;
  };    
  let lastDate = monthDays[month - 2];  
  for (let i = startDay - 1; i > 0; i--) {
    $dateBox.querySelector(`.date${i}`).textContent = `${lastDate}`;
    $dateBox.querySelector(`.date${i}`).classList.add('prevMonth');
    lastDate--;
  }

  //다음달 날짜 만들기
  startDate = 1;
  for (let i = lastDay + startDay; i <= 42; i++) {
    $dateBox.querySelector(`.date${i}`).textContent = `${startDate}`;
    $dateBox.querySelector(`.date${i}`).classList.add('nextMonth');
    startDate++;
  }
};

const renderCalendar = ({ startDay, lastDay, monthDays, month }) => {
  insertDate({ startDay, lastDay, monthDays, month });
  renderMonthTitle(month);
  renderYearTitle();
  document.querySelector('.prev-button').addEventListener('click', prevMonthHandler);    
  document.querySelector('.next-button').addEventListener('click', nextMonthHandler);         
  selectdateId = date_ + startDay - 1;    
};

const selectToday = () =>{

}

// ------------------------- 실행부 ----------------------------
const start = () => {
  makeDate();
  renderCalendar(calcDate({
    year: year_,
    month: month_, //7 + 1
    date: date_,
  }));
};
  
start();