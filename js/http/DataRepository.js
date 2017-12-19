import React, {Component} from 'react'
import {View, Image, Text, StyleSheet, AsyncStorage} from 'react-native'

/**
 * @创建者 :  Xp FlyAK
 * @类名 ： DataRepository
 * @描述 :
 * @时间 ：2017/12/19 14:33
 * @版本号：
 */

export default class DataRepository {


    fetchDataRepository(url) {
        return new Promise((resovle, reject) => {
            this.fetchLocalDataRepository(url)
                .then(result => {
                    if (result) {
                        resovle(result)
                    } else {
                        this.fetchNetDataRepository(url)
                            .then(result => resovle(result))
                            .catch(e => resovle(e));
                    }
                })
                .catch(error => {
                    this.fetchNetDataRepository(url)
                        .then(result => resovle(result))
                        .catch(e => reject(e))
                })
        })
    }

    fetchLocalDataRepository(url) {
        return new Promise((resovle, reject) => {
            AsyncStorage.getItem(url, (error, result) => {
                if (!error) {
                    try {
                        resovle(JSON.parse(result))
                    } catch (e) {
                        reject(e)
                    }
                } else {
                    reject(error)
                }
            })
        })
    }

    fetchNetDataRepository(url) {
        return new Promise((resovle, reject) => {
            fetch(url)
                .then(response => response.json())
                .then(result => {
                    if (!result) {
                        reject(new Error('Net data is null'));
                        return;
                    }
                    resovle(result.items);
                    this.saveDataRepository(url, result.items);
                })
                .catch(e => {
                    reject(e)
                })
        })
    }

    saveDataRepository(url, items, callback) {
        if (!url || !items) {
            return;
        }
        let saveData = {items: items, time_update: new Date().getTime()};
        AsyncStorage.setItem(url, JSON.stringify(saveData), callback)
    }

    checkDataDeprecated(longTime) {
        let a = new Date();
        let b = new Date();
        b.setTime(longTime);
        if (a.getMonth() !== b.getMonth()) return false;
        if (a.getDay() !== b.getDay()) return false;
        if (a.getHours()!==b.getHours())return false;
        if (a.getMinutes() !== b.getMinutes()) return false;
        if (b.getTime() - a.getTime()>15000) return false;
        return true;
    }


}