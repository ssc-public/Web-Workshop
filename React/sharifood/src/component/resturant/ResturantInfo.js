import React, { Component } from 'react'
import Rating from '../common/Rating'

class ResturantInfo extends Component {
    render() {
        return (
            <div className="resturant-info">
                <h1 className="text-center">پیتزا هات (شعبه سعادت آباد)</h1>
                <Rating />
                <h5 className="text-center m-3">فست فود . پیتزا . برگر</h5>
                <h6 className="text-center text-muted m-3">تهران، سعادت آباد، پاساژ میلاد نور، طبقه همکف</h6>
                <hr />
            </div>
        )
    }
}

export default ResturantInfo