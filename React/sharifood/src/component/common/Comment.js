import React, { Component } from 'react'
import Rating from './Rating'

class Comment extends Component {
    render() {
        return (
            <div className="comment mt-5">
                <div className="d-flex flex-row justify-content-between align-items-center">
                    <h6>فرزاد</h6>
                    <Rating />
                </div>
                <p className="text-muted text-right mt-4 mb-2">سلام امروز غذای من بعد از ۲ساعت از سفارش رسید وبهد هم اینکه به یه آدرس دیگه ارسال شده بود</p>
                <hr />
            </div>
        )
    }

}

export default Comment