# Hello!
&nbsp;

---
## This application is written in ReactJS. If you want to test the operation of the application, start the entry point (index.js) by entering this command in the terminal (cmd or other).

```
npm start
```

### But first, you need to install all the plugins from package.json with the command in your terminal.

```
npm i
```
---
&nbsp;
 
# 1. Introduction
&nbsp;

---
### Cart of Goods - is an application written in ReactJS and JavaScriptES6. In this application, it is implemented and divided into components - a catalog of goods to be added to the cart and the cart of goods added to it. The application logic is as follows, all goods data is in one object, the goods catalog receives goods data from this object and render it on the page, each product on the page has a button to add this product to the cart. The cart itself saves data on the goods added to it and render them on the page in its block below the catalog. At the bottom of the cart there is a calculation of the amount of added items and their quantity. Also in the cart it is possible to reduce the quantity of a specific product and completely delete its position. In order to implement this logic, I used the react modules: redux, react-redux and reduxjs-toolkit. For the cart and the catalog of goods, their own storages-slices, reducers, containers and components for render on the page were created. To style the application, I used the SCSS preprocessor.

---
&nbsp;

# 2. Familiarization
&nbsp;

---
### The application is divided into Components, Containers, Storages and has one common Object with goods data. The components folder contains ready-made components for rendering on the page, namely: the Goods folder, inside which the product component is located; the Cart folder, with its own component; the Main folder, which contains the main component and the main SCSS-file; App folder, with the general component and SCSS file with global styles; The HeaderGeneral and FooterGeneral folders have their own components and styles and are not part of the application, they only perform the function of a common header and footer and are integrated into all applications. The Containers folder contains containers for working with storage, for the cart and for catalog of goods. The Data folder contains a common object file with goods data. The Store folder contains slices of storages with reducers for the cart and goods catalog. They are combined into one store - index.js, in the same folder. The Fonts folder contains the fonts for the application. The default entry point is index.js - located in the src folder, there are also SCSS-files for the entry point and variables for working with fonts.
---
&nbsp;

# 3. Overview
&nbsp;

---
### To work, I needed to install react modules: "redux"; "react-redux"; "@ reduxjs-toolkit". The "@reduxjs-toolkit" module allows you to create store in a simple and understandable way called "slices".

### The store folder contains two files with storage-slices and one file configuring the storage.
---
&nbsp;

---
### In the "cartSlize" file, the "createSlize" method of the "@reduxjs-toolkit" module is imported. A storage slice is created with its name, initial state with a value, and reducers for an external call.

```
import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        value: {}
    },
    reducers: {
        increment: (state, data) => {
            let articul = data.payload;
            if (state.value[articul] === undefined) state.value[articul] = 0;
            state.value[articul]++;
        },
        minus: (state, data) => {
            let articul = data.payload;
            state.value[articul]--;
            if (state.value[articul] === 0) delete state.value[articul];

        },
        remove: (state, data) => {
            let articul = data.payload;
            delete state.value[articul];
        }
    }
});

export const { increment, minus, remove } = cartSlice.actions;
export const selectCart = state => state.cart.value;
export default cartSlice.reducer;

```
### Redusers prescribe actions to add a product and increase its quantity in the cart (increment), to decrease the quantity of an item (minus), remove an item from the cart (delete). Below, these actions are exported, a method with a state for working with the store from outside (selectCart) is exported, the latter exported the slicing of the store itself as a reducer.
---
&nbsp;

---
### A storage slicing is also created in the "goodsSlice" file and an object with goods data from the data folder is imported. This "object" is written to the initial state for subsequent work with it.

```
import { createSlice } from '@reduxjs/toolkit';
import goodsArr from '../data/goods.json';

export const goodsSlice = createSlice({
    name: 'goods',
    initialState: {
        goods: goodsArr
    },
    reducers: {}
});

export const selectGoods = state => state.goods.goods;
export default goodsSlice.reducer;

```

### I know that mixing data is bad practice and adding an object with data to the slicing state is not correct, but I needed to make the application work understandable for me and in the future I will redo this omission in the right direction.Below is exported a selector with a state for accessing data from the goods object. And at the end, the storage slicing itself is exported as a reducer.
---
&nbsp;

---
### In the index.js file, the "configureStore" method from the @reduxjs-toolkit module is first imported to create the store, and then the "cartSlize" and "goodsSlice" slicers are imported.

```
import { configureStore } from '@reduxjs/toolkit';
import goodsReducer from './goodsSlice';
import cartReducer from './cartSlice';

export default configureStore({
    reducer: {
        goods: goodsReducer,
        cart: cartReducer
    },
});

```

### Next, the store is created and, like reducers, the very same "cartSlize" and "goodsSlice" slices are placed in it. The shared storage is now complete.
---
&nbsp;

