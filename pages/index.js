import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { firebase } from "../lib/firebase_config"
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Logout from '../components/logout'
import { getAuth, onAuthStateChanged } from "firebase/auth"
export default function Home() {
  const auth = getAuth(firebase);
  const [isLoggin, setIsLoggin] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggin(true);
      } else {
        setIsLoggin(false);
      }
    });
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          ログインは<Link href="/login">こちら!!</Link>
        </h1>

        <p className={styles.description}>
          Sign Up <Link href="/signup">こちら!!</Link>
          <code className={styles.code}>pages/index.js</code>
        </p>

        <Logout />

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
