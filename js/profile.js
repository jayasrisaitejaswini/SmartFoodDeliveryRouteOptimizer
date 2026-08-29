let userProfile = {
    username: "Rahul",
    fullName: "Rahul Kumar",
    email: "rahul@gmail.com",
    phone: "9876543210",
    city: "Bangalore",
    pincode: "560001"
};


const savedProfile =
    JSON.parse(localStorage.getItem("userProfile"));


if (savedProfile) {

    userProfile = savedProfile;

}


document.getElementById("username").textContent =
    userProfile.username;

document.getElementById("fullName").textContent =
    userProfile.fullName;

document.getElementById("email").textContent =
    userProfile.email;

document.getElementById("phone").textContent =
    userProfile.phone;

document.getElementById("city").textContent =
    userProfile.city;

document.getElementById("pincode").textContent =
    userProfile.pincode;


document
    .getElementById("editProfileBtn")
    .addEventListener("click", function () {

        const fullName =
            prompt(
                "Enter Full Name:",
                userProfile.fullName
            );

        const email =
            prompt(
                "Enter Email:",
                userProfile.email
            );

        const phone =
            prompt(
                "Enter Phone:",
                userProfile.phone
            );

        const city =
            prompt(
                "Enter City:",
                userProfile.city
            );

        const pincode =
            prompt(
                "Enter Pincode:",
                userProfile.pincode
            );


        if (fullName) {

            userProfile.fullName = fullName;
            userProfile.email = email;
            userProfile.phone = phone;
            userProfile.city = city;
            userProfile.pincode = pincode;


            localStorage.setItem(
                "userProfile",
                JSON.stringify(userProfile)
            );


            location.reload();

        }

    });