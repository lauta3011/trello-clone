import React, { useState } from "react";

import { useStore } from "../../store";

import { COLUMN_NAME } from "../../utils/constants";

import ActionButton from "../ActionButton";

export interface ICard {
    id?: number,
    title?: string,
    desc?: string,
    column: number,
    newCard: boolean,
    cancelCreate: () => void,
    addNewCard: (card: ICard, columnName: string) => void
}

const Card: React.FC<ICard> = (card) => {
    const { id, title, desc, column, newCard, cancelCreate, addNewCard } = card;
    const columnName = COLUMN_NAME[column];

    const removeCard = useStore((state) => state.removeCard);
    const [cardTitle, setCardTitle] = useState('');
    const [cardDesc, setCardDesc] = useState('');

    function createNewCard() {
        if(cardDesc && cardTitle) {
            const newCardData = {
                id: id,
                title: cardTitle,
                desc: cardDesc,
                column: column,
                newCard: false,
                cancelCreate,
                addNewCard
            }

            addNewCard(newCardData, columnName)
        }
    }

    function handleDrag(e: React.DragEvent) {
        const data: ICard = { id, title, desc, column, newCard: false, cancelCreate, addNewCard };
        e.dataTransfer.setData('widgetData', JSON.stringify(data));
        e.dataTransfer.effectAllowed = 'move'
    };

    return (
        <div draggable={newCard ? false : true} onDragStart={handleDrag} className="relative overflow-hidden hover:overflow-auto text-left bg-slate-300 p-2 shadow-lg m-2 rounded-lg" >
            {!newCard && <>
                <h1 className="text-lg font-bold">{title}</h1>
                <p>{desc}</p>
            </>}

            {newCard && 
            <div className="flex flex-col">
                <input type="text" placeholder="Title" onChange={(e) => setCardTitle(e.target.value)} className="mb-1 bg-transparent border-2 border-slate-400 rounded"/>
                <textarea onChange={(e) => setCardDesc(e.target.value)} className="bg-transparent border-2 resize-none border-slate-400 rounded"/>
            </div>
            }

            <div className="absolute flex top-1 right-1">
                <ActionButton handleAction={() => { newCard ? cancelCreate() : removeCard(card, columnName) }} isDelete={true} />
                {newCard && <ActionButton handleAction={() => createNewCard()} isDelete={false} />}
            </div>
        </div>
    )
}

export default Card;