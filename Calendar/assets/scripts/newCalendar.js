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
  let monthStartDay = 0; // 달에 시작 시작요일
  let monthLastDate = 0; // 달에 마지막 날    


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
      // $emptyDate.addEventListener('click', clickDateHandler);
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
    };

    const $prevButton = document.getElementById('calendar-box').querySelector('.prev-button');
    const $nextButton = document.getElementById('calendar-box').querySelector('.next-button');
    $nextButton.addEventListener('click', nextMonthHandler);
    $prevButton.addEventListener('click', prevMonthHandler);
  };  
  const start = () =>{
    presentYear = todayYear;
    presentMonth = todayMonth;
    presentDate = todayDate;
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