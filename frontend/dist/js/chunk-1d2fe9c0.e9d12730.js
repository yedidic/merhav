(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1d2fe9c0"],{"44ec":function(t,n,r){"use strict";var a=r("57a7"),e=r.n(a);e.a},5217:function(t,n,r){"use strict";r.r(n);var a=function(){var t=this,n=t.$createElement,r=t._self._c||n;return r("section",{staticClass:"student-aggregate-chart"},[r("canvas",{ref:"chart",attrs:{id:"myChart",width:"400",height:"400"}})])},e=[],s=(r("55dd"),r("5b20")),i=r.n(s),o=void 0,c=function(t){return t.reduce(function(t,n){return t+n})},u={data:function(){return{chart:null}},methods:{renderCanvas:function(){this.chart=new i.a(this.$refs.chart,{type:"line",data:{labels:this.months,datasets:[{label:"ממוצע מד רגשי",data:this.avgs,backgroundColor:["rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(153, 102, 255, 0.2)","rgba(255, 159, 64, 0.2)"],borderColor:["rgba(255,99,132,1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)"],borderWidth:1}]},options:{scales:{yAxes:[{ticks:{beginAtZero:!0}}]}}})}},watch:{"$i18n.locale":function(){o.renderCanvas()}},mounted:function(){this.renderCanvas()},computed:{submissions:function(){return this.$store.getters.loggedinUser.submissions.slice().sort(function(t,n){return t.at-n.at})},months:function(){var t=this;return this.$i18n.locale,this.submissions.map(function(n){var r=n.at;return t.moment(r).format("DD/MM")})},avgs:function(){return this.submissions.map(function(t){var n=t.answers;return c(n)/n.length})}},created:function(){}},h=u,d=(r("44ec"),r("2877")),b=Object(d["a"])(h,a,e,!1,null,"1c6bf110",null);b.options.__file="StudentAggregateChart.vue";n["default"]=b.exports},"57a7":function(t,n,r){}}]);
//# sourceMappingURL=chunk-1d2fe9c0.e9d12730.js.map