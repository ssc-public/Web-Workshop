import React, { Component } from 'react'

import pizzaImg from '../../static/images/pizza.jfif'

class FoodCard extends Component {
    render() {
        return (
            <div class="card mt-5 text-right food-card" style={{
                maxWidth: '18rem'
            }
            }>
                <img class="card-img-top" src={pizzaImg} alt="Card cap" />
                <div class="card-body">
                    <h5 class="card-title">پیتزا پپرونی</h5>
                    <p class="card-text text-muted">تخم مرغ، سوسیس پنیری، سس گوجه، زیتون سیاه، روکولا، فلفل دلمه ای، پنیر گودا، پنیر موزارلا</p>
                </div>
            </div >
        )
    }
}

export default FoodCard