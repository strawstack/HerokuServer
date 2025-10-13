export function routes({ get }) {
    get({
            route: "/",
            query: ['a', 'b'],
            desc: "Adds two numbers.",
            rtn: "Sum of the two given numbers.",
            callback: (req, res) => {
                const { a, b } = req.query;
                res.send(parseInt(a, 10) + parseInt(b, 10));
            }
        }
    );
}