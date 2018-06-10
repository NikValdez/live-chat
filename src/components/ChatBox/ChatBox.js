import React from 'react'
import './ChatBox.css'
export default ({ text, username, handleTextChange, onFormSubmit }) => (
  <div>
    <div className="row">
      <div className="col-xs-12">
        <div className="chat">
          <div>
            <form onSubmit={onFormSubmit}>
              <input
                type="text"
                value={text}
                placeholder="chat here..."
                className="form-control"
                onChange={handleTextChange}
                onKeyDown={handleTextChange}
              />
            </form>
          </div>

          <div className="clearfix" />
        </div>
      </div>
    </div>
  </div>
)
