// Initialize Firebase

var config = {
  apiKey: "AIzaSyCOhqovHOeRVuCwdZaXk6rV5zFKQoooAXc",
  authDomain: "mailinglist-b4c1e.firebaseapp.com",
  databaseURL: "https://mailinglist-b4c1e.firebaseio.com",
  projectId: "mailinglist-b4c1e",
  storageBucket: "",
  messagingSenderId: "533131973511"
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

const video = document.querySelector(".handsome");
const canvas = document.querySelector("#paint");
const ctx = canvas.getContext("2d");
let spotifyKey = "";

async function go() {
  // first ask for get user media

  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: "environment" }
  });
  video.srcObject = stream;
}

function takePhoto() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
  const data = canvas.toDataURL("image/png");
  var res = data.replace("data:image/png;base64,", "");

  var type = "WEB_DETECTION";
  var json =
    "{" +
    ' "requests": [' +
    " { " +
    '   "image": {' +
    '     "content":"' +
    res +
    '"' +
    "   }," +
    '   "features": [' +
    "       {" +
    '         "type": "' +
    type +
    '",' +
    '     "maxResults": 1' +
    "       }" +
    "   ]" +
    " }" +
    "]" +
    "}";

  $.ajax({
    type: "POST",
    url:
      "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyD1h9v1qDj0EMx6UjLtpFn5t0ZjPGxstSQ",
    dataType: "json",
    data: json,
    //Include headers, otherwise you get an odd 400 error.
    headers: {
      "Content-Type": "application/json"
    },

    success: function(data, textStatus, jqXHR) {
      var access_token = window.location.href
        .split("=")
        .join("&")
        .split("&");
      spotifyKey = access_token[1];

      musicInfo = data.responses["0"].webDetection.bestGuessLabels["0"].label;
      $.ajax({
        method: "GET",
        url:
          "https://api.spotify.com/v1/search?q=" +
          musicInfo +
          "&type=album&limit=1",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + spotifyKey
        }
      }).done(function(data) {
        window.open(data.albums.items["0"].external_urls.spotify, "_blank");
        console.log(data.albums.items["0"]);

        // var albumURL = document.getElementById('player');
        // albumURL.setAttribute("src", 'https://open.spotify.com/embed?uri='+ data.albums.items["0"].uri);
        // console.log(data.albums.items["0"].uri);
      });

      console.log(musicInfo);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("ERRORS: " + textStatus + " " + errorThrown);
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
