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

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        location.href = 'chat.html'
        // ...
    }
});

var email = document.getElementById('email');
var password = document.getElementById('password');
var RegisterWithFirebase = document.getElementById('RegisterWithFirebase');


//Register

//firebase Auth
RegisterWithFirebase.addEventListener('submit', (event) => {
    event.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then((user) => {
            location.href = 'index.html';
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorMessage = error.message;
            alert(errorMessage)
        });
});
