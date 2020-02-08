import React, { Component } from 'react'

class ResturantInfo extends Component {
    render() {
        return (
            <div className="resturant-info">
                <h1 className="text-center">پیتزا هات (شعبه سعادت آباد)</h1>
                <div className="justify-content-center  mt-3 d-flex flex-row align-items-center">
                    <div className="text-muted">(57)</div>
                    <div className="d-flex flex-row-reverse m-2">
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                    </div>
                    <div style={{ color: 'orange' }}>3.1</div>
                </div>
                <h5 className="text-center m-3">فست فود . پیتزا . برگر</h5>
                <h6 className="text-center text-muted m-3">تهران، سعادت آباد، پاساژ میلاد نور، طبقه همکف</h6>
                <hr />
            </div>
        )
    }
}

export default ResturantInfo