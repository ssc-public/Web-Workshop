import React, { Component } from 'react'

import FoodCard from '../food/FoodCard'

class ResturantPage extends Component {
    render() {
        return (
            <div className="container">
                <FoodCard />
                <FoodCard />
                <FoodCard />
            </div>
        )
    }
}

export default ResturantPage