import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, url, author, date, srcname} = this.props;
    return (
      
      
      <div className="card-group" style={{margin: "10px"}}>
        
        <div className="card" style={{ width: "18rem" }}>
          <img
            src={
              imageUrl
                ? imageUrl
                : "https://ummid.com/news/2022/may/29.05.2022/black-holes.jpg"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}<span style={{left: "85%", zIndex:1}} className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
                       {srcname}
  </span></h5>
            <p className="card-text">{description}</p>

            <a href={url} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
          <div className="card-footer">
            <small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small>
          </div>
        </div>
      </div>
    );
  }
}
