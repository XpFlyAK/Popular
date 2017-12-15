import React, {Component} from 'react'
import {View, Image, Text, StyleSheet, Animated, Easing} from 'react-native'
import {StackNavigator} from 'react-navigation'
import SplashPage from '../page/SplashPage'
import MainPage from '../page/MainPage'
import MinePage from '../page/MinePage'
import CustomLabelPage from '../page/CustomLabelPage'
import SortLabelPage from "../page/SortLabelPage";
import CardStackStyleInterpolator from "react-navigation/src/views/CardStack/CardStackStyleInterpolator";

/**
 * @创建者 :
 * @类名 ： CustomNavigation
 * @描述 :
 * @时间 ：2017/12/12 9:44
 * @版本号：
 */
//https://github.com/react-community/react-navigation/pull/1187#issuecomment-300112470
const animateInto = ()=>({
    screenInterpolator: CardStackStyleInterpolator.forHorizontal,
    transitionSpec: {
        duration: 250,
        easing: Easing.bounce,
        timing: Animated.timing,
    },
});
const CustomNavigation = StackNavigator(
    {
        Splash: {screen: SplashPage},
        Main: {screen: MainPage},
        CustomLabel: {screen: CustomLabelPage},
        SortLabel: {screen: SortLabelPage}
    },
    {
        headerMode: 'none',
        transitionConfig:animateInto,
    }
);

export default CustomNavigation;