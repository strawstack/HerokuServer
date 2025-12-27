import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));

export function routes({ get }) {
    get({
            route: "/projects",
            query: [],
            desc: "Visit this page to update the list of projects",
            rtn: "",
            callback: (req, res) => {
                res.sendFile(`site/index.html`, {root: __dirname});
            }
        }
    );
    get({
            route: "/projects/get",
            query: [],
            desc: "Visit this page to update the list of projects",
            rtn: "Returns a list of my github public projects",
            callback: (req, res) => {
                res.send("todo");
            }
        }
    );
}