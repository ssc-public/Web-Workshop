import React, { Component, Fragment } from 'react'

import ResturantCard from '../resturant/ResturantCard'

class Home extends Component {
    state = {
        resturants: []
    }

    componentDidMount() {

    }


    render() {
        return (
            <Fragment>
                {this.state.resturants.map(resturant => <ResturantCard resturant={resturant} key={resturant.id} />)}
            </Fragment>
        )
    }
}

export default Home