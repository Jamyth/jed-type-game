import { Box } from '@mui/system';
import React from 'react';

interface Props {
    char: string | null; // null for extra
    typed: string | undefined; // undefined for no input;
    isLastChar?: boolean;
    setTop?: (value: number) => void;
    setLeft?: (value: number) => void;
}

export const Letter = React.memo(({ char, typed, isLastChar, setTop, setLeft }: Props) => {
    const status = !typed ? 'un-typed' : char === typed ? 'correct' : !char ? 'extra' : 'error';
    const [div, setDiv] = React.useState<HTMLDivElement | null>(null);

    React.useEffect(() => {
        if (isLastChar && div) {
            const { top, left, width, height } = div.getBoundingClientRect();
            setTop?.(top);
            setLeft?.(left + width);
        }

        return () => {
            if (isLastChar) {
                setTop?.(0);
                setLeft?.(0);
            }
        };
    }, [div, isLastChar]);

    return (
        <Box
            ref={setDiv}
            fontSize="1.9rem"
            sx={{
                userSelect: 'none',
            }}
            color={
                status === 'correct'
                    ? '#ba68c8'
                    : status === 'un-typed'
                    ? '#616161'
                    : status === 'error'
                    ? '#ca4754'
                    : '#7e2a33'
            }
        >
            {status === 'extra' ? typed : char}
        </Box>
    );
});
