export const RECEIVE_ENTRIES = "RECEIVE_ENTRIES"
export const ADD_DECK = "ADD_DECK"
export const DELETE_DECK = "DELETE_DECK"
export const ADD_CARD = "ADD_CARD"

export function receiveEntries (entries) {
    return {
        type: RECEIVE_ENTRIES,
        entries
    }
}
export function addDeck (id) {
    return {
        type: ADD_DECK,
        id
    }
}

export function deleteDeck (id) {
    return {
        type: DELETE_DECK,
        id
    }
}

export function addCard (card) {
    return {
        type: ADD_CARD,
        card
    }
}