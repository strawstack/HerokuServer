const value_lookup = {};

export function routes({ get }) {
    get({
            route: "/set",
            query: ['value'],
            desc: "Set a value on the server.",
            rtn: "None. Use /p/get to obtain the value.",
            callback: (req, res) => {
                const BASE = `${req.protocol}://${req.host}`;
                const { value } = req.query;
                value_lookup["value"] = value;
                res.send({
                    value,
                    url: `${BASE}/p/get`
                });
            }
        }
    );
    get({
            route: "/get",
            query: [],
            desc: "Get a value from the server.",
            rtn: "The value previously set by /p/set.",
            callback: (req, res) => {
                const value = ("value" in value_lookup) ? value_lookup["value"] : null;
                delete value_lookup["value"];
                res.send({
                    value
                });
            }
        }
    );
}