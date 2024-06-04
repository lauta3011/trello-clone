import React, { useState } from "react";

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
    const addNewCard = useStore((state) => state.addNewCard);

    const filteredCards = cards[columnKey] || [];
    
    const [createCard, setCreateCard] = useState(false);

    function dropCard(data: React.DragEvent) {
        const card = JSON.parse(data.dataTransfer.getData("widgetData"));
        handleDropCard(card, column)
    };

    return (
        <div onDragOver={(e) => e.preventDefault()} onDrop={(e) => dropCard(e)} className="shadow-2xl overflow-auto relative bg-slate-100 h-full rounded-lg">
            <div className="sticky top-0 z-10 bg-slate-500 text-slate-50 justify-between p-4 w-full inline-flex">
                <div className="inline-flex items-center">
                    <h2 className="text-xl font-bold mr-8">{title}</h2>
                    <h3>{filteredCards.length}</h3>
                </div>

                <div className="sticky top-0 rounded-full flex justify-center transition ease-in-out delay-150 bg-slate-400 hover:bg-slate-600 text-white">
                    <button onClick={() => setCreateCard(true)} className="h-8 w-8"><FontAwesomeIcon icon={faPlus}/></button>
                </div>
            </div>

            <div>
                {filteredCards.map((c: any, index: number) => {
                    return <Card key={index} newCard={false} {...c} />
                })}

                {createCard && <Card addNewCard={(card, column) => { addNewCard(card, column); setCreateCard(false) }} cancelCreate={() => setCreateCard(false)} id={Math.random()} column={column} newCard={true}/>}
            </div>
        </div>
    )
}

export default Column;