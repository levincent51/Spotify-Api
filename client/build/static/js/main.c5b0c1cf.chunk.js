(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{47:function(e,t,c){},48:function(e,t,c){},49:function(e,t,c){},76:function(e,t,c){"use strict";c.r(t);var n=c(0),r=c.n(n),s=c(26),a=c.n(s),o=(c(47),c(48),c(49),c(1));function i(){return Object(o.jsxs)("div",{className:"login",children:[Object(o.jsx)("img",{src:"https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png",alt:"Spotify-Logo"}),Object(o.jsxs)("p",{children:[" ","A Spotify API designed to find your favourite songs over the past year \ud83d\ude00"," "]}),Object(o.jsx)("a",{href:"https://react-express-spotify.herokuapp.com/login",children:" Login to Spotify "})]})}var l=c(8),j=c(9),d=c(2);function b(e){var t=Math.floor(e/6e4),c=(e%6e4/1e3).toFixed(0);return t+":"+(c<10?"0":"")+c}var h=function(){window.localStorage.clear(),window.location.replace("/");var e=Object(n.useState)(!1),t=Object(l.a)(e,2),c=t[0],r=t[1];return c?Object(o.jsx)(Redirect,{to:"/",push:!0}):Object(o.jsx)(Button,{onClick:function(){localStorage.removeItem("whpf_user"),r(!0)},children:"LogOut"})},u=function(){return Object(o.jsxs)("div",{className:"navbar",children:[Object(o.jsx)(j.b,{to:"/",children:"HOME"}),Object(o.jsxs)("ul",{children:[Object(o.jsx)("li",{children:Object(o.jsx)(j.b,{to:"/TopTracks",children:"Top Tracks"})}),Object(o.jsx)("li",{children:Object(o.jsx)(j.b,{to:"/RecentTracks",children:"RecentlyPlayed"})})]}),Object(o.jsx)(j.b,{to:"/logout",children:"Logout"})]})},O=c(14),x=c.n(O),m=c(29),f=c(30),p=c.n(f),k=c(31),g=new(c.n(k).a),v=function(){var e=Object(m.a)(x.a.mark((function e(){var t;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=window.localStorage.getItem("refresh_token"),p.a.get("https://react-express-spotify.herokuapp.com/refresh_token",{params:{refresh_token:t}}).then((function(e){var t=e.data.access_token;console.log("New acccess_token",t),window.localStorage.setItem("access_token",t),window.localStorage.setItem("token_timestamp",Date.now()),window.location.reload()})).catch((function(e){return console.log(e)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),w=function(){var e=function(){var e,t={},c=/([^&;=]+)=?([^&;]*)/g,n=window.location.hash.substring(1);for(e=c.exec(n);e;)t[e[1]]=decodeURIComponent(e[2]),e=c.exec(n);return t}(),t=e.error,c=e.access_token,n=e.refresh_token;if(t&&(console.log(t),v()),c&&n)return window.location.replace("/"),window.localStorage.setItem("access_token",c),window.localStorage.setItem("refresh_token",n),window.localStorage.setItem("token_timestamp",Date.now()),c;var r=window.localStorage.getItem("token_timestamp");return r&&"undefined"!==r&&Date.now()-r>36e5&&(console.log("Token expired, refreshing token"),v()),window.localStorage.getItem("access_token")}();g.setAccessToken(w);var y=function(e){var t=e.track;return Object(o.jsx)("a",{className:"TrackInfoLink",href:t.uri,children:Object(o.jsxs)("div",{className:"card",children:[Object(o.jsx)("img",{src:t.album.images[1].url,alt:"Track"}),Object(o.jsxs)("div",{className:"containerCard",children:[Object(o.jsx)("h4",{children:Object(o.jsx)("b",{children:t.artists.map((function(e){return e.name})).join(", ")})}),Object(o.jsx)("p",{children:t.name})]})]})})},N=function(){var e=Object(n.useState)(1),t=Object(l.a)(e,2),c=t[0],r=t[1],s=Object(n.useState)(),a=Object(l.a)(s,2),i=a[0],j=a[1],d=Object(n.useState)("short_term"),b=Object(l.a)(d,2),h=b[0],u=b[1],O=function(e,t){var c;c=t,j(),u(c),r(e)};return Object(n.useEffect)((function(){g.getMyTopTracks({limit:50,time_range:h}).then((function(e){e&&(console.log(e),j({items:e.items}))})),g.getNewReleases().then((function(e){console.log(e)}))}),[h]),Object(o.jsxs)("div",{children:[Object(o.jsx)("h2",{children:"Top Tracks"}),Object(o.jsxs)("div",{className:"container",children:[Object(o.jsxs)("div",{className:"bloc-tabs",children:[Object(o.jsx)("button",{className:1===c?"tabs active-tabs":"tabs",onClick:function(){return O(1,"short_term")},children:"4 weeks"}),Object(o.jsx)("button",{className:2===c?"tabs active-tabs":"tabs",onClick:function(){return O(2,"medium_term")},children:"6 months"}),Object(o.jsx)("button",{className:3===c?"tabs active-tabs":"tabs",onClick:function(){return O(3,"long_term")},children:"All time"})]}),i?Object(o.jsxs)("div",{className:"content-tabs",children:[Object(o.jsx)("div",{className:1===c?"content  active-content":"content",children:i.items.map((function(e,t){return Object(o.jsx)(y,{track:e},t)}))}),Object(o.jsx)("div",{className:2===c?"content  active-content":"content",children:i.items.map((function(e,t){return Object(o.jsx)(y,{track:e},t)}))}),Object(o.jsx)("div",{className:3===c?"content  active-content":"content",children:i.items.map((function(e,t){return Object(o.jsx)(y,{track:e},t)}))})]}):Object(o.jsx)("b",{children:"LOADING"})]})]})},_=c(41),I=function(){var e=Object(n.useState)(),t=Object(l.a)(e,2),c=t[0],r=t[1];return Object(n.useEffect)((function(){g.getMyRecentlyPlayedTracks({limit:50}).then((function(e){e&&(console.log(e),r({items:e.items}))}))}),[]),console.log(c),Object(o.jsx)("div",{children:c?Object(o.jsxs)("div",{className:"recently-played",children:[Object(o.jsx)("h2",{children:"Recently played tracks"}),Object(o.jsxs)("table",{className:"table",children:[Object(o.jsx)("thead",{children:Object(o.jsxs)("tr",{children:[Object(o.jsx)("th",{children:"Duration"}),Object(o.jsx)("th",{children:"Track"}),Object(o.jsx)("th",{children:"Artist(s)"}),Object(o.jsx)("th",{children:"Played at"})]})}),Object(o.jsx)("tbody",{children:c.items.map((function(e,t){return function(e,t){return Object(o.jsxs)("tr",{children:[Object(o.jsx)("td",{children:Object(o.jsx)("a",{href:e.track.uri,className:"row-link",children:b(e.track.duration_ms)})}),Object(o.jsx)("td",{children:Object(o.jsx)("a",{href:e.track.uri,tabIndex:"-1",className:"row-link",children:e.track.name})}),Object(o.jsx)("td",{children:Object(o.jsx)("a",{href:e.track.uri,tabIndex:"-1",className:"row-link",children:e.track.artists.map((function(e){return e.name})).join(", ")})}),Object(o.jsx)("td",{children:Object(o.jsx)("a",{href:e.track.uri,tabIndex:"-1",className:"row-link",children:Object(_.a)(Date.parse(e.played_at),"dd/MM/yyyy, hh:mma")})})]},e.played_at)}(e)}))})]})]}):Object(o.jsx)("b",{children:"LOADING"})})},S=c(40);function T(e){var t=e.token,c=Object(n.useState)(!1),r=Object(l.a)(c,2),s=r[0],a=r[1];return Object(n.useEffect)((function(){var e=setInterval((function(){g.getMyCurrentPlaybackState().then((function(e){e?a(!0):e||a(!1)}))}),2e3);return function(){return clearInterval(e)}}),[s]),Object(o.jsx)(j.a,{children:Object(o.jsxs)("div",{children:[Object(o.jsx)(u,{}),Object(o.jsxs)(d.c,{children:[Object(o.jsx)(d.a,{path:"/RecentTracks",children:Object(o.jsx)(I,{})}),Object(o.jsx)(d.a,{path:"/logout",children:Object(o.jsx)(h,{})}),Object(o.jsx)(d.a,{path:"/TopTracks",children:Object(o.jsx)(N,{})}),Object(o.jsx)(d.a,{path:"/",children:Object(o.jsx)("h1",{children:"WELCOME TO SPOTIFY API"})})]}),s?Object(o.jsxs)("div",{className:"player",children:[Object(o.jsx)("b",{children:"Currently Playing"}),Object(o.jsx)(S.a,{token:t,syncExternalDevice:!0,syncExternalDeviceInterval:3})]}):Object(o.jsx)("div",{className:"player",children:Object(o.jsx)("b",{children:"Not Playing Anything Currently"})})]})})}var C=function(){return Object(o.jsx)("div",{className:"App",children:w?Object(o.jsx)(T,{token:w}):Object(o.jsx)(i,{})})};a.a.render(Object(o.jsx)(r.a.StrictMode,{children:Object(o.jsx)(C,{})}),document.getElementById("root"))}},[[76,1,2]]]);
//# sourceMappingURL=main.c5b0c1cf.chunk.js.map