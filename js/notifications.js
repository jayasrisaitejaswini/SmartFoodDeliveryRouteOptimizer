let notifications = [

    {
        id: 1,
        title: "Order Out for Delivery",
        message: "Your order is on the way to your location.",
        read: false
    },

    {
        id: 2,
        title: "Route Optimized",
        message: "The shortest delivery route has been calculated successfully.",
        read: false
    },

    {
        id: 3,
        title: "Order Delivered",
        message: "Your food order was delivered successfully.",
        read: true
    }

];


const container =
    document.getElementById("notificationsContainer");


notifications.forEach(function(notification) {

    const notificationBox =
        document.createElement("div");


    notificationBox.className =
        notification.read
            ? "notification read"
            : "notification unread";


    notificationBox.innerHTML = `

        <h3>${notification.title}</h3>

        <p>${notification.message}</p>

        <button onclick="markAsRead(${notification.id})">
            Mark as Read
        </button>

    `;


    container.appendChild(notificationBox);

});


function markAsRead(id) {

    notifications =
        notifications.map(function(notification) {

            if (notification.id === id) {

                notification.read = true;

            }

            return notification;

        });


    localStorage.setItem(
        "notifications",
        JSON.stringify(notifications)
    );


    location.reload();

}