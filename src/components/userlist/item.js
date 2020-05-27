import React, { Component } from 'react';
import UserListPreview from "./userlistpreview";
import UserListTable from "./userlisttable";

class Item extends Component{
    constructor(props) {
        super(props);
        this.state = {
            animationClass: 'enter'
        }
    }
    componentDidMount() {
        const { delay } = this.props;
        this.setState({
            animationClass: 'animation-start enter'
        });
        setTimeout(() => {
            this.setState({
                animationClass: 'animated enter-active',
            })
        }, delay);
        setTimeout(() => {
            this.setState({
                animationClass: 'animated enter-done',
            })
        }, delay + 1400);
    }
    render() {
        const { animationClass } = this.state;
        const { view, user, delay } = this.props;
        const { toggleFavouriteAction } = this.props;
        const RenderComponent = (view == 'table') ? UserListTable : UserListPreview;
        return <RenderComponent
                    user={user}
                    onToggleFavourite={toggleFavouriteAction}
                    delay={delay}
                    animationClass={animationClass}
                />
    }
};

export default Item;
