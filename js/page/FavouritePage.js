import React, {Component} from 'react'
import {View, Image, Text, StyleSheet, WebView, TextInput,Dimensions} from 'react-native'
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
            backButtonEnabled:false,
        }
    }

    onBack() {

    }

    go() {
        this.setState({
            url:this.text,
        });
    }

    onNavigationStateChange = (navState) => {
        this.setState({
            backButtonEnabled: navState.canGoBack,
            url: navState.url,
            status: navState.title,
            loading: navState.loading,
            scalesPageToFit: true
        });
    };

    render() {
        return (
            <View style={{flex:1, flexDirection:'column'}}>
                <View style={{backgroundColor:'gray',height: 50,width: Dimensions.get('window').width,
                    flexDirection: 'row',justifyContent:'center'}}>
                    <Text style={{textAlignVertical:'center', margin:10}} onPress={() => this.onBack()}>go back</Text>
                    <TextInput
                        style={{height:45,flex:1}}
                        defaultValue={'www.baidu.com'}
                        onNavigationStateChange={this.onNavigationStateChange}
                        onChangeText={(text) => this.text = text}/>
                    <Text style={{textAlignVertical:'center',margin:10}} onPress={()=>this.go()}>go to</Text>
                </View>
                <WebView style={{flex:2}} source={{uri: 'http://'+this.state.url}}/>
            </View>);
    }
}