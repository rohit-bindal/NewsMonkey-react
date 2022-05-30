import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export default class News extends Component {
     capitalizeFirstLetter = (string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    static defaultProps = {
        category: 'general'
    }

    static propTypes= {
        category: PropTypes.string,
    }
    constructor(props)
    {
        super(props);
        this.state = {
            articles: [],
            page: 1,
            totalResults: 0,
            loading: false
        }
        document.title = `NewsMonkey - ${this.capitalizeFirstLetter(this.props.category)}`
    }

    async componentDidMount(){
       this.setState({
           loading: true
       })
       let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=in&apiKey=8d838f2f62144d2487656f242759f901&page=${this.state.page}&pageSize=18`;
       fetch(url).then((data) => data.json())
       .then((parsedData) => {
           this.setState({
               articles: parsedData.articles,
               totalResults: parsedData.totalResults,
               loading: false,
           });
       })
    }

    handleNext = async ()=>{
        this.setState({
            loading: true
        })
        let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=in&apiKey=8d838f2f62144d2487656f242759f901&page=${this.state.page+1}&pageSize=18`;
        fetch(url).then((data) => data.json())
        .then((parsedData) => {
            this.setState({
                articles: parsedData.articles,
                page: this.state.page+1,
                totalResults: parsedData.totalResults,
                loading: false
            });
        })
    }
    handlePrev = async ()=>{
        this.setState({
            loading: true
        })
        let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=in&apiKey=8d838f2f62144d2487656f242759f901&page=${this.state.page-1}&pageSize=18`;
        fetch(url).then((data) => data.json())
        .then((parsedData) => {
            this.setState({
                articles: parsedData.articles,
                page: this.state.page-1,
                totalResults: parsedData.totalResults,
                loading: false
            });
        })
       
    }

    render() {
    return (
      <div className="container my-3">
        <h1 className='text-center mb-4'>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner></Spinner>}
        <div className="row">
            {this.state.articles?.map((element)=>{
                return <div className="col md-4" key={element.url}>
                <NewsItem srcname={element.source.name} author={element.author} date={element.publishedAt} title={element.title} description={element.description} imageUrl={element.urlToImage} url={element.url}/>
                </div>
            })}
        </div>   
        <div className="container d-flex justify-content-between">
        <button disabled = {this.state.page <=1} type="button" className="btn btn-dark" onClick={this.handlePrev} > &larr; Previous</button>
        <button disabled = {this.state.page + 1 > Math.ceil(this.state.totalResults/18)} type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
            </div>     
      </div>
    )
  }
}
