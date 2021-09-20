import React, { Component } from "react";

export class NewsItem extends Component {
  
  render() {
    let {title, description, imageUrl, newsUrl} = this.props;
    
    return (
      <div className="my-3">
        <div className="card" style={{width: "18rem"}}>
          <img src={!imageUrl?"https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png":imageUrl} className="card-img-top" alt="" />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">
              {description}...
            </p>
            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
