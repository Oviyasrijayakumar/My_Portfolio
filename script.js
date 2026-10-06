/* =========================
NAVBAR ACTIVE STATE
========================= */

const currentPage =
window.location.pathname.split("/").pop() || "index.html";

const navItems =
document.querySelectorAll(".nav-item");

navItems.forEach(function (item) {


const page =
    item.getAttribute("href");

if (page === currentPage) {
    item.classList.add("active");
}


});

/* =========================
RANDOM FACTS
========================= */

const facts = [
"I am a Computer Science Engineering student.",
"I love learning new technologies.",
"I am interested in Web Development.",
"I enjoy programming and problem solving.",
"I am a quick learner.",
"I enjoy exploring new ideas and concepts."
];

const factsContainer =
document.getElementById("factsContainer");

if (factsContainer) {


facts.forEach(function (fact) {

    const div =
        document.createElement("div");

    div.textContent = "✦ " + fact;

    factsContainer.appendChild(div);

});


}

/* =========================
SKILLS
========================= */

const skills = [


{
    skillType: "Technical",
    skill: "HTML"
},

{
    skillType: "Technical",
    skill: "CSS"
},

{
    skillType: "Technical",
    skill: "JavaScript"
},

{
    skillType: "Technical",
    skill: "React"
},

{
    skillType: "Technical",
    skill: "Python"
},

{
    skillType: "Technical",
    skill: "C"
},

{
    skillType: "Technical",
    skill: "Java - Basics"
},

{
    skillType: "Non Technical",
    skill: "Communication"
},

{
    skillType: "Non Technical",
    skill: "Leadership"
},

{
    skillType: "Non Technical",
    skill: "Teamwork"
},

{
    skillType: "Non Technical",
    skill: "Quick Learning"
}


];

/* FILTER */

const technicalSkills =
skills.filter(function (item) {

    return item.skillType === "Technical";

});

const nonTechnicalSkills =
skills.filter(function (item) {


    return item.skillType === "Non Technical";

});


/* DISPLAY TECHNICAL */

const technicalContainer =
document.getElementById("technicalSkills");

if (technicalContainer) {

technicalSkills.forEach(function (item) {

    const p =
        document.createElement("p");

    p.textContent =
        "✓ " + item.skill;

    technicalContainer.appendChild(p);

});

}

/* DISPLAY NON-TECHNICAL */

const nonTechnicalContainer =
document.getElementById("nonTechnicalSkills");

if (nonTechnicalContainer) {

nonTechnicalSkills.forEach(function (item) {

    const p =
        document.createElement("p");

    p.textContent =
        "✓ " + item.skill;

    nonTechnicalContainer.appendChild(p);

});


}

/* =========================
CONTACT FORM + POPUP
========================= */

document.addEventListener(
"DOMContentLoaded",
function () {


    const contactForm =
        document.getElementById("contactForm");

    const popupOverlay =
        document.getElementById("popupOverlay");

    const popupTitle =
        document.getElementById("popupTitle");

    const popupMessage =
        document.getElementById("popupMessage");

    const popupClose =
        document.getElementById("popupClose");


    function showPopup(title, message) {

        if (!popupOverlay) {
            return;
        }

        popupTitle.textContent = title;

        popupMessage.textContent = message;

        popupOverlay.style.display = "flex";

    }


    if (popupClose) {

        popupClose.addEventListener(
            "click",
            function () {

                popupOverlay.style.display = "none";

            }
        );

    }


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document
                        .getElementById("contactName")
                        .value
                        .trim();


                const email =
                    document
                        .getElementById("contactEmail")
                        .value
                        .trim();


                const message =
                    document
                        .getElementById("message")
                        .value
                        .trim();


                if (name === "") {

                    showPopup(
                        "Required!",
                        "Please enter your name."
                    );

                    return;

                }


                if (email === "") {

                    showPopup(
                        "Required!",
                        "Please enter your email."
                    );

                    return;

                }


                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (!emailPattern.test(email)) {

                    showPopup(
                        "Invalid Email!",
                        "Please enter a valid email address."
                    );

                    return;

                }


                if (message === "") {

                    showPopup(
                        "Required!",
                        "Please enter your message."
                    );

                    return;

                }


                showPopup(
                    "Thank You!",
                    "Your message has been submitted successfully."
                );


                contactForm.reset();
            }
        );
    }
}
);
