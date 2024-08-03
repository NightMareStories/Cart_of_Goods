import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectGoods } from '../store/goodsSlice';
import Goods from '../components/Goods/Goods';
import { increment } from '../store/cartSlice';
/*
* get data from store
* list data
*/

function GoodsList() {
    const goods = useSelector(selectGoods);
    const dispatch = useDispatch();

    let clickHandler = (event) => {
        event.preventDefault();
        let t = event.target;

        if (!t.classList.contains('add-to-cart')) return true;
        dispatch(increment(t.getAttribute('data-key')));
    }

    return (
        <>
            <div className="goods">
                <div className="goods-field _container">
                    <div className="goods-field__goods goods-block" onClick={clickHandler}>
                        {goods.map(item => <Goods title={item.title} cost={item.cost} image={item.image}
                            articul={item.articul} key={item.articul} />)}
                    </div>
                </div>
            </div>
        </>
    );
}

export default GoodsList;