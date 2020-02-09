import React, { Component } from 'react'

import pizzaImg from '../../static/images/pizza.jfif'

class FoodCard extends Component {
    render() {
        return (
            <div className="card mt-5 text-right food-card" >
                <img className="card-img-top" src={pizzaImg} alt="Card cap" height="auto" />
                <div className="card-body">
                    <h5 className="card-title">پیتزا پپرونی</h5>
                    <p className="card-text text-muted">تخم مرغ، سوسیس پنیری، سس گوجه، زیتون سیاه، روکولا، فلفل دلمه ای، پنیر گودا، پنیر موزارلا</p>
                </div>
            </div >
        )
    }
}

export default FoodCard