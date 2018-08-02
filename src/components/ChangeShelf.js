import React from 'react'

class ChangeShelf extends React.Component {





  render() {

    return (
      <div className="book-shelf-changer">
        <select
          defaultValue={this.props.book.shelf}
          onChange={(e) => this.props.handleChange(e, this.props.book)}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }

}
 export default ChangeShelf
