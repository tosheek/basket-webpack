<template>
  
  <div class="basket-row">
    <img v-bind:src="buy_data.img"/>
    <h4 class="basket-row__item">{{buy_data.title}}</h4>
    <div class="basket-row__item qty-minus" v-on:click="minusQty(buy_data)">-</div>
    <div class="basket-row__item qty">{{buy_data.qty}}</div>
    <div class="basket-row__item qty-plus" v-on:click="plusQty(buy_data)">+</div>
    <div class="basket-row__item del" v-on:click="removeItem(buy_data);" title="Удалить">&times;</div>
    <div class="basket-row__item totalprice">{{buy_data.total}} ₽</div>
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

#basket-container {
  // max-width: 760px;
  margin: 20px auto;
}

.basket-block {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .basket-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 10px 0;
        border-bottom: 1px solid #ccc;
        &:first-child{
            border-top: 1px solid #ccc;
            }
        &:last-child{
            padding-bottom: 50px;
            border-bottom: 0;
        }
        img {
            height: 30px;
            float: left;
            @include MQ(M) {
              height: 50px;
            }      
            @include MQ(L) {
              height: 100px;
            }      
        }
        .basket-row__item{
            flex: 1;
            text-align: center;
        }
        .basket-row__item.qty{
            flex: 0;  
        }

        h4.basket-row__item {
            flex: 2;
            margin: 0;
            margin-left: 20px;
            text-align: left;      
        }

        .qty-minus,
        .qty-plus,
        .del {
            cursor: pointer;
            font-size: 2rem;
        }
        .del {
            color: $color-5;
        }
      
    }

    .basket-block__total{
        text-align: right;
    }

}

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
