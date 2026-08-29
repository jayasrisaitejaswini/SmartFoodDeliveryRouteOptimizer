// ================= GET CURRENT ORDER =================

const order = JSON.parse(
    localStorage.getItem("currentOrder")
);


// ================= CHECK ORDER =================

if (!order) {

    alert("No delivery order found.");

    window.location.href =
        "create-order.html";

}


// ================= DISPLAY ORDER DETAILS =================

document.getElementById(
    "partnerRestaurant"
).textContent =
    order.restaurantName;


document.getElementById(
    "partnerRestaurantAddress"
).textContent =
    order.restaurantAddress;


document.getElementById(
    "partnerCustomer"
).textContent =
    order.customerName;


document.getElementById(
    "partnerCustomerAddress"
).textContent =
    order.deliveryAddress;


document.getElementById(
    "partnerDistance"
).textContent =
    (order.routeDistance || "--") + " km";


document.getElementById(
    "partnerTime"
).textContent =
    (order.estimatedTime || "--") + " min";


document.getElementById(
    "partnerFood"
).textContent =
    order.foodItem || "--";


// ================= CREATE MAP =================

const partnerMap = L.map(
    "partnerMap"
).setView(
    [20.5937, 78.9629],
    5
);


// ================= MAP LAYER =================

L.tileLayer(

    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

    {
        maxZoom: 19,

        attribution:
            "&copy; OpenStreetMap contributors"
    }

).addTo(partnerMap);



// ================= GET COORDINATES =================

async function getCoordinates(address) {

    const url =
        "https://nominatim.openstreetmap.org/search?format=json&limit=1&q="
        + encodeURIComponent(address);


    const response =
        await fetch(url);


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



// ================= GET ROUTE =================

async function getRoute(
    startLat,
    startLon,
    endLat,
    endLon
) {

    const url =

        "https://router.project-osrm.org/route/v1/driving/"

        + startLon
        + ","
        + startLat
        + ";"
        + endLon
        + ","
        + endLat

        + "?overview=full&geometries=geojson";


    const response =
        await fetch(url);


    const data =
        await response.json();


    if (
        !data.routes ||
        data.routes.length === 0
    ) {

        throw new Error(
            "Route not found"
        );

    }


    return data.routes[0];

}



// ================= LOAD DELIVERY MAP =================

async function loadDeliveryMap() {

    try {

        const restaurantLocation =
            await getCoordinates(
                order.restaurantAddress
            );


        const customerLocation =
            await getCoordinates(
                order.deliveryAddress
            );


        const route =
            await getRoute(

                restaurantLocation.lat,
                restaurantLocation.lon,

                customerLocation.lat,
                customerLocation.lon

            );


        // RESTAURANT MARKER

        L.marker(

            [
                restaurantLocation.lat,
                restaurantLocation.lon
            ]

        )

        .addTo(partnerMap)

        .bindPopup(

            "🍴 <b>Restaurant</b><br>"
            + order.restaurantName

        )

        .openPopup();



        // CUSTOMER MARKER

        L.marker(

            [
                customerLocation.lat,
                customerLocation.lon
            ]

        )

        .addTo(partnerMap)

        .bindPopup(

            "🏠 <b>Customer</b><br>"
            + order.customerName

        );



        // ROUTE LINE

        const coordinates =

            route.geometry.coordinates.map(

                point => [

                    point[1],
                    point[0]

                ]

            );


        const routeLine =

            L.polyline(

                coordinates,

                {
                    color: "#ff5722",
                    weight: 6,
                    opacity: 0.8
                }

            )

            .addTo(partnerMap);



        partnerMap.fitBounds(

            routeLine.getBounds(),

            {
                padding: [40, 40]
            }

        );

    }

    catch (error) {

        console.error(
            "Map error:",
            error
        );

    }

}


// LOAD MAP

loadDeliveryMap();



// ================= UPDATE ORDER STATUS =================

function updateOrderStatus(newStatus) {

    // UPDATE CURRENT ORDER

    order.status = newStatus;


    localStorage.setItem(

        "currentOrder",

        JSON.stringify(order)

    );


    // GET ALL SAVED ORDERS

    let orders =

        JSON.parse(

            localStorage.getItem("orders")

        )

        || [];


    // FIND SAME ORDER USING ID

    const orderIndex =

        orders.findIndex(

            savedOrder =>

                savedOrder.id === order.id

        );


    // UPDATE SAVED ORDER

    if (orderIndex !== -1) {

        orders[orderIndex] = {

            ...orders[orderIndex],

            ...order,

            status: newStatus

        };

    }


    localStorage.setItem(

        "orders",

        JSON.stringify(orders)

    );



    // UPDATE DASHBOARD STATUS

    document.getElementById(
        "deliveryStatus"
    ).textContent =
        newStatus;

}



// ================= RESTORE BUTTON STATE =================

if (order.status === "Out for Delivery") {

    document.getElementById(
        "deliveryStatus"
    ).textContent =
        "Out for Delivery";


    document.getElementById(
        "startDeliveryBtn"
    ).disabled = true;


    document.getElementById(
        "deliveredBtn"
    ).disabled = false;

}


else if (order.status === "Delivered") {

    document.getElementById(
        "deliveryStatus"
    ).textContent =
        "Delivered";


    document.getElementById(
        "startDeliveryBtn"
    ).disabled = true;


    document.getElementById(
        "deliveredBtn"
    ).disabled = true;

}



// ================= START DELIVERY =================

document.getElementById(
    "startDeliveryBtn"
)

.addEventListener(

    "click",

    function () {


        updateOrderStatus(
            "Out for Delivery"
        );


        document.getElementById(
            "startDeliveryBtn"
        ).disabled = true;


        document.getElementById(
            "deliveredBtn"
        ).disabled = false;


        alert(
            "Delivery started successfully!"
        );

    }

);



// ================= MARK DELIVERED =================

document.getElementById(
    "deliveredBtn"
)

.addEventListener(

    "click",

    function () {


        updateOrderStatus(
            "Delivered"
        );


        document.getElementById(
            "startDeliveryBtn"
        ).disabled = true;


        document.getElementById(
            "deliveredBtn"
        ).disabled = true;


        alert(
            "Order delivered successfully!"
        );

    }

);