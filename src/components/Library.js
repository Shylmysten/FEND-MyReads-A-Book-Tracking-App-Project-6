import React from 'react'
import BookCase from './BookCase'


class Library extends React.Component {

  render() {
    return (
      <div>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <BookCase shelves={this.props.shelves}
              handleChange={this.props.handleChange.bind(this)}
            />
          </div>
          <button className="open-search">
            <a onClick={this.props.openSearch}>Add a book</a>
          </button>
        </div>
      </div>
    )
  }
}

export default Library
