import React from 'react'
import BookShelf from './BookShelf'

class BookShelves extends React.Component {
  render() {
        const { shelves } = this.props
    return (
      <div>
        {Object.keys(shelves).map(cur => {

          return <BookShelf key={
            cur === 'currentlyReading'? cur:
            cur === 'wantToRead'? cur:
            cur === 'read'? cur: null
          } title={
            cur === 'currentlyReading'? 'Currently Reading':
            cur === 'wantToRead'? 'Want to Read':
            cur === 'read'? 'Read': null} books={this.props.shelves[cur]}/>
        })}
      </div>
    )
  }



}

export default BookShelves
