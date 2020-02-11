import React, { Component } from 'react'

class Rating extends Component {
    getStars = rate => {
        const arr = [0, 1, 2, 3, 4]
        const jsx = arr.map(e => {
            if (rate >= 1) {
                rate -= 1
                return <span className="fa fa-star checked" key={e}></span>
            }
            return <span className="fa fa-star" key={e}></span>
        })
        return <React.Fragment>{jsx}</React.Fragment>
    }



    render() {
        return (
            <div className="justify-content-center  mt-3 d-flex flex-row align-items-center">
                <div className="d-flex flex-row-reverse m-2">
                    {this.getStars(this.props.rate)}
                </div>
                <div style={{ color: 'orange' }}>{this.props.rate}</div>
            </div>
        )
    }

}

export default Rating