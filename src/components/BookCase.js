import React from 'react'
import BookShelf from './BookShelf'

class BookCase extends React.Component {
  render() {
        const { shelves } = this.props
    return (
      <div>
        {Object.keys(shelves).map(key => {

          return ( <BookShelf key={
            key === 'currentlyReading'? key:
            key === 'wantToRead'? key:
            key === 'read'? key: null
          } title={
            key === 'currentlyReading'? 'Currently Reading':
            key === 'wantToRead'? 'Want to Read':
            key === 'read'? 'Read': null}
            books={this.props.shelves[key]}
            value={this.props.value}
            handleChange={this.props.handleChange}
          /> )
        })}
      </div>
    )
  }



}

export default BookCase
