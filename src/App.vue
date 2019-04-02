<template>
<transition name="fade">
  <div id="basket_container">
      <div class="products">
        <div id="beer" class="box">
            <img src="https://chenyiya.com/codepen/product-1.jpg"> 
            <i class="fa fa-plus" v-on:click="addItem({img: 'https://chenyiya.com/codepen/product-1.jpg',title: 'Beer Bottle',price: '25',id: 'beer'})">+</i> 
            <h2>Beer Bottle</h2> 
            <p>25 р.</p>
        </div>
        <div id="beer2" class="box">
            <img src="https://chenyiya.com/codepen/product-2.jpg"> 
            <i class="fa fa-plus" v-on:click="addItem({img: 'https://chenyiya.com/codepen/product-2.jpg',title: 'Beer Bottle2',price: '125',id: 'beer2'})">+</i> 
            <h2>Beer Bottle</h2> 
            <p>25 р.</p>
        </div>
        <div id="beer3" class="box">
            <img src="https://chenyiya.com/codepen/product-3.jpg"> 
            <i class="fa fa-plus" v-on:click="addItem({img: 'https://chenyiya.com/codepen/product-3.jpg',title: 'Beer Bottle3',price: '325',id: 'beer3'})">+</i> 
            <h2>Beer Bottle</h2> 
            <p>25 р.</p>
        </div>                
      </div>  
      <div class="basket" v-if="total.count">
        <div class="basket__head">
          <h3>Корзина</h3>
          <div class="cart__head--price">Цена</div>
          <div class="cart__head--quantity">Количество</div>
          <div class="cart__head--total">Сумма</div>
        </div>
        
        <basket_item v-for="basket_item in basket_items" v-bind:buy_data="basket_item"></basket_item>
        <h5>Итого: {{total.sum}} р. {{ total.count }} шт</h5>
      </div>
      
      //
      
          <div
            class="cd-cart-container"
            v-bind:class="total.count ? '' : 'empty'"
            v-if="total.count > 0"
          >
            <a
              href="#"
              class="cd-cart-trigger"
              @click.prevent="
                $event.target.parentElement.classList.toggle('cart-open');
              "
            >
              <ul class="count">
                <li id="count-cart">{{ total.count }}</li>
              </ul>
            </a>
            <div class="cd-cart">
              <div class="wrapper">
                <header>
                  
                </header>
                <div class="body">
                  <basket_item v-for="basket_item in basket_items" v-bind:buy_data="basket_item"></basket_item>
                </div>
                <footer>
                  <a  href="/checkout" class="checkout btn">
                    <em>Итого - <span>{{ total.sum }} ₽</span></em>
                  </a>
                </footer>
              </div>
            </div>
          </div>
      //

    </div>
  </div>
</transition>
</template>

<script>

import basket_item from './basket_item.vue'

export default {
  name: 'app',
  data () {
    return {
      basket_items: []
    }
  },
  components:{
    basket_item:basket_item
  },  
  mounted() {
    if (localStorage.getItem('basket_items')) {
      try {
        this.basket_items = JSON.parse(localStorage.getItem('basket_items'));
      } catch(e) {
        localStorage.removeItem('basket_items');
      }
    }
  },
  computed: {
    total(){
      let sum = 0;
      let count = 0;
      this.basket_items.forEach((basket_item) => {
          sum += parseInt(basket_item.total);
          count += parseInt(basket_item.qty);
      });
      return {sum,count};
    }

  }, 
  methods: {
   addItem(product_data) {
      var i = this.findIndex(this.basket_items, "id", product_data.id);
      if (i < 0) {
        this.basket_items.push({
          img: product_data.img,
          title: product_data.title,
          price: product_data.price,
          qty: 1,
          total: product_data.price,
          id: product_data.id
        });
      }else{
        this.basket_items[i].qty += 1;
        this.basket_items[i].total =this.basket_items[i].qty*this.basket_items[i].price;
      }
      this.save();
    },
    findIndex(array, attr, value) {
      for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
          return i;
        }
      }
      return -1;
    },    
    save() {
      const parsed = JSON.stringify(this.basket_items);
      localStorage.setItem('basket_items', parsed);
    }
  }


}
</script>

<style lang="scss" scoped>

$color-1: green;
$color-2: #333;
$color-3: #fff;
$color-4: blue;
$color-5: #e94b35;

@mixin center($xy:xy) {
  @if $xy == xy {
    left: 50%;
    top: 50%;
    bottom: auto;
    right: auto;
    transform: translateX(-50%) translateY(-50%);
  }
  @else if $xy == x {
    left: 50%;
    right: auto;
    transform: translateX(-50%);
  }
  @else if $xy == y {
    top: 50%;
    bottom: auto;
    transform: translateY(-50%);
  }
}
$S:     480px;   
$M:     768px;     
$L:     1170px;     

