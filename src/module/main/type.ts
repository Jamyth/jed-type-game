export interface State {
    difficulty: Difficulty;
    quote: string | null;
    entered: string[];
    entering: string;
    started: boolean;
    finished: boolean;
}

export type Difficulty = 'all' | 'short' | 'medium' | 'long' | 'thick';
