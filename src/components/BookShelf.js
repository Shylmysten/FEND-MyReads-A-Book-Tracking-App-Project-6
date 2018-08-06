import React from 'react'
import BookGrid from './BookGrid'

class BookShelf extends React.Component {

  render() {

    return (
      <div className="bookshelf">

          <h2 className="bookshelf-title">{this.props.title}</h2>


        <div className="bookshelf-books">
          <BookGrid
            books={this.props.books}
            handleChange={this.props.handleChange}
          />
        </div>
      </div>
    )
  }

}

export default BookShelf
