import React, {Component} from 'react'
import {View, Image, Text, StyleSheet, DeviceEventEmitter, ToastAndroid,} from 'react-native'
import StyleConstant from '../utils/StyleConstant'
import TabNavigator from 'react-native-tab-navigator';
import PopularPage from './PopularPage'
import TrendingPage from './TrendingPage'
import MinePage from './MinePage'
import FavouritePage from './FavouritePage'

/**
 * @创建者 :   XP FlyAk
 * @类名 ： MainPage
 * @描述 :
 * @时间 ：2017/12/12 9:50
 * @版本号：
 */

export default class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'Popular',
        }

    }


    componentDidMount() {
        this.listener = DeviceEventEmitter.addListener('showToast', (msg) => {
            ToastAndroid.show(msg, 2000);
        })
    }


    componentWillUnmount() {
        this.listener && this.listener.remove();
    }

    renderTabItem(Component, title,src) {
        return <TabNavigator.Item
            selected={this.state.selectedTab === title}
            title={title}
            selectedTitleStyle={{color: 'red'}}
            renderIcon={() => <Image style={style.icon}
                                     source={src}/>}
            renderSelectedIcon={() => <Image style={style.icon} tintColor={'red'}
                                             source={src}/>}
            // badgeText="1"
            onPress={() => this.setState({selectedTab: title})}>
            {<Component text={this.state.selectedTab} {...this.props}/>}
        </TabNavigator.Item>
    }


    render() {
        return (
            <View style={StyleConstant.contain}>
                <TabNavigator>
                    {this.renderTabItem(PopularPage,'Popular',require('../../res/images/ic_polular.png'))}
                    {this.renderTabItem(TrendingPage,'Trending',require('../../res/images/ic_trending.png'))}
                    {this.renderTabItem(FavouritePage,'Favorite',require('../../res/images/ic_favorite.png'))}
                    {this.renderTabItem(MinePage,'Mine',require('../../res/images/ic_my.png'))}
                </TabNavigator>
            </View>
        )
    }
}

const style = StyleSheet.create({
    icon: {
        height: 20,
        width: 20,
    },
});
