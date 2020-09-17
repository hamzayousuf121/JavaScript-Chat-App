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
var signinWithFirebase = document.getElementById('signinWithFirebase');


//firebase Auth Login 
signinWithFirebase.addEventListener('submit', (event) => {
    event.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then((user) => {
            console.log(user)
            const userInfo = {
                name: user.displayName,
                email: user.email,
                imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQt-F5GQg8qB2fWquF1ltQvAT2Z8Dv5pJLb9w&usqp=CAU',
                // accessToken: user.credential.accessToken
            }
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
            location.href = 'chat.html';
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorMessage = error.message;
            alert(errorMessage)
        });
});


const SigninWithGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
        prompt: 'select_account'
    });

    firebase.auth().signInWithPopup(provider)
        .then(function (result) {
            // This gives you a Google Access Token.
            // The signed-in user info 
            console.log('user login succesFully', result.user.displayName)
            const userInfo = {
                name: result.user.displayName,
                email: result.user.email,
                imageUrl: result.user.photoURL,
                accessToken: result.credential.accessToken
            }
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
            location.href = 'chat.html';
        })
        .catch((error) => {
            // Handle Errors here.
            var errorMessage = error.message;

            alert(errorMessage)
        });
}

SigninWithFacebook = () => {

    var provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        const userInfo = {
            name: user.displayName,
            email: user.email,
            imageUrl: user.photoURL,
            accessToken: result.credential.accessToken
        }
        console.log(userInfo, 'usersInfo');
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        location.href = 'chat.html';
        // ...
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}

