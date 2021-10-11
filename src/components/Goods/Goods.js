function Goods(props) {
    return (
        
        <div className="goods-block__column block-goods">
            <img src={props.image} alt="" className="block-goods__img"/>
            <p className="block-goods__title">{props.title}</p>
            <p className="block-goods__cost">{props.cost} $</p>
            <button className="block-goods__btn add-to-cart" data-key={props.articul}>Add to cart</button>
        </div>
    );
}

export default Goods;