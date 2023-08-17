const today = new Date();

const calcDate = ({year,month,date}) =>{        
    // 올해
    let calendarYear = year;
    // 이번달 
    let calendarMonth = month+4; //0~11 까지 1월부터 12월    
    // 오늘
    let calendarDate = date;

    // 한달 며칠있는지
    const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    //윤년 구하기
    if(calendarYear % 400 === 0){
        monthDays[1] = 29;
    }else if(calendarYear % 100 ===0){
        monthDays[1] = 28;
    }else if(calendarYear% 4 ===0){
        monthDays[1] = 29;
    }

    let calendarMonthLastDay = monthDays[calendarMonth-1]; // 마지막날
    let calendarStartMonthDay = new Date(calendarYear, calendarMonth-1, 1).getDay()+1; //처음날이 무슨요일인지 1~7 일~토
    console.log(calendarMonthLastDay);

    return ({
        startDay:calendarStartMonthDay, 
        lastDay:calendarMonthLastDay,
        year: calendarYear,
        month: calendarMonth,
        date: calendarDate,
        monthDays
    });
}

const makeDate = () =>{
    const $dateBox = document.querySelector('.date-box');
    // console.log($dateBox);
    for(let i=1; i<=42 ;i++){
        const $emptyDate = document.createElement('div');
        $emptyDate.classList.add('date');
        $emptyDate.classList.add(`date${i}`);
        $emptyDate.textContent='안녕'
        $dateBox.appendChild($emptyDate);
    }
}


const renderCalendar = ({startDay, lastDay,monthDays,month} ) =>{
    makeDate();    
    const $dateBox = document.querySelector('.date-box');
    //이번달 날짜 만들기
    let startDate = 1;
    for(let i = startDay; i<= lastDay+startDay-1; i++){           
        $dateBox.querySelector(`.date${i}`).textContent=`${startDate}`;                                
        startDate++;
    }       
    //지난달 날짜 만들기
    let lastDate = monthDays[month-2];
    for(let i=startDay-1; i>0;i--){
        $dateBox.querySelector(`.date${i}`).textContent=`${lastDate}`; 
        $dateBox.querySelector(`.date${i}`).classList.add('prevMonth');
        lastDate--;
    }
    //다음달 날짜 만들기
    startDate =1;
    for(let i =lastDay+startDay;i<=42;i++){
        $dateBox.querySelector(`.date${i}`).textContent=`${startDate}`; 
        $dateBox.querySelector(`.date${i}`).classList.add('nextMonth');
        startDate++;
    }
};


renderCalendar(calcDate({
    year: today.getFullYear(),
    month: today.getMonth()+1, //7 + 1
    date: today.getDate()
}));


