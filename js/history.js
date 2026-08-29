// ================= GET SAVED ORDERS =================

const orders =

    JSON.parse(
        localStorage.getItem("orders")
    ) || [];


// ================= GET CONTAINER =================

const ordersContainer =

    document.getElementById(
        "ordersContainer"
    );


// ================= CHECK ORDERS =================

if (orders.length === 0) {

    ordersContainer.innerHTML = `

        <div class="empty-orders">

            <h2>
                📭 No Orders Yet
            </h2>

            <p>
                Create a food delivery order and
                optimize its route.
            </p>

            <a
                href="create-order.html"
                class="create-order-btn"
            >
                ➕ Create New Order
            </a>

        </div>

    `;

}

else {

    ordersContainer.innerHTML = "";


    // ================= DISPLAY EACH ORDER =================

    orders
        .slice()
        .reverse()
        .forEach(

            function (order) {


                const orderCard =

                    document.createElement(
                        "div"
                    );


                orderCard.className =
                    "order-card";


                orderCard.innerHTML = `

                    <div class="order-header">

                        <div>

                            <h2>
                                🍴 ${order.restaurantName || "Restaurant"}
                            </h2>

                            <p class="order-id">

                                ${order.id || "Order"}

                            </p>

                        </div>


                        <span class="order-status">

                            ${order.status || "Order Created"}

                        </span>

                    </div>


                    <div class="order-details">


                        <div class="order-location">

                            <span>
                                📍
                            </span>

                            <div>

                                <small>
                                    PICKUP LOCATION
                                </small>

                                <p>

                                    ${order.restaurantAddress || "Not available"}

                                </p>

                            </div>

                        </div>



                        <div class="order-location">

                            <span>
                                🏠
                            </span>

                            <div>

                                <small>
                                    DELIVERY LOCATION
                                </small>

                                <p>

                                    ${order.deliveryAddress || "Not available"}

                                </p>

                            </div>

                        </div>


                    </div>


                    <div class="food-item">

                        🍔 <strong>
                            Food:
                        </strong>

                        ${order.foodItem || "Not specified"}

                    </div>


                    <div class="route-information">


                        <div>

                            <small>
                                ⚡ Optimized Distance
                            </small>

                            <h3>

                                ${order.routeDistance || "N/A"} km

                            </h3>

                        </div>


                        <div>

                            <small>
                                💚 Distance Saved
                            </small>

                            <h3>

                                ${order.distanceSaved || "N/A"} km

                            </h3>

                        </div>


                        <div>

                            <small>
                                ⏱ Estimated Time
                            </small>

                            <h3>

                                ${order.estimatedTime || "N/A"} min

                            </h3>

                        </div>


                    </div>


                    <div class="order-footer">

                        <small>

                            🕒 Created:
                            ${order.createdAt || "Recently"}

                        </small>

                    </div>

                `;


                ordersContainer.appendChild(
                    orderCard
                );

            }

        );

}