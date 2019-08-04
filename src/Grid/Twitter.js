import React from 'react';

class Twitter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.twitterLinkSort = this.twitterLinkSort.bind(this)
    }

    render(){

        var content;

        if(this.props.data.item_data){
            return (
                <div className="grid-content twitter-content text-center">
                    <div className="grid-badge"><div className="grid-badge-icon twitter-icon"></div></div>
                    <h4 class="twitter-title">{this.props.data.item_data.user.username}</h4>
                    <div className="tweet-content" dangerouslySetInnerHTML={{__html : this.twitterLinkSort(this.props.data.item_data.tweet)}}>
                    </div>
                </div>
            )
        }

        return (
            <div>
                Loading
            </div>
        )
    }
    twitterLinkSort = (text) => {
        text = text.parseURL();
        text = text.parseUsername();
        text = text.parseHashtag();
        return text;
    }
}


String.prototype.parseURL = function() {
    return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function( url ) {
      return url.link( url );
    });
  };
  String.prototype.parseUsername = function() {
    return this.replace(/[@]+[A-Za-z0-9-_]+/g, function( u ) {
        var username = u.replace("@","");
        
        return u.link( 'http://twitter.com/' + username );
    });
    };
    String.prototype.parseHashtag = function() {
    return this.replace(/[#]+[A-Za-z0-9-_]+/g, function( t ) {
        var tag = t.replace("#","%23");
        
        return t.link( 'http://search.twitter.com/search?q=' + tag );
    });
    };

export default Twitter;