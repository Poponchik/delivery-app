import { useEffect, useState } from "react";
import styles from "./styles/auth.module.css"
import { config } from "./config"
import classNames from "classnames"
import { Link } from 'react-router-dom'

function Registration() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function registration() {
        try {
            const response = await fetch(`${config.serverUrl}/auth/registration`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            
            if(!response.ok) {
                return alert(response.message)
            }
    
            setEmail('')
            setPassword('')
            window.location.href = "http://localhost:3000/auth/login";
        } catch(e) {
            alert(e)
        }
       
    }

    return (
        <div className={styles.container} id="container">
            <div className={styles.container_inner}>
                <div className={styles.form_section}>
                   
                    <div className={styles.body}>
                        <h1 className={styles.welcome}>Create new account</h1>
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
                            <button className={styles.sign_up} onClick={registration}>Sign up</button>
                            <div className={styles.create_account}>
                                <p>Have an account?</p>
                                <Link to='/auth/login'>
                                    <a className={classNames(styles.link, styles.link_create)}>Login!</a>
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

export default Registration;
