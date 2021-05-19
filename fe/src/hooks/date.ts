import { useState, useEffect } from 'react';
import { subDays, parse, format } from 'date-fns'
import { useWindowWidth } from './layout';
import mediaQuery from '../utils/mediaQuery';
import { useAppSelector } from './redux';
import { addDays, eachDayOfInterval } from 'date-fns/esm';

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

function useStartDate(checklist: string[]) {
    const [startDate,setStartDate] = useState<string|null>(null);
    
    useEffect(() => {
        const datelist = checklist.slice().sort();
        try {
            let startDate = parse(datelist[0],'yyyyMMdd',new Date());
            setStartDate(format(startDate, 'yyyy.MM.dd'));
        } catch (err) {
            setStartDate(null);
        }
    }, [checklist]);
    
    return startDate;
}

function useLongestDuration(checklist: string[]) {
    const [duration, setDuration] = useState<number>(0);

    useEffect(() => {
        let datelist = checklist.slice().sort().map(d => parse(d,'yyyyMMdd',new Date()));
        
        let prev = datelist[0];
        let count = 1;
        let max = 0;
        for(let i=1; i<datelist.length; i++){
            if(addDays(prev,1).toString() === datelist[i].toString()) {
                count++;
                prev = datelist[i];
            } else {
                max = max <= count ? count: max;
                count = 1;
                prev = datelist[i];
            }
            if(i === datelist.length-1 ){
                max = max < count ? count: max;
            }
        }
        setDuration(max);
    }, checklist);

    return duration;
}
function useActingRate(checklist:string[]) {
    const [actiongRate, setActingRate] = useState<string>('0');

    useEffect(() => {
        if(checklist[0]) {
            const startDate = parse(checklist.slice().sort()[0],'yyyyMMdd',new Date());
            const endDate = new Date();
            let range = eachDayOfInterval({start: startDate, end: endDate}).length;
            setActingRate((checklist.length/range*100).toFixed(2));
        }
    }, [checklist]);

    return actiongRate;
}

export { useWeekList, useStartDate, useLongestDuration, useActingRate }