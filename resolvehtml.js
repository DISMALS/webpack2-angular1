const fs = require('fs');
const path = require('path');
module.exports = (paths,filepath) => {
    let htmlFileArr = [];
    const reg = /\.html$/i;
    let filedir = fs.readdirSync(paths);
    filedir.map((file) => {
        let files = fs.readdirSync(paths + file);
        files.map((fileCon) => {
            if(reg.test(fileCon)){
                htmlFileArr.push(path.normalize(path.join(filepath + file,fileCon)));
            }
        });
    });
    
    return htmlFileArr;
}
