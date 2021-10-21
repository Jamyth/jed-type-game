import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useMainState } from '../../hooks';
import { useMainAction } from '../../index';

export const Header = React.memo(() => {
    const difficulty = useMainState((state) => state.difficulty);
    const actions = useMainAction();

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" my="2rem">
            <Typography variant="h3" color="secondary">
                Jed-Type
            </Typography>
            <ToggleButtonGroup
                value={difficulty}
                exclusive
                onChange={(_, value) => actions.onDifficultyChange(value)}
                color="secondary"
            >
                <ToggleButton value="all">All</ToggleButton>
                <ToggleButton value="short">Short</ToggleButton>
                <ToggleButton value="medium">Medium</ToggleButton>
                <ToggleButton value="long">Long</ToggleButton>
                <ToggleButton value="thick">Thick</ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
});
