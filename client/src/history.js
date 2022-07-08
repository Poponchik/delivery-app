import styles from './styles/history.module.css'
import Header from "./header"
import { useState, useEffect } from 'react';
import { config } from './config';
import { MdSubtitles } from 'react-icons/md';

function History() {

    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart') || '[]'))


    const [orders, setOrders] = useState([])

    async function getOrderHistory() {
        const response = await fetch(`${config.serverUrl}/orders/history`, {
            method: 'GET',
            headers: {
                'authorization': JSON.parse(localStorage.getItem('userData')).accessToken,
                'Content-Type': 'application/json'
            },
        });

        const orderHistory = await response.json()
        setOrders(orderHistory)
    }

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'))
        if (!userData) window.location.href = "http://localhost:3000/auth/login";
        getOrderHistory()

    }, [])

    console.log(orders)

    return (
        <div className={styles.container} id="container">
            <div className={styles.container__inner}>
                <Header></Header>
                <div className={styles.body}>
                    <div className={styles.shop}>

                        {
                            orders.map(element => {
                                console.log(element.items[0]);
                                return <div key={element.user._id} className={styles.items}>
                                    <div className={styles.order_info}>
                                        <p className={styles.shop_title}>{element.items[0].product.shop.name}</p>

                                        <div className={styles.sum}>
                                            <p className={styles.title}>Total price:</p>
                                            <p className={styles.total_price}>{element.sum}₴</p>
                                        </div>
                                        <div className={styles.date_block}>
                                            <p className={styles.title}>Date:</p>
                                            <p className={styles.info}>{new Date(element.created).toLocaleDateString()}</p>
                                        </div>
                                        <div className={styles.name_block}>
                                            <p className={styles.title}>Name:</p>
                                            <p className={styles.info}>{element.user.name}</p>
                                        </div>
                                        <div className={styles.address_block}>
                                            <p className={styles.title}>Address:</p>
                                            <p className={styles.info}>{element.user.address}</p>
                                        </div>
                                        <div className={styles.phone_block}>
                                            <p className={styles.title}>Phone:</p>
                                            <p className={styles.info}>{element.user.phone}</p>
                                        </div>
                                    </div>
                                    <div className={styles.products}>
                                        {
                                            element.items.map(item => {
                                                console.log({item})
                                                return <div key={item._id} className={styles.item}>
                                                    <img className={styles.photo}  src={`${config.serverUrl}/${item.product.photo}`} alt="burger" />
                                                    <div className={styles.description}>
                                                        <div className={styles.title_item}>
                                                            <h4 className={styles.name_item}>{item.product.name}</h4>

                                                        </div>
                                                        <div className={styles.price_item}>
                                                            <p className={styles.coast}>Price:</p>
                                                            <p className={styles.price}>{item.product.price * item.quantity}₴</p>

                                                        </div>
                                                        <div className={styles.item_quantity}>
                                                            <p className={styles.quantity}>Quantity:</p>
                                                            <p className={styles.number_quantity}>{item.quantity}</p>
                                                        </div>

                                                    </div>
                                                </div>
                                            })
                                        }
                                    </div>


                                </div>
                            })}


























                    </div>
                </div>

            </div>
        </div>


    );
}

export default History;
