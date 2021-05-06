import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.li`
    width: 100%;
    height: 100%;
    list-style: none;

    .droppable {
        margin: 0;
        padding: 0;

        position: relative;
        z-index: 15;
    }
`;

type DraggableItemProps = {
    idx: number
}
const DraggableItem:React.FC<DraggableItemProps> = ({ idx,children }) => {
    return (
        <Wrapper>
            <div draggable={true} className="droppable" data-idx={idx}>{children}</div>
        </Wrapper>
    );
};

export default DraggableItem;