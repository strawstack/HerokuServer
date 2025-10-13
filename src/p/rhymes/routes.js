import { readFileSync } from 'fs';

const rhyme_lookup = JSON.parse(readFileSync("src/p/rhymes/rhymes.json", "utf-8"));

export function routes({ get }) {
    get({
            route: "/",
            query: ['word'],
            desc: "Looks up rhyming words.",
            rtn: "Object containing rhyming words with syllable count.",
            callback: (req, res) => {
                const { word } = req.query;
                const rhymes = (word in rhyme_lookup) ? rhyme_lookup[word] : [];
                res.send(JSON.stringify(rhymes));
            }
        }
    );
}