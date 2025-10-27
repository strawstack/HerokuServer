export function routes({ get }) {
    get({
            route: "/",
            query: [],
            desc: "Connect with a socket server.",
            rtn: "",
            callback: (req, res) => {
                res.sendFile('index.html');
            }
        }
    );
}