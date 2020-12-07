(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{39:function(e,t,n){},40:function(e,t,n){},41:function(e,t,n){},54:function(e,t,n){},55:function(e,t,n){},56:function(e,t,n){"use strict";n.r(t);var c=n(1),s=n(0),r=n.n(s),a=n(25),i=n.n(a),o=(n(39),n(10)),u=n(3),l=(n(40),n(13)),b=(n(41),function(){var e=Object(u.f)(),t=Object(s.useState)(""),n=Object(l.a)(t,2),r=n[0],a=n[1];return Object(c.jsxs)("div",{className:"Intro",children:[Object(c.jsx)("header",{className:"Intro-header",children:"Gender Bias Viewer"}),Object(c.jsx)("p",{children:"Enter a sentence in English below to view the gender bias in each word"}),Object(c.jsxs)("form",{className:"Intro-searchForm",onSubmit:function(t){t.preventDefault(),e.push("/query?sentence=".concat(encodeURIComponent(r)))},children:[Object(c.jsx)("input",{className:"Intro-search",required:!0,type:"text",value:r,onChange:function(e){return a(e.target.value)}}),Object(c.jsx)("button",{className:"Intro-go",children:"Go"})]}),Object(c.jsxs)("p",{className:"Intro-inspiration",children:["Need some inspiration? Try these:",Object(c.jsx)("br",{}),Object(c.jsx)(o.b,{to:"/query?sentence=The doctor liked to gossip",children:"The doctor liked to gossip"}),Object(c.jsx)("br",{}),Object(c.jsx)(o.b,{to:"/query?sentence=The librarian found gave him a book about a genius scientist",children:"The librarian found gave him a book about a genius scientist"})]})]})}),d=n(27),j=n(33),h=n(32),O=n.n(h),m=(n(54),function(){return Object(c.jsx)("div",{className:"Loading",children:"\u25d1"})}),x=(n(55),function(e,t){var n=!1;"#"===e[0]&&(e=e.slice(1),n=!0);var c=parseInt(e,16),s=(c>>16)+t;s>255?s=255:s<0&&(s=0);var r=(c>>8&255)+t;r>255?r=255:r<0&&(r=0);var a=(255&c)+t;return a>255?a=255:a<0&&(a=0),(n?"#":"")+(a|r<<8|s<<16).toString(16)}),f=function(e){return Math.min(Math.abs(e),.3)/.3},v=function(e){var t=g(e)?"#3F8EAA":"#AA3F8E";return x(t,120*(1-f(e)))},p=function(e){return f(e)<.1},g=function(e){return e>0},y=function(e){if(p(e))return"unbiased";var t=g(e)?"male":"female",n=f(e),c="slight";return n>.3&&(c="moderate"),n>.6&&(c="strong"),"".concat(c," ").concat(t," bias")},N=function(){var e,t=new URLSearchParams(Object(u.g)().search),n=Object(u.f)(),r=Object(s.useState)(t.get("sentence")||""),a=Object(l.a)(r,2),i=a[0],o=a[1],b=Object(j.a)({path:"".concat("https://gender-bias-api.chanind.com","/detect?sentence=").concat(encodeURIComponent(null!==(e=t.get("sentence"))&&void 0!==e?e:""))}),h=b.data,x=b.error,N=b.loading;return Object(c.jsxs)("div",{className:"Query",children:[Object(c.jsx)("header",{className:"Query-header",children:"Gender Bias Viewer"}),Object(c.jsxs)("form",{onSubmit:function(e){e.preventDefault(),n.push("/query?sentence=".concat(encodeURIComponent(i)))},children:[Object(c.jsx)("input",{className:"Query-search",type:"text",value:i,onChange:function(e){return o(e.target.value)}}),Object(c.jsx)("button",{className:"Query-searchButton",children:"Update"})]}),N&&Object(c.jsx)(m,{}),x&&Object(c.jsx)("div",{className:"Query-error",children:Object(c.jsx)("div",{className:"Query-errorInner",children:x.message})}),Object(c.jsx)("div",{className:"Query-results",children:null===h||void 0===h?void 0:h.results.map((function(e,t){return Object(c.jsxs)("div",{className:O()("Query-result",{"is-maleBias":g(e.bias),"is-femaleBias":!g(e.bias),"is-unbiased":p(e.bias)}),children:[Object(c.jsx)("div",{children:e.token}),Object(c.jsx)("div",{className:"Query-resultBias",style:{width:(n=e.bias,"".concat(50*f(n),"%")),background:v(e.bias)},children:Object(c.jsx)("div",{className:"Query-resultBiasPointer",style:Object(d.a)({},g(e.bias)?"borderRightColor":"borderLeftColor",v(e.bias))})}),Object(c.jsx)("div",{className:"Query-resultBiasText",children:y(e.bias)})]},t);var n}))})]})};var I=function(){return Object(c.jsx)("div",{className:"App",children:Object(c.jsx)(o.a,{children:Object(c.jsxs)(u.c,{children:[Object(c.jsx)(u.a,{exact:!0,path:"/",children:Object(c.jsx)(b,{})}),Object(c.jsx)(u.a,{exact:!0,path:"/query",children:Object(c.jsx)(N,{})})]})})})},Q=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,57)).then((function(t){var n=t.getCLS,c=t.getFID,s=t.getFCP,r=t.getLCP,a=t.getTTFB;n(e),c(e),s(e),r(e),a(e)}))};i.a.render(Object(c.jsx)(r.a.StrictMode,{children:Object(c.jsx)(I,{})}),document.getElementById("root")),Q()}},[[56,1,2]]]);
//# sourceMappingURL=main.ff58b00d.chunk.js.map