import Vue from 'vue'
// import App from './App.vue'
import basketItem from './basket-item.vue'
import smallBasketItem from './small-basket-item.vue'
import checkoutBasketItem from './checkout-basket-item.vue'

Vue.component("basket-item", basketItem);
Vue.component("small-basket-item", smallBasketItem);
Vue.component("checkout-basket-item", checkoutBasketItem);



var app = new Vue({
	el: "#products-basket-app",
	  data: {
	      basket_items: [],
	      open: false,
	  },
	  // components:{
	  //   basket_item:basket_item
	  // },  
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
	  	ymCustom(eventId){
	  		ym(this.getYmCounter(), 'reachGoal', eventId);	
	  	},
	  	getYmCounter() {
  			const cntrs = (typeof window.Ya !== 'undefined') && window.Ya._metrika.getCounters(); 
  			return (cntrs && cntrs[0] && cntrs[0].id) || null; 
			},
	   addItem(product_data) {
	   		this.ymCustom('add_to_cart');
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
	      this.open = true;
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
});
