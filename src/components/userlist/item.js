import React, { Component } from 'react';
import UserListPreview from "./userlistpreview";
import UserListTable from "./userlisttable";

class Item extends Component{
    constructor(props) {
        super(props);
        this.state = {
            animationClass: 'enter'
        };
        this.animationTimerStart = null;
        this.animationTimerDone = null;
    }
    componentDidMount() {
        const { delay, isLast, onLast } = this.props;
        this.setState({
            animationClass: 'animation-start enter'
        });
        this.animationTimerStart = setTimeout(() => {
            this.setState({
                animationClass: 'animated enter-active',
            })
            if (isLast) {
                onLast();
            }
        }, delay);
        this.animationTimerDone = setTimeout(() => {
            this.setState({
                animationClass: 'animated enter-done',
            })
        }, delay + 1400);

    }
    componentWillUnmount() {
        clearInterval(this.animationTimerDone);
        clearInterval(this.animationTimerStart);
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
