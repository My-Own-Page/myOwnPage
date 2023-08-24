const today = new Date();
let year_ = today.getFullYear();
let month_ = today.getMonth() + 1;
let date_ = today.getDate();
let selectdateId = 1;
let choiceYear =0;
let choiceMonth = 0;
let choiceDate = 0;
let selecetDateFullId = '';

// ---------------------------- Schedule ----------------------------------
const schedule = [
  {
    key: '2023-03-01',
    startYear : 2000,
    startMonth : 8,
    startDate : 10,
    endYear : 2000,
    endMonth : 8,
    endDate : 10,
    startHour: 1,
    startMinute: 30,
    endHour: 1,
    endMinute: 30,
    context : '',
  }
];

// ---------------------------- Handler ----------------------------------
const prevMonthHandler = (e) => {
  if (month_ === 1) {
    year_ -= 1;
    month_ = 13;
  }
  // choiceSelectDate({
  //   validYear : year_,
  //   validMonth: month_,
  //   validDate: e.target.closest('#calendar-box').querySelector('.date-box')
  // });  
  renderCalendar(
    calcDate({
      year: year_,
      month: --month_, //7 + 1
      date: date_,
    })
  );
  for (i = 1; i <= 42; i++) {
    document.querySelector(`.date${i}`).classList.remove('selectdate');
  }
};

const nextMonthHandler = () => {
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
  for (i = 1; i <= 42; i++) {
    document.querySelector(`.date${i}`).classList.remove('selectdate');
  }
};

const clickDateHandler = (e) => {
  e.target
    .closest('.date-box')
    .querySelector(`.date${selectdateId}`)
    .classList.remove('selectdate');
  e.target.classList.add('selectdate');
  selectdateId = e.target.dataset.id;
  const $calendarModal = document.getElementById('calendar-modal');
  const $calendarModalOverlay = document.querySelector('.modal-overlay');
  $calendarModalOverlay.style.display = 'flex';
  $calendarModal.style.display = 'flex';

  
  renderModal({
    year: year_,
    month: month_,
    date: Number(e.target.textContent),
    selectDateId: selectdateId,
  });
  setSelecetDateFullId(year_, month_, e.target.textContent);
};

// ---------------------------------Function------------------------------- //
// const choiceSelectDate = () =>{
//   const $dateBox = document.querySelector('.date-box');  

//   if( choiceYear ===  && choiceMonth === && choiceDate === ){

//   }

// }

