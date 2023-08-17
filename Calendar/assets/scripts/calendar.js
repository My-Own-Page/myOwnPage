const makeCalendar = () =>{
    const today = new Date();
    // 올해
    let calendarYear = today.getFullYear();
    // 이번달 
    let calendarMonth = today.getMonth() + 1; //0~11 까지 1월부터 12월
    // 오늘
    let calendarDay = today.getDate();
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
    let calendarStartMonthDay = new Date(calendarYear, today.getMonth()-1, 1).getDay(); //처음날이 무슨요일인지 0~6 일~토

    // const $test = document.getElementById('test');
    // $test.textContent = `${calendarYear}년${calendarMonth}월${calendarDay}일 입니다 그리고 마지막날은 ${calendarMonthLastDay}일입니다 처음으로 1일이 시작하는 날은 ${calendarStartMonthDay}`;

    

};

makeCalendar();