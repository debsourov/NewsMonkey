import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default function News (props) {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  //document.title = `${capFirstLet(props.category)} - NewsMonkey`;

  const capFirstLet = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async ()=> {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=f419b36d4bf24d0dbe443dd6c71a339a&page=${props.page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(50);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }
  useEffect(() => {
    updateNews();
    // eslint-disable-next-line
  }, []);

  // const handlePreviousClick = async () => {
  //   setPage(page - 1);
  //   updateNews();
  // };

  // const handleNextClick = async () => {
  //     setPage(page + 1);
  //     updateNews();
  // }

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=f419b36d4bf24d0dbe443dd6c71a339a&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false)
  }

    return (
      <>
        <h1 className="text-center" style={{marginTop:"80px"}}>NewsMonkey - Top {capFirstLet(props.category)} Headlines </h1>
        {loading && <Spinner />}
          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={<Spinner/>}
          > 
          <div className="container"> 
            <div className="row my-3">
              {articles.map((element) => {
                  return (
                    <div className="newsItems col-md-4 my-3" key={element.url}>
                      <NewsItem
                        source={element.source.name}
                        title={element.title ? element.title.slice(0, 45) : ""}
                        description={
                          element.description
                            ? element.description.slice(0, 85)
                            : ""
                        }
                        imageUrl={element.urlToImage}
                        newsUrl={element.url}
                        author={element.author}
                        date={element.publishedAt}
                      />
                    </div>
                  );
                })}
            </div>
          </div> 
          </InfiniteScroll>
        
        
        {/* <div className="container d-flex justify-content-between mb-5">
          <button
            disabled={page <= 1}
            type="button"
            className="btn btn-primary"
            onClick={handlePreviousClick}
          >
            &#8678; Previous
          </button>
          <button
            disabled={
              page + 1 > Math.ceil(totalResults / 12)
            }
            type="button"
            className="btn btn-primary"
            onClick={handleNextClick}
          >
            Next &#8680;
          </button>
        </div> */}
      </>
    );
}

News.defaultProps = {
  country: "in",
  pageSize: 9,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pageSize: PropTypes.number,
};


