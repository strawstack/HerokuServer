(async () => {

    const {
        createEndpoints
    } = helper();

    //
    // DOM Elements
    //
    const endpointsElem = document.querySelector(".endpoints"); 

    //
    // Environment detection
    //
    const DEV = !window.location.href.includes("heroku");
    const BASE = (() => {
        if (DEV) {
            return "http://localhost:5006";
        } else {
            return "https://heroku-server-rch-22279f2bdd5b.herokuapp.com";
        }
    })();

    //
    // Fetch Endpoints
    //
    const response = await fetch(`${BASE}/endpoints`);
    const endpoints = await response.json();
    
    const html = createEndpoints(endpoints);
    endpointsElem.appendChild(html.querySelector(".endpoints"));
})();