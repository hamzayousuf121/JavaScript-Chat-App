var firebaseConfig = {
    apiKey: "AIzaSyAXiXXXA75Lqor40jktxg0OIIi-1lZbMxs",
    authDomain: "saylani-chatapp.firebaseapp.com",
    databaseURL: "https://saylani-chatapp.firebaseio.com",
    projectId: "saylani-chatapp",
    storageBucket: "saylani-chatapp.appspot.com",
    messagingSenderId: "8174274245",
    appId: "1:8174274245:web:d11d0de2ca6ea4236b12ac",
    measurementId: "G-J88EVCMN44"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      console.log(user)
      // ...
    } else {
      // User is signed out.
      // ...
    }
  });

var db = firebase.database().ref('messages');

var cardContainer = document.getElementById('mainCard');
var scrollbar = document.getElementsByClassName('msg_card_body');
var username = document.getElementById('username');
var userImg = document.getElementById('userImg');

let userInfo = localStorage.getItem('userInfo')
userInfo = JSON.parse(userInfo)
username.innerHTML = userInfo.name;
var userName = userInfo.name
userImg.src = userInfo.imageUrl;
var imgUrl = userInfo.imageUrl
console.log(imgUrl)

let signOut = () => {

    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        localStorage.removeItem('userInfo')
        location.href = '/login.html';
    }).catch(function (error) {
        // An error happened.
    });
}


// Get Messages
db.on('child_added', function (snapshot) {
    var time = new Date(snapshot.val().timestamp).getFullYear()
   var userCheck = (userName) ? `justify-content-end`: `justify-content-start`;
    var cards = `<div class="d-flex ${userCheck} mb-4">
                    <div class="img_cont_msg">
                    <img src="${imgUrl}" class="rounded-circle user_img_msg">
                    </div>
                    <div class="msg_cotainer">
                    ${snapshot.val().message}
                    <span class="msg_time">${time}</span>
                    </div>
                </div>`;
  cardContainer.innerHTML += cards;
    // auto scroll to bottom;
    scrollbar[0].scrollTop = scrollbar[0].scrollHeight;
})

var SendMsg = document.getElementById('SendMsg');

SendMsg.addEventListener('submit', (e) => {
    e.preventDefault();
    var message = document.getElementById('msg');
    // add Messages 
    db.push({
        message: message.value,
        username: 'hamza',
        timestamp: firebase.database.ServerValue.TIMESTAMP
    })
        .then(function (docRef) {
            console.log("message sent");
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
    message.value = ''

});

