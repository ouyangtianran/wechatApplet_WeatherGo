// pages/weather/weather.js
var app = getApp()
var day = ["今天", "明天", "后天"];
Page({
  data: {
    day: day,
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '天气预报',
    })
    console.log('onLoad')
    var that = this
    that.getLocation();
  },
  //获取经纬度方法
  getLocation: function () {
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        console.log("lat:" + latitude + " lon:" + longitude);
        that.locationCorrect(latitude,longitude);
        //that.getCity(latitude, longitude);
      }
    })
  },
  //经纬度转换
  locationCorrect: function (latitude, longitude) {
    var that = this;
    var url = "https://api.map.baidu.com/geoconv/v1/";
    var params = {
      from:1,
      to:5,
      coords:longitude + "," +latitude,
      ak: "9sKYD9RaIg6OdE1vpAn7XTgpMviZaMCC"
    }
    wx.request({
      url: url,
      data: params,
      success: function (res) {
        var baidulat = res.data.result[0].y;
        var baidulon = res.data.result[0].x;
        that.getCity(baidulat,baidulon);
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //获取城市信息
  getCity: function (latitude, longitude) {
    var that = this;
    var url = "https://api.map.baidu.com/geocoder/v2/";
    var params = {
      ak: "yt8WtwE4AiXDXlzgT5XCihULTdoCwr57",
      output: "json",
      location: latitude + "," + longitude
    }
    wx.request({
      url: url,
      data: params,
      success: function (res) {
        var city = res.data.result.addressComponent.city;
        var district = res.data.result.addressComponent.district;
        var street = res.data.result.addressComponent.street;
        that.setData({
          city: city,
          district: district,
          street: street,
        })
        var descCity = city.substring(0, city.length - 1);
        that.getWeahter(descCity);
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //获取天气信息
  getWeahter: function (city) {
    var that = this
    var url = "https://free-api.heweather.com/s6/weather"
    var url2 = "https://free-api.heweather.com/s6/air"
    var parameters = {
      location: city,
      key: "4207b7f9ab62493388401c4afd808c35	"
    }
    wx.request({
      url: url,
      data: parameters,
      success: function (res) {
        console.log(res);
        var tmp = res.data.HeWeather6[0].now.tmp;
        var txt = res.data.HeWeather6[0].now.cond_txt;
        var code = res.data.HeWeather6[0].now.cond_code;
        var dir = res.data.HeWeather6[0].now.wind_dir;
        var sc = res.data.HeWeather6[0].now.wind_sc;
        var hum = res.data.HeWeather6[0].now.hum;
        var fl = res.data.HeWeather6[0].now.fl;
        var daily_forecast = res.data.HeWeather6[0].daily_forecast;
        var life = res.data.HeWeather6[0].lifestyle;
        that.setData({
          tmp: tmp,
          txt: txt,
          code: code,
          dir: dir,
          sc: sc,
          hum: hum,
          fl: fl,
          daily_forecast: daily_forecast
        })
        wx.setStorage({
          key:'life',
          data:life,
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
    wx.request({
      url: url2,
      data: parameters,
      success: function (res) {
        var qlty = res.data.HeWeather6[0].air_now_city.qlty;
        var pm25 = res.data.HeWeather6[0].air_now_city.pm25;
        // var air_forecast = res.data.HeWeather6[0].air_forecast;
        that.setData({
          qlty: qlty,
          pm25: pm25
          // air_forecast: air_forecast
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})
