# Привет!
&nbsp;

---
## Это приложение написано на ReactJS. Чтобы протестировать его работу вам потребуется:
### **1. `Cначала вам нужно установить `"[NodeJS](https://nodejs.org/)"` на ваш компьютер. Для того чтобы проверить его наличие на вашем "ПК", введите команду в терминале:`**

```
node --version 
```

```
npm --version
```

### `Если команды работают и выводят версии, то "Node" и "NPM" у вас уже установленны;`
### **2. `Установить все зависимости командой "npm i" в терминале:`
&nbsp; 

```
npm i
```
&nbsp;

### **3. `После установки всех необходимых модулей можно запускать приложение командой "npm start":`
&nbsp;

```
npm start
```
&nbsp;
## **Теперь за работу!**
---
&nbsp;


# 1. Введение
&nbsp;

---
### "Cart of Goods" - это приложение, написанное на "ReactJS" и "JavaScriptES6". Это "приложение" реализовано и разделено на компоненты: "каталог товаров" - которые можно добавить в корзину, и "корзина товаров" - добавленных в нее товаров. Логика приложения следующая: все данные о товарах находятся в одном "объекте", "каталог товаров" получает данные о товарах из этого "объекта" и отображает их на странице, у каждого товара на странице есть "кнопка" для добавления этого товара в корзину. Сама "корзина" сохраняет данные о добавленных в неё товарах и отображает "их" на странице в своем блоке под каталогом. Внизу корзины есть расчет "суммы" добавленных товаров и их "количества". Также в корзине можно "уменьшить" количество определенного товара и полностью "удалить" его позицию. Для реализации этой логики, я использовал модули React: "redux", "react-redux" и "@reduxjs-toolkit". Для "корзины" и "каталога товаров" созданы собственные "нарезки хранилищ", "редюсеры", "контейнеры" и "компоненты" для рендеринга на странице. Чтобы стилизовать приложение, я использовал препроцессор - "SCSS".
---
&nbsp;

# 2. Ознакомление
&nbsp;

---
### Приложение разделено на "Компоненты", "Контейнеры", "Хранилища" и имеет один общий "Объект" с данными о товарах. В папке "components" находятся готовые компоненты для рендеринга на странице, а именно: Папка "Goods", внутри которой находится компонент "Goods"; Папка "Cart" с собственным "компонентом"; Папка "Main", содержащая основной компонент и основной "SCSS" файл; Папка "App" с общим компонентом и файл "SCSS" с глобальными стилями; Папки "HeaderGeneral" и "FooterGeneral" имеют свои собственные компоненты и стили и не являются частью приложения, они выполняют только функцию общего "Хэдера" и "Футера" на странице и интегрированы во все приложения. В папке "containers" находятся "контейнеры" для работы с хранилищем, для "корзины" и "каталога товаров". В папке "data" находится общий "env.js" файл с данными о товарах. В папке "store", находятся "нарезки хранилищ" с редюсерами для "корзины" и "каталога товаров". Они объединены в одно хранилище - "index.js" файл, в одной папке; Папка "fonts" содержит шрифты для приложения. Точка входа по умолчанию - "index.js" файл - находится в папке "src", также есть "SCSS" файлы для точки входа и переменные для работы со шрифтами. 
---
&nbsp;


# 3. Обзор
&nbsp;

---
### Для работы мне потребовалось установить модули React: "redux"; "react-redux"; "@reduxjs-toolkit". Модуль "@reduxjs-toolkit" позволяет создавать хранилища в простом и понятном виде называемых - "slices".

### В папке "store" лежат два файла с "нарезками хранилищ" и одним файлом конфигурирующий "хранилище".
---
&nbsp;

---
### В файле "cartSlice" импортируется метод модуля "@reduxjs-toolkit": "сreateSlice". Создается "slice" хранилища с его названием, начальным стэйтом со значением и редюсерами для внешнего вызова.

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

### В редюсерах прописаны "actions" для: добавления товара и увеличения его количества в корзине (increment), для уменьшения количества товара (minus) в корзине, удаление товара из корзины (delete). Внизу эти "actions" экспортируются, экспортируется метод со стейтом для работы с хранилищем из вне (selectCart), последним экспортируется сам "slice" хранилища как редюсер.
---
&nbsp;

---
### В файле "goodsSlice" также создается "slice" хранилища и импортируется "env.js" файл из папки "data" с данными товаров. Этот "объект" записывается в начальный стэйт для последующей работы с ним.

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
### Я знаю что смешивать данные плохая практика и добавление объекта с данными в стейт "slice" - не корректно, но мне нужно было сделать понятную для меня работу приложения и в будущем я переделаю в правильную сторону данное упущение. Ниже экспортируется селектор со стейтом для доступа к данным из "объекта" товаров. И в конце экспортируется сам "slice" хранилища как редюсер.
---
&nbsp;

---
### В файле "index.js" сначала импортируется метод "configureStore" из модуля "@reduxjs-toolkit" для создания хранилища. Затем импортируется "slice - редюсеры": "cartSlice" и "goodsSlice".

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

### Далее создается хранилище и в него помещается, как редусеры, те самые "нарезки": "cartSlice" и "goodsSlice". Теперь общее хранилище готово.
---
&nbsp;

