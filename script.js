/* =========================================================
   THEYYAM TRAILS
   INTERACTIONS
========================================================= */


document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       PRELOADER
    ===================================================== */

    const preloader =
        document.getElementById("preloader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            preloader.classList.add("hide");

        }, 700);

    });


    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    const header =
        document.getElementById("siteHeader");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const mainNav =
        document.getElementById("mainNav");

    menuToggle.addEventListener("click", () => {

        mainNav.classList.toggle("active");

    });


    document
        .querySelectorAll(".main-nav a")
        .forEach(link => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("active");

            });

        });


    /* =====================================================
       HERO SLIDER
    ===================================================== */

    const heroSlides =
        document.querySelectorAll(".hero-slide");

    let heroIndex = 0;

    function nextHeroSlide() {

        heroSlides[heroIndex]
            .classList.remove("active");

        heroIndex++;

        if (heroIndex >= heroSlides.length) {
            heroIndex = 0;
        }

        heroSlides[heroIndex]
            .classList.add("active");

    }

    setInterval(nextHeroSlide, 6000);


    /* =====================================================
       STAT COUNTERS
    ===================================================== */

    const counters =
        document.querySelectorAll(".counter");

    let countersStarted = false;

    function startCounters() {

        if (countersStarted) {
            return;
        }

        countersStarted = true;

        counters.forEach(counter => {

            const target =
                Number(counter.dataset.target);

            let current = 0;

            const increment =
                Math.max(
                    1,
                    Math.ceil(target / 80)
                );

            function updateCounter() {

                current += increment;

                if (current >= target) {

                    current = target;

                    counter.textContent =
                        current.toLocaleString();

                    return;
                }

                counter.textContent =
                    current.toLocaleString();

                requestAnimationFrame(
                    updateCounter
                );

            }

            updateCounter();

        });

    }


    const statsSection =
        document.querySelector(".stats-section");

    const statsObserver =
        new IntersectionObserver(
            entries => {

                if (entries[0].isIntersecting) {

                    startCounters();

                }

            },
            {
                threshold: 0.3
            }
        );

    statsObserver.observe(statsSection);


    /* =====================================================
       STORY MODAL
    ===================================================== */

    const storyModal =
        document.getElementById("storyModal");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalText =
        document.getElementById("modalText");

    const modalClose =
        document.getElementById("modalClose");


    document
        .querySelectorAll(".story-button")
        .forEach(button => {

            button.addEventListener("click", () => {

                modalTitle.textContent =
                    button.dataset.title;

                modalText.textContent =
                    button.dataset.text;

                storyModal.classList.add("active");

                document.body.style.overflow =
                    "hidden";

            });

        });


    function closeStoryModal() {

        storyModal.classList.remove("active");

        document.body.style.overflow = "";

    }


    modalClose.addEventListener(
        "click",
        closeStoryModal
    );


    storyModal.addEventListener(
        "click",
        event => {

            if (event.target === storyModal) {

                closeStoryModal();

            }

        }
    );


    /* =====================================================
       THEYYAM EVENT DATA
       
       Replace these sample dates with your
       verified performance schedule.
    ===================================================== */

    const events = [

        {
            date: "2026-11-07",
            title: "Traditional Theyyam Evening",
            region: "Kannur",
            type: "Evening",
            time: "6:00 PM onwards",
            place: "North Malabar",
            slots: 12
        },

        {
            date: "2026-11-14",
            title: "Malabar Immersion",
            region: "Kannur",
            type: "Immersion",
            time: "5:30 PM onwards",
            place: "Kannur Region",
            slots: 8
        },

        {
            date: "2026-11-21",
            title: "Theyyam & Stories",
            region: "Kasaragod",
            type: "Stories",
            time: "5:00 PM onwards",
            place: "Kasaragod Region",
            slots: 10
        },

        {
            date: "2026-11-28",
            title: "Traditional Theyyam Evening",
            region: "Kasaragod",
            type: "Evening",
            time: "6:00 PM onwards",
            place: "North Malabar",
            slots: 15
        },

        {
            date: "2026-12-05",
            title: "Malabar Immersion",
            region: "Wayanad",
            type: "Immersion",
            time: "4:30 PM onwards",
            place: "Wayanad",
            slots: 7
        },

        {
            date: "2026-12-12",
            title: "Theyyam & Stories",
            region: "Kannur",
            type: "Stories",
            time: "5:30 PM onwards",
            place: "Kannur",
            slots: 10
        }

    ];


    /* =====================================================
       EVENT RENDER
    ===================================================== */

    const eventsList =
        document.getElementById("eventsList");

    const regionFilter =
        document.getElementById("regionFilter");

    const typeFilter =
        document.getElementById("typeFilter");

    const clearFilters =
        document.getElementById("clearFilters");


    function formatDate(dateString) {

        const date =
            new Date(dateString + "T00:00:00");

        const day =
            date.getDate();

        const month =
            date.toLocaleString(
                "en-US",
                { month: "short" }
            );

        const weekday =
            date.toLocaleString(
                "en-US",
                { weekday: "short" }
            );

        return {
            day,
            month,
            weekday
        };

    }


    function renderEvents() {

        const region =
            regionFilter.value;

        const type =
            typeFilter.value;


        const filtered =
            events.filter(event => {

                const regionMatch =
                    region === "all" ||
                    event.region === region;

                const typeMatch =
                    type === "all" ||
                    event.type === type;

                return regionMatch && typeMatch;

            });


        eventsList.innerHTML = "";


        if (filtered.length === 0) {

            eventsList.innerHTML = `

                <div class="no-events">

                    <p>
                        No journeys found for the
                        selected filters.
                    </p>

                </div>

            `;

            return;

        }


        filtered.forEach(event => {

            const date =
                formatDate(event.date);


            const card =
                document.createElement("article");

            card.className =
                "event-card";


            card.innerHTML = `

                <div class="event-date">

                    <strong>
                        ${date.day}
                    </strong>

                    <span>
                        ${date.month}
                        ·
                        ${date.weekday}
                    </span>

                </div>


                <div class="event-info">

                    <h3>
                        ${event.title}
                    </h3>

                    <p>
                        ${event.place}
                    </p>

                </div>


                <div class="event-meta">

                    <div>
                        ${event.time}
                    </div>

                    <div>
                        ${event.slots}
                        places available
                    </div>

                </div>


                <button class="event-button"
                        data-date="${event.date}"
                        data-package="${event.title}">

                    Request Slot

                </button>

            `;


            eventsList.appendChild(card);

        });


        document
            .querySelectorAll(".event-button")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const date =
                            button.dataset.date;

                        const packageName =
                            button.dataset.package;

                        document
                            .getElementById(
                                "bookingDate"
                            )
                            .value = date;

                        document
                            .getElementById(
                                "packageSelect"
                            )
                            .value =
                                packageName.includes(
                                    "Evening"
                                )
                                ? "Theyyam Evening"
                                :
                                packageName.includes(
                                    "Immersion"
                                )
                                ? "Malabar Immersion"
                                :
                                "Theyyam & Stories";


                        document
                            .getElementById(
                                "reserve"
                            )
                            .scrollIntoView({
                                behavior: "smooth"
                            });

                    }
                );

            });

    }


    regionFilter.addEventListener(
        "change",
        renderEvents
    );

    typeFilter.addEventListener(
        "change",
        renderEvents
    );


    clearFilters.addEventListener(
        "click",
        () => {

            regionFilter.value = "all";

            typeFilter.value = "all";

            renderEvents();

        }
    );


    renderEvents();


    /* =====================================================
       PACKAGE BUTTONS
    ===================================================== */

    document
        .querySelectorAll("[data-package]")
        .forEach(button => {

            if (
                !button.classList.contains(
                    "event-button"
                )
            ) {

                button.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();

                        const packageName =
                            button.dataset.package;

                        const select =
                            document.getElementById(
                                "packageSelect"
                            );

                        select.value =
                            packageName;

                    }
                );

            }

        });


    /* =====================================================
       TESTIMONIAL SLIDER
    ===================================================== */

    const testimonials =
        document.querySelectorAll(
            ".testimonial"
        );

    let testimonialIndex = 0;


    function showTestimonial(index) {

        testimonials.forEach(
            testimonial =>
                testimonial.classList.remove(
                    "active"
                )
        );

        testimonials[index]
            .classList.add("active");

    }


    document
        .getElementById("nextTestimonial")
        .addEventListener("click", () => {

            testimonialIndex++;

            if (
                testimonialIndex >=
                testimonials.length
            ) {

                testimonialIndex = 0;

            }

            showTestimonial(
                testimonialIndex
            );

        });


    document
        .getElementById("prevTestimonial")
        .addEventListener("click", () => {

            testimonialIndex--;

            if (testimonialIndex < 0) {

                testimonialIndex =
                    testimonials.length - 1;

            }

            showTestimonial(
                testimonialIndex
            );

        });


    /* =====================================================
       BOOKING FORM
    ===================================================== */

    const bookingForm =
        document.getElementById(
            "bookingForm"
        );

    const successModal =
        document.getElementById(
            "successModal"
        );

    const successClose =
        document.getElementById(
            "successClose"
        );


    bookingForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document.getElementById(
                    "guestName"
                ).value.trim();

            const phone =
                document.getElementById(
                    "guestPhone"
                ).value.trim();

            const date =
                document.getElementById(
                    "bookingDate"
                ).value;

            const guests =
                document.getElementById(
                    "guestCount"
                ).value;

            const packageName =
                document.getElementById(
                    "packageSelect"
                ).value;


            if (!name ||
                !phone ||
                !date ||
                !packageName) {

                alert(
                    "Please complete all required fields."
                );

                return;

            }


            /*
             * At this stage this is a front-end
             * booking request.
             *
             * Later you can connect this form
             * to PHP / Python / Node.js / database
             * / WhatsApp / email.
             */


            console.log({

                name,
                phone,
                date,
                guests,
                packageName

            });


            successModal.classList.add(
                "active"
            );

            document.body.style.overflow =
                "hidden";


            bookingForm.reset();

        }
    );


    successClose.addEventListener(
        "click",
        () => {

            successModal.classList.remove(
                "active"
            );

            document.body.style.overflow =
                "";

        }
    );


    /* =====================================================
       ESCAPE MODALS
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                storyModal.classList.remove(
                    "active"
                );

                successModal.classList.remove(
                    "active"
                );

                document.body.style.overflow =
                    "";

            }

        }
    );


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".form-card, .experience-card, .team-card, .story-card"
        );


    revealElements.forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(30px)";

        element.style.transition =
            "opacity .7s ease, transform .7s ease";

    });


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: .12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


});