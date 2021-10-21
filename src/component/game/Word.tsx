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

export const Word = React.memo(({ content, entered, shouldValidate, isActive, setLeft, setTop }: Props) => {
    const chars = entered?.split('') ?? [];
    const letters = content.split('');
    const hasError = content !== entered;
    const [container, setContainer] = React.useState<HTMLDivElement | null>(null);

    React.useEffect(() => {
        if (container && isActive && chars.length === 0) {
            const { top, left } = container.getBoundingClientRect();
            setTop?.(top);
            setLeft?.(left);

            return () => {
                setTop?.(0);
                setLeft?.(0);
            };
        }
    }, [container, isActive, entered]);

    return (
        <Box
            display="flex"
            ref={setContainer}
            mr="0.7rem"
            borderBottom={shouldValidate && hasError ? '1px solid #ca4754' : '1px solid transparent'}
        >
            {letters.map((_, i) => (
                <Letter
                    setLeft={setLeft}
                    setTop={setTop}
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
                        setLeft={setLeft}
                        setTop={setTop}
                        isLastChar={isActive && i + content.length === chars.length - 1}
                        key={i}
                        char={null}
                        typed={chars[i + content.length]}
                    />
                ))}
        </Box>
    );
});
