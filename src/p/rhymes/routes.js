import { readFileSync } from 'fs';

const rhyme_lookup = JSON.parse(readFileSync("rhymes.json", "utf-8"));

export function routes({ get }) {
    get("/", (req, res) => {
        const { word } = req.query;
        const rhymes = (word in rhyme_lookup) ? rhyme_lookup[word] : [];
        res.send(JSON.stringify(rhymes));
    });
}