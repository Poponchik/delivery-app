import { Link } from "react-router-dom"
import styles from "./styles/header.module.css"
import { MdAccountBox } from 'react-icons/md'
import { BiLogOutCircle } from 'react-icons/bi'
import { BiLogInCircle } from 'react-icons/bi'
import { useEffect, useState } from 'react'


function Header() {

    const [login, setLogin] = useState(() => {
        const userData = JSON.parse(localStorage.getItem('userData'))
        if (!userData || !userData.accessToken) return ''

        return userData.accessToken
    })

    function logout() {
        localStorage.removeItem('userData')
        setLogin('')
    }

    return (
        <div className={styles.header}>
            <div className={styles.header_title}>
                <Link to="/" className={styles.link}>
                    <h1 className={styles.title_shop}>Shop</h1>
                </Link>
                <Link to="/shopping" className={styles.link}>
                    <h1 className={styles.title_shop} >Shopping cart</h1>
                </Link>
                <Link to="/history" className={styles.link}>
                    <h1 className={styles.title_cart} >History</h1>
                </Link>

            </div>
            <div className="icons">
                {login ? <div>

                    <BiLogOutCircle size={28} className={styles.logout} onClick={logout} />

                    <MdAccountBox size={28} />
                </div>

                    : <Link to="/auth/login"><BiLogInCircle size={28} /></Link>
                }
            </div>
        </div>
    );
}

export default Header;