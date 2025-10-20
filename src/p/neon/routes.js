export function routes({ get }) {
    get({
            route: "/set",
            query: ['key', 'value'],
            desc: "Set 'key' to 'value' using Neon PostgreSQL hosted on Vercel.",
            rtn: "None. Use '/store/get?key' to retrieve the set value.",
            callback: (req, res) => {
                const { key, value } = req.query;
                res.send("todo");
            }
        }
    );
    get({
            route: "/get",
            query: ['key'],
            desc: "Get 'key' from PostgreSQL DB.",
            rtn: "The 'value' for the given key.",
            callback: (req, res) => {
                const { key } = req.query;
                res.send("todo");
            }
        }
    );
}