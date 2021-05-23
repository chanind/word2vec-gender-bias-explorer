(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{39:function(e,t,r){},40:function(e,t,r){},41:function(e,t,r){},54:function(e,t,r){},55:function(e,t,r){},56:function(e,t,r){},57:function(e,t,r){},58:function(e,t,r){"use strict";r.r(t);var n=r(1),s=r(0),a=r.n(s),c=r(25),i=r.n(c),o=(r(39),r(8)),l=r(3),d=(r(40),r(13)),h=(r(41),function(){var e=Object(l.f)(),t=Object(s.useState)(""),r=Object(d.a)(t,2),a=r[0],c=r[1];return Object(n.jsxs)("div",{className:"Intro",children:[Object(n.jsx)("header",{className:"Intro-header",children:"Word2Vec Gender Bias Explorer"}),Object(n.jsx)("p",{className:"Intro-subheader",children:"Enter a word or sentence below to view the gender bias in each word"}),Object(n.jsx)("form",{className:"Intro-searchForm",onSubmit:function(t){t.preventDefault(),""!==a.trim()&&e.push("/query?sentence=".concat(encodeURIComponent(a)))},children:Object(n.jsxs)("div",{className:"Intro-searchFormInner",children:[Object(n.jsx)("input",{className:"Intro-search",required:!0,type:"text",value:a,onChange:function(e){return c(e.target.value)}}),Object(n.jsx)("button",{className:"Intro-go",children:"Go"})]})}),Object(n.jsxs)("p",{className:"Intro-inspiration",children:["Need some inspiration? Try these:",Object(n.jsx)("br",{}),Object(n.jsx)(o.b,{to:"/query?sentence=The librarian punched the firefighter",children:"The librarian punched the firefighter"}),Object(n.jsx)("br",{}),Object(n.jsx)(o.b,{to:"/query?sentence=She plays tennis, football, and baseball",children:"She plays tennis, football, and baseball"}),Object(n.jsx)("br",{}),Object(n.jsx)(o.b,{to:"/query?sentence=Don't be bossy, be aggressive",children:"Don't be bossy, be aggressive"}),Object(n.jsx)("br",{}),Object(n.jsx)(o.b,{to:"/query?sentence=The hero saved everyone using science",children:"The hero saved everyone using science"})]})]})}),b=r(27),j=r(33),u=r(32),m=r.n(u),f=(r(54),function(){return Object(n.jsx)("div",{className:"Loading",children:"\u25d1"})}),p=(r(55),function(e,t){var r=!1;"#"===e[0]&&(e=e.slice(1),r=!0);var n=parseInt(e,16),s=(n>>16)+t;s>255?s=255:s<0&&(s=0);var a=(n>>8&255)+t;a>255?a=255:a<0&&(a=0);var c=(255&n)+t;return c>255?c=255:c<0&&(c=0),(r?"#":"")+(c|a<<8|s<<16).toString(16)}),x=(r(56),function(){return Object(n.jsxs)("div",{className:"Faq",children:[Object(n.jsx)("h4",{className:"Faq-title",children:"How does this work?"}),Object(n.jsxs)("p",{className:"Faq-description",children:["This tool is based on the paper"," ",Object(n.jsx)("a",{target:"_blank",rel:"noreferrer",href:"https://proceedings.neurips.cc/paper/2016/file/a486cd07e4ac3d270571622f4f316ec5-Paper.pdf",children:"Man is to Computer Programmer as Woman is to Homemaker? Debiasing Word Embeddings"}),", and uses pretrained word embeddings from the"," ",Object(n.jsx)("a",{target:"_blank",rel:"noreferrer",href:"https://code.google.com/archive/p/word2vec/",children:"Google News word2vec dataset"}),'. It works by looking at differences between male and female word pairs like "he" and "she", or "boy" and "girl", and then comparing the differences between those words to other word vectors in the word2vec dataset.']}),Object(n.jsx)("h4",{className:"Faq-title",children:"This code is all wrong!"}),Object(n.jsxs)("p",{className:"Faq-description",children:["If you think there's a mistake in the way this is coded, or if you have ideas for improvement or want to collaborate, please open an issue or make a pull request on the"," ",Object(n.jsx)("a",{target:"_blank",rel:"noreferrer",href:"https://github.com/chanind/word2vec-gender-bias-explorer",children:"Github repo"}),". Contributions are very welcome :)"]}),Object(n.jsx)("h4",{className:"Faq-title",children:"Work with me!"}),Object(n.jsxs)("p",{className:"Faq-description",children:["I'm interested in doing a PhD in NLP in 2022, and would love to work with researchers doing NLP work in the meantime. Please reach out at"," ",Object(n.jsx)("a",{href:"mailto:chanindav@gmail.com",children:"chanindav@gmail.com"})," if you have a project I can be a part of."]})]})}),O="https://gender-bias-api.chanind.com",v=function(e){return Math.min(Math.abs(e),.7)/.7},g=function(e){var t=C(e)?"#3F8EAA":"#AA3F8E";return p(t,120*(1-v(e.bias)))},y=function(e){return!!e.parts.every((function(e){return e.skip}))||e.bias<0&&e.bias>-.2},C=function(e){return!y(e)&&e.bias>0},N=function(e){if(y(e))return"unbiased";var t=C(e)?"male":"female",r=v(e.bias),n="slight";return r>.3&&(n="moderate"),r>.6&&(n="strong"),"".concat(n," ").concat(t," bias")},w=function(){var e,t=new URLSearchParams(Object(l.g)().search),r=Object(l.f)(),a=Object(s.useState)(t.get("sentence")||""),c=Object(d.a)(a,2),i=c[0],h=c[1],u=Object(j.a)({path:"".concat(O,"/detect?sentence=").concat(encodeURIComponent(null!==(e=t.get("sentence"))&&void 0!==e?e:""))}),p=u.data,w=u.error,I=u.loading;return Object(n.jsxs)("div",{className:"Query",children:[Object(n.jsx)("header",{className:"Query-header",children:Object(n.jsx)(o.b,{to:"/",children:"Word2Vec Gender Bias Explorer"})}),Object(n.jsxs)("form",{className:"Query-searchBox",onSubmit:function(e){e.preventDefault(),""!==i.trim()&&r.push("/query?sentence=".concat(encodeURIComponent(i)))},children:[Object(n.jsx)("input",{className:"Query-search",type:"text",value:i,onChange:function(e){return h(e.target.value)}}),Object(n.jsx)("button",{className:"Query-searchButton",children:"Update"})]}),I&&Object(n.jsx)(f,{}),w&&Object(n.jsx)("div",{className:"Query-error",children:Object(n.jsx)("div",{className:"Query-errorInner",children:w.message})}),Object(n.jsx)("div",{className:"Query-results",children:null===p||void 0===p?void 0:p.results.map((function(e,t){return Object(n.jsxs)("div",{className:m()("Query-result",{"is-maleBias":C(e),"is-femaleBias":!C(e),"is-unbiased":y(e)}),children:[Object(n.jsx)("div",{children:e.token}),Object(n.jsx)("div",{className:"Query-resultBias",style:{width:(r=e,"".concat(50*v(r.bias),"%")),background:g(e)},children:Object(n.jsx)("div",{className:"Query-resultBiasPointer",style:Object(b.a)({},C(e)?"borderRightColor":"borderLeftColor",g(e))})}),Object(n.jsx)("div",{className:"Query-resultBiasText",children:N(e)})]},t);var r}))}),Object(n.jsx)("div",{className:"Query-faqContainer",children:Object(n.jsx)(x,{})})]})},I=(r(57),function(){return Object(n.jsx)("a",{href:"https://github.com/chanind/word2vec-gender-bias-explorer",className:"OctocatCorner","aria-label":"View source on GitHub",children:Object(n.jsxs)("svg",{width:"80",height:"80",viewBox:"0 0 250 250",style:{fill:"#fff",color:"#282c34",position:"absolute",top:0,border:0,right:0},"aria-hidden":"true",children:[Object(n.jsx)("path",{d:"M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"}),Object(n.jsx)("path",{d:"M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2",fill:"currentColor",style:{transformOrigin:"130px 106px"},className:"OctocatCorner-arm"}),Object(n.jsx)("path",{d:"M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z",fill:"currentColor",className:"OctocatCorner-body"})]})})});var k=function(){return Object(n.jsxs)("div",{className:"App",children:[Object(n.jsx)(I,{}),Object(n.jsx)(o.a,{children:Object(n.jsxs)(l.c,{children:[Object(n.jsx)(l.a,{exact:!0,path:"/",children:Object(n.jsx)(h,{})}),Object(n.jsx)(l.a,{exact:!0,path:"/query",children:Object(n.jsx)(w,{})})]})})]})},q=function(e){e&&e instanceof Function&&r.e(3).then(r.bind(null,59)).then((function(t){var r=t.getCLS,n=t.getFID,s=t.getFCP,a=t.getLCP,c=t.getTTFB;r(e),n(e),s(e),a(e),c(e)}))};i.a.render(Object(n.jsx)(a.a.StrictMode,{children:Object(n.jsx)(k,{})}),document.getElementById("root")),fetch(O),q()}},[[58,1,2]]]);
//# sourceMappingURL=main.857a3afd.chunk.js.map