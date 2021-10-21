import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { MainLayout } from './MainLayout';
import './index.less';

export const Main = React.memo(() => {
    return (
        <ThemeProvider
            theme={createTheme({
                palette: {
                    mode: 'dark',
                },
            })}
        >
            <CssBaseline />
            <MainLayout />
        </ThemeProvider>
    );
});
