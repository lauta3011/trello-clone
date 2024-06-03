import React from "react";

import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface ICard {
    id: number,
    title: string,
    desc: string,
    column: number
}

const Card: React.FC<ICard> = ({ id, title, desc, column }) => {
    function handleDrag (e: React.DragEvent) {
        const data: ICard = { id, title, desc, column };
        e.dataTransfer.setData('widgetData', JSON.stringify(data));
        e.dataTransfer.effectAllowed = 'move'
    };

    return (
        <div draggable onDragStart={handleDrag} className="relative h-24 text-left bg-slate-300 p-2 shadow-lg m-2 rounded-lg" >
            <h1 className="text-lg font-bold">{title}</h1>
            <p>{desc}</p>

            <div className="absolute rounded-lg top-0 right-0 w-10 h-full flex justify-center align-bottom opacity-0 bg-red-300 transition ease-in-out delay-100 hover:opacity-75">
                <FontAwesomeIcon className="h-full size-6" icon={faTrashCan}/>
            </div>
        </div>
    )
}

export default Card;