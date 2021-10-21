export interface State {
    difficulty: Difficulty;
    quote: string | null;
    entered: string[];
    entering: string;
}

export type Difficulty = 'all' | 'short' | 'medium' | 'long' | 'thick';
