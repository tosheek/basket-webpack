<template>
  <div class="basket_row">
    <img v-bind:src="buy_data.img"/>
    <h4>{{buy_data.title}}</h4>
    <p>{{buy_data.price}} р.</p>
    <div class="qty-minus" v-on:click="minusQty(buy_data)">-</div>
    <div class="qty">{{buy_data.qty}}</div>
    <div class="qty-plus" v-on:click="plusQty(buy_data)">+</div>
    <div class="del" v-on:click="removeItem(buy_data)">Удалить</div>
    <div class="totalprice">{{buy_data.total}} р.</div>
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
html, body {
  background-color: #eee;
  font-family: calibri, sans-serif;
}

#basket_container {
  width: 760px;
  margin: 20px auto;

  .basket, .cd-cart-container .cd-cart .body {
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
        height: 100px;
        float: left;
      }
      h4 {
        float: left;
        margin: 0;
        line-height: 100px;
        margin-left: 20px;
        width: 100px;
      }
      p {
        float: left;
        margin: 0;
        width: 80px;
        line-height: 100px;
        margin-left: 35px;
        text-align: center;
      }
      .qty-minus {
        float: left;
        width: 20px;
        line-height: 100px;
        margin-left: 60px;
        text-align: center;
        cursor: pointer;
      }
      .qty {
        float: left;
        width: 20px;
        line-height: 100px;
        margin-left: 20px;
        text-align: center;
      }
      .qty-plus {
        float: left;
        width: 20px;
        line-height: 100px;
        margin-left: 20px;
        text-align: center;
        cursor: pointer;
      }
      .del {
        float: left;
        width: 80px;
        line-height: 100px;
        margin-left: 60px;
        cursor: pointer;
        text-decoration: underline;
        color: #ED277F;
      }
      .totalprice {
        float: left;
        width: 80px;
        line-height: 100px;
        margin-left: 10px;
        text-align: right;
      }
      
    }
  }
}

</style>
