import React from 'react';

class Instagram extends React.Component {

    constructor(props) {
        super(props);
        this.state = {thumb_url : false};
    }

    componentDidMount(){
        fetch('https://api.instagram.com/oembed/?url=' + this.props.data.item_data.link)
            .then(data => data.json())
            .then(data => this.setState({thumb_url : data.thumbnail_url}))
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.thumb_url != this.state.thumb_url){
            setTimeout(
                function() {
                    this.props.imageShuffle()                    
                }
                .bind(this),
                500
            );
        }
    }

    render(){

        var content;

        if(this.props.data && this.state.thumb_url){
            return (
                <div className="grid-content instagram-content">
                    <div className="grid-badge"><div className="grid-badge-icon instagram-icon"></div></div>                    
                    <div className="instagram-image">
                        <img src={this.state.thumb_url}  loading='auto' />
                    </div>
                    <div className="instagram-content">
                        <h5 className="instagram-username">{this.props.data.item_data.user.username}</h5>
                        <div className="instagram-caption" dangerouslySetInnerHTML={{ __html : this.props.data.item_data.caption.parseHashtag()}}></div>
                    </div>
                </div>
            );
            
        }

        return (
            <div>
            Loading
        </div>
        )
    }
}

String.prototype.parseHashtag = function() {
    return this.replace(/[#]+[A-Za-z0-9-_]+/g, function( t ) {
        var tag = t.replace("#","");
        
        return t.link( 'https://www.instagram.com/explore/tags/' + tag );
    });
};

export default Instagram;