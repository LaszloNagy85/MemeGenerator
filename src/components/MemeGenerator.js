import React from "react";

class MemeGenerator extends React.Component {
    constructor() {
        super();
        this.state = {
            topText : "",
            bottomText: "",
            randomImg: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(respJson => {
                this.setState({
                    allMemeImgs: respJson.data.memes
                })
            })
            
    }

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({
            [name] : value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const randomMemeImgUrl = this.state.allMemeImgs[Math.floor(Math.random() * this.state.allMemeImgs.length)].url;
        this.setState({
            randomImg : randomMemeImgUrl
        })
    }

    render() {
        return(
            <div>
                <form className="meme-form">
                    <input type="text" placeholder="Enter top text here" name="topText" value={this.state.topText} onChange={this.handleChange} />
                    <input type="text" placeholder="Enter bottom text here" name="bottomText" value={this.state.bottomText} onChange={this.handleChange} />
                    <button onClick={this.handleSubmit}>Gen</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImg} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator;