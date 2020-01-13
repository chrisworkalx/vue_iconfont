var path = require('path');
var fs = require('fs');
var rimraf = require('rimraf');
const openDist = path.join(__dirname, '..', 'dist');
var dirs = fs.readdirSync(openDist);
const resolve = (folder) => {
  // const lisArgs = Array.prototype.slice.call(arguments);
  return path.resolve(__dirname, '..', 'dist', folder);
}

//第一种方法
function delDir(path){
  let files = [];
  if(fs.existsSync(path)){
      files = fs.readdirSync(path);
      files.forEach((file, index) => {
          let curPath = path + "/" + file;
          if(fs.statSync(curPath).isDirectory()){
              delDir(curPath); //递归删除文件夹
          } else {
              fs.unlinkSync(curPath); //删除文件
          }
      });
      // fs.rmdirSync(path); //删除文件夹
  }
}

// 第二种方法
function delFile(path) {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file, index) => {
      let curPath = path + "/" + file;
      if (fs.statSync(curPath).isDirectory()) {
        delFile(curPath); //递归删除文件夹
      } else {
        rimraf(curPath, function (err) { // 删除当前目录下的 test.txt
          if (!err) {
            console.log('删除完成');
          }
        });
      }
    });
  }
}

// delFile(openDist);
delDir(openDist);

