import React, {Component} from 'react'
import {View, Image, Text, StyleSheet} from 'react-native'
import CustomNavigationBar from '../view/CustomNavigationBar'
/**
 * @创建者 :  Xp FlyAK
 * @类名 ： CustomLabelPage
 * @描述 :
 * @时间 ：2017/12/13 17:20
 * @版本号：
 */

export default class CustomLabelPage extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View>
                <CustomNavigationBar title='自定义标签页'
                                     statusBarProps={{backgroundColor:'red',}}/>

            </View>
        );
    }
}