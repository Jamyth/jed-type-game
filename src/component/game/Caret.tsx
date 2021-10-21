import { Box } from '@mui/system';
import React from 'react';
import './index.less';

interface Props {
    left: number;
    top: number;
    enabledAnimation: boolean;
}

export const Caret = React.memo(({ left, top, enabledAnimation }: Props) => {
    return <Box className={`g-caret ${enabledAnimation ? 'animate' : ''}`} top={`${top}px`} left={`${left}px`} />;
});
