import React from 'react'
import ChangeShelf from './ChangeShelf'

class BookGrid extends React.Component {
  render() {

    const books = this.props.books

    return (
      <div>
        <ol className="books-grid">

          {books.map(book =>

          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url('${book.imageLinks.thumbnail}')` }}></div>
                <ChangeShelf book={book}
                handleChange={this.props.handleChange}
                />
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors}</div>
            </div>
          </li>

        )}
        </ol>
      </div>
    )
  }
}

export default BookGrid
