import React from 'react'

function Words(props) {
    return (
        <div className="word">
            <div className="word-body">
                <h4 className="word-title">{props.title}</h4>
                <p className="word-text">{props.translate}</p>
                <p className="word-language">{props.language}</p>
                <p className="word-category">{props.category}</p>
                <img src={props.imgLink} alt={props.title} style={{ width: '200px', height: 'auto' }}/>
            </div>
        </div>
    );
}

export default Words;