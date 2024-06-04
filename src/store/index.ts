import { create } from 'zustand';
import { ICard } from '../components/Card';

import { COLUMN_NAME } from "../utils/constants";

export interface ICards {
    [key: string]: any
};

interface IBoardState {
    columns: object[],
    cards: ICards,
    moveCard: (card: ICard, newColumn: number) => void,
    removeCard: (card: ICard, from: string) => void,
    addNewCard: (card: ICard, column: string) => void
};

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


const useStore = create<IBoardState>()((set) => ({
    columns : [
        { id: 0, name: 'blocked', label: 'Blocked', enabled: false },
        { id: 1, name: 'todo', label: 'ToDo', enabled: true },
        { id: 2, name: 'inProgress', label: 'In Progress', enabled: true },
        { id: 3, name: 'done', label: 'Done', enabled: true },
    ],

    cards: {
        toDo: [
            { id: 1, column: 1, title: 'first card example', desc: 'here is a short description of the card in question, just some text to be displayed in the card and fill the empty space' }, 
            { id: 2, column: 1, title: 'another card', desc: 'this is other card with different description in order to show as a placeholder, the same as the one above. Very nice!' }
        ], 
        inProgress: [],
        done: []
    },
    removeCard: (card: ICard, from: string) => set((state) => ({ ...state.cards, cards: { ...state.cards, [from]: removeFrom(state.cards, card, from) }  })),
    moveCard: (card: ICard, newColumn: number) => set((state) => ({ ...state.cards, cards: handleUpdateCard(card, newColumn, state.cards) })),
    addNewCard: (card: ICard, column: string) => set((state) => ({ ...state.cards, cards: { ...state.cards, [column]: addTo(state.cards, card, card.column) } }))
}));

// removeFrom(state.cards, card, COLUMN_NAME[from])
export { useStore };