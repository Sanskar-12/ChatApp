import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB-BBom0TAspR7m_LCU_aAYbe6wAClIPRg",
  authDomain: "chatapp-sanskarprogrammer.firebaseapp.com",
  projectId: "chatapp-sanskarprogrammer",
  storageBucket: "chatapp-sanskarprogrammer.appspot.com",
  messagingSenderId: "149919371540",
  appId: "1:149919371540:web:bd6ff27db06b351f853201",
  measurementId: "G-TFTBY5KBX3"
};

export const app = initializeApp(firebaseConfig);