# Mobile Flashcard React Native Project on Android

This project is coded using React, Redux and React Native with these functionalities below:

1. Display existing decks and create new decks. No same deck name is allowed.
2. Add questions with each represented as one card to decks and start quiz on all cards created. Quiz function is unavailable if the deck has no card.
3. In the quiz, correct answers is calculated after every questions is answered. Users will be able to go back and forth between questions and retry those they have answered. The number of correct answers will be reset according to the correctness of the previous given answer of to-be-retried question.
4. When the quiz comes to an end, users will have the options of start the quiz all over again or go back to the deck.
5. Notification is triggered on daily basis at a specific time of the day as reminder to take a quiz if users have not do so.

This app is tested on Expo Go App - Android device.

## Install:

To get started right away:

- install all project dependencies with `yarn install`
- start the development server with `expo start`
