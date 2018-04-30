import * as moment from 'moment';

export function calculateAge(date: moment.Moment): number {
    console.log('func calculateAge');
    console.log(`input date`, date.toISOString());
    return moment().diff(date, 'years');
}

export function firstLetter(input: string): string {
    if(input === undefined || input === '') {
        return input;
    }
    return input.split('')[0].toUpperCase();
}

export function spell(input: string): string {
    if(input === undefined || input === '') {
        return input;
    }
    let result = input.split('').map( p => p.toUpperCase());
    return result.join(' ')
}

export function reverse(s){
    return s.split('').reverse().join('');
}

export function spellSsml(input: string): string {
    if(input === undefined || input === '') {
        return input;
    }
    let result = input.split('').map( p => `<speak>${p.toUpperCase()}</speak><break time="0.3s" strength="strong"/>`);
    return result.join(' ')
}