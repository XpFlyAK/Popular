import React, {Component} from 'react'
import {
    View,
    Image,
    Text,
    StyleSheet,
    FlatList,
    Dimensions,
    UIManager,
    ToastAndroid,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Animated,
    TouchableNativeFeedback,
    TouchableHighlight
} from 'react-native'

/**
 * @创建者 :  Xp FlyAK
 * @类名 ： PopFlatList
 * @描述 :
 * @时间 ：2017/12/21 16:39
 * @版本号：
 */

export default class PopFlatList extends Component {
    static defaultProps = {
        x: 100.0,
        y: 100.0,
    };

    constructor(props) {
        super(props);
        this.state = {
            isHide: this.props.isHide,
            fadeAnim: new Animated.Value(0),
        };
    }

    hidePop() {
        // Animated.timing(this.state.fadeAnim,{toValue:0,duration: 2000}).start();
        this.setState({
            isHide: true,
        });
    }

    showPop() {
        // Animated.timing(this.state.fadeAnim,{toValue:1,duration: 2000}).start();
        this.setState({
            isHide: false,
        });
    }

    renderItem(item) {
        return <View style={style.itemContainer}>
            <Text onPress={() => this.hidePop()}
                  style={{color: 'white', textAlign: 'center', fontSize: 16}}>{item.key}</Text>
        </View>
    }


    render() {
        return this.state.isHide === true ? null :
            <View style={style.background}>
                <TouchableOpacity style={{flex: 1, backgroundColor: 'transparent'}}
                                  onPress={() => this.hidePop()}>
                    <View style={[style.container, {
                        left: this.props.x,
                        top: this.props.y
                    }]}>
                        <FlatList
                            data={this.props.dataArray}
                            renderItem={({item}) => this.renderItem(item)}/>
                    </View>
                </TouchableOpacity>
            </View>
    }
}

const style = StyleSheet.create({
    background: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        left: 0,
        top: 0,
        position: 'absolute',
        backgroundColor: 'transparent'
    },
    container: {
        width: 60,
        height: 90,
        backgroundColor: 'black',
        position: 'absolute',
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 10,
    },

    itemContainer: {
        marginTop: 5
    },
});