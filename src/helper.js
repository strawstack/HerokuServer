const helper = () => {

    function html(one, ...two) {
        const merge = [];
        for (let i = 0; i < two.length; i++) {
            merge.push(one[i]);
            merge.push(two[i]);
        }
        merge.push(one[one.length - 1]);
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(merge.join(""), 'text/html');
        return htmlDoc;
    }

    function createEndpoints(endpoints) {
        function getRoutes(endpoint) {
            const collect = [];
            for (let route in endpoint) {
                const {
                    type,
                    query,
                    desc,
                    rtn
                } = endpoint[route];
                collect.push(`
                    <div class="route">
                        <div>Route: ${route}</div>
                        <div>Type: ${type}</div>
                        <div>Params: ${query.join(", ")}</div>
                        <div>Description: ${desc}</div>
                        <div>Return: ${rtn}</div>
                    </div>
                `);
            }
            return collect.join("");
        }

        function getEndpoints(endpoints) {
            const collect = [];
            for (let endpoint in endpoints) {
                collect.push(`
                    <div class="row">
                        <h3>${endpoint}</h3>
                        <div class="routes">
                            ${getRoutes(endpoints[endpoint])}
                        </div>
                    </div>
                `);
            }
            return collect.join("");
        }

        return html`
            <div class="endpoints">
                ${getEndpoints(endpoints)}
            </div>
        `;
    }

    return {
        createEndpoints
    };
};