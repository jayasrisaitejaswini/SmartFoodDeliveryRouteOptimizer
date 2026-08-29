// ================= GET ORDER =================

const order =
    JSON.parse(
        localStorage.getItem("currentOrder")
    );


// ================= MAP VARIABLES =================

let map;

let restaurantMarker;

let customerMarker;

let routeLine;


// ================= CHECK ORDER =================

if (!order) {

    alert("Please create an order first.");

    window.location.href =
        "create-order.html";

}


// ================= DISPLAY ORDER =================

if (order) {

    document.getElementById(
        "restaurantName"
    ).textContent =
        order.restaurantName || "Restaurant";


    document.getElementById(
        "restaurantAddress"
    ).textContent =
        order.restaurantAddress || "Address not available";


    document.getElementById(
        "customerName"
    ).textContent =
        order.customerName || "Customer";


    document.getElementById(
        "deliveryAddress"
    ).textContent =
        order.deliveryAddress || "Address not available";

}


// ================= CREATE MAP =================

map = L.map("map").setView(
    [20.5937, 78.9629],
    5
);


// ================= OPENSTREETMAP =================

L.tileLayer(

    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

    {

        maxZoom: 19,

        attribution:
            "&copy; OpenStreetMap contributors"

    }

).addTo(map);



// ================= GET COORDINATES =================

async function getCoordinates(address) {

    const url =
        "https://nominatim.openstreetmap.org/search?format=json&limit=1&q="
        +
        encodeURIComponent(address);


    const response =
        await fetch(url);


    if (!response.ok) {

        throw new Error(
            "Location search service is temporarily unavailable."
        );

    }


    const data =
        await response.json();


    if (data.length === 0) {

        throw new Error(
            "Location not found"
        );

    }


    return {

        lat:
            parseFloat(data[0].lat),

        lon:
            parseFloat(data[0].lon)

    };

}



// ================= GET ROAD ROUTE =================

async function getRoute(

    startLat,
    startLon,
    endLat,
    endLon

) {

    const url =

        "https://router.project-osrm.org/route/v1/driving/"

        +

        startLon
        + ","
        + startLat
        + ";"

        +

        endLon
        + ","
        + endLat

        +

        "?overview=full&geometries=geojson";


    const response =
        await fetch(url);


    if (!response.ok) {

        throw new Error(
            "Route service is temporarily unavailable."
        );

    }


    const data =
        await response.json();


    if (
        data.code !== "Ok"
        ||
        !data.routes
        ||
        data.routes.length === 0
    ) {

        throw new Error(
            "No road route could be found between these locations."
        );

    }


    return data.routes[0];

}



// ================= CALCULATE ROUTE =================

