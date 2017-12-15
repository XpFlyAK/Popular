import React, {Component} from 'react'
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native'
import SortableListView from 'react-native-sortable-listview'
import CustomNavigationBar from "../view/CustomNavigationBar";
import ViewUtils from "../utils/ViewUtils";

/**
 * @创建者 :  Xp FlyAK
 * @类名 ： SortLabelPage
 * @描述 :
 * @时间 ：2017/12/15 16:51
 * @版本号：
 */

export default class SortLabelPage extends Component {
    constructor(props) {
        super(props)
    }

    rightIcon() {
        return <TouchableOpacity onPress={() => {}}>
            <Text style={{color: 'white', marginRight: 10, fontSize: 18}}>Save</Text>
        </TouchableOpacity>;
    }

    render() {
        return (
            <View>
                <CustomNavigationBar title='SortLabelPage'
                                     backgroundColor='red'
                                     titleColor='white'
                                     statusBarProps={{backgroundColor: 'red'}}
                                     leftIcon={ViewUtils.getLeftButton(() => {
                                         this.props.navigation.goBack()
                                     })}
                                     rightIcon={this.rightIcon()}/>
                <Text>SortLabelPage</Text>
            </View>
        );
    }
}