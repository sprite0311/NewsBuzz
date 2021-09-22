import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
    country:'in',
    pageSize: 6,
    catagory:"general"
    }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    catagory: PropTypes.string
  }
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

    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.catagory}&apiKey=fe122806320f4edaa8711bb93cea8523&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading:false});
  }

 handleNextClick =async ()=>{
    this.setState({
      page: this.state.page + 1,
    })
    console.log("honey");
    if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
      console.log(this.state.pageSize)
      let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.catagory}&apiKey=fe122806320f4edaa8711bb93cea8523&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
      this.setState({
        loading:true
      })
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        loading:false
      })
      this.setState({ articles: parsedData.articles });
    }
    
    
  }
  handlePreviousClick =async ()=>{
    
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.catagory}&apiKey=fe122806320f4edaa8711bb93cea8523&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({loading:true})
    this.setState({ articles: parsedData.articles });
    this.setState({
      page: this.state.page - 1,
      loading: false

    })
  }
  render() {
    console.log("yo");
    return (
      <div className="container my-3">
        {this.state.loading && <Spinner/>}
        <h1 className="text-center" style={{margin: '35px 0'}}>Top Headlines</h1>

        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
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