// media queries

@mixin MQ($canvas) {
  @if $canvas == S {
   @media only screen and (min-width: $S) { @content; } 
  }
  @else if $canvas == M {
   @media only screen and (min-width: $M) { @content; } 
  }
  @else if $canvas == L {
   @media only screen and (min-width: $L) { @content; } 
  }
}

// super light grid system

@mixin column($percentage, $float-direction:left) {
  width: 100% * $percentage;
  float: $float-direction;
}

@mixin clearfix {
  &::after {
    clear: both;
    content: "";
    display: block;
  }
}
html{font-family: roboto, sans-serif;}

.cd-add-to-cart {

  display: inline-block;
  padding: 1.2em 1.8em;
  background: $color-2;
  border-radius: 50em;
  text-transform: uppercase;
  color: $color-3;
  font-weight: 700;
  letter-spacing: .1em;
  box-shadow: 0 2px 10px rgba(#000, .2);
  transition: all .2s;

  &:hover {
    background: lighten($color-2, 5%);
  }

  &:active {
    transform: scale(.9);
  }
}

/* -------------------------------- 

Main Components 

-------------------------------- */

.cd-cart-container::before {
  /* dark bg layer visible when the cart is open */
  content: '';
  position: fixed;
  z-index: 1;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background: rgba(#000, .5);
  opacity: 0;
  visibility: hidden;
  transition: opacity .4s, visibility .4s;
}

.cd-cart-container.cart-open::before {
  opacity: 1;
  visibility: visible;
}

.cd-cart-trigger,
.cd-cart {
  position: fixed;
  bottom: 20px;
  right: 5%;
  transition: transform .2s;
  /* Force Hardware Acceleration in WebKit */
  transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  will-change: transform;
  backface-visibility: hidden;

  .empty & {
    /* hide cart */
    transform: translateY(150px);
  }

  @include MQ(L) {
    bottom: 40px;
  }
}

.cd-cart-trigger {
  /* button that triggers the cart content */
  z-index: 3;
  height: 72px;
  width: 72px;
  /* replace text with image */
  text-indent: 100%;
  color: transparent;
  white-space: nowrap;

  &::after, &::before {
    /* used to create the cart/'X' icon */
    content: '';
    position: absolute;
    @include center;
    height: 100%;
    width: 100%;
    background: url(cd-icons-cart-close.svg) no-repeat 0 0;
    transition: opacity .2s, transform .2s;
  }

  &::after {
    /* 'X' icon */
    background-position: -72px 0;
    opacity: 0;
    transform: translateX(-50%) translateY(-50%) rotate(90deg);
  }

  .cart-open &::before {
    opacity: 0;
  }

  .cart-open &::after {
    opacity: 1;
    transform: translateX(-50%) translateY(-50%);
  }

  .count {
    /* number of items indicator */
    position: absolute;
    top: -10px;
    right: -10px;
    height: 28px;
    width: 28px;
    background: $color-5;
    color: $color-3;
    font-size: 1.5rem;
    font-weight: bold;
    border-radius: 50%;
    text-indent: 0;
    transition: transform .2s .5s;
    padding: 0;
    margin: 0;  
    font-family: monospace;
    font-size: 19px;  
    
    #count-cart{
      list-style: none;
    }
    
    li {
      /* this is the number of items in the cart */
      position: absolute;
      transform: translateZ(0);
      @include center;

      // &:last-of-type {
      //   visibility: hidden;
      // }
    }

    &.update-count li:last-of-type {
      animation: cd-qty-enter .15s;
      animation-direction: forwards;
    }

    &.update-count li:first-of-type {
      animation: cd-qty-leave .15s;
      animation-direction: forwards;
    }
  }

  .cart-open & .count {
    transition: transform .2s 0s;
    transform: scale(0);
  }

  .empty & .count {
    /* fix bug - when cart is empty, do not animate count */
    transform: scale(1);
  }

  &:hover + div .wrapper {
    box-shadow: 0 6px 40px rgba(#000, .3);
  }

  .cart-open &:hover + div .wrapper {
    box-shadow: 0 4px 30px rgba(#000, .17);
  }
}

.cd-cart {
  /* cart content */
  z-index: 2;
  width: 90%;
  // max-width: 440px;
  height: 400px;
  max-height: 90%;
  pointer-events: none;

  .wrapper {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 2;
    overflow: hidden;
    height: 72px;
    width: 72px;
    border-radius: 6px;
    transition: height .4s .1s, width  .4s .1s, box-shadow .3s;
    transition-timing-function: cubic-bezier(.67,.17,.32,.95);
    background: $color-3;
    box-shadow: 0 4px 30px rgba(#000, .17);
    pointer-events: auto;
  } 

  header, footer {
    position: absolute;
    z-index: 2;
    left: 0;
    width: 100%;
  }

  header, .body {
    opacity: 0;
  }

  header {
    top: 0;
    border-radius: 6px 6px 0 0;
    padding: 0 1.4em;
    height: 0px;
    line-height: 0px;
    background-color: $color-3;
    transition: opacity .2s 0s;
    border-bottom: 1px solid shade($color-3, 10%);
    @include clearfix;
  }

  footer {
    bottom: 0;
    border-radius: 0 0 6px 6px;
    box-shadow: 0 -2px 20px rgba(#000, .15);
    background: $color-3;
  }

  h2 {
    text-transform: uppercase;
    display: inline-block;
    font-size: 1.4rem;
    font-weight: 700;
    letter-spacing: .1em;
  }

  .undo {
    float: right;
    font-size: 1.2rem;
    opacity: 0;
    visibility: hidden;
    transition: opacity .2s, visibility .2s;
    color: tint($color-1, 40%);

    a {
      text-decoration: underline;
      color: $color-1;

      &:hover {
        color: $color-2;
      }
    }

    &.visible {
      opacity: 1;
      visibility: visible;
    }
  }

  .checkout {
    display: block;
    height: 72px;
    line-height: 72px;
    margin-right: 72px;
    background: $color-2;
    color: rgba($color-3, 0);
    text-align: center;
    font-size: 1.8rem;
    font-weight: 600;
    transition: all .2s 0s;

    &:hover {
      background: lighten($color-2, 3%);
    }

    em {
      position: relative;
      display: inline-block;
      transform: translateX(40px);
      transition: transform 0s .2s;
    }

    em::after {
      position: absolute;
      @include center(y);
      right: 0;
      content: '';
      height: 24px;
      width: 24px;
      background: url(cd-icon-arrow-next.svg) no-repeat center center;
      opacity: 0;
      transition: opacity .2s;
    }
  }

  .body {
    position: relative;
    z-index: 1;
    height: calc(100% - 40px);
    padding: 0px 0 0px;
    margin: 8px 8px 80px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    transition: opacity .2s;

    ul {
      overflow: hidden;
      padding: 0 1.4em;
      position: relative;
      padding-bottom: 90px;
    }

    li {
      position: relative;
      @include clearfix;
      opacity: 0;
      transform: translateX(80px);
      transition: opacity 0s .2s, transform 0s .2s;

      &:not(:last-of-type) {
        margin-bottom: 20px;
      }

      &.deleted {
        /* this class is added to an item when it is removed form the cart */
        position: absolute;
        left: 1.4em;
        width: calc(100% - 2.8em); 
        opacity: 0;
        animation: cd-item-slide-out .3s forwards;

        &.undo-deleted {
          /* used to reinsert an item deleted from the cart when user clicks 'Undo' */
          animation: cd-item-slide-in .3s forwards;
        }
      }

      &.deleted + li {
        animation: cd-item-move-up-mobile .3s;
        animation-fill-mode: forwards;
      }

      &.undo-deleted + li {
        animation: cd-item-move-down-mobile .3s;
        animation-fill-mode: forwards;
      }
    }
  }

  .product-image {
    display: inline-block;
    float: left;
    /* the image height determines the height of the list item - in this case height = width */
    width: 50px;

    img {
      display: block;
      max-width: 100%;
    }
  }

  .product-details {
    position: relative;
    display: inline-block;
    float: right;
    width: calc( 100% - 50px);
    padding: 0.3em 0 0 0.5em;
    @include clearfix;
  }

  h3, .price {
    font-weight: bold;
  }

  h3 {
    width: 70%;
    float: left;
    /* truncate title with dots if too long */
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    a {
      color: $color-1;

      &:hover {
        color: $color-2;
      }
    }
  }

  .price {
    float: right;
    width: 30%;
    text-align: right;
  }

  .actions {
    font-size: 1.4rem;
    height: 1.6em;
    line-height: 1.6em;
    @include clearfix;
  }

  .delete-item, .quantity {
    float: left;
    color: tint($color-1, 40%);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  } 

  .delete-item {
    margin-right: 1em;

    &:hover {
      color: $color-5;
    }
  }

  .quantity label {
    display: inline-block;
    margin-right: .3em;
  }

  .select {
    position: relative;
  }

  .select::after {
    /* switcher arrow for select element */
    content: '';
    position: absolute;
    z-index: 1;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    display: block;
    width: 12px;
    height: 12px;
    background: url(cd-icon-select.svg) no-repeat center center;
    pointer-events: none;
  }

  select {
    position: relative;
    padding: 0 1em 0 0;
    cursor: pointer;
    appearance: none;
    background: transparent;
    border: none;
    border-radius: 0;
    font-size: 1.4rem;
    margin: 0;
    color: tint($color-1, 40%);

    &:focus {
      outline: none;
      color: $color-1;
      box-shadow: 0 1px 0 currentColor;
    }
  }

  select::-ms-expand {
    /* hide default select arrow on IE */
        display: none;
  }
  
  .cart-open & .wrapper {
    height: 100%;
    width: 100%;
    transition-delay: 0s;
  }

  .cart-open & header, 
  .cart-open & .body {
    opacity: 1;
  }

  .cart-open & header {
    transition: opacity .2s .2s;
  }
  
  .cart-open & .body {
    transition: opacity 0s;
    
    li {
      transition: transform .3s .2s, opacity .3s .2s;
      opacity: 1;
      transform: translateX(0);

      &:nth-of-type(2) {
        transition-duration: .4s;
      }

      &:nth-of-type(3) {
        transition-duration: .5s;
      }

      &:nth-of-type(4),
      &:nth-of-type(5) {
        transition-duration: .55s;
      }
    }
  }

  .cart-open & .checkout {
    color: $color-3;
    transition: color .2s .3s;

    em {
      transform: translateX(0);
      transition: transform .2s .3s, padding .2s 0s;
    }

    &:hover em {
      padding-right: 30px;
      
      &::after {
        opacity: 1;
      }
    }
  }
}

@keyframes cd-qty-enter {
    0% {
        opacity: 0;
        visibility: hidden;
        transform: translateX(-50%) translateY(0);
    }
    100% {
        opacity: 1;
        visibility: visible;
        transform: translateX(-50%) translateY(-50%);
    }
}

@keyframes cd-qty-leave {
    0% {
        opacity: 1;
        visibility: visible;
        transform: translateX(-50%) translateY(-50%);
    }
    100% {
        opacity: 0;
        visibility: hidden;
        transform: translateX(-50%) translateY(-100%);
    }
}

@keyframes cd-item-move-up-mobile {
    0% {
        padding-top: 70px;
    }
    100% {
        padding-top: 0px;
    }
}

@keyframes cd-item-move-up {
    0% {
        padding-top: 104px;
    }
    100% {
        padding-top: 0px;
    }
}

@keyframes cd-item-move-down-mobile {
    0% {
        padding-top: 0px;
    }
    100% {
        padding-top: 70px;
    }
}

@keyframes cd-item-move-down {
    0% {
        padding-top: 0px;
    }
    100% {
        padding-top: 104px;
    }
}

@keyframes cd-item-slide-out {
    0% {
        transform: translateX(0);
        opacity: 1;
    }
     100% {
        transform: translateX(80px);
        opacity: 0;
    }
}

@keyframes cd-item-slide-in {
    100% {
        transform: translateX(0);
        opacity: 1;
    }
    0% {
        transform: translateX(80px);
        opacity: 0;
    }
}



#basket_container {
  width: 760px;
  margin: 20px auto;
  .products {
    .box {
      width: 230px;
      background-color: #fff;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
      display: inline-block;
      margin: 0 10px;
      position: relative;
      img {
        width: 230px;
      }
      i {
        width: 50px;
        height: 50px;
        background: #ED277F;
        color: #ffffff;
        border-radius: 25px;
        text-align: center;
        line-height: 50px;
        font-size: 1.4rem;
        position: absolute;
        right: 20px;
        top: 150px;
        box-shadow: 0 0 4px 2px rgba(80, 80, 80, 0.1);
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
          transform: scale(1.05);
        }
      }
      h2 {
        margin-left: 20px;
      }
      p {
        margin-left: 20px;
      }
    }
  }
  .basket {
    margin-top: 50px;
    overflow: hidden;
    .basket__head {
      width: 100%;
      border-bottom: 1px solid #BFBFBF;
      height: 40px;
      display: block;
      h3 {
        display: inline-block;
        line-height: 40px;
        margin: 0;
      }
      .cart__head--price {
        display: inline-block;
        color: #777777;
        margin-left: 200px;
        line-height: 40px;
      }
      .cart__head--quantity {
        display: inline-block;
        color: #777777;
        margin-left: 100px;
        line-height: 40px;
      }
      .cart__head--total {
        display: inline-block;
        color: #777777;
        line-height: 40px;
        float: right;
      }
    }
    h5 {
      font-size: 1.2rem;
      text-align : right;
    }
  }
}

</style>
