document
    .getElementById("orderForm")
    .addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const order = {

                id: "ORD-" + Date.now(),

                restaurantName:

                    document
                        .getElementById(
                            "restaurantName"
                        )
                        .value,


                restaurantAddress:

                    document
                        .getElementById(
                            "restaurantAddress"
                        )
                        .value,


                customerName:

                    document
                        .getElementById(
                            "customerName"
                        )
                        .value,


                deliveryAddress:

                    document
                        .getElementById(
                            "deliveryAddress"
                        )
                        .value,


                foodItem:

                    document
                        .getElementById(
                            "foodItem"
                        )
                        .value,


                status:

                    "Order Created",


                createdAt:

                    new Date()
                        .toLocaleString()

            };


            localStorage.setItem(

                "currentOrder",

                JSON.stringify(order)

            );


            window.location.href =
                "route-optimizer.html";

        }
    );