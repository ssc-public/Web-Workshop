import React, { Component } from 'react'

import FoodCard from '../food/FoodCard'

import resturantImage from '../../static/images/resturant.jpeg'
import ResturantInfo from './ResturantInfo'
import Foods from '../food/Foods'

class ResturantPage extends Component {
    render() {
        return (
            <div className="resturant">
                <img src={resturantImage} height="auto" width="100%" />
                <ResturantInfo />
                <div className="layout">

                    <Foods />
                </div>

            </div>
        )
    }
}

export default ResturantPage