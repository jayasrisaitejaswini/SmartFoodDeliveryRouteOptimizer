const faqData = [

    {
        id: 1,
        question: "How can I place a food order?",
        answer:
            "Go to the Create Order page, enter your details, select a restaurant and delivery location, then click Find Optimized Route."
    },

    {
        id: 2,
        question: "How does the route optimizer work?",
        answer:
            "SmartRoute represents delivery locations as a weighted graph and uses Dijkstra's Algorithm to calculate the shortest path."
    },

    {
        id: 3,
        question: "What algorithm is used in this project?",
        answer:
            "The project uses Graph Data Structure and Dijkstra's Shortest Path Algorithm."
    },

    {
        id: 4,
        question: "Where can I see my previous orders?",
        answer:
            "You can view all saved orders in the Order History page."
    }

];


const faqContainer =
    document.getElementById("faqContainer");


faqData.forEach(function(faq) {

    const faqBox =
        document.createElement("div");


    faqBox.className = "faq-box";


    faqBox.innerHTML = `

        <h3 onclick="toggleAnswer(${faq.id})">

            ${faq.question}

            <span>+</span>

        </h3>

        <p id="answer-${faq.id}" class="faq-answer">

            ${faq.answer}

        </p>

    `;


    faqContainer.appendChild(faqBox);

});


function toggleAnswer(id) {

    const answer =
        document.getElementById(`answer-${id}`);


    if (
        answer.style.display === "block"
    ) {

        answer.style.display = "none";

    } else {

        answer.style.display = "block";

    }

}