import { createHash } from 'crypto';

export function routes({ get }) {
    get({
            route: "/",
            query: ['word'],
            desc: "Get the sha256 encryption for a word.",
            rtn: "Sha256 hash of given word as hex digest string.",
            callback: (req, res) => {
                const { word } = req.query;
                res.send({
                    hash: createHash('sha256').update(word).digest('hex')
                });
            }
        }
    );
}