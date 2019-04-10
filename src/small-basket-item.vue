<template>
  
  <div class="small-basket-row">
    <img v-bind:src="buy_data.img"/>
    <h4 class="small-basket-row__item">{{buy_data.title}}</h4>
    <div class="small-basket-row__item qty-minus" v-on:click="minusQty(buy_data)">-</div>
    <div class="small-basket-row__item qty">{{buy_data.qty}}</div>
    <div class="small-basket-row__item qty-plus" v-on:click="plusQty(buy_data)">+</div>
    <div class="small-basket-row__item totalprice"><nobr>{{buy_data.total}} ₽</nobr></div>
    <div class="small-basket-row__item del" v-on:click="removeItem(buy_data)" title="Удалить">&times;</div>    
  </div>

</template>


<script>
export default {
  props: ["buy_data", "basket_items"],
  methods: {
    removeItem(buy_data) {
      this.$parent.ymCustom('remove_from_cart');

      var index = this.$parent.basket_items.indexOf(buy_data);
      this.$parent.basket_items.splice(index, 1);
      
      this.$parent.save();
    },
    plusQty(buy_data){
      buy_data.qty += 1;
      buy_data.total = buy_data.qty*buy_data.price;
     
      this.$parent.save();
    },
    minusQty(buy_data){
      buy_data.qty -= 1;
      if (buy_data.qty < 0){
        buy_data.qty = 0;
      }
      buy_data.total = buy_data.qty*buy_data.price;

      if (buy_data.qty == 0) 
        this.removeItem(buy_data);

      this.$parent.save();
    }
    
  }
}
</script>

<style lang="scss">

$color-2: #333;
$color-3: #fff;
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

.small-basket-container .small-basket-block .body {
    .small-basket-row  {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        padding: 10px 0;
        border-bottom: 1px solid #ccc;


        img {
            height: 30px;
            float: left;
            @include MQ(M) {
              height: 50px;
            }      
            @include MQ(L) {
              height: 70px;
            }      
        }
        .small-basket-row__item{
            flex: 1;
            text-align: center;
        }
        .small-basket-row__item.qty{
            flex: 0;  
        }

        h4.small-basket-row__item {
            flex: 2;
            margin: 0;
            margin-left: 20px;
        }

        .qty-minus,
        .qty-plus,
        .del {
            cursor: pointer;
        }
        .del {
            color: $color-5;
        }
    }
    .small-basket-total{
        text-align: right;
        padding: 10px 40px 150px;
        font-size: 20px;
        font-weight: 600;
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
.small-basket-container{
  z-index: 6;
    .small-basket-overlay{
      z-index: 5;
        /* dark bg layer visible when the cart is open */
      position: fixed;
      height: 100vh;
      width: 100vw;
      top: 0;
      left: 0;
      background: rgba(#000, .5);
      opacity: 0;
      visibility: hidden;
      transition: opacity .4s, visibility .4s;
    }
    &.cart-open .small-basket-overlay{
      opacity: 1;
      visibility: visible;  
    }  
}

// .small-basket-container::before {
//   /* dark bg layer visible when the cart is open */
//   content: '';
//   position: fixed;
//   z-index: 1;
//   height: 100vh;
//   width: 100vw;
//   top: 0;
//   left: 0;
//   background: rgba(#000, .5);
//   opacity: 0;
//   visibility: hidden;
//   transition: opacity .4s, visibility .4s;
// }

// .small-basket-container.cart-open::before {
//   opacity: 1;
//   visibility: visible;
// }

.small-basket-trigger,
.small-basket-block {
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

.small-basket-trigger {
  /* button that triggers the cart content */
  z-index: 8;
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
    transition: opacity .1s, transform .2s;
  }

  &::after {
    /* 'X' icon */
    background-position: -72px 0;
    opacity: 0;
    transform: translateX(-50%) translateY(-50%) rotate(90deg);
  }

  .small-basket-count {
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
    
    >li {
      /* this is the number of items in the cart */
      position: absolute;
      transform: translateZ(0);
      list-style: none;
      @include center;
    }
  }

  .cart-open &::before {
    opacity: 0;
  }

  .cart-open &::after {
    opacity: 1;
    transform: translateX(-50%) translateY(-50%);
  }  

  .cart-open & .small-basket-count {
    transition: transform .2s 0s;
    transform: scale(0);
  }

  .empty & .small-basket-count {
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

.small-basket-block {
  /* cart content */
  z-index: 7;
  width: 90%;
  max-width: 440px;
  height: 400px;
  max-height: 90%;
  pointer-events: none;

  .wrapper {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 7;
    overflow: hidden;
    height: 72px;
    width: 72px;
    border-radius: 6px;
    transition: height .1s .0s, width  .1s .0s, box-shadow .1s;
    // transition-timing-function: cubic-bezier(.67,.17,.32,.95);
    background: $color-3;
    box-shadow: 0 4px 30px rgba(#000, .17);
    pointer-events: auto;
  } 

  header, footer {
    position: absolute;
    z-index: 7;
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
    z-index: 6;
    height: calc(100% - 40px);
    padding: 0px 0 0px;
    margin: 8px 8px 80px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    transition: opacity .2s;
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

// @keyframes cd-qty-enter {
//     0% {
//         opacity: 0;
//         visibility: hidden;
//         transform: translateX(-50%) translateY(0);
//     }
//     100% {
//         opacity: 1;
//         visibility: visible;
//         transform: translateX(-50%) translateY(-50%);
//     }
// }

// @keyframes cd-qty-leave {
//     0% {
//         opacity: 1;
//         visibility: visible;
//         transform: translateX(-50%) translateY(-50%);
//     }
//     100% {
//         opacity: 0;
//         visibility: hidden;
//         transform: translateX(-50%) translateY(-100%);
//     }
// }

// @keyframes cd-item-move-up-mobile {
//     0% {
//         padding-top: 70px;
//     }
//     100% {
//         padding-top: 0px;
//     }
// }

// @keyframes cd-item-move-up {
//     0% {
//         padding-top: 104px;
//     }
//     100% {
//         padding-top: 0px;
//     }
// }

// @keyframes cd-item-move-down-mobile {
//     0% {
//         padding-top: 0px;
//     }
//     100% {
//         padding-top: 70px;
//     }
// }

// @keyframes cd-item-move-down {
//     0% {
//         padding-top: 0px;
//     }
//     100% {
//         padding-top: 104px;
//     }
// }

// @keyframes cd-item-slide-out {
//     0% {
//         transform: translateX(0);
//         opacity: 1;
//     }
//      100% {
//         transform: translateX(80px);
//         opacity: 0;
//     }
// }

// @keyframes cd-item-slide-in {
//     100% {
//         transform: translateX(0);
//         opacity: 1;
//     }
//     0% {
//         transform: translateX(80px);
//         opacity: 0;
//     }
// }

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

</style>
