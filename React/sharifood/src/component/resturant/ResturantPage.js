import React, { Component } from 'react'

import resturantImage from '../../static/images/resturant.jpeg'
import ResturantInfo from './ResturantInfo'
import Foods from '../food/Foods'
import Comment from '../common/Comment'
import CommentBox from '../common/CommentBox'

class ResturantPage extends Component {
    render() {
        return (
            <div className="resturant">
                <div className="resturant-img"></div>
                <ResturantInfo />
                <div className="layout mt-5">

                    <Foods />
                    <CommentBox />
                    <Comment />
                    <Comment />
                    <Comment />
                </div>

            </div>
        )
    }
}

export default ResturantPage