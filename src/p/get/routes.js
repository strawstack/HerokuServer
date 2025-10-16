export const value_lookup = {};

export function routes({ get }) {
    get({
            route: "/",
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