import React, { Component } from 'react'

class Search extends Component {
    render() {
        return (
            <form className="md-form active-pink active-pink-2 mb-3 search">
                <input className="form-control" type="text" placeholder="جستجو در منوی این رستوران" aria-label="Search" />
            </form>
        )
    }

}

export default Search