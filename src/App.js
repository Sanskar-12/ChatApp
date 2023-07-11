import {
  Box,
  Button,
  Container,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import Message from "./Components/Message";
import {onAuthStateChanged,GoogleAuthProvider,signInWithPopup,getAuth,signOut} from "firebase/auth"
import { app } from "./firebase";
import { addDoc, collection, getFirestore, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore"
import { useEffect, useRef, useState } from "react";


const auth=getAuth(app)
const db=getFirestore(app)

const loginHandler=()=>{
  const provider=new GoogleAuthProvider()
  signInWithPopup(auth,provider)
}

const logoutHandler=()=>{
  signOut(auth)
}


function App() {
  const q=query(collection(db,"Messages"),orderBy("createdAt","asc"))
  const [user,setUser]=useState(false)
  const [message,setMessage]=useState("")
  const [messages,setMessages]=useState([])
  const divforScroll=useRef(null)
  
  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth,(data)=>{
      setUser(data)
    })

    const unsubscribeforMessages=onSnapshot(q,(snap)=>{
     setMessages(snap.docs.map((item)=>{
      const id=item.id
      const data=item.data()
      return {id,...data}
     }))
    })

    return ()=>{
      unsubscribe()
      unsubscribeforMessages()
    }
  },[])


  const submitHandler=async(e)=>{
    e.preventDefault()

    setMessage("")
    try {
      await addDoc(collection(db,"Messages"),{
        text:message,
        uid:user.uid,
        uri:user.photoURL,
        createdAt:serverTimestamp()
      })
      divforScroll.current.scrollIntoView({behavior:"smooth"})
    } catch (error) {
      alert(error)
    }


  }
  return (
    <Box bg={"red.50"}>
     {
      user ? ( <Container h={"100vh"} bg={"white"}>
      <VStack h={"full"} padding={"4"}>
        <Button onClick={logoutHandler} colorScheme={"red"} w={"full"}>
          Logout
        </Button>
        <VStack h={"full"} w={"full"} overflowY={"auto"}>
         {
          messages.map((item)=>(
            <Message key={item.id} text={item.text} uri={item.uri} user={item.uid===user.uid ? "me" : "other"} />
          ))
         }
         <div ref={divforScroll}>
          
         </div>
        </VStack>
        <form onSubmit={submitHandler} style={{ width: "80%" }}>
          <HStack>
            <Input
              placeholder="Enter Message..."
              color={"black"}
              borderColor={"black"}
              value={message}
              onChange={(e)=>setMessage(e.target.value)}
            />
            <Button colorScheme={"green"} type="submit">
              Send
            </Button>
          </HStack>
        </form>
      </VStack>
    </Container>):(
      <VStack justifyContent={"center"} h={"100vh"}>
        <Button colorScheme="purple" onClick={loginHandler}>
          Sign In 
        </Button>
      </VStack>
    )
     }
    </Box>
  );
}

export default App;