const todayColor=() => {

}

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
    if (i === 1 || i === 8 || i === 15 || i === 22 || i === 29 || i === 36) {
      $emptyDate.classList.add('red');
    }
    if (i === 7 || i === 14 || i === 21 || i === 28 || i === 35 || i === 42) {
      $emptyDate.classList.add('blue');
    }

    $emptyDate.classList.add('date');
    $emptyDate.classList.add(`date${i}`);
    $emptyDate.dataset.id = i;
    $emptyDate.addEventListener('click', clickDateHandler);
    $dateBox.appendChild($emptyDate);
  }

  const $dateBox2 = document.querySelector('.body__date-box');
  for (let i = 1; i <= 42; i++) {
    const $emptyDate = document.createElement('div');
    if (i === 1 || i === 8 || i === 15 || i === 22 || i === 29 || i === 36) {
      $emptyDate.classList.add('red');
    }
    if (i === 7 || i === 14 || i === 21 || i === 28 || i === 35 || i === 42) {
      $emptyDate.classList.add('blue');
    }
    $emptyDate.classList.add('date');
    $emptyDate.classList.add(`date${i}`);
    $emptyDate.textContent = '날짜';
    $emptyDate.dataset.id = i;
    // $emptyDate.addEventListener('click', clickDateHandler);
    $dateBox2.appendChild($emptyDate);
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

const insertDate = ({ startDay, lastDay, monthDays, month, dateBoxName }) => {
  const $dateBox = document.querySelector(dateBoxName);
  //이번달 날짜 만들기
  let startDate = 1;

  for (let i = startDay; i <= lastDay + startDay - 1; i++) {
    const $dateElement = $dateBox.querySelector(`.date${i}`);
    if ($dateElement) {
      $dateElement.textContent = `${startDate}`;
      $dateBox.querySelector(`.date${i}`).textContent = `${startDate}`;
      $dateBox.querySelector(`.date${i}`).classList.remove('prevMonth');
      $dateBox.querySelector(`.date${i}`).classList.remove('nextMonth');

      startDate++;
      
    }
  }
  //지난달 날짜 만들기
  if (month === 1) {
    month = 13;
  }
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
  insertDate({ startDay, lastDay, monthDays, month, dateBoxName: '.date-box' });
  renderMonthTitle(month);
  renderYearTitle();
  document
    .querySelector('.prev-button')
    .addEventListener('click', prevMonthHandler);
  document
    .querySelector('.next-button')
    .addEventListener('click', nextMonthHandler);
  selectdateId = date_ + startDay - 1;
};

const renderModal = ({ year, month, date, selectDateId }) => {
  modalYear = year;
  modalMonth = month;
  let monthFirstDate = new Date(modalYear, modalMonth-1, 1).getDay() +1;
  const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (year % 400 === 0) {
    monthDays[1] = 29;
  } else if (year % 100 === 0) {
    monthDays[1] = 28;
  } else if (year % 4 === 0) {
    monthDays[1] = 29;
  }

  // console.log(`${year}년${month}월${date}일 ${selectDateId}`); 확인용

  // ------------------------- 모달 지난달 핸들러 ----------------------------
  const prevModalMonthHandler = () => {        
    if (modalMonth === 1) {
      modalYear -= 1;
      modalMonth = 13;
    }
    --modalMonth;    
    monthFirstDate = new Date(modalYear, modalMonth-1, 1).getDay() +1;
    renderModalDate();
    renderModalYearAndMonth();
    for (i = 1; i <= 42; i++) {
      document.querySelector(`.date${i}`).classList.remove('selectdate');
    }
  };

  // ------------------------- 모달 다음달 핸들러 ----------------------------
  const nextModalMonthHandler = () => {        
    if (modalMonth === 12) {
      modalYear += 1;
      modalMonth = 0;
    }
    modalMonth ++;
    monthFirstDate = new Date(modalYear, modalMonth-1, 1).getDay() +1;
    renderModalDate();
    renderModalYearAndMonth();
    for (i = 1; i <= 42; i++) {
      document.querySelector(`.date${i}`).classList.remove('selectdate');
    }
  };
  // ------------------------- 리스트 추가 핸들러 ----------------------------
  const showAddListHandler = () =>{
    const $addListModal = document.querySelector('#calendar-modal .add-list-modal');
    $addListModal.style.display = 'flex';
  }

  // ------------------------- 모달 년월 값 넣기 ----------------------------
  const renderModalYearAndMonth = () => {
    const $modalYearTitle = document.querySelector(
      '.header__year-and-month .header__year'
    );
    const $modalMonthTitle = document.querySelector(
      '.header__year-and-month .header__month'
    );
    $modalYearTitle.textContent = `${modalYear}년`;
    $modalMonthTitle.textContent = `${modalMonth}월`;
  };

  // ------------------------- 모달 날짜 입력 ----------------------------
  const renderModalDate = () => {
    insertDate({
      startDay: monthFirstDate,
      lastDay: monthDays[modalMonth - 1],
      monthDays: monthDays,
      month: modalMonth,
      dateBoxName: '.body__date-box',
    });
  };
  // ------------------------- 모달 탈출 함수 ----------------------------
  const exitModal = () => {
    const $modalOverlay = document.querySelector('.modal-overlay');
    const $calendarModal = document.getElementById('calendar-modal');

    const $exitButton = document
      .querySelector('.header__exit-button')
      .addEventListener('click', (e) => {
        $modalOverlay.style.display = 'none';
        $calendarModal.style.display = 'none';
        e.preventDefault();
      });
  };
  // ------------------------- 일정추가 ------------------------------------
  const addListModal = () =>{
    const $addListModal = document.querySelector('.add-list-modal')
    const $addListExitButton = document.querySelector('#calendar-modal .add-list-modal button.exit-button');
    const $addListAddButton = document.querySelector('#calendar-modal .add-list-modal .list-context-container .list-context-button');    
    // 일정 추가 모달 나가기
    const exitAddListHandler = (e) =>{
      const $addListModal = document.querySelector('#calendar-modal .add-list-modal');
      $addListModal.style.display = 'none';
      e.preventDefault();
    };
    // 일정 추가 모달에서 일정 추가
    const addDateListHandler = (e) =>{      
      e.preventDefault();
      const $startDate = $addListModal.querySelector('.start-date');
      const $endDate = $addListModal.querySelector('.end-date');
      const $startTime = $addListModal.querySelector('.start-time');
      const $endTime = $addListModal.querySelector('.end-time');
      const $listContext = $addListModal.querySelector('.list-context');
      console.log(`startDate: ${$startDate.value}, endDate: ${$endDate.value}, startTime: ${$startTime.value}, endTime: ${$endTime.value}`);
      const whatIsStartYearMonthDate = $startDate.value.split('-');      
      const whatIsEndYearMonthDate = $endDate.value.split('-');
      const whatIsStartTime = $startTime.value.split(':');
      const whatIsEndTime = $endTime.value.split(':');
      const startYear =  whatIsStartYearMonthDate[0];
      const startMonth = whatIsStartYearMonthDate[1];
      const startDate = whatIsStartYearMonthDate[2];
      const endYear = whatIsEndYearMonthDate[0];
      const endMonth = whatIsEndYearMonthDate[1];
      const endDate = whatIsEndYearMonthDate[2];
      const startHour = whatIsStartTime[0];
      const startMinute = whatIsStartTime[1];
      const endHour = whatIsEndTime[0];
      const endMinute = whatIsEndTime[1];
      const context = $listContext.value;
      schedule.push({
        key: $startDate.value,
        startYear,
        startMonth,
        startDate,
        endYear,
        endMonth,
        endDate,
        startHour,
        startMinute,
        endHour,
        endMinute,
        context 
      });
      console.log(schedule);
      $addListModal.style.display = 'none';
    }

    

    $addListExitButton.addEventListener('click', exitAddListHandler);
    $addListAddButton.addEventListener('click', addDateListHandler);

  };




  const $modalAddListButton = document.querySelector('.add-button');
  $modalAddListButton.addEventListener('click', showAddListHandler);
  const $modalPrevButton = document.querySelector('.header__prev-button');
  $modalPrevButton.addEventListener('click', prevModalMonthHandler);
  const $modalNextButton = document.querySelector('.header__next-button');
  $modalNextButton.addEventListener('click', nextModalMonthHandler);
  renderModalYearAndMonth();
  renderModalDate();
  exitModal();
  addListModal();
};

const setSelecetDateFullId = (year, month, date) =>{
  if(String(month).length===1 && String(date).length===1){
    selecetDateFullId= `${year}-0${month}-0${date}`;  
  }else if(String(month).length === 1 ){
    selecetDateFullId= `${year}-0${month}-${date}`;  
  }else if(String(date).length===1){
    selecetDateFullId= `${year}-${month}-0${date}`;  
  }else{
    selecetDateFullId=`${year}-${month}-${date}`;  
  }
  console.log(selecetDateFullId);  
};
// ------------------------- 실행부 ----------------------------
const start = () => {
  setSelecetDateFullId(year_, month_, date_);
  todayColor();
  makeDate();
  renderCalendar(
    calcDate({
      year: year_,
      month: month_, //7 + 1
      date: date_,
    })
  );
};

start();
