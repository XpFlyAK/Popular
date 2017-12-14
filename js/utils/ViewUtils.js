import React, {Component} from 'react'
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native'

/**
 * @创建者 :  Xp FlyAK
 * @类名 ： ViewUtils
 * @描述 :
 * @时间 ：2017/12/14 10:37
 * @版本号：
 */

export default class ViewUtils {

    static getLeftButton(callBack) {
        return <TouchableOpacity style={{padding:8}} onPress={callBack}>
            <Image style={{height: 25, width: 25}} tintColor={'white'}
                   source={require('../../res/images/ic_arrow_back_white_36pt.png')}/>
        </TouchableOpacity>
    }


}