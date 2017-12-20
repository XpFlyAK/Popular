import React, {Component} from 'react'
import {View, Image, Text, StyleSheet, WebView} from 'react-native'
import CustomNavigationBar from "../view/CustomNavigationBar";
import ViewUtils from "../utils/ViewUtils";
import StyleConstant from "../utils/StyleConstant";

/**
 * @创建者 :  Xp FlyAK
 * @类名 ： WebViewPage
 * @描述 :
 * @时间 ：2017/12/20 10:29
 * @版本号：
 */

export default class WebViewPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.navigation.state.params.full_name,
            canGoBack:false,
            url:this.props.navigation.state.params.url,
        }

    }

    callBack = () => {
        if (this.state.canGoBack){
            this.webView.goBack();
        }else{
            this.props.navigation.goBack()
        }
    };

    onNavigationStateChange = (navState) => {
        this.setState({
            canGoBack: navState.canGoBack,
        });
    };

    render() {
        return (
            <View style={StyleConstant.contain}>
                <CustomNavigationBar title={this.state.title}
                                     titleColor={'white'}
                                     statusBarProps={{backgroundColor:'red'}}
                                     leftIcon={ViewUtils.getLeftButton(this.callBack)}/>
                <WebView
                    ref={ref=>this.webView=ref}
                    startInLoadingState={true}
                    onNavigationStateChange={this.onNavigationStateChange}
                    source={{uri: this.state.url}}/>
            </View>
        );
    }
}
