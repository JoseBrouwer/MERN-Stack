export const addDecimals = (num) => {
    return Math.round((num * 100) / 100).toFixed(2);
}

export const updateCart = (state) => {
    //Calculate price of items
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) =>
        acc + item.price * item.qty, 0));

    //Calculate price of shipping (IF order is over $100 then free else $10)
    state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

    //Calculate price of taxes(15% tax)
    state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

    //Calculate total price
    state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
    ).toFixed(2);

    localStorage.setItem('cart', JSON.stringify(state));
    return state
}