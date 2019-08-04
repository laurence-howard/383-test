import React from 'react';

class Manual extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.addDefaultSrc = this.addDefaultSrc.bind(this);
    }

    addDefaultSrc(ev){
        ev.target.src = '/backupImg/bullring.jpg';
        this.props.imageShuffle();
      }

    render(){

        var content;



        if(this.props.data){
            return (
                <div className="grid-content manual-content">
                    <div className="grid-badge"><div className="grid-badge-icon manual-icon">AFF</div></div>                    
                    <div className="manual-image-container">
                        <img onError={this.addDefaultSrc} src={this.props.data.item_data.image_url} crossOrigin="anonymous" className="manual-image" loading='auto'/>
                    </div>
                    <div className="manual-text">
                        <p>{this.props.data.item_data.text}</p>
                        <a href={this.props.data.item_data.link} target="_blank">{this.props.data.item_data.link_text}</a>
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
}

export default Manual;