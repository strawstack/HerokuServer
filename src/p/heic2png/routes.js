import convert from 'heic-convert';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));

export function routes({ get, post }) {
    get({
            route: "/",
            query: [],
            desc: "A server side app for converting HEIC images to PNG.",
            rtn: "None. This page is a webapp.",
            callback: (req, res) => {
                res.sendFile(`site/index.html`, {root: __dirname});
            }
        }
    ),
    post({
            route: "/",
            query: ['img'],
            desc: "Convert a HEIC image to a PNG image.",
            rtn: "A PNG image.",
            callback: async (req, res) => {
                const base64 = req.body.heic;
                const buffer = Buffer.from(base64, 'base64');

                // TODO: See (https://www.npmjs.com/package/data-uri-to-buffer)

                const outputBuffer = await convert({
                    buffer: buffer, // the HEIC file buffer
                    format: 'PNG'   // output format
                });

                res.send({png: outputBuffer});
            }
        }
    );
}