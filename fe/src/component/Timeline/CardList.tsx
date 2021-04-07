import React, { useEffect, useState, createRef, RefObject } from 'react';
import { getDate, getMonth, getYear } from 'date-fns';

import Card from './Card';
import { CardState } from '../../redux/reducers/cardListSlice';
import DayNode from './DayNode';
import { useWindowHeight } from '../../hooks/layout';
import { useAppDispatch } from '../../hooks/redux';
import { changeDate } from '../../redux/reducers/cardListSlice';

import img01 from '../../utils/images/img01.jpg';
import img02 from '../../utils/images/img02.jpg';
import img03 from '../../utils/images/img03.png';

type CardListProps = {
    data: CardState[]
}
const CardList = ({ data }:CardListProps) => {
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
    
    console.log('cardlist')
    return (
        <div>
            {data.map((v,i) => {
                if(dateChangePoint.includes(v)) {
                    sideFlag = !sideFlag;
                    return (
                        <>
                            <DayNode date={dateList[dateChangePoint.indexOf(v)]} rightSide={!sideFlag}/>
                            <Card 
                                ref={elRefs[i]} 
                                text={v.text} 
                                id={v.id}
                                date={v.createdAt} 
                                rightSide={sideFlag} 
                            />
                        </>
                    )
                } else {
                    return (<Card ref={elRefs[i]} text={v.text} id={v.id} date={v.createdAt} rightSide={sideFlag} />);
                }
            })}
            
        </div>
    );
};

export default CardList;