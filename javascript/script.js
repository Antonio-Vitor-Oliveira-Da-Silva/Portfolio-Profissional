const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav a");

const resetLinks = () => navLinks.forEach(link => link.classList.remove("active"));

const handleScroll = () => {
    const { scrollY } = window;
    sections.forEach(section => {
        const { id, offsetTop, clientHeight } = section;
        const offset = offsetTop - 1;

        if (scrollY >= offset && scrollY < offset + clientHeight) {
            resetLinks();
            navLinks.forEach(link => {
                if (link.dataset.scroll === id) {
                    link.classList.add("active");
                }
            });
        }
    });
}

document.addEventListener("scroll", handleScroll);

//--------------------------------------------------------------------------------

const handleDropdownClicked = (event) => {
    event.stopPropagation();

    const dropdown = document.getElementById("dropdown");

    toggleDropdown(!dropdown.classList.contains("open"));
}

const toggleDropdown = (shouldOpen) => {
    const dropdown = document.getElementById("dropdown");

    const icon = document.getElementById("icon");

    if (shouldOpen) {
        dropdown.classList.add("open");
    } else {
        dropdown.classList.remove("open");
    }

    icon.innerHTML = dropdown.classList.contains("open")
        ? "<i class='fa-solid fa-xmark'></i>" 
        : "<i class='fa-solid fa-angle-down'></i>";
}

document.body.addEventListener("click", () => toggleDropdown());

//----------------------------------mobile----------------------------------------

const handleDropdownClickedMobile = (event) => {
    event.stopPropagation();

    const dropdownMobile = document.getElementById("dropdown-mobile");

    toggleDropdownMobile(!dropdownMobile.classList.contains("open"));
}

const toggleDropdownMobile = (shouldOpen) => {
    const dropdownMobile = document.getElementById("dropdown-mobile");

    const iconMobile = document.getElementById("iconMobile");

    if (shouldOpen) {
        dropdownMobile.classList.add("open");
    } else {
        dropdownMobile.classList.remove("open");
    }

    iconMobile.innerHTML = dropdownMobile.classList.contains("open")
        ? "<i class='fa-solid fa-xmark'></i>" 
        : "<i class='fa-solid fa-angle-down'></i>";
}

document.body.addEventListener("click", () => toggleDropdownMobile());

//--------------------------------------------------------------------------------

const navbar = document.querySelector("#navbar");
const navMobile = document.querySelector("#nav__mobile");
const closeNavMobile = document.querySelector("#nav__mobile");

window.addEventListener('scroll', function () {
    if (this.window.scrollY > 0) return navbar.classList.add('active');
    return navbar.classList.remove('active');
});

function openNav() {
    navMobile.style.width = "100%";
}

function closeNav() {
    closeNavMobile.style.width = "0";
}

//--------------------------------------------------------------------------------

const scrollTopButton = document.getElementById("scroll-top-button");
const onScroll = (event) => {
    const scrollPosition = event.target.scrollingElement.scrollTop;

    scrollTopButton.classList.toggle("visible", scrollPosition > 0);
}

const scrollToTop = () => {
    window.scrollTo( { top: 0, behavior: "smooth"} );
}

document.addEventListener("scroll", onScroll);

//--------------------------------------------------------------------------------

gsap.registerPlugin(ScrollTrigger);

gsap.to("progress", {
    value:100,
    scrollTrigger: { scrub: 0.5 }
});

//--------------------------------------------------------------------------------

const cards = document.querySelectorAll(".card");
const wrapper = document.querySelector(".skills__content");

wrapper.addEventListener("mousemove", (event) => {
    cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        card.style.setProperty("--xPos", `${x}px`);
        card.style.setProperty("--yPos", `${y}px`);
    })
});

//--------------------------------------------------------------------------------

ScrollTrigger.batch("#skills > div > div > div", {
    interval: 0.1,
    batchMax: 12,
    onEnter: (batch) =>
      gsap.to(batch, { autoAlpha: 1, stagger: 0.1, overwrite: true }),
    onLeave: (batch) => gsap.set(batch, { autoAlpha: 0, overwrite: true }),
    onEnterBack: (batch) =>
      gsap.to(batch, { autoAlpha: 1, stagger: 0.1, overwrite: true }),
    onLeaveBack: (batch) => gsap.set(batch, { autoAlpha: 0, overwrite: true }),
  });