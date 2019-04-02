<template>
  
  <div class="basket_row">
    <img v-bind:src="buy_data.img"/>
    <h4>{{buy_data.title}}</h4>
    <div class="qty-minus" v-on:click="minusQty(buy_data)">-</div>
    <div class="qty">{{buy_data.qty}}</div>
    <div class="qty-plus" v-on:click="plusQty(buy_data)">+</div>
    <div class="totalprice">{{buy_data.total}} р.</div>
    <div class="del" v-on:click="removeItem(buy_data)" title="Удалить">&times;</div>    
  </div>

</template>


<script>
export default {
  props: ["buy_data", "basket_items"],
  methods: {
    removeItem(buy_data) {
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

<style lang="scss" scoped>
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
  width: 760px;
  margin: 20px auto;
}

.basket-block, 
.small-basket-container .small-basket-block .body {
  .basket_row {
    width: 100%;
    border-bottom: 1px solid #BFBFBF;
    overflow: hidden;
    padding: 10px 0;
    display: block;
    flaot: left;
    &:last-child{
      padding-bottom: 50px;
    }
    img {
      height: 25px;
      float: left;
      @include MQ(M) {
        height: 50px;
      }      
      @include MQ(L) {
        height: 100px;
      }      
    }
    h4 {
      float: left;
      margin: 0;
      line-height: 100px;
      margin-left: 20px;
      width: 100px;
    }
    .qty-minus,.qty,.qty-plus,.del,.totalprice{
      float: left;
      width: 20px;
      text-align: center;
    }
    .qty-minus,.qty,.qty-plus,.del {
      line-height: 100px;
      cursor: pointer;
    }
    .del {
      width: 20px;
      color: #e94b35;
    }
    .totalprice {
      width: 80px;
      line-height: 100px;
    }
    
  }
}

</style>
