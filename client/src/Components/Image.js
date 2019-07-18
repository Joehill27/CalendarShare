import React, { Component } from 'react';
import {chooseUserImage, chooseEventImage, chooseGroupImage} from '../util/imageHelpers';
import axios from "axios";
import {getProfilePicture} from '../apiCalls/userAPI';

const num = 2;

class Image extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img: ''
        };
    }
    componentDidMount() {
        switch(this.props.type){
            case 'user':
                this.setState({'img': chooseUserImage('1')});
                break;
            case 'group':
                this.setState({'img': chooseGroupImage('1')});
                break;
            case 'event':
                this.setState({'img': chooseEventImage('1')});
                break;
            default:
                this.setState({'img': chooseUserImage(this.props.imageId)});
                break;
                
        }
    }

    //TODO use different styling depending on the type of image being passed
    //Use conditional rendering

    render() {
        const {img} = this.state;
        return (
            <div className="profilePicture">
                <img
                    src={img}
                    alt='Helpful alt text'
                    width="50"
                    height="50"
                />
            </div>
         )
    }
}

export default Image;