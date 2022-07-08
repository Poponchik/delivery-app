

export function sendToCart(item) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const itemInCartIndex = cart.findIndex(element => element.item._id == item._id)
    if (itemInCartIndex > -1) {
        cart[itemInCartIndex].quantity++
    } else {
        cart.push({ item, quantity: 1 })
    }
    localStorage.setItem('cart', JSON.stringify(cart))
}