const openNav = document.querySelector(".hamburger");
const closeNav = document.querySelector(".nav__close");
const nav = document.querySelector(".nav__list");

openNav.addEventListener("click", () => {
  const navLeft = nav.getBoundingClientRect().left;
  if (navLeft < 0) {
    nav.style.left = "0";
    document.body.classList.add("active");
  }
});

closeNav.addEventListener("click", () => {
  const navLeft = nav.getBoundingClientRect().left;
  if (navLeft === 0) {
    nav.style.left = "-40rem";
    document.body.classList.remove("active");
  }
});

// Smooth Scroll
const scrollLinks = [...document.querySelectorAll(".scroll-link")];

scrollLinks.forEach(link => {
  link.addEventListener("click", e => {
    const id = e.target.getAttribute("href").slice(1);
    const element = document.getElementById(id);
    const position = element.offsetTop;

    window.scrollTo({
      left: 0,
      top: position,
    });
    nav.style.left = "-40rem";
    document.body.classList.remove("active");
  });
});

// Buy Item
const buy = (amountToPurchase) => {
    const itemRef = firebase.database().ref();
    var updates = {};
    itemRef.once('value', (snapshot) => {
        const data = snapshot.val();
        for (let key in data) {
            if (data[key].product === "shirt") {
                if (data[key].quantity - amountToPurchase >= 0) {
                    updates['quantity'] = data[key].quantity - amountToPurchase;
                    firebase.database().ref().child(key).update(updates);
                } else {
                    return
                }
            }
        }
    })
}