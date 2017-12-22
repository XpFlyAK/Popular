import React, {Component} from 'react'
import {
    Image, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity,
    View,Alert
} from 'react-native'
import CustomNavigationBar from '../view/CustomNavigationBar'
import ViewUtils from "../utils/ViewUtils";
import DaoUtils, {FLAG_LANGUAGE} from '../dao/DaoUtils'
import CheckBox from 'react-native-check-box'
import ArrayUtils from '../utils/ArrayUtils'

/**
 * @创建者 :  Xp FlyAK
 * @类名 ： CustomLabelPage
 * @描述 :
 * @时间 ：2017/12/13 17:20
 * @版本号：
 */

export default class CustomLabelPage extends Component {

    static defaultProps={
        isRemove:false
    };

    constructor(props) {
        super(props);
        this.languageDao = new DaoUtils(this.props.navigation.state.params.flag);//FLAG_LANGUAGE.flag_key
        this.valueArray = [];
        this.state = {
            dataArray: [],
        }
    }

    onCallBack() {
        if (this.valueArray.length===0){
            this.props.navigation.goBack();
            return;
        }
        Alert.alert(
            'Do you want to exit?',
            'Are you sure to save labels?',
            [
                {text: 'Cancel', onPress: () => this.props.navigation.goBack(), style: 'cancel'},
                {text: 'OK', onPress: () => this.onSave()},
            ],
        );
    }

    componentDidMount() {
        console.log(111111);
        this.loadData();
        // this.setState({
        //     dataArray:key,
        // });
    }


    onSave() {
        if (this.valueArray.length === 0) {
            this.props.navigation.goBack();
            return;
        }
        if (this.props.navigation.state.params.isRemove){
            for(let i = 0, len = this.valueArray.length;i<len;i++){
                ArrayUtils.remove(this.state.dataArray,this.valueArray[i])
            }
        }
        this.languageDao.saveData(this.state.dataArray);
        this.props.navigation.goBack();
        // this.languageDao.removeData()
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
            // ToastAndroid.show('empty', 2000);
            return null;
        }
        let viewArray = [];
        let len = this.state.dataArray.length;
        for (let i = 0, l = len - 2; i < l; i += 2) {
            viewArray.push(
                <View key={i}>
                    <View style={{flexDirection: 'row'}}>
                        {/*<Text>{this.state.dataArray[i].name}</Text>
                        <Text>{this.state.dataArray[i + 1].name}</Text>*/}
                        {this.renderCheckBox(this.state.dataArray[i])}
                        {this.renderCheckBox(this.state.dataArray[i + 1])}
                    </View>
                    <View style={style.line}/>
                </View>
            );
        }
        viewArray.push(
            <View key={len - 1}>
                <View style={{flexDirection: 'row'}}>
                    {len % 2 === 0 ? this.renderCheckBox(this.state.dataArray[len - 2]) : null}
                    {this.renderCheckBox(this.state.dataArray[len - 1])}
                </View>
                <View style={style.line}/>
            </View>
        );
        return viewArray;
    }

    renderCheckBox(data) {
        //外部空间是Text  但是传值用得是navigate()方法
        let checked = this.props.navigation.state.params.isRemove===true?false:data.checked;
        return <CheckBox
            style={{padding: 10, flex: 1, justifyContent: 'center'}}
            onClick={() => this.onClick(data)}
            leftText={data.name}
            isChecked={checked}
            unCheckedImage={<Image tintColor={'red'}
                                   source={require('../../res/my/img/ic_check_box_outline_blank.png')}/>}
            checkedImage={<Image tintColor={'red'}
                                 source={require('../../res/my/img/ic_check_box.png')}/>}/>
    }


    onClick(data) {
        data.checked = !data.checked;
        // this.languageDao.saveData(data)
        /*   for(let i = 0,len = this.valueArray.length; i<len; i++ ){
               let boolValue = this.valueArray[i];
               if (boolValue === data.checked){
                   this.valueArray.slice(data.checked,1);
                   return;
               }
           }
           this.valueArray.push(data.checked);*/
        ArrayUtils.updateArray(this.valueArray, data)

    }

    titleComponent() {
        return <Text
            style={[style.titleStyle, {color: 'white'}]}>{this.props.navigation.state.params.text}</Text>
    }

    render() {
        let title = this.props.isRemove===true?'RemoveLabel':'CustomLabel';
        let rightButton = <TouchableOpacity onPress={() => this.onSave()}>
            <Text style={{color: 'white', marginRight: 10, fontSize: 18}}>Save</Text>
        </TouchableOpacity>;
        return (
            <View>
                <CustomNavigationBar
                                     titleComponent={this.titleComponent()}
                                     titleColor={'white'}
                                     leftIcon={ViewUtils.getLeftButton(() => this.onCallBack())}
                                     rightIcon={rightButton}
                                     statusBarProps={{backgroundColor: 'red',}}/>
                <ScrollView>
                    {/*<Text>{JSON.stringify(this.state.dataArray)}</Text>*/}
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

    titleStyle: {
        fontSize: 18,
        alignSelf: 'center',
        fontWeight: '400',
    },

    line: {height: 0.3, backgroundColor: 'gray'},
});