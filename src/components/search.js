import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookGrid from './BookGrid'

class Search extends Component {
  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  render() {

    const books = Object.keys(this.props.shelves).map(key => this.props.shelves[key])

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search">
            <Link to='/'>Close</Link>
          </button>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          {/* <BookGrid books={this.props.books} /> */}
        {JSON.stringify(this.state)}
        </div>
      </div>

    )
  }
}

export default Search
