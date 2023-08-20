import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import {useAuthState, useSignInWithGoogle} from "react-firebase-hooks/auth";
import {useCollectionData} from "react-firebase-hooks/firestore";

firebase.initializeApp({
    apiKey: "AIzaSyCusggwHVQDQlSOJnKjgJeAZjdvRxhLUNo",
    authDomain: "fir-chat-516bd.firebaseapp.com",
    projectId: "fir-chat-516bd",
    storageBucket: "fir-chat-516bd.appspot.com",
    messagingSenderId: "1062949426657",
    appId: "1:1062949426657:web:6347edbfe9c940dbca6ea0",
    measurementId: "G-S1F2B4R6HF"
})

// Initialize Firebase

const auth = firebase.auth();
const firestore = firebase.firestore();
function App() {
  const [user] = useAuthState(auth)
  return (
    <div className="App">
      <header className="App-header">

      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn(){
  const useSignInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return(
      <button onClick={useSignInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut(){
  return auth.currentUser && (

      <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom(){
  const messageRef = firestore.collection('messages');
  const query = messageRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  return(
      <>
        <div>
          {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
        </div>
        <div>

        </div>
      </>
  )
}

function ChatMessage(props){
  const {text, uid}= props.message;
  return <p>{text}</p>
}

export default App;
