import { value_lookup } from '../get/routes.js';

export function routes({ get }) {
    get({
            route: "/",
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
}