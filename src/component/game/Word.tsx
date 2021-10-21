import { Box } from '@mui/system';
import React from 'react';
import { Letter } from './Letter';

interface Props {
    content: string;
    entered: string | undefined;
    shouldValidate: boolean;
    isActive?: boolean;
    setTop?: (value: number) => void;
    setLeft?: (value: number) => void;
}

export const Word = React.memo(({ content, entered, shouldValidate, isActive, ...handlers }: Props) => {
    const chars = entered?.split('') ?? [];
    const letters = content.split('');
    const hasError = content !== entered;

    return (
        <Box
            display="flex"
            mr="0.7rem"
            borderBottom={shouldValidate && hasError ? '1px solid #ca4754' : '1px solid transparent'}
        >
            {letters.map((_, i) => (
                <Letter
                    {...handlers}
                    isLastChar={isActive && i === chars.length - 1}
                    key={i}
                    char={_}
                    typed={chars[i]}
                />
            ))}
            {entered &&
                entered.length > content.length &&
                [...new Array(entered.length - content.length)].map((_, i) => (
                    <Letter
                        {...handlers}
                        isLastChar={isActive && i === chars.length - 1}
                        key={i}
                        char={null}
                        typed={chars[i + content.length]}
                    />
                ))}
        </Box>
    );
});
