import React, {Component} from 'react'
import {View, Text, Image, StyleSheet, Platform, StatusBar, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types'
import {Popover} from "./Popover";

/**
 * @创建者 :   XP FlyAk
 * @类名 ： CustomNavigationBar
 * @描述 :
 * @时间 ：2017/12/12 9:52
 * @版本号：
 */

const NAVIGATION_BAR_ANDROID_HEIGHT = 50;
const STATUSBAR_ANDROID_HEIGHT = 20;
const NAVIGATION_BAR_IOS_HEIGHT = 44;
const barStyleShape = {
    backgroundColor: PropTypes.string,
    barStyle: PropTypes.oneOf(['default', 'light-content', 'dark-content']),
    hidden: PropTypes.bool,
    translucent: PropTypes.bool
};

export default class CustomNavigationBar extends Component {

    static defaultProps = {
        title: '',
        backgroundColor: 'red',
        isHide: 'true',
        statusBarProps: {
            backgroundColor: 'black',
            translucent: false,
            barStyle: 'default',
            hidden: false
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            isVisible:false,
            buttonRect:{},
        }
    }

    static propTypes = {
        leftIcon: PropTypes.element,
        rightIcon: PropTypes.element,
        titleComponent:PropTypes.element,
        title: PropTypes.string.isRequired,
        backgroundColor: PropTypes.string,
        titleColor: PropTypes.string,
        isHide: PropTypes.string,
        statusBarProps: PropTypes.shape(barStyleShape),
    };

    getTitleView(titleBarComponent) {
        console.log(this.props.isHide);
        if (this.props.isHide === 'true') {
            return {titleBarComponent};
        } else {
            return <View/>
        }
    };


    render() {
        let statusBarComponent = <StatusBar {...this.props.statusBarProps}
                                            style={style.statusBar}/>;
        let titleBarComponent =
            <View
                style={[style.titleBarStyle, {backgroundColor: this.props.backgroundColor}]}>
                {this.props.leftIcon}
                <View style={style.titleViewContain}>
                    {this.props.titleComponent}
                </View>
                {this.props.rightIcon}
            </View>;

        return (
            <View style={style.containStyle}>
                {statusBarComponent}
                {titleBarComponent}
            </View>
        );
    }
}

const style = StyleSheet.create({
    titleBarStyle: {
        height: Platform.OS === 'ios' ? NAVIGATION_BAR_IOS_HEIGHT : NAVIGATION_BAR_ANDROID_HEIGHT,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
    },
    containStyle: {
        flexDirection: 'column'
    },

    statusBar: {
        height: STATUSBAR_ANDROID_HEIGHT,
    },

    titleViewContain: {
        position: 'absolute',
        left: 40,
        right: 40,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },


});