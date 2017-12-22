import React, {Component} from 'react'
import {View, Image, Text, StyleSheet, ToastAndroid} from 'react-native'
import StyleConstant from "../utils/StyleConstant";
import CustomNavigationBar from "../view/CustomNavigationBar";
import HttpUtils from '../http/HttpUtils'
import Constants from '../utils/Constants'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import LoadDataPage from "./LoadDataPage";
import DaoUtils, {FLAG_LANGUAGE} from '../dao/DaoUtils'

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
        this.languageDao = new DaoUtils(FLAG_LANGUAGE.flag_key);
        this.state = {
            text: '',
            dataArray: [],
        };
    }

    componentDidMount() {
        this.onLoadData();
    }

    getData() {
        HttpUtils.getFetch(Constants.API_URL + 'android' + Constants.QUERY_STR)
            .then(response => this.setState({text: JSON.stringify(response)}))
            .catch(error => this.setState({text: JSON.stringify(error)}))
    }

    onLoadData() {
        this.languageDao.fetchData()
            .then((result) => {
                this.setState({
                    dataArray: result,
                })
            })
            .catch(error => ToastAndroid.show('读取数据库失败', 2000))
    };

    addLanguagePage(dataArray) {
        let viewArray = [];
        if (!dataArray || dataArray.length === 0) {
            return;
        }
        for (let i = 0, l = dataArray.length; i < l; i++) {
            viewArray.push(
                <View tabLabel={dataArray[i].name}>
                    <LoadDataPage tabLabel={dataArray[i].name} loadLabel={dataArray[i].name}/>
                </View>)
        }
        return viewArray;
    }

    titleComponent() {
        return <Text
            style={[style.titleStyle, {color: 'white'}]}>{this.props.text}</Text>
    }

    render() {
        let content = this.state.dataArray.length > 0 ?
            <ScrollableTabView tabBarActiveTextColor={'white'}
                               tabBarInactiveTextColor={'mintcream'}
                               tabBarBackgroundColor={'red'}
                               tabBarUnderlineStyle={{backgroundColor: 'yellow', height: 3}}>
                {this.state.dataArray.map((result, i, arr) => {
                    let lan = arr[i];
                    return lan.checked ?
                        <LoadDataPage key={i} tabLabel={lan.name}
                                      loadLabel={lan.name} {...this.props}/> : null;
                })}
            </ScrollableTabView> : null;
        return (
            <View style={StyleConstant.contain}>
                <CustomNavigationBar // title={this.props.text}
                    titleComponent={this.titleComponent()}
                    statusBarProps={{
                        backgroundColor: 'red',
                        barStyle: 'light-content',
                    }}/>
                {content}
            </View>
        );
    }
}

const style = StyleSheet.create({
    titleStyle: {
        fontSize: 18,
        alignSelf: 'center',
        fontWeight: '400',
    },
});
