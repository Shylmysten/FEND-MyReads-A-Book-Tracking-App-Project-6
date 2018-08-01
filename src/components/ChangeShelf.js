import React from 'react'

class ChangeShelf extends React.Component {




  render() {
    console.log(this.props.book.shelf);
    return (
      <div className="book-shelf-changer">
        <select value={this.props.value}
          onChange={(e) => this.handleChange(e)}>
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
