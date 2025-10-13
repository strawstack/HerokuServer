export function routes({ get }) {
    get("/", (req, res) => {
        res.send('this is rhymes');
    });
}