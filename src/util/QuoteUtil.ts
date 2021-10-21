import type { MonkeyTypeQuoteAJAXResponse } from 'type/api';
import quotes from 'constant/quotes.json';

type Length = 'all' | 'short' | 'medium' | 'long' | 'thick';

function randomRange(length: Length) {
    const groups = quotes.groups;
    let min = 0;
    let max = 0;
    switch (length) {
        case 'all':
            min = groups[0][0];
            max = groups[3][1];
            break;
        case 'short':
            min = 0;
            max = groups[0][1];
            break;
        case 'medium':
            min = groups[1][0];
            max = groups[1][1];
            break;
        case 'long':
            min = groups[2][0];
            max = groups[2][1];
            break;
        case 'thick':
            min = groups[3][0];
            max = groups[3][1];
            break;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getQuote(length: Length) {
    return quotes.quotes[randomRange(length)];
}

export const QuoteUtil = Object.freeze({
    getQuote,
});
