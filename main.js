!function(t){var r={};function o(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=r,o.d=function(e,n,t){o.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(n,e){if(1&e&&(n=o(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var t=Object.create(null);if(o.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var r in n)o.d(t,r,function(e){return n[e]}.bind(null,r));return t},o.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(n,"a",n),n},o.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},o.p="",o(o.s=5)}([function(e,n,t){"use strict";var a=this&&this.__awaiter||function(e,s,c,a){return new(c=c||Promise)(function(t,n){function r(e){try{i(a.next(e))}catch(e){n(e)}}function o(e){try{i(a.throw(e))}catch(e){n(e)}}function i(e){var n;e.done?t(e.value):((n=e.value)instanceof c?n:new c(function(e){e(n)})).then(r,o)}i((a=a.apply(e,s||[])).next())})},u=this&&this.__generator||function(t,r){var o,i,s,c={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]},e={next:n(0),throw:n(1),return:n(2)};return"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function n(n){return function(e){return function(n){if(o)throw new TypeError("Generator is already executing.");for(;c;)try{if(o=1,i&&(s=2&n[0]?i.return:n[0]?i.throw||((s=i.return)&&s.call(i),0):i.next)&&!(s=s.call(i,n[1])).done)return s;switch(i=0,s&&(n=[2&n[0],s.value]),n[0]){case 0:case 1:s=n;break;case 4:return c.label++,{value:n[1],done:!1};case 5:c.label++,i=n[1],n=[0];continue;case 7:n=c.ops.pop(),c.trys.pop();continue;default:if(!(s=0<(s=c.trys).length&&s[s.length-1])&&(6===n[0]||2===n[0])){c=0;continue}if(3===n[0]&&(!s||n[1]>s[0]&&n[1]<s[3])){c.label=n[1];break}if(6===n[0]&&c.label<s[1]){c.label=s[1],s=n;break}if(s&&c.label<s[2]){c.label=s[2],c.ops.push(n);break}s[2]&&c.ops.pop(),c.trys.pop();continue}n=r.call(t,c)}catch(e){n=[6,e],i=0}finally{o=s=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}([n,e])}}};Object.defineProperty(n,"__esModule",{value:!0}),n.renderUsers=n.log=n.confirm=n.renderUsername=n.getUserName=void 0;var s=function(e){return document.querySelector(e)},l=s("#userlist"),r=s("#log");n.getUserName=function(){return a(this,void 0,void 0,function(){var r,n,t,o,i;return u(this,function(e){return r="amongus:username",n=sessionStorage.getItem(r),s("#logout").addEventListener("click",function(e){sessionStorage.removeItem(r),location.reload()}),n?[2,Promise.resolve(n)]:(t=s("#login"),o=t.querySelector("form"),i=null==o?void 0:o.querySelector("input[type=text]"),t.showModal(),[2,new Promise(function(t,e){o.addEventListener("submit",function(e){var n=i.value.trim();sessionStorage.setItem(r,n),t(n)})})])})})},n.renderUsername=function(e){s("#username").innerHTML=e},n.confirm=function(e){var n=s("#confirm-dialog"),t=document.importNode(n.content,!0).firstElementChild;function r(e){return t.querySelector(e)}return document.body.appendChild(t),r(".question").innerHTML=e,new Promise(function(e){r(".yes").addEventListener("click",function(){return e(!0)}),r(".no").addEventListener("click",function(){return e(!1)}),t.showModal()}).then(function(e){return t.remove(),e})},n.log=function(e){console.log("LOG",e);var n=document.createElement("li");n.innerHTML=e,r.appendChild(n);var t=r.parentElement;t.scrollTop=t.scrollHeight},n.renderUsers=function o(i,s){var c=this;l.innerHTML="";for(var e=0,n=i;e<n.length;e++)!function(n){var e=document.createElement("div"),t=n.isAnswered?"(hablando)<br>Click para colgar":n.isCalling?"(llamando...)":"",r=document.createElement("button");r.innerHTML=n.name+" "+t,r.onclick=function(){return a(c,void 0,void 0,function(){return u(this,function(e){switch(e.label){case 0:return[4,s(n)];case 1:return e.sent(),o(i,s),[2]}})})},e.appendChild(r),l.appendChild(e)}(n[e])}},function(e,n,t){"use strict";var r;Object.defineProperty(n,"__esModule",{value:!0}),n.IncomingMessageType=void 0,(r=n.IncomingMessageType||(n.IncomingMessageType={})).ERROR="ERROR",r.LOGIN="LOGIN",r.LOGOUT="LOGOUT",r.SEND_OFFER="SEND_OFFER",r.OFFER_REJECTED="OFFER_REJECTED",r.SEND_ANSWER="SEND_ANSWER",r.END_CONNECTION="END_CONNECTION"},function(e,n,t){"use strict";var o=this&&this.__awaiter||function(e,s,c,a){return new(c=c||Promise)(function(t,n){function r(e){try{i(a.next(e))}catch(e){n(e)}}function o(e){try{i(a.throw(e))}catch(e){n(e)}}function i(e){var n;e.done?t(e.value):((n=e.value)instanceof c?n:new c(function(e){e(n)})).then(r,o)}i((a=a.apply(e,s||[])).next())})},i=this&&this.__generator||function(t,r){var o,i,s,c={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]},e={next:n(0),throw:n(1),return:n(2)};return"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function n(n){return function(e){return function(n){if(o)throw new TypeError("Generator is already executing.");for(;c;)try{if(o=1,i&&(s=2&n[0]?i.return:n[0]?i.throw||((s=i.return)&&s.call(i),0):i.next)&&!(s=s.call(i,n[1])).done)return s;switch(i=0,s&&(n=[2&n[0],s.value]),n[0]){case 0:case 1:s=n;break;case 4:return c.label++,{value:n[1],done:!1};case 5:c.label++,i=n[1],n=[0];continue;case 7:n=c.ops.pop(),c.trys.pop();continue;default:if(!(s=0<(s=c.trys).length&&s[s.length-1])&&(6===n[0]||2===n[0])){c=0;continue}if(3===n[0]&&(!s||n[1]>s[0]&&n[1]<s[3])){c.label=n[1];break}if(6===n[0]&&c.label<s[1]){c.label=s[1],s=n;break}if(s&&c.label<s[2]){c.label=s[2],c.ops.push(n);break}s[2]&&c.ops.pop(),c.trys.pop();continue}n=r.call(t,c)}catch(e){n=[6,e],i=0}finally{o=s=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}([n,e])}}};Object.defineProperty(n,"__esModule",{value:!0}),n.playAudio=n.captureAudio=void 0;var r=t(0);n.captureAudio=function(){return o(this,void 0,void 0,function(){var n;return i(this,function(e){switch(e.label){case 0:return r.log("Solicitando acceso a micrófono..."),[4,navigator.mediaDevices.getUserMedia({audio:!0})];case 1:return n=e.sent(),r.log("Permiso de audio concedido"),[2,n]}})})},n.playAudio=function(r){return o(this,void 0,void 0,function(){return i(this,function(e){switch(e.label){case 0:return n=r,(t=document.createElement("audio")).srcObject=n,document.body.appendChild(t),[4,t.play()];case 1:return e.sent(),console.log("playing"),[2]}var n,t})})}},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.User=n.userDisconnected=n.userConnected=n.getUserByName=n.setUserList=n.refreshUserList=n.onUserClicked=void 0;var r,o=t(0),i=[];function s(){o.renderUsers(i,r)}function c(e){return new a(e)}n.onUserClicked=function(e){r=e},n.refreshUserList=s,n.setUserList=function(e){i=e.map(c).map(function(e){return n=e.id,i.find(function(e){return e.id===n})||e;var n}),s()},n.getUserByName=function(n){var e=i.find(function(e){return e.name===n});if(!e)throw new Error("Can't find user \""+n+'"');return e},n.userConnected=function(e){o.log(e.name+" online"),i.push(c(e)),s()},n.userDisconnected=function(n){o.log(n.name+" offline"),i=i.filter(function(e){return e.id!==n.id}),s()};var a=(Object.defineProperty(u.prototype,"isCalling",{get:function(){return Boolean(this.connection)},enumerable:!1,configurable:!0}),Object.defineProperty(u.prototype,"isAnswered",{get:function(){var e;return null===(e=this.connection)||void 0===e?void 0:e.hasTracks},enumerable:!1,configurable:!0}),Object.defineProperty(u.prototype,"peerConnection",{get:function(){return this.connection},enumerable:!1,configurable:!0}),u.prototype.callStarted=function(e){this.connection=e},u.prototype.hangup=function(){var e;null!==(e=this.connection)&&void 0!==e&&e.end(),this.connection=null},u);function u(e){this.connection=null,this.id=e.id,this.room=e.room,this.name=e.name}n.User=a},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.logAllEvents=void 0,n.logAllEvents=function(e,t){(function(e){var n=[],t=e;for(;t;)n.push.apply(n,Object.keys(t)),t=Object.getPrototypeOf(t);return function(e){return Array.from(new Set(e))}(n)})(e).filter(function(e){return e.startsWith("on")}).map(function(n){return e[n]=function(e){return console.debug(t+' event "'+n+'"',e)}})}},function(e,n,t){"use strict";var i=this&&this.__awaiter||function(e,s,c,a){return new(c=c||Promise)(function(t,n){function r(e){try{i(a.next(e))}catch(e){n(e)}}function o(e){try{i(a.throw(e))}catch(e){n(e)}}function i(e){var n;e.done?t(e.value):((n=e.value)instanceof c?n:new c(function(e){e(n)})).then(r,o)}i((a=a.apply(e,s||[])).next())})},s=this&&this.__generator||function(t,r){var o,i,s,c={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]},e={next:n(0),throw:n(1),return:n(2)};return"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function n(n){return function(e){return function(n){if(o)throw new TypeError("Generator is already executing.");for(;c;)try{if(o=1,i&&(s=2&n[0]?i.return:n[0]?i.throw||((s=i.return)&&s.call(i),0):i.next)&&!(s=s.call(i,n[1])).done)return s;switch(i=0,s&&(n=[2&n[0],s.value]),n[0]){case 0:case 1:s=n;break;case 4:return c.label++,{value:n[1],done:!1};case 5:c.label++,i=n[1],n=[0];continue;case 7:n=c.ops.pop(),c.trys.pop();continue;default:if(!(s=0<(s=c.trys).length&&s[s.length-1])&&(6===n[0]||2===n[0])){c=0;continue}if(3===n[0]&&(!s||n[1]>s[0]&&n[1]<s[3])){c.label=n[1];break}if(6===n[0]&&c.label<s[1]){c.label=s[1],s=n;break}if(s&&c.label<s[2]){c.label=s[2],c.ops.push(n);break}s[2]&&c.ops.pop(),c.trys.pop();continue}n=r.call(t,c)}catch(e){n=[6,e],i=0}finally{o=s=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}([n,e])}}};Object.defineProperty(n,"__esModule",{value:!0});var c=t(1),o=t(6),a=t(2),u=t(0),l=t(3),f=t(7),r=t(12),d=location.pathname.replace(/^\/walkie\//,""),p=o.OutgoingMessageType,h=new r.Socket("wss://amongus.amatiasq.com");function g(n,e,t){function r(n){return function(e){if(e.from===t.id)return n(e)}}e.onMessage(o.OutgoingMessageType.OFFER_REJECTED,r(function(){u.log(t.name+" ha rechazado la llamada."),t.hangup()})),e.onMessage(o.OutgoingMessageType.RECEIVE_ANSWER,r(function(e){return n.receiveAnswer(e.answer)})),e.onMessage(o.OutgoingMessageType.END_CONNECTION,r(function(){u.log(t.name+" ha terminado la llamada."),t.hangup(),l.refreshUserList()}))}l.onUserClicked(function(e){return e.isCalling?(e.hangup(),h.send({type:c.IncomingMessageType.END_CONNECTION,to:e.id})):function(r){return i(this,void 0,void 0,function(){var n,t;return s(this,function(e){switch(e.label){case 0:return u.log("Iniciando llamada a "+r.name+"..."),n=new f.PeerConnection(r,function(e){return h.send(e)}),[4,a.captureAudio()];case 1:return t=e.sent(),g(n,h,r),t.getTracks().forEach(function(e){return n.addTrack(e,t)}),n.sendOffer(),u.log("Enviando solicitud de llamada a "+r.name+"..."),r.callStarted(n),[2,n]}})})}(e)}),h.onMessage(p.HANDSHAKE,function(){return i(this,void 0,void 0,function(){var n;return s(this,function(e){switch(e.label){case 0:return[4,u.getUserName()];case 1:return n=e.sent(),u.renderUsername(n),h.send({type:c.IncomingMessageType.LOGIN,room:d,name:n}),[2]}})})}),h.onMessage(p.LOGIN_RESULT,function(e){if(e.type!==o.OutgoingMessageType.LOGIN_RESULT)return;if(!e.success)return alert(e.message),sessionStorage.clear(),void location.reload();{var n;e.users.length&&(n=e.users.map(function(e){return"<li>"+e.name+"</li>"}).join(""),u.log("Personas en la habitación: <ul>"+n+"</ul>"))}l.setUserList(e.users)}),h.onMessage(p.USER_CONNECTED,function(e){return l.userConnected(e.user)}),h.onMessage(p.USER_DISCONNECTED,function(e){return l.userDisconnected(e.user)}),h.onMessage(p.RECEIVE_OFFER,function(e){return function(r,o){return i(this,void 0,void 0,function(){var n,t;return s(this,function(e){switch(e.label){case 0:return u.log(r.name+" quiere iniciar una llamada"),[4,u.confirm(r.name+" quiere iniciar una llamada.<br>Contestar?")];case 1:return e.sent()?(u.log("Llamada de "+r.name+" aceptada"),n=new f.PeerConnection(r,function(e){return h.send(e)}),[4,a.captureAudio()]):(u.log("Llamada de "+r.name+" rechazada"),h.send({type:c.IncomingMessageType.OFFER_REJECTED,to:r.id}),[2]);case 2:return t=e.sent(),g(n,h,r),t.getTracks().forEach(function(e){return n.addTrack(e,t)}),n.receiveOffer(o),u.log("Enviando respuesta a "+r.name+"..."),r.callStarted(n),[2,n]}})})}(l.getUserByName(e.from),e.offer)})},function(e,n,t){"use strict";var r;Object.defineProperty(n,"__esModule",{value:!0}),n.OutgoingMessageType=void 0,(r=n.OutgoingMessageType||(n.OutgoingMessageType={})).ERROR="ERROR",r.HANDSHAKE="HANDSHAKE",r.LOGIN_RESULT="LOGIN_RESULT",r.USER_CONNECTED="USER_CONNECTED",r.USER_DISCONNECTED="USER_DISCONNECTED",r.RECEIVE_OFFER="RECEIVE_OFFER",r.OFFER_REJECTED="OFFER_REJECTED",r.RECEIVE_ANSWER="RECEIVE_ANSWER",r.END_CONNECTION="END_CONNECTION"},function(e,n,t){"use strict";var r=this&&this.__awaiter||function(e,s,c,a){return new(c=c||Promise)(function(t,n){function r(e){try{i(a.next(e))}catch(e){n(e)}}function o(e){try{i(a.throw(e))}catch(e){n(e)}}function i(e){var n;e.done?t(e.value):((n=e.value)instanceof c?n:new c(function(e){e(n)})).then(r,o)}i((a=a.apply(e,s||[])).next())})},o=this&&this.__generator||function(t,r){var o,i,s,c={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]},e={next:n(0),throw:n(1),return:n(2)};return"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function n(n){return function(e){return function(n){if(o)throw new TypeError("Generator is already executing.");for(;c;)try{if(o=1,i&&(s=2&n[0]?i.return:n[0]?i.throw||((s=i.return)&&s.call(i),0):i.next)&&!(s=s.call(i,n[1])).done)return s;switch(i=0,s&&(n=[2&n[0],s.value]),n[0]){case 0:case 1:s=n;break;case 4:return c.label++,{value:n[1],done:!1};case 5:c.label++,i=n[1],n=[0];continue;case 7:n=c.ops.pop(),c.trys.pop();continue;default:if(!(s=0<(s=c.trys).length&&s[s.length-1])&&(6===n[0]||2===n[0])){c=0;continue}if(3===n[0]&&(!s||n[1]>s[0]&&n[1]<s[3])){c.label=n[1];break}if(6===n[0]&&c.label<s[1]){c.label=s[1],s=n;break}if(s&&c.label<s[2]){c.label=s[2],c.ops.push(n);break}s[2]&&c.ops.pop(),c.trys.pop();continue}n=r.call(t,c)}catch(e){n=[6,e],i=0}finally{o=s=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}([n,e])}}};Object.defineProperty(n,"__esModule",{value:!0}),n.PeerConnection=void 0;var i=t(1),s=t(2),c=t(4),a=t(0),u=t(3),l=t(8),f=(Object.defineProperty(d.prototype,"hasTracks",{get:function(){return this.hasRemoteTracks&&this.hasLocalTracks},enumerable:!1,configurable:!0}),d.prototype.sendOffer=function(){return r(this,void 0,void 0,function(){var n;return o(this,function(e){switch(e.label){case 0:return[4,this.createOffer({offerToReceiveAudio:!0})];case 1:return n=e.sent(),[4,this.send({type:i.IncomingMessageType.SEND_OFFER,to:this.user.id,offer:n})];case 2:return e.sent(),[2]}})})},d.prototype.receiveOffer=function(t){return r(this,void 0,void 0,function(){var n;return o(this,function(e){switch(e.label){case 0:return[4,this.setRemoteDescription(t)];case 1:return e.sent(),[4,this.createAnswer({offerToReceiveAudio:!0})];case 2:return n=e.sent(),[4,this.send({type:i.IncomingMessageType.SEND_ANSWER,to:this.user.id,answer:n})];case 3:return e.sent(),[2]}})})},d.prototype.receiveAnswer=function(e){return this.setRemoteDescription(e)},d.prototype.addTrack=function(e,n){return this.hasLocalTracks=!0,a.log("Enviando audio a "+this.user.name+"."),this.rtc.addTrack(e,n)},d.prototype.end=function(){this.rtc.close()},d.prototype.processIceCandidates=function(){var e=this;return new Promise(function(n){e.rtc.onicecandidate=function(e){return null==e.candidate&&n()}})},d.prototype.createRtc=function(){var t=this,e=new RTCPeerConnection({iceServers:l()});return c.logAllEvents(e,"WebRTC("+this.user.name+")"),e.ontrack=function(e){t.hasRemoteTracks=!0,a.log("Recibiendo audio de "+t.user.name+"."),u.refreshUserList(),s.playAudio(e.streams[0])},e.ondatachannel=function(e){var n=e.channel;n.onmessage=function(e){return t.onDataChannelMessage(e)},n.onopen=function(){return console.log("Data channel is open and ready to be used.")}},e},d.prototype.createOffer=function(t){return void 0===t&&(t={}),r(this,void 0,void 0,function(){var n;return o(this,function(e){switch(e.label){case 0:return[4,this.rtc.createOffer(t)];case 1:return n=e.sent(),[4,this.rtc.setLocalDescription(n)];case 2:return e.sent(),[4,this.processIceCandidates()];case 3:return e.sent(),[2,this.rtc.localDescription]}})})},d.prototype.createAnswer=function(t){return void 0===t&&(t={}),r(this,void 0,void 0,function(){var n;return o(this,function(e){switch(e.label){case 0:return[4,this.rtc.createAnswer(t)];case 1:return n=e.sent(),[4,this.rtc.setLocalDescription(n)];case 2:return e.sent(),[4,this.processIceCandidates()];case 3:return e.sent(),[2,this.rtc.localDescription]}})})},d.prototype.setRemoteDescription=function(e){return this.rtc.setRemoteDescription(new RTCSessionDescription(e))},d.prototype.onDataChannelMessage=function(e){console.log("POLLAS",e)},d);function d(e,n){this.user=e,this.send=n,this.rtc=this.createRtc(),this.hasRemoteTracks=!1,this.hasLocalTracks=!1}n.PeerConnection=f},function(e,n,o){"use strict";var s=o(9);e.exports=function(e){var n,i={stun:(e||{}).stun||o(10),turn:(e||{}).turn||o(11)},t=(e||{}).turnCount||0;function r(n,e){for(var t,r=[],o=[].concat(i[n]);o.length&&r.length<e;)t=Math.random()*o.length|0,r=r.concat(o.splice(t,1));return r.map(function(e){return"string"==typeof e||e instanceof String?s(n+":"+e):e})}return n=[].concat(r("stun",(e||{}).stunCount||2)),t&&(n=n.concat(r("turn",t))),n}},function(e,n){var i=["stun:","turn:"];e.exports=function(e){var n,t,r=(e||{}).url||e,o={};return"string"==typeof r||r instanceof String?(r=r.trim(),(n=i[i.indexOf(r.slice(0,5))])?(t=(r=r.slice(5)).split("@"),o.username=e.username,o.credential=e.credential,1<t.length&&(r=t[1],t=t[0].split(":"),o.username=t[0],o.credential=(e||{}).credential||t[1]||""),o.url=n+r,o.urls=[o.url],o):e):e}},function(e){e.exports=JSON.parse('["stun.l.google.com:19302","stun1.l.google.com:19302","stun2.l.google.com:19302","stun3.l.google.com:19302","stun4.l.google.com:19302","stun.ekiga.net","stun.ideasip.com","stun.schlund.de","stun.stunprotocol.org:3478","stun.voiparound.com","stun.voipbuster.com","stun.voipstunt.com","stun.voxgratia.org"]')},function(e){e.exports=JSON.parse("[]")},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.Socket=void 0;var r=t(4),o=(i.prototype.onMessage=function(e,n){this.listeners.has(e)?this.listeners.get(e).push(n):this.listeners.set(e,[n])},i.prototype.send=function(e){this.ws.send(JSON.stringify(e))},i.prototype.init=function(){var n=this,e=new WebSocket("wss://api.amatiasq.com/walkie");return r.logAllEvents(e,"WebSocket"),e.onerror=function(){return n.reconnect()},e.onclose=function(){return n.reconnect()},e.onmessage=function(e){return n.processMessage(e)},e},i.prototype.reconnect=function(){var e=this;14<this.reconnectAttempts?console.error("Websocket aborted after "+this.reconnectAttempts+" attempts"):this.isReconnecting||(this.isReconnecting=!0,console.warn("Socket closed. Waiting "+this.reconnectionDelay/1e3+"s"),setTimeout(function(){console.warn("Reconnecting..."),e.reconnectionDelay*=2,e.reconnectAttempts++,e.isReconnecting=!1,e.ws=e.init()},this.reconnectionDelay))},i.prototype.processMessage=function(e){this.reconnectionDelay=100,this.reconnectAttempts=0;var n=JSON.parse(e.data),t=this.listeners.get(n.type);console.debug(n.type,n),t?t.forEach(function(e){return e(n)}):console.log("Unhandled message: "+n.type)},i);function i(e){this.uri=e,this.reconnectionDelay=100,this.reconnectAttempts=0,this.isReconnecting=!1,this.listeners=new Map,this.ws=this.init()}n.Socket=o}]);
//# sourceMappingURL=main.js.map