import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookGrid from './BookGrid'


class Search extends Component {


  render() {

    const { shelves, query, searchResults } = this.props
    const books = searchResults


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
