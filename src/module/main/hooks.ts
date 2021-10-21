import Recoil from 'recoil';
import { MainState, TimerState } from 'module/main';
import type { State } from './type';

export const useMainState = <T>(fn: (state: State) => T): T => {
    const state = Recoil.useRecoilValue(MainState);
    return fn(state);
};

export const useTimerState = () => {
    return Recoil.useRecoilValue(TimerState);
};
