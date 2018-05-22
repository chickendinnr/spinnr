(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top - 48
          },
          1000,
          "easeInOutExpo"
        );
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $(".js-scroll-trigger").click(function() {
    $(".navbar-collapse").collapse("hide");
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $("body").scrollspy({
    target: "#mainNav",
    offset: 54
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);
})(jQuery); // End of use strict

// Listen for form submit

// Initialize Firebase

var config = {
  apiKey: "AIzaSyCxJuTlAg7uaZgViNAO8GtP3691ZYMHUrY",
  authDomain: "contactform-f3f52.firebaseapp.com",
  databaseURL: "https://contactform-f3f52.firebaseio.com",
  projectId: "contactform-f3f52",
  storageBucket: "contactform-f3f52.appspot.com",
  messagingSenderId: "866809098065"
};
firebase.initializeApp(config);

// Reference messages collection
let messagesRef = firebase.database().ref("messages");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  // Get Values
  let email = getInputVal("email");

  // Save message

  saveMessage(email);

  // Show alert
  document.querySelector(".alert").style.display = "block";

  // Reset form
  document.getElementById("contactForm").reset();
}

// Function to get form values

function getInputVal(id) {
  return document.getElementById(id).value;
}

// Save message to firebase

function saveMessage(email) {
  let newMessageRef = messagesRef.push();
  newMessageRef.set({
    email: email
  });
}
