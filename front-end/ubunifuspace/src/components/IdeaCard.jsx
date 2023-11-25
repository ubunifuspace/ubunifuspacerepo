import React from 'react'

const IdeaCard = () => {
    return (
        <div className="grey-bg idea_container">
            <div className="green_bg">
                <p className="idea_text">Transaction notifications delay for mobile money fund transfers</p>
            </div>
            <div className="controls_container">

                <p className="font_heavy ">Mon Nov 19 15:23</p>

                <p className="font_heavy green_wrap">Expand thread</p>

                <p className="font_heavy">4</p>

                <p className="font_heavy green_wrap pointer_cursor" onClick={open} > + Add idea</p>
            </div>
        </div>
    )
}

export default IdeaCard