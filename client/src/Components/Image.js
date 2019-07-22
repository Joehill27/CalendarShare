import React, { Component } from 'react';
import {chooseUserImage, chooseEventImage, chooseGroupImage} from '../util/imageHelpers';

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

        switch(this.props.type) {
            case 'user':
                return (
                    <div>
                        <img
                            src={img}
                            alt='Helpful alt text'
                            width="25"
                            height="25"
                        />
                    </div>
                );
            case 'group':
                    return (
                        <div>
                            <img
                                src={img}
                                alt='Helpful alt text'
                                width="285"
                                height="285"
                                className="rounded img-fluid ml-3"
                            />
                        </div>
                    );
            case 'event':
                    return (
                        <div>
                            <img
                                src={img}
                                alt='Helpful alt text'
                                width="285"
                                height="285"
                                className="rounded img-fluid ml-3"
                            />
                        </div>
                    );
            default:
                    return (
                            <img
                                src={img}
                                alt='Helpful alt text'
                                width="25"
                                height="25"
                                className="mr-2"
                            />
                    );
        }

        
    }
}

export default Image;