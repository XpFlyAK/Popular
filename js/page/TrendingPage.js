import React, {Component} from 'react'
import {
    View, Image, Text, StyleSheet, TextInput, ToastAndroid, UIManager, findNodeHandle,
    TouchableOpacity
} from 'react-native'
import StyleConstant from "../utils/StyleConstant";
import DaoUtils, {FLAG_LANGUAGE} from '../dao/DaoUtils'
import CustomNavigationBar from "../view/CustomNavigationBar";
import HttpUtils from '../http/HttpUtils'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import LoadDataPage from "./LoadDataPage";
import Constants from "../utils/Constants";
import DataRepository, {PAGE_FLAG} from "../http/DataRepository";
import TrendItemPage from "./TrendItemPage";
import PopWindow from '../view/PopWindow'
import PopFlatList from '../view/PopFlatList'

/**
 * @创建者 :  Xp FlyAK
 * @类名 ： TrendingPage
 * @描述 :
 * @时间 ：2017/12/13 16:27
 * @版本号：
 */

export default class TrendingPage extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.languageDao = new DaoUtils(FLAG_LANGUAGE.flag_language);
        this.state = {
            text: '',
            dataArray: [],
            isHide: true,
            X: 0,
            Y: 0,
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

    isHideOver() {
        this.popList.showPop();
    }

    layout(e) {
        UIManager.measure(e.target, (x, y, width, height, left, top) => {
            this.setState({
                X: left,
                Y: top,
            });
        });
    };


    renderTitleView() {
        return <View>
            <TouchableOpacity ref='button' onPress={() => this.isHideOver()}
                              onLayout={({nativeEvent: e}) => this.layout(e)}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                        style={[style.titleStyle, {color: 'white'}]}>{this.props.text}</Text>
                    <Image style={{height: 12, width: 12, marginLeft: 5}}
                           source={require('../../res/images/ic_spinner_triangle.png')}/>
                </View>
            </TouchableOpacity>
        </View>
    }

    render() {
        let popFlatList = <PopFlatList ref={ref => this.popList = ref}
                                       x={this.state.X + 20}
                                       y={this.state.Y + 10}
                                       isHide={true}
                                       dataArray={[{key: 'daily'}, {key: 'weekly'}, {key: 'monthly'}]}/>;

        let popover = <PopWindow show={this.state.isHide}
                                 closeModal={(show) => {
                                     this.setState({isHide: show})
                                 }}
                                 dataArray={['第一!!', '第二!!', '第三!!']}/>;
        let content = this.state.dataArray.length > 0 ?
            <ScrollableTabView tabBarActiveTextColor={'white'}
                               tabBarInactiveTextColor={'mintcream'}
                               tabBarBackgroundColor={'red'}
                               tabBarUnderlineStyle={{backgroundColor: 'yellow', height: 3}}>
                {this.state.dataArray.map((result, i, arr) => {
                    let lan = arr[i];
                    return lan.checked ?
                        <TrendItemPage key={i} tabLabel={lan.name}
                                       loadLabel={lan.name} {...this.props}/> : null;
                })}
            </ScrollableTabView> : null;
        return (
            <View style={style.container}>

                <CustomNavigationBar titleColor={'white'}
                                     titleComponent={this.renderTitleView()}
                                     statusBarProps={{
                                         backgroundColor: 'red',
                                         barStyle: 'light-content',
                                     }}
                />
                {/*{popover}*/}
                {content}
                {popFlatList}
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    titleStyle:{
        fontSize: 18,
        alignSelf: 'center',
        fontWeight: '400',
    },
});