import React, {Component} from 'react'
import {View, Image, Text, StyleSheet} from 'react-native'

/**
 * @创建者 :  Xp FlyAK
 * @类名 ： Constants
 * @描述 :
 * @时间 ：2017/12/12 11:27
 * @版本号：
 */

export default class Constants {
    static  API_URL = 'https://api.github.com/search/repositories?q=';
    static  QUERY_STR = '&sort=stars';
}