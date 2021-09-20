import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  constructor() {
    super();
    console.log("constructor in news found");
    this.state = {
      articles: [],
      loading: false,
      page:1
    };
  }
  async componentDidMount() {
    console.log("honey");
    let url =
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=fe122806320f4edaa8711bb93cea8523&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults});
  }

 handleNextClick =async ()=>{
    this.setState({
      page: this.state.page + 1,
    })
    console.log("honey");
    if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

    }
    else{
      console.log(this.state.pageSize)
      let url =
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=fe122806320f4edaa8711bb93cea8523&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({ articles: parsedData.articles });
    }
    
  }
  handlePreviousClick =async ()=>{
    this.setState({
      page: this.state.page - 1,
      

    })
    let url =
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=fe122806320f4edaa8711bb93cea8523&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: parsedData.articles });
  }
  render() {
    console.log("yo");
    return (
      <div className="container my-3">
        <h1 className="text-center">Top Headlines</h1>

        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick} >
            &larr; Previous
          </button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
