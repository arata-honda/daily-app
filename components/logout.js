import { firebase } from "../lib/firebase_config"
import { useRouter } from "next/router"
import { getAuth, signOut} from "firebase/auth"
import { Button } from "@mui/material"

export default function Logout() {
  const router = useRouter()
  const auth = getAuth(firebase);
    
  const handleLogout = async () => {
    await signOut(auth)
    await router.push("/")
    console.log('logout!!!')
  }

  return (<>
    <Button onClick={handleLogout}>ログアウト</Button>
  </>);
}
