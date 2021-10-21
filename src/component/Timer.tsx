import React from 'react';

interface Props {
    value: number;
    setValue: (value: number) => void;
    startCount?: boolean;
}

export const Timer = React.memo(({ startCount = false, value, setValue }: Props) => {
    const [, setCount] = React.useState(value);

    React.useEffect(() => {
        if (!startCount) {
            return;
        }
        const interval = window.setInterval(() => {
            setCount((count) => {
                const value = count + 1;
                setValue?.(value);
                console.info(value);
                return value;
            });
        }, 1000);

        return () => {
            window.clearInterval(interval);
        };
    }, [setValue, startCount]);

    React.useEffect(() => {
        if (value === 0) {
            setCount(0);
        }
    }, [value]);

    return null;
});
