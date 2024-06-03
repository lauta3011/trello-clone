import { create } from 'zustand';
import { ICard } from '../components/Card';
import { COLUMN_NAME } from "../utils/constants";

const removeFrom = ( cards: any, { id }: ICard, prevColumn: string ) => {
    const cardIndex = cards[prevColumn].findIndex((c: ICard) => c.id === id);
    cards[prevColumn].splice(cardIndex, 1);
    return cards[prevColumn];
};

const addTo = ( cards: any, card: ICard, droppedTo: number ) => {
    const newColumn = COLUMN_NAME[droppedTo];
    const updatedCard = { ...card, column: droppedTo };

    return [ ...cards[newColumn], updatedCard ];
};

const handleUpdateCard = (card: ICard , droppedTo: number, cards: any) => {
    const prevColumn: string = COLUMN_NAME[card.column];
    const newColumn: string = COLUMN_NAME[droppedTo];

    const removedFrom = removeFrom(cards, card, prevColumn);
    const addedTo = addTo(cards, card, droppedTo);

    return { ...cards, [prevColumn]: removedFrom, [newColumn]: addedTo }
};

export interface ICards {
    [key: string]: any
};

interface IBoardState {
    columns: object[],
    cards: ICards,
    addCard: (card: ICard, newColumn: number) => void
};

const useStore = create<IBoardState>()((set) => ({
    columns : [
        { id: 0, name: 'blocked', label: 'Blocked', enabled: false },
        { id: 1, name: 'todo', label: 'ToDo', enabled: true },
        { id: 2, name: 'inProgress', label: 'In Progress', enabled: true },
        { id: 3, name: 'done', label: 'Done', enabled: true },
    ],

    cards: {
        toDo: [{ id: 1, column: 1, title: 'una card', desc: 'alguien me dijo hacete amigo del dolor' }, { id: 2, column: 1, title: 'otra card', desc: 'y el beso de partida me lo juego en esta vida' }], 
        inProgress: [],
        done: []
    },

    addCard: (card: ICard, newColumn: number) => set((state) => ({ ...state.cards, cards: handleUpdateCard(card, newColumn, state.cards) }))
}));

export { useStore };