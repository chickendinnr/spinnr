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







//////////THIS IS THE CAMERA AND API CALL CODE



const video = document.querySelector('.handsome');
const canvas = document.querySelector('#paint');
const ctx = canvas.getContext('2d');
let spotifyKey = "";


async function go() {
  // first ask for get user media
  const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
  video.srcObject = stream;
}


function takePhoto() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
  const data = canvas.toDataURL('image/png');
  var res = data.replace("data:image/png;base64,", "");
 


 var type = "WEB_DETECTION";
 var json = '{' +
    ' "requests": [' +
    ' { ' +
    '   "image": {' +
    '     "content":"' + res + '"' +
    '   },' +
    '   "features": [' +
    '       {' +
    '         "type": "' + type + '",' +
    '     "maxResults": 1' +
    '       }' +
    '   ]' +
    ' }' +
    ']' +
    '}';

$.ajax({
    type: 'POST',
    url: "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyD1h9v1qDj0EMx6UjLtpFn5t0ZjPGxstSQ",
    dataType: 'json',
    data: json,
    //Include headers, otherwise you get an odd 400 error.
    headers: {
      "Content-Type": "application/json",
    },

    success: function(data, textStatus, jqXHR) {
      var access_token = window.location.href.split('=').join('&').split('&');
      spotifyKey = access_token[1];

      musicInfo = data.responses["0"].webDetection.bestGuessLabels["0"].label;
      $.ajax({
        method: "GET",
        url: "https://api.spotify.com/v1/search?q=" + musicInfo + "&type=album&limit=1",
        headers: {
        Accept: 'application/json',
        Authorization: 'Bearer '+ spotifyKey 
},
          }).done(function(data) {
             window.open(data.albums.items["0"].external_urls.spotify,'_blank');
             console.log(data.albums.items["0"]);




             // var albumURL = document.getElementById('player');
             // albumURL.setAttribute("src", 'https://open.spotify.com/embed?uri='+ data.albums.items["0"].uri);
             // console.log(data.albums.items["0"].uri);

          });

      console.log(musicInfo);

  },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log('ERRORS: ' + textStatus + ' ' + errorThrown);
    }
  });   


    }


function deletePhoto() {
  var can = document.getElementById("paint");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

}

go().catch(err => {
  alert(err.message);
});