---
### At the entry point of the application (index.js), the storage (store) is connected, and the provider from the "react-redux module" is also connected.

```

import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/App/App';

import store from './store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

```

### Placing an "App" component into a "Provider" made it possible to access the storage from any component imported into a common "App" component.
---
&nbsp;

---
### "Containers" for working with "storage" and sending "data" to "Components" for rendering are in the "Containers" folder. In the file "GoodsList", the work and the creation of the catalog of goods are carried out. First, "hooks" for working with "redux-storage" are imported from the "react-redux" module. Then, the goods data is imported from the "goodsSlice" store. Finally, the reducer "increment" is imported from the "cartSlize" store.

```

import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { selectGoods } from '../store/goodsSlice';
import Goods from '../components/Goods/Goods';
import { increment } from '../store/cartSlice';

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

```

### Hook "useSelector" - allows you to access the "storage" and get the necessary "data" from it. "Goods" constant - will store the received data from the "storage". "useDispatch" hook - needed to dispatch the "storage" and add "data" from outside to it. "Dispatch" constant - only needed to shorten the hook. The "goods" constant, which stores goods data, is iterated over by the method for arrays - "map". Inside the iteration over the array, depending on its length, the "Goods" component is called several times, which contains a template for outputting "data". Goods "data" is sent to "Goods" as props: "name", "value", "picture", "article" and "unique key". Having received the "data" in the form of "props", the "Goods" component substitutes it into the corresponding blocks for output.

```

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

```

### Each product block has its own button, and when a props is received, the button receives its own attribute "data-key" equal to the "articul" of the product displayed on the page. In a "CartList", an arrow function is hung on the block for displaying a catalog of goods. When triggered, it canceled the default event, receives the event "element" in the variable, checks for the "element's" class and, if successful, sends the attribute of the button "element" to the "storage". Already in the "storage", this attribute is substituted as a product "articul", added to the state and changed depending on the condition.
---
&nbsp;

---
### Everything looks more complicated in a "CartList". In the beginning, "hooks" are imported: "useSelector" and "useDispatch" - for working with the "storage". Next, the storage selectors are imported: "selectCart" and "selectGoods". Then, reducers are imported: "minus" and "remove" - from "cartSlize". Finally, it is imported: a "react" and a "Cart" component. Constants: "goods" and "cart" - contain "data" from "storages" of the same name. "Dispatch" constant - for convenience.

```
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

    const goodsObj = goods.reduce((accum, item) => {
        accum[item['articul']] = item;
        return accum;
    }, {});

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

```

### Cart - is a table with cells: name, cost, quantity. An "expression" is written under the cells to display a column with product "data" cells. First, the keys of the "Cart" object were obtained, then, using the "map" method, an iteration of the cart items was called. Inside the "map", the "Cart" component is displayed, in an amount equal to the length of the cart array, with the transfer of "data" on the added goods to it as props from two constants: "goods" and "cart". In the "Cart" component, there is a template for rendering on the page, receiving props from the "CartList", it substitutes the obtained "values" ​​into the cells. 

```

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

```

### Each added product column has 2 buttons: a button with the "minus-item" class and a button with the "delete-item" class. These buttons are assigned a "data-key" attribute with a value from the props "articul". In the "CartList", on the block with the table, a click event with the "clickHandler" function is hung. This function cancels the default event of the "element", gets the event "element" itself into the variable and checks whether the "element" has a "minus-item" class. If successful - the "minus" reducer is called and the "minus" button attribute is sent to the "storage". Otherwise - the "delete" reducer is called and the "delete" button attribute is sent to the "storage". Already in the storage, these "attributes" become "articules" and, depending on the conditions, are "decremented" or "removed" from the cart. The "sum" block is located under the cart. To make things easier, the "goods" array has been reindexed into a "goodsObj" object. There is an "expression" inside the "sum" block to get the keys of the cart object and then iterate over the "elements" in it. The return "value"  -is equal to the "original" value, added with the "cost" of the product and multiplied by its "quantity". For correct render on the page, the "toFixed(2)" method was added, reducing the output of the fractional part to two numbers after the decimal point.
---
&nbsp;

# 4. Conclusion
&nbsp;

---
### I confess that, working with the redux storage was confusing and difficult for me, it took me a lot of time to figure out where and what should be sent, as well as absolute attention to detail. The reduxjs-toolkit plugin played a good role in the development, with it building the store was easier and more understandable than without it. Despite the confusion and complex structure, I learned a lot during the development of this application, understanding and analyzing the points that I did not understand earlier. I think I will integrate this application into my future projects.
---
&nbsp;
 
# ___Thank you for your time!___
