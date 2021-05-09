import { useState, useEffect } from 'react';
import { subDays } from 'date-fns'
import { useWindowWidth } from './layout';
import mediaQuery from '../utils/mediaQuery';
import { useAppSelector } from './redux';

// pointDate를 기준으로 이전 n일의 배열을 반환
const getWeekList = (date:Date,n:number):string[] => {
    let weekdays = [];

    weekdays.unshift(date.toString());
    for(let i=1;i<n;i++){
        date = subDays(date,1);
        weekdays.unshift(date.toString());
    }
    return weekdays;
}

function useWeekList() {
    const pointDate:string = useAppSelector(state => state.habit.currentPointDate);
    const windowWidth = useWindowWidth();
    const [weekList,setWeekList] = useState<string[]>([]);
    
    useEffect(() => {
        if (windowWidth < mediaQuery.mobile) {
            setWeekList(getWeekList(new Date(Date.parse(pointDate)),7));
        } else if (windowWidth < mediaQuery.tablet) {
            setWeekList(getWeekList(new Date(Date.parse(pointDate)),14));
        } else {
            setWeekList(getWeekList(new Date(Date.parse(pointDate)),21));
        }
    },[windowWidth,pointDate]);
    
    return { pointDate,weekList };
}

export { useWeekList }