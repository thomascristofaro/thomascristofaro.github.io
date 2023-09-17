importScripts("https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js");

// da mettere in un secret
firebase.initializeApp({
    apiKey: 'AIzaSyDl9DiPFc-vmty0RQmmAGbv1WgE-LEezSY',
    appId: '1:364566136865:web:fd9e630bbe7a4b2118fb60',
    messagingSenderId: '364566136865',
    projectId: 'thesis-client-6a1d7',
    authDomain: 'thesis-client-6a1d7.firebaseapp.com',
    storageBucket: 'thesis-client-6a1d7.appspot.com',
});
// Necessary to receive background messages:
const messaging = firebase.messaging();

// Optional:
messaging.onBackgroundMessage((m) => {
    console.log("onBackgroundMessage", m);
});
