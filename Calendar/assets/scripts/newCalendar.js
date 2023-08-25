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


const calendarFunc = () => {
  const newDate = new Date();
  const todayYear = newDate.getFullYear();
  const todayMonth = newDate.getMonth();
  const todayDate = newDate.getDate();
  const monthLastDates = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  let presentYear = 0;
  let presentMonth = 0;
  let presentDate = 0;
  let dateId = '';
  let selecetDateId='';
  let monthStartDay = 0; // 달에 시작 시작요일
  let monthLastDate = 0; // 달에 마지막 날  

   
  const selectDateTint = () =>{    
    const $calendar = document.getElementById('calendar-box'); 
    const $calendarModal = document.getElementById('calendar-modal');            
    for(i=0;i<42;i++){            
      if($calendar.querySelector(`.date${i}`).dataset.id === selecetDateId){
        $calendar.querySelector(`.date${i}`).classList.add('selected');
        $calendarModal.querySelector(`.date${i}`).classList.add('selected');
      }else{
        $calendar.querySelector(`.date${i}`).classList.remove('selected');
        $calendarModal.querySelector(`.date${i}`).classList.remove('selected');
      }
    }
  };


  const clickDateHandler = e =>{
    presentDate =e.target.textContent;
    const $calendarModal = document.getElementById('calendar-modal');
    selecetDateId=e.target.dataset.id;
    console.log(selecetDateId);
    selectDateTint();
    $calendarModal.style.display = 'flex';
    console.log(presentDate);
    setDateCotents('#calendar-modal .calendar-modal__body .body__date-box');
    setTitleYear('#calendar-modal .calendar-modal__header .header__year-and-month');
    setTitleMonth('#calendar-modal .calendar-modal__header .header__year-and-month');    
    e.preventDefault();
  };
  const leapYear = year => {
    if (year % 400 === 0) {
      monthLastDates[1] = 29;
    } else if (year % 100 === 0) {
      monthLastDates[1] = 28;
    } else if (year % 4 === 0) {
      monthLastDates[1] = 29;
    }
  };

  const setStartDayAndEndDate = (year, month) =>{
    monthStartDay = new Date(year, month, 1).getDay();
    monthLastDate = monthLastDates[month];
  };
  const setDateId = (year, month, date) =>{
    if(String(month).length===1 && String(date).length===1){
      dateId = `${year}-0${month+1}-0${date}`;  
    }else if(String(month).length === 1 ){
      dateId = `${year}-0${month+1}-${date}`;
    }else if(String(date).length===1){
      dateId= `${year}-${month+1}-0${date}`;  
    }else{
      dateId=`${year}-${month+1}-${date}`;  
    }
  };
  const renderDates = (monthBoxSelector) => {
    const $monthBox = document.querySelector(monthBoxSelector);        
    for(let i=0;i<42;i++){
      const $emptyDate = document.createElement('div');
      if (i === 0 || i%7 ===0) {
        $emptyDate.classList.add('sunday');
      }else if ((i+1) % 7 === 0) {
        $emptyDate.classList.add('saturday');
      }
      $emptyDate.classList.add('date');
      $emptyDate.classList.add(`date${i}`);
      $emptyDate.textContent=`${i}번째 인덱스`;
      $emptyDate.dataset.id = 0;
      $emptyDate.addEventListener('click', clickDateHandler);
      $monthBox.appendChild($emptyDate);      
    }
  };
  const setTitleYear = (yearSelector) => {
    const $monthBox = document.querySelector(yearSelector);    
    const $yearBox = $monthBox.querySelector('h1');
    $yearBox.textContent = `${presentYear}년`;
  };
  const setTitleMonth = (monthSelector) => {
    const $monthBox = document.querySelector(monthSelector);
    const $monthBoxTitle = $monthBox.querySelector('h2');
    switch (presentMonth+1) {
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
  const setDateCotents = (monthBoxSelector) =>{
    const $monthBox = document.querySelector(monthBoxSelector);        

    // 이번달 날짜 만들기 
    let num =0;
    for(let i=monthStartDay; i<monthStartDay+monthLastDate;i++){
      num++;
      const $date =$monthBox.querySelector(`.date${i}`); 
      $date.textContent = num;
      $date.classList.remove('prevMonthDate');
      $date.classList.remove('nextMonthDate');
      setDateId(presentYear, presentMonth, num);
      $date.dataset.id = dateId;
    }
    // 지난달 날짜 만들기
    let prevMonthLastDate = monthLastDates[presentMonth] - monthStartDay;
    for(let i=0;i<monthStartDay;i++){
      $monthBox.querySelector(`.date${i}`).textContent = `${prevMonthLastDate}`;
      $monthBox.querySelector(`.date${i}`).classList.add('prevMonthDate');
      if(presentMonth===0){
        setDateId(presentYear-1, 11, prevMonthLastDate);      
      }else{
        setDateId(presentYear, presentMonth-1, prevMonthLastDate);      
      }      
      $monthBox.querySelector(`.date${i}`).dataset.id = dateId;
      prevMonthLastDate++;
    }
    // 다음달 날짜 만들기
    num =0;
    for(let i=monthLastDate+monthStartDay; i<42; i++){
      num++;
      $monthBox.querySelector(`.date${i}`).textContent = num;
      $monthBox.querySelector(`.date${i}`).classList.add('nextMonthDate');
      if(presentMonth===11){
        setDateId(presentYear+1, 0, num);      
      }else{
        setDateId(presentYear, presentMonth+1, num);      
      }      
      $monthBox.querySelector(`.date${i}`).dataset.id = dateId;

    }
  };
  const test = () =>{
    const $todoList = document.createElement('div');
    $todoList.textContent = '밥 먹기';
    const $firstChild=document.querySelector('#calendar-box .date-box').firstChild;
    console.log($firstChild);
    $firstChild.appendChild($todoList);
  };
  const init = () =>{
    const prevMonthHandler = () =>{
      if(presentMonth===0) {
        presentMonth=12;
        presentYear-=1;
        leapYear(presentYear);
      }
      presentMonth-=1;
      setStartDayAndEndDate(presentYear, presentMonth);
      setTitleYear('.monthAndYear');
      setTitleMonth('.monthAndYear');
      setDateCotents('#calendar-box .date-box');
      selectDateTint();
    }
    const nextMonthHandler =() =>{
      if(presentMonth===11) {
        presentMonth=-1;
        presentYear+=1;
        leapYear(presentYear);
      }
      presentMonth+=1;
      setStartDayAndEndDate(presentYear, presentMonth);
      setTitleYear('.monthAndYear');
      setTitleMonth('.monthAndYear');
      setDateCotents('#calendar-box .date-box');
      selectDateTint();
    };


    const $prevButton = document.getElementById('calendar-box').querySelector('.prev-button');
    const $nextButton = document.getElementById('calendar-box').querySelector('.next-button');
    $nextButton.addEventListener('click', nextMonthHandler);
    $prevButton.addEventListener('click', prevMonthHandler);
  };  
  const calendarModalFunc =() =>{    
    renderDates('#calendar-modal .calendar-modal__body .body__date-box');
    setDateCotents('#calendar-modal .calendar-modal__body .body__date-box');
    setTitleYear('#calendar-modal .calendar-modal__header .header__year-and-month');
    setTitleMonth('#calendar-modal .calendar-modal__header .header__year-and-month');


    const modalInit = () =>{            
      const $modalPrevButton = document.getElementById('calendar-modal').querySelector('.header__prev-button');
      const $modalNextButton = document.getElementById('calendar-modal').querySelector('.header__next-button');
      const $modalExitButton = document.getElementById('calendar-modal').querySelector('.header__exit-button');
      const $modalAddListButton = document.getElementById('calendar-modal').querySelector('.add-button');
      const modalPrevMonthHandler = () => {
        if(presentMonth===0) {
          presentMonth=12;
          presentYear-=1;
          leapYear(presentYear);
        }
        presentMonth-=1;
        setStartDayAndEndDate(presentYear, presentMonth);
        setTitleYear('#calendar-modal .calendar-modal__header .header__year-and-month');
        setTitleMonth('#calendar-modal .calendar-modal__header .header__year-and-month');
        setDateCotents('#calendar-modal .calendar-modal__body .body__date-box');        
        selectDateTint();          
      };
      const modalNextMonthHandler = () =>{
        if(presentMonth===11) {
          presentMonth=-1;
          presentYear+=1;
          leapYear(presentYear);
        }
        presentMonth+=1;
        setStartDayAndEndDate(presentYear, presentMonth);
        setTitleYear('#calendar-modal .calendar-modal__header .header__year-and-month');
        setTitleMonth('#calendar-modal .calendar-modal__header .header__year-and-month');
        setDateCotents('#calendar-modal .calendar-modal__body .body__date-box');
        selectDateTint();
      };
      const modalExitHandler = e => {
        const $calendarModal = document.getElementById('calendar-modal');
        $calendarModal.style.display = 'none';
        setTitleYear('.monthAndYear');
        setTitleMonth('.monthAndYear');   
        setDateCotents('#calendar-box .date-box');
        e.preventDefault();
      };
      const showAddListHandler = () =>{
        const $addListModal = document.querySelector('#calendar-modal .add-list-modal');
        $addListModal.style.display = 'flex';
      }
      
      
      $modalPrevButton.addEventListener('click', modalPrevMonthHandler);
      $modalNextButton.addEventListener('click', modalNextMonthHandler);
      $modalExitButton.addEventListener('click', modalExitHandler);
      $modalAddListButton.addEventListener('click', showAddListHandler);
    };
    // ------------------------------ 일정추가 모달 -----------------------------------
    const addListModalFunc = () =>{
      const $addListModal = document.querySelector('.add-list-modal')
      const $addListExitButton = document.querySelector('#calendar-modal .add-list-modal button.exit-button');
      const $addListAddButton = document.querySelector('#calendar-modal .add-list-modal .list-context-container .list-context-button');    
      // 일정 추가 모달 나가기
      const exitAddListHandler = (e) =>{
        const $addListModal = document.querySelector('#calendar-modal .add-list-modal');
        $addListModal.style.display = 'none';
        e.preventDefault();
      };
      // 일정 추가 모달에서 일정 넘기기
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


    modalInit();
    addListModalFunc();
  };

  const start = () =>{
    presentYear = todayYear;
    presentMonth = todayMonth;
    presentDate = todayDate;
    calendarModalFunc();

    setDateId();
    renderDates('#calendar-box .date-box');
    leapYear(todayYear);
    setStartDayAndEndDate(todayYear, todayMonth);
    setTitleYear('.monthAndYear');
    setTitleMonth('.monthAndYear');   
    setDateCotents('#calendar-box .date-box');
    init();
    
    // test();
  };

  start();
};

calendarFunc();