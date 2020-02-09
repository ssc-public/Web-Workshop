import React, { Component } from 'react'

import pizzaImg from '../../static/images/pizza.jfif'

class FoodCard extends Component {

    render() {
        return (
            <div className="card mt-5 text-right food-card" >
                <img className="card-img-top" src={pizzaImg} alt="Card cap" height="auto" />
                <div className="card-body">
                    <h5 className="card-title">{this.props.food.name}</h5>
                    <p className="card-text text-muted">{this.props.food.discription}</p>
                </div>
                <div className="row justify-content-around p-3">
                    <button className="btn btn-sm btn-danger">افزودن به سبد خرید</button>
                    <span><strong>{this.props.food.price} تومان</strong></span>
                </div>
            </div >
        )
    }
}

export default FoodCard