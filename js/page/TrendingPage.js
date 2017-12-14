import React, {Component} from 'react'
import {View, Image, Text, StyleSheet, TextInput, ToastAndroid} from 'react-native'
import StyleConstant from "../utils/StyleConstant";
import DaoUtils from '../dao/DaoUtils'

/**
 * @创建者 :  Xp FlyAK
 * @类名 ： TrendingPage
 * @描述 :
 * @时间 ：2017/12/13 16:27
 * @版本号：
 */

export default class TrendingPage extends Component {
    constructor(props) {
        super(props);
    }

    onSave() {
        DaoUtils.setItemData(this.text, this.text)
            .then(() => ToastAndroid.show('save success', ToastAndroid.SHORT))
            .catch(error => ToastAndroid.show('save failed', ToastAndroid.SHORT))
    }

    onRemove() {
        DaoUtils.removeItemData(this.text)
            .then(() => ToastAndroid.show('remove success', ToastAndroid.SHORT))
            .catch((error) => ToastAndroid.show('remove failed', ToastAndroid.SHORT))
    }

    onGet() {
        DaoUtils.getItemData(this.text)
            .then((response) => {
                    if (response!==null&&response!=='') {
                        ToastAndroid.show(response,ToastAndroid.SHORT)
                    }else{
                        ToastAndroid.show('cant find element',ToastAndroid.SHORT)
                    }
                }
            )
            .catch((error) => ToastAndroid.show('get failed', ToastAndroid.SHORT))
    }

    render() {
        return (
            <View style={StyleConstant.contain}>
                <TextInput style={[StyleConstant.fullWidth]}
                           onChangeText={(text) => {
                               this.text = text
                           }}/>
                <Text style={{height:30,textAlign:'center'}} onPress={() => this.onSave()}>存储</Text>
                <Text style={{height:30,textAlign:'center'}} onPress={() => this.onGet()}>取出</Text>
                <Text style={{height:30,textAlign:'center'}} onPress={() => this.onRemove()}>移除</Text>
            </View>
        );
    }
}