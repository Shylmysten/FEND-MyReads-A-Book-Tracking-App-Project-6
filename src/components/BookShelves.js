import React from 'react'
import BookShelf from './BookShelf'

class BookShelves extends React.Component {
  render() {
        const { shelves } = this.props
    return (
      <div>
        {Object.keys(shelves).map(cur => {
          cur === 'currentlyReading'? 'Currently Reading':
          cur === 'wantToRead'? 'Want to Read':
          cur === 'read'? 'Read': null;
          return <BookShelf key={cur} title={
            cur === 'currentlyReading'? 'Currently Reading':
            cur === 'wantToRead'? 'Want to Read':
            cur === 'read'? 'Read': null} bookShelf={this.props.shelves[cur]}/>
        })}
      </div>
    )
  }



}

export default BookShelves
