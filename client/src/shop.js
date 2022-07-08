import styles from './styles/main.module.css'
import Header from "./header"
import { useState, useEffect } from 'react';
import { config } from './config';



function Shop() {
    const [products, setProducts] = useState([])
    const [shops, setShops] = useState([])
    const [active, setActive] = useState('')

    async function getShops() {
        const response = await fetch(`${config.serverUrl}/shops`)
        const shopsFromServer = await response.json()
        setShops(shopsFromServer)
    }

    async function getProducts(id) {
        const response = await fetch(`${config.serverUrl}/products/${id}`)
        const productsFromServer = await response.json()
        setProducts(productsFromServer)
    }

    function sendToCart(item) {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]')
        const itemInCartIndex = cart.findIndex(element => element.item._id == item._id)
        if (itemInCartIndex > -1) {
            cart[itemInCartIndex].quantity++
        } else {
            cart.push({ item, quantity: 1 })
        }
        localStorage.setItem('cart', JSON.stringify(cart))
        alert('Added to cart')
    }
    
    useEffect(() => {
        if (shops.length) {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]')
            let id = shops[0]._id
            if(cart.length) {
                id = cart[0].item.shop._id
            }
            getProducts(id)
            setActive(id)
        }
    }, [shops.length])

    useEffect(() => {
        getShops()
    }, [])

    return (
        <div className={styles.container} id="container">
            <div className={styles.container__inner}>
                <Header></Header>
                <div className={styles.body}>
                    <div className={styles.shop}>
                        <div className={styles.shops}>
                            <ul>
                                {
                                    shops.map(shop => <li className={shop._id === active ? styles.active_button : ''} key={shop._id} onClick={() => {
                                        const cart = JSON.parse(localStorage.getItem('cart') || '[]')
                                        if(cart.length) return alert('Your cart include products from another shop')
                                        setActive(shop._id)
                                        getProducts(shop._id)
                                    }
                                }>{shop.name} </li>)
                                }
                            </ul>
                        </div>
                        <div className={styles.items}>
                            {
                            
                                products.map(product => {
                                    return <div key={product._id} className={styles.item}>
                                        <img className={styles.photo} src={`${config.serverUrl}/${product.photo}`} alt="burger" />
                                        <div className={styles.description}>
                                            <h4 className={styles.name_item}>{product.name}</h4>
                                            <div className={styles.item_price}>
                                                <p className={styles.price}>{product.price}₴</p>
                                                <button className={styles.add_to_card} onClick={() => sendToCart(product)}>Add to cart</button>
                                            </div>
                                        </div>
                                    </div>

                                })}
                        </div>
                    </div>
                </div>

            </div>
        </div>


    );
}

export default Shop;
