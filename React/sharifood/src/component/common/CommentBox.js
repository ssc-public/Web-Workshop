import React, { Component } from 'react'

import Rating from './Rating'

class CommentBox extends Component {
    render() {
        return (
            <div className="mt-5 text-right">
                <h5 className="mr-3">نظرات کاربران در مورد پیتزا هات</h5>
                <hr />
                <p className="text-muted">
                    <small>
                        شما هم می‌توانید بعد از سفارش از این رستوران، نظر خود را درباره‌ی این رستوران ثبت کنید
                    </small>
                </p>
                <div style={{ zoom: '140%' }}>
                    <Rating rate="3.1" />
                </div>
                <hr />
                <div className="container mt-4" style={{ width: "70%" }}>
                    <div className="row d-flex justify-content-between">
                        <div className="text-muted">کیفیف غذا</div>
                        <div className="progress d-flex flex-row-reverse rounded-pill mt-2" style={{ width: "50%", zoom: "60%" }}>
                            <div className="progress-bar bg-warning" role="progressbar" style={{ width: "40%" }} aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                    <hr />
                    <div className="row d-flex justify-content-between">
                        <div className="text-muted">کیفیف بسته بندی</div>
                        <div className="progress d-flex flex-row-reverse rounded-pill mt-2" style={{ width: "50%", zoom: "60%" }}>
                            <div className="progress-bar bg-warning" role="progressbar" style={{ width: "50%" }} aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                    <hr />
                    <div className="row d-flex justify-content-between">
                        <div className="text-muted">سرعت ارسال پیک</div>
                        <div className="progress d-flex flex-row-reverse rounded-pill mt-2" style={{ width: "50%", zoom: "60%" }}>
                            <div className="progress-bar bg-warning" role="progressbar" style={{ width: "70%" }} aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                    <hr />
                    <div className="row d-flex justify-content-between">
                        <div className="text-muted">برخورد پیک</div>
                        <div className="progress d-flex flex-row-reverse rounded-pill mt-2" style={{ width: "50%", zoom: "60%" }}>
                            <div className="progress-bar bg-warning" role="progressbar" style={{ width: "90%" }} aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                    <hr />
                </div>


            </div>
        )
    }

}

export default CommentBox