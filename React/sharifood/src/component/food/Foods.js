import React, { Component } from 'react'
import FoodCard from './FoodCard'


class Foods extends Component {
    state = {
        foods: [
            {
                id: 1,
                name: "پیتزا پپرونی",
                discription: "تخم مرغ، سوسیس پنیری، سس گوجه، زیتون سیاه، روکولا، فلفل دلمه ای، پنیر گودا",
                price: 27000,
            },
            {
                id: 2,
                name: "سالاد مخصوص",
                discription: "کاهو، جعفری، گردو، زیتون سبز، گوجه گیلاسی، سس مخصوص",
                price: 18000,
            },
            {
                id: 3,
                name: "سالاد سزار",
                discription: "100 کاهو پیچ، نان تست شده، پنیر پارمزان، زیتون اسلایسی، سس سزار مخصوص",
                price: 20000,
            },
            {
                id: 4,
                name: "پیتزا آروستو",
                discription: "رست بیف، قارچ، زیتون سیاه، سس خامه، پنیر مخصوص پرپروک",
                price: 37000,
            }
        ]
    }

    render() {
        return (
            <div className="foods">
                <h3 className="text-right"><strong>پیتزا</strong></h3>
                <div className="row justify-content-between">
                    {this.state.foods.map(food => (
                        <div className="col-md-6" key={food.id}>
                            <FoodCard food={food} />
                        </div>
                    ))}
                </div>
            </div>


        )
    }
}

export default Foods