import Recoil from 'recoil';
import { injectLifeCycle, useCoilState, useHistory, actionHandlers } from 'coil-react';
import { Main } from './Main';
import { QuoteUtil } from 'util/QuoteUtil';
import type { Difficulty, State } from './type';
import type { Location } from 'history';

const initialState: State = {
    difficulty: 'all',
    quote: null,
    entered: [],
    entering: '',
    started: false,
    finished: false,
};

export const TimerState = Recoil.atom({
    key: 'TimerState',
    default: 0,
});

export const MainState = Recoil.atom({
    key: 'MainState',
    default: initialState,
});

export const useMainAction = () => {
    const { getState, setState } = useCoilState(MainState);
    const { setState: setTimerState } = useCoilState(TimerState);
    const history = useHistory<any>();

    const reset = () => {
        setState((state) => {
            state.entered = [];
            state.entering = '';
            state.finished = false;
            state.started = false;
        });
        setTimerState(0);
    };

    const getQuote = () => {
        const quote = QuoteUtil.getQuote(getState().difficulty);
        setState((state) => (state.quote = quote.text));
        reset();
    };

    const onRouteMatched = (routeParameter: any, location: Location<Readonly<any> | undefined>) => {
        getQuote();
    };

    const onDifficultyChange = (difficulty: Difficulty) => {
        if (difficulty !== null) {
            setState((state) => (state.difficulty = difficulty));
            getQuote();
        }
    };

    const changeText = (value: string) => {
        setState((state) => {
            if (!state.quote) {
                return;
            }
            const splitQuote = state.quote.split(' ');
            const quoteLength = splitQuote.length;
            const totalLength = state.entered.length;
            const quoteLastWord = splitQuote[quoteLength - 1];

            if (!state.entered.length && !state.entering.length) {
                state.started = true;
            }

            if (quoteLength === totalLength + 1 && value === quoteLastWord) {
                state.started = false;
                state.finished = true;
            }
            state.entering = value;
        });
    };

    const updateText = () => {
        setState((state) => {
            state.entered.push(state.entering);
            state.entering = '';
        });
    };

    const undoText = () => {
        setState((state) => {
            if (state.entered.length && state.quote) {
                const lastIndex = state.entered.length - 1;
                const lastWord = state.entered[lastIndex];
                const expected = state.quote.split(' ')[lastIndex];
                if (expected !== lastWord) {
                    state.entered.pop();
                    state.entering = lastWord;
                }
            }
        });
    };

    return actionHandlers({
        onRouteMatched,
        onDifficultyChange,
        updateText,
        undoText,
        changeText,
        reset,
    });
};

export const MainComponent = injectLifeCycle<any, any>(Main, useMainAction);
