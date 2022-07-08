import styles from './styles/cart.module.css'
import { AiOutlinePlusSquare } from 'react-icons/ai'
import { AiOutlineMinusSquare } from 'react-icons/ai'
import { MdAccountBox } from 'react-icons/md'
import { BiLogInCircle } from 'react-icons/bi'
import { GrClose } from 'react-icons/gr'
import { Link } from "react-router-dom"
import Header from "./header"
import { useEffect, useState } from 'react'
import { config } from "./config"



function ShoppingCart() {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart') || '[]'))
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [sum, setSum] = useState(cart.reduce((acc, element) => {
        return acc + element.item.price * element.quantity
    }, 0))

    function changeQuantity(item, operator) {
        const itemInCartIndex = cart.findIndex(element => element.item._id === item._id)

        const operations = {
            'plus': () => cart[itemInCartIndex].quantity++,
            'minus': () => {
                if (cart[itemInCartIndex].quantity <= 1) return
                cart[itemInCartIndex].quantity--
            }
        }

        operations[operator]()

        setCart([...cart])
        setSum(cart.reduce((acc, element) => {
            return acc + element.item.price * element.quantity
        }, 0))
        localStorage.setItem('cart', JSON.stringify(cart))
    }

    function removeFromCart(id) {
        const itemInCartIndex = cart.findIndex(element => element.item._id === id)
        cart.splice(itemInCartIndex, 1)

        setCart([...cart])
        setSum(cart.reduce((acc, element) => {
            return acc + element.item.price * element.quantity
        }, 0))
        localStorage.setItem('cart', JSON.stringify(cart))
    }

    async function createOrder() {
        if(!name || !phone || !email || !address || !cart.length) return
        await fetch(`${config.serverUrl}/orders`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sum,
                user: { name, phone, email, address },
                items: cart.map((element) => {
                    return {
                        product: element.item._id,
                        quantity: element.quantity
                    }
                })
            })
        });

        setName('')
        setPhone('')
        setEmail('')
        setAddress('')
        setCart([])
        setSum(0)
        localStorage.removeItem('cart')
        alert('Thanks for order!')

    }

    return (
        <div className={styles.container} id="container">
            <div className={styles.container__inner}>
                <Header></Header>
                <div className={styles.body}>
                    <div className={styles.shop}>
                        <div className={styles.info}>
                            <h2 className={styles.checkout}>Checkout</h2>
                            <div className={styles.input_info}>
                                <p className={styles.delivery_info}>Name</p>
                                <input className={styles.input} value={name} onChange={(event) => setName(event.target.value)} />
                            </div>
                            <div className={styles.input_info}>
                                <p className={styles.delivery_info}>Phone number</p>
                                <input className={styles.input} value={phone} onChange={(event) => setPhone(event.target.value)} />
                            </div>
                            <div className={styles.input_info}>
                                <p className={styles.delivery_info}>Email</p>
                                <input className={styles.input} value={email} onChange={(event) => setEmail(event.target.value)} />
                            </div>
                            <div className={styles.input_info}>
                                <p className={styles.delivery_info}>Address</p>
                                <input className={styles.input} value={address} onChange={(event) => setAddress(event.target.value)} />
                            </div>
                            <div className={styles.sum}>
                                <p className={styles.total}>Total price:</p>
                                <p className={styles.total_price}>{sum}₴</p>
                            </div>
                            <button className={styles.submit} onClick={createOrder}>Submit</button>
                        </div>
                        <div className={styles.items}>


                            {
                                cart.map(element => {
                                    return <div key={element.item._id} className={styles.item}>
                                        <img className={styles.photo}  src={`${config.serverUrl}/${element.item.photo}`} alt="burger" />
                                        <div className={styles.description}>
                                            <div className={styles.title_item}>
                                                <h4 className={styles.name_item}>{element.item.name}</h4>
                                                <GrClose className={styles.remove} size={20} onClick={() => removeFromCart(element.item._id)} />
                                            </div>
                                            <div className={styles.price_item}>
                                                <p className={styles.coast}>Price:</p>
                                                <p className={styles.price}>{element.item.price * element.quantity}₴</p>

                                            </div>
                                            <div className={styles.quantity_items}>
                                                <AiOutlineMinusSquare size={26} onClick={() => changeQuantity(element.item, 'minus')} />
                                                <p className={styles.quantity}>{element.quantity}</p>
                                                <AiOutlinePlusSquare size={26} onClick={() => changeQuantity(element.item, 'plus')} />
                                            </div>
                                        </div>
                                    </div>
                                })
                            }


                        </div>
                    </div>
                </div>

            </div>
        </div >


    );
}

export default ShoppingCart;