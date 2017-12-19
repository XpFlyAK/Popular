import React, {Component} from 'react'
import {
    View,
    Image,
    Text,
    StyleSheet,
    ListView,
    FlatList,
    TouchableOpacity,
    RefreshControl,
    Dimensions,
    ToastAndroid,
    DeviceEventEmitter
} from 'react-native'
import Constants from "../utils/Constants";
import HttpUtils from "../http/HttpUtils";
import StyleConstant from "../utils/StyleConstant";
import DataRepository from '../http/DataRepository'


/**
 * @创建者 :  Xp FlyAK
 * @类名 ： LoadDataPage
 * @描述 :
 * @时间 ：2017/12/12 15:28
 * @版本号：
 */

export default class LoadDataPage extends Component {

    static defaultProps = {
        loadLabel: ''
    };

    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository();
        this.state = {
            dataSource: null,
            isRefresh: false,
        }
    }

    getData() {
        let url = Constants.API_URL + this.props.loadLabel + Constants.QUERY_STR;
        this.setState({isRefresh: true});
        this.dataRepository.fetchDataRepository(url)
            .then(result => {
                let items = result && result.items ? result.items : result ? result : [];
                this.setState({
                    dataSource: items,
                    isRefresh: false
                });
                if (result && result.time_update && !this.dataRepository.checkDataDeprecated(result.time_update)) {
                    DeviceEventEmitter.emit('showToast', '数据过期');
                    return this.dataRepository.fetchNetDataRepository(url);
                } else {
                    DeviceEventEmitter.emit('showToast', '读取本地数据');
                }
            })
            .then(items => {
                if (!items && items.length === 0)
                    return;
                this.setState({
                    dataSource: items,
                });
                DeviceEventEmitter.emit('showToast', '加载网络数据');
            })
            .catch(error => {
                this.setState({isRefresh: false});
            });
        /*HttpUtils.getFetch(Constants.API_URL + this.props.loadLabel + Constants.QUERY_STR)
            .then(response => {
                this.setState({
                    dataSource: response.items,
                    isRefresh: false
                });
            })
            .catch(error => {
                ToastAndroid.show("error", 2000);
                this.setState({isRefresh: false});
            })*/
    }

    componentDidMount() {
        this.getData();
    }


    renderItem(item) {
        return (
            <TouchableOpacity style={StyleConstant.contain}>
                <View style={style.cell_container}>
                    <Text style={style.title}>{item.name}</Text>
                    <Text style={style.description}>{item.description}</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <View style={{marginTop: 10, flexDirection: 'row'}}>
                            <Text>author:</Text>
                            <Image style={{marginLeft: 5, height: 22, width: 22}}
                                   source={{uri: item.owner.avatar_url}}/>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text>Stars: {item.stargazers_count}</Text>
                        </View>
                        <Image style={{height: 22, width: 22}}
                               source={require('../../res/images/ic_unstar.png')}/>
                    </View>
                </View>
            </TouchableOpacity>
        )

    }

    _keyExtractor(item, index) {
        return item.id;
    }


    render() {
        return (
            <View style={StyleConstant.fullScreen}>
                <FlatList renderItem={({item}) => this.renderItem(item)}
                          data={this.state.dataSource}
                          refreshControl={<RefreshControl refreshing={this.state.isRefresh}
                                                          onRefresh={() => this.getData()}
                                                          colors={['red', 'blue', 'yellow', 'black']}/>}
                          keyExtractor={this._keyExtractor}/>
            </View>

        );
    }
}
const style = StyleSheet.create({
    title: {fontSize: 16, color: 'black', marginBottom: 2},
    description: {fontSize: 14, marginBottom: 2},
    cell_container: {
        margin: 10,
        backgroundColor: 'white',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,
        borderWidth: 0.5,
        borderColor: '#dddddd',
        borderRadius: 2,
        elevation: 3,
    },
});