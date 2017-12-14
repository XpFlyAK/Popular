import React, {Component} from 'react'
import {View, Image, Text, StyleSheet} from 'react-native'
import StyleConstant from "../utils/StyleConstant";
import CustomNavigationBar from "../view/CustomNavigationBar";
import HttpUtils from '../http/HttpUtils'
import Constants from '../utils/Constants'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import LoadDataPage from "./LoadDataPage";

/**
 * @创建者 :  Xp FlyAK
 * @类名 ： PopularPage
 * @描述 :
 * @时间 ：2017/12/12 11:07
 * @版本号：
 */

export default class PopularPage extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            text: '',
        };
    }

    getData() {
        HttpUtils.getFetch(Constants.API_URL + 'android' + Constants.QUERY_STR)
            .then(response => this.setState({text: JSON.stringify(response)}))
            .catch(error => this.setState({text: JSON.stringify(error)}))
    }


    render() {
        return (
            <View style={StyleConstant.contain}>
                <CustomNavigationBar titleColor={'white'}
                                     title={this.props.text}
                                     statusBarProps={{
                                         backgroundColor: 'red',
                                         barStyle: 'light-content',
                                     }}
                />
                <ScrollableTabView tabBarActiveTextColor={'white'}
                                   tabBarInactiveTextColor={'mintcream'}
                                   tabBarBackgroundColor={'red'}
                                   tabBarUnderlineStyle={{backgroundColor:'yellow',height:3}}>
                    <View tabLabel={'Android'}>
                        {<LoadDataPage loadLabel={'Android'}/>}
                    </View>
                    <View tabLabel={'React'}>
                        {<LoadDataPage loadLabel={'React'}/>}
                    </View>
                    <View tabLabel={'IOS'}>
                        {<LoadDataPage loadLabel={'IOS'}/>}
                    </View>
                </ScrollableTabView>

            </View>
        );
    }
}

const style = StyleSheet.create({});
