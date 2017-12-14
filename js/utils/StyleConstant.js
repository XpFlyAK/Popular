import React, {Component} from 'react'
import {View, Image, Text, StyleSheet, Dimensions} from 'react-native'

/**
 * @创建者 :   XP FlyAk
 * @类名 ： StyleConstant
 * @描述 :
 * @时间 ：2017/12/12 9:52
 * @版本号：
 */

const StyleConstant = StyleSheet.create({
        contain: {flex: 1, backgroundColor: 'white', flexDirection: 'column'},
        fullScreen: {
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width
        },
        fullWidth:{
            width:Dimensions.get('window').width
        },
        fullHeight:{
            height:Dimensions.get('window').height
        },
    },
);

export default StyleConstant;