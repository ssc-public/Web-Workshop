import React, { Component } from 'react'
import FoodCard from './FoodCard'


class Foods extends Component {
    render() {
        return (
            <div className="foods">
                <h3 className="text-right"><strong>پیتزا</strong></h3>
                <div className="row justify-content-between">
                    {/* <FoodCard className="col-md-6" />
                    <FoodCard className="col-md-6" />
                    <FoodCard className="col-md-6" />
                    <FoodCard className="col-md-6" /> */}
                    <div className="col-md-6">
                        <FoodCard />
                    </div>
                    <div className="col-md-6">
                        <FoodCard />
                    </div>
                    <div className="col-md-6">
                        <FoodCard />
                    </div>
                </div>
            </div>


        )
    }
}

export default Foods