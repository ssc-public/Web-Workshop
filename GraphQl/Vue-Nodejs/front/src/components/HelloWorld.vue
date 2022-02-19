<template>
  <div class="main">
    <div class="row">
      <div class="container">
        <div class="col-md-8 mx-auto">
          <h1>Menu</h1>
          <form >
            <div class="form-group">
              <input type="text" v-model="food" class="form-control" id="title" placeholder="name">
            </div>
            <div class="form-group">
              <input type="text" v-model="price"  class="form-control" id="author" placeholder="price">
            </div>
            <div class="form-group">
              <textarea v-model="description" class="form-control" id="description"  placeholder="description" rows="3"></textarea>
            </div>
            <button @click="createFood" type="button" class="btn btn-secondary btn-lg btn-block">Add Food</button>
          </form>
        </div>
      </div>
    </div>
    
    <div class="row">
      <div class="container mt-4">
        <div v-for="food in foods" :key="food.id">
          <div class="col-md-8 mx-auto">
            <div class="">
                <div class="card">
                  <div class="card-body">
                    Title:{{food.food}}
                    <hr>
                    Author:{{food.price}}
                    Descroption{{food.description}}
                  </div>
                </div>
                
            </div>
          </div>
          <br>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'mainApp',
  data(){
    return{
      foods:'',

      food:'',
      price:'',
      description:''
    }
  },

  apollo:{
    foods:{
      query: gql`
        query {
          foods{
            food,
            price,
            description
          }
        }
      `,
    }
  },

  methods:{
    createFood(){
      this.$apollo.mutate({
        
        mutation: gql`
            mutation createFood($food:String!, $price:String!, $description:String!){
              createFood(food: $food, price: $price, description: $description){
                food,
                price,
                description
              }
            }
          `,
          variables: {
            food: this.food,
            price: this.price,
            description: this.description
          }
      })
      .then(response => {
        this.foods = response.data.createFood
        location.reload()
      })
    },
  }
}
</script>