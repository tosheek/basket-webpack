<template>
  
  <div class="basket-row">
    <img v-bind:src="buy_data.img"/>
    <h4 class="basket-row__item">{{buy_data.title}} {{buy_data.qty}}шт. за {{buy_data.total}} ₽</h4>
  </div>

</template>


<script>
export default {
  props: ["buy_data", "basket_items"],
  methods: {    
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
  max-width: 760px;
  margin: 20px auto;
}

.basket-block {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;    
    justify-content: space-between;

    .basket-row {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px 0;
        

        img {
            height: 100px;
            text-align: center;
            margin: 5px;
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
        h4.basket-row__item {
            flex: 2;
            margin: 0;
            text-align: center;    
        }
    }

    .basket-block__total{
        text-align: right;
    }

}

</style>
