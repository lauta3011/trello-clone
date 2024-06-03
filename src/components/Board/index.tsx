import React from "react";
import { useStore } from "../../store";

import Column from "../Column";
import { ICard } from "../Card";

const Board: React.FC = () => {
    const columns = useStore((state) => state.columns);
    const addCard = useStore((state) => state.addCard);
    
    return (
        <div className="Board h-full columns-3 bg-indigo-100 gap-8 p-2" >
            {columns.map((c: any, index: number) => {
                return c.enabled && <Column key={index} title={c.label} column={c.id} handleDropCard={(card: ICard, droppedTo) => addCard(card, droppedTo)} />
            })}
        </div>
    )
};

export default Board;