import React, { useEffect, useState } from 'react';

import Card from './Card';
import { CardState } from '../../redux/reducers/cardListSlice';


type CardListProps = {
    data: CardState[]
}
const CardList = ({ data }:CardListProps) => {
    return (
        <div>
            {data.map((v) => <Card text={v.text} date={v.date}/>)}
            {data.map((v) => <Card text={v.text} date={v.date} rightSide={true}/>)}
        </div>
    );
};

export default CardList;