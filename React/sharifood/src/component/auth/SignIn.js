import React, { Component } from 'react'
import { Redirect } from "react-router-dom";

class SignIn extends Component {
    state = {
        username: '',
        password: '',
        email: '',
        newPassword: ''
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault()
        // this.props.login(this.state.username, this.state.password)



    }

    onForgetPasswordSubmit = e => {
        e.preventDefault()
        const { username, email, newPassword } = this.state
        // axios.post(`http://localhost:8000/api/auth/forgetPassword`, { username, email, newPassword })
        //     .then(res => {
        //         console.log('successful')
        //     })
    }


    render() {
        const { username, password, email, newPassword } = this.state
        if (this.props.isAuthenticated)
            return <Redirect to="/" />;

        return (
            <div className="col-md-6 mb-4 container">
                <div className="card">
                    <form className="card-body" onSubmit={this.onSubmit}>
                        <h3 className="text-center default-text py-3"><i className="fa fa-lock"></i> Login</h3>
                        <div className="md-form">
                            <i className="fa fa-envelope prefix grey-text"></i>
                            <label>نام کاربری</label>
                            <input type="text" name="username" value={username} onChange={this.onChange} className="form-control" />
                        </div>
                        <div className="md-form">
                            <i className="fa fa-lock prefix grey-text"></i>
                            <label>پسورد</label>
                            <input type="password" name="password" value={password} onChange={this.onChange} className="form-control" />
                        </div>
                        <br />
                        <div className="text-center">
                            <button className="btn btn-sm btn-info">SignIn</button>
                        </div>
                        <a className="btn btn-sm text-secondary" role="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            forget password?
                            </a>
                    </form>
                    <div className="collapse" id="collapseExample">
                        <form className="container" onSubmit={this.onForgetPasswordSubmit}>
                            <div className="form-group">
                                <input type="email" className="form-control" name="email" value={email} onChange={this.onChange} id="email"
                                    placeholder="Enter email" />
                            </div>
                            <div className="md-form">
                                <i className="fa fa-lock prefix grey-text"></i>
                                <label>Your password</label>
                                <input type="password" name="newPassword" value={newPassword} onChange={this.onChange} className="form-control" />
                            </div>
                            <button type="submit" className="btn btn-sm btn-info mt-2 mb-2">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignIn
