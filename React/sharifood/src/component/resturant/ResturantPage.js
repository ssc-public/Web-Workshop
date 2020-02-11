import React, { Component } from 'react'

import resturantImage from '../../static/images/resturant.jpeg'
import ResturantInfo from './ResturantInfo'
import Foods from '../food/Foods'
import Comments from '../comment/Comments'
import CommentBox from '../comment/CommentBox'
import Search from '../common/Search'

class ResturantPage extends Component {
    state = {
        foods: []
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="resturant">
                <div className="resturant-img"></div>
                <ResturantInfo />
                <div className="layout mt-5">
                    <Search />
                    <Foods foods={this.state.foods} />
                    <CommentBox />
                    <Comments />
                </div>

            </div>
        )
    }
}

export default ResturantPage