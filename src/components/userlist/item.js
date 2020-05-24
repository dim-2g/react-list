import React, { Component } from 'react';
import classNames from 'classnames';
import i18next from 'i18next';
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
            animationClass: 'enter'
        });
        setTimeout(() => {
            this.setState({
                animationClass: 'enter-active',
            })
        }, delay);
        setTimeout(() => {
            this.setState({
                animationClass: 'enter-done',
            })
        }, delay + 1400);
    }
    render() {
        const { animationClass } = this.state;
        const { view, user, delay } = this.props;
        const { toggleFavouriteAction } = this.props;
        if (view == 'table') {
            return (<UserListTable user={user} onToggleFavourite={toggleFavouriteAction} delay={delay} animationClass={animationClass} />)
        }
        if (view == 'preview') {
            return (<UserListPreview user={user} onToggleFavourite={toggleFavouriteAction}  delay={delay} animationClass={animationClass} />)
        }
    }
};

export default Item;