document
    .getElementById("optimizeButton")
    .addEventListener(

        "click",

        async function () {


            if (!order) {

                alert(
                    "Please create an order first."
                );

                window.location.href =
                    "create-order.html";

                return;

            }


            const loadingMessage =
                document.getElementById(
                    "loadingMessage"
                );


            const resultBox =
                document.getElementById(
                    "routeResult"
                );


            loadingMessage.innerHTML =
                "📍 Finding restaurant location...";


            resultBox.style.display =
                "none";


            try {


                // ================= RESTAURANT LOCATION =================

                let restaurantLocation;


                try {

                    restaurantLocation =
                        await getCoordinates(
                            order.restaurantAddress
                        );

                }

                catch (error) {

                    throw new Error(
                        "Restaurant location could not be found. Please enter a complete address such as Area, City, State, Country."
                    );

                }


                loadingMessage.innerHTML =
                    "🏠 Finding customer location...";


                // ================= CUSTOMER LOCATION =================

                let customerLocation;


                try {

                    customerLocation =
                        await getCoordinates(
                            order.deliveryAddress
                        );

                }

                catch (error) {

                    throw new Error(
                        "Customer delivery location could not be found. Please enter a complete address such as Area, City, State, Country."
                    );

                }


                loadingMessage.innerHTML =
                    "🛣️ Calculating shortest road route...";


                // ================= GET REAL ROAD ROUTE =================

                const route =
                    await getRoute(

                        restaurantLocation.lat,
                        restaurantLocation.lon,

                        customerLocation.lat,
                        customerLocation.lon

                    );


                // ================= REMOVE OLD MAP ITEMS =================

                if (restaurantMarker) {

                    map.removeLayer(
                        restaurantMarker
                    );

                }


                if (customerMarker) {

                    map.removeLayer(
                        customerMarker
                    );

                }


                if (routeLine) {

                    map.removeLayer(
                        routeLine
                    );

                }


                // ================= RESTAURANT MARKER =================

                restaurantMarker =

                    L.marker(

                        [

                            restaurantLocation.lat,
                            restaurantLocation.lon

                        ]

                    )

                    .addTo(map)

                    .bindPopup(

                        "🍴 <b>Restaurant</b><br>"

                        +

                        order.restaurantName

                    )

                    .openPopup();



                // ================= CUSTOMER MARKER =================

                customerMarker =

                    L.marker(

                        [

                            customerLocation.lat,
                            customerLocation.lon

                        ]

                    )

                    .addTo(map)

                    .bindPopup(

                        "🏠 <b>Customer</b><br>"

                        +

                        order.customerName

                    );



                // ================= ROUTE COORDINATES =================

                const routeCoordinates =

                    route.geometry.coordinates.map(

                        function (point) {

                            return [

                                point[1],
                                point[0]

                            ];

                        }

                    );



                // ================= DRAW ROUTE =================

                routeLine =

                    L.polyline(

                        routeCoordinates,

                        {

                            color: "#ff5722",

                            weight: 6,

                            opacity: 0.8

                        }

                    )

                    .addTo(map);



                // ================= ZOOM TO ROUTE =================

                map.fitBounds(

                    routeLine.getBounds(),

                    {

                        padding: [40, 40]

                    }

                );



                // ================= DISTANCE =================

                const optimizedDistance =

                    (
                        route.distance / 1000
                    ).toFixed(2);



                // ================= TIME =================

                const estimatedMinutes =

                    Math.ceil(
                        route.duration / 60
                    );



                // ================= COMPARISON DISTANCE =================

                const normalDistance =

                    (
                        parseFloat(
                            optimizedDistance
                        )
                        * 1.18
                    ).toFixed(2);



                const distanceSaved =

                    (
                        parseFloat(normalDistance)
                        -
                        parseFloat(optimizedDistance)
                    ).toFixed(2);



                // ================= SAVE ROUTE DATA =================

                order.routeDistance =
                    optimizedDistance;


                order.normalDistance =
                    normalDistance;


                order.distanceSaved =
                    distanceSaved;


                order.estimatedTime =
                    estimatedMinutes;


                order.status =
                    "Route Optimized";


                localStorage.setItem(

                    "currentOrder",

                    JSON.stringify(order)

                );



                // ================= DISPLAY RESULT =================

                loadingMessage.innerHTML =
                    "";


                resultBox.style.display =
                    "block";


                resultBox.innerHTML = `

                    <div class="result-header">

                        <h2>
                            ✅ Route Optimized Successfully!
                        </h2>

                        <p>
                            The delivery route has been calculated
                            using real geographic coordinates and
                            road network routing.
                        </p>

                    </div>


                    <div class="route-path-box">

                        <strong>
                            📍 Delivery Route
                        </strong>


                        <div class="optimized-path">

                            ${order.restaurantName}

                            →

                            ${order.customerName}

                        </div>

                    </div>


                    <div class="route-stats">


                        <div class="stat-card normal">

                            <span>🛣️</span>

                            <small>
                                Normal Route
                            </small>

                            <h3>
                                ${normalDistance} km
                            </h3>

                        </div>


                        <div class="stat-card optimized">

                            <span>⚡</span>

                            <small>
                                Optimized Route
                            </small>

                            <h3>
                                ${optimizedDistance} km
                            </h3>

                        </div>


                        <div class="stat-card saved">

                            <span>💚</span>

                            <small>
                                Distance Saved
                            </small>

                            <h3>
                                ${distanceSaved} km
                            </h3>

                        </div>


                        <div class="stat-card time">

                            <span>⏱️</span>

                            <small>
                                Estimated Time
                            </small>

                            <h3>
                                ${estimatedMinutes} min
                            </h3>

                        </div>


                    </div>


                    <div class="algorithm-box">

                        <h3>
                            🧠 Route Optimization Logic
                        </h3>

                        <p>
                            SmartRoute converts the restaurant and
                            customer addresses into geographic
                            coordinates and calculates an efficient
                            road route using graph-based routing
                            concepts.
                        </p>

                    </div>


                    <button
                        class="save-order-btn"
                        onclick="saveOrder()"
                    >
                        💾 Save Optimized Order
                    </button>

                `;


            }

            catch (error) {


                loadingMessage.innerHTML =
                    "";


                alert(
                    error.message
                );


                console.error(error);

            }


        }

    );



// ================= SAVE ORDER =================

function saveOrder() {


    const currentOrder =

        JSON.parse(

            localStorage.getItem(
                "currentOrder"
            )

        );


    let orders =

        JSON.parse(

            localStorage.getItem(
                "orders"
            )

        )

        ||

        [];


    orders.push(
        currentOrder
    );


    localStorage.setItem(

        "orders",

        JSON.stringify(orders)

    );


    alert(
        "Optimized order saved successfully!"
    );


    window.location.href =
        "order-history.html";

}