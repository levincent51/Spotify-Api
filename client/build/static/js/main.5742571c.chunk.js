(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{104:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n.n(c),a=n(25),s=n.n(a),i=(n(74),n(75),n(76),n(1));function o(){return Object(i.jsxs)("div",{className:"login",children:[Object(i.jsx)("p",{children:"An insight into your listening habits on Spotify"}),Object(i.jsx)("a",{href:"https://react-express-spotify.herokuapp.com/login",children:" Login to Spotify "})]})}var l=n(22),j=n(7),u=n(4);function b(e){var t=Math.floor(e/6e4),n=(e%6e4/1e3).toFixed(0);return t+":"+(n<10?"0":"")+n}var d=function(){window.localStorage.clear(),window.sessionStorage.clear(),window.location.replace("/");var e=Object(c.useState)(!1),t=Object(u.a)(e,2),n=t[0],r=t[1];return n?Object(i.jsx)(Redirect,{to:"/",push:!0}):Object(i.jsx)(Button,{onClick:function(){localStorage.removeItem("whpf_user"),r(!0)},children:"LogOut"})},h=function(){return Object(i.jsxs)("div",{className:"navbar",children:[Object(i.jsx)("li",{style:{background:"green"},children:Object(i.jsx)(l.b,{to:"/",activeStyle:{fontWeight:"bold",color:"white",background:"green"},children:"HOME"})}),Object(i.jsx)("li",{children:Object(i.jsx)(l.b,{to:"/Moods",activeStyle:{fontWeight:"bold",color:"green"},children:"Moods"})}),Object(i.jsx)("li",{children:Object(i.jsx)(l.b,{to:"/TopTracks",activeStyle:{fontWeight:"bold",color:"green"},children:"Top Tracks"})}),Object(i.jsx)("li",{children:Object(i.jsx)(l.b,{to:"/RecentTracks",activeStyle:{fontWeight:"bold",color:"green"},children:"RecentlyPlayed"})}),Object(i.jsx)("li",{style:{float:"right"},children:Object(i.jsx)(l.b,{to:"/logout",children:"Logout"})})]})},O=n(8),x=n.n(O),f=n(20),m=n(52),p=n.n(m),g=n(53),v=new(n.n(g).a),k=function(){var e=Object(f.a)(x.a.mark((function e(){var t;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=window.localStorage.getItem("refresh_token"),p.a.get("https://react-express-spotify.herokuapp.com/refresh_token",{params:{refresh_token:t}}).then((function(e){var t=e.data.access_token;console.log("New acccess_token",t),window.localStorage.setItem("access_token",t),window.localStorage.setItem("token_timestamp",Date.now()),window.location.reload()})).catch((function(e){return console.log(e)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),w=function(){var e=function(){var e,t={},n=/([^&;=]+)=?([^&;]*)/g,c=window.location.hash.substring(1);for(e=n.exec(c);e;)t[e[1]]=decodeURIComponent(e[2]),e=n.exec(c);return t}(),t=e.error,n=e.access_token,c=e.refresh_token;if(t&&(console.log(t),k()),n&&c)return window.location.replace("/"),window.localStorage.setItem("access_token",n),window.localStorage.setItem("refresh_token",c),window.localStorage.setItem("token_timestamp",Date.now()),n;var r=window.localStorage.getItem("token_timestamp");return r&&"undefined"!==r&&Date.now()-r>36e5&&(console.log("Token expired, refreshing token"),k()),window.localStorage.getItem("access_token")},y=w();v.setAccessToken(y);var S=n(118),N=function(){var e=Object(c.useState)(),t=Object(u.a)(e,2),n=t[0],r=t[1];return Object(c.useEffect)((function(){v.getMe().then((function(e){r(e)})).catch((function(){w()}))}),[]),console.log(n),Object(i.jsx)("div",{children:n?Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("h1",{children:"Welcome to Spoti-FYI."}),Object(i.jsxs)("h2",{children:["Hi ",n.display_name.split(" ")[0]," "]}),Object(i.jsx)("img",{src:n.images[0].url})]}):Object(i.jsx)(S.a,{})})},_=function(e){var t=e.track,n=e.index;return Object(i.jsx)("a",{className:"TrackInfoLink",href:t.uri,children:Object(i.jsxs)("div",{className:"card",children:[Object(i.jsx)("img",{src:t.album.images[1].url,alt:"Track"}),Object(i.jsxs)("div",{className:"containerCard",children:[Object(i.jsxs)("h4",{children:[Object(i.jsx)("p",{children:n+1}),Object(i.jsx)("b",{children:t.artists.map((function(e){return e.name})).join(", ")})]}),Object(i.jsx)("p",{children:t.name})]})]})})},T=function(){var e=Object(c.useState)(1),t=Object(u.a)(e,2),n=t[0],r=t[1],a=Object(c.useState)(),s=Object(u.a)(a,2),o=s[0],l=s[1],j=Object(c.useState)("short_term"),b=Object(u.a)(j,2),d=b[0],h=b[1],O=function(e,t){var n;(n=t)!=d&&l(),h(n),r(e)};return Object(c.useEffect)((function(){v.getMyTopTracks({limit:50,time_range:d}).then((function(e){e&&(console.log(e),l({items:e.items}))})).catch((function(){w()}))}),[d]),Object(i.jsxs)("div",{children:[Object(i.jsx)("h2",{children:"Top Tracks"}),Object(i.jsxs)("div",{className:"container",children:[Object(i.jsxs)("div",{className:"bloc-tabs",children:[Object(i.jsx)("button",{className:1===n?"tabs active-tabs":"tabs",onClick:function(){return O(1,"short_term")},children:"4 weeks"}),Object(i.jsx)("button",{className:2===n?"tabs active-tabs":"tabs",onClick:function(){return O(2,"medium_term")},children:"6 months"}),Object(i.jsx)("button",{className:3===n?"tabs active-tabs":"tabs",onClick:function(){return O(3,"long_term")},children:"All time"})]}),o?Object(i.jsxs)("div",{className:"content-tabs",children:[Object(i.jsx)("div",{className:1===n?"content  active-content":"content",children:o.items.map((function(e,t){return Object(i.jsx)(_,{track:e,index:o.items.indexOf(e)},t)}))}),Object(i.jsx)("div",{className:2===n?"content  active-content":"content",children:o.items.map((function(e,t){return Object(i.jsx)(_,{track:e,index:o.items.indexOf(e)},t)}))}),Object(i.jsx)("div",{className:3===n?"content  active-content":"content",children:o.items.map((function(e,t){return Object(i.jsx)(_,{track:e,index:o.items.indexOf(e)},t)}))})]}):Object(i.jsx)(S.a,{})]})]})},F=n(55),I=n(6),C=n(56),M=function(){var e=Object(f.a)(x.a.mark((function e(t,n,c){var r,a;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=c+n,e.next=3,v.getUserPlaylists({limit:n,offset:c}).then((function(e){e&&(console.log(e),a=[].concat(Object(I.a)(t),Object(I.a)(e.items)),e.next&&(a=M(a,n,r)))})).catch((function(){w()}));case 3:return e.abrupt("return",a);case 4:case"end":return e.stop()}}),e)})));return function(t,n,c){return e.apply(this,arguments)}}(),E=function(){var e=Object(f.a)(x.a.mark((function e(t,n,c,r){var a,s;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=r+c,e.next=3,v.getPlaylistTracks(y,t,{limit:c,offset:r}).then((function(e){e&&(s=[].concat(Object(I.a)(n),Object(I.a)(e.items)),e.next&&(s=E(t,s,c,a)))}));case 3:return e.abrupt("return",s);case 4:case"end":return e.stop()}}),e)})));return function(t,n,c,r){return e.apply(this,arguments)}}(),D=function(){var e=Object(f.a)(x.a.mark((function e(t){var n;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E(t,[],100,0).then((function(e){if(e)return e.filter((function(e){return e.track})).map((function(e){return e.track.id}))}));case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();function L(e,t){var n=e,c=[];if(e)for(;n.length;)c=[].concat(Object(I.a)(c),[n.splice(0,t)]);return c}var A=n(120),P=n(122),G=n(121),R=function(){var e=Object(c.useState)("all"),t=Object(u.a)(e,2),n=(t[0],t[1],Object(c.useState)()),r=Object(u.a)(n,2),a=r[0],s=r[1],o=Object(c.useState)(),l=Object(u.a)(o,2),j=l[0],b=l[1],d=Object(c.useState)(1),h=Object(u.a)(d,2),O=h[0],m=(h[1],Object(c.useState)("sad")),p=Object(u.a)(m,2),g=p[0],k=(p[1],Object(c.useState)()),w=Object(u.a)(k,2),y=w[0],N=w[1],T=Object(c.useState)(),E=Object(u.a)(T,2),R=E[0],J=E[1],W=JSON.parse(window.sessionStorage.getItem("audio_features")),B=JSON.parse(window.sessionStorage.getItem("tracks")),H=function(){var e=Object(f.a)(x.a.mark((function e(t){var n,c,r;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n={tracks:[]},c=0;case 2:if(!(c<t.length)){e.next=10;break}return e.next=5,v.getTracks(t[c].map((function(e){return e.id})));case 5:r=e.sent,n.tracks=[].concat(Object(I.a)(n.tracks),Object(I.a)(r.tracks));case 7:c++,e.next=2;break;case 10:J(n);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();Object(c.useEffect)((function(){B?(console.log("Fetching all songs..."),b(B)):function(){var e=Object(f.a)(x.a.mark((function e(){var t;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=[],e.next=3,M([],50,0).then(function(){var e=Object(f.a)(x.a.mark((function e(n){var c,r,a,s,i,o,l;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("Fetching all songs..."),c=!1,r=!1,e.prev=3,s=Object(C.a)(n.map((function(e){return e.id})));case 5:return e.next=7,s.next();case 7:if(!(c=!(i=e.sent).done)){e.next=20;break}return o=i.value,e.t0=[],e.t1=Object(I.a)(t),e.t2=I.a,e.next=14,D(o);case 14:e.t3=e.sent,e.t4=(0,e.t2)(e.t3),t=e.t0.concat.call(e.t0,e.t1,e.t4);case 17:c=!1,e.next=5;break;case 20:e.next=26;break;case 22:e.prev=22,e.t5=e.catch(3),r=!0,a=e.t5;case 26:if(e.prev=26,e.prev=27,!c||null==s.return){e.next=31;break}return e.next=31,s.return();case 31:if(e.prev=31,!r){e.next=34;break}throw a;case 34:return e.finish(31);case 35:return e.finish(26);case 36:l=Object(I.a)(new Set(t)),b(l),window.sessionStorage.setItem("tracks",JSON.stringify(t));case 39:case"end":return e.stop()}}),e,null,[[3,22,26,36],[27,,31,35]])})));return function(t){return e.apply(this,arguments)}}());case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}),[]),Object(c.useEffect)((function(){if(W)console.log("Fetching audio data..."),s(W);else if(j){var e=function(){var e=Object(f.a)(x.a.mark((function e(n){var c,r,a,i,o;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:c=Object(F.a)(t),e.prev=1,c.s();case 3:if((r=c.n()).done){e.next=11;break}return a=r.value,e.next=7,v.getAudioFeaturesForTracks(a);case 7:i=e.sent,n=[].concat(Object(I.a)(n),Object(I.a)(i.audio_features));case 9:e.next=3;break;case 11:e.next=16;break;case 13:e.prev=13,e.t0=e.catch(1),c.e(e.t0);case 16:return e.prev=16,c.f(),e.finish(16);case 19:o=n.filter((function(e){return e})),s(o),window.sessionStorage.setItem("audio_features",JSON.stringify(n));case 22:case"end":return e.stop()}}),e,null,[[1,13,16,19]])})));return function(t){return e.apply(this,arguments)}}(),t=L(j,100);console.log("Fetching audio data..."),e([])}}),[j]),Object(c.useEffect)((function(){j&&N(1)}),[j]),Object(c.useEffect)((function(){}),[g,a]);var U=Object(c.useState)(.5),V=Object(u.a)(U,2),Y=V[0],q=V[1],z=Object(c.useState)(.5),K=Object(u.a)(z,2),Q=K[0],X=K[1],Z=Object(c.useState)(.5),$=Object(u.a)(Z,2),ee=$[0],te=$[1],ne=Object(c.useState)(!1),ce=Object(u.a)(ne,2),re=ce[0],ae=ce[1],se=Object(c.useCallback)(Object(f.a)(x.a.mark((function e(){var t,n,c;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("mood",Y),console.log("energy",Q),console.log("groove",ee),console.log("vocal",re),t=a.filter((function(e){return e.valence>=Y-.15&&e.valence<=Y+.15&&e.energy>=Q-.15&&e.energy<=Q+.15&&e.danceability>=ee-.15&&e.danceability<=ee+.15})),re?(n=t.filter((function(e){return e.instrumentalness<=.4})),console.log(n)):(n=t.filter((function(e){return e.instrumentalness>=.8})),console.log(n)),c=L(n,50),console.log(c),H(c);case 9:case"end":return e.stop()}}),e)}))));return console.log(R),Object(i.jsxs)(i.Fragment,{children:[Object(i.jsxs)("h1",{children:[" ","Gather all your songs and find the perfect songs to match your current mood"]}),Object(i.jsx)("h2",{children:"Choose source (in development)"}),Object(i.jsx)("button",{children:" Get All Liked Songs"}),Object(i.jsx)("button",{children:" Get All Playlists"}),Object(i.jsx)("button",{children:" Get Only Your Playlists"}),Object(i.jsx)("button",{children:" Get Everything"}),Object(i.jsx)("div",{children:y?Object(i.jsxs)("div",{className:"container",children:[Object(i.jsxs)("h2",{children:["Total Songs Discovered: ",a?a.length:Object(i.jsx)(i.Fragment,{children:"0"})]}),Object(i.jsxs)("div",{children:[Object(i.jsx)(A.a,{children:"Mood"}),Object(i.jsx)(P.a,{value:100*Y,onChange:function(e,t){q(t/100)},"aria-labelledby":"discrete-slider-small-steps",step:10,marks:!0,min:0,max:100,valueLabelDisplay:"auto"})]}),Object(i.jsxs)("div",{children:[Object(i.jsx)(A.a,{children:"Energy"}),Object(i.jsx)(P.a,{value:100*Q,onChange:function(e,t){X(t/100)},"aria-labelledby":"discrete-slider-small-steps",step:10,marks:!0,min:0,max:100,valueLabelDisplay:"auto"})]}),Object(i.jsxs)("div",{children:[Object(i.jsx)(A.a,{children:"Groove"}),Object(i.jsx)(P.a,{value:100*ee,onChange:function(e,t){te(t/100)},"aria-labelledby":"discrete-slider-small-steps",step:10,marks:!0,min:0,max:100,valueLabelDisplay:"auto"})]}),Object(i.jsxs)("div",{children:[Object(i.jsx)(A.a,{children:"Vocals"}),Object(i.jsx)(G.a,{onChange:function(){ae(!re)},label:"Vocals"})]})]}):Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("b",{children:"Fetching all Songs...."}),Object(i.jsx)(S.a,{}),Object(i.jsx)("p",{children:"Please do not refresh/leave the page while this is occuring."})," "]})}),a?Object(i.jsxs)("div",{className:"content-tabs",children:[Object(i.jsxs)("p",{children:["Songs Found: ",R?Object(i.jsx)(i.Fragment,{children:R.tracks.length}):0," "]}),Object(i.jsx)("div",{children:Object(i.jsx)("button",{onClick:se,children:"Find Songs!"})}),Object(i.jsx)("div",{className:1===O?"content  active-content":"content",children:R?R.tracks.length?R.tracks.map((function(e,t){return Object(i.jsx)(_,{track:e,index:R.tracks.indexOf(e)},t)})):Object(i.jsx)("p",{children:"no songs "}):Object(i.jsx)("p",{children:"Click the button to find your songs!"})}),Object(i.jsx)("div",{className:2===O?"content  active-content":"content"}),Object(i.jsx)("div",{className:3===O?"content  active-content":"content",children:R?Object(i.jsx)(i.Fragment,{children:R.tracks.map((function(e,t){return Object(i.jsx)(_,{track:e,index:R.tracks.indexOf(e)},t)}))}):Object(i.jsx)("p",{children:"Loading Study Songs :/"})}),Object(i.jsx)("div",{className:4===O?"content  active-content":"content",children:R?Object(i.jsx)(i.Fragment,{children:R.tracks.map((function(e,t){return Object(i.jsx)(_,{track:e,index:R.tracks.indexOf(e)},t)}))}):Object(i.jsx)("p",{children:"Loading Gym Songs >:("})})]}):Object(i.jsx)(i.Fragment,{children:y?Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("b",{children:"Fetching Audio Data..."})," ",Object(i.jsx)(S.a,{})]}):null})]})},J=n(65),W=function(){var e=Object(c.useState)(),t=Object(u.a)(e,2),n=t[0],r=t[1];return Object(c.useEffect)((function(){v.getMyRecentlyPlayedTracks({limit:50}).then((function(e){e&&(console.log(e),r({items:e.items}))})).catch((function(){w()}))}),[]),console.log(n),Object(i.jsx)("div",{children:n?Object(i.jsxs)("div",{className:"recently-played",children:[Object(i.jsx)("h2",{children:"Recently played tracks"}),Object(i.jsxs)("table",{className:"table",children:[Object(i.jsx)("thead",{children:Object(i.jsxs)("tr",{children:[Object(i.jsx)("th",{children:"Duration"}),Object(i.jsx)("th",{children:"Track"}),Object(i.jsx)("th",{children:"Artist(s)"}),Object(i.jsx)("th",{children:"Played at"})]})}),Object(i.jsx)("tbody",{children:n.items.map((function(e){return function(e){return Object(i.jsxs)("tr",{children:[Object(i.jsx)("td",{children:Object(i.jsx)("a",{href:e.track.uri,className:"row-link",children:b(e.track.duration_ms)})}),Object(i.jsx)("td",{children:Object(i.jsx)("a",{href:e.track.uri,tabIndex:"-1",className:"row-link",children:e.track.name})}),Object(i.jsx)("td",{children:Object(i.jsx)("a",{href:e.track.uri,tabIndex:"-1",className:"row-link",children:e.track.artists.map((function(e){return e.name})).join(", ")})}),Object(i.jsx)("td",{children:Object(i.jsx)("a",{href:e.track.uri,tabIndex:"-1",className:"row-link",children:Object(J.a)(Date.parse(e.played_at),"dd/MM/yyyy, hh:mma")})})]},e.played_at)}(e)}))})]})]}):Object(i.jsx)(S.a,{})})};n(103);function B(){return Object(i.jsx)(l.a,{children:Object(i.jsxs)("div",{children:[Object(i.jsx)(h,{}),Object(i.jsxs)(j.c,{children:[Object(i.jsx)(j.a,{path:"/RecentTracks",children:Object(i.jsx)(W,{})}),Object(i.jsx)(j.a,{path:"/logout",children:Object(i.jsx)(d,{})}),Object(i.jsx)(j.a,{path:"/TopTracks",children:Object(i.jsx)(T,{})}),Object(i.jsx)(j.a,{path:"/Moods",children:Object(i.jsx)(R,{})}),Object(i.jsx)(j.a,{path:"/",children:Object(i.jsx)(N,{})})]})]})})}var H=function(){return Object(i.jsx)("div",{className:"App",children:y?Object(i.jsx)(B,{}):Object(i.jsx)(o,{})})};s.a.render(Object(i.jsx)(r.a.StrictMode,{children:Object(i.jsx)(H,{})}),document.getElementById("root"))},74:function(e,t,n){},75:function(e,t,n){},76:function(e,t,n){}},[[104,1,2]]]);
//# sourceMappingURL=main.5742571c.chunk.js.map