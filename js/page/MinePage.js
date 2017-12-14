import React, {Component} from 'react'
import {View, Image, Text, StyleSheet} from 'react-native'
import StyleConstant from "../utils/StyleConstant";
import {StackNavigator} from 'react-navigation'
import CustomNavigation from "../utils/CustomNavigation";
/**
 * @创建者 :  Xp FlyAK
 * @类名 ： MinePage
 * @描述 :
 * @时间 ：2017/12/13 16:29
 * @版本号：
 */

export default class MinePage extends Component {
    static defaultProps={
        navigation:null,
    };

    constructor(props) {
        super(props)
    }

    render() {
        const {navigate} = this.props.navigation;
        return (<View style={StyleConstant.contain}>
            <Text style={{height:40 ,fontSize:30}}
                  onPress={()=>{navigate("CustomLabel",{name:'自定义标签页'})}}>自定义标签页</Text>
        </View>)
    }
}