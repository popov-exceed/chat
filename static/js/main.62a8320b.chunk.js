(this.webpackJsonpchat=this.webpackJsonpchat||[]).push([[0],{333:function(e,t,n){},334:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n.n(c),a=n(21),s=n.n(a),o=(n(201),n(41)),i=n(60),u=n(25),l="SING_IN",j="LOGOUT",d={user:localStorage.getItem("User")?JSON.parse(localStorage.getItem("User")):null,token:localStorage.getItem("Token")};var b=n(172),m=n(111),O={list:[]};var h={list:[]};var f=n(173),p=Object(i.combineReducers)({auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:d,t=arguments.length>1?arguments[1]:void 0,n=t.payload,c=t.type;switch(c){case l:return Object(u.a)(Object(u.a)({},e),{},{user:n.user,token:n.token});case j:return{user:null,token:""};default:return e}},messages:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:O,t=arguments.length>1?arguments[1]:void 0,n=t.payload,c=t.type;switch(c){case"GET_MESSAGES":return Object(u.a)(Object(u.a)({},e),{},{list:n.messages});case"NEW_MESSAGE":return Object(u.a)(Object(u.a)({},e),{},{list:[].concat(Object(m.a)(e.list),[n.message])});case"READ_MESSAGE":return Object(u.a)(Object(u.a)({},e),{},{list:e.list.map((function(e){return e._id===n.messageId?Object.assign({},e,{read:!0}):e}))});default:return e}},onlineUsers:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h,t=arguments.length>1?arguments[1]:void 0,n=t.payload,c=t.type;switch(c){case"GET_USERS":return Object(u.a)(Object(u.a)({},e),{},{list:n.users});case"NEW_USER":return e.list.find((function(e){return e._id==n.user.id}))?e:Object(u.a)(Object(u.a)({},e),{},{list:[].concat(Object(m.a)(e.list),[n.user])});case"LEAVE_USER":return Object(u.a)(Object(u.a)({},e),{},{list:e.list.slice().filter((function(e){return e._id!==n.user.id}))});default:return e}}}),x=Object(i.createStore)(p,Object(f.composeWithDevTools)(Object(i.applyMiddleware)(b.a))),g=n(96),y=n(24),S=n(117),v=n(341),E=n(339),k=n(338),I=n(337),_=n(342),w=n(192),T=n(340),N=n(8);var U=function(e){return function(t){var n=Object(o.c)((function(e){return e.auth.token}));return Object(N.jsx)(N.Fragment,{children:n?Object(N.jsx)(e,Object(u.a)({},t)):Object(N.jsx)(y.a,{exact:!0,to:"/login"})})}},F=n(174),G=n(175),M=n(176),A=n.n(M),R=function(){function e(){Object(F.a)(this,e)}return Object(G.a)(e,[{key:"connect",value:function(e,t){var n=this;return this.socket=A()("http://192.168.1.145:8000",{auth:{token:x.getState().auth.token}}),new Promise((function(c,r){return n.socket.on("connect",(function(){e(),c()})),n.socket.on("connect_error",(function(e){return r(e)})),new Promise((function(e,c){n.socket.on("disconnect",(function(){t(),e()}))}))}))}},{key:"disconnect",value:function(){var e=this;return new Promise((function(t){e.socket.disconnect((function(){e.socket=null,t()}))}))}},{key:"emit",value:function(e,t){var n=this;return new Promise((function(c,r){return n.socket?n.socket.emit(e,t,(function(e){return e.error?(console.error(e.error),r(e.error)):c()})):r("No socket connection.")}))}},{key:"on",value:function(e,t){var n=this;return new Promise((function(c,r){if(!n.socket)return r("No socket connection.");n.socket.on(e,t),c()}))}}]),e}(),B=n(177),L=n.n(B),P=n(178),C=n.n(P).a.create({responseType:"json",baseURL:"http://192.168.1.145:8000"}),W=function(e){return C.post("/login",{name:e})},J=n(343),D=n(112),H=n(344),V=n(345),q=n(135),Y=v.a.Content,z=v.a.Footer,K=v.a.Sider,Q=E.a.Text,X=(E.a.Link,E.a.Paragraph),Z=E.a.Title,$={textInSideBar:{color:"#FFFFFF"},buttonInSideBar:{margin:"30px 10px"}},ee=new R;var te=U((function(){var e=Object(o.b)(),t=k.a.useForm(),n=Object(S.a)(t,1)[0],r=Object(c.useState)(!0),a=Object(S.a)(r,2),s=a[0],i=a[1],u=Object(c.useState)(!1),l=Object(S.a)(u,2),d=l[0],b=l[1],m=Object(o.c)((function(e){return e.messages.list})),O=Object(o.c)((function(e){return e.auth.user})),h=Object(o.c)((function(e){return e.onlineUsers.list})),f=function(e){return Object(N.jsxs)(N.Fragment,{children:[Object(N.jsx)(X,{children:e.content}),Object(N.jsx)("iframe",{id:"ytplayer",type:"text/html",width:"640",height:"360",src:"https://www.youtube.com/embed/".concat(e.video),frameBorder:"0"})]})};return Object(c.useEffect)((function(){return ee.connect((function(){return i(!1)}),(function(){return i(!0)})).catch((function(e){return console.log(e.message)})),ee.on("connected",(function(t){var n=t.onlineUsers,c=t.lastsMessages;e({type:"GET_USERS",payload:{users:n}}),c.filter((function(e){return!e.read})).forEach((function(e){O._id!==e.author._id&&ee.emit("read message",e._id)})),e({type:"GET_MESSAGES",payload:{messages:c}}),q.animateScroll.scrollToBottom({containerId:"chat"})})),ee.on("new message",(function(t){e({type:"NEW_MESSAGE",payload:{message:t}}),q.animateScroll.scrollToBottom({containerId:"chat"}),O._id!==t.author._id&&ee.emit("read message",t._id)})),ee.on("new user",(function(t){return e({type:"NEW_USER",payload:{user:t}})})),ee.on("read message",(function(t){return e({type:"READ_MESSAGE",payload:{messageId:t}})})),ee.on("user exit",(function(t){return e({type:"LEAVE_USER",payload:{user:t}})})),function(){return ee.disconnect()}}),[]),Object(N.jsxs)("div",{style:{display:"flex",height:"100%"},children:[Object(N.jsx)(v.a,{style:{flexGrow:0},children:Object(N.jsxs)(K,{collapsible:!0,onCollapse:function(e){return b(e)},children:[Object(N.jsx)(w.a,{onClick:function(){e((function(e){e({type:j}),localStorage.clear()})),ee.disconnect()},shape:"circle",icon:Object(N.jsx)(H.a,{}),style:$.buttonInSideBar}),!d&&Object(N.jsx)(Z,{level:5,style:$.textInSideBar,children:"Online users:"}),Object(N.jsx)(I.b,{style:{paddingLeft:"20px"},split:!1,renderItem:function(e){return Object(N.jsx)(I.b.Item,{children:Object(N.jsx)(I.b.Item.Meta,{avatar:Object(N.jsx)(_.a,{style:{backgroundColor:"#87d068"},icon:Object(N.jsx)(J.a,{})}),title:!d&&Object(N.jsx)(Q,{style:$.textInSideBar,strong:!0,children:e.name})})})},dataSource:h})]})}),Object(N.jsxs)(v.a,{style:{paddingLeft:"30px"},children:[Object(N.jsx)(Y,{children:Object(N.jsx)(I.b,{id:"chat",style:{maxHeight:"90vh",overflowY:"scroll"},renderItem:function(e){return Object(N.jsxs)(I.b.Item,{children:[Object(N.jsx)(I.b.Item.Meta,{avatar:Object(N.jsx)(_.a,{style:{backgroundColor:"#87d068"},icon:Object(N.jsx)(J.a,{})}),title:Object(N.jsx)(Q,{strong:!0,children:e.author.name}),description:e.video?f(e):Object(N.jsx)(X,{children:e.content})}),Object(N.jsx)(I.b.Item,{children:L()(e.date).format("HH:mm")}),Object(N.jsx)(I.b.Item,{children:e.read&&Object(N.jsx)(D.a,{})})]})},dataSource:m,locale:{emptyText:s?"Not connection":"Not messages"}})}),Object(N.jsx)(z,{children:Object(N.jsx)(k.a,{name:"name",form:n,onFinish:function(e){ee.emit("new message",{content:e.message}),n.resetFields()},children:Object(N.jsx)(k.a.Item,{name:"message",rules:[{required:!0,message:"Please input your message!"}],children:Object(N.jsx)(T.a,{placeholder:"Enter a new message...",suffix:Object(N.jsx)(w.a,{type:"primary",htmlType:"submit",icon:Object(N.jsx)(V.a,{}),disabled:s})})})})})]})]})}));var ne=function(){var e=Object(o.b)(),t=Object(o.c)((function(e){return e.auth.token}));return Object(N.jsxs)(v.a,{children:[Object(N.jsxs)(k.a,{name:"name",onFinish:function(t){var n=t.userName;e(function(e){return function(t){W(e).then((function(e){t({type:l,payload:{token:e.data.token,user:e.data.user}}),localStorage.setItem("Token",e.data.token),localStorage.setItem("User",JSON.stringify(e.data.user))}))}}(n))},children:[Object(N.jsx)(k.a.Item,{label:"User name",name:"userName",children:Object(N.jsx)(T.a,{})}),Object(N.jsx)(k.a.Item,{children:Object(N.jsx)(w.a,{type:"primary",htmlType:"submit",children:"Sing in"})})]}),t&&Object(N.jsx)(y.a,{to:"/"})]})};n(333);var ce=function(){return Object(N.jsx)("div",{className:"app",children:Object(N.jsxs)(g.a,{basename:"/",children:[Object(N.jsx)(y.b,{exact:!0,path:"/",component:te}),Object(N.jsx)(y.b,{path:"/login",component:ne})]})})};s.a.render(Object(N.jsx)(r.a.StrictMode,{children:Object(N.jsx)(o.a,{store:x,children:Object(N.jsx)(ce,{})})}),document.getElementById("root"))}},[[334,1,2]]]);
//# sourceMappingURL=main.62a8320b.chunk.js.map