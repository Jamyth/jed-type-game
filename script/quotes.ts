import fs from 'fs';
import path from 'path';
import { createConsoleLogger } from '@iamyth/logger';
import axios from 'axios';

const logger = createConsoleLogger('Quotes');

const run = async () => {
    logger.task('Fetching quotes from the internet');
    const result = await axios.get('https://monkeytype.com/quotes/english.json');
    const data = await result.data;

    logger.task('Writing quotes to constant/quotes.json');
    const destFile = path.join(__dirname, '../src/constant/quotes.json');
    const content = JSON.stringify(data);
    fs.writeFileSync(destFile, content, { encoding: 'utf-8' });
    require('./format');
};

run();
