(this["webpackJsonpbloglist-frontend"]=this["webpackJsonpbloglist-frontend"]||[]).push([[0],{14:function(e,t,n){e.exports=n(36)},36:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(13),l=n.n(o),u=n(2),c=function(e){var t=e.blog;return r.a.createElement("div",null,t.title," ",t.author)},s=n(3),i=n.n(s),m=null,b=function(){return i.a.get("/api/blogs").then((function(e){return e.data}))},g=function(e){var t={headers:{Authorization:m}};return i.a.post("/api/blogs",e,t).then((function(e){console.log(e.data)})).data},f=function(e){m="bearer ".concat(e)},h=function(e){return i.a.post("/api/login",e).then((function(e){return console.log(e.data),e})).data},p=function(){var e=Object(a.useState)([]),t=Object(u.a)(e,2),n=t[0],o=t[1],l=Object(a.useState)(""),s=Object(u.a)(l,2),i=s[0],m=s[1],p=Object(a.useState)(""),d=Object(u.a)(p,2),E=d[0],v=d[1],O=Object(a.useState)(""),j=Object(u.a)(O,2),S=j[0],w=j[1],k=Object(a.useState)(null),y=Object(u.a)(k,2),C=y[0],F=y[1],J=Object(a.useState)(""),B=Object(u.a)(J,2),D=B[0],I=B[1],x=Object(a.useState)(""),z=Object(u.a)(x,2),A=z[0],N=z[1],T=Object(a.useState)(),U=Object(u.a)(T,2),W=U[0],q=U[1];Object(a.useEffect)((function(){b().then((function(e){return o(e)}))}),[]);var G=function(e){switch(e.target.name){case"title":m(e.target.value),console.log(i);break;case"url":v(e.target.value),console.log(E);break;case"author":w(e.target.author);break;case"username":I(e.target.username),console.log(D);break;case"password":N(e.target.password),console.log(A)}};return r.a.createElement("div",null,W,null===C&&r.a.createElement("form",{onSubmit:function(e){return function(e){e.preventDefault();var t={username:D,password:A};console.log(D,A);try{var n=h(t).then((function(e){console.log(e)}));window.localStorage.setItem("loggedBlogappUser",JSON.stringify(n)),f(n.token),F(n),I(""),N("")}catch(a){q("Wrong credentials"),setTimeout((function(){q(null)}),5e3)}}(e)}},r.a.createElement("label",{htmlFor:"username"},"username: "),r.a.createElement("input",{value:D,name:"username",onChange:function(e){return G(e)}}),r.a.createElement("label",{htmlFor:"password"},"password: "),r.a.createElement("input",{value:A,name:"password",onChange:function(e){return G(e)}}),r.a.createElement("button",{type:"submit"},"login")),null!==C&&r.a.createElement("div",null,r.a.createElement("p",null,C.name," logged in"),r.a.createElement("form",{onSubmit:function(e){return function(e){e.preventDefault(),g({title:i,author:S,url:E}).then((function(e){var t=n.concat(e);o(t),console.log(t)}))}(e)}},r.a.createElement("label",{htmlFor:"title"},"title: "),r.a.createElement("input",{value:i,name:"title",onChange:function(e){return G(e)}}),r.a.createElement("label",{htmlFor:"author"},"author: "),r.a.createElement("input",{value:S,name:"author",onChange:function(e){return G(e)}}),r.a.createElement("label",{htmlFor:"url"},"url: "),r.a.createElement("input",{value:E,name:"url",onChange:function(e){return G(e)}}),r.a.createElement("button",{type:"submit"},"save"))),r.a.createElement("h2",null,"blogs"),n.map((function(e){return r.a.createElement(c,{key:e.id,blog:e})})))};l.a.render(r.a.createElement(p,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.03fc985d.chunk.js.map