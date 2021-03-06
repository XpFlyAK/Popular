import React, {Component} from 'react'
import {View, Image, Text, StyleSheet, WebView, TextInput, Dimensions,DeviceEventEmitter} from 'react-native'
import StyleConstant from "../utils/StyleConstant";

/**
 * @创建者 :  Xp FlyAK
 * @类名 ： FavouritePage
 * @描述 :
 * @时间 ：2017/12/13 16:28
 * @版本号：
 */

export default class FavouritePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            canGoBack: false,
            title: '',
        }
    }

    onBack() {
        if (this.state.canGoBack){
            this.webView.goBack()
        }else{
            DeviceEventEmitter.emit('showToast','已经到顶了')
        }
    }

    go() {
        let url = this.text;
        let stateUrl = this.state.url;
        this.setState({
            url: this.text === '' ? 'http://www.baidu.com' : url,
        });
        let afterUrl = this.state.url;
    }

    onNavigationStateChange = (navState) => {
        this.setState({
            canGoBack: navState.canGoBack,
            title: navState.title,
        });
    };

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={{
                    backgroundColor: 'gray', height: 50, width: Dimensions.get('window').width,
                    flexDirection: 'row', justifyContent: 'center'
                }}>
                    <Text style={{textAlignVertical: 'center', margin: 10}}
                          onPress={() => this.onBack()}>go back</Text>
                    <TextInput
                        style={{height: 45, flex: 1}}
                        defaultValue={'http://www.baidu.com'}
                        onNavigationStateChange={this.onNavigationStateChange}
                        onChangeText={(text) => this.text = text}/>
                    <Text style={{textAlignVertical: 'center', margin: 10}}
                          onPress={() => this.go()}>go to</Text>
                </View>
                <WebView style={{flex: 2}}
                         ref={ref => this.webView = ref}
                         onNavigationStateChange={this.onNavigationStateChange}
                         source={{uri: 'https://www.baidu.com/s?ie=UTF-8&wd='+this.state.url}}/>
            </View>);
    }
}