import React, {Component} from 'react'
import {View, Image, Text, StyleSheet} from 'react-native'
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

    render() {
        return (
            <View style={StyleConstant.contain}>
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Popular'}
                        title="popular"
                        selectedTitleStyle={{color: 'red'}}
                        renderIcon={() => <Image style={style.icon}
                                                 source={require('../../res/images/ic_polular.png')}/>}
                        renderSelectedIcon={() => <Image style={style.icon} tintColor={'red'}
                                                         source={require('../../res/images/ic_polular.png')}/>}
                        // badgeText="1"
                        onPress={() => this.setState({selectedTab: 'Popular'})}>
                        {<PopularPage text={this.state.selectedTab}/>}
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Trending'}
                        title="trending"
                        selectedTitleStyle={{color: 'red'}}
                        renderIcon={() => <Image style={style.icon}
                                                 source={require('../../res/images/ic_trending.png')}/>}
                        renderSelectedIcon={() => <Image style={style.icon} tintColor={'red'}
                                                         source={require('../../res/images/ic_trending.png')}/>}
                        // renderBadge={() => <CustomBadgeView />}
                        onPress={() => this.setState({selectedTab: 'Trending'})}>
                        {<TrendingPage />}
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Favorite'}
                        title="favorite"
                        selectedTitleStyle={{color: 'red'}}
                        renderIcon={() => <Image style={style.icon}
                                                 source={require('../../res/images/ic_favorite.png')}/>}
                        renderSelectedIcon={() => <Image style={style.icon} tintColor={'red'}
                                                         source={require('../../res/images/ic_favorite.png')}/>}
                        // renderBadge={() => <CustomBadgeView />}
                        onPress={() => this.setState({selectedTab: 'Favorite'})}>
                        {<FavouritePage />}
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Mine'}
                        title="mine"
                        selectedTitleStyle={{color: 'red'}}
                        renderIcon={() => <Image style={style.icon}
                                                 source={require('../../res/images/ic_my.png')}/>}
                        renderSelectedIcon={() => <Image style={style.icon} tintColor={'red'}
                                                         source={require('../../res/images/ic_my.png')}/>}
                        // renderBadge={() => <CustomBadgeView />}
                        onPress={() => this.setState({selectedTab: 'Mine'})}>
                        {<MinePage navigation={this.props.navigation}/>}
                    </TabNavigator.Item>
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
