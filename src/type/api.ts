export interface MonkeyTypeQuoteAJAXResponse {
    language: string;
    groups: number[][];
    quotes: MonkeyTypeQuoteAJAXResponse$Quote[];
}

export interface MonkeyTypeQuoteAJAXResponse$Quote {
    text: string;
    source: string;
    length?: number;
    id?: number;
}
