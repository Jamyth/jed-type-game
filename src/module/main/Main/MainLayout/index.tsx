import React from 'react';
import { Container, Box } from '@mui/material';
import { Header } from './Header';
import { useMainState } from '../../hooks';
import { Word } from 'component/game/Word';
import { useMainAction } from '../../index';
import { Caret } from 'component/game/Caret';

export const MainLayout = React.memo(() => {
    const quote = useMainState((state) => state.quote);
    const entering = useMainState((state) => state.entering);
    const entered = useMainState((state) => state.entered);
    const actions = useMainAction();
    const [container, setContainer] = React.useState<HTMLDivElement | null>(null);
    const [offsetX, setOffsetX] = React.useState(0);
    const [offsetY, setOffsetY] = React.useState(0);
    const [x, setX] = React.useState(0);
    const [y, setY] = React.useState(0);

    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
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
    }, [container]);

    return (
        <Container fixed maxWidth="md" id="g-container">
            <Header />
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
                    {container && <Caret top={y - offsetY} left={x - offsetX} />}
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
            <Box height="180px" />
        </Container>
    );
});
