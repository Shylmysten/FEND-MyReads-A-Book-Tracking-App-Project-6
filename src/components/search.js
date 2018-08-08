import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookGrid from './BookGrid'


class Search extends Component {


  render() {

    const { searchResults } = this.props

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search">
            <Link to='/' onClick={()=> this.props.clearQuery()}>Close</Link>
          </button>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.props.query}
              onChange={(e) => this.props.updateQuery(e.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <BookGrid
            books={searchResults}
            handleChange={this.props.handleChange}
          />

        </div>
      </div>

    )
  }
}

export default Search
