import axios from 'axios';
import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from '../redux/authSlice';

const Home = () => {
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.auth)
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [purchaseSuccess, setPurchaseSuccess] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/products/');
                setProducts(response?.data?.products);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const total = useMemo(() => {
        return cart.reduce((a, b) => a + b?.price, 0)
    }, [cart])

    return (
        <div>
            {!purchaseSuccess ? <div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 20, backgroundColor: 'blue' }}>
                    <h1>Hello, {userInfo?.firstName + ' ' + userInfo?.lastName}</h1>
                    <h1 onClick={() => dispatch(authAction.logout())}>Logout</h1>
                </div>
                <div style={{ margin: 20 }}>
                    <h2>Product List</h2>
                    <div style={{ display: 'flex', flexDirection: 'row', overflowX: 'scroll' }}>
                        {products.map(product => (
                            <div key={product.id} style={{ margin: 20 }}>
                                <img src={product?.thumbnail} height="260" width="260"  alt={'#'}/>
                                <div>Title: {product?.title}</div>
                                <div>Price: {product?.price}$</div>
                                <div
                                    style={{ border: '1px solid black', textAlign: 'center', borderRadius: 50, margin: 10, backgroundColor: 'green' }}
                                    onClick={() => setCart([...cart, product])}
                                >Add to card</div>
                            </div>
                        ))
                        }
                    </div >
                    <div>
                        <h2>Cart</h2>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <h3>Total: {total}$</h3>
                            <button
                                disabled={total === 0}
                                style={{ border: '1px solid black', justifyContent: 'center', borderRadius: 50, width: 150, alignItems: 'center', display: 'flex', height: 40, marginLeft: 50 }}
                                onClick={() => {
                                    setPurchaseSuccess(true)
                                    setCart([])
                                }}
                            ><h2>Buy now</h2></button>
                        </div>
                        {
                            cart.length !== 0 && <div style={{ display: 'flex', flexDirection: 'row', overflowX: 'scroll' }}>
                                {cart.map(product => (
                                    <div key={product.id} style={{ margin: 20 }}>
                                        <img src={product?.thumbnail} height="260" width="260" alt={'#'}/>
                                        <div>Title: {product?.title}</div>
                                        <div>Price: {product?.price}$</div>
                                        <div
                                            style={{ border: '1px solid black', textAlign: 'center', borderRadius: 50, margin: 10, backgroundColor: 'red' }}
                                            onClick={() => setCart(prev => prev.filter(res => res.id !== product.id))}
                                        >Remove</div>
                                    </div>
                                ))
                                }
                            </div >}
                    </div>
                </div>
            </div>
                : <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', height: '100vh', width: '100vw' }}>
                    <div style={{textAlign:'center'}}>
                        <h1>Purchase success!</h1>
                        <h1 onClick={() => setPurchaseSuccess(false)}>Comeback to shopping</h1>
                    </div>
                </div>
            }
        </div>
    );
};

export default Home;