import React, {Component} from 'react'
import {View, Image, Text, StyleSheet, AsyncStorage, ToastAndroid} from 'react-native'

/**
 * @创建者 :  Xp FlyAK
 * @类名 ： DaoUtils
 * @描述 :
 * @时间 ：2017/12/13 16:14
 * @版本号：
 */

export default class DaoUtils {

    static getItemData(key) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(key, (error, result) => {
                if (!error) {
                    resolve(result)
                } else {
                    reject(error)
                }
            })
        });
    }

    static setItemData(key, value) {
        return new Promise((resolve, reject) => {
            AsyncStorage.setItem(key, value, (error) => {
                if (!error) {
                    resolve();
                } else {
                    reject(error)
                }
            })
        });
    }


    static removeItemData(key) {
        return new Promise((resolve, reject) => {
            AsyncStorage.removeItem(key, (error) => {
                if (!error) {
                    resolve()
                } else {
                    reject(error);
                }
            })
        });
    }

}

