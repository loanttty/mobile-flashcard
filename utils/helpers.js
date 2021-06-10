import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'

const STORAGE_KEY = 'MobileFlashcard'
const NOTIFICATION_KEY = 'MobileFlashcard:notifications'

export function clearLocalNotification () {
  return AsyncStorage.clearItem(NOTIFICATION_KEY)
          .then(Notifications.cancelAllScheduledNotificationAsync)
}

function createNotification () {
  return {
    title: 'Take a quiz!',
    body: "🔔 Don't forget to take a quiz today!",
    android: {
      sound: true,
      priority: 'high',
      sticky:  false,
      vibrate: true
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(() => {

        Notifications.scheduleNotificationAsync({
        content: createNotification(),
        trigger: {
            hour: 16, 
            minute: 55, 
            repeats: true
        }}
        )
        AsyncStorage.setItem(NOTIFICATION_KEY,JSON.stringify(true))
    })
}

function setInitialDummyData () {
    AsyncStorage.setItem(STORAGE_KEY,JSON.stringify(dummyData))
    return dummyData
}

function getData () {
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

