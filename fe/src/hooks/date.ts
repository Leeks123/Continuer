import { useState, useEffect } from 'react';
import { subDays } from 'date-fns'
import { useWindowWidth } from './layout';
import mediaQuery from '../utils/mediaQuery';

const getWeekList = (date:Date,n:number):string[] => {
    let weekdays = [];

    weekdays.unshift(date.toString());
    for(let i=1;i<n;i++){
        date = subDays(date,1);
        weekdays.unshift(date.toString());
    }
    return weekdays;
}

function useWeekList(pointDate: Date) {
    const windowWidth = useWindowWidth();
    const [weeklist,setWeekList] = useState<string[]>([]);
    
    useEffect(() => {
        if (windowWidth < mediaQuery.mobile) {
            setWeekList(getWeekList(pointDate,7));
        } else if (windowWidth < mediaQuery.tablet) {
            setWeekList(getWeekList(pointDate,14));
        } else {
            setWeekList(getWeekList(pointDate,21));
        }
    },[windowWidth]);
    
    return weeklist;
}

export { useWeekList }