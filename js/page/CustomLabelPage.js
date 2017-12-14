import React, {Component} from 'react'
import {ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from 'react-native'
import CustomNavigationBar from '../view/CustomNavigationBar'
import ViewUtils from "../utils/ViewUtils";
import DaoUtils, {FLAG_LANGUAGE} from '../dao/DaoUtils'

const key = [
    {
        "path": "stars:>1",
        "name": "ALL",
        "short_name": "ALL",
        "checked": true
    },
    {
        "path": "Android",
        "name": "Android",
        "checked": true
    },
    {
        "path": "iOS",
        "name": "iOS",
        "checked": true
    },
    {
        "path": "react-native",
        "name": "React Native",
        "checked": false
    },
    {
        "path": "MySQL",
        "name": "MySQL",
        "checked": false
    },
    {
        "path": " AngularJS",
        "name": " AngularJS",
        "checked": false
    },
    {
        "path": " jQuery",
        "name": " jQuery",
        "checked": false
    },
    {
        "path": " react",
        "name": " React",
        "checked": false
    }
];
/**
 * @创建者 :  Xp FlyAK
 * @类名 ： CustomLabelPage
 * @描述 :
 * @时间 ：2017/12/13 17:20
 * @版本号：
 */

export default class CustomLabelPage extends Component {
    constructor(props) {
        super(props);
        this.languageDao = new DaoUtils(FLAG_LANGUAGE.flag_key);
        this.state = {
            dataArray: []
        }
    }

    onCallBack() {
        this.props.navigation.goBack();
    }

    componentDidMount() {
        this.loadData();
        // this.setState({
        //     dataArray:key,
        // });
    }


    onSave() {
        this.languageDao.removeData()
    };

    loadData() {
        this.languageDao.fetchData()
            .then((result) => {
                this.setState({
                    dataArray: result,
                });
            })
            .catch((error) => ToastAndroid.show('error', 2000))
    }

    labelList() {
        if (!this.state.dataArray || this.state.dataArray.length === 0) {
            ToastAndroid.show('empty', 2000);
            return null;
        }
        let viewArray = [];
        let len = this.state.dataArray.length;
        for (let i = 0, l = len - 2; i < l; i += 2) {
            viewArray.push(
                <View key={i}>
                    <View style={{flexDirection: 'row'}}>
                        <Text>{this.state.dataArray[i].name}</Text>
                        <Text>{this.state.dataArray[i + 1].name}</Text>
                    </View>
                    <View style={{height: 1, backgroundColor: 'black'}}/>
                </View>
            );
        }
        viewArray.push(
            <View key={len - 1}>
                <View style={{flexDirection:'row'}}>
                    {len % 2 === 0 ? <Text>{this.state.dataArray[len - 2].name}</Text> : null}
                    <Text>{this.state.dataArray[len - 1].name}</Text>
                </View>
                <View style={{height: 1, backgroundColor: "black"}}/>
            </View>
        );
        return viewArray;

    }

    render() {
        let rightButton = <TouchableOpacity onPress={() => this.onSave()}>
            <Text style={{color: 'white', marginRight: 10, fontSize: 18}}>save</Text>
        </TouchableOpacity>;
        return (
            <View>
                <CustomNavigationBar title='CustomLabel'
                                     titleColor={'white'}
                                     leftIcon={ViewUtils.getLeftButton(() => this.onCallBack())}
                                     rightIcon={rightButton}
                                     statusBarProps={{backgroundColor: 'red',}}/>
                <ScrollView>
                    <Text>{JSON.stringify(this.state.dataArray)}</Text>
                    {this.labelList()}
                </ScrollView>
            </View>
        );
    }
}

const style = StyleSheet.create({
    item: {
        alignItems: 'center',
        flexDirection: 'row'
    },
});