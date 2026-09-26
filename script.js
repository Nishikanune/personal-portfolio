// =====================================
// NISHIKA'S DARK VINTAGE PORTFOLIO
// =====================================


// =====================================
// 1. GET IMPORTANT ELEMENTS
// =====================================

const welcomeScreen =
    document.getElementById("welcome-screen");

const enterButton =
    document.getElementById("enter-site");

const skipButton =
    document.getElementById("skip-intro");

const mainPortfolio =
    document.getElementById("main-portfolio");

const homeLogo =
    document.getElementById("home-logo");

let introFinished = false;


// =====================================
// 2. OPEN PORTFOLIO
// =====================================

function enterPortfolio() {

    if (introFinished) return;

    introFinished = true;

    welcomeScreen.classList.add("opening");

    setTimeout(function () {

        welcomeScreen.classList.add("hidden");

        mainPortfolio.setAttribute(
            "aria-hidden",
            "false"
        );

        showVisibleSections();

    }, 1800);
}


// ENTER PORTFOLIO BUTTON

if (enterButton) {

    enterButton.addEventListener(
        "click",
        enterPortfolio
    );
}


// SKIP INTRO BUTTON

if (skipButton) {

    skipButton.addEventListener(
        "click",
        enterPortfolio
    );
}


// =====================================
// 3. RETURN TO DOOR INTRO
// =====================================

function returnToDoor() {

    introFinished = false;

    mainPortfolio.setAttribute(
        "aria-hidden",
        "true"
    );

    welcomeScreen.classList.remove(
        "hidden",
        "opening"
    );

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


if (homeLogo) {

    homeLogo.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            returnToDoor();

        }
    );
}


// =====================================
// 4. SCROLL REVEAL
// =====================================

const revealElements =
    document.querySelectorAll(".reveal");


function showVisibleSections() {

    revealElements.forEach(function (element) {

        const position =
            element.getBoundingClientRect();

        if (
            position.top <
            window.innerHeight - 60
        ) {

            element.classList.add(
                "visible"
            );
        }

    });
}


const revealObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.15
        }

    );


revealElements.forEach(function (element) {

    revealObserver.observe(element);

});


// =====================================
// 5. MOBILE NAVBAR AUTO-CLOSE
// =====================================

const navLinks =
    document.querySelectorAll(
        ".navbar-nav .nav-link"
    );

const navMenu =
    document.getElementById("navMenu");


navLinks.forEach(function (link) {

    link.addEventListener(
        "click",
        function () {

            if (
                navMenu &&
                navMenu.classList.contains("show")
            ) {

                const collapse =
                    bootstrap.Collapse.getOrCreateInstance(
                        navMenu
                    );

                collapse.hide();
            }

        }
    );

});


// =====================================
// 6. CONTACT FORM VALIDATION
// =====================================

const contactForm =
    document.getElementById("contact-form");

const successMessage =
    document.getElementById("form-success");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "visitor-name"
                );

            const email =
                document.getElementById(
                    "visitor-email"
                );

            const message =
                document.getElementById(
                    "visitor-message"
                );


            const fields = [
                name,
                email,
                message
            ];


            // CLEAR OLD ERRORS

            fields.forEach(function (field) {

                field.classList.remove(
                    "invalid"
                );


                const error =
                    field.parentElement.querySelector(
                        ".error-message"
                    );


                if (error) {

                    error.textContent = "";

                }

            });


            successMessage.textContent = "";


            let isValid = true;


            // =================================
            // NAME VALIDATION
            // =================================

            if (
                name.value.trim() === ""
            ) {

                showError(
                    name,
                    "Please enter your name."
                );

                isValid = false;

            }


            // =================================
            // EMAIL VALIDATION
            // =================================

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                email.value.trim() === ""
            ) {

                showError(
                    email,
                    "Please enter your email address."
                );

                isValid = false;

            }

            else if (
                !emailPattern.test(
                    email.value.trim()
                )
            ) {

                showError(
                    email,
                    "Please enter a valid email address."
                );

                isValid = false;

            }


            // =================================
            // MESSAGE VALIDATION
            // =================================

            if (
                message.value.trim().length < 10
            ) {

                showError(
                    message,
                    "Please write at least 10 characters."
                );

                isValid = false;

            }


            // =================================
            // SUCCESS
            // =================================

            if (isValid) {

                successMessage.textContent =
                    "Your message is ready! This demo form does not send emails yet.";

                contactForm.reset();

            }

        }
    );

}


// =====================================
// 7. DISPLAY ERROR
// =====================================

function showError(field, text) {

    field.classList.add("invalid");


    const error =
        field.parentElement.querySelector(
            ".error-message"
        );


    if (error) {

        error.textContent = text;

    }

}


// =====================================
// 8. REMOVE ERROR WHILE TYPING
// =====================================

document
    .querySelectorAll(
        "#contact-form input, #contact-form textarea"
    )
    .forEach(function (field) {

        field.addEventListener(
            "input",
            function () {

                field.classList.remove(
                    "invalid"
                );


                const error =
                    field.parentElement.querySelector(
                        ".error-message"
                    );


                if (error) {

                    error.textContent = "";

                }

            }
        );

    });


// =====================================
// 9. SMOOTH SECTION NAVIGATION
// =====================================

document
    .querySelectorAll('a[href^="#"]')
    .forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");


                if (
                    targetId &&
                    targetId !== "#"
                ) {

                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (target) {

                        event.preventDefault();


                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }

            }
        );

    });