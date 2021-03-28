import { get, post } from './core';

/**
 * 获取目录列表
 */
export const get_material_folder = () => {
    return new Promise((res, rej) => {
        const json = require('./json-data/material_folder.json');
        res(json);
    });
};

/**
 * 获取目录列表
 */
export const get_material_folder_detail = () => {
    return new Promise((res, rej) => {
        const json = require('./json-data/material_folder_details.json');
        res(json);
    });
};
