import React from "react";

function Cart(props) {
    return (
        <>

            <tr>
                <td className="table-block__cell"><img src={props.img} style={{ width: '30px' }} alt={`${props.title}.png`} /></td>
                <td className="table-block__cell">{props.title}</td>
                <td className="table-block__cell">{props.cost}$</td>
                <td className="table-block__cell">{props.count}</td>
                <td className="table-block__cell"><button className="table-block__cell_btn _minus minus-item" data-key={props.articul}>-</button></td>
                <td className="table-block__cell"><button className="table-block__cell_btn _delete delete-item" data-key={props.articul}>X</button></td>
            </tr>
        </>
    );
}

export default Cart;