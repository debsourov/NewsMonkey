import React from 'react'

export default function NewsItem(props) {

    let {title, description, imageUrl, newsUrl, author, date, source} =props;
    return (
      <>
      <div className="card">
        <div style={{display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0'}}>
          <span className="badge text-bg-danger">{source}</span>
        </div>
        <img src={!imageUrl?"https://www.theweek.in/content/dam/week/news/2023/images/2023/7/10/C-_Users_sajuc_AppData_Desktop_Aditya-L1-solar-mission-.jpg":imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-body-secondary">By {author? author:"Unknown"} on {new Date (date).toGMTString()}</small></p>
            <a href={newsUrl} target='_blank' className="btn btn-sm btn-primary">Read More</a>
        </div>
        </div>
      </>
    )
}

