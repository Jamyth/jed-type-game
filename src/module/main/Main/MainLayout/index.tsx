import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { Header } from './Header';
import { useMainState } from '../../hooks';
import { Word } from 'component/game/Word';
import { useMainAction, TimerState } from '../../index';
import { Caret } from 'component/game/Caret';
import { Timer } from 'component/Timer';
import { TimeUtil } from 'util/TimeUtil';
import Recoil from 'recoil';

export const MainLayout = React.memo(() => {
    const [time, setTime] = Recoil.useRecoilState(TimerState);
    const quote = useMainState((state) => state.quote);
    const entering = useMainState((state) => state.entering);
    const entered = useMainState((state) => state.entered);
    const finished = useMainState((state) => state.finished);
    const timerStart = useMainState((state) => state.started);
    const actions = useMainAction();
    const [container, setContainer] = React.useState<HTMLDivElement | null>(null);
    const [offsetX, setOffsetX] = React.useState(0);
    const [offsetY, setOffsetY] = React.useState(0);
    const [x, setX] = React.useState(0);
    const [y, setY] = React.useState(0);
    const [enableCaretAnimation, setEnableCaretAnimation] = React.useState(true);

    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        setEnableCaretAnimation(false);
        const validKey = /[a-zA-Z.,?!;"':1234567890-]*/;
        if (e.key === 'Backspace') {
            if (entering.length) {
                actions.changeText(entering.slice(0, entering.length - 1));
            } else {
                actions.undoText();
            }
        } else if (e.key === ' ' && entering.length) {
            actions.updateText();
        } else if (validKey.test(e.key) && e.key.length === 1) {
            actions.changeText(entering + e.key);
        }
    };

    React.useEffect(() => {
        if (container) {
            setOffsetX(container.getBoundingClientRect().left);
            setOffsetY(container.getBoundingClientRect().top);
        }
    }, [container, quote]);

    React.useEffect(() => {
        if (container && quote) {
            setX(container.getBoundingClientRect().left);
            setY(container.getBoundingClientRect().top);
        }
    }, [quote]);

    React.useEffect(() => {
        if (!enableCaretAnimation) {
            const timeout = window.setTimeout(() => {
                setEnableCaretAnimation(true);
            }, 2000);

            return () => {
                window.clearTimeout(timeout);
            };
        }
    }, [enableCaretAnimation]);

    return (
        <Container fixed maxWidth="md" id="g-container">
            <Timer startCount={timerStart} value={time} setValue={setTime} />
            <Header />
            {!finished ? (
                <Box
                    tabIndex={0}
                    onKeyDown={onKeyDown}
                    display="flex"
                    flex="1"
                    alignItems="center"
                    sx={{
                        '&:focus': {
                            outline: 'none',
                        },
                    }}
                >
                    <Box display="flex" flexWrap="wrap" position="relative" ref={setContainer}>
                        {container && (
                            <Caret
                                enabledAnimation={enableCaretAnimation}
                                top={y ? y : offsetY}
                                left={x ? x : offsetX}
                            />
                        )}
                        {quote &&
                            quote
                                .split(' ')
                                .map((_, i) => (
                                    <Word
                                        shouldValidate={i < entered.length}
                                        key={i}
                                        content={_}
                                        entered={i === entered.length ? entering : entered[i]}
                                        isActive={i === entered.length}
                                        setTop={setY}
                                        setLeft={setX}
                                    />
                                ))}
                    </Box>
                </Box>
            ) : (
                <Box
                    display="flex"
                    flexDirection="column"
                    flex="1"
                    alignItems="center"
                    justifyContent="space-around"
                    sx={{ padding: '5rem 0' }}
                >
                    <Typography variant="h2" fontWeight="bold">
                        {Math.floor(quote!.split(' ').reduce((acc, curr) => acc + curr.length, 0) / 5 / (time / 60))}{' '}
                        WPM
                    </Typography>
                    <Typography variant="h3">Total Words: {quote!.split(' ').length}</Typography>
                    <Typography variant="h3">
                        Total Characters: {quote!.split(' ').reduce((acc, curr) => acc + curr.length, 0)}
                    </Typography>
                    <Typography variant="h3">Time Used: {TimeUtil.format(time).join(':')}</Typography>
                    <Button size="large" onClick={actions.reset}>
                        Reload
                    </Button>
                </Box>
            )}
            <Box height="180px" />
        </Container>
    );
});
