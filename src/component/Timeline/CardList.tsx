import React, { useEffect, useState, useRef, createRef, RefObject } from 'react';
import { getDate } from 'date-fns';

import Card from './Card';
import { CardState } from '../../redux/reducers/cardListSlice';
import DayNode from './DayNode';
import { useWindowHeight } from '../../hooks/layout';
import { useAppSelector } from '../../hooks/redux';

type CardListProps = {
    data: CardState[]
}
const CardList = ({ data }:CardListProps) => {
    let sideFlag = false
    const dateChangePoint:CardState[] = data.filter((v,i) => {
        if (data[i+1]){
            return getDate(Date.parse(v.date))<getDate(Date.parse(data[i+1].date))
        }
        return false;
    });
    const dateList = dateChangePoint.map((v) => getDate(Date.parse(v.date)));

    const [elRefs, setElRefs] = useState<RefObject<HTMLElement>[]>([]);
    const windowHeight = useWindowHeight();
    const currentMonth = useAppSelector((state) => state.content.month);
    useEffect(() => {
        setElRefs(elRefs => (
            Array(data.length).fill(0).map((_, i) => elRefs[i] || createRef())
        ));
    }, [data]);
    useEffect(() => {
        console.log(currentMonth);
        const option = {
            root: null,
            rootMargin: `0px 0px -${windowHeight - 60}px 0px`,
            threshold: 0,
        }
        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                
                if (entry.intersectionRatio > 0) {
                    console.log((entry.target as HTMLElement).dataset.date);

                }
            })
        }, option);

        elRefs.forEach((el,i) => {
            // console.log(el,i);
            if (el.current) {
                io.observe(el.current);
            }
        });
        // console.log(elRefs);
    }, [elRefs]);

    return (
        <div>
            {data.map((v,i) => {
                if(dateChangePoint.includes(v)) {
                    sideFlag = !sideFlag;
                    return (
                        <>
                            <Card ref={elRefs[i]} text={v.text} date={v.date} rightSide={!sideFlag}/>
                            <DayNode date={dateList[dateChangePoint.indexOf(v)]} rightSide={!sideFlag}/>
                        </>
                    )
                } else {
                    return <Card ref={elRefs[i]} text={v.text} date={v.date} rightSide={sideFlag}/>;
                }
            })}
        </div>
    );
};

export default CardList;