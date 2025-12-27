import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFileSync, writeFileSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

export function routes({ get }) {
    get({
            route: "/",
            query: [],
            desc: "Visit this page to update the list of projects",
            rtn: "",
            callback: async (req, res) => {
                const { code } = req.query;
                if (code) {
                    const response = await fetch("https://github.com/login/oauth/access_token", {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            client_id: process.env.GITHUB_CLIENT_ID,
                            client_secret: process.env.GITHUB_CLIENT_SECRET,
                            code: code,
                        }),
                    });
                    const data = await response.json();
                    const { access_token } = data;

                    var headers = new Headers();
                    headers.append("Accept", "application/json");
                    headers.append("X-GitHub-Api-Version", "2022-11-28");
                    headers.append("Authorization", `Bearer ${access_token}`);
                    const requestOptions = {
                        method: 'GET',
                        headers: headers,
                    };
                    const get_response = await fetch("https://api.github.com/users/strawstack/repos", requestOptions);
                    const get_data = await get_response.json();
                    writeFileSync(`${__dirname}/data/projects.json`, JSON.stringify(get_data));
                    res.send("Visit -> /p/projects/get");
                } else {
                    res.sendFile(`site/index.html`, {root: __dirname});
                }
            }
        }
    );
    get({
        route: "/get",
        query: [],
        desc: "Visit this page to update the list of projects",
        rtn: "JSON object containing a list of my Github projects",
        callback: async (req, res) => {
            const content = readFileSync(`${__dirname}/data/projects.json`);
            res.send(JSON.parse(content));
        }
    });
}
