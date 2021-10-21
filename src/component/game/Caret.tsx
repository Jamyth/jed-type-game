import { Box } from '@mui/system';
import React from 'react';
import './index.less';

interface Props {
    left: number;
    top: number;
}

export const Caret = React.memo(({ left, top }: Props) => {
    return <Box className="g-caret" top={`${top}px`} left={`${left}px`} />;
});
