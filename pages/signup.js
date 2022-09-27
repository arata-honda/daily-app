import { useState } from 'react'
import { firebase } from "../lib/firebase_config"
import { useRouter } from "next/router"
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { Button, InputLabel, TextField, Alert, Snackbar } from "@mui/material"
import Link from "next/link"

export default function SignUp() {
  const router = useRouter()
  const auth = getAuth(firebase);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isError = !!error
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      // Signed in
      setUser(userCredential.user);
      // ...
      router.push("/")
    })
    .catch((error) => {
      const errorCode = error.code;
      // FIXME: AuthErrorのハンドリングもっと上手くやる
      if(errorCode == 'auth/email-already-in-use') {
        setError(errorCode);
      }
    });
  }
  const handleChangeEmail = (e) => {
    setEmail(e.currentTarget.value)
  }
  const handleChangePassword = (e) => {
    setPassword(e.currentTarget.value)
  }
  return (<>

    <h1>signUp</h1>
    <Snackbar
     open={isError}
     anchorOrigin={{ vertical: "top", horizontal: "center" }}
     autoHideDuration={3000}
     key={"top" + "center"}
    >
      <Alert severity="warning">既に登録されてます</Alert>
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
        <Button type="submit" variant="outlined">
          登録
        </Button>
      </form>
      <Link href={"/login"}>
      <a>すでに登録している人はこちら</a>
      </Link>
  </>);
}