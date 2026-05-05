const services = [

    {
        title: "Classic Cut",
        price: "Rp75K",
        desc: "Potongan clean dan rapi untuk semua gaya rambut."
    },

    {
        title: "Fade Expert",
        price: "Rp120K",
        desc: "Low, mid, hingga skin fade dengan detail presisi."
    },

    {
        title: "Beard Grooming",
        price: "Rp55K",
        desc: "Rapikan jenggot dengan finishing tajam dan fresh."
    }

];

const barbers = [

    {
        name: "Raka",
        style: "Modern Fade Specialist"
    },

    {
        name: "Dion",
        style: "Classic & Pompadour"
    },

    {
        name: "Aji",
        style: "Textured Crop Expert"
    }

];

const servicesContainer =
    document.getElementById("servicesContainer");

services.forEach((service) => {

    servicesContainer.innerHTML += `

        <div class="service-card">

          <div class="service-icon">
            ✂
          </div>

          <h3>
            ${service.title}
          </h3>

          <p>
            ${service.desc}
          </p>

          <div class="service-bottom">

            <span class="price">
              ${service.price}
            </span>

            <button class="choose-btn">
              Choose
            </button>

          </div>

        </div>

      `;
});

const barbersContainer =
    document.getElementById("barbersContainer");

barbers.forEach((barber) => {

    barbersContainer.innerHTML += `

        <div class="barber-card">

          <div class="avatar">
            ${barber.name.charAt(0)}
          </div>

          <h3>
            ${barber.name}
          </h3>

          <p>
            ${barber.style}
          </p>

        </div>

      `;
});

const reviews = [
    {
        name: "Budi Santoso",
        rating: "⭐⭐⭐⭐⭐",
        comment: "Tempat cukur terbaik! Barbenya asik dan potongannya selalu presisi."
    },
    {
        name: "Andi Wijaya",
        rating: "⭐⭐⭐⭐⭐",
        comment: "Vibe neo-brutalismnya dapet banget. Hasil potongan Raka sick parah!"
    },
    {
        name: "Reza Fahlevi",
        rating: "⭐⭐⭐⭐",
        comment: "Mantap, pelayanan memuaskan. Antrian juga ngga terlalu lama."
    }
];

const reviewsContainer = document.getElementById("reviewsContainer");

if (reviewsContainer) {
    reviews.forEach((review) => {
        reviewsContainer.innerHTML += `
            <div class="review-card">
                <div class="review-rating">${review.rating}</div>
                <p class="review-comment">"${review.comment}"</p>
                <h4 class="review-name">- ${review.name}</h4>
            </div>
        `;
    });

    let scrollAmount = 1;
    let autoScroll = setInterval(scrollReviews, 20);

    function scrollReviews() {
        reviewsContainer.scrollLeft += scrollAmount;
        if (reviewsContainer.scrollLeft >= (reviewsContainer.scrollWidth - reviewsContainer.clientWidth - 1)) {
            scrollAmount = -1;
        } else if (reviewsContainer.scrollLeft <= 0) {
            scrollAmount = 1;
        }
    }

    reviewsContainer.addEventListener("mouseenter", () => clearInterval(autoScroll));
    reviewsContainer.addEventListener("mouseleave", () => {
        autoScroll = setInterval(scrollReviews, 20);
    });
    
    reviewsContainer.addEventListener("touchstart", () => clearInterval(autoScroll));
    reviewsContainer.addEventListener("touchend", () => {
        autoScroll = setInterval(scrollReviews, 20);
    });
}

function submitReview(event) {
    event.preventDefault();
    
    const name = document.getElementById("reviewerName").value;
    const rating = document.getElementById("reviewerRating").value;
    const comment = document.getElementById("reviewerComment").value;
    
    const newReview = {
        name: name,
        rating: rating,
        comment: comment
    };
    
    reviews.push(newReview);
    
    const reviewsContainer = document.getElementById("reviewsContainer");
    if (reviewsContainer) {
        reviewsContainer.innerHTML += `
            <div class="review-card">
                <div class="review-rating">${rating}</div>
                <p class="review-comment">"${comment}"</p>
                <h4 class="review-name">- ${name}</h4>
            </div>
        `;
    }
    
    document.getElementById("reviewForm").reset();
    alert("Mantap! Terima kasih atas ulasannya!");
}

// =========================
// AUTHENTICATION LOGIC
// =========================

document.addEventListener("DOMContentLoaded", () => {
    checkAuthStatus();
});

function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const loginBtn = document.getElementById("navLoginBtn");
    const accountDropdown = document.getElementById("navAccountDropdown");
    const accountNameBtn = document.getElementById("accountNameBtn");
    
    if (loginBtn && accountDropdown) {
        if (isLoggedIn) {
            loginBtn.style.display = "none";
            accountDropdown.style.display = "inline-block";
            
            const userName = localStorage.getItem("userName");
            if (userName && accountNameBtn) {
                accountNameBtn.innerText = userName.split(' ')[0] + " ▼";
            }
        } else {
            loginBtn.style.display = "inline-block";
            accountDropdown.style.display = "none";
        }
    }
}

function loginDummy(name, email, phone) {
    localStorage.setItem("isLoggedIn", "true");
    if (name) localStorage.setItem("userName", name);
    if (email) localStorage.setItem("userEmail", email);
    if (phone) localStorage.setItem("userPhone", phone);
    window.location.href = "index.html";
}

function logoutDummy() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPhone");
    window.location.href = "index.html";
}