---
### В точке входа приложения (index.js) подключается хранилище (store), а также подключается "Provider" из модуля "react-redux".

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

### Помещение компонента "App" внутрь "Provider", дало возможность обращаться к хранилищу из любого компонента, импортированного в общий "App" компонент.
---
&nbsp;

---
### Контейнеры для работы с хранилищем и отправки данных в компоненты для отрисовки - лежат в папке "containers". В файле "goodsList" осуществляется работа и создание "каталога товаров". В начале импортируются "hooks" из модуля "react-redux" для работы с redux-хранилищем. Затем импортируются данные по товарам из хранилища "goodsSlice". Наконец импортируется редюсер "increment" из хранилища "cartSlice".

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

### Хук "useSelector()" - позволяет обратится к хранилищу и получить из него необходимые данные. Константа "goods", будет хранить полученные данные из хранилища. Хук "useDispatch()" - нужен для диспетчиризации хранилища и добавление в него даннных из вне. Константа "dispatch" - нужна лишь для сокращения "хука". Константа "goods", хранящая в себе данные о товарах, переберается методом для массивов - "map()". Внутри перебора массива, в зависимости от его длины, несколько раз вызывается компонент "Goods", содержащий в себе шаблон для вывода данных по товарам на страницу. В "Goods", в качестве "пропсов", отправляются данные по товарам: "title", "cost", "image", "articul" и уникальный "key" ключ. Получив данные в виде "пропсов", компонент "Goods" подставляет их в соответсвующие блоки для вывода.

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

### Каждый блок товара имеет свою "кнопку" и при получении "props" "кнопка", получает свой "data-key" атрибут, равный "articul" выведенного на страницу товара. В "CartList", стрелочная функция вешается на блок для вывода "каталога товаров". При срабатывании она отменяет дефолтное событие, получает в переменную "элемент" события, проверяет наличие класса у "элемента" и в случае успеха, отправляет в хранилище атрибут "data-key" элемента-кнопки. Уже в хранилище, данный атрибут подставляется как "articul" товара, добавляется в "state" и изменяется в зависимости от условия. 
---
&nbsp;

---
### В "СartList" все выглядит сложнее. В начале импортируются "hooks": "useSelector()" и "useDispatch()" - для работы с хранилищем. Далее импортируются селекторы хранилищ: "selectCart" и "selectGoods". Затем импортируются редюсеры: "minus" и "delete", из "cartSlice". Наконец импортируется: "React" и компонент "Cart". Константы: "goods" и "cart" - содержат данные с одноименных хранилищ. Константа "dispatch" - для удобства.

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

### Корзина - представляет собой таблицу с ячейками: "name", "price", "quantity". Под ячейками написано выражение, для вывода столбца с ячейками данных по товару. Сначала были получены ключи объекта "cart", затем методом "map()" был вызван перебор элементов "cart". Внутри "map()", осуществляется вывод компонента "Cart", в количестве равный длинне массива "cart", с передачей в него данных по добавленным товарам в качестве "props" из двух констант: "goods" и "cart". В компоненте "Cart", имеется шаблон для отрисовки на странице, получая "props" из "CartList", он подставляет полученные значения в ячейки.

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

### Каждая добавленная колонка с товаром имеет 2 кнопки: кнопка с классом "minus-item" и кнопка с классом "delete-item". Данным "кнопкам" назначается атрибут "data-key" со значением из пропса "articul". В "CartList", на блок с таблицей, вешается событие "клик" с функцией "clickHandler()". Эта функция отменяет дефолтное событие "элемента", получает в переменную сам "элемент" события и делает проверку на наличие у "элемента" класса "minus-item". В случае успеха, вызывается редюсер "minus" и атрибут кнопки "minus" отправляется в хранилище. В ином случае, вызывается редюсер "delete" и атрибут кнопки "delete" отправляется в хранилище. Уже в хранилище, эти "атрибуты" становятся "артикулами" и в зависимости от условий, уменьшаются или удаляются из корзины. Блок суммы товаров находится под корзиной. Для упрощения работы, массив "goods" был переиндексирован в объект "goodsObj". Внутри блока суммы имеется "выражение", для получения ключей объекта "cart" и дальнейшем перебором элементов в нем. Возвращаемое значение - равно исходному значению, сложенное со стоимостью товара и умноженное на его количество. Для корректного отображения на странице был добавлен метод "toFixed(2), сокращая вывод дробной части до двух чисел после запятой.
---
&nbsp;

# 4. Заключение
&nbsp;

---
### Признаюсь, работа с хранилищем "redux" была для меня запутанной и сложной, мне потребовалось много времени, чтобы понять, куда и что следует отправлять, а также абсолютное внимание к деталям. Модуль "@reduxjs-toolkit" сыграл хорошую роль в разработке, с ним создание хранилища было проще и понятнее, чем без него. Несмотря на запутанную и сложную структуру, я многому научился во время разработки этого приложения, поняв и проанализировав моменты, которые я не понимал ранее. Думаю что, интегрирую это приложение в свои будущие проекты.
---
&nbsp;


# ___Спасибо за уделенное время!___ 
