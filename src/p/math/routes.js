export function routes({ get }) {
    get("/", (req, res) => {
        const { a, b } = req.query;
        res.send(parseInt(a, 10) + parseInt(b, 10));
    });
}