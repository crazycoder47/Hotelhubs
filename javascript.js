document.addEventListener('DOMContentLoaded', () => {
    
    // Search Bar functionality
    const searchBtn = document.getElementById('search-btn');
    const searchBarContainer = document.getElementById('search-bar-container');
    const searchBar = document.getElementById('search-bar');
    
    // Login/Registration form functionality
    const formBtn = document.querySelector('#login-btn');
    const loginForm = document.querySelector('.login-form-container');
    const formClose = document.querySelector('#form-close');
    const loginFormElement = document.querySelector('#login-form');
    const registerFormElement = document.querySelector('#register-form');
    const registerLink = document.querySelector('#register-link');
    const loginLink = document.querySelector('#login-link');
    
    // Menu bar functionality for mobile
    const menu = document.querySelector('#menu-bar');
    const navbar = document.querySelector('.navbar');

    // Hero image slider functionality
    const images = document.querySelectorAll('.hero-images img');
    let currentIndex = 0;

    // Function to change hero images every 3 seconds
    function changeImage() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }

    setInterval(changeImage, 3000); // Change image every 3 seconds

    // Search bar toggle visibility
    searchBtn.addEventListener('click', () => {
        searchBarContainer.classList.toggle('active');
        searchBar.focus(); // Focus the search bar when it appears
    });

    // Search functionality - Log input and simulate a search on Enter key press
    searchBar.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const query = searchBar.value.trim();

            if (query) {
                alert(`Searching for: ${query}`);
                console.log(`Searching for: ${query}`);
            }
        }
    });

    // Toggle the menu bar for mobile view
    menu.addEventListener('click', () => {
        menu.classList.toggle('fa-times');
        navbar.classList.toggle('active');
    });

    // Open login form on clicking login button
    formBtn.addEventListener('click', () => {
        loginForm.classList.add('active');
    });

    // Close login form on clicking close button
    formClose.addEventListener('click', () => {
        loginForm.classList.remove('active');
    });

    // Toggle between login and register forms
    registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginFormElement.style.display = 'none'; 
        registerFormElement.style.display = 'block'; 
    });

    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerFormElement.style.display = 'none'; 
        loginFormElement.style.display = 'block'; 
    });

    // Handle login form submission with simple validation
    loginFormElement.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const emailInput = loginFormElement.querySelector('input[type="email"]').value.trim();
        const passwordInput = loginFormElement.querySelector('input[type="password"]').value.trim();

        if (emailInput && passwordInput) {
            alert('Login successfully'); 
            console.log(`Email: ${emailInput}, Password: ${passwordInput}`); 
            loginFormElement.reset(); 
        } else {
            alert('Please fill in all fields.'); 
        }
    });

    // Close login/register form if clicking outside the form area
    window.addEventListener('click', (event) => {
        if (event.target === loginForm) {
            loginForm.classList.remove('active'); // Close form if clicking outside
        }
    });

    // Availability Form Functionality 
    document.getElementById("availability-form").addEventListener("submit", function (event) {
        event.preventDefault(); 

        // Get input values for availability check
        const checkInDate = new Date(document.getElementById("checkin-date").value);
        const checkOutDate = new Date(document.getElementById("checkout-date").value);
        const adults = parseInt(document.getElementById("adults").value);
        const children = parseInt(document.getElementById("children").value);
        const rooms = parseInt(document.getElementById("rooms").value);

        let message = "";

        // Check if check-in and check-out are valid (24 hours and no more than 10 days)
        const timeDiff = checkOutDate - checkInDate;
        const diffInDays = timeDiff / (1000 * 60 * 60 * 24); // Difference in days

        if (diffInDays < 1) {
            message = "Check-out must be at least 24 hours after check-in.";
            document.getElementById("availability-message").style.color = "red";
        } else if (diffInDays > 10) {
            message = "Rooms cannot be booked for more than 10 days.";
            document.getElementById("availability-message").style.color = "red";
        }
        // Condition: More children than rooms
        else if (children > rooms) {
            message = "Rooms are not available as the number of children exceeds the number of rooms.";
            document.getElementById("availability-message").style.color = "red";
        }
        // Condition: One room allows up to 2 adults and 1 child
        else if ((adults > 2 && rooms === 1) || (adults === 2 && children > 1 && rooms === 1)) {
            message = "Rooms are not available for more than 2 adults or 1 child per room.";
            document.getElementById("availability-message").style.color = "red";
        }
        // Condition: If 1 adult and no child, room is available
        else if (adults === 1 && children === 0) {
            message = `Room is available from ${document.getElementById("checkin-date").value} to ${document.getElementById("checkout-date").value} for 1 adult and no child.`;
            document.getElementById("availability-message").style.color = "green";
        }
        // Condition: Room available for valid group (1 or 2 adults, 0 or 1 child per room)
        else if (adults <= 2 && children <= 1 && rooms >= 1) {
            message = `Rooms are available from ${document.getElementById("checkin-date").value} to ${document.getElementById("checkout-date").value} for ${adults} adults, ${children} children, and ${rooms} room(s).`;
            document.getElementById("availability-message").style.color = "green";
        } else {
            message = "Rooms are not available based on your input.";
            document.getElementById("availability-message").style.color = "red";
        }
        document.getElementById("availability-message").innerText = message;
    });
});



