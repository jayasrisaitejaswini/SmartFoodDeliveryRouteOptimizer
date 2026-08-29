# 🍔 Smart Food Delivery Route Optimizer

A web-based Smart Food Delivery Route Optimizer that helps calculate efficient delivery routes between restaurants and customers using real geographic locations and interactive maps.

## 🚀 Live Demo

[Open SmartRoute Live Project](https://jayasrisaitejaswini.github.io/SmartFoodDeliveryRouteOptimizer/)

## 📌 Project Features

- 🍔 Create food delivery orders
- 📍 Enter custom restaurant and customer addresses
- 🗺️ Interactive real-world map
- 🚗 Real road route visualization
- ⚡ Shortest route calculation
- 📏 Optimized delivery distance
- 🛣️ Normal route vs optimized route comparison
- 💚 Distance saved calculation
- ⏱️ Estimated delivery time
- ❌ Invalid address detection
- 💾 Save optimized orders
- 📦 Order history management
- 🚴 Delivery partner dashboard
- 🚴 Start delivery tracking
- ✅ Mark orders as delivered
- 🔔 Notifications
- 👤 User profile
- ❓ Help and support section

## 🧠 Route Optimization Logic

The application converts restaurant and customer addresses into geographic coordinates using geocoding.

The route is then calculated using real road network routing concepts. Locations can be represented as nodes and roads as weighted edges, where distance acts as the weight.

The optimizer selects an efficient route between the restaurant and customer and displays:

- Optimized distance
- Estimated travel time
- Distance saved compared with a normal route
- Route visualization on an interactive map

## 🛠️ Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript

### APIs and Mapping

- OpenStreetMap
- Leaflet.js
- Nominatim Geocoding API
- OSRM Routing API

### Browser Storage

- LocalStorage

## 📂 Project Structure

```text
SmartFoodDeliveryRouteOptimizer
│
├── index.html
├── create-order.html
├── route-optimizer.html
├── order-history.html
├── profile.html
├── notifications.html
├── help-support.html
├── delivery-dashboard.html
│
├── css
│   └── style.css
│
├── js
│   ├── order.js
│   ├── route.js
│   ├── history.js
│   ├── profile.js
│   ├── notifications.js
│   ├── help.js
│   └── delivery.js
│
└── README.md
🔄 Application Workflow
Create Order
     ↓
Enter Restaurant and Customer Locations
     ↓
Calculate Delivery Route
     ↓
View Real Map and Optimized Route
     ↓
Save Optimized Order
     ↓
Order History
     ↓
Delivery Partner Dashboard
     ↓
Start Delivery
     ↓
Out for Delivery
     ↓
Mark as Delivered
🌟 Key Learning Concepts
Web development
API integration
Geolocation and geocoding
Graph-based routing concepts
Route optimization
LocalStorage data management
Dynamic DOM manipulation
Interactive maps
👩‍💻 Author

Jayasri Sai Tejaswini

📄 License

This project was developed for educational and academic purposes.