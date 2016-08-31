/**
 * Created by GuanYong on 16/9/1.
 */

var FileUtils = function () {
    var fs = require('fs');

    /**
     * 根据路径获取文件名
     * @param path {String} 需要获取的路径
     * @returns {Array} 文件名数组
     */
    this.getFileNames = function (path) {
        var result = [];
        var fns = fs.readdirSync(path);
        var folders = [];
        for(var i = 0; i < fns.length; i++){
            var stat = fs.statSync(path + fns[i]);
            if(stat.isDirectory()){
                folders[folders.length] = fns[i] + "/";
            }else{
                result[result.length] = fns[i];
            }
        }
        for(var i = 0; i < folders.length; i++){
            var r = this.getFileNames(path + folders[i]);
            for(var j = 0; j < r.length; j++){
                result[result.length] = folders[i] + r[j];
            }
        }
        return result;
    };

    /**
     * 根据路径获取所有子孙目录
     * @param path {String} 需要获取的路径
     * @returns {Array} 文件目录数组
     */
    this.getChildFolders = function (path) {
        var result = [];
        var fns = fs.readdirSync(path);
        for(var i = 0; i < fns.length; i++){
            var stat = fs.statSync(path + fns[i]);
            if(stat.isDirectory()){
                result[result.length] = fns[i];
            }
        }
        return result;
    }
};

module.exports = new FileUtils();