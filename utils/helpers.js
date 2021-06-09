import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = 'MobileFlashcard'

function setInitialDummyData () {
    //console.log(dummyData)
    AsyncStorage.setItem(STORAGE_KEY,JSON.stringify(dummyData))
    return dummyData
}

function getData () {
    //console.log(Object.keys(results).length)
    //console.log(Object.values(results))
    return setInitialDummyData()
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
    return AsyncStorage.getItem(STORAGE_KEY)
            .then((results) => {
                const data = JSON.parse(results)
                data[id] = undefined
                delete data[id]
                AsyncStorage.setItem(STORAGE_KEY,JSON.stringify(data))
            })
}

export function addCardToDeck ({id, question}) {
    return AsyncStorage.mergeItem(STORAGE_KEY,JSON.stringify({
        [id]: {
            ...id,
            questions: [
                question
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
            explanation: ''
        },
        {
            question: 'Is the componentDidMount lifecycle event to make Ajax requests in React?',
            answer: true,
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

