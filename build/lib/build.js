/**
 * Created by GuanYong on 2016/9/1.
 */

var Build = function () {
    var fs = require('fs');
    var compressor = require('./yuicompressor');
    var fileUtils = require('./FileUtils');
    var projectPath = '../';
    var srcPath = projectPath + 'src/';
    var outPath = projectPath + 'bin/';
    var config = JSON.parse(fs.readFileSync(projectPath + 'package.json', 'utf-8'));

    /**
     * Init out file directory
     */
    var initOutDirectory = function () {
        if (!fs.existsSync(outPath)) {
            fs.mkdirSync(outPath);
        }
        if (!fs.existsSync(outPath + 'debug/')) {
            fs.mkdirSync(outPath + "debug/");
        }
        if (!fs.existsSync(outPath + 'release/')) {
            fs.mkdirSync(outPath + "release/");
        }
    };

    /**
     * start build
     */
    this.startup = function () {
        initOutDirectory();

        var files = fileUtils.getFileNames(srcPath);
        var scripts = '';
        var bootScript = '';
        for (var i = 0; i < files.length; i++) {
            if (files[i] == 'Boot.js') {
                bootScript = fs.readFileSync(srcPath + files[i], 'utf-8');
            }
            else {
                scripts += fs.readFileSync(srcPath + files[i], 'utf-8');
            }
        }
        scripts += bootScript;
        var debugScripts = scripts.replace(/\@\{Gust.version\}/g, config.version);
        fs.writeFile(outPath + "debug/" + config.name + ".js", debugScripts, 'utf-8');
        compressor.compress(debugScripts, {
            charset: 'utf8',
            type: 'js'
        }, function(err, data, extra) {
            if(err) throw err;
            fs.writeFile(outPath + "release/" + config.name + ".js", data, 'utf-8');
        });
    }
};

(function () {
    var build = new Build();
    build.startup();
})();