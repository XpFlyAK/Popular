import React, {Component} from 'react'
import {View, Image, Text, StyleSheet} from 'react-native'

/**
 * @创建者 :  Xp FlyAK
 * @类名 ： HttpUtils
 * @描述 :
 * @时间 ：2017/12/12 11:20
 * @版本号：
 */

export default class HttpUtils {

    static getValueFetch() {

    }

    static getFetch(url) {
        return new Promise((resolve, reject) => {
            fetch(url).then(response => response.json())
                .then(response => resolve(response))
                .catch(error => reject(error))
        });
    }

    static postFetch(url, data) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => response.json())
                .then(response => resolve(response))
                .catch(error => reject(error))
        });
    }

}