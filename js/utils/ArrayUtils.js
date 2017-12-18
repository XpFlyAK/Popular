import React, {Component} from 'react'
import {View, Image, Text, StyleSheet} from 'react-native'

/**
 * @创建者 :  Xp FlyAK
 * @类名 ： ArrayUtils
 * @描述 :
 * @时间 ：2017/12/15 11:07
 * @版本号：
 */

export default class ArrayUtils {

    //更新数组  没有数据则添加  有则删除重新添加
    static updateArray(valueArray, itemKey) {
        for (let i = 0, len = valueArray.length; i < len; i++) {
            let boolValue = valueArray[i];
            if (boolValue === itemKey) {
                valueArray.slice(itemKey, 1);
                return;
            }
        }
        valueArray.push(itemKey);
    }


    //复制传入的数组
    static cloneArray(array) {
        if (!array) {
            return []
        }
        let cloneArray = [];
        for (let i = 0, len = array.length; i < len; i++) {
            cloneArray[i] = array[i];
        }
        return cloneArray;
    }
    //两个数组是否相等
    static isEqualsArray(arr1,arr2) {
        if (!(arr1 && arr2)) {
            return false;
        }
        if (arr1.length !== arr2.length) {
            return false;
        }
        for(let i = 0,len = arr1.length;i<len;i++){
            if (arr1[i]!==arr2[i]){
                return false;
            }
        }
        return true;
    }

}