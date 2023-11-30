import { load } from "https://deno.land/std@0.207.0/dotenv/mod.ts";

const env = await load({
    envPath: '../.env',
});

const CURRENT_YEAR = env["CURRENT_YEAR"];
const SESSION_COOKIE = 'session=' + env["SESSION_COOKIE"];

export const removeLeadingZero = (str: string | undefined): string => {
    if (typeof str !== 'string') throw new Error('Input is not a string');
    return str.replace(/^0+/, '');
}

export async function fetchAndReturnInput(): Promise<string | undefined> {
    const filePath = Deno.cwd();
    const currentDate = filePath.split('/').pop();

    try {
        const inputExists = await Deno.stat(`../inputs/days/${currentDate}.txt`).then(() => true).catch(() => false);
        
        if (inputExists) {
            console.log('Input already exists, returning cached input');
            return await Deno.readTextFile(`../inputs/days/${currentDate}.txt`);
        }

        const response = await fetch(`https://adventofcode.com/${CURRENT_YEAR}/day/${removeLeadingZero(currentDate)}/input`, {
            headers: {
                cookie: SESSION_COOKIE
            }
        });

        if (!response.status.toString().startsWith('2')) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();
        const encoder = new TextEncoder();
        const data = encoder.encode(text);

        await Deno.mkdir('../inputs/days/', { recursive: true });
        await Deno.writeFile(`../inputs/days/${currentDate}.txt`, data);

        return text;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
