import React, { Component } from 'react'

import resturantImage from '../../static/images/resturant.jpeg'
import ResturantInfo from './ResturantInfo'
import Foods from '../food/Foods'
import Comments from '../common/Comments'
import CommentBox from '../common/CommentBox'
import Search from '../common/Search'

class ResturantPage extends Component {
    render() {
        return (
            <div className="resturant">
                <div className="resturant-img"></div>
                <ResturantInfo />
                <div className="layout mt-5">
                    <Search />
                    <Foods />
                    <CommentBox />
                    <Comments />
                </div>

            </div>
        )
    }
}

export default ResturantPage