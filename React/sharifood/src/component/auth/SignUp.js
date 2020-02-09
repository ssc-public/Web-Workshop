import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

class SignUp extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        isRegistered: false
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault()
        const { username, email, password } = this.state
        const user = { username, email, password, profile: { bio: " " } }
        this.setState({ ...this.state, isRegistered: true })
        // this.props.register(user)



    }

    render() {
        const { username, email, password } = this.state
        if (this.state.isRegistered)
            return <Redirect to="/signin" />;
        return (
            <div className="background">
                <div style={{ height: "100px" }}></div>
                <div className="container text-right" style={{ maxWidth: "500px" }}>
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={this.onSubmit}>
                                <h2 className="text-center font-up font-bold py-4" style={{ color: "#f53877" }}>ثبت نام در شریف فود</h2>
                                <div className="md-form">
                                    <i className="fa fa-user prefix grey-text m-3"></i>
                                    {/* <label >نام کاربری</label> */}
                                    <input type="text" name="username" value={username} onChange={this.onChange} className="input-border"
                                        placeholder="نام کاربری" />
                                </div>
                                <div className="md-form">
                                    <i className="fa fa-envelope prefix grey-text m-3"></i>
                                    <input type="text" name="email" value={email} onChange={this.onChange} className="input-border" placeholder="ایمیل" />
                                </div>
                                <div className="md-form">
                                    <i className="fa fa-lock prefix grey-text m-3"></i>
                                    <input type="password" name="password" value={password} onChange={this.onChange} className="input-border" placeholder="پسورد" />
                                </div>
                                <br />
                                <div className="text-center">
                                    <button className="btn btn-sm" style={{ backgroundColor: "#f53877", color: "white" }}>ثبت نام</button>
                                </div>
                                <div className="text-center mt-3">
                                    <p>   قبلا ثبت نام کرده اید؟   <Link to="/signin"> <p className="text-info">ورود به شریف فود</p></Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default SignUp