// Booking condition 
const hotelPrices = {
    mumbai: 21000,
    delhi: 6000,
    hawaii: 90,
    paris: 120,
    bangalore: 7600,
    singapore: 100,
    sydney: 100,
    tokyo: 150,
  };

  const hotelSelect = document.getElementById("hotelSelect");
  const roomsSelect = document.getElementById("roomsSelect");
  const totalAmount = document.getElementById("totalAmount");

  function calculateTotal() {
    const selectedHotel = hotelSelect.value;
    const selectedRooms = parseInt(roomsSelect.value);

    if (selectedHotel) {
      const dailyPrice = hotelPrices[selectedHotel];
      const total = dailyPrice * selectedRooms;
      const currency =
        selectedHotel === "mumbai" ||
        selectedHotel === "delhi" ||
        selectedHotel === "bangalore"
          ? `₹${total}` 
          : `$${total.toFixed(2)}`; 

      totalAmount.innerText = currency;
    } else {
      totalAmount.innerText = "₹0";
    }
  }
  document
    .getElementById("calculateTotal")
    .addEventListener("click", calculateTotal);

  document.getElementById("bookNow").addEventListener("click", function () {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const hotel = hotelSelect.value;
    const checkIn = document.getElementById("checkIn").value;
    const checkOut = document.getElementById("checkOut").value;
    const adults = document.getElementById("adultsSelect").value;
    const rooms = roomsSelect.value;

    // Validate required fields
    if (
      !name ||
      !email ||
      !hotel ||
      !checkIn ||
      !checkOut ||
      adults <= 0 ||
      rooms <= 0
    ) {
      alert("Please fill in all required details before booking.");
      return;
    }

    // Store the total amount in session storage
    const total = totalAmount.innerText.replace(/[^\d.-]/g, ""); 
    sessionStorage.setItem("hotelTotalAmount", total); 

    // Redirect to the payment page
    window.location.href = "payment.html"; 
  });
  function scrollToReservation() {
    const reservationSection = document.getElementById('reservation');
    reservationSection.scrollIntoView({ behavior: 'smooth' });
    
}


  //forgot password 
    const forgotPasswordLink = document.getElementById("forgot-password-link");
    const backToLoginLink = document.getElementById("back-to-login");
    const loginForm = document.getElementById("login-form");
    const forgotPasswordForm = document.getElementById("forgot-password-form");
    const successMessage = document.getElementById("success-message");
    
    // Show the forgot password form
    forgotPasswordLink.onclick = function(event) {
        event.preventDefault(); 
        loginForm.style.display = "none"; 
        forgotPasswordForm.style.display = "block"; 
    };
    
    // Go back to the login form
    backToLoginLink.onclick = function(event) {
        event.preventDefault(); 
        forgotPasswordForm.style.display = "none"; 
        loginForm.style.display = "block"; 
        successMessage.style.display = "none"; 
    };
    
    //forgot password 
    document.getElementById("forgot-password-form").onsubmit = function(event) {
        event.preventDefault(); 
        const userInput = document.querySelector("#forgot-password-form .box").value;
        if (userInput) {
            successMessage.style.display = "block"; 
            forgotPasswordForm.style.display = "none"; 
            loginForm.style.display = "block"; 
            document.querySelector("#forgot-password-form .box").value = ""; 
        } else {
            alert("Please enter a valid email or phone number.");
        }
    };
