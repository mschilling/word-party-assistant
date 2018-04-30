import * as functions from 'firebase-functions';
import * as moment from 'moment';

//Custom imports
import { calculateAge, firstLetter, spell, spellSsml, reverse } from './utils';


import {
    dialogflow,
    Parameters,
    Contexts,
    Context,
    Suggestions,
    BasicCard,
    Button,
    SimpleResponse,
} from 'actions-on-google';

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

const app = dialogflow();

// const userLocale = app.getUserLocale() || 'en-US';
// i18n.setLocale(userLocale);
moment.locale('nl-NL');

app.intent('Animal Starts With', conv => {

    conv.ask( new SimpleResponse({
        speech: `<speak>Ok, laten we beginnen. Welk naam van een dier begint met een L?</speak>`,
        text: `Ok laten we beginnen, welk naam van een dier begint met een L?`
    }));

})

app.intent('Animal Starts With - game mode', conv => {

    const animalName = conv.parameters.animal;
    console.log('Input animal name', animalName);

    conv.contexts.set('AnimalStartsWith-followup', 4);
    // conv.contexts.set('ANIMAL_NAMES', 4);

    conv.ask( new SimpleResponse({
        speech: `<speak>${animalName} begint met de letter ${firstLetter(animalName.toString())}?</speak>`,
        text: `${animalName} begint met de letter ${firstLetter(animalName.toString())}?`
    }));

})

app.intent('Spell Animal Name', conv => {

    const animalName = conv.parameters.animal;
    console.log('Input animal name', animalName);


    conv.ask( new SimpleResponse({
        speech: `<speak><say-as interpret-as="characters">${animalName}</say-as></speak>`,
        text: `${animalName.toString()} spel je zo: ${animalName.toString().toUpperCase()}?`
    }));

})

app.intent('Echo Word', conv => {

    const word = conv.parameters.word;
    console.log('Input word', word);


    conv.ask( new SimpleResponse({
        speech: `<speak>${(word.toString())} achterstevoren is <break strength="weak"/> ${reverse(word.toString())}.</speak>`,
        text: `${word}`
    }));

})

exports.assistant = functions.https.onRequest(app)
