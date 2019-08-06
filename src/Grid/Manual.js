import React from 'react';

class Manual extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.addDefaultSrc = this.addDefaultSrc.bind(this);
    }

    addDefaultSrc(ev){
        ev.target.src = '/images/bullring.jpg';
        this.props.imageShuffle();
      }

    render(){

        if(this.props.data){
            return (
                <div className="grid-content manual-content">
                    <div className="grid-badge"><div className="grid-badge-icon manual-icon">AFF</div></div>                    
                    <div className="manual-image-container">
                        <img onError={this.addDefaultSrc} src={this.props.data.item_data.image_url} crossOrigin="anonymous" className="manual-image" loading='auto' alt="Autumn Fashion Fix"/>
                    </div>
                    <div className="manual-text">
                        <p>{this.props.data.item_data.text}</p>
                        <a href={this.props.data.item_data.link} target="_blank" rel="noopener noreferrer">{this.props.data.item_data.link_text}</a>
                    </div>
                </div>
            )
        }

        return (
            <div class="spinner-border spinner-outer" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        )
    }
}

export default Manual;