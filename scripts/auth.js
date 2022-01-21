import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js";
import {
  getDocs,
  collection,
  addDoc,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js";
import { auth, db } from "./firebase.js";
import { setupGuides, setUpUI } from "./index.js";

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const unsubscribe = onSnapshot(collection(db, "guides"), (docSnapshot) => {
      setupGuides(docSnapshot.docs);
    });
  } else {
    setupGuides([]);
  }
  setUpUI(user);
});

// create a new guide
const createForm = document.querySelector("#create-form");
createForm.addEventListener("submit", (e) => {
  e.preventDefault();

  try {
    addDoc(collection(db, "guides"), {
      title: createForm["title"].value,
      content: createForm["content"].value,
    });

    // close modal and reset form
    const modal = document.querySelector("#modal-create");
    M.Modal.getInstance(modal).close();
    createForm.reset();
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});

// signup
const signUpForm = document.querySelector("#signup-form");

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get user info
  const email = signUpForm["signup-email"].value;
  const password = signUpForm["signup-password"].value;

  console.log(email, password);

  createUserWithEmailAndPassword(auth, email, password).then((cred) => {
    const modal = document.querySelector("#modal-signup");
    M.Modal.getInstance(modal).close();
    signUpForm.reset();
  });
});

const logout = document.querySelector("#logout");

logout.addEventListener("click", (e) => {
  e.preventDefault();

  signOut(auth);
});

const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  signInWithEmailAndPassword(auth, email, password).then((cred) => {
    console.log(cred);
    // close the modal form
    const modal = document.querySelector("#modal-login");
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });
});
