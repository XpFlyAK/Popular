import React, {Component} from 'react'
import {View, Image, Text, StyleSheet} from 'react-native'
import {StackNavigator} from 'react-navigation'
import SplashPage from '../page/SplashPage'
import MainPage from '../page/MainPage'
import MinePage from '../page/MinePage'
import CustomLabelPage from '../page/CustomLabelPage'
/**
 * @创建者 :
 * @类名 ： CustomNavigation
 * @描述 :
 * @时间 ：2017/12/12 9:44
 * @版本号：
 */

const CustomNavigation = StackNavigator(
    {
        Splash: {screen: SplashPage},
        Main: {screen: MainPage},
        CustomLabel: {screen: CustomLabelPage}
    },
    {headerMode: 'none'}
);

export default CustomNavigation;