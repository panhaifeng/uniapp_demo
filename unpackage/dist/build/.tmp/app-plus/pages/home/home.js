(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/home/home"],{"09a4":function(t,i,e){"use strict";(function(t,e){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var o={data:function(){return{cardCur:0,swiperList:[{id:0,type:"image",url:"https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg"},{id:1,type:"image",url:"https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg"},{id:2,type:"image",url:"https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg"},{id:3,type:"image",url:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg"},{id:4,type:"image",url:"https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg"},{id:5,type:"image",url:"https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg"},{id:6,type:"image",url:"https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg"}],dotStyle:!0,towerStart:0,direction:"",gridCol:3,gridBorder:!1,ButtonsMenu:[{titleBlock:"demo",buttons:[{text:"登录页",icon:"cardboardfill",path:"../../pages/login/login",color:"red",badge:1},{text:"表单",icon:"cardboardfill",path:"../../pages/component/form",color:"red",badge:2},{text:"列表",icon:"recordfill",path:"../../pages/demo/list/list"}]},{titleBlock:"面料仓库",buttons:[{text:"生产入库",icon:"cardboardfill",path:""},{text:"采购入库",icon:"recordfill",path:""},{text:"客供入库",icon:"picfill",path:""},{text:"其他入库",icon:"noticefill",path:""},{text:"入库查询",icon:"upstagefill",path:""},{text:"领用出库",icon:"clothesfill",path:""},{text:"其他出库",icon:"discoverfill",path:""},{text:"出库查询",icon:"questionfill",path:""},{text:"补打标签",icon:"commandfill",path:""},{text:"库位调整",icon:"brandfill",path:""},{text:"库存盘点",icon:"noticefill",path:""}]},{titleBlock:"辅料仓库",buttons:[{text:"采购入库",icon:"cardboardfill",path:""},{text:"客供入库",icon:"recordfill",path:""},{text:"其他入库",icon:"picfill",path:""},{text:"入库查询",icon:"noticefill",path:""},{text:"领用出库",icon:"upstagefill",path:""},{text:"其他出库",icon:"clothesfill",path:""},{text:"出库查询",icon:"discoverfill",path:""},{text:"补打标签",icon:"questionfill",path:""},{text:"库位调整",icon:"commandfill",path:""},{text:"库存盘点",icon:"brandfill",path:""}]}]}},onLoad:function(){},mounted:function(){t.showLoading({title:"载入中",mask:!0});var i=this.serverUrl,o=this;t.request({url:i+"uniapp/api/getSwiperImages",success:function(t){if(200!=t.data.status)return alert("出错"),!1;o.imgList=t.data.data,console.log(e("api返回成功",o.imgList," at pages\\home\\home.vue:155"))},complete:function(){t.hideLoading()}})},methods:{}};i.default=o}).call(this,e("6e42")["default"],e("0de9")["default"])},4985:function(t,i,e){"use strict";var o=function(){var t=this,i=t.$createElement;t._self._c},l=[];e.d(i,"a",function(){return o}),e.d(i,"b",function(){return l})},"57cd":function(t,i,e){"use strict";e.r(i);var o=e("09a4"),l=e.n(o);for(var n in o)"default"!==n&&function(t){e.d(i,t,function(){return o[t]})}(n);i["default"]=l.a},"5fe1":function(t,i,e){},"631f":function(t,i,e){"use strict";e.r(i);var o=e("4985"),l=e("57cd");for(var n in l)"default"!==n&&function(t){e.d(i,t,function(){return l[t]})}(n);e("b34f");var a=e("2877"),c=Object(a["a"])(l["default"],o["a"],o["b"],!1,null,null,null);i["default"]=c.exports},b34f:function(t,i,e){"use strict";var o=e("5fe1"),l=e.n(o);l.a}},[["1434","common/runtime","common/vendor"]]]);