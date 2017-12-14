import React, {Component} from 'react'
import {View, Image, Text, StyleSheet, AsyncStorage, ToastAndroid} from 'react-native'
import key from '../../res/data/keys.json'

/**
 * @创建者 :  Xp FlyAK
 * @类名 ： DaoUtils
 * @描述 :
 * @时间 ：2017/12/13 16:14
 * @版本号：
 */
export let FLAG_LANGUAGE = {flag_language: 'flag_language_language', flag_key: 'flag_language_key'};
export default class DaoUtils {
    constructor(flag) {
        this.flag = flag;
    }


    fetchData() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(this.flag, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if (result) {
                        try {
                            resolve(result)
                        } catch (e) {
                            reject(e)
                        }
                    }else{
                        let data = this.flag === FLAG_LANGUAGE.flag_key?key:null;
                        this.saveData(data);
                        resolve(data)
                    }
                }
            })
        });
    }

    saveData(data){
        AsyncStorage.setItem(this.flag,JSON.stringify(data),(error)=>{})
    }

    removeData(){
        AsyncStorage.removeItem(this.flag,(error=>{}))
    }


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

