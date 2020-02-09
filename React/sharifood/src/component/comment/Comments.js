import React, { Component } from 'react'
import Comment from './Comment'

class Comments extends Component {
    state = {
        comments: [
            {
                id: 1,
                owner: "فرزاد",
                content: "سلام امروز غذای من بعد از ۲ساعت از سفارش رسید وبهد هم اینکه به یه آدرس دیگه ارسال شده بود",
                rating: 3.1
            },
            {
                id: 2,
                owner: "سیاوش",
                content: "واقعا خوشمزه بود",
                rating: 5
            },
            {
                id: 3,
                owner: "احمد",
                content: "هات داگش کاملا نپخته بود",
                rating: 3
            },
            {
                id: 4,
                owner: "فاطمه",
                content: "هات داگ ويژه خوشمزه بود.",
                rating: 4.1
            }

        ]
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                {this.state.comments.map(comment => <Comment comment={comment} key={comment.id} />)}
            </div>
        )
    }

}

export default Comments