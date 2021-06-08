import {RECEIVE_ENTRIES, ADD_DECK, DELETE_DECK, ADD_CARD} from "../actions"

function entries (state = {}, action) {
    switch(action.type) {
        case RECEIVE_ENTRIES:
            return {
                ...state,
                ...action.entries
            }
        case ADD_DECK:
            return {
                ...state,
                [action.id]: {
                    title: action.id,
                    questions: []
                }
            }
        case DELETE_DECK:
            const entries = state
            entries[action.id] = undefined
            delete entries[action.id]
            return {
                ...entries
            }
        case ADD_CARD:
            return {
                ...state,
                [action.card.id]: {
                    ...state[action.card.id],
                    questions: [
                        ...state[action.card.id].questions,
                        action.card.question
                    ]
                }
            }
        default:
            return state
    }
}

export default entries