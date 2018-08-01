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
              value={this.props.value}
              onChangeHandler={this.handleChange}
            />
          </div>
          <div className="open-search">
            <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Library
