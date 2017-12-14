import React, {Component} from 'react'
import {View, Image, Text, StyleSheet, StatusBar} from 'react-native'
import {NavigationActions} from 'react-navigation'
import StyleConstant from '../utils/StyleConstant'

/**
 * @创建者 : XP FlyAk
 * @类名 ： SplashPage
 * @描述 :
 * @时间 ：2017/12/12 9:34
 * @版本号：
 */
const splashNavigationAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'Main'})],
});
export default class SplashPage extends Component {
    constructor(props) {
        super(props);
        setTimeout(() => {
            this.props.navigation.dispatch(splashNavigationAction)
        }, 1000)
    }


    render() {
        return (
            <View style={style.contain}>
                <StatusBar backgroundColor='white' translucent={true}/>
                <Image style={StyleConstant.fullScreen}
                       source={require('../../android/app/src/main/res/drawable-xhdpi/launch_screen.png')}/>
            </View>
        )
    }
}

const style = StyleSheet.create({
    contain: {
        flex: 1,
        backgroundColor: 'white',
    },
});