// Select and cache the main, top-menu, and sub-menu elements
let mainEl = document.querySelector("main");
let topMenuEl = document.getElementById("top-menu");
let subMenuEl = document.getElementById("sub-menu");

// Set styles for mainEl
mainEl.style.setProperty("background-color", "var(--main-bg)");
mainEl.innerHTML = "<h1>DOM Manipulation</h1>";
mainEl.classList.add("flex-ctr");

// Set styles for topMenuEl
topMenuEl.style.setProperty("height", "100%");
topMenuEl.style.setProperty("background-color", "var(--top-menu-bg)");
topMenuEl.classList.add("flex-around");

// Set styles for subMenuEl
subMenuEl.style.setProperty("height", "100%");
subMenuEl.style.setProperty("background-color", "var(--sub-menu-bg)");
subMenuEl.style.setProperty("position", "absolute");
subMenuEl.style.setProperty("top", "0");
subMenuEl.classList.add("flex-around");

// Updated menuLinks array with submenus
var menuLinks = [
  { text: "about", href: "/about" },
  {
    text: "catalog",
    href: "#",
    subLinks: [
      { text: "all", href: "/catalog/all" },
      { text: "top selling", href: "/catalog/top" },
      { text: "search", href: "/catalog/search" },
    ],
  },
  {
    text: "orders",
    href: "#",
    subLinks: [
      { text: "new", href: "/orders/new" },
      { text: "pending", href: "/orders/pending" },
      { text: "history", href: "/orders/history" },
    ],
  },
  {
    text: "account",
    href: "#",
    subLinks: [
      { text: "profile", href: "/account/profile" },
      { text: "sign out", href: "/account/signout" },
    ],
  },
];

// Populate the top menu with links
for (let i = 0; i < menuLinks.length; i++) {
  let a = document.createElement("a");
  a.setAttribute("href", menuLinks[i].href);
  a.textContent = menuLinks[i].text;
  topMenuEl.appendChild(a);
}

// Select all <a> elements inside topMenuEl
let topMenuLinks = topMenuEl.querySelectorAll("a");

// Event listener for top menu interactions
topMenuEl.addEventListener("click", function (event) {
  event.preventDefault();
  let clickedLink = event.target;

  // Ensure the clicked element is an <a>
  if (clickedLink.tagName !== "A") return;

  // Log the clicked link text
  console.log(clickedLink.textContent);

  // Toggle active class
  if (clickedLink.classList.contains("active")) {
    clickedLink.classList.remove("active");
    subMenuEl.style.setProperty("top", "0");
    return;
  }

  // Remove active class from all menu links
  topMenuLinks.forEach((link) => link.classList.remove("active"));

  // Add active class to clicked link
  clickedLink.classList.add("active");

  // Find the clicked menu item in menuLinks array
  let linkObj = menuLinks.find((link) => link.text === clickedLink.textContent);

  // Handle submenu visibility
  if (linkObj && linkObj.subLinks) {
    subMenuEl.style.setProperty("top", "100%");
    buildSubmenu(linkObj.subLinks);
  } else {
    subMenuEl.style.setProperty("top", "0");
  }
});

// Helper function to build submenu dynamically
function buildSubmenu(subLinks) {
  subMenuEl.innerHTML = ""; // Clear current submenu
  subLinks.forEach((subLink) => {
    let subA = document.createElement("a");
    subA.setAttribute("href", subLink.href);
    subA.textContent = subLink.text;
    subMenuEl.appendChild(subA);
  });
}

// Event listener for submenu interactions
subMenuEl.addEventListener("click", function (event) {
  event.preventDefault();
  let clickedSubLink = event.target;

  // Ensure the clicked element is an <a>
  if (clickedSubLink.tagName !== "A") return;

  // Log the clicked submenu link text
  console.log(clickedSubLink.textContent);

  // Hide the submenu after a selection is made
  subMenuEl.style.setProperty("top", "0");

  // Remove active class from all top menu links
  topMenuLinks.forEach((link) => link.classList.remove("active"));

  // Update the main content area with the clicked submenu item
  mainEl.innerHTML = `<h1>${clickedSubLink.textContent}</h1>`;
});

