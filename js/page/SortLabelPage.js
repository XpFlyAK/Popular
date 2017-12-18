import React, {Component} from 'react'
import {
    View, Image, Text, StyleSheet, TouchableOpacity, ToastAndroid, Alert,
    TouchableHighlight
} from 'react-native'
import SortableListView from 'react-native-sortable-listview'
import CustomNavigationBar from "../view/CustomNavigationBar";
import ViewUtils from "../utils/ViewUtils";
import DaoUtils, {FLAG_LANGUAGE} from "../dao/DaoUtils";
import StyleConstant from "../utils/StyleConstant";
import ArrayUtils from "../utils/ArrayUtils";

/**
 * @创建者 :  Xp FlyAK
 * @类名 ： SortLabelPage
 * @描述 :
 * @时间 ：2017/12/15 16:51
 * @版本号：
 */
let data = {
    hello: {text: 'world'},
    how: {text: 'are you'},
    test: {text: 123},
    this: {text: 'is'},
    a: {text: 'a'},
    real: {text: 'real'},
    drag: {text: 'drag and drop'},
    bb: {text: 'bb'},
    cc: {text: 'cc'},
    dd: {text: 'dd'},
    ee: {text: 'ee'},
    ff: {text: 'ff'},
    gg: {text: 'gg'},
    hh: {text: 'hh'},
    ii: {text: 'ii'},
    jj: {text: 'jj'},
    kk: {text: 'kk'},
};

let order = Object.keys(data); //Array of keys
export default class SortLabelPage extends Component {
    constructor(props) {
        super(props);
        this.dataArray = [];
        this.sortResultArray = [];
        this.originalArray = [];
        this.state = {
            checkedArray: [],
        };
    }

    componentDidMount() {
        this.languageDao = new DaoUtils(FLAG_LANGUAGE.flag_key);
        this.languageDao.fetchData()
            .then(result => this.loadArray(result))
            .catch(error => ToastAndroid.show('读取失败', 2000))
    }

    loadArray(array) {
        this.dataArray = array;
        let checkArray = [];
        for (let i = 0, len = array.length; i < len; i++) {
            if (array[i].checked) {
                checkArray.push(array[i])
            }
        }
        this.setState({
            checkedArray: checkArray,
        });

        this.originalArray = ArrayUtils.cloneArray(checkArray);
    }

    onSave() {
        if (ArrayUtils.isEqualsArray(this.originalArray, this.state.checkedArray)) {
            this.props.navigation.goBack();
            return;
        }
        this.sortResult();
        this.languageDao.saveData(this.sortResultArray);
        this.props.navigation.goBack()
    }

    sortResult() {
        this.sortResultArray = ArrayUtils.cloneArray(this.dataArray);
        for (let i = 0, len = this.originalArray.length; i < len; i++) {
            let item = this.originalArray[i];
            let index = this.dataArray.indexOf(item);
            this.sortResultArray.splice(index, 1, this.state.checkedArray[i])
        }
        console.log(this.state.checkedArray);
        console.log(this.sortResultArray);
    }

    rightIcon() {
        return <TouchableOpacity onPress={() => this.onSave()}>
            <Text style={{color: 'white', marginRight: 10, fontSize: 18}}>Save</Text>
        </TouchableOpacity>;
    }

    onCallBack() {
        if (ArrayUtils.isEqualsArray(this.originalArray, this.state.checkedArray)) {
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

    render() {
        return (
            <View style={{flex: 1}}>
                <CustomNavigationBar title='SortLabelPage'
                                     backgroundColor='red'
                                     titleColor='white'
                                     statusBarProps={{backgroundColor: 'red'}}
                                     leftIcon={ViewUtils.getLeftButton(() => {
                                         this.onCallBack();
                                     })}
                                     rightIcon={this.rightIcon()}/>
                <SortableListView
                    style={{flex: 1, backgroundColor: 'white'}}
                    data={this.state.checkedArray}
                    order={Object.keys(this.state.checkedArray)}
                    onRowMoved={e => {
                        this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0]);
                        console.log(this.state.checkedArray);
                        this.forceUpdate()
                    }}
                    renderRow={row => <SortListItem data={row}/>}
                />
            </View>
        );
    }
}

class SortListItem extends Component {
    constructor(props) {
        super(props);
        let arrayLength = this.props.data.name;
        console.log(arrayLength)
    }

    render() {
        return (
            <TouchableHighlight
                underlayColor={'#eee'}
                style={style.item}
                {...this.props.sortHandlers}
            >
                <View style={style.itemContain}>
                    <Image style={style.image} source={require('../../res/my/img/ic_sort.png')}/>
                    <Text>{this.props.data.name}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const style = StyleSheet.create({
    item: {
        padding: 15,
        backgroundColor: '#F8F8F8',
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    itemContain: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    image: {
        tintColor: '#2196f3',
        marginRight: 10,
        width: 16,
        height: 16
    },
});