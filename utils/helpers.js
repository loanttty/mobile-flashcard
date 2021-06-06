import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = 'MobileFlashcard'

function setInitialDummyData () {
    AsyncStorage.setItem(STORAGE_KEY,JSON.stringify(dummyData))
    return dummyData
}

function getData (results) {
    return results === null
            ? setInitialDummyData()
            : results
}

export function getDecks () {
    return AsyncStorage.getItem(STORAGE_KEY)
        .then(getData)
}

export function getDeck (id) {
    return AsyncStorage.getItem(STORAGE_KEY)
        .then((results) => console.log(results[id]))
}

export function saveDeckTitle (id) {
    return AsyncStorage.mergeItem(STORAGE_KEY,JSON.stringify({
        [id]: {
            title: id,
        }
    }))
}

export function removeDeck (id) {
    AsyncStorage.getItem(STORAGE_KEY)
            .then((results) => {
                const data = JSON.parse(results)
                data[id] = undefined
                delete data[id]
                AsyncStorage.setItem(STORAGE_KEY,JSON.stringify(data))
            })
    return data
}

export function addCardToDeck ({id, card}) {
    return AsyncStorage.mergeItem(STORAGE_KEY,JSON.stringify({
        [id]: {
            ...id,
            questions: [
                ...id.questions,
                card,
            ]
        }
    }))
}

const dummyData = {
    React: {
      title: 'React',
      questions: [
        {
            question: 'Is React a library for managing user interfaces?',
            answer: true,
            explanation: 'N/A'
        },
        {
            question: 'Is the componentDidMount lifecycle event to make Ajax requests in React?',
            answer: false,
            explanation: 'N/A'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
            question: 'Is a closure the combination of a function and the lexical environment within which that function was declared?',
            answer: false,
            explanation: 'N/A'
        }
      ]
    }
  }

