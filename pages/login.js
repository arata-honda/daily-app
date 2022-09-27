import { useState } from 'react'
import { firebase } from "../lib/firebase_config"
import { useRouter } from "next/router"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { Alert, Button, InputLabel, Snackbar, TextField } from "@mui/material"
import Link from "next/link"

export default function Login() {
  const router = useRouter()
  const auth = getAuth(firebase);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const temp = await signInWithEmailAndPassword(auth, email, password)
    console.log(temp.user.accessToken)
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
        <Button type="submit" variant="outlined">
          ログイン
        </Button>
      </form>
  </>);
  }