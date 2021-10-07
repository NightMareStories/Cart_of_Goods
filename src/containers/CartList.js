import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { selectGoods } from '../store/goodsSlice';
import { selectCart } from '../store/cartSlice';
import { minus, remove } from "../store/cartSlice";
import Cart from '../components/Cart/Cart';

function CartList() {
    const goods = useSelector(selectGoods);
    const cart = useSelector(selectCart);
    const dispatch = useDispatch();

    //переиндексирую массив товара
    const goodsObj = goods.reduce((accum, item) => {
        accum[item['articul']] = item;
        return accum;
    }, {})
    let clickHandler = (event) => {
        event.preventDefault();
        let t = event.target;

        if (t.classList.contains('minus-item')) {
            dispatch(minus(t.getAttribute('data-key')));
        }
        else if (t.classList.contains('delete-item')) {
            dispatch(remove(t.getAttribute('data-key')));
        }
    }
    return (
        <div className="cart"> 
            <div className="cart-field _container">
                <div className="cart-field__cart cart-block">
                    <h2 className="cart-block__title">Cart</h2>
                    <div className='cart-block__content' onClick={clickHandler}>
                        <table className="cart-block__table table-block">
                            <thead></thead>
                            <tbody>
                                <tr>
                                    <th></th>
                                    <th className="table-block__cell">Name</th>
                                    <th className="table-block__cell">Price</th>
                                    <th className="table-block__cell">Quantity</th>
                                </tr>
                            {Object.keys(cart).map(item => <Cart title={goodsObj[item]['title']} cost={goodsObj[item]['cost']} key={item + goodsObj[item]['title']} count={cart[item]} articul={goodsObj[item]['articul']} img={goodsObj[item]['image']} />)}
                            </tbody>
                            <tfoot></tfoot>
                        </table>
                    </div>
                </div>
                <div className="cart-field__sum cart-sum">
                    <h3 className="cart-sum__sum">Sum:   {Object.keys(cart).reduce((accum, item) => { return accum = accum + goodsObj[item]['cost'] * cart[item]}, 0).toFixed(2)} $</h3>
                </div>
            </div>
        </div>
    )
}

export default CartList;