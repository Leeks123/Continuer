/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, createRef, RefObject } from 'react';
import { getDate, getMonth, getYear } from 'date-fns';

import Card from './Card';
import { CardState, changeDate } from '../../redux/reducers/cardSlice';
import DayNode from './DayNode';
import { useWindowHeight } from '../../hooks/layout';
import { useAppDispatch } from '../../hooks/redux';

type CardListProps = {
    data: CardState[],
    scrollFn: ()=>void
}
const CardList = ({ data,scrollFn }:CardListProps) => {
    let sideFlag = false
    const dateChangePoint:CardState[] = data.filter((v,i) => {
        if (data[i-1]){
            const curDate = getDate(Date.parse(v.createdAt));
            const prevDate = getDate(Date.parse(data[i-1].createdAt));
            if (curDate === 1 && prevDate !== 1) {
                return true;
            }
            return curDate > prevDate;
        }
        return false;
    });
    const dateList = dateChangePoint.map((v) => getDate(Date.parse(v.createdAt)));

    const [elRefs, setElRefs] = useState<RefObject<HTMLElement>[]>([]);
    const windowHeight = useWindowHeight();
    const dispatch = useAppDispatch();
    useEffect(() => {
        setElRefs(elRefs => (
            Array(data.length).fill(0).map((_, i) => elRefs[i] || createRef())
        ));
    }, [data]);
    useEffect(() => {
        const option = {
            root: null,
            rootMargin: `0px 0px -${windowHeight - 60}px 0px`,
            threshold: 0,
        }
        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => { 
                if (entry.intersectionRatio > 0) {
                    // console.log((entry.target as HTMLElement).dataset.date);
                    const topElDate = (entry.target as HTMLElement).dataset.date;
                    
                    if(topElDate !== undefined) {
                        dispatch(changeDate({
                            year: getYear(Date.parse(topElDate)),
                            month: getMonth(Date.parse(topElDate))
                        }));
                        // console.log(topElDate);
                    }
                }
            })
        }, option);

        elRefs.forEach((el,i) => {
            if (el.current) {
                io.observe(el.current);
            }
        });
    }, [elRefs, windowHeight]);
    
    return (
        <div>
            {data.map((v,i) => {
                if(dateChangePoint.includes(v)) {
                    sideFlag = !sideFlag;
                    return (
                        <div key={i+v.createdAt}>
                            <DayNode date={dateList[dateChangePoint.indexOf(v)]} rightSide={!sideFlag}/>
                            <Card 
                                ref={elRefs[i]} 
                                text={v.text} 
                                id={v.id}
                                date={v.createdAt} 
                                rightSide={sideFlag}
                                images={v.images} 
                                scrollFn={scrollFn}
                            />
                        </div>
                    )
                } else {
                    return (
                        <Card 
                            key={v.id} 
                            ref={elRefs[i]} 
                            text={v.text} 
                            id={v.id} 
                            date={v.createdAt} 
                            rightSide={sideFlag} 
                            images={v.images} 
                            scrollFn={scrollFn}
                        />
                    );
                }
            })}
            
        </div>
    );
};

export default CardList;