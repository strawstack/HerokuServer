export function routes({ get }) {
    get({
            route: "/sum",
            query: ['a', 'b'],
            desc: "Adds two numbers.",
            rtn: "Sum of the two given numbers.",
            callback: (req, res) => {
                const { a, b } = req.query;
                res.send(parseInt(a, 10) + parseInt(b, 10));
            }
        }
    );
    get({
            route: "/sub",
            query: ['a', 'b'],
            desc: "Subtract two numbers.",
            rtn: "The subtraction of b from a.",
            callback: (req, res) => {
                const { a, b } = req.query;
                res.send(parseInt(a, 10) - parseInt(b, 10));
            }
        }
    );
}