// 获取当前时间工具

// 转换格式为：2010-10-20 10:00:00
function getLocalTime() {
  var getlocaldate = new Date().toLocaleDateString().replace(/\//g, '-'); //获取当前日期
  var getlocaltime = new Date().toLocaleTimeString().slice(2);
  const date = getlocaldate + ' ' + getlocaltime;
  return date;
}

module.exports = {
  getLocalTime,
};
