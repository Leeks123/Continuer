import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../../hooks/redux';
import { updateListOrder } from '../../../redux/reducers/habitSlice';

import Habit from '../Habit';
import DraggableItem from './DraggableItem';

const Wrapper = styled.ul`
    width: 100%;
    margin: 0;
    padding: 0;
`;

type DraggableListProps = {
    list: any[],
}
const DraggableList:React.FC<DraggableListProps> = ({list}) => {
    const dispatch = useAppDispatch();
    const [draggingItem,setDraggingItem] = useState<HTMLElement>();

    const switchItems = (dragging:HTMLElement,target:HTMLElement) => {
        
        const draggingParentNode = dragging.parentNode;
        const targetParentNode = target.parentNode;

        const draggingItemIdx = dragging.getAttribute('data-idx');
        const targetItemIdx = target.getAttribute('data-idx');

        if (draggingItemIdx && targetItemIdx && draggingItemIdx !== targetItemIdx) {
            // switch DOM Node
            targetParentNode?.removeChild(target);
            draggingParentNode?.removeChild(dragging);
        
            targetParentNode?.appendChild(dragging);
            draggingParentNode?.appendChild(target);

            // // update id
            // console.log(draggingItemIdx,targetItemIdx);
            dispatch(updateListOrder([parseInt(draggingItemIdx),parseInt(targetItemIdx)]));
        }
    }

    // draggable item event
    const onDrag = (e:any) => {
        e.preventDefault();
    };
    const onDragStart = (e:any) => {
        setDraggingItem(e.target);
        e.target.style.opacity = .5; // 요소를 반투명하게 함
    };
    const onDragEnd = (e:any) => {
        e.target.style.opacity = ""; // 투명도를 리셋
        console.log('dragEnd')
    };
    
    // droppable item event
    const onDragOver = (e:any) => {
      e.preventDefault();
    }
    const onDragEnter = (e:any) => {
        const target: HTMLElement = e.target.closest('.droppable');

        if (draggingItem !== undefined && target !== null) {
            switchItems(draggingItem,target);
        }
    };
    const onDragLeave = (e:any) => {};
    const onDrop = (e:any) => {
      e.preventDefault();
      // 드래그한 요소를 드롭 대상과 스위칭
      if (e.target.className === "droppable" && draggingItem !== undefined) {
        e.target.style.background = "";
        switchItems(draggingItem,e.target);
      }
    };

    return (
        <Wrapper
            onDrag={onDrag}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
        >
            {list.map((listItem,idx) => (
                <DraggableItem key={listItem.id} idx={listItem.id} >
                    <Habit data={listItem}/>
                </DraggableItem>
            ))}
        </Wrapper>
    );
};

export default DraggableList;