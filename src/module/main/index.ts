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
};

export const MainState = Recoil.atom({
    key: 'MainState',
    default: initialState,
});

export const useMainAction = () => {
    const { getState, setState } = useCoilState(MainState);
    const history = useHistory<any>();

    const getQuote = () => {
        const quote = QuoteUtil.getQuote(getState().difficulty);
        setState((state) => (state.quote = quote.text));
    };

    const onMount = () => {
        getQuote();
    };

    const onRouteMatched = (routeParameter: any, location: Location<Readonly<any> | undefined>) => {
        // TODO
    };

    const onDifficultyChange = (difficulty: Difficulty) => {
        if (difficulty !== null) {
            setState((state) => (state.difficulty = difficulty));
            getQuote();
        }
    };

    const changeText = (value: string) => {
        setState((state) => (state.entering = value));
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
        onMount,
        onRouteMatched,
        onDifficultyChange,
        updateText,
        undoText,
        changeText,
    });
};

export const MainComponent = injectLifeCycle<any, any>(Main, useMainAction);
