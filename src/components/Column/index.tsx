import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { ICards, useStore } from "../../store";

import { COLUMN_NAME } from "../../utils/constants";
import Card, { ICard } from "../Card";

interface IColumn {
    title: string,
    column: number,
    handleDropCard: (card: ICard, column: number) => void,
};

const Column: React.FC<IColumn> = ({ title, column, handleDropCard }) => {
    const columnKey: string = COLUMN_NAME[column]; 
    const cards: ICards = useStore((state) => state.cards);

    const filteredCards = cards[columnKey] || [];

    function dropCard(data: React.DragEvent) {
        const card = JSON.parse(data.dataTransfer.getData("widgetData"));
        handleDropCard(card, column)
    };

    return (
        <div onDragOver={(e) => e.preventDefault()} onDrop={(e) => dropCard(e)} 
            className="Column shadow-2xl relative bg-slate-100 h-full rounded-lg">
            <h2 className="bg-slate-500 p-4 text-slate-50 text-xl font-bold">{title}</h2>
            <div>
                {filteredCards.map((c: any, index: number) => {
                    return <Card key={index} {...c} />
                })}

                <div className="absolute right-4 bottom-4 rounded-full flex justify-center transition ease-in-out delay-150 bg-slate-600 hover:bg-slate-400 text-white">
                    
                    <button onClick={() => console.log('agrega carajo')} className="h-12 w-12"><FontAwesomeIcon icon={faPlus}/></button>
                </div>
            </div>
        </div>
    )
}

export default Column;