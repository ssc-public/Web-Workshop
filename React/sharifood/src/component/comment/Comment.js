import React, { Component } from 'react'
import Rating from '../common/Rating'

class Comment extends Component {
    render() {
        return (
            <div className="comment mt-5">
                <div className="d-flex flex-row justify-content-between align-items-center">
                    <h6>{this.props.comment.owner}</h6>
                    <Rating rate={this.props.comment.rating} />
                </div>
                <p className="text-muted text-right mt-4 mb-2">{this.props.comment.content}</p>
                <hr />
            </div>
        )
    }

}

export default Comment