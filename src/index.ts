import { startApp, async } from 'coil-react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const MainComponent = async(() => import('module/main'), 'MainComponent');

startApp({
    MainComponent,
    entryElement: document.getElementById('app'),
});
