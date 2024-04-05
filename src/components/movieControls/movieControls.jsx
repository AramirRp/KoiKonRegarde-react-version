import React from "react";


export MovieControls = ({data, type}) => {



    return (
        <div className="inner-card-controls">
            {type === 'watchlist' &&(
                <>
                    <button className="ctrl-btn">
                        <i className="fa-fw far fa-eye"></i>
                    </button>
                    <button className="ctrl-btn">
                    <i className="fa-fw far fa-times"></i>
                </button>
                </>
            )}
        
        </div>
    )
}

export default MovieControls