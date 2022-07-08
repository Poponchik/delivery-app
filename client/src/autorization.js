import { useEffect, useState } from "react";
import styles from "./styles/auth.module.css"
import { config } from "./config"
import classNames from 'classnames';
import { Link } from 'react-router-dom'

function Autorization() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    async function autorization() {
        try {
            const response = await fetch(`${config.serverUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const userData = await response.json()
            if (userData.message) return alert(userData.message)
            setEmail('')
            setPassword('')

            localStorage.setItem('userData', JSON.stringify({ accessToken: userData.accessToken }));
            window.location.href = '/'
        }

        catch (error) {
            alert(error)
        }
    }

    return (
        <div className={styles.container} id={styles.container}>
            <div className={styles.container_inner}>
                <div className={styles.form_section}>
                    
                    <div className={styles.body}>
                        <h1 className={styles.welcome}>Welcome back</h1>
                        <div className={styles.form}>
                            <div className={styles.email}>
                                <h4>Email</h4>
                                <input className={styles.input} placeholder="username@gmail.com"
                                    onChange={(event) => setEmail(event.target.value)}
                                    value={email}
                                />
                            </div>
                            <div className={styles.password}>
                                <h4>Password</h4>
                                <input type="password" className={styles.input} placeholder="password"
                                    onChange={(event) => setPassword(event.target.value)}
                                    value={password}
                                />
                            </div>

                            <button className={styles.sign_in} onClick={autorization}>Sign in</button>

                            <div className={styles.create_account}>
                                <p>Don’t have an account?</p>
                                <Link to='/auth/registration'>
                                    <a className={classNames(styles.link, styles.link_create)}>Create new</a>
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={styles.image}>
                        <img className={styles.burger} src="../image/800x600--b1XA.jpg" alt="image" />
                    </div>
                </div>
            </div>
        </div>


    );
}

export default Autorization;
