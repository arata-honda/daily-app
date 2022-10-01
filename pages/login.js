import { useState, useEffect } from 'react'
import { firebase } from "../lib/firebase_config"
import { useRouter } from "next/router"
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { Alert, Button, InputLabel, Snackbar, TextField } from "@mui/material"
import Link from "next/link"

export default function Login() {
  const router = useRouter();
  const auth = getAuth(firebase);
  const [isLoggin, setIsLoggin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isFilledForm = (email !== "" && password !== "")
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setIsLoggin(true);
      } else {
        setIsLoggin(false);
      }
    });
  });
  const handleSubmit = async (e) => {
    e.preventDefault()
    await signInWithEmailAndPassword(auth, email, password)
    router.push("/")
  }
  const handleChangeEmail = (e) => {
    setEmail(e.currentTarget.value)
  }
  const handleChangePassword = (e) => {
    setPassword(e.currentTarget.value)
  }
  return (<>

    <h1>ログイン</h1>
    <Snackbar
     open={isLoggin}
     anchorOrigin={{ vertical: "top", horizontal: "center" }}
     autoHideDuration={3000}
     key={"top" + "center"}
    >
      <Alert severity="warning">既にログインしてます</Alert>
    </Snackbar>
    <form onSubmit={handleSubmit}>
      <InputLabel>メールアドレス</InputLabel>
        <TextField
          name="email"
          type="email"
          size="small"
          onChange={handleChangeEmail}
        />
        <InputLabel>パスワード</InputLabel>
        <TextField
          name="password"
          type="password"
          size="small"
          onChange={handleChangePassword}
        />
        <Button disabled={!isFilledForm} type="submit" variant="outlined">
          ログイン
        </Button>
      </form>
  </>);
  }