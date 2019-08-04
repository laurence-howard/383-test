import React from 'react';
import Manual from '../Grid/Manual';
import Twitter from '../Grid/Twitter';
import Instagram from '../Grid/Instagram';
import Shuffle from 'shufflejs';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class Content extends React.Component {

    constructor(props) {
        super(props);
        this.state = { posts : [] , pageNum : 0, postsNum : 5, filter : 'all', button : true};
        this.element = React.createRef();
        this.sizer = React.createRef();

        this.postAdd = this.postAdd.bind(this);
        this.getPosts = this.getPosts.bind(this);
        this.shuffleUpdate = this.shuffleUpdate.bind(this);
        this.filterClick = this.filterClick.bind(this);
    }
    componentDidMount(){
        this.shuffle = new Shuffle(this.element.current, {
            itemSelector: '.single-outer',
            sizer : this.sizer.current
        });
        this.getPosts(this.shuffle);
            // The elements are in the DOM, initialize a shuffle instance.
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.posts != this.state.posts){
            this.shuffle.resetItems();
        }
    }
      
    render(){
        var grid_content;
        const grid_options = "col-lg-4 col-md-6";
        const self = this;

        if(this.state.posts && this.shuffle ){
            grid_content = this.state.posts.map(function(single){
                if(single.service_name == 'Twitter'){
                    return(
                        <div className={grid_options + " single-outer"} data-group={"["+ single.service_slug +"]'"}>
                            <Twitter data={single} />                            
                        </div>
                    )
                } else if (single.service_name == 'Instagram'){
                    return(
                        <div className={grid_options + " single-outer"} data-group={"["+ single.service_slug +"]'"}>
                            <Instagram imageShuffle={self.shuffleUpdate} data={single} />                            
                        </div>
                    )
                } else {
                    return(
                        <div className={grid_options + " single-outer"} data-group={"'["+ single.service_slug +"]'"}>
                            <Manual imageShuffle={self.shuffleUpdate} data={single} />                            
                        </div>
                    )
                }
            })
            if(this.shuffle){
                this.shuffleUpdate('main');
            }
        }

        var button_content;

        if(this.state.button){
            button_content = (
                <button className="load-more-button" onClick={() => this.getPosts(this.shuffle)}>
                Load More
            </button>
            )
        }

        var slickSettings = {
            autoplay : true,
            autoplaySpeed : 4000,
            slidesToShow : 1,
            slidesToScroll : 1
        }
        
        return (
            <div className="content-outer">
                <div className="container">
                    <div className="header-slider-container">
                        <Slider {...slickSettings}>
                            <div className="header-slider-single">
                                <div className="header-single-inner" style={{backgroundImage : 'url(/images/bull.jpg)'}}></div>
                            </div>
                            <div className="header-slider-single">
                                <div className="header-single-inner" style={{backgroundImage : 'url(/images/newyearbull.jpg)'}}></div>
                            </div>
                            <div className="header-slider-single">
                                <div className="header-single-inner" style={{backgroundImage : 'url(/images/reindeerbull.jpg)'}}></div>
                            </div>
                            <div className="header-slider-single">
                                <div className="header-single-inner" style={{backgroundImage : 'url(/images/rockybull.jpg)'}}></div>
                            </div>
                            <div className="header-slider-single">
                                <div className="header-single-inner" style={{backgroundImage : 'url(/images/ukbull.jpg)'}}></div>
                            </div>
                        </Slider>
                    </div>
                    <div className="filter-container">
                        <button className={"filter-button " + (this.state.filter == 'all' ? 'active' : '')} onClick={() => this.filterClick('all')}>All</button>
                        <button className={"filter-button " + (this.state.filter == 'twitter' ? 'active' : '')} onClick={() => this.filterClick('twitter')}>Twitter</button>
                        <button className={"filter-button " + (this.state.filter == 'manual' ? 'active' : '')} onClick={() => this.filterClick('manual')}>Posts</button>
                        <button className={"filter-button " + (this.state.filter == 'instagram' ? 'active' : '')} onClick={() => this.filterClick('instagram')}>Instagram</button>
                    </div>
                    <div className="posts-container-outer">
                        <div className="posts-container row" ref={this.element}>
                            <div ref={this.sizer} className={grid_options}></div>
                            {grid_content}
                        </div>
                    </div>
                    <div className="button-container">
                        {button_content}
                    </div>
                </div>
            </div>
        )
    }

    postAdd = (data) => { 
        var current_post = this.state.posts;
        var current_num = this.state.pageNum;
        if(this.state.filter !== 'all'){
            data = data.filter(single => single.service_slug === this.state.filter);
        }
        var new_posts = current_post.concat(data.slice((this.state.pageNum * 5), (++current_num * 5)));
        if(current_num * 5 >= data.length){
            this.setState({button : false})
        }
        this.setState({posts : new_posts, pageNum : current_num});
    }

    loadPosts = (shuffle) => {
        this.getPosts(shuffle);
    }

    getPosts = (shuffle) => {
        fetch('https://private-cc77e-aff.apiary-mock.com/posts?page=' + this.state.pageNum + '&postsnum=' + this.state.postsNum)
            .then(res => res.json())
            .then(data => postSort(data.items))
            .then(data => this.postAdd(data, shuffle))
            .then(function(data){
                if(shuffle.isEnabled){
                    setTimeout(
                        function() {
                            shuffle.resetItems();
                            console.log('getposts');                    
                        }
                        .bind(this),
                        500
                    );
                }
            })
    }

    shuffleUpdate = () => {
        this.shuffle.resetItems();
    }

    filterClick = (filtervar) => {
        this.setState({pageNum : 0, posts : [], filter : filtervar, button : true});
        this.getPosts(this.shuffle);
        //this.shuffle.filter(filtervar);
    }
}

function postSort (items) {
    // Checking the the posts are set to published
    var publishedData = items.filter(item => item.item_status === 'published');
    // Sorting the posts by date
    publishedData.sort(function(a, b ) { return new Date(a.item_published) - new Date(b.item_published) })   
    return publishedData;
}


export default Content;