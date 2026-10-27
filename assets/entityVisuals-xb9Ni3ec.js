(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();const oa="180",o3={ROTATE:0,DOLLY:1,PAN:2},r3={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Jl=0,Na=1,Kl=2,el=1,jl=2,mn=3,zn=0,Ct=1,bt=2,bn=0,Ei=1,Ai=2,Fa=3,Oa=4,Ql=5,kn=100,eh=101,th=102,nh=103,ih=104,sh=200,oh=201,rh=202,ah=203,dr=204,fr=205,ch=206,lh=207,hh=208,uh=209,ph=210,dh=211,fh=212,mh=213,gh=214,mr=0,gr=1,_r=2,zi=3,vr=4,yr=5,xr=6,Mr=7,ra=0,_h=1,vh=2,Tn=0,yh=1,xh=2,Mh=3,Sh=4,wh=5,Eh=6,bh=7,tl=300,Ri=301,Ci=302,Sr=303,wr=304,po=306,Xn=1e3,Wn=1001,Er=1002,Ot=1003,Th=1004,gs=1005,tn=1006,wo=1007,$n=1008,rn=1009,nl=1010,il=1011,ts=1012,aa=1013,qn=1014,nn=1015,us=1016,ca=1017,la=1018,ns=1020,sl=35902,ol=35899,rl=1021,al=1022,Zt=1023,is=1026,ss=1027,ha=1028,ua=1029,cl=1030,pa=1031,da=1033,Qs=33776,eo=33777,to=33778,no=33779,br=35840,Tr=35841,Ar=35842,zr=35843,Rr=36196,Cr=37492,Pr=37496,Lr=37808,Dr=37809,Ir=37810,Ur=37811,Nr=37812,Fr=37813,Or=37814,Br=37815,Hr=37816,Vr=37817,kr=37818,Gr=37819,Wr=37820,$r=37821,Xr=36492,qr=36494,Yr=36495,Zr=36283,Jr=36284,Kr=36285,jr=36286,Ah=3200,zh=3201,fa=0,Rh=1,en="",ut="srgb",Pi="srgb-linear",ao="linear",je="srgb",ti=7680,Ba=519,Ch=512,Ph=513,Lh=514,ll=515,Dh=516,Ih=517,Uh=518,Nh=519,Qr=35044,Ha="300 es",sn=2e3,co=2001;class Jn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const o=s.indexOf(t);o!==-1&&s.splice(o,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let o=0,r=s.length;o<r;o++)s[o].call(this,e);e.target=null}}}const wt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Va=1234567;const bi=Math.PI/180,os=180/Math.PI;function on(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(wt[i&255]+wt[i>>8&255]+wt[i>>16&255]+wt[i>>24&255]+"-"+wt[e&255]+wt[e>>8&255]+"-"+wt[e>>16&15|64]+wt[e>>24&255]+"-"+wt[t&63|128]+wt[t>>8&255]+"-"+wt[t>>16&255]+wt[t>>24&255]+wt[n&255]+wt[n>>8&255]+wt[n>>16&255]+wt[n>>24&255]).toLowerCase()}function Fe(i,e,t){return Math.max(e,Math.min(t,i))}function ma(i,e){return(i%e+e)%e}function Fh(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Oh(i,e,t){return i!==e?(t-i)/(e-i):0}function Ki(i,e,t){return(1-t)*i+t*e}function Bh(i,e,t,n){return Ki(i,e,1-Math.exp(-t*n))}function Hh(i,e=1){return e-Math.abs(ma(i,e*2)-e)}function Vh(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function kh(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Gh(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Wh(i,e){return i+Math.random()*(e-i)}function $h(i){return i*(.5-Math.random())}function Xh(i){i!==void 0&&(Va=i);let e=Va+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function qh(i){return i*bi}function Yh(i){return i*os}function Zh(i){return(i&i-1)===0&&i!==0}function Jh(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Kh(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function jh(i,e,t,n,s){const o=Math.cos,r=Math.sin,a=o(t/2),c=r(t/2),l=o((e+n)/2),u=r((e+n)/2),h=o((e-n)/2),p=r((e-n)/2),d=o((n-e)/2),g=r((n-e)/2);switch(s){case"XYX":i.set(a*u,c*h,c*p,a*l);break;case"YZY":i.set(c*p,a*u,c*h,a*l);break;case"ZXZ":i.set(c*h,c*p,a*u,a*l);break;case"XZX":i.set(a*u,c*g,c*d,a*l);break;case"YXY":i.set(c*d,a*u,c*g,a*l);break;case"ZYZ":i.set(c*g,c*d,a*u,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Yt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ze(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const a3={DEG2RAD:bi,RAD2DEG:os,generateUUID:on,clamp:Fe,euclideanModulo:ma,mapLinear:Fh,inverseLerp:Oh,lerp:Ki,damp:Bh,pingpong:Hh,smoothstep:Vh,smootherstep:kh,randInt:Gh,randFloat:Wh,randFloatSpread:$h,seededRandom:Xh,degToRad:qh,radToDeg:Yh,isPowerOfTwo:Zh,ceilPowerOfTwo:Jh,floorPowerOfTwo:Kh,setQuaternionFromProperEuler:jh,normalize:Ze,denormalize:Yt};class oe{constructor(e=0,t=0){oe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Fe(this.x,e.x,t.x),this.y=Fe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Fe(this.x,e,t),this.y=Fe(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Fe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Fe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),o=this.x-e.x,r=this.y-e.y;return this.x=o*n-r*s+e.x,this.y=o*s+r*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class An{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,o,r,a){let c=n[s+0],l=n[s+1],u=n[s+2],h=n[s+3];const p=o[r+0],d=o[r+1],g=o[r+2],_=o[r+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=p,e[t+1]=d,e[t+2]=g,e[t+3]=_;return}if(h!==_||c!==p||l!==d||u!==g){let m=1-a;const f=c*p+l*d+u*g+h*_,E=f>=0?1:-1,w=1-f*f;if(w>Number.EPSILON){const A=Math.sqrt(w),T=Math.atan2(A,f*E);m=Math.sin(m*T)/A,a=Math.sin(a*T)/A}const v=a*E;if(c=c*m+p*v,l=l*m+d*v,u=u*m+g*v,h=h*m+_*v,m===1-a){const A=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=A,l*=A,u*=A,h*=A}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,s,o,r){const a=n[s],c=n[s+1],l=n[s+2],u=n[s+3],h=o[r],p=o[r+1],d=o[r+2],g=o[r+3];return e[t]=a*g+u*h+c*d-l*p,e[t+1]=c*g+u*p+l*h-a*d,e[t+2]=l*g+u*d+a*p-c*h,e[t+3]=u*g-a*h-c*p-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,o=e._z,r=e._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(s/2),h=a(o/2),p=c(n/2),d=c(s/2),g=c(o/2);switch(r){case"XYZ":this._x=p*u*h+l*d*g,this._y=l*d*h-p*u*g,this._z=l*u*g+p*d*h,this._w=l*u*h-p*d*g;break;case"YXZ":this._x=p*u*h+l*d*g,this._y=l*d*h-p*u*g,this._z=l*u*g-p*d*h,this._w=l*u*h+p*d*g;break;case"ZXY":this._x=p*u*h-l*d*g,this._y=l*d*h+p*u*g,this._z=l*u*g+p*d*h,this._w=l*u*h-p*d*g;break;case"ZYX":this._x=p*u*h-l*d*g,this._y=l*d*h+p*u*g,this._z=l*u*g-p*d*h,this._w=l*u*h+p*d*g;break;case"YZX":this._x=p*u*h+l*d*g,this._y=l*d*h+p*u*g,this._z=l*u*g-p*d*h,this._w=l*u*h-p*d*g;break;case"XZY":this._x=p*u*h-l*d*g,this._y=l*d*h-p*u*g,this._z=l*u*g+p*d*h,this._w=l*u*h+p*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],o=t[8],r=t[1],a=t[5],c=t[9],l=t[2],u=t[6],h=t[10],p=n+a+h;if(p>0){const d=.5/Math.sqrt(p+1);this._w=.25/d,this._x=(u-c)*d,this._y=(o-l)*d,this._z=(r-s)*d}else if(n>a&&n>h){const d=2*Math.sqrt(1+n-a-h);this._w=(u-c)/d,this._x=.25*d,this._y=(s+r)/d,this._z=(o+l)/d}else if(a>h){const d=2*Math.sqrt(1+a-n-h);this._w=(o-l)/d,this._x=(s+r)/d,this._y=.25*d,this._z=(c+u)/d}else{const d=2*Math.sqrt(1+h-n-a);this._w=(r-s)/d,this._x=(o+l)/d,this._y=(c+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Fe(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,o=e._z,r=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+r*a+s*l-o*c,this._y=s*u+r*c+o*a-n*l,this._z=o*u+r*l+n*c-s*a,this._w=r*u-n*a-s*c-o*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,o=this._z,r=this._w;let a=r*e._w+n*e._x+s*e._y+o*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=r,this._x=n,this._y=s,this._z=o,this;const c=1-a*a;if(c<=Number.EPSILON){const d=1-t;return this._w=d*r+t*this._w,this._x=d*n+t*this._x,this._y=d*s+t*this._y,this._z=d*o+t*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,a),h=Math.sin((1-t)*u)/l,p=Math.sin(t*u)/l;return this._w=r*h+this._w*p,this._x=n*h+this._x*p,this._y=s*h+this._y*p,this._z=o*h+this._z*p,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),o=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),o*Math.sin(t),o*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class z{constructor(e=0,t=0,n=0){z.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ka.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ka.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,o=e.elements;return this.x=o[0]*t+o[3]*n+o[6]*s,this.y=o[1]*t+o[4]*n+o[7]*s,this.z=o[2]*t+o[5]*n+o[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,o=e.elements,r=1/(o[3]*t+o[7]*n+o[11]*s+o[15]);return this.x=(o[0]*t+o[4]*n+o[8]*s+o[12])*r,this.y=(o[1]*t+o[5]*n+o[9]*s+o[13])*r,this.z=(o[2]*t+o[6]*n+o[10]*s+o[14])*r,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,o=e.x,r=e.y,a=e.z,c=e.w,l=2*(r*s-a*n),u=2*(a*t-o*s),h=2*(o*n-r*t);return this.x=t+c*l+r*h-a*u,this.y=n+c*u+a*l-o*h,this.z=s+c*h+o*u-r*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s,this.y=o[1]*t+o[5]*n+o[9]*s,this.z=o[2]*t+o[6]*n+o[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Fe(this.x,e.x,t.x),this.y=Fe(this.y,e.y,t.y),this.z=Fe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Fe(this.x,e,t),this.y=Fe(this.y,e,t),this.z=Fe(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Fe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,o=e.z,r=t.x,a=t.y,c=t.z;return this.x=s*c-o*a,this.y=o*r-n*c,this.z=n*a-s*r,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Eo.copy(this).projectOnVector(e),this.sub(Eo)}reflect(e){return this.sub(Eo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Fe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Eo=new z,ka=new An;class Ne{constructor(e,t,n,s,o,r,a,c,l){Ne.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,o,r,a,c,l)}set(e,t,n,s,o,r,a,c,l){const u=this.elements;return u[0]=e,u[1]=s,u[2]=a,u[3]=t,u[4]=o,u[5]=c,u[6]=n,u[7]=r,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,o=this.elements,r=n[0],a=n[3],c=n[6],l=n[1],u=n[4],h=n[7],p=n[2],d=n[5],g=n[8],_=s[0],m=s[3],f=s[6],E=s[1],w=s[4],v=s[7],A=s[2],T=s[5],R=s[8];return o[0]=r*_+a*E+c*A,o[3]=r*m+a*w+c*T,o[6]=r*f+a*v+c*R,o[1]=l*_+u*E+h*A,o[4]=l*m+u*w+h*T,o[7]=l*f+u*v+h*R,o[2]=p*_+d*E+g*A,o[5]=p*m+d*w+g*T,o[8]=p*f+d*v+g*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],o=e[3],r=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*r*u-t*a*l-n*o*u+n*a*c+s*o*l-s*r*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],o=e[3],r=e[4],a=e[5],c=e[6],l=e[7],u=e[8],h=u*r-a*l,p=a*c-u*o,d=l*o-r*c,g=t*h+n*p+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=h*_,e[1]=(s*l-u*n)*_,e[2]=(a*n-s*r)*_,e[3]=p*_,e[4]=(u*t-s*c)*_,e[5]=(s*o-a*t)*_,e[6]=d*_,e[7]=(n*c-l*t)*_,e[8]=(r*t-n*o)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,o,r,a){const c=Math.cos(o),l=Math.sin(o);return this.set(n*c,n*l,-n*(c*r+l*a)+r+e,-s*l,s*c,-s*(-l*r+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(bo.makeScale(e,t)),this}rotate(e){return this.premultiply(bo.makeRotation(-e)),this}translate(e,t){return this.premultiply(bo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const bo=new Ne;function hl(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function rs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Qh(){const i=rs("canvas");return i.style.display="block",i}const Ga={};function as(i){i in Ga||(Ga[i]=!0,console.warn(i))}function eu(i,e,t){return new Promise(function(n,s){function o(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(o,t);break;default:n()}}setTimeout(o,t)})}const Wa=new Ne().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),$a=new Ne().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function tu(){const i={enabled:!0,workingColorSpace:Pi,spaces:{},convert:function(s,o,r){return this.enabled===!1||o===r||!o||!r||(this.spaces[o].transfer===je&&(s.r=gn(s.r),s.g=gn(s.g),s.b=gn(s.b)),this.spaces[o].primaries!==this.spaces[r].primaries&&(s.applyMatrix3(this.spaces[o].toXYZ),s.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===je&&(s.r=Ti(s.r),s.g=Ti(s.g),s.b=Ti(s.b))),s},workingToColorSpace:function(s,o){return this.convert(s,this.workingColorSpace,o)},colorSpaceToWorking:function(s,o){return this.convert(s,o,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===en?ao:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,o=this.workingColorSpace){return s.fromArray(this.spaces[o].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,o,r){return s.copy(this.spaces[o].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,o){return as("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,o)},toWorkingColorSpace:function(s,o){return as("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,o)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Pi]:{primaries:e,whitePoint:n,transfer:ao,toXYZ:Wa,fromXYZ:$a,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:ut},outputColorSpaceConfig:{drawingBufferColorSpace:ut}},[ut]:{primaries:e,whitePoint:n,transfer:je,toXYZ:Wa,fromXYZ:$a,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:ut}}}),i}const Xe=tu();function gn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ti(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let ni;class nu{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ni===void 0&&(ni=rs("canvas")),ni.width=e.width,ni.height=e.height;const s=ni.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=ni}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=rs("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),o=s.data;for(let r=0;r<o.length;r++)o[r]=gn(o[r]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(gn(t[n]/255)*255):t[n]=gn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let iu=0;class ga{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:iu++}),this.uuid=on(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let o;if(Array.isArray(s)){o=[];for(let r=0,a=s.length;r<a;r++)s[r].isDataTexture?o.push(To(s[r].image)):o.push(To(s[r]))}else o=To(s);n.url=o}return t||(e.images[this.uuid]=n),n}}function To(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?nu.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let su=0;const Ao=new z;class Mt extends Jn{constructor(e=Mt.DEFAULT_IMAGE,t=Mt.DEFAULT_MAPPING,n=Wn,s=Wn,o=tn,r=$n,a=Zt,c=rn,l=Mt.DEFAULT_ANISOTROPY,u=en){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:su++}),this.uuid=on(),this.name="",this.source=new ga(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=o,this.minFilter=r,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new oe(0,0),this.repeat=new oe(1,1),this.center=new oe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ne,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Ao).x}get height(){return this.source.getSize(Ao).y}get depth(){return this.source.getSize(Ao).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==tl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Xn:e.x=e.x-Math.floor(e.x);break;case Wn:e.x=e.x<0?0:1;break;case Er:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Xn:e.y=e.y-Math.floor(e.y);break;case Wn:e.y=e.y<0?0:1;break;case Er:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Mt.DEFAULT_IMAGE=null;Mt.DEFAULT_MAPPING=tl;Mt.DEFAULT_ANISOTROPY=1;class Qe{constructor(e=0,t=0,n=0,s=1){Qe.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,o=this.w,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s+r[12]*o,this.y=r[1]*t+r[5]*n+r[9]*s+r[13]*o,this.z=r[2]*t+r[6]*n+r[10]*s+r[14]*o,this.w=r[3]*t+r[7]*n+r[11]*s+r[15]*o,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,o;const c=e.elements,l=c[0],u=c[4],h=c[8],p=c[1],d=c[5],g=c[9],_=c[2],m=c[6],f=c[10];if(Math.abs(u-p)<.01&&Math.abs(h-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+p)<.1&&Math.abs(h+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(l+1)/2,v=(d+1)/2,A=(f+1)/2,T=(u+p)/4,R=(h+_)/4,P=(g+m)/4;return w>v&&w>A?w<.01?(n=0,s=.707106781,o=.707106781):(n=Math.sqrt(w),s=T/n,o=R/n):v>A?v<.01?(n=.707106781,s=0,o=.707106781):(s=Math.sqrt(v),n=T/s,o=P/s):A<.01?(n=.707106781,s=.707106781,o=0):(o=Math.sqrt(A),n=R/o,s=P/o),this.set(n,s,o,t),this}let E=Math.sqrt((m-g)*(m-g)+(h-_)*(h-_)+(p-u)*(p-u));return Math.abs(E)<.001&&(E=1),this.x=(m-g)/E,this.y=(h-_)/E,this.z=(p-u)/E,this.w=Math.acos((l+d+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Fe(this.x,e.x,t.x),this.y=Fe(this.y,e.y,t.y),this.z=Fe(this.z,e.z,t.z),this.w=Fe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Fe(this.x,e,t),this.y=Fe(this.y,e,t),this.z=Fe(this.z,e,t),this.w=Fe(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Fe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ou extends Jn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:tn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Qe(0,0,e,t),this.scissorTest=!1,this.viewport=new Qe(0,0,e,t);const s={width:e,height:t,depth:n.depth},o=new Mt(s);this.textures=[];const r=n.count;for(let a=0;a<r;a++)this.textures[a]=o.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:tn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,o=this.textures.length;s<o;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new ga(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Yn extends ou{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class ul extends Mt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ot,this.minFilter=Ot,this.wrapR=Wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class ru extends Mt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ot,this.minFilter=Ot,this.wrapR=Wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Kn{constructor(e=new z(1/0,1/0,1/0),t=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint($t.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint($t.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=$t.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const o=n.getAttribute("position");if(t===!0&&o!==void 0&&e.isInstancedMesh!==!0)for(let r=0,a=o.count;r<a;r++)e.isMesh===!0?e.getVertexPosition(r,$t):$t.fromBufferAttribute(o,r),$t.applyMatrix4(e.matrixWorld),this.expandByPoint($t);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),_s.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),_s.copy(n.boundingBox)),_s.applyMatrix4(e.matrixWorld),this.union(_s)}const s=e.children;for(let o=0,r=s.length;o<r;o++)this.expandByObject(s[o],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,$t),$t.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ni),vs.subVectors(this.max,Ni),ii.subVectors(e.a,Ni),si.subVectors(e.b,Ni),oi.subVectors(e.c,Ni),yn.subVectors(si,ii),xn.subVectors(oi,si),In.subVectors(ii,oi);let t=[0,-yn.z,yn.y,0,-xn.z,xn.y,0,-In.z,In.y,yn.z,0,-yn.x,xn.z,0,-xn.x,In.z,0,-In.x,-yn.y,yn.x,0,-xn.y,xn.x,0,-In.y,In.x,0];return!zo(t,ii,si,oi,vs)||(t=[1,0,0,0,1,0,0,0,1],!zo(t,ii,si,oi,vs))?!1:(ys.crossVectors(yn,xn),t=[ys.x,ys.y,ys.z],zo(t,ii,si,oi,vs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,$t).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize($t).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(hn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),hn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),hn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),hn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),hn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),hn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),hn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),hn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(hn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const hn=[new z,new z,new z,new z,new z,new z,new z,new z],$t=new z,_s=new Kn,ii=new z,si=new z,oi=new z,yn=new z,xn=new z,In=new z,Ni=new z,vs=new z,ys=new z,Un=new z;function zo(i,e,t,n,s){for(let o=0,r=i.length-3;o<=r;o+=3){Un.fromArray(i,o);const a=s.x*Math.abs(Un.x)+s.y*Math.abs(Un.y)+s.z*Math.abs(Un.z),c=e.dot(Un),l=t.dot(Un),u=n.dot(Un);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const au=new Kn,Fi=new z,Ro=new z;class jn{constructor(e=new z,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):au.setFromPoints(e).getCenter(n);let s=0;for(let o=0,r=e.length;o<r;o++)s=Math.max(s,n.distanceToSquared(e[o]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Fi.subVectors(e,this.center);const t=Fi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Fi,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ro.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Fi.copy(e.center).add(Ro)),this.expandByPoint(Fi.copy(e.center).sub(Ro))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const un=new z,Co=new z,xs=new z,Mn=new z,Po=new z,Ms=new z,Lo=new z;class fo{constructor(e=new z,t=new z(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,un)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=un.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(un.copy(this.origin).addScaledVector(this.direction,t),un.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Co.copy(e).add(t).multiplyScalar(.5),xs.copy(t).sub(e).normalize(),Mn.copy(this.origin).sub(Co);const o=e.distanceTo(t)*.5,r=-this.direction.dot(xs),a=Mn.dot(this.direction),c=-Mn.dot(xs),l=Mn.lengthSq(),u=Math.abs(1-r*r);let h,p,d,g;if(u>0)if(h=r*c-a,p=r*a-c,g=o*u,h>=0)if(p>=-g)if(p<=g){const _=1/u;h*=_,p*=_,d=h*(h+r*p+2*a)+p*(r*h+p+2*c)+l}else p=o,h=Math.max(0,-(r*p+a)),d=-h*h+p*(p+2*c)+l;else p=-o,h=Math.max(0,-(r*p+a)),d=-h*h+p*(p+2*c)+l;else p<=-g?(h=Math.max(0,-(-r*o+a)),p=h>0?-o:Math.min(Math.max(-o,-c),o),d=-h*h+p*(p+2*c)+l):p<=g?(h=0,p=Math.min(Math.max(-o,-c),o),d=p*(p+2*c)+l):(h=Math.max(0,-(r*o+a)),p=h>0?o:Math.min(Math.max(-o,-c),o),d=-h*h+p*(p+2*c)+l);else p=r>0?-o:o,h=Math.max(0,-(r*p+a)),d=-h*h+p*(p+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(Co).addScaledVector(xs,p),d}intersectSphere(e,t){un.subVectors(e.center,this.origin);const n=un.dot(this.direction),s=un.dot(un)-n*n,o=e.radius*e.radius;if(s>o)return null;const r=Math.sqrt(o-s),a=n-r,c=n+r;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,o,r,a,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,p=this.origin;return l>=0?(n=(e.min.x-p.x)*l,s=(e.max.x-p.x)*l):(n=(e.max.x-p.x)*l,s=(e.min.x-p.x)*l),u>=0?(o=(e.min.y-p.y)*u,r=(e.max.y-p.y)*u):(o=(e.max.y-p.y)*u,r=(e.min.y-p.y)*u),n>r||o>s||((o>n||isNaN(n))&&(n=o),(r<s||isNaN(s))&&(s=r),h>=0?(a=(e.min.z-p.z)*h,c=(e.max.z-p.z)*h):(a=(e.max.z-p.z)*h,c=(e.min.z-p.z)*h),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,un)!==null}intersectTriangle(e,t,n,s,o){Po.subVectors(t,e),Ms.subVectors(n,e),Lo.crossVectors(Po,Ms);let r=this.direction.dot(Lo),a;if(r>0){if(s)return null;a=1}else if(r<0)a=-1,r=-r;else return null;Mn.subVectors(this.origin,e);const c=a*this.direction.dot(Ms.crossVectors(Mn,Ms));if(c<0)return null;const l=a*this.direction.dot(Po.cross(Mn));if(l<0||c+l>r)return null;const u=-a*Mn.dot(Lo);return u<0?null:this.at(u/r,o)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class We{constructor(e,t,n,s,o,r,a,c,l,u,h,p,d,g,_,m){We.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,o,r,a,c,l,u,h,p,d,g,_,m)}set(e,t,n,s,o,r,a,c,l,u,h,p,d,g,_,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=s,f[1]=o,f[5]=r,f[9]=a,f[13]=c,f[2]=l,f[6]=u,f[10]=h,f[14]=p,f[3]=d,f[7]=g,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new We().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/ri.setFromMatrixColumn(e,0).length(),o=1/ri.setFromMatrixColumn(e,1).length(),r=1/ri.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*o,t[5]=n[5]*o,t[6]=n[6]*o,t[7]=0,t[8]=n[8]*r,t[9]=n[9]*r,t[10]=n[10]*r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,o=e.z,r=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(o),h=Math.sin(o);if(e.order==="XYZ"){const p=r*u,d=r*h,g=a*u,_=a*h;t[0]=c*u,t[4]=-c*h,t[8]=l,t[1]=d+g*l,t[5]=p-_*l,t[9]=-a*c,t[2]=_-p*l,t[6]=g+d*l,t[10]=r*c}else if(e.order==="YXZ"){const p=c*u,d=c*h,g=l*u,_=l*h;t[0]=p+_*a,t[4]=g*a-d,t[8]=r*l,t[1]=r*h,t[5]=r*u,t[9]=-a,t[2]=d*a-g,t[6]=_+p*a,t[10]=r*c}else if(e.order==="ZXY"){const p=c*u,d=c*h,g=l*u,_=l*h;t[0]=p-_*a,t[4]=-r*h,t[8]=g+d*a,t[1]=d+g*a,t[5]=r*u,t[9]=_-p*a,t[2]=-r*l,t[6]=a,t[10]=r*c}else if(e.order==="ZYX"){const p=r*u,d=r*h,g=a*u,_=a*h;t[0]=c*u,t[4]=g*l-d,t[8]=p*l+_,t[1]=c*h,t[5]=_*l+p,t[9]=d*l-g,t[2]=-l,t[6]=a*c,t[10]=r*c}else if(e.order==="YZX"){const p=r*c,d=r*l,g=a*c,_=a*l;t[0]=c*u,t[4]=_-p*h,t[8]=g*h+d,t[1]=h,t[5]=r*u,t[9]=-a*u,t[2]=-l*u,t[6]=d*h+g,t[10]=p-_*h}else if(e.order==="XZY"){const p=r*c,d=r*l,g=a*c,_=a*l;t[0]=c*u,t[4]=-h,t[8]=l*u,t[1]=p*h+_,t[5]=r*u,t[9]=d*h-g,t[2]=g*h-d,t[6]=a*u,t[10]=_*h+p}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(cu,e,lu)}lookAt(e,t,n){const s=this.elements;return Ut.subVectors(e,t),Ut.lengthSq()===0&&(Ut.z=1),Ut.normalize(),Sn.crossVectors(n,Ut),Sn.lengthSq()===0&&(Math.abs(n.z)===1?Ut.x+=1e-4:Ut.z+=1e-4,Ut.normalize(),Sn.crossVectors(n,Ut)),Sn.normalize(),Ss.crossVectors(Ut,Sn),s[0]=Sn.x,s[4]=Ss.x,s[8]=Ut.x,s[1]=Sn.y,s[5]=Ss.y,s[9]=Ut.y,s[2]=Sn.z,s[6]=Ss.z,s[10]=Ut.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,o=this.elements,r=n[0],a=n[4],c=n[8],l=n[12],u=n[1],h=n[5],p=n[9],d=n[13],g=n[2],_=n[6],m=n[10],f=n[14],E=n[3],w=n[7],v=n[11],A=n[15],T=s[0],R=s[4],P=s[8],M=s[12],x=s[1],L=s[5],N=s[9],H=s[13],k=s[2],X=s[6],W=s[10],te=s[14],V=s[3],re=s[7],he=s[11],Ee=s[15];return o[0]=r*T+a*x+c*k+l*V,o[4]=r*R+a*L+c*X+l*re,o[8]=r*P+a*N+c*W+l*he,o[12]=r*M+a*H+c*te+l*Ee,o[1]=u*T+h*x+p*k+d*V,o[5]=u*R+h*L+p*X+d*re,o[9]=u*P+h*N+p*W+d*he,o[13]=u*M+h*H+p*te+d*Ee,o[2]=g*T+_*x+m*k+f*V,o[6]=g*R+_*L+m*X+f*re,o[10]=g*P+_*N+m*W+f*he,o[14]=g*M+_*H+m*te+f*Ee,o[3]=E*T+w*x+v*k+A*V,o[7]=E*R+w*L+v*X+A*re,o[11]=E*P+w*N+v*W+A*he,o[15]=E*M+w*H+v*te+A*Ee,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],o=e[12],r=e[1],a=e[5],c=e[9],l=e[13],u=e[2],h=e[6],p=e[10],d=e[14],g=e[3],_=e[7],m=e[11],f=e[15];return g*(+o*c*h-s*l*h-o*a*p+n*l*p+s*a*d-n*c*d)+_*(+t*c*d-t*l*p+o*r*p-s*r*d+s*l*u-o*c*u)+m*(+t*l*h-t*a*d-o*r*h+n*r*d+o*a*u-n*l*u)+f*(-s*a*u-t*c*h+t*a*p+s*r*h-n*r*p+n*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],o=e[3],r=e[4],a=e[5],c=e[6],l=e[7],u=e[8],h=e[9],p=e[10],d=e[11],g=e[12],_=e[13],m=e[14],f=e[15],E=h*m*l-_*p*l+_*c*d-a*m*d-h*c*f+a*p*f,w=g*p*l-u*m*l-g*c*d+r*m*d+u*c*f-r*p*f,v=u*_*l-g*h*l+g*a*d-r*_*d-u*a*f+r*h*f,A=g*h*c-u*_*c-g*a*p+r*_*p+u*a*m-r*h*m,T=t*E+n*w+s*v+o*A;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/T;return e[0]=E*R,e[1]=(_*p*o-h*m*o-_*s*d+n*m*d+h*s*f-n*p*f)*R,e[2]=(a*m*o-_*c*o+_*s*l-n*m*l-a*s*f+n*c*f)*R,e[3]=(h*c*o-a*p*o-h*s*l+n*p*l+a*s*d-n*c*d)*R,e[4]=w*R,e[5]=(u*m*o-g*p*o+g*s*d-t*m*d-u*s*f+t*p*f)*R,e[6]=(g*c*o-r*m*o-g*s*l+t*m*l+r*s*f-t*c*f)*R,e[7]=(r*p*o-u*c*o+u*s*l-t*p*l-r*s*d+t*c*d)*R,e[8]=v*R,e[9]=(g*h*o-u*_*o-g*n*d+t*_*d+u*n*f-t*h*f)*R,e[10]=(r*_*o-g*a*o+g*n*l-t*_*l-r*n*f+t*a*f)*R,e[11]=(u*a*o-r*h*o-u*n*l+t*h*l+r*n*d-t*a*d)*R,e[12]=A*R,e[13]=(u*_*s-g*h*s+g*n*p-t*_*p-u*n*m+t*h*m)*R,e[14]=(g*a*s-r*_*s-g*n*c+t*_*c+r*n*m-t*a*m)*R,e[15]=(r*h*s-u*a*s+u*n*c-t*h*c-r*n*p+t*a*p)*R,this}scale(e){const t=this.elements,n=e.x,s=e.y,o=e.z;return t[0]*=n,t[4]*=s,t[8]*=o,t[1]*=n,t[5]*=s,t[9]*=o,t[2]*=n,t[6]*=s,t[10]*=o,t[3]*=n,t[7]*=s,t[11]*=o,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),o=1-n,r=e.x,a=e.y,c=e.z,l=o*r,u=o*a;return this.set(l*r+n,l*a-s*c,l*c+s*a,0,l*a+s*c,u*a+n,u*c-s*r,0,l*c-s*a,u*c+s*r,o*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,o,r){return this.set(1,n,o,0,e,1,r,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,o=t._x,r=t._y,a=t._z,c=t._w,l=o+o,u=r+r,h=a+a,p=o*l,d=o*u,g=o*h,_=r*u,m=r*h,f=a*h,E=c*l,w=c*u,v=c*h,A=n.x,T=n.y,R=n.z;return s[0]=(1-(_+f))*A,s[1]=(d+v)*A,s[2]=(g-w)*A,s[3]=0,s[4]=(d-v)*T,s[5]=(1-(p+f))*T,s[6]=(m+E)*T,s[7]=0,s[8]=(g+w)*R,s[9]=(m-E)*R,s[10]=(1-(p+_))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let o=ri.set(s[0],s[1],s[2]).length();const r=ri.set(s[4],s[5],s[6]).length(),a=ri.set(s[8],s[9],s[10]).length();this.determinant()<0&&(o=-o),e.x=s[12],e.y=s[13],e.z=s[14],Xt.copy(this);const l=1/o,u=1/r,h=1/a;return Xt.elements[0]*=l,Xt.elements[1]*=l,Xt.elements[2]*=l,Xt.elements[4]*=u,Xt.elements[5]*=u,Xt.elements[6]*=u,Xt.elements[8]*=h,Xt.elements[9]*=h,Xt.elements[10]*=h,t.setFromRotationMatrix(Xt),n.x=o,n.y=r,n.z=a,this}makePerspective(e,t,n,s,o,r,a=sn,c=!1){const l=this.elements,u=2*o/(t-e),h=2*o/(n-s),p=(t+e)/(t-e),d=(n+s)/(n-s);let g,_;if(c)g=o/(r-o),_=r*o/(r-o);else if(a===sn)g=-(r+o)/(r-o),_=-2*r*o/(r-o);else if(a===co)g=-r/(r-o),_=-r*o/(r-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=p,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,o,r,a=sn,c=!1){const l=this.elements,u=2/(t-e),h=2/(n-s),p=-(t+e)/(t-e),d=-(n+s)/(n-s);let g,_;if(c)g=1/(r-o),_=r/(r-o);else if(a===sn)g=-2/(r-o),_=-(r+o)/(r-o);else if(a===co)g=-1/(r-o),_=-o/(r-o);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=p,l[1]=0,l[5]=h,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const ri=new z,Xt=new We,cu=new z(0,0,0),lu=new z(1,1,1),Sn=new z,Ss=new z,Ut=new z,Xa=new We,qa=new An;class Kt{constructor(e=0,t=0,n=0,s=Kt.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,o=s[0],r=s[4],a=s[8],c=s[1],l=s[5],u=s[9],h=s[2],p=s[6],d=s[10];switch(t){case"XYZ":this._y=Math.asin(Fe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-r,o)):(this._x=Math.atan2(p,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Fe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,o),this._z=0);break;case"ZXY":this._x=Math.asin(Fe(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-r,l)):(this._y=0,this._z=Math.atan2(c,o));break;case"ZYX":this._y=Math.asin(-Fe(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(p,d),this._z=Math.atan2(c,o)):(this._x=0,this._z=Math.atan2(-r,l));break;case"YZX":this._z=Math.asin(Fe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,o)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Fe(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(p,l),this._y=Math.atan2(a,o)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Xa.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Xa,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return qa.setFromEuler(this),this.setFromQuaternion(qa,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Kt.DEFAULT_ORDER="XYZ";class _a{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let hu=0;const Ya=new z,ai=new An,pn=new We,ws=new z,Oi=new z,uu=new z,pu=new An,Za=new z(1,0,0),Ja=new z(0,1,0),Ka=new z(0,0,1),ja={type:"added"},du={type:"removed"},ci={type:"childadded",child:null},Do={type:"childremoved",child:null};class ft extends Jn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:hu++}),this.uuid=on(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ft.DEFAULT_UP.clone();const e=new z,t=new Kt,n=new An,s=new z(1,1,1);function o(){n.setFromEuler(t,!1)}function r(){t.setFromQuaternion(n,void 0,!1)}t._onChange(o),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new We},normalMatrix:{value:new Ne}}),this.matrix=new We,this.matrixWorld=new We,this.matrixAutoUpdate=ft.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new _a,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ai.setFromAxisAngle(e,t),this.quaternion.multiply(ai),this}rotateOnWorldAxis(e,t){return ai.setFromAxisAngle(e,t),this.quaternion.premultiply(ai),this}rotateX(e){return this.rotateOnAxis(Za,e)}rotateY(e){return this.rotateOnAxis(Ja,e)}rotateZ(e){return this.rotateOnAxis(Ka,e)}translateOnAxis(e,t){return Ya.copy(e).applyQuaternion(this.quaternion),this.position.add(Ya.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Za,e)}translateY(e){return this.translateOnAxis(Ja,e)}translateZ(e){return this.translateOnAxis(Ka,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(pn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ws.copy(e):ws.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Oi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pn.lookAt(Oi,ws,this.up):pn.lookAt(ws,Oi,this.up),this.quaternion.setFromRotationMatrix(pn),s&&(pn.extractRotation(s.matrixWorld),ai.setFromRotationMatrix(pn),this.quaternion.premultiply(ai.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ja),ci.child=e,this.dispatchEvent(ci),ci.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(du),Do.child=e,this.dispatchEvent(Do),Do.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),pn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),pn.multiply(e.parent.matrixWorld)),e.applyMatrix4(pn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ja),ci.child=e,this.dispatchEvent(ci),ci.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let o=0,r=s.length;o<r;o++)s[o].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Oi,e,uu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Oi,pu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let o=0,r=s.length;o<r;o++)s[o].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function o(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=o(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];o(e.shapes,h)}else o(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(o(e.materials,this.material[c]));s.material=a}else s.material=o(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(o(e.animations,c))}}if(t){const a=r(e.geometries),c=r(e.materials),l=r(e.textures),u=r(e.images),h=r(e.shapes),p=r(e.skeletons),d=r(e.animations),g=r(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),p.length>0&&(n.skeletons=p),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function r(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}ft.DEFAULT_UP=new z(0,1,0);ft.DEFAULT_MATRIX_AUTO_UPDATE=!0;ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const qt=new z,dn=new z,Io=new z,fn=new z,li=new z,hi=new z,Qa=new z,Uo=new z,No=new z,Fo=new z,Oo=new Qe,Bo=new Qe,Ho=new Qe;class Ft{constructor(e=new z,t=new z,n=new z){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),qt.subVectors(e,t),s.cross(qt);const o=s.lengthSq();return o>0?s.multiplyScalar(1/Math.sqrt(o)):s.set(0,0,0)}static getBarycoord(e,t,n,s,o){qt.subVectors(s,t),dn.subVectors(n,t),Io.subVectors(e,t);const r=qt.dot(qt),a=qt.dot(dn),c=qt.dot(Io),l=dn.dot(dn),u=dn.dot(Io),h=r*l-a*a;if(h===0)return o.set(0,0,0),null;const p=1/h,d=(l*c-a*u)*p,g=(r*u-a*c)*p;return o.set(1-d-g,g,d)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,fn)===null?!1:fn.x>=0&&fn.y>=0&&fn.x+fn.y<=1}static getInterpolation(e,t,n,s,o,r,a,c){return this.getBarycoord(e,t,n,s,fn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(o,fn.x),c.addScaledVector(r,fn.y),c.addScaledVector(a,fn.z),c)}static getInterpolatedAttribute(e,t,n,s,o,r){return Oo.setScalar(0),Bo.setScalar(0),Ho.setScalar(0),Oo.fromBufferAttribute(e,t),Bo.fromBufferAttribute(e,n),Ho.fromBufferAttribute(e,s),r.setScalar(0),r.addScaledVector(Oo,o.x),r.addScaledVector(Bo,o.y),r.addScaledVector(Ho,o.z),r}static isFrontFacing(e,t,n,s){return qt.subVectors(n,t),dn.subVectors(e,t),qt.cross(dn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return qt.subVectors(this.c,this.b),dn.subVectors(this.a,this.b),qt.cross(dn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ft.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Ft.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,o){return Ft.getInterpolation(e,this.a,this.b,this.c,t,n,s,o)}containsPoint(e){return Ft.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ft.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,o=this.c;let r,a;li.subVectors(s,n),hi.subVectors(o,n),Uo.subVectors(e,n);const c=li.dot(Uo),l=hi.dot(Uo);if(c<=0&&l<=0)return t.copy(n);No.subVectors(e,s);const u=li.dot(No),h=hi.dot(No);if(u>=0&&h<=u)return t.copy(s);const p=c*h-u*l;if(p<=0&&c>=0&&u<=0)return r=c/(c-u),t.copy(n).addScaledVector(li,r);Fo.subVectors(e,o);const d=li.dot(Fo),g=hi.dot(Fo);if(g>=0&&d<=g)return t.copy(o);const _=d*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(hi,a);const m=u*g-d*h;if(m<=0&&h-u>=0&&d-g>=0)return Qa.subVectors(o,s),a=(h-u)/(h-u+(d-g)),t.copy(s).addScaledVector(Qa,a);const f=1/(m+_+p);return r=_*f,a=p*f,t.copy(n).addScaledVector(li,r).addScaledVector(hi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const pl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},wn={h:0,s:0,l:0},Es={h:0,s:0,l:0};function Vo(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class be{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ut){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Xe.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=Xe.workingColorSpace){return this.r=e,this.g=t,this.b=n,Xe.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=Xe.workingColorSpace){if(e=ma(e,1),t=Fe(t,0,1),n=Fe(n,0,1),t===0)this.r=this.g=this.b=n;else{const o=n<=.5?n*(1+t):n+t-n*t,r=2*n-o;this.r=Vo(r,o,e+1/3),this.g=Vo(r,o,e),this.b=Vo(r,o,e-1/3)}return Xe.colorSpaceToWorking(this,s),this}setStyle(e,t=ut){function n(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let o;const r=s[1],a=s[2];switch(r){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,t);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,t);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const o=s[1],r=o.length;if(r===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,t);if(r===6)return this.setHex(parseInt(o,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ut){const n=pl[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=gn(e.r),this.g=gn(e.g),this.b=gn(e.b),this}copyLinearToSRGB(e){return this.r=Ti(e.r),this.g=Ti(e.g),this.b=Ti(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ut){return Xe.workingToColorSpace(Et.copy(this),e),Math.round(Fe(Et.r*255,0,255))*65536+Math.round(Fe(Et.g*255,0,255))*256+Math.round(Fe(Et.b*255,0,255))}getHexString(e=ut){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Xe.workingColorSpace){Xe.workingToColorSpace(Et.copy(this),t);const n=Et.r,s=Et.g,o=Et.b,r=Math.max(n,s,o),a=Math.min(n,s,o);let c,l;const u=(a+r)/2;if(a===r)c=0,l=0;else{const h=r-a;switch(l=u<=.5?h/(r+a):h/(2-r-a),r){case n:c=(s-o)/h+(s<o?6:0);break;case s:c=(o-n)/h+2;break;case o:c=(n-s)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=Xe.workingColorSpace){return Xe.workingToColorSpace(Et.copy(this),t),e.r=Et.r,e.g=Et.g,e.b=Et.b,e}getStyle(e=ut){Xe.workingToColorSpace(Et.copy(this),e);const t=Et.r,n=Et.g,s=Et.b;return e!==ut?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(wn),this.setHSL(wn.h+e,wn.s+t,wn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(wn),e.getHSL(Es);const n=Ki(wn.h,Es.h,t),s=Ki(wn.s,Es.s,t),o=Ki(wn.l,Es.l,t);return this.setHSL(n,s,o),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,o=e.elements;return this.r=o[0]*t+o[3]*n+o[6]*s,this.g=o[1]*t+o[4]*n+o[7]*s,this.b=o[2]*t+o[5]*n+o[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Et=new be;be.NAMES=pl;let fu=0;class vn extends Jn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:fu++}),this.uuid=on(),this.name="",this.type="Material",this.blending=Ei,this.side=zn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=dr,this.blendDst=fr,this.blendEquation=kn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new be(0,0,0),this.blendAlpha=0,this.depthFunc=zi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ba,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ti,this.stencilZFail=ti,this.stencilZPass=ti,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ei&&(n.blending=this.blending),this.side!==zn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==dr&&(n.blendSrc=this.blendSrc),this.blendDst!==fr&&(n.blendDst=this.blendDst),this.blendEquation!==kn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==zi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ba&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ti&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ti&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ti&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(o){const r=[];for(const a in o){const c=o[a];delete c.metadata,r.push(c)}return r}if(t){const o=s(e.textures),r=s(e.images);o.length>0&&(n.textures=o),r.length>0&&(n.images=r)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let o=0;o!==s;++o)n[o]=t[o].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Rn extends vn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Kt,this.combine=ra,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const mt=new z,bs=new oe;let mu=0;class Bt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:mu++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Qr,this.updateRanges=[],this.gpuType=nn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,o=this.itemSize;s<o;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)bs.fromBufferAttribute(this,t),bs.applyMatrix3(e),this.setXY(t,bs.x,bs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyMatrix3(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyMatrix4(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyNormalMatrix(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.transformDirection(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Yt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ze(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Yt(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ze(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Yt(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ze(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Yt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ze(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Yt(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ze(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ze(t,this.array),n=Ze(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Ze(t,this.array),n=Ze(n,this.array),s=Ze(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,o){return e*=this.itemSize,this.normalized&&(t=Ze(t,this.array),n=Ze(n,this.array),s=Ze(s,this.array),o=Ze(o,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=o,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Qr&&(e.usage=this.usage),e}}class dl extends Bt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class fl extends Bt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class He extends Bt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let gu=0;const Gt=new We,ko=new ft,ui=new z,Nt=new Kn,Bi=new Kn,xt=new z;class pt extends Jn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:gu++}),this.uuid=on(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(hl(e)?fl:dl)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const o=new Ne().getNormalMatrix(e);n.applyNormalMatrix(o),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Gt.makeRotationFromQuaternion(e),this.applyMatrix4(Gt),this}rotateX(e){return Gt.makeRotationX(e),this.applyMatrix4(Gt),this}rotateY(e){return Gt.makeRotationY(e),this.applyMatrix4(Gt),this}rotateZ(e){return Gt.makeRotationZ(e),this.applyMatrix4(Gt),this}translate(e,t,n){return Gt.makeTranslation(e,t,n),this.applyMatrix4(Gt),this}scale(e,t,n){return Gt.makeScale(e,t,n),this.applyMatrix4(Gt),this}lookAt(e){return ko.lookAt(e),ko.updateMatrix(),this.applyMatrix4(ko.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ui).negate(),this.translate(ui.x,ui.y,ui.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,o=e.length;s<o;s++){const r=e[s];n.push(r.x,r.y,r.z||0)}this.setAttribute("position",new He(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const o=e[s];t.setXYZ(s,o.x,o.y,o.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Kn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const o=t[n];Nt.setFromBufferAttribute(o),this.morphTargetsRelative?(xt.addVectors(this.boundingBox.min,Nt.min),this.boundingBox.expandByPoint(xt),xt.addVectors(this.boundingBox.max,Nt.max),this.boundingBox.expandByPoint(xt)):(this.boundingBox.expandByPoint(Nt.min),this.boundingBox.expandByPoint(Nt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new jn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(e){const n=this.boundingSphere.center;if(Nt.setFromBufferAttribute(e),t)for(let o=0,r=t.length;o<r;o++){const a=t[o];Bi.setFromBufferAttribute(a),this.morphTargetsRelative?(xt.addVectors(Nt.min,Bi.min),Nt.expandByPoint(xt),xt.addVectors(Nt.max,Bi.max),Nt.expandByPoint(xt)):(Nt.expandByPoint(Bi.min),Nt.expandByPoint(Bi.max))}Nt.getCenter(n);let s=0;for(let o=0,r=e.count;o<r;o++)xt.fromBufferAttribute(e,o),s=Math.max(s,n.distanceToSquared(xt));if(t)for(let o=0,r=t.length;o<r;o++){const a=t[o],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)xt.fromBufferAttribute(a,l),c&&(ui.fromBufferAttribute(e,l),xt.add(ui)),s=Math.max(s,n.distanceToSquared(xt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,o=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Bt(new Float32Array(4*n.count),4));const r=this.getAttribute("tangent"),a=[],c=[];for(let P=0;P<n.count;P++)a[P]=new z,c[P]=new z;const l=new z,u=new z,h=new z,p=new oe,d=new oe,g=new oe,_=new z,m=new z;function f(P,M,x){l.fromBufferAttribute(n,P),u.fromBufferAttribute(n,M),h.fromBufferAttribute(n,x),p.fromBufferAttribute(o,P),d.fromBufferAttribute(o,M),g.fromBufferAttribute(o,x),u.sub(l),h.sub(l),d.sub(p),g.sub(p);const L=1/(d.x*g.y-g.x*d.y);isFinite(L)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(h,-d.y).multiplyScalar(L),m.copy(h).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(L),a[P].add(_),a[M].add(_),a[x].add(_),c[P].add(m),c[M].add(m),c[x].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let P=0,M=E.length;P<M;++P){const x=E[P],L=x.start,N=x.count;for(let H=L,k=L+N;H<k;H+=3)f(e.getX(H+0),e.getX(H+1),e.getX(H+2))}const w=new z,v=new z,A=new z,T=new z;function R(P){A.fromBufferAttribute(s,P),T.copy(A);const M=a[P];w.copy(M),w.sub(A.multiplyScalar(A.dot(M))).normalize(),v.crossVectors(T,M);const L=v.dot(c[P])<0?-1:1;r.setXYZW(P,w.x,w.y,w.z,L)}for(let P=0,M=E.length;P<M;++P){const x=E[P],L=x.start,N=x.count;for(let H=L,k=L+N;H<k;H+=3)R(e.getX(H+0)),R(e.getX(H+1)),R(e.getX(H+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Bt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let p=0,d=n.count;p<d;p++)n.setXYZ(p,0,0,0);const s=new z,o=new z,r=new z,a=new z,c=new z,l=new z,u=new z,h=new z;if(e)for(let p=0,d=e.count;p<d;p+=3){const g=e.getX(p+0),_=e.getX(p+1),m=e.getX(p+2);s.fromBufferAttribute(t,g),o.fromBufferAttribute(t,_),r.fromBufferAttribute(t,m),u.subVectors(r,o),h.subVectors(s,o),u.cross(h),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(u),c.add(u),l.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let p=0,d=t.count;p<d;p+=3)s.fromBufferAttribute(t,p+0),o.fromBufferAttribute(t,p+1),r.fromBufferAttribute(t,p+2),u.subVectors(r,o),h.subVectors(s,o),u.cross(h),n.setXYZ(p+0,u.x,u.y,u.z),n.setXYZ(p+1,u.x,u.y,u.z),n.setXYZ(p+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)xt.fromBufferAttribute(e,t),xt.normalize(),e.setXYZ(t,xt.x,xt.y,xt.z)}toNonIndexed(){function e(a,c){const l=a.array,u=a.itemSize,h=a.normalized,p=new l.constructor(c.length*u);let d=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?d=c[_]*a.data.stride+a.offset:d=c[_]*u;for(let f=0;f<u;f++)p[g++]=l[d++]}return new Bt(p,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new pt,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=e(c,n);t.setAttribute(a,l)}const o=this.morphAttributes;for(const a in o){const c=[],l=o[a];for(let u=0,h=l.length;u<h;u++){const p=l[u],d=e(p,n);c.push(d)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let a=0,c=r.length;a<c;a++){const l=r[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let o=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,p=l.length;h<p;h++){const d=l[h];u.push(d.toJSON(e.data))}u.length>0&&(s[c]=u,o=!0)}o&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(t))}const o=e.morphAttributes;for(const l in o){const u=[],h=o[l];for(let p=0,d=h.length;p<d;p++)u.push(h[p].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const r=e.groups;for(let l=0,u=r.length;l<u;l++){const h=r[l];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ec=new We,Nn=new fo,Ts=new jn,tc=new z,As=new z,zs=new z,Rs=new z,Go=new z,Cs=new z,nc=new z,Ps=new z;class we extends ft{constructor(e=new pt,t=new Rn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,r=s.length;o<r;o++){const a=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,o=n.morphAttributes.position,r=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(o&&a){Cs.set(0,0,0);for(let c=0,l=o.length;c<l;c++){const u=a[c],h=o[c];u!==0&&(Go.fromBufferAttribute(h,e),r?Cs.addScaledVector(Go,u):Cs.addScaledVector(Go.sub(t),u))}t.add(Cs)}return t}raycast(e,t){const n=this.geometry,s=this.material,o=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ts.copy(n.boundingSphere),Ts.applyMatrix4(o),Nn.copy(e.ray).recast(e.near),!(Ts.containsPoint(Nn.origin)===!1&&(Nn.intersectSphere(Ts,tc)===null||Nn.origin.distanceToSquared(tc)>(e.far-e.near)**2))&&(ec.copy(o).invert(),Nn.copy(e.ray).applyMatrix4(ec),!(n.boundingBox!==null&&Nn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Nn)))}_computeIntersections(e,t,n){let s;const o=this.geometry,r=this.material,a=o.index,c=o.attributes.position,l=o.attributes.uv,u=o.attributes.uv1,h=o.attributes.normal,p=o.groups,d=o.drawRange;if(a!==null)if(Array.isArray(r))for(let g=0,_=p.length;g<_;g++){const m=p[g],f=r[m.materialIndex],E=Math.max(m.start,d.start),w=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let v=E,A=w;v<A;v+=3){const T=a.getX(v),R=a.getX(v+1),P=a.getX(v+2);s=Ls(this,f,e,n,l,u,h,T,R,P),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let m=g,f=_;m<f;m+=3){const E=a.getX(m),w=a.getX(m+1),v=a.getX(m+2);s=Ls(this,r,e,n,l,u,h,E,w,v),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(r))for(let g=0,_=p.length;g<_;g++){const m=p[g],f=r[m.materialIndex],E=Math.max(m.start,d.start),w=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let v=E,A=w;v<A;v+=3){const T=v,R=v+1,P=v+2;s=Ls(this,f,e,n,l,u,h,T,R,P),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let m=g,f=_;m<f;m+=3){const E=m,w=m+1,v=m+2;s=Ls(this,r,e,n,l,u,h,E,w,v),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function _u(i,e,t,n,s,o,r,a){let c;if(e.side===Ct?c=n.intersectTriangle(r,o,s,!0,a):c=n.intersectTriangle(s,o,r,e.side===zn,a),c===null)return null;Ps.copy(a),Ps.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Ps);return l<t.near||l>t.far?null:{distance:l,point:Ps.clone(),object:i}}function Ls(i,e,t,n,s,o,r,a,c,l){i.getVertexPosition(a,As),i.getVertexPosition(c,zs),i.getVertexPosition(l,Rs);const u=_u(i,e,t,n,As,zs,Rs,nc);if(u){const h=new z;Ft.getBarycoord(nc,As,zs,Rs,h),s&&(u.uv=Ft.getInterpolatedAttribute(s,a,c,l,h,new oe)),o&&(u.uv1=Ft.getInterpolatedAttribute(o,a,c,l,h,new oe)),r&&(u.normal=Ft.getInterpolatedAttribute(r,a,c,l,h,new z),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const p={a,b:c,c:l,normal:new z,materialIndex:0};Ft.getNormal(As,zs,Rs,p.normal),u.face=p,u.barycoord=h}return u}class gt extends pt{constructor(e=1,t=1,n=1,s=1,o=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:o,depthSegments:r};const a=this;s=Math.floor(s),o=Math.floor(o),r=Math.floor(r);const c=[],l=[],u=[],h=[];let p=0,d=0;g("z","y","x",-1,-1,n,t,e,r,o,0),g("z","y","x",1,-1,n,t,-e,r,o,1),g("x","z","y",1,1,e,n,t,s,r,2),g("x","z","y",1,-1,e,n,-t,s,r,3),g("x","y","z",1,-1,e,t,n,s,o,4),g("x","y","z",-1,-1,e,t,-n,s,o,5),this.setIndex(c),this.setAttribute("position",new He(l,3)),this.setAttribute("normal",new He(u,3)),this.setAttribute("uv",new He(h,2));function g(_,m,f,E,w,v,A,T,R,P,M){const x=v/R,L=A/P,N=v/2,H=A/2,k=T/2,X=R+1,W=P+1;let te=0,V=0;const re=new z;for(let he=0;he<W;he++){const Ee=he*L-H;for(let Ve=0;Ve<X;Ve++){const tt=Ve*x-N;re[_]=tt*E,re[m]=Ee*w,re[f]=k,l.push(re.x,re.y,re.z),re[_]=0,re[m]=0,re[f]=T>0?1:-1,u.push(re.x,re.y,re.z),h.push(Ve/R),h.push(1-he/P),te+=1}}for(let he=0;he<P;he++)for(let Ee=0;Ee<R;Ee++){const Ve=p+Ee+X*he,tt=p+Ee+X*(he+1),st=p+(Ee+1)+X*(he+1),qe=p+(Ee+1)+X*he;c.push(Ve,tt,qe),c.push(tt,st,qe),V+=6}a.addGroup(d,V,M),d+=V,p+=te}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Li(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Rt(i){const e={};for(let t=0;t<i.length;t++){const n=Li(i[t]);for(const s in n)e[s]=n[s]}return e}function vu(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function ml(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Xe.workingColorSpace}const yu={clone:Li,merge:Rt};var xu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Mu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ht extends vn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=xu,this.fragmentShader=Mu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Li(e.uniforms),this.uniformsGroups=vu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const r=this.uniforms[s].value;r&&r.isTexture?t.uniforms[s]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[s]={type:"c",value:r.getHex()}:r&&r.isVector2?t.uniforms[s]={type:"v2",value:r.toArray()}:r&&r.isVector3?t.uniforms[s]={type:"v3",value:r.toArray()}:r&&r.isVector4?t.uniforms[s]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?t.uniforms[s]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?t.uniforms[s]={type:"m4",value:r.toArray()}:t.uniforms[s]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class gl extends ft{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new We,this.projectionMatrix=new We,this.projectionMatrixInverse=new We,this.coordinateSystem=sn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const En=new z,ic=new oe,sc=new oe;class Wt extends gl{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=os*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(bi*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return os*2*Math.atan(Math.tan(bi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){En.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(En.x,En.y).multiplyScalar(-e/En.z),En.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(En.x,En.y).multiplyScalar(-e/En.z)}getViewSize(e,t){return this.getViewBounds(e,ic,sc),t.subVectors(sc,ic)}setViewOffset(e,t,n,s,o,r){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=o,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(bi*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,o=-.5*s;const r=this.view;if(this.view!==null&&this.view.enabled){const c=r.fullWidth,l=r.fullHeight;o+=r.offsetX*s/c,t-=r.offsetY*n/l,s*=r.width/c,n*=r.height/l}const a=this.filmOffset;a!==0&&(o+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const pi=-90,di=1;class Su extends ft{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Wt(pi,di,e,t);s.layers=this.layers,this.add(s);const o=new Wt(pi,di,e,t);o.layers=this.layers,this.add(o);const r=new Wt(pi,di,e,t);r.layers=this.layers,this.add(r);const a=new Wt(pi,di,e,t);a.layers=this.layers,this.add(a);const c=new Wt(pi,di,e,t);c.layers=this.layers,this.add(c);const l=new Wt(pi,di,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,o,r,a,c]=t;for(const l of t)this.remove(l);if(e===sn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===co)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[o,r,a,c,l,u]=this.children,h=e.getRenderTarget(),p=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,o),e.setRenderTarget(n,1,s),e.render(t,r),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,u),e.setRenderTarget(h,p,d),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class _l extends Mt{constructor(e=[],t=Ri,n,s,o,r,a,c,l,u){super(e,t,n,s,o,r,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class wu extends Yn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new _l(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new gt(5,5,5),o=new Ht({name:"CubemapFromEquirect",uniforms:Li(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ct,blending:bn});o.uniforms.tEquirect.value=t;const r=new we(s,o),a=t.minFilter;return t.minFilter===$n&&(t.minFilter=tn),new Su(1,10,this).update(e,r),t.minFilter=a,r.geometry.dispose(),r.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const o=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(t,n,s);e.setRenderTarget(o)}}class Tt extends ft{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Eu={type:"move"};class Wo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Tt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Tt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Tt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,o=null,r=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){r=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),f=this._getHandJoint(l,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],p=u.position.distanceTo(h.position),d=.02,g=.005;l.inputState.pinching&&p>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&p<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(o=t.getPose(e.gripSpace,n),o!==null&&(c.matrix.fromArray(o.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,o.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(o.linearVelocity)):c.hasLinearVelocity=!1,o.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(o.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&o!==null&&(s=o),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Eu)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=o!==null),l!==null&&(l.visible=r!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Tt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class vl{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new be(e),this.near=t,this.far=n}clone(){return new vl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class bu extends ft{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Kt,this.environmentIntensity=1,this.environmentRotation=new Kt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Tu{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Qr,this.updateRanges=[],this.version=0,this.uuid=on()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,o=this.stride;s<o;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=on()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=on()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const zt=new z;class lo{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyMatrix4(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyNormalMatrix(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.transformDirection(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Yt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ze(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Ze(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Ze(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Ze(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Ze(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Yt(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Yt(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Yt(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Yt(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ze(t,this.array),n=Ze(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ze(t,this.array),n=Ze(n,this.array),s=Ze(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,o){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ze(t,this.array),n=Ze(n,this.array),s=Ze(s,this.array),o=Ze(o,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=o,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)t.push(this.data.array[s+o])}return new Bt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new lo(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)t.push(this.data.array[s+o])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class va extends vn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new be(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let fi;const Hi=new z,mi=new z,gi=new z,_i=new oe,Vi=new oe,yl=new We,Ds=new z,ki=new z,Is=new z,oc=new oe,$o=new oe,rc=new oe;class xl extends ft{constructor(e=new va){if(super(),this.isSprite=!0,this.type="Sprite",fi===void 0){fi=new pt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Tu(t,5);fi.setIndex([0,1,2,0,2,3]),fi.setAttribute("position",new lo(n,3,0,!1)),fi.setAttribute("uv",new lo(n,2,3,!1))}this.geometry=fi,this.material=e,this.center=new oe(.5,.5),this.count=1}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),mi.setFromMatrixScale(this.matrixWorld),yl.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),gi.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&mi.multiplyScalar(-gi.z);const n=this.material.rotation;let s,o;n!==0&&(o=Math.cos(n),s=Math.sin(n));const r=this.center;Us(Ds.set(-.5,-.5,0),gi,r,mi,s,o),Us(ki.set(.5,-.5,0),gi,r,mi,s,o),Us(Is.set(.5,.5,0),gi,r,mi,s,o),oc.set(0,0),$o.set(1,0),rc.set(1,1);let a=e.ray.intersectTriangle(Ds,ki,Is,!1,Hi);if(a===null&&(Us(ki.set(-.5,.5,0),gi,r,mi,s,o),$o.set(0,1),a=e.ray.intersectTriangle(Ds,Is,ki,!1,Hi),a===null))return;const c=e.ray.origin.distanceTo(Hi);c<e.near||c>e.far||t.push({distance:c,point:Hi.clone(),uv:Ft.getInterpolation(Hi,Ds,ki,Is,oc,$o,rc,new oe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Us(i,e,t,n,s,o){_i.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(Vi.x=o*_i.x-s*_i.y,Vi.y=s*_i.x+o*_i.y):Vi.copy(_i),i.copy(e),i.x+=Vi.x,i.y+=Vi.y,i.applyMatrix4(yl)}class Au extends Mt{constructor(e=null,t=1,n=1,s,o,r,a,c,l=Ot,u=Ot,h,p){super(null,r,a,c,l,u,s,o,h,p),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ac extends Bt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const vi=new We,cc=new We,Ns=[],lc=new Kn,zu=new We,Gi=new we,Wi=new jn;class Ru extends we{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ac(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,zu)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Kn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,vi),lc.copy(e.boundingBox).applyMatrix4(vi),this.boundingBox.union(lc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new jn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,vi),Wi.copy(e.boundingSphere).applyMatrix4(vi),this.boundingSphere.union(Wi)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,o=n.length+1,r=e*o+1;for(let a=0;a<n.length;a++)n[a]=s[r+a]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(Gi.geometry=this.geometry,Gi.material=this.material,Gi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Wi.copy(this.boundingSphere),Wi.applyMatrix4(n),e.ray.intersectsSphere(Wi)!==!1))for(let o=0;o<s;o++){this.getMatrixAt(o,vi),cc.multiplyMatrices(n,vi),Gi.matrixWorld=cc,Gi.raycast(e,Ns);for(let r=0,a=Ns.length;r<a;r++){const c=Ns[r];c.instanceId=o,c.object=this,t.push(c)}Ns.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ac(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Au(new Float32Array(s*this.count),s,this.count,ha,nn));const o=this.morphTexture.source.data.data;let r=0;for(let l=0;l<n.length;l++)r+=n[l];const a=this.geometry.morphTargetsRelative?1:1-r,c=s*e;o[c]=a,o.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Xo=new z,Cu=new z,Pu=new Ne;class Hn{constructor(e=new z(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Xo.subVectors(n,t).cross(Cu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Xo),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/s;return o<0||o>1?null:t.copy(e.start).addScaledVector(n,o)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Pu.getNormalMatrix(e),s=this.coplanarPoint(Xo).applyMatrix4(e),o=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(o),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Fn=new jn,Lu=new oe(.5,.5),Fs=new z;class ya{constructor(e=new Hn,t=new Hn,n=new Hn,s=new Hn,o=new Hn,r=new Hn){this.planes=[e,t,n,s,o,r]}set(e,t,n,s,o,r){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(o),a[5].copy(r),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=sn,n=!1){const s=this.planes,o=e.elements,r=o[0],a=o[1],c=o[2],l=o[3],u=o[4],h=o[5],p=o[6],d=o[7],g=o[8],_=o[9],m=o[10],f=o[11],E=o[12],w=o[13],v=o[14],A=o[15];if(s[0].setComponents(l-r,d-u,f-g,A-E).normalize(),s[1].setComponents(l+r,d+u,f+g,A+E).normalize(),s[2].setComponents(l+a,d+h,f+_,A+w).normalize(),s[3].setComponents(l-a,d-h,f-_,A-w).normalize(),n)s[4].setComponents(c,p,m,v).normalize(),s[5].setComponents(l-c,d-p,f-m,A-v).normalize();else if(s[4].setComponents(l-c,d-p,f-m,A-v).normalize(),t===sn)s[5].setComponents(l+c,d+p,f+m,A+v).normalize();else if(t===co)s[5].setComponents(c,p,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Fn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Fn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Fn)}intersectsSprite(e){Fn.center.set(0,0,0);const t=Lu.distanceTo(e.center);return Fn.radius=.7071067811865476+t,Fn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Fn)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let o=0;o<6;o++)if(t[o].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Fs.x=s.normal.x>0?e.max.x:e.min.x,Fs.y=s.normal.y>0?e.max.y:e.min.y,Fs.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Fs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class mo extends vn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new be(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ho=new z,uo=new z,hc=new We,$i=new fo,Os=new jn,qo=new z,uc=new z;class Du extends ft{constructor(e=new pt,t=new mo){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,o=t.count;s<o;s++)ho.fromBufferAttribute(t,s-1),uo.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=ho.distanceTo(uo);e.setAttribute("lineDistance",new He(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,o=e.params.Line.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Os.copy(n.boundingSphere),Os.applyMatrix4(s),Os.radius+=o,e.ray.intersectsSphere(Os)===!1)return;hc.copy(s).invert(),$i.copy(e.ray).applyMatrix4(hc);const a=o/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=n.index,p=n.attributes.position;if(u!==null){const d=Math.max(0,r.start),g=Math.min(u.count,r.start+r.count);for(let _=d,m=g-1;_<m;_+=l){const f=u.getX(_),E=u.getX(_+1),w=Bs(this,e,$i,c,f,E,_);w&&t.push(w)}if(this.isLineLoop){const _=u.getX(g-1),m=u.getX(d),f=Bs(this,e,$i,c,_,m,g-1);f&&t.push(f)}}else{const d=Math.max(0,r.start),g=Math.min(p.count,r.start+r.count);for(let _=d,m=g-1;_<m;_+=l){const f=Bs(this,e,$i,c,_,_+1,_);f&&t.push(f)}if(this.isLineLoop){const _=Bs(this,e,$i,c,g-1,d,g-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,r=s.length;o<r;o++){const a=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}}function Bs(i,e,t,n,s,o,r){const a=i.geometry.attributes.position;if(ho.fromBufferAttribute(a,s),uo.fromBufferAttribute(a,o),t.distanceSqToSegment(ho,uo,qo,uc)>n)return;qo.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(qo);if(!(l<e.near||l>e.far))return{distance:l,point:uc.clone().applyMatrix4(i.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:i}}const pc=new z,dc=new z;class Ml extends Du{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,o=t.count;s<o;s+=2)pc.fromBufferAttribute(t,s),dc.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+pc.distanceTo(dc);e.setAttribute("lineDistance",new He(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Iu extends vn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new be(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const fc=new We,ea=new fo,Hs=new jn,Vs=new z;class Uu extends ft{constructor(e=new pt,t=new Iu){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,o=e.params.Points.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Hs.copy(n.boundingSphere),Hs.applyMatrix4(s),Hs.radius+=o,e.ray.intersectsSphere(Hs)===!1)return;fc.copy(s).invert(),ea.copy(e.ray).applyMatrix4(fc);const a=o/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,h=n.attributes.position;if(l!==null){const p=Math.max(0,r.start),d=Math.min(l.count,r.start+r.count);for(let g=p,_=d;g<_;g++){const m=l.getX(g);Vs.fromBufferAttribute(h,m),mc(Vs,m,c,s,e,t,this)}}else{const p=Math.max(0,r.start),d=Math.min(h.count,r.start+r.count);for(let g=p,_=d;g<_;g++)Vs.fromBufferAttribute(h,g),mc(Vs,g,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,r=s.length;o<r;o++){const a=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}}function mc(i,e,t,n,s,o,r){const a=ea.distanceSqToPoint(i);if(a<t){const c=new z;ea.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;o.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:r})}}class _n extends Mt{constructor(e,t,n,s,o,r,a,c,l){super(e,t,n,s,o,r,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Sl extends Mt{constructor(e,t,n=qn,s,o,r,a=Ot,c=Ot,l,u=is,h=1){if(u!==is&&u!==ss)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const p={width:e,height:t,depth:h};super(p,s,o,r,a,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ga(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class wl extends Mt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class xa extends pt{constructor(e=1,t=1,n=4,s=8,o=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:s,heightSegments:o},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),s=Math.max(3,Math.floor(s)),o=Math.max(1,Math.floor(o));const r=[],a=[],c=[],l=[],u=t/2,h=Math.PI/2*e,p=t,d=2*h+p,g=n*2+o,_=s+1,m=new z,f=new z;for(let E=0;E<=g;E++){let w=0,v=0,A=0,T=0;if(E<=n){const M=E/n,x=M*Math.PI/2;v=-u-e*Math.cos(x),A=e*Math.sin(x),T=-e*Math.cos(x),w=M*h}else if(E<=n+o){const M=(E-n)/o;v=-u+M*t,A=e,T=0,w=h+M*p}else{const M=(E-n-o)/n,x=M*Math.PI/2;v=u+e*Math.sin(x),A=e*Math.cos(x),T=e*Math.sin(x),w=h+p+M*h}const R=Math.max(0,Math.min(1,w/d));let P=0;E===0?P=.5/s:E===g&&(P=-.5/s);for(let M=0;M<=s;M++){const x=M/s,L=x*Math.PI*2,N=Math.sin(L),H=Math.cos(L);f.x=-A*H,f.y=v,f.z=A*N,a.push(f.x,f.y,f.z),m.set(-A*H,T,A*N),m.normalize(),c.push(m.x,m.y,m.z),l.push(x+P,R)}if(E>0){const M=(E-1)*_;for(let x=0;x<s;x++){const L=M+x,N=M+x+1,H=E*_+x,k=E*_+x+1;r.push(L,N,H),r.push(N,k,H)}}}this.setIndex(r),this.setAttribute("position",new He(a,3)),this.setAttribute("normal",new He(c,3)),this.setAttribute("uv",new He(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xa(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class Ma extends pt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const o=[],r=[],a=[],c=[],l=new z,u=new oe;r.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let h=0,p=3;h<=t;h++,p+=3){const d=n+h/t*s;l.x=e*Math.cos(d),l.y=e*Math.sin(d),r.push(l.x,l.y,l.z),a.push(0,0,1),u.x=(r[p]/e+1)/2,u.y=(r[p+1]/e+1)/2,c.push(u.x,u.y)}for(let h=1;h<=t;h++)o.push(h,h+1,0);this.setIndex(o),this.setAttribute("position",new He(r,3)),this.setAttribute("normal",new He(a,3)),this.setAttribute("uv",new He(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ma(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Pt extends pt{constructor(e=1,t=1,n=1,s=32,o=1,r=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:o,openEnded:r,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),o=Math.floor(o);const u=[],h=[],p=[],d=[];let g=0;const _=[],m=n/2;let f=0;E(),r===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(u),this.setAttribute("position",new He(h,3)),this.setAttribute("normal",new He(p,3)),this.setAttribute("uv",new He(d,2));function E(){const v=new z,A=new z;let T=0;const R=(t-e)/n;for(let P=0;P<=o;P++){const M=[],x=P/o,L=x*(t-e)+e;for(let N=0;N<=s;N++){const H=N/s,k=H*c+a,X=Math.sin(k),W=Math.cos(k);A.x=L*X,A.y=-x*n+m,A.z=L*W,h.push(A.x,A.y,A.z),v.set(X,R,W).normalize(),p.push(v.x,v.y,v.z),d.push(H,1-x),M.push(g++)}_.push(M)}for(let P=0;P<s;P++)for(let M=0;M<o;M++){const x=_[M][P],L=_[M+1][P],N=_[M+1][P+1],H=_[M][P+1];(e>0||M!==0)&&(u.push(x,L,H),T+=3),(t>0||M!==o-1)&&(u.push(L,N,H),T+=3)}l.addGroup(f,T,0),f+=T}function w(v){const A=g,T=new oe,R=new z;let P=0;const M=v===!0?e:t,x=v===!0?1:-1;for(let N=1;N<=s;N++)h.push(0,m*x,0),p.push(0,x,0),d.push(.5,.5),g++;const L=g;for(let N=0;N<=s;N++){const k=N/s*c+a,X=Math.cos(k),W=Math.sin(k);R.x=M*W,R.y=m*x,R.z=M*X,h.push(R.x,R.y,R.z),p.push(0,x,0),T.x=X*.5+.5,T.y=W*.5*x+.5,d.push(T.x,T.y),g++}for(let N=0;N<s;N++){const H=A+N,k=L+N;v===!0?u.push(k,k+1,H):u.push(k+1,k,H),P+=3}l.addGroup(f,P,v===!0?1:2),f+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class go extends Pt{constructor(e=1,t=1,n=32,s=1,o=!1,r=0,a=Math.PI*2){super(0,e,t,n,s,o,r,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:o,thetaStart:r,thetaLength:a}}static fromJSON(e){return new go(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Sa extends pt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const o=[],r=[];a(s),l(n),u(),this.setAttribute("position",new He(o,3)),this.setAttribute("normal",new He(o.slice(),3)),this.setAttribute("uv",new He(r,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(E){const w=new z,v=new z,A=new z;for(let T=0;T<t.length;T+=3)d(t[T+0],w),d(t[T+1],v),d(t[T+2],A),c(w,v,A,E)}function c(E,w,v,A){const T=A+1,R=[];for(let P=0;P<=T;P++){R[P]=[];const M=E.clone().lerp(v,P/T),x=w.clone().lerp(v,P/T),L=T-P;for(let N=0;N<=L;N++)N===0&&P===T?R[P][N]=M:R[P][N]=M.clone().lerp(x,N/L)}for(let P=0;P<T;P++)for(let M=0;M<2*(T-P)-1;M++){const x=Math.floor(M/2);M%2===0?(p(R[P][x+1]),p(R[P+1][x]),p(R[P][x])):(p(R[P][x+1]),p(R[P+1][x+1]),p(R[P+1][x]))}}function l(E){const w=new z;for(let v=0;v<o.length;v+=3)w.x=o[v+0],w.y=o[v+1],w.z=o[v+2],w.normalize().multiplyScalar(E),o[v+0]=w.x,o[v+1]=w.y,o[v+2]=w.z}function u(){const E=new z;for(let w=0;w<o.length;w+=3){E.x=o[w+0],E.y=o[w+1],E.z=o[w+2];const v=m(E)/2/Math.PI+.5,A=f(E)/Math.PI+.5;r.push(v,1-A)}g(),h()}function h(){for(let E=0;E<r.length;E+=6){const w=r[E+0],v=r[E+2],A=r[E+4],T=Math.max(w,v,A),R=Math.min(w,v,A);T>.9&&R<.1&&(w<.2&&(r[E+0]+=1),v<.2&&(r[E+2]+=1),A<.2&&(r[E+4]+=1))}}function p(E){o.push(E.x,E.y,E.z)}function d(E,w){const v=E*3;w.x=e[v+0],w.y=e[v+1],w.z=e[v+2]}function g(){const E=new z,w=new z,v=new z,A=new z,T=new oe,R=new oe,P=new oe;for(let M=0,x=0;M<o.length;M+=9,x+=6){E.set(o[M+0],o[M+1],o[M+2]),w.set(o[M+3],o[M+4],o[M+5]),v.set(o[M+6],o[M+7],o[M+8]),T.set(r[x+0],r[x+1]),R.set(r[x+2],r[x+3]),P.set(r[x+4],r[x+5]),A.copy(E).add(w).add(v).divideScalar(3);const L=m(A);_(T,x+0,E,L),_(R,x+2,w,L),_(P,x+4,v,L)}}function _(E,w,v,A){A<0&&E.x===1&&(r[w]=E.x-1),v.x===0&&v.z===0&&(r[w]=A/2/Math.PI+.5)}function m(E){return Math.atan2(E.z,-E.x)}function f(E){return Math.atan2(-E.y,Math.sqrt(E.x*E.x+E.z*E.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Sa(e.vertices,e.indices,e.radius,e.details)}}const ks=new z,Gs=new z,Yo=new z,Ws=new Ft;class c3 extends pt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const s=Math.pow(10,4),o=Math.cos(bi*t),r=e.getIndex(),a=e.getAttribute("position"),c=r?r.count:a.count,l=[0,0,0],u=["a","b","c"],h=new Array(3),p={},d=[];for(let g=0;g<c;g+=3){r?(l[0]=r.getX(g),l[1]=r.getX(g+1),l[2]=r.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);const{a:_,b:m,c:f}=Ws;if(_.fromBufferAttribute(a,l[0]),m.fromBufferAttribute(a,l[1]),f.fromBufferAttribute(a,l[2]),Ws.getNormal(Yo),h[0]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,h[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,h[2]=`${Math.round(f.x*s)},${Math.round(f.y*s)},${Math.round(f.z*s)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let E=0;E<3;E++){const w=(E+1)%3,v=h[E],A=h[w],T=Ws[u[E]],R=Ws[u[w]],P=`${v}_${A}`,M=`${A}_${v}`;M in p&&p[M]?(Yo.dot(p[M].normal)<=o&&(d.push(T.x,T.y,T.z),d.push(R.x,R.y,R.z)),p[M]=null):P in p||(p[P]={index0:l[E],index1:l[w],normal:Yo.clone()})}}for(const g in p)if(p[g]){const{index0:_,index1:m}=p[g];ks.fromBufferAttribute(a,_),Gs.fromBufferAttribute(a,m),d.push(ks.x,ks.y,ks.z),d.push(Gs.x,Gs.y,Gs.z)}this.setAttribute("position",new He(d,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class cn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),o=0;t.push(0);for(let r=1;r<=e;r++)n=this.getPoint(r/e),o+=n.distanceTo(s),t.push(o),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let s=0;const o=n.length;let r;t?r=t:r=e*n[o-1];let a=0,c=o-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-r,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===r)return s/(o-1);const u=n[s],p=n[s+1]-u,d=(r-u)/p;return(s+d)/(o-1)}getTangent(e,t){let s=e-1e-4,o=e+1e-4;s<0&&(s=0),o>1&&(o=1);const r=this.getPoint(s),a=this.getPoint(o),c=t||(r.isVector2?new oe:new z);return c.copy(a).sub(r).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new z,s=[],o=[],r=[],a=new z,c=new We;for(let d=0;d<=e;d++){const g=d/e;s[d]=this.getTangentAt(g,new z)}o[0]=new z,r[0]=new z;let l=Number.MAX_VALUE;const u=Math.abs(s[0].x),h=Math.abs(s[0].y),p=Math.abs(s[0].z);u<=l&&(l=u,n.set(1,0,0)),h<=l&&(l=h,n.set(0,1,0)),p<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),o[0].crossVectors(s[0],a),r[0].crossVectors(s[0],o[0]);for(let d=1;d<=e;d++){if(o[d]=o[d-1].clone(),r[d]=r[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Fe(s[d-1].dot(s[d]),-1,1));o[d].applyMatrix4(c.makeRotationAxis(a,g))}r[d].crossVectors(s[d],o[d])}if(t===!0){let d=Math.acos(Fe(o[0].dot(o[e]),-1,1));d/=e,s[0].dot(a.crossVectors(o[0],o[e]))>0&&(d=-d);for(let g=1;g<=e;g++)o[g].applyMatrix4(c.makeRotationAxis(s[g],d*g)),r[g].crossVectors(s[g],o[g])}return{tangents:s,normals:o,binormals:r}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class wa extends cn{constructor(e=0,t=0,n=1,s=1,o=0,r=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=o,this.aEndAngle=r,this.aClockwise=a,this.aRotation=c}getPoint(e,t=new oe){const n=t,s=Math.PI*2;let o=this.aEndAngle-this.aStartAngle;const r=Math.abs(o)<Number.EPSILON;for(;o<0;)o+=s;for(;o>s;)o-=s;o<Number.EPSILON&&(r?o=0:o=s),this.aClockwise===!0&&!r&&(o===s?o=-s:o=o-s);const a=this.aStartAngle+e*o;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),p=c-this.aX,d=l-this.aY;c=p*u-d*h+this.aX,l=p*h+d*u+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Nu extends wa{constructor(e,t,n,s,o,r){super(e,t,n,n,s,o,r),this.isArcCurve=!0,this.type="ArcCurve"}}function Ea(){let i=0,e=0,t=0,n=0;function s(o,r,a,c){i=o,e=a,t=-3*o+3*r-2*a-c,n=2*o-2*r+a+c}return{initCatmullRom:function(o,r,a,c,l){s(r,a,l*(a-o),l*(c-r))},initNonuniformCatmullRom:function(o,r,a,c,l,u,h){let p=(r-o)/l-(a-o)/(l+u)+(a-r)/u,d=(a-r)/u-(c-r)/(u+h)+(c-a)/h;p*=u,d*=u,s(r,a,p,d)},calc:function(o){const r=o*o,a=r*o;return i+e*o+t*r+n*a}}}const $s=new z,Zo=new Ea,Jo=new Ea,Ko=new Ea;class Fu extends cn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new z){const n=t,s=this.points,o=s.length,r=(o-(this.closed?0:1))*e;let a=Math.floor(r),c=r-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/o)+1)*o:c===0&&a===o-1&&(a=o-2,c=1);let l,u;this.closed||a>0?l=s[(a-1)%o]:($s.subVectors(s[0],s[1]).add(s[0]),l=$s);const h=s[a%o],p=s[(a+1)%o];if(this.closed||a+2<o?u=s[(a+2)%o]:($s.subVectors(s[o-1],s[o-2]).add(s[o-1]),u=$s),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(h),d),_=Math.pow(h.distanceToSquared(p),d),m=Math.pow(p.distanceToSquared(u),d);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Zo.initNonuniformCatmullRom(l.x,h.x,p.x,u.x,g,_,m),Jo.initNonuniformCatmullRom(l.y,h.y,p.y,u.y,g,_,m),Ko.initNonuniformCatmullRom(l.z,h.z,p.z,u.z,g,_,m)}else this.curveType==="catmullrom"&&(Zo.initCatmullRom(l.x,h.x,p.x,u.x,this.tension),Jo.initCatmullRom(l.y,h.y,p.y,u.y,this.tension),Ko.initCatmullRom(l.z,h.z,p.z,u.z,this.tension));return n.set(Zo.calc(c),Jo.calc(c),Ko.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new z().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function gc(i,e,t,n,s){const o=(n-e)*.5,r=(s-t)*.5,a=i*i,c=i*a;return(2*t-2*n+o+r)*c+(-3*t+3*n-2*o-r)*a+o*i+t}function Ou(i,e){const t=1-i;return t*t*e}function Bu(i,e){return 2*(1-i)*i*e}function Hu(i,e){return i*i*e}function ji(i,e,t,n){return Ou(i,e)+Bu(i,t)+Hu(i,n)}function Vu(i,e){const t=1-i;return t*t*t*e}function ku(i,e){const t=1-i;return 3*t*t*i*e}function Gu(i,e){return 3*(1-i)*i*i*e}function Wu(i,e){return i*i*i*e}function Qi(i,e,t,n,s){return Vu(i,e)+ku(i,t)+Gu(i,n)+Wu(i,s)}class El extends cn{constructor(e=new oe,t=new oe,n=new oe,s=new oe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new oe){const n=t,s=this.v0,o=this.v1,r=this.v2,a=this.v3;return n.set(Qi(e,s.x,o.x,r.x,a.x),Qi(e,s.y,o.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class $u extends cn{constructor(e=new z,t=new z,n=new z,s=new z){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new z){const n=t,s=this.v0,o=this.v1,r=this.v2,a=this.v3;return n.set(Qi(e,s.x,o.x,r.x,a.x),Qi(e,s.y,o.y,r.y,a.y),Qi(e,s.z,o.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class bl extends cn{constructor(e=new oe,t=new oe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new oe){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new oe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Xu extends cn{constructor(e=new z,t=new z){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new z){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new z){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Tl extends cn{constructor(e=new oe,t=new oe,n=new oe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new oe){const n=t,s=this.v0,o=this.v1,r=this.v2;return n.set(ji(e,s.x,o.x,r.x),ji(e,s.y,o.y,r.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class qu extends cn{constructor(e=new z,t=new z,n=new z){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new z){const n=t,s=this.v0,o=this.v1,r=this.v2;return n.set(ji(e,s.x,o.x,r.x),ji(e,s.y,o.y,r.y),ji(e,s.z,o.z,r.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Al extends cn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new oe){const n=t,s=this.points,o=(s.length-1)*e,r=Math.floor(o),a=o-r,c=s[r===0?r:r-1],l=s[r],u=s[r>s.length-2?s.length-1:r+1],h=s[r>s.length-3?s.length-1:r+2];return n.set(gc(a,c.x,l.x,u.x,h.x),gc(a,c.y,l.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new oe().fromArray(s))}return this}}var _c=Object.freeze({__proto__:null,ArcCurve:Nu,CatmullRomCurve3:Fu,CubicBezierCurve:El,CubicBezierCurve3:$u,EllipseCurve:wa,LineCurve:bl,LineCurve3:Xu,QuadraticBezierCurve:Tl,QuadraticBezierCurve3:qu,SplineCurve:Al});class Yu extends cn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new _c[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let o=0;for(;o<s.length;){if(s[o]>=n){const r=s[o]-n,a=this.curves[o],c=a.getLength(),l=c===0?0:1-r/c;return a.getPointAt(l,t)}o++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,o=this.curves;s<o.length;s++){const r=o[s],a=r.isEllipseCurve?e*2:r.isLineCurve||r.isLineCurve3?1:r.isSplineCurve?e*r.points.length:e,c=r.getPoints(a);for(let l=0;l<c.length;l++){const u=c[l];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new _c[s.type]().fromJSON(s))}return this}}class vc extends Yu{constructor(e){super(),this.type="Path",this.currentPoint=new oe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new bl(this.currentPoint.clone(),new oe(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const o=new Tl(this.currentPoint.clone(),new oe(e,t),new oe(n,s));return this.curves.push(o),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,o,r){const a=new El(this.currentPoint.clone(),new oe(e,t),new oe(n,s),new oe(o,r));return this.curves.push(a),this.currentPoint.set(o,r),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Al(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,o,r){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+a,t+c,n,s,o,r),this}absarc(e,t,n,s,o,r){return this.absellipse(e,t,n,n,s,o,r),this}ellipse(e,t,n,s,o,r,a,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+l,t+u,n,s,o,r,a,c),this}absellipse(e,t,n,s,o,r,a,c){const l=new wa(e,t,n,s,o,r,a,c);if(this.curves.length>0){const h=l.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class zl extends vc{constructor(e){super(e),this.uuid=on(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new vc().fromJSON(s))}return this}}function Zu(i,e,t=2){const n=e&&e.length,s=n?e[0]*t:i.length;let o=Rl(i,0,s,t,!0);const r=[];if(!o||o.next===o.prev)return r;let a,c,l;if(n&&(o=ep(i,e,o,t)),i.length>80*t){a=1/0,c=1/0;let u=-1/0,h=-1/0;for(let p=t;p<s;p+=t){const d=i[p],g=i[p+1];d<a&&(a=d),g<c&&(c=g),d>u&&(u=d),g>h&&(h=g)}l=Math.max(u-a,h-c),l=l!==0?32767/l:0}return cs(o,r,t,a,c,l,0),r}function Rl(i,e,t,n,s){let o;if(s===up(i,e,t,n)>0)for(let r=e;r<t;r+=n)o=yc(r/n|0,i[r],i[r+1],o);else for(let r=t-n;r>=e;r-=n)o=yc(r/n|0,i[r],i[r+1],o);return o&&Di(o,o.next)&&(hs(o),o=o.next),o}function Zn(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Di(t,t.next)||lt(t.prev,t,t.next)===0)){if(hs(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function cs(i,e,t,n,s,o,r){if(!i)return;!r&&o&&op(i,n,s,o);let a=i;for(;i.prev!==i.next;){const c=i.prev,l=i.next;if(o?Ku(i,n,s,o):Ju(i)){e.push(c.i,i.i,l.i),hs(i),i=l.next,a=l.next;continue}if(i=l,i===a){r?r===1?(i=ju(Zn(i),e),cs(i,e,t,n,s,o,2)):r===2&&Qu(i,e,t,n,s,o):cs(Zn(i),e,t,n,s,o,1);break}}}function Ju(i){const e=i.prev,t=i,n=i.next;if(lt(e,t,n)>=0)return!1;const s=e.x,o=t.x,r=n.x,a=e.y,c=t.y,l=n.y,u=Math.min(s,o,r),h=Math.min(a,c,l),p=Math.max(s,o,r),d=Math.max(a,c,l);let g=n.next;for(;g!==e;){if(g.x>=u&&g.x<=p&&g.y>=h&&g.y<=d&&Zi(s,a,o,c,r,l,g.x,g.y)&&lt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Ku(i,e,t,n){const s=i.prev,o=i,r=i.next;if(lt(s,o,r)>=0)return!1;const a=s.x,c=o.x,l=r.x,u=s.y,h=o.y,p=r.y,d=Math.min(a,c,l),g=Math.min(u,h,p),_=Math.max(a,c,l),m=Math.max(u,h,p),f=ta(d,g,e,t,n),E=ta(_,m,e,t,n);let w=i.prevZ,v=i.nextZ;for(;w&&w.z>=f&&v&&v.z<=E;){if(w.x>=d&&w.x<=_&&w.y>=g&&w.y<=m&&w!==s&&w!==r&&Zi(a,u,c,h,l,p,w.x,w.y)&&lt(w.prev,w,w.next)>=0||(w=w.prevZ,v.x>=d&&v.x<=_&&v.y>=g&&v.y<=m&&v!==s&&v!==r&&Zi(a,u,c,h,l,p,v.x,v.y)&&lt(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;w&&w.z>=f;){if(w.x>=d&&w.x<=_&&w.y>=g&&w.y<=m&&w!==s&&w!==r&&Zi(a,u,c,h,l,p,w.x,w.y)&&lt(w.prev,w,w.next)>=0)return!1;w=w.prevZ}for(;v&&v.z<=E;){if(v.x>=d&&v.x<=_&&v.y>=g&&v.y<=m&&v!==s&&v!==r&&Zi(a,u,c,h,l,p,v.x,v.y)&&lt(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function ju(i,e){let t=i;do{const n=t.prev,s=t.next.next;!Di(n,s)&&Pl(n,t,t.next,s)&&ls(n,s)&&ls(s,n)&&(e.push(n.i,t.i,s.i),hs(t),hs(t.next),t=i=s),t=t.next}while(t!==i);return Zn(t)}function Qu(i,e,t,n,s,o){let r=i;do{let a=r.next.next;for(;a!==r.prev;){if(r.i!==a.i&&cp(r,a)){let c=Ll(r,a);r=Zn(r,r.next),c=Zn(c,c.next),cs(r,e,t,n,s,o,0),cs(c,e,t,n,s,o,0);return}a=a.next}r=r.next}while(r!==i)}function ep(i,e,t,n){const s=[];for(let o=0,r=e.length;o<r;o++){const a=e[o]*n,c=o<r-1?e[o+1]*n:i.length,l=Rl(i,a,c,n,!1);l===l.next&&(l.steiner=!0),s.push(ap(l))}s.sort(tp);for(let o=0;o<s.length;o++)t=np(s[o],t);return t}function tp(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function np(i,e){const t=ip(i,e);if(!t)return e;const n=Ll(t,i);return Zn(n,n.next),Zn(t,t.next)}function ip(i,e){let t=e;const n=i.x,s=i.y;let o=-1/0,r;if(Di(i,t))return t;do{if(Di(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){const h=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(h<=n&&h>o&&(o=h,r=t.x<t.next.x?t:t.next,h===n))return r}t=t.next}while(t!==e);if(!r)return null;const a=r,c=r.x,l=r.y;let u=1/0;t=r;do{if(n>=t.x&&t.x>=c&&n!==t.x&&Cl(s<l?n:o,s,c,l,s<l?o:n,s,t.x,t.y)){const h=Math.abs(s-t.y)/(n-t.x);ls(t,i)&&(h<u||h===u&&(t.x>r.x||t.x===r.x&&sp(r,t)))&&(r=t,u=h)}t=t.next}while(t!==a);return r}function sp(i,e){return lt(i.prev,i,e.prev)<0&&lt(e.next,i,i.next)<0}function op(i,e,t,n){let s=i;do s.z===0&&(s.z=ta(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,rp(s)}function rp(i){let e,t=1;do{let n=i,s;i=null;let o=null;for(e=0;n;){e++;let r=n,a=0;for(let l=0;l<t&&(a++,r=r.nextZ,!!r);l++);let c=t;for(;a>0||c>0&&r;)a!==0&&(c===0||!r||n.z<=r.z)?(s=n,n=n.nextZ,a--):(s=r,r=r.nextZ,c--),o?o.nextZ=s:i=s,s.prevZ=o,o=s;n=r}o.nextZ=null,t*=2}while(e>1);return i}function ta(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function ap(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Cl(i,e,t,n,s,o,r,a){return(s-r)*(e-a)>=(i-r)*(o-a)&&(i-r)*(n-a)>=(t-r)*(e-a)&&(t-r)*(o-a)>=(s-r)*(n-a)}function Zi(i,e,t,n,s,o,r,a){return!(i===r&&e===a)&&Cl(i,e,t,n,s,o,r,a)}function cp(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!lp(i,e)&&(ls(i,e)&&ls(e,i)&&hp(i,e)&&(lt(i.prev,i,e.prev)||lt(i,e.prev,e))||Di(i,e)&&lt(i.prev,i,i.next)>0&&lt(e.prev,e,e.next)>0)}function lt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Di(i,e){return i.x===e.x&&i.y===e.y}function Pl(i,e,t,n){const s=qs(lt(i,e,t)),o=qs(lt(i,e,n)),r=qs(lt(t,n,i)),a=qs(lt(t,n,e));return!!(s!==o&&r!==a||s===0&&Xs(i,t,e)||o===0&&Xs(i,n,e)||r===0&&Xs(t,i,n)||a===0&&Xs(t,e,n))}function Xs(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function qs(i){return i>0?1:i<0?-1:0}function lp(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Pl(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function ls(i,e){return lt(i.prev,i,i.next)<0?lt(i,e,i.next)>=0&&lt(i,i.prev,e)>=0:lt(i,e,i.prev)<0||lt(i,i.next,e)<0}function hp(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,o=(i.y+e.y)/2;do t.y>o!=t.next.y>o&&t.next.y!==t.y&&s<(t.next.x-t.x)*(o-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Ll(i,e){const t=na(i.i,i.x,i.y),n=na(e.i,e.x,e.y),s=i.next,o=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,o.next=n,n.prev=o,n}function yc(i,e,t,n){const s=na(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function hs(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function na(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function up(i,e,t,n){let s=0;for(let o=e,r=t-n;o<t;o+=n)s+=(i[r]-i[o])*(i[o+1]+i[r+1]),r=o;return s}class pp{static triangulate(e,t,n=2){return Zu(e,t,n)}}class es{static area(e){const t=e.length;let n=0;for(let s=t-1,o=0;o<t;s=o++)n+=e[s].x*e[o].y-e[o].x*e[s].y;return n*.5}static isClockWise(e){return es.area(e)<0}static triangulateShape(e,t){const n=[],s=[],o=[];xc(e),Mc(n,e);let r=e.length;t.forEach(xc);for(let c=0;c<t.length;c++)s.push(r),r+=t[c].length,Mc(n,t[c]);const a=pp.triangulate(n,s);for(let c=0;c<a.length;c+=3)o.push(a.slice(c,c+3));return o}}function xc(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Mc(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class Dl extends Sa{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Dl(e.radius,e.detail)}}class Qn extends pt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const o=e/2,r=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,u=c+1,h=e/a,p=t/c,d=[],g=[],_=[],m=[];for(let f=0;f<u;f++){const E=f*p-r;for(let w=0;w<l;w++){const v=w*h-o;g.push(v,-E,0),_.push(0,0,1),m.push(w/a),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let E=0;E<a;E++){const w=E+l*f,v=E+l*(f+1),A=E+1+l*(f+1),T=E+1+l*f;d.push(w,v,T),d.push(v,A,T)}this.setIndex(d),this.setAttribute("position",new He(g,3)),this.setAttribute("normal",new He(_,3)),this.setAttribute("uv",new He(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qn(e.width,e.height,e.widthSegments,e.heightSegments)}}class ba extends pt{constructor(e=.5,t=1,n=32,s=1,o=0,r=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:o,thetaLength:r},n=Math.max(3,n),s=Math.max(1,s);const a=[],c=[],l=[],u=[];let h=e;const p=(t-e)/s,d=new z,g=new oe;for(let _=0;_<=s;_++){for(let m=0;m<=n;m++){const f=o+m/n*r;d.x=h*Math.cos(f),d.y=h*Math.sin(f),c.push(d.x,d.y,d.z),l.push(0,0,1),g.x=(d.x/t+1)/2,g.y=(d.y/t+1)/2,u.push(g.x,g.y)}h+=p}for(let _=0;_<s;_++){const m=_*(n+1);for(let f=0;f<n;f++){const E=f+m,w=E,v=E+n+1,A=E+n+2,T=E+1;a.push(w,v,T),a.push(v,A,T)}}this.setIndex(a),this.setAttribute("position",new He(c,3)),this.setAttribute("normal",new He(l,3)),this.setAttribute("uv",new He(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ba(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Ta extends pt{constructor(e=new zl([new oe(0,.5),new oe(-.5,-.5),new oe(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],s=[],o=[],r=[];let a=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let u=0;u<e.length;u++)l(e[u]),this.addGroup(a,c,u),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new He(s,3)),this.setAttribute("normal",new He(o,3)),this.setAttribute("uv",new He(r,2));function l(u){const h=s.length/3,p=u.extractPoints(t);let d=p.shape;const g=p.holes;es.isClockWise(d)===!1&&(d=d.reverse());for(let m=0,f=g.length;m<f;m++){const E=g[m];es.isClockWise(E)===!0&&(g[m]=E.reverse())}const _=es.triangulateShape(d,g);for(let m=0,f=g.length;m<f;m++){const E=g[m];d=d.concat(E)}for(let m=0,f=d.length;m<f;m++){const E=d[m];s.push(E.x,E.y,0),o.push(0,0,1),r.push(E.x,E.y)}for(let m=0,f=_.length;m<f;m++){const E=_[m],w=E[0]+h,v=E[1]+h,A=E[2]+h;n.push(w,v,A),c+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return dp(t,e)}static fromJSON(e,t){const n=[];for(let s=0,o=e.shapes.length;s<o;s++){const r=t[e.shapes[s]];n.push(r)}return new Ta(n,e.curveSegments)}}function dp(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){const s=i[t];e.shapes.push(s.uuid)}else e.shapes.push(i.uuid);return e}class _o extends pt{constructor(e=1,t=32,n=16,s=0,o=Math.PI*2,r=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:o,thetaStart:r,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(r+a,Math.PI);let l=0;const u=[],h=new z,p=new z,d=[],g=[],_=[],m=[];for(let f=0;f<=n;f++){const E=[],w=f/n;let v=0;f===0&&r===0?v=.5/t:f===n&&c===Math.PI&&(v=-.5/t);for(let A=0;A<=t;A++){const T=A/t;h.x=-e*Math.cos(s+T*o)*Math.sin(r+w*a),h.y=e*Math.cos(r+w*a),h.z=e*Math.sin(s+T*o)*Math.sin(r+w*a),g.push(h.x,h.y,h.z),p.copy(h).normalize(),_.push(p.x,p.y,p.z),m.push(T+v,1-w),E.push(l++)}u.push(E)}for(let f=0;f<n;f++)for(let E=0;E<t;E++){const w=u[f][E+1],v=u[f][E],A=u[f+1][E],T=u[f+1][E+1];(f!==0||r>0)&&d.push(w,v,T),(f!==n-1||c<Math.PI)&&d.push(v,A,T)}this.setIndex(d),this.setAttribute("position",new He(g,3)),this.setAttribute("normal",new He(_,3)),this.setAttribute("uv",new He(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _o(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ps extends pt{constructor(e=1,t=.4,n=12,s=48,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:o},n=Math.floor(n),s=Math.floor(s);const r=[],a=[],c=[],l=[],u=new z,h=new z,p=new z;for(let d=0;d<=n;d++)for(let g=0;g<=s;g++){const _=g/s*o,m=d/n*Math.PI*2;h.x=(e+t*Math.cos(m))*Math.cos(_),h.y=(e+t*Math.cos(m))*Math.sin(_),h.z=t*Math.sin(m),a.push(h.x,h.y,h.z),u.x=e*Math.cos(_),u.y=e*Math.sin(_),p.subVectors(h,u).normalize(),c.push(p.x,p.y,p.z),l.push(g/s),l.push(d/n)}for(let d=1;d<=n;d++)for(let g=1;g<=s;g++){const _=(s+1)*d+g-1,m=(s+1)*(d-1)+g-1,f=(s+1)*(d-1)+g,E=(s+1)*d+g;r.push(_,m,E),r.push(m,f,E)}this.setIndex(r),this.setAttribute("position",new He(a,3)),this.setAttribute("normal",new He(c,3)),this.setAttribute("uv",new He(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ps(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class l3 extends Ht{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Je extends vn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new be(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=fa,this.normalScale=new oe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Kt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Il extends Je{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new oe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Fe(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new be(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new be(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new be(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class fp extends vn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=fa,this.normalScale=new oe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Kt,this.combine=ra,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class mp extends vn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ah,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class gp extends vn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class h3 extends mo{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}const jo={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class _p{constructor(e,t,n){const s=this;let o=!1,r=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(u){a++,o===!1&&s.onStart!==void 0&&s.onStart(u,r,a),o=!0},this.itemEnd=function(u){r++,s.onProgress!==void 0&&s.onProgress(u,r,a),r===a&&(o=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){const h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,p=l.length;h<p;h+=2){const d=l[h],g=l[h+1];if(d.global&&(d.lastIndex=0),d.test(u))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}}const vp=new _p;class Aa{constructor(e){this.manager=e!==void 0?e:vp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,o){n.load(e,s,t,o)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Aa.DEFAULT_MATERIAL_NAME="__DEFAULT";const yi=new WeakMap;class yp extends Aa{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const o=this,r=jo.get(`image:${e}`);if(r!==void 0){if(r.complete===!0)o.manager.itemStart(e),setTimeout(function(){t&&t(r),o.manager.itemEnd(e)},0);else{let h=yi.get(r);h===void 0&&(h=[],yi.set(r,h)),h.push({onLoad:t,onError:s})}return r}const a=rs("img");function c(){u(),t&&t(this);const h=yi.get(this)||[];for(let p=0;p<h.length;p++){const d=h[p];d.onLoad&&d.onLoad(this)}yi.delete(this),o.manager.itemEnd(e)}function l(h){u(),s&&s(h),jo.remove(`image:${e}`);const p=yi.get(this)||[];for(let d=0;d<p.length;d++){const g=p[d];g.onError&&g.onError(h)}yi.delete(this),o.manager.itemError(e),o.manager.itemEnd(e)}function u(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),jo.add(`image:${e}`,a),o.manager.itemStart(e),a.src=e,a}}class xp extends Aa{constructor(e){super(e)}load(e,t,n,s){const o=new Mt,r=new yp(this.manager);return r.setCrossOrigin(this.crossOrigin),r.setPath(this.path),r.load(e,function(a){o.image=a,o.needsUpdate=!0,t!==void 0&&t(o)},n,s),o}}class za extends ft{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new be(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class u3 extends za{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.groundColor=new be(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Qo=new We,Sc=new z,wc=new z;class Ul{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new oe(512,512),this.mapType=rn,this.map=null,this.mapPass=null,this.matrix=new We,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ya,this._frameExtents=new oe(1,1),this._viewportCount=1,this._viewports=[new Qe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Sc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Sc),wc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(wc),t.updateMatrixWorld(),Qo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Qo,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Qo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Ec=new We,Xi=new z,er=new z;class Mp extends Ul{constructor(){super(new Wt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new oe(4,2),this._viewportCount=6,this._viewports=[new Qe(2,1,1,1),new Qe(0,1,1,1),new Qe(3,1,1,1),new Qe(1,1,1,1),new Qe(3,0,1,1),new Qe(1,0,1,1)],this._cubeDirections=[new z(1,0,0),new z(-1,0,0),new z(0,0,1),new z(0,0,-1),new z(0,1,0),new z(0,-1,0)],this._cubeUps=[new z(0,1,0),new z(0,1,0),new z(0,1,0),new z(0,1,0),new z(0,0,1),new z(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,o=e.distance||n.far;o!==n.far&&(n.far=o,n.updateProjectionMatrix()),Xi.setFromMatrixPosition(e.matrixWorld),n.position.copy(Xi),er.copy(n.position),er.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(er),n.updateMatrixWorld(),s.makeTranslation(-Xi.x,-Xi.y,-Xi.z),Ec.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ec,n.coordinateSystem,n.reversedDepth)}}class vo extends za{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Mp}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Nl extends gl{constructor(e=-1,t=1,n=1,s=-1,o=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=o,this.far=r,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,o,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=o,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let o=n-e,r=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=l*this.view.offsetX,r=o+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(o,r,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Sp extends Ul{constructor(){super(new Nl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class p3 extends za{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.target=new ft,this.shadow=new Sp}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class wp extends Wt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class d3{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}const bc=new We;class f3{constructor(e,t,n=0,s=1/0){this.ray=new fo(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new _a,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return bc.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(bc),this}intersectObject(e,t=!0,n=[]){return ia(e,this,n,t),n.sort(Tc),n}intersectObjects(e,t=!0,n=[]){for(let s=0,o=e.length;s<o;s++)ia(e[s],this,n,t);return n.sort(Tc),n}}function Tc(i,e){return i.distance-e.distance}function ia(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const o=i.children;for(let r=0,a=o.length;r<a;r++)ia(o[r],e,t,!0)}}class m3{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Fe(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Fe(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class g3 extends Ml{constructor(e=10,t=10,n=4473924,s=8947848){n=new be(n),s=new be(s);const o=t/2,r=e/t,a=e/2,c=[],l=[];for(let p=0,d=0,g=-a;p<=t;p++,g+=r){c.push(-a,0,g,a,0,g),c.push(g,0,-a,g,0,a);const _=p===o?n:s;_.toArray(l,d),d+=3,_.toArray(l,d),d+=3,_.toArray(l,d),d+=3,_.toArray(l,d),d+=3}const u=new pt;u.setAttribute("position",new He(c,3)),u.setAttribute("color",new He(l,3));const h=new mo({vertexColors:!0,toneMapped:!1});super(u,h),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class _3 extends Ml{constructor(e=1){const t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],s=new pt;s.setAttribute("position",new He(t,3)),s.setAttribute("color",new He(n,3));const o=new mo({vertexColors:!0,toneMapped:!1});super(s,o),this.type="AxesHelper"}setColors(e,t,n){const s=new be,o=this.geometry.attributes.color.array;return s.set(e),s.toArray(o,0),s.toArray(o,3),s.set(t),s.toArray(o,6),s.toArray(o,9),s.set(n),s.toArray(o,12),s.toArray(o,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class v3 extends Jn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Ac(i,e,t,n){const s=Ep(n);switch(t){case rl:return i*e;case ha:return i*e/s.components*s.byteLength;case ua:return i*e/s.components*s.byteLength;case cl:return i*e*2/s.components*s.byteLength;case pa:return i*e*2/s.components*s.byteLength;case al:return i*e*3/s.components*s.byteLength;case Zt:return i*e*4/s.components*s.byteLength;case da:return i*e*4/s.components*s.byteLength;case Qs:case eo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case to:case no:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Tr:case zr:return Math.max(i,16)*Math.max(e,8)/4;case br:case Ar:return Math.max(i,8)*Math.max(e,8)/2;case Rr:case Cr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Pr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Lr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Dr:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Ir:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Ur:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Nr:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Fr:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Or:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Br:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Hr:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Vr:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case kr:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Gr:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Wr:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case $r:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Xr:case qr:case Yr:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Zr:case Jr:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Kr:case jr:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Ep(i){switch(i){case rn:case nl:return{byteLength:1,components:1};case ts:case il:case us:return{byteLength:2,components:1};case ca:case la:return{byteLength:2,components:4};case qn:case aa:case nn:return{byteLength:4,components:1};case sl:case ol:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:oa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=oa);function Fl(){let i=null,e=!1,t=null,n=null;function s(o,r){t(o,r),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(o){t=o},setContext:function(o){i=o}}}function bp(i){const e=new WeakMap;function t(a,c){const l=a.array,u=a.usage,h=l.byteLength,p=i.createBuffer();i.bindBuffer(c,p),i.bufferData(c,l,u),a.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:p,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,c,l){const u=c.array,h=c.updateRanges;if(i.bindBuffer(l,a),h.length===0)i.bufferSubData(l,0,u);else{h.sort((d,g)=>d.start-g.start);let p=0;for(let d=1;d<h.length;d++){const g=h[p],_=h[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++p,h[p]=_)}h.length=p+1;for(let d=0,g=h.length;d<g;d++){const _=h[d];i.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function o(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function r(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:o,update:r}}var Tp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ap=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,zp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Rp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Cp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Pp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Lp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Dp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ip=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Up=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Np=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Fp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Op=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Bp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Hp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Vp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,kp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Gp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Wp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,$p=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Xp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,qp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Yp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Zp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Jp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Kp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,jp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Qp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,e0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,t0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,n0="gl_FragColor = linearToOutputTexel( gl_FragColor );",i0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,s0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,o0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,r0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,a0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,c0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,l0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,h0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,u0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,p0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,d0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,f0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,m0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,g0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,_0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,v0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,y0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,x0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,M0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,S0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,w0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,E0=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,b0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,T0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,A0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,z0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,R0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,C0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,P0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,L0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,D0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,I0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,U0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,N0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,F0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,O0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,B0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,H0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,V0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,k0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,G0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,W0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,$0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,X0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,q0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Y0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Z0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,J0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,K0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,j0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Q0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ed=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,td=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,nd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,id=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,sd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,od=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,rd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ad=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,cd=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,ld=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,hd=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,ud=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,pd=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,dd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,fd=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,md=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,gd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,_d=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,vd=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,yd=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,xd=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Md=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Sd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,wd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Ed=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const bd=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Td=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ad=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zd=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Cd=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pd=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Ld=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Dd=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Id=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Ud=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Nd=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fd=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Od=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Bd=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Hd=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vd=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,kd=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gd=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Wd=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$d=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Xd=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,qd=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Yd=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zd=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Jd=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kd=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,jd=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qd=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,ef=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,tf=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,nf=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,sf=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,of=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Be={alphahash_fragment:Tp,alphahash_pars_fragment:Ap,alphamap_fragment:zp,alphamap_pars_fragment:Rp,alphatest_fragment:Cp,alphatest_pars_fragment:Pp,aomap_fragment:Lp,aomap_pars_fragment:Dp,batching_pars_vertex:Ip,batching_vertex:Up,begin_vertex:Np,beginnormal_vertex:Fp,bsdfs:Op,iridescence_fragment:Bp,bumpmap_pars_fragment:Hp,clipping_planes_fragment:Vp,clipping_planes_pars_fragment:kp,clipping_planes_pars_vertex:Gp,clipping_planes_vertex:Wp,color_fragment:$p,color_pars_fragment:Xp,color_pars_vertex:qp,color_vertex:Yp,common:Zp,cube_uv_reflection_fragment:Jp,defaultnormal_vertex:Kp,displacementmap_pars_vertex:jp,displacementmap_vertex:Qp,emissivemap_fragment:e0,emissivemap_pars_fragment:t0,colorspace_fragment:n0,colorspace_pars_fragment:i0,envmap_fragment:s0,envmap_common_pars_fragment:o0,envmap_pars_fragment:r0,envmap_pars_vertex:a0,envmap_physical_pars_fragment:v0,envmap_vertex:c0,fog_vertex:l0,fog_pars_vertex:h0,fog_fragment:u0,fog_pars_fragment:p0,gradientmap_pars_fragment:d0,lightmap_pars_fragment:f0,lights_lambert_fragment:m0,lights_lambert_pars_fragment:g0,lights_pars_begin:_0,lights_toon_fragment:y0,lights_toon_pars_fragment:x0,lights_phong_fragment:M0,lights_phong_pars_fragment:S0,lights_physical_fragment:w0,lights_physical_pars_fragment:E0,lights_fragment_begin:b0,lights_fragment_maps:T0,lights_fragment_end:A0,logdepthbuf_fragment:z0,logdepthbuf_pars_fragment:R0,logdepthbuf_pars_vertex:C0,logdepthbuf_vertex:P0,map_fragment:L0,map_pars_fragment:D0,map_particle_fragment:I0,map_particle_pars_fragment:U0,metalnessmap_fragment:N0,metalnessmap_pars_fragment:F0,morphinstance_vertex:O0,morphcolor_vertex:B0,morphnormal_vertex:H0,morphtarget_pars_vertex:V0,morphtarget_vertex:k0,normal_fragment_begin:G0,normal_fragment_maps:W0,normal_pars_fragment:$0,normal_pars_vertex:X0,normal_vertex:q0,normalmap_pars_fragment:Y0,clearcoat_normal_fragment_begin:Z0,clearcoat_normal_fragment_maps:J0,clearcoat_pars_fragment:K0,iridescence_pars_fragment:j0,opaque_fragment:Q0,packing:ed,premultiplied_alpha_fragment:td,project_vertex:nd,dithering_fragment:id,dithering_pars_fragment:sd,roughnessmap_fragment:od,roughnessmap_pars_fragment:rd,shadowmap_pars_fragment:ad,shadowmap_pars_vertex:cd,shadowmap_vertex:ld,shadowmask_pars_fragment:hd,skinbase_vertex:ud,skinning_pars_vertex:pd,skinning_vertex:dd,skinnormal_vertex:fd,specularmap_fragment:md,specularmap_pars_fragment:gd,tonemapping_fragment:_d,tonemapping_pars_fragment:vd,transmission_fragment:yd,transmission_pars_fragment:xd,uv_pars_fragment:Md,uv_pars_vertex:Sd,uv_vertex:wd,worldpos_vertex:Ed,background_vert:bd,background_frag:Td,backgroundCube_vert:Ad,backgroundCube_frag:zd,cube_vert:Rd,cube_frag:Cd,depth_vert:Pd,depth_frag:Ld,distanceRGBA_vert:Dd,distanceRGBA_frag:Id,equirect_vert:Ud,equirect_frag:Nd,linedashed_vert:Fd,linedashed_frag:Od,meshbasic_vert:Bd,meshbasic_frag:Hd,meshlambert_vert:Vd,meshlambert_frag:kd,meshmatcap_vert:Gd,meshmatcap_frag:Wd,meshnormal_vert:$d,meshnormal_frag:Xd,meshphong_vert:qd,meshphong_frag:Yd,meshphysical_vert:Zd,meshphysical_frag:Jd,meshtoon_vert:Kd,meshtoon_frag:jd,points_vert:Qd,points_frag:ef,shadow_vert:tf,shadow_frag:nf,sprite_vert:sf,sprite_frag:of},se={common:{diffuse:{value:new be(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ne},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ne}},envmap:{envMap:{value:null},envMapRotation:{value:new Ne},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ne}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ne}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ne},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ne},normalScale:{value:new oe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ne},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ne}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ne}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ne}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new be(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new be(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0},uvTransform:{value:new Ne}},sprite:{diffuse:{value:new be(16777215)},opacity:{value:1},center:{value:new oe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ne},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0}}},Qt={basic:{uniforms:Rt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.fog]),vertexShader:Be.meshbasic_vert,fragmentShader:Be.meshbasic_frag},lambert:{uniforms:Rt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new be(0)}}]),vertexShader:Be.meshlambert_vert,fragmentShader:Be.meshlambert_frag},phong:{uniforms:Rt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new be(0)},specular:{value:new be(1118481)},shininess:{value:30}}]),vertexShader:Be.meshphong_vert,fragmentShader:Be.meshphong_frag},standard:{uniforms:Rt([se.common,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.roughnessmap,se.metalnessmap,se.fog,se.lights,{emissive:{value:new be(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag},toon:{uniforms:Rt([se.common,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.gradientmap,se.fog,se.lights,{emissive:{value:new be(0)}}]),vertexShader:Be.meshtoon_vert,fragmentShader:Be.meshtoon_frag},matcap:{uniforms:Rt([se.common,se.bumpmap,se.normalmap,se.displacementmap,se.fog,{matcap:{value:null}}]),vertexShader:Be.meshmatcap_vert,fragmentShader:Be.meshmatcap_frag},points:{uniforms:Rt([se.points,se.fog]),vertexShader:Be.points_vert,fragmentShader:Be.points_frag},dashed:{uniforms:Rt([se.common,se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Be.linedashed_vert,fragmentShader:Be.linedashed_frag},depth:{uniforms:Rt([se.common,se.displacementmap]),vertexShader:Be.depth_vert,fragmentShader:Be.depth_frag},normal:{uniforms:Rt([se.common,se.bumpmap,se.normalmap,se.displacementmap,{opacity:{value:1}}]),vertexShader:Be.meshnormal_vert,fragmentShader:Be.meshnormal_frag},sprite:{uniforms:Rt([se.sprite,se.fog]),vertexShader:Be.sprite_vert,fragmentShader:Be.sprite_frag},background:{uniforms:{uvTransform:{value:new Ne},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Be.background_vert,fragmentShader:Be.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ne}},vertexShader:Be.backgroundCube_vert,fragmentShader:Be.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Be.cube_vert,fragmentShader:Be.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Be.equirect_vert,fragmentShader:Be.equirect_frag},distanceRGBA:{uniforms:Rt([se.common,se.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Be.distanceRGBA_vert,fragmentShader:Be.distanceRGBA_frag},shadow:{uniforms:Rt([se.lights,se.fog,{color:{value:new be(0)},opacity:{value:1}}]),vertexShader:Be.shadow_vert,fragmentShader:Be.shadow_frag}};Qt.physical={uniforms:Rt([Qt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ne},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ne},clearcoatNormalScale:{value:new oe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ne},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ne},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ne},sheen:{value:0},sheenColor:{value:new be(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ne},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ne},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ne},transmissionSamplerSize:{value:new oe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ne},attenuationDistance:{value:0},attenuationColor:{value:new be(0)},specularColor:{value:new be(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ne},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ne},anisotropyVector:{value:new oe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ne}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag};const Ys={r:0,b:0,g:0},On=new Kt,rf=new We;function af(i,e,t,n,s,o,r){const a=new be(0);let c=o===!0?0:1,l,u,h=null,p=0,d=null;function g(w){let v=w.isScene===!0?w.background:null;return v&&v.isTexture&&(v=(w.backgroundBlurriness>0?t:e).get(v)),v}function _(w){let v=!1;const A=g(w);A===null?f(a,c):A&&A.isColor&&(f(A,1),v=!0);const T=i.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,r),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(w,v){const A=g(v);A&&(A.isCubeTexture||A.mapping===po)?(u===void 0&&(u=new we(new gt(1,1,1),new Ht({name:"BackgroundCubeMaterial",uniforms:Li(Qt.backgroundCube.uniforms),vertexShader:Qt.backgroundCube.vertexShader,fragmentShader:Qt.backgroundCube.fragmentShader,side:Ct,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(T,R,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),On.copy(v.backgroundRotation),On.x*=-1,On.y*=-1,On.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(On.y*=-1,On.z*=-1),u.material.uniforms.envMap.value=A,u.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(rf.makeRotationFromEuler(On)),u.material.toneMapped=Xe.getTransfer(A.colorSpace)!==je,(h!==A||p!==A.version||d!==i.toneMapping)&&(u.material.needsUpdate=!0,h=A,p=A.version,d=i.toneMapping),u.layers.enableAll(),w.unshift(u,u.geometry,u.material,0,0,null)):A&&A.isTexture&&(l===void 0&&(l=new we(new Qn(2,2),new Ht({name:"BackgroundMaterial",uniforms:Li(Qt.background.uniforms),vertexShader:Qt.background.vertexShader,fragmentShader:Qt.background.fragmentShader,side:zn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=A,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=Xe.getTransfer(A.colorSpace)!==je,A.matrixAutoUpdate===!0&&A.updateMatrix(),l.material.uniforms.uvTransform.value.copy(A.matrix),(h!==A||p!==A.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,h=A,p=A.version,d=i.toneMapping),l.layers.enableAll(),w.unshift(l,l.geometry,l.material,0,0,null))}function f(w,v){w.getRGB(Ys,ml(i)),n.buffers.color.setClear(Ys.r,Ys.g,Ys.b,v,r)}function E(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(w,v=1){a.set(w),c=v,f(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(w){c=w,f(a,c)},render:_,addToRenderList:m,dispose:E}}function cf(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=p(null);let o=s,r=!1;function a(x,L,N,H,k){let X=!1;const W=h(H,N,L);o!==W&&(o=W,l(o.object)),X=d(x,H,N,k),X&&g(x,H,N,k),k!==null&&e.update(k,i.ELEMENT_ARRAY_BUFFER),(X||r)&&(r=!1,v(x,L,N,H),k!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function c(){return i.createVertexArray()}function l(x){return i.bindVertexArray(x)}function u(x){return i.deleteVertexArray(x)}function h(x,L,N){const H=N.wireframe===!0;let k=n[x.id];k===void 0&&(k={},n[x.id]=k);let X=k[L.id];X===void 0&&(X={},k[L.id]=X);let W=X[H];return W===void 0&&(W=p(c()),X[H]=W),W}function p(x){const L=[],N=[],H=[];for(let k=0;k<t;k++)L[k]=0,N[k]=0,H[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:N,attributeDivisors:H,object:x,attributes:{},index:null}}function d(x,L,N,H){const k=o.attributes,X=L.attributes;let W=0;const te=N.getAttributes();for(const V in te)if(te[V].location>=0){const he=k[V];let Ee=X[V];if(Ee===void 0&&(V==="instanceMatrix"&&x.instanceMatrix&&(Ee=x.instanceMatrix),V==="instanceColor"&&x.instanceColor&&(Ee=x.instanceColor)),he===void 0||he.attribute!==Ee||Ee&&he.data!==Ee.data)return!0;W++}return o.attributesNum!==W||o.index!==H}function g(x,L,N,H){const k={},X=L.attributes;let W=0;const te=N.getAttributes();for(const V in te)if(te[V].location>=0){let he=X[V];he===void 0&&(V==="instanceMatrix"&&x.instanceMatrix&&(he=x.instanceMatrix),V==="instanceColor"&&x.instanceColor&&(he=x.instanceColor));const Ee={};Ee.attribute=he,he&&he.data&&(Ee.data=he.data),k[V]=Ee,W++}o.attributes=k,o.attributesNum=W,o.index=H}function _(){const x=o.newAttributes;for(let L=0,N=x.length;L<N;L++)x[L]=0}function m(x){f(x,0)}function f(x,L){const N=o.newAttributes,H=o.enabledAttributes,k=o.attributeDivisors;N[x]=1,H[x]===0&&(i.enableVertexAttribArray(x),H[x]=1),k[x]!==L&&(i.vertexAttribDivisor(x,L),k[x]=L)}function E(){const x=o.newAttributes,L=o.enabledAttributes;for(let N=0,H=L.length;N<H;N++)L[N]!==x[N]&&(i.disableVertexAttribArray(N),L[N]=0)}function w(x,L,N,H,k,X,W){W===!0?i.vertexAttribIPointer(x,L,N,k,X):i.vertexAttribPointer(x,L,N,H,k,X)}function v(x,L,N,H){_();const k=H.attributes,X=N.getAttributes(),W=L.defaultAttributeValues;for(const te in X){const V=X[te];if(V.location>=0){let re=k[te];if(re===void 0&&(te==="instanceMatrix"&&x.instanceMatrix&&(re=x.instanceMatrix),te==="instanceColor"&&x.instanceColor&&(re=x.instanceColor)),re!==void 0){const he=re.normalized,Ee=re.itemSize,Ve=e.get(re);if(Ve===void 0)continue;const tt=Ve.buffer,st=Ve.type,qe=Ve.bytesPerElement,q=st===i.INT||st===i.UNSIGNED_INT||re.gpuType===aa;if(re.isInterleavedBufferAttribute){const J=re.data,de=J.stride,Le=re.offset;if(J.isInstancedInterleavedBuffer){for(let Se=0;Se<V.locationSize;Se++)f(V.location+Se,J.meshPerAttribute);x.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let Se=0;Se<V.locationSize;Se++)m(V.location+Se);i.bindBuffer(i.ARRAY_BUFFER,tt);for(let Se=0;Se<V.locationSize;Se++)w(V.location+Se,Ee/V.locationSize,st,he,de*qe,(Le+Ee/V.locationSize*Se)*qe,q)}else{if(re.isInstancedBufferAttribute){for(let J=0;J<V.locationSize;J++)f(V.location+J,re.meshPerAttribute);x.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let J=0;J<V.locationSize;J++)m(V.location+J);i.bindBuffer(i.ARRAY_BUFFER,tt);for(let J=0;J<V.locationSize;J++)w(V.location+J,Ee/V.locationSize,st,he,Ee*qe,Ee/V.locationSize*J*qe,q)}}else if(W!==void 0){const he=W[te];if(he!==void 0)switch(he.length){case 2:i.vertexAttrib2fv(V.location,he);break;case 3:i.vertexAttrib3fv(V.location,he);break;case 4:i.vertexAttrib4fv(V.location,he);break;default:i.vertexAttrib1fv(V.location,he)}}}}E()}function A(){P();for(const x in n){const L=n[x];for(const N in L){const H=L[N];for(const k in H)u(H[k].object),delete H[k];delete L[N]}delete n[x]}}function T(x){if(n[x.id]===void 0)return;const L=n[x.id];for(const N in L){const H=L[N];for(const k in H)u(H[k].object),delete H[k];delete L[N]}delete n[x.id]}function R(x){for(const L in n){const N=n[L];if(N[x.id]===void 0)continue;const H=N[x.id];for(const k in H)u(H[k].object),delete H[k];delete N[x.id]}}function P(){M(),r=!0,o!==s&&(o=s,l(o.object))}function M(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:P,resetDefaultState:M,dispose:A,releaseStatesOfGeometry:T,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:m,disableUnusedAttributes:E}}function lf(i,e,t){let n;function s(l){n=l}function o(l,u){i.drawArrays(n,l,u),t.update(u,n,1)}function r(l,u,h){h!==0&&(i.drawArraysInstanced(n,l,u,h),t.update(u,n,h))}function a(l,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let d=0;for(let g=0;g<h;g++)d+=u[g];t.update(d,n,1)}function c(l,u,h,p){if(h===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<l.length;g++)r(l[g],u[g],p[g]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,u,0,p,0,h);let g=0;for(let _=0;_<h;_++)g+=u[_]*p[_];t.update(g,n,1)}}this.setMode=s,this.render=o,this.renderInstances=r,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function hf(i,e,t,n){let s;function o(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function r(R){return!(R!==Zt&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const P=R===us&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==rn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==nn&&!P)}function c(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const h=t.logarithmicDepthBuffer===!0,p=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=g>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:o,getMaxPrecision:c,textureFormatReadable:r,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:h,reversedDepthBuffer:p,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:E,maxVaryings:w,maxFragmentUniforms:v,vertexTextures:A,maxSamples:T}}function uf(i){const e=this;let t=null,n=0,s=!1,o=!1;const r=new Hn,a=new Ne,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,p){const d=h.length!==0||p||n!==0||s;return s=p,n=h.length,d},this.beginShadows=function(){o=!0,u(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(h,p){t=u(h,p,0)},this.setState=function(h,p,d){const g=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,f=i.get(h);if(!s||g===null||g.length===0||o&&!m)o?u(null):l();else{const E=o?0:n,w=E*4;let v=f.clippingState||null;c.value=v,v=u(g,p,w,d);for(let A=0;A!==w;++A)v[A]=t[A];f.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=E}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,p,d,g){const _=h!==null?h.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const f=d+_*4,E=p.matrixWorldInverse;a.getNormalMatrix(E),(m===null||m.length<f)&&(m=new Float32Array(f));for(let w=0,v=d;w!==_;++w,v+=4)r.copy(h[w]).applyMatrix4(E,a),r.normal.toArray(m,v),m[v+3]=r.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function pf(i){let e=new WeakMap;function t(r,a){return a===Sr?r.mapping=Ri:a===wr&&(r.mapping=Ci),r}function n(r){if(r&&r.isTexture){const a=r.mapping;if(a===Sr||a===wr)if(e.has(r)){const c=e.get(r).texture;return t(c,r.mapping)}else{const c=r.image;if(c&&c.height>0){const l=new wu(c.height);return l.fromEquirectangularTexture(i,r),e.set(r,l),r.addEventListener("dispose",s),t(l.texture,r.mapping)}else return null}}return r}function s(r){const a=r.target;a.removeEventListener("dispose",s);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function o(){e=new WeakMap}return{get:n,dispose:o}}const Si=4,zc=[.125,.215,.35,.446,.526,.582],Gn=20,tr=new Nl,Rc=new be;let nr=null,ir=0,sr=0,or=!1;const Vn=(1+Math.sqrt(5))/2,xi=1/Vn,Cc=[new z(-Vn,xi,0),new z(Vn,xi,0),new z(-xi,0,Vn),new z(xi,0,Vn),new z(0,Vn,-xi),new z(0,Vn,xi),new z(-1,1,-1),new z(1,1,-1),new z(-1,1,1),new z(1,1,1)],df=new z;class Pc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,o={}){const{size:r=256,position:a=df}=o;nr=this._renderer.getRenderTarget(),ir=this._renderer.getActiveCubeFace(),sr=this._renderer.getActiveMipmapLevel(),or=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,a),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ic(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Dc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(nr,ir,sr),this._renderer.xr.enabled=or,e.scissorTest=!1,Zs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ri||e.mapping===Ci?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),nr=this._renderer.getRenderTarget(),ir=this._renderer.getActiveCubeFace(),sr=this._renderer.getActiveMipmapLevel(),or=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:tn,minFilter:tn,generateMipmaps:!1,type:us,format:Zt,colorSpace:Pi,depthBuffer:!1},s=Lc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Lc(e,t,n);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ff(o)),this._blurMaterial=mf(o,e,t)}return s}_compileMaterial(e){const t=new we(this._lodPlanes[0],e);this._renderer.compile(t,tr)}_sceneToCubeUV(e,t,n,s,o){const c=new Wt(90,1,t,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,p=h.autoClear,d=h.toneMapping;h.getClearColor(Rc),h.toneMapping=Tn,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(s),h.clearDepth(),h.setRenderTarget(null));const _=new Rn({name:"PMREM.Background",side:Ct,depthWrite:!1,depthTest:!1}),m=new we(new gt,_);let f=!1;const E=e.background;E?E.isColor&&(_.color.copy(E),e.background=null,f=!0):(_.color.copy(Rc),f=!0);for(let w=0;w<6;w++){const v=w%3;v===0?(c.up.set(0,l[w],0),c.position.set(o.x,o.y,o.z),c.lookAt(o.x+u[w],o.y,o.z)):v===1?(c.up.set(0,0,l[w]),c.position.set(o.x,o.y,o.z),c.lookAt(o.x,o.y+u[w],o.z)):(c.up.set(0,l[w],0),c.position.set(o.x,o.y,o.z),c.lookAt(o.x,o.y,o.z+u[w]));const A=this._cubeSize;Zs(s,v*A,w>2?A:0,A,A),h.setRenderTarget(s),f&&h.render(m,c),h.render(e,c)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=d,h.autoClear=p,e.background=E}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Ri||e.mapping===Ci;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ic()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Dc());const o=s?this._cubemapMaterial:this._equirectMaterial,r=new we(this._lodPlanes[0],o),a=o.uniforms;a.envMap.value=e;const c=this._cubeSize;Zs(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(r,tr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let o=1;o<s;o++){const r=Math.sqrt(this._sigmas[o]*this._sigmas[o]-this._sigmas[o-1]*this._sigmas[o-1]),a=Cc[(s-o-1)%Cc.length];this._blur(e,o-1,o,r,a)}t.autoClear=n}_blur(e,t,n,s,o){const r=this._pingPongRenderTarget;this._halfBlur(e,r,t,n,s,"latitudinal",o),this._halfBlur(r,e,n,n,s,"longitudinal",o)}_halfBlur(e,t,n,s,o,r,a){const c=this._renderer,l=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new we(this._lodPlanes[s],l),p=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(o)?Math.PI/(2*d):2*Math.PI/(2*Gn-1),_=o/g,m=isFinite(o)?1+Math.floor(u*_):Gn;m>Gn&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Gn}`);const f=[];let E=0;for(let R=0;R<Gn;++R){const P=R/_,M=Math.exp(-P*P/2);f.push(M),R===0?E+=M:R<m&&(E+=2*M)}for(let R=0;R<f.length;R++)f[R]=f[R]/E;p.envMap.value=e.texture,p.samples.value=m,p.weights.value=f,p.latitudinal.value=r==="latitudinal",a&&(p.poleAxis.value=a);const{_lodMax:w}=this;p.dTheta.value=g,p.mipInt.value=w-n;const v=this._sizeLods[s],A=3*v*(s>w-Si?s-w+Si:0),T=4*(this._cubeSize-v);Zs(t,A,T,3*v,2*v),c.setRenderTarget(t),c.render(h,tr)}}function ff(i){const e=[],t=[],n=[];let s=i;const o=i-Si+1+zc.length;for(let r=0;r<o;r++){const a=Math.pow(2,s);t.push(a);let c=1/a;r>i-Si?c=zc[r-i+Si-1]:r===0&&(c=0),n.push(c);const l=1/(a-2),u=-l,h=1+l,p=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,g=6,_=3,m=2,f=1,E=new Float32Array(_*g*d),w=new Float32Array(m*g*d),v=new Float32Array(f*g*d);for(let T=0;T<d;T++){const R=T%3*2/3-1,P=T>2?0:-1,M=[R,P,0,R+2/3,P,0,R+2/3,P+1,0,R,P,0,R+2/3,P+1,0,R,P+1,0];E.set(M,_*g*T),w.set(p,m*g*T);const x=[T,T,T,T,T,T];v.set(x,f*g*T)}const A=new pt;A.setAttribute("position",new Bt(E,_)),A.setAttribute("uv",new Bt(w,m)),A.setAttribute("faceIndex",new Bt(v,f)),e.push(A),s>Si&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Lc(i,e,t){const n=new Yn(i,e,t);return n.texture.mapping=po,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Zs(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function mf(i,e,t){const n=new Float32Array(Gn),s=new z(0,1,0);return new Ht({name:"SphericalGaussianBlur",defines:{n:Gn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ra(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:bn,depthTest:!1,depthWrite:!1})}function Dc(){return new Ht({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ra(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:bn,depthTest:!1,depthWrite:!1})}function Ic(){return new Ht({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ra(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:bn,depthTest:!1,depthWrite:!1})}function Ra(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function gf(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===Sr||c===wr,u=c===Ri||c===Ci;if(l||u){let h=e.get(a);const p=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==p)return t===null&&(t=new Pc(i)),h=l?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{const d=a.image;return l&&d&&d.height>0||u&&d&&s(d)?(t===null&&(t=new Pc(i)),h=l?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",o),h.texture):null}}}return a}function s(a){let c=0;const l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function o(a){const c=a.target;c.removeEventListener("dispose",o);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function r(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:r}}function _f(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&as("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function vf(i,e,t,n){const s={},o=new WeakMap;function r(h){const p=h.target;p.index!==null&&e.remove(p.index);for(const g in p.attributes)e.remove(p.attributes[g]);p.removeEventListener("dispose",r),delete s[p.id];const d=o.get(p);d&&(e.remove(d),o.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function a(h,p){return s[p.id]===!0||(p.addEventListener("dispose",r),s[p.id]=!0,t.memory.geometries++),p}function c(h){const p=h.attributes;for(const d in p)e.update(p[d],i.ARRAY_BUFFER)}function l(h){const p=[],d=h.index,g=h.attributes.position;let _=0;if(d!==null){const E=d.array;_=d.version;for(let w=0,v=E.length;w<v;w+=3){const A=E[w+0],T=E[w+1],R=E[w+2];p.push(A,T,T,R,R,A)}}else if(g!==void 0){const E=g.array;_=g.version;for(let w=0,v=E.length/3-1;w<v;w+=3){const A=w+0,T=w+1,R=w+2;p.push(A,T,T,R,R,A)}}else return;const m=new(hl(p)?fl:dl)(p,1);m.version=_;const f=o.get(h);f&&e.remove(f),o.set(h,m)}function u(h){const p=o.get(h);if(p){const d=h.index;d!==null&&p.version<d.version&&l(h)}else l(h);return o.get(h)}return{get:a,update:c,getWireframeAttribute:u}}function yf(i,e,t){let n;function s(p){n=p}let o,r;function a(p){o=p.type,r=p.bytesPerElement}function c(p,d){i.drawElements(n,d,o,p*r),t.update(d,n,1)}function l(p,d,g){g!==0&&(i.drawElementsInstanced(n,d,o,p*r,g),t.update(d,n,g))}function u(p,d,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,o,p,0,g);let m=0;for(let f=0;f<g;f++)m+=d[f];t.update(m,n,1)}function h(p,d,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<p.length;f++)l(p[f]/r,d[f],_[f]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,o,p,0,_,0,g);let f=0;for(let E=0;E<g;E++)f+=d[E]*_[E];t.update(f,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function xf(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(o,r,a){switch(t.calls++,r){case i.TRIANGLES:t.triangles+=a*(o/3);break;case i.LINES:t.lines+=a*(o/2);break;case i.LINE_STRIP:t.lines+=a*(o-1);break;case i.LINE_LOOP:t.lines+=a*o;break;case i.POINTS:t.points+=a*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Mf(i,e,t){const n=new WeakMap,s=new Qe;function o(r,a,c){const l=r.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let p=n.get(a);if(p===void 0||p.count!==h){let M=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",M)};p!==void 0&&p.texture.dispose();const d=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],f=a.morphAttributes.normal||[],E=a.morphAttributes.color||[];let w=0;d===!0&&(w=1),g===!0&&(w=2),_===!0&&(w=3);let v=a.attributes.position.count*w,A=1;v>e.maxTextureSize&&(A=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);const T=new Float32Array(v*A*4*h),R=new ul(T,v,A,h);R.type=nn,R.needsUpdate=!0;const P=w*4;for(let x=0;x<h;x++){const L=m[x],N=f[x],H=E[x],k=v*A*4*x;for(let X=0;X<L.count;X++){const W=X*P;d===!0&&(s.fromBufferAttribute(L,X),T[k+W+0]=s.x,T[k+W+1]=s.y,T[k+W+2]=s.z,T[k+W+3]=0),g===!0&&(s.fromBufferAttribute(N,X),T[k+W+4]=s.x,T[k+W+5]=s.y,T[k+W+6]=s.z,T[k+W+7]=0),_===!0&&(s.fromBufferAttribute(H,X),T[k+W+8]=s.x,T[k+W+9]=s.y,T[k+W+10]=s.z,T[k+W+11]=H.itemSize===4?s.w:1)}}p={count:h,texture:R,size:new oe(v,A)},n.set(a,p),a.addEventListener("dispose",M)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",r.morphTexture,t);else{let d=0;for(let _=0;_<l.length;_++)d+=l[_];const g=a.morphTargetsRelative?1:1-d;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",p.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}return{update:o}}function Sf(i,e,t,n){let s=new WeakMap;function o(c){const l=n.render.frame,u=c.geometry,h=e.get(c,u);if(s.get(h)!==l&&(e.update(h),s.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const p=c.skeleton;s.get(p)!==l&&(p.update(),s.set(p,l))}return h}function r(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:o,dispose:r}}const Ol=new Mt,Uc=new Sl(1,1),Bl=new ul,Hl=new ru,Vl=new _l,Nc=[],Fc=[],Oc=new Float32Array(16),Bc=new Float32Array(9),Hc=new Float32Array(4);function Ii(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let o=Nc[s];if(o===void 0&&(o=new Float32Array(s),Nc[s]=o),e!==0){n.toArray(o,0);for(let r=1,a=0;r!==e;++r)a+=t,i[r].toArray(o,a)}return o}function _t(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function vt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function yo(i,e){let t=Fc[e];t===void 0&&(t=new Int32Array(e),Fc[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function wf(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Ef(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(_t(t,e))return;i.uniform2fv(this.addr,e),vt(t,e)}}function bf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(_t(t,e))return;i.uniform3fv(this.addr,e),vt(t,e)}}function Tf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(_t(t,e))return;i.uniform4fv(this.addr,e),vt(t,e)}}function Af(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(_t(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),vt(t,e)}else{if(_t(t,n))return;Hc.set(n),i.uniformMatrix2fv(this.addr,!1,Hc),vt(t,n)}}function zf(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(_t(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),vt(t,e)}else{if(_t(t,n))return;Bc.set(n),i.uniformMatrix3fv(this.addr,!1,Bc),vt(t,n)}}function Rf(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(_t(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),vt(t,e)}else{if(_t(t,n))return;Oc.set(n),i.uniformMatrix4fv(this.addr,!1,Oc),vt(t,n)}}function Cf(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Pf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(_t(t,e))return;i.uniform2iv(this.addr,e),vt(t,e)}}function Lf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(_t(t,e))return;i.uniform3iv(this.addr,e),vt(t,e)}}function Df(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(_t(t,e))return;i.uniform4iv(this.addr,e),vt(t,e)}}function If(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Uf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(_t(t,e))return;i.uniform2uiv(this.addr,e),vt(t,e)}}function Nf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(_t(t,e))return;i.uniform3uiv(this.addr,e),vt(t,e)}}function Ff(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(_t(t,e))return;i.uniform4uiv(this.addr,e),vt(t,e)}}function Of(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let o;this.type===i.SAMPLER_2D_SHADOW?(Uc.compareFunction=ll,o=Uc):o=Ol,t.setTexture2D(e||o,s)}function Bf(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Hl,s)}function Hf(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Vl,s)}function Vf(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Bl,s)}function kf(i){switch(i){case 5126:return wf;case 35664:return Ef;case 35665:return bf;case 35666:return Tf;case 35674:return Af;case 35675:return zf;case 35676:return Rf;case 5124:case 35670:return Cf;case 35667:case 35671:return Pf;case 35668:case 35672:return Lf;case 35669:case 35673:return Df;case 5125:return If;case 36294:return Uf;case 36295:return Nf;case 36296:return Ff;case 35678:case 36198:case 36298:case 36306:case 35682:return Of;case 35679:case 36299:case 36307:return Bf;case 35680:case 36300:case 36308:case 36293:return Hf;case 36289:case 36303:case 36311:case 36292:return Vf}}function Gf(i,e){i.uniform1fv(this.addr,e)}function Wf(i,e){const t=Ii(e,this.size,2);i.uniform2fv(this.addr,t)}function $f(i,e){const t=Ii(e,this.size,3);i.uniform3fv(this.addr,t)}function Xf(i,e){const t=Ii(e,this.size,4);i.uniform4fv(this.addr,t)}function qf(i,e){const t=Ii(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Yf(i,e){const t=Ii(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Zf(i,e){const t=Ii(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Jf(i,e){i.uniform1iv(this.addr,e)}function Kf(i,e){i.uniform2iv(this.addr,e)}function jf(i,e){i.uniform3iv(this.addr,e)}function Qf(i,e){i.uniform4iv(this.addr,e)}function em(i,e){i.uniform1uiv(this.addr,e)}function tm(i,e){i.uniform2uiv(this.addr,e)}function nm(i,e){i.uniform3uiv(this.addr,e)}function im(i,e){i.uniform4uiv(this.addr,e)}function sm(i,e,t){const n=this.cache,s=e.length,o=yo(t,s);_t(n,o)||(i.uniform1iv(this.addr,o),vt(n,o));for(let r=0;r!==s;++r)t.setTexture2D(e[r]||Ol,o[r])}function om(i,e,t){const n=this.cache,s=e.length,o=yo(t,s);_t(n,o)||(i.uniform1iv(this.addr,o),vt(n,o));for(let r=0;r!==s;++r)t.setTexture3D(e[r]||Hl,o[r])}function rm(i,e,t){const n=this.cache,s=e.length,o=yo(t,s);_t(n,o)||(i.uniform1iv(this.addr,o),vt(n,o));for(let r=0;r!==s;++r)t.setTextureCube(e[r]||Vl,o[r])}function am(i,e,t){const n=this.cache,s=e.length,o=yo(t,s);_t(n,o)||(i.uniform1iv(this.addr,o),vt(n,o));for(let r=0;r!==s;++r)t.setTexture2DArray(e[r]||Bl,o[r])}function cm(i){switch(i){case 5126:return Gf;case 35664:return Wf;case 35665:return $f;case 35666:return Xf;case 35674:return qf;case 35675:return Yf;case 35676:return Zf;case 5124:case 35670:return Jf;case 35667:case 35671:return Kf;case 35668:case 35672:return jf;case 35669:case 35673:return Qf;case 5125:return em;case 36294:return tm;case 36295:return nm;case 36296:return im;case 35678:case 36198:case 36298:case 36306:case 35682:return sm;case 35679:case 36299:case 36307:return om;case 35680:case 36300:case 36308:case 36293:return rm;case 36289:case 36303:case 36311:case 36292:return am}}class lm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=kf(t.type)}}class hm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=cm(t.type)}}class um{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let o=0,r=s.length;o!==r;++o){const a=s[o];a.setValue(e,t[a.id],n)}}}const rr=/(\w+)(\])?(\[|\.)?/g;function Vc(i,e){i.seq.push(e),i.map[e.id]=e}function pm(i,e,t){const n=i.name,s=n.length;for(rr.lastIndex=0;;){const o=rr.exec(n),r=rr.lastIndex;let a=o[1];const c=o[2]==="]",l=o[3];if(c&&(a=a|0),l===void 0||l==="["&&r+2===s){Vc(t,l===void 0?new lm(a,i,e):new hm(a,i,e));break}else{let h=t.map[a];h===void 0&&(h=new um(a),Vc(t,h)),t=h}}}class io{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const o=e.getActiveUniform(t,s),r=e.getUniformLocation(t,o.name);pm(o,r,this)}}setValue(e,t,n,s){const o=this.map[t];o!==void 0&&o.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let o=0,r=t.length;o!==r;++o){const a=t[o],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,o=e.length;s!==o;++s){const r=e[s];r.id in t&&n.push(r)}return n}}function kc(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const dm=37297;let fm=0;function mm(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),o=Math.min(e+6,t.length);for(let r=s;r<o;r++){const a=r+1;n.push(`${a===e?">":" "} ${a}: ${t[r]}`)}return n.join(`
`)}const Gc=new Ne;function gm(i){Xe._getMatrix(Gc,Xe.workingColorSpace,i);const e=`mat3( ${Gc.elements.map(t=>t.toFixed(4))} )`;switch(Xe.getTransfer(i)){case ao:return[e,"LinearTransferOETF"];case je:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Wc(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),o=(i.getShaderInfoLog(e)||"").trim();if(n&&o==="")return"";const r=/ERROR: 0:(\d+)/.exec(o);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+o+`

`+mm(i.getShaderSource(e),a)}else return o}function _m(i,e){const t=gm(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function vm(i,e){let t;switch(e){case yh:t="Linear";break;case xh:t="Reinhard";break;case Mh:t="Cineon";break;case Sh:t="ACESFilmic";break;case Eh:t="AgX";break;case bh:t="Neutral";break;case wh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Js=new z;function ym(){Xe.getLuminanceCoefficients(Js);const i=Js.x.toFixed(4),e=Js.y.toFixed(4),t=Js.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function xm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ji).join(`
`)}function Mm(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Sm(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const o=i.getActiveAttrib(e,s),r=o.name;let a=1;o.type===i.FLOAT_MAT2&&(a=2),o.type===i.FLOAT_MAT3&&(a=3),o.type===i.FLOAT_MAT4&&(a=4),t[r]={type:o.type,location:i.getAttribLocation(e,r),locationSize:a}}return t}function Ji(i){return i!==""}function $c(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Xc(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const wm=/^[ \t]*#include +<([\w\d./]+)>/gm;function sa(i){return i.replace(wm,bm)}const Em=new Map;function bm(i,e){let t=Be[e];if(t===void 0){const n=Em.get(e);if(n!==void 0)t=Be[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return sa(t)}const Tm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function qc(i){return i.replace(Tm,Am)}function Am(i,e,t,n){let s="";for(let o=parseInt(e);o<parseInt(t);o++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return s}function Yc(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function zm(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===el?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===jl?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===mn&&(e="SHADOWMAP_TYPE_VSM"),e}function Rm(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ri:case Ci:e="ENVMAP_TYPE_CUBE";break;case po:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Cm(i){let e="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===Ci&&(e="ENVMAP_MODE_REFRACTION"),e}function Pm(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case ra:e="ENVMAP_BLENDING_MULTIPLY";break;case _h:e="ENVMAP_BLENDING_MIX";break;case vh:e="ENVMAP_BLENDING_ADD";break}return e}function Lm(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Dm(i,e,t,n){const s=i.getContext(),o=t.defines;let r=t.vertexShader,a=t.fragmentShader;const c=zm(t),l=Rm(t),u=Cm(t),h=Pm(t),p=Lm(t),d=xm(t),g=Mm(o),_=s.createProgram();let m,f,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ji).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ji).join(`
`),f.length>0&&(f+=`
`)):(m=[Yc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ji).join(`
`),f=[Yc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Tn?"#define TONE_MAPPING":"",t.toneMapping!==Tn?Be.tonemapping_pars_fragment:"",t.toneMapping!==Tn?vm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Be.colorspace_pars_fragment,_m("linearToOutputTexel",t.outputColorSpace),ym(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ji).join(`
`)),r=sa(r),r=$c(r,t),r=Xc(r,t),a=sa(a),a=$c(a,t),a=Xc(a,t),r=qc(r),a=qc(a),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===Ha?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ha?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const w=E+m+r,v=E+f+a,A=kc(s,s.VERTEX_SHADER,w),T=kc(s,s.FRAGMENT_SHADER,v);s.attachShader(_,A),s.attachShader(_,T),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function R(L){if(i.debug.checkShaderErrors){const N=s.getProgramInfoLog(_)||"",H=s.getShaderInfoLog(A)||"",k=s.getShaderInfoLog(T)||"",X=N.trim(),W=H.trim(),te=k.trim();let V=!0,re=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(V=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,A,T);else{const he=Wc(s,A,"vertex"),Ee=Wc(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+X+`
`+he+`
`+Ee)}else X!==""?console.warn("THREE.WebGLProgram: Program Info Log:",X):(W===""||te==="")&&(re=!1);re&&(L.diagnostics={runnable:V,programLog:X,vertexShader:{log:W,prefix:m},fragmentShader:{log:te,prefix:f}})}s.deleteShader(A),s.deleteShader(T),P=new io(s,_),M=Sm(s,_)}let P;this.getUniforms=function(){return P===void 0&&R(this),P};let M;this.getAttributes=function(){return M===void 0&&R(this),M};let x=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=s.getProgramParameter(_,dm)),x},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=fm++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=A,this.fragmentShader=T,this}let Im=0;class Um{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),o=this._getShaderStage(n),r=this._getShaderCacheForMaterial(e);return r.has(s)===!1&&(r.add(s),s.usedTimes++),r.has(o)===!1&&(r.add(o),o.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Nm(e),t.set(e,n)),n}}class Nm{constructor(e){this.id=Im++,this.code=e,this.usedTimes=0}}function Fm(i,e,t,n,s,o,r){const a=new _a,c=new Um,l=new Set,u=[],h=s.logarithmicDepthBuffer,p=s.vertexTextures;let d=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return l.add(M),M===0?"uv":`uv${M}`}function m(M,x,L,N,H){const k=N.fog,X=H.geometry,W=M.isMeshStandardMaterial?N.environment:null,te=(M.isMeshStandardMaterial?t:e).get(M.envMap||W),V=te&&te.mapping===po?te.image.height:null,re=g[M.type];M.precision!==null&&(d=s.getMaxPrecision(M.precision),d!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",d,"instead."));const he=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,Ee=he!==void 0?he.length:0;let Ve=0;X.morphAttributes.position!==void 0&&(Ve=1),X.morphAttributes.normal!==void 0&&(Ve=2),X.morphAttributes.color!==void 0&&(Ve=3);let tt,st,qe,q;if(re){const Ye=Qt[re];tt=Ye.vertexShader,st=Ye.fragmentShader}else tt=M.vertexShader,st=M.fragmentShader,c.update(M),qe=c.getVertexShaderID(M),q=c.getFragmentShaderID(M);const J=i.getRenderTarget(),de=i.state.buffers.depth.getReversed(),Le=H.isInstancedMesh===!0,Se=H.isBatchedMesh===!0,Ge=!!M.map,St=!!M.matcap,C=!!te,ot=!!M.aoMap,Ie=!!M.lightMap,Ce=!!M.bumpMap,ge=!!M.normalMap,rt=!!M.displacementMap,_e=!!M.emissiveMap,Oe=!!M.metalnessMap,yt=!!M.roughnessMap,dt=M.anisotropy>0,b=M.clearcoat>0,y=M.dispersion>0,F=M.iridescence>0,$=M.sheen>0,Z=M.transmission>0,G=dt&&!!M.anisotropyMap,Me=b&&!!M.clearcoatMap,ne=b&&!!M.clearcoatNormalMap,ve=b&&!!M.clearcoatRoughnessMap,ye=F&&!!M.iridescenceMap,Q=F&&!!M.iridescenceThicknessMap,le=$&&!!M.sheenColorMap,Re=$&&!!M.sheenRoughnessMap,xe=!!M.specularMap,ae=!!M.specularColorMap,Ue=!!M.specularIntensityMap,D=Z&&!!M.transmissionMap,ee=Z&&!!M.thicknessMap,ie=!!M.gradientMap,pe=!!M.alphaMap,K=M.alphaTest>0,Y=!!M.alphaHash,me=!!M.extensions;let De=Tn;M.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(De=i.toneMapping);const nt={shaderID:re,shaderType:M.type,shaderName:M.name,vertexShader:tt,fragmentShader:st,defines:M.defines,customVertexShaderID:qe,customFragmentShaderID:q,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:d,batching:Se,batchingColor:Se&&H._colorsTexture!==null,instancing:Le,instancingColor:Le&&H.instanceColor!==null,instancingMorph:Le&&H.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:J===null?i.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:Pi,alphaToCoverage:!!M.alphaToCoverage,map:Ge,matcap:St,envMap:C,envMapMode:C&&te.mapping,envMapCubeUVHeight:V,aoMap:ot,lightMap:Ie,bumpMap:Ce,normalMap:ge,displacementMap:p&&rt,emissiveMap:_e,normalMapObjectSpace:ge&&M.normalMapType===Rh,normalMapTangentSpace:ge&&M.normalMapType===fa,metalnessMap:Oe,roughnessMap:yt,anisotropy:dt,anisotropyMap:G,clearcoat:b,clearcoatMap:Me,clearcoatNormalMap:ne,clearcoatRoughnessMap:ve,dispersion:y,iridescence:F,iridescenceMap:ye,iridescenceThicknessMap:Q,sheen:$,sheenColorMap:le,sheenRoughnessMap:Re,specularMap:xe,specularColorMap:ae,specularIntensityMap:Ue,transmission:Z,transmissionMap:D,thicknessMap:ee,gradientMap:ie,opaque:M.transparent===!1&&M.blending===Ei&&M.alphaToCoverage===!1,alphaMap:pe,alphaTest:K,alphaHash:Y,combine:M.combine,mapUv:Ge&&_(M.map.channel),aoMapUv:ot&&_(M.aoMap.channel),lightMapUv:Ie&&_(M.lightMap.channel),bumpMapUv:Ce&&_(M.bumpMap.channel),normalMapUv:ge&&_(M.normalMap.channel),displacementMapUv:rt&&_(M.displacementMap.channel),emissiveMapUv:_e&&_(M.emissiveMap.channel),metalnessMapUv:Oe&&_(M.metalnessMap.channel),roughnessMapUv:yt&&_(M.roughnessMap.channel),anisotropyMapUv:G&&_(M.anisotropyMap.channel),clearcoatMapUv:Me&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:ne&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ve&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:ye&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:Q&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:le&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:Re&&_(M.sheenRoughnessMap.channel),specularMapUv:xe&&_(M.specularMap.channel),specularColorMapUv:ae&&_(M.specularColorMap.channel),specularIntensityMapUv:Ue&&_(M.specularIntensityMap.channel),transmissionMapUv:D&&_(M.transmissionMap.channel),thicknessMapUv:ee&&_(M.thicknessMap.channel),alphaMapUv:pe&&_(M.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(ge||dt),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!X.attributes.uv&&(Ge||pe),fog:!!k,useFog:M.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:M.flatShading===!0&&M.wireframe===!1,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:de,skinning:H.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:Ee,morphTextureStride:Ve,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:De,decodeVideoTexture:Ge&&M.map.isVideoTexture===!0&&Xe.getTransfer(M.map.colorSpace)===je,decodeVideoTextureEmissive:_e&&M.emissiveMap.isVideoTexture===!0&&Xe.getTransfer(M.emissiveMap.colorSpace)===je,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===bt,flipSided:M.side===Ct,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:me&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(me&&M.extensions.multiDraw===!0||Se)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return nt.vertexUv1s=l.has(1),nt.vertexUv2s=l.has(2),nt.vertexUv3s=l.has(3),l.clear(),nt}function f(M){const x=[];if(M.shaderID?x.push(M.shaderID):(x.push(M.customVertexShaderID),x.push(M.customFragmentShaderID)),M.defines!==void 0)for(const L in M.defines)x.push(L),x.push(M.defines[L]);return M.isRawShaderMaterial===!1&&(E(x,M),w(x,M),x.push(i.outputColorSpace)),x.push(M.customProgramCacheKey),x.join()}function E(M,x){M.push(x.precision),M.push(x.outputColorSpace),M.push(x.envMapMode),M.push(x.envMapCubeUVHeight),M.push(x.mapUv),M.push(x.alphaMapUv),M.push(x.lightMapUv),M.push(x.aoMapUv),M.push(x.bumpMapUv),M.push(x.normalMapUv),M.push(x.displacementMapUv),M.push(x.emissiveMapUv),M.push(x.metalnessMapUv),M.push(x.roughnessMapUv),M.push(x.anisotropyMapUv),M.push(x.clearcoatMapUv),M.push(x.clearcoatNormalMapUv),M.push(x.clearcoatRoughnessMapUv),M.push(x.iridescenceMapUv),M.push(x.iridescenceThicknessMapUv),M.push(x.sheenColorMapUv),M.push(x.sheenRoughnessMapUv),M.push(x.specularMapUv),M.push(x.specularColorMapUv),M.push(x.specularIntensityMapUv),M.push(x.transmissionMapUv),M.push(x.thicknessMapUv),M.push(x.combine),M.push(x.fogExp2),M.push(x.sizeAttenuation),M.push(x.morphTargetsCount),M.push(x.morphAttributeCount),M.push(x.numDirLights),M.push(x.numPointLights),M.push(x.numSpotLights),M.push(x.numSpotLightMaps),M.push(x.numHemiLights),M.push(x.numRectAreaLights),M.push(x.numDirLightShadows),M.push(x.numPointLightShadows),M.push(x.numSpotLightShadows),M.push(x.numSpotLightShadowsWithMaps),M.push(x.numLightProbes),M.push(x.shadowMapType),M.push(x.toneMapping),M.push(x.numClippingPlanes),M.push(x.numClipIntersection),M.push(x.depthPacking)}function w(M,x){a.disableAll(),x.supportsVertexTextures&&a.enable(0),x.instancing&&a.enable(1),x.instancingColor&&a.enable(2),x.instancingMorph&&a.enable(3),x.matcap&&a.enable(4),x.envMap&&a.enable(5),x.normalMapObjectSpace&&a.enable(6),x.normalMapTangentSpace&&a.enable(7),x.clearcoat&&a.enable(8),x.iridescence&&a.enable(9),x.alphaTest&&a.enable(10),x.vertexColors&&a.enable(11),x.vertexAlphas&&a.enable(12),x.vertexUv1s&&a.enable(13),x.vertexUv2s&&a.enable(14),x.vertexUv3s&&a.enable(15),x.vertexTangents&&a.enable(16),x.anisotropy&&a.enable(17),x.alphaHash&&a.enable(18),x.batching&&a.enable(19),x.dispersion&&a.enable(20),x.batchingColor&&a.enable(21),x.gradientMap&&a.enable(22),M.push(a.mask),a.disableAll(),x.fog&&a.enable(0),x.useFog&&a.enable(1),x.flatShading&&a.enable(2),x.logarithmicDepthBuffer&&a.enable(3),x.reversedDepthBuffer&&a.enable(4),x.skinning&&a.enable(5),x.morphTargets&&a.enable(6),x.morphNormals&&a.enable(7),x.morphColors&&a.enable(8),x.premultipliedAlpha&&a.enable(9),x.shadowMapEnabled&&a.enable(10),x.doubleSided&&a.enable(11),x.flipSided&&a.enable(12),x.useDepthPacking&&a.enable(13),x.dithering&&a.enable(14),x.transmission&&a.enable(15),x.sheen&&a.enable(16),x.opaque&&a.enable(17),x.pointsUvs&&a.enable(18),x.decodeVideoTexture&&a.enable(19),x.decodeVideoTextureEmissive&&a.enable(20),x.alphaToCoverage&&a.enable(21),M.push(a.mask)}function v(M){const x=g[M.type];let L;if(x){const N=Qt[x];L=yu.clone(N.uniforms)}else L=M.uniforms;return L}function A(M,x){let L;for(let N=0,H=u.length;N<H;N++){const k=u[N];if(k.cacheKey===x){L=k,++L.usedTimes;break}}return L===void 0&&(L=new Dm(i,x,M,o),u.push(L)),L}function T(M){if(--M.usedTimes===0){const x=u.indexOf(M);u[x]=u[u.length-1],u.pop(),M.destroy()}}function R(M){c.remove(M)}function P(){c.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:v,acquireProgram:A,releaseProgram:T,releaseShaderCache:R,programs:u,dispose:P}}function Om(){let i=new WeakMap;function e(r){return i.has(r)}function t(r){let a=i.get(r);return a===void 0&&(a={},i.set(r,a)),a}function n(r){i.delete(r)}function s(r,a,c){i.get(r)[a]=c}function o(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:o}}function Bm(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Zc(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Jc(){const i=[];let e=0;const t=[],n=[],s=[];function o(){e=0,t.length=0,n.length=0,s.length=0}function r(h,p,d,g,_,m){let f=i[e];return f===void 0?(f={id:h.id,object:h,geometry:p,material:d,groupOrder:g,renderOrder:h.renderOrder,z:_,group:m},i[e]=f):(f.id=h.id,f.object=h,f.geometry=p,f.material=d,f.groupOrder=g,f.renderOrder=h.renderOrder,f.z=_,f.group=m),e++,f}function a(h,p,d,g,_,m){const f=r(h,p,d,g,_,m);d.transmission>0?n.push(f):d.transparent===!0?s.push(f):t.push(f)}function c(h,p,d,g,_,m){const f=r(h,p,d,g,_,m);d.transmission>0?n.unshift(f):d.transparent===!0?s.unshift(f):t.unshift(f)}function l(h,p){t.length>1&&t.sort(h||Bm),n.length>1&&n.sort(p||Zc),s.length>1&&s.sort(p||Zc)}function u(){for(let h=e,p=i.length;h<p;h++){const d=i[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:s,init:o,push:a,unshift:c,finish:u,sort:l}}function Hm(){let i=new WeakMap;function e(n,s){const o=i.get(n);let r;return o===void 0?(r=new Jc,i.set(n,[r])):s>=o.length?(r=new Jc,o.push(r)):r=o[s],r}function t(){i=new WeakMap}return{get:e,dispose:t}}function Vm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new z,color:new be};break;case"SpotLight":t={position:new z,direction:new z,color:new be,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new z,color:new be,distance:0,decay:0};break;case"HemisphereLight":t={direction:new z,skyColor:new be,groundColor:new be};break;case"RectAreaLight":t={color:new be,position:new z,halfWidth:new z,halfHeight:new z};break}return i[e.id]=t,t}}}function km(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Gm=0;function Wm(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function $m(i){const e=new Vm,t=km(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new z);const s=new z,o=new We,r=new We;function a(l){let u=0,h=0,p=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let d=0,g=0,_=0,m=0,f=0,E=0,w=0,v=0,A=0,T=0,R=0;l.sort(Wm);for(let M=0,x=l.length;M<x;M++){const L=l[M],N=L.color,H=L.intensity,k=L.distance,X=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)u+=N.r*H,h+=N.g*H,p+=N.b*H;else if(L.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(L.sh.coefficients[W],H);R++}else if(L.isDirectionalLight){const W=e.get(L);if(W.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const te=L.shadow,V=t.get(L);V.shadowIntensity=te.intensity,V.shadowBias=te.bias,V.shadowNormalBias=te.normalBias,V.shadowRadius=te.radius,V.shadowMapSize=te.mapSize,n.directionalShadow[d]=V,n.directionalShadowMap[d]=X,n.directionalShadowMatrix[d]=L.shadow.matrix,E++}n.directional[d]=W,d++}else if(L.isSpotLight){const W=e.get(L);W.position.setFromMatrixPosition(L.matrixWorld),W.color.copy(N).multiplyScalar(H),W.distance=k,W.coneCos=Math.cos(L.angle),W.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),W.decay=L.decay,n.spot[_]=W;const te=L.shadow;if(L.map&&(n.spotLightMap[A]=L.map,A++,te.updateMatrices(L),L.castShadow&&T++),n.spotLightMatrix[_]=te.matrix,L.castShadow){const V=t.get(L);V.shadowIntensity=te.intensity,V.shadowBias=te.bias,V.shadowNormalBias=te.normalBias,V.shadowRadius=te.radius,V.shadowMapSize=te.mapSize,n.spotShadow[_]=V,n.spotShadowMap[_]=X,v++}_++}else if(L.isRectAreaLight){const W=e.get(L);W.color.copy(N).multiplyScalar(H),W.halfWidth.set(L.width*.5,0,0),W.halfHeight.set(0,L.height*.5,0),n.rectArea[m]=W,m++}else if(L.isPointLight){const W=e.get(L);if(W.color.copy(L.color).multiplyScalar(L.intensity),W.distance=L.distance,W.decay=L.decay,L.castShadow){const te=L.shadow,V=t.get(L);V.shadowIntensity=te.intensity,V.shadowBias=te.bias,V.shadowNormalBias=te.normalBias,V.shadowRadius=te.radius,V.shadowMapSize=te.mapSize,V.shadowCameraNear=te.camera.near,V.shadowCameraFar=te.camera.far,n.pointShadow[g]=V,n.pointShadowMap[g]=X,n.pointShadowMatrix[g]=L.shadow.matrix,w++}n.point[g]=W,g++}else if(L.isHemisphereLight){const W=e.get(L);W.skyColor.copy(L.color).multiplyScalar(H),W.groundColor.copy(L.groundColor).multiplyScalar(H),n.hemi[f]=W,f++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=se.LTC_FLOAT_1,n.rectAreaLTC2=se.LTC_FLOAT_2):(n.rectAreaLTC1=se.LTC_HALF_1,n.rectAreaLTC2=se.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=p;const P=n.hash;(P.directionalLength!==d||P.pointLength!==g||P.spotLength!==_||P.rectAreaLength!==m||P.hemiLength!==f||P.numDirectionalShadows!==E||P.numPointShadows!==w||P.numSpotShadows!==v||P.numSpotMaps!==A||P.numLightProbes!==R)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=w,n.pointShadowMap.length=w,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=w,n.spotLightMatrix.length=v+A-T,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=R,P.directionalLength=d,P.pointLength=g,P.spotLength=_,P.rectAreaLength=m,P.hemiLength=f,P.numDirectionalShadows=E,P.numPointShadows=w,P.numSpotShadows=v,P.numSpotMaps=A,P.numLightProbes=R,n.version=Gm++)}function c(l,u){let h=0,p=0,d=0,g=0,_=0;const m=u.matrixWorldInverse;for(let f=0,E=l.length;f<E;f++){const w=l[f];if(w.isDirectionalLight){const v=n.directional[h];v.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),h++}else if(w.isSpotLight){const v=n.spot[d];v.position.setFromMatrixPosition(w.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),d++}else if(w.isRectAreaLight){const v=n.rectArea[g];v.position.setFromMatrixPosition(w.matrixWorld),v.position.applyMatrix4(m),r.identity(),o.copy(w.matrixWorld),o.premultiply(m),r.extractRotation(o),v.halfWidth.set(w.width*.5,0,0),v.halfHeight.set(0,w.height*.5,0),v.halfWidth.applyMatrix4(r),v.halfHeight.applyMatrix4(r),g++}else if(w.isPointLight){const v=n.point[p];v.position.setFromMatrixPosition(w.matrixWorld),v.position.applyMatrix4(m),p++}else if(w.isHemisphereLight){const v=n.hemi[_];v.direction.setFromMatrixPosition(w.matrixWorld),v.direction.transformDirection(m),_++}}}return{setup:a,setupView:c,state:n}}function Kc(i){const e=new $m(i),t=[],n=[];function s(u){l.camera=u,t.length=0,n.length=0}function o(u){t.push(u)}function r(u){n.push(u)}function a(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:o,pushShadow:r}}function Xm(i){let e=new WeakMap;function t(s,o=0){const r=e.get(s);let a;return r===void 0?(a=new Kc(i),e.set(s,[a])):o>=r.length?(a=new Kc(i),r.push(a)):a=r[o],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const qm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ym=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Zm(i,e,t){let n=new ya;const s=new oe,o=new oe,r=new Qe,a=new mp({depthPacking:zh}),c=new gp,l={},u=t.maxTextureSize,h={[zn]:Ct,[Ct]:zn,[bt]:bt},p=new Ht({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new oe},radius:{value:4}},vertexShader:qm,fragmentShader:Ym}),d=p.clone();d.defines.HORIZONTAL_PASS=1;const g=new pt;g.setAttribute("position",new Bt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new we(g,p),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=el;let f=this.type;this.render=function(T,R,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const M=i.getRenderTarget(),x=i.getActiveCubeFace(),L=i.getActiveMipmapLevel(),N=i.state;N.setBlending(bn),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const H=f!==mn&&this.type===mn,k=f===mn&&this.type!==mn;for(let X=0,W=T.length;X<W;X++){const te=T[X],V=te.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",te,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);const re=V.getFrameExtents();if(s.multiply(re),o.copy(V.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(o.x=Math.floor(u/re.x),s.x=o.x*re.x,V.mapSize.x=o.x),s.y>u&&(o.y=Math.floor(u/re.y),s.y=o.y*re.y,V.mapSize.y=o.y)),V.map===null||H===!0||k===!0){const Ee=this.type!==mn?{minFilter:Ot,magFilter:Ot}:{};V.map!==null&&V.map.dispose(),V.map=new Yn(s.x,s.y,Ee),V.map.texture.name=te.name+".shadowMap",V.camera.updateProjectionMatrix()}i.setRenderTarget(V.map),i.clear();const he=V.getViewportCount();for(let Ee=0;Ee<he;Ee++){const Ve=V.getViewport(Ee);r.set(o.x*Ve.x,o.y*Ve.y,o.x*Ve.z,o.y*Ve.w),N.viewport(r),V.updateMatrices(te,Ee),n=V.getFrustum(),v(R,P,V.camera,te,this.type)}V.isPointLightShadow!==!0&&this.type===mn&&E(V,P),V.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(M,x,L)};function E(T,R){const P=e.update(_);p.defines.VSM_SAMPLES!==T.blurSamples&&(p.defines.VSM_SAMPLES=T.blurSamples,d.defines.VSM_SAMPLES=T.blurSamples,p.needsUpdate=!0,d.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Yn(s.x,s.y)),p.uniforms.shadow_pass.value=T.map.texture,p.uniforms.resolution.value=T.mapSize,p.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(R,null,P,p,_,null),d.uniforms.shadow_pass.value=T.mapPass.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(R,null,P,d,_,null)}function w(T,R,P,M){let x=null;const L=P.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(L!==void 0)x=L;else if(x=P.isPointLight===!0?c:a,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const N=x.uuid,H=R.uuid;let k=l[N];k===void 0&&(k={},l[N]=k);let X=k[H];X===void 0&&(X=x.clone(),k[H]=X,R.addEventListener("dispose",A)),x=X}if(x.visible=R.visible,x.wireframe=R.wireframe,M===mn?x.side=R.shadowSide!==null?R.shadowSide:R.side:x.side=R.shadowSide!==null?R.shadowSide:h[R.side],x.alphaMap=R.alphaMap,x.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,x.map=R.map,x.clipShadows=R.clipShadows,x.clippingPlanes=R.clippingPlanes,x.clipIntersection=R.clipIntersection,x.displacementMap=R.displacementMap,x.displacementScale=R.displacementScale,x.displacementBias=R.displacementBias,x.wireframeLinewidth=R.wireframeLinewidth,x.linewidth=R.linewidth,P.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const N=i.properties.get(x);N.light=P}return x}function v(T,R,P,M,x){if(T.visible===!1)return;if(T.layers.test(R.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&x===mn)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,T.matrixWorld);const H=e.update(T),k=T.material;if(Array.isArray(k)){const X=H.groups;for(let W=0,te=X.length;W<te;W++){const V=X[W],re=k[V.materialIndex];if(re&&re.visible){const he=w(T,re,M,x);T.onBeforeShadow(i,T,R,P,H,he,V),i.renderBufferDirect(P,null,H,he,T,V),T.onAfterShadow(i,T,R,P,H,he,V)}}}else if(k.visible){const X=w(T,k,M,x);T.onBeforeShadow(i,T,R,P,H,X,null),i.renderBufferDirect(P,null,H,X,T,null),T.onAfterShadow(i,T,R,P,H,X,null)}}const N=T.children;for(let H=0,k=N.length;H<k;H++)v(N[H],R,P,M,x)}function A(T){T.target.removeEventListener("dispose",A);for(const P in l){const M=l[P],x=T.target.uuid;x in M&&(M[x].dispose(),delete M[x])}}}const Jm={[mr]:gr,[_r]:xr,[vr]:Mr,[zi]:yr,[gr]:mr,[xr]:_r,[Mr]:vr,[yr]:zi};function Km(i,e){function t(){let D=!1;const ee=new Qe;let ie=null;const pe=new Qe(0,0,0,0);return{setMask:function(K){ie!==K&&!D&&(i.colorMask(K,K,K,K),ie=K)},setLocked:function(K){D=K},setClear:function(K,Y,me,De,nt){nt===!0&&(K*=De,Y*=De,me*=De),ee.set(K,Y,me,De),pe.equals(ee)===!1&&(i.clearColor(K,Y,me,De),pe.copy(ee))},reset:function(){D=!1,ie=null,pe.set(-1,0,0,0)}}}function n(){let D=!1,ee=!1,ie=null,pe=null,K=null;return{setReversed:function(Y){if(ee!==Y){const me=e.get("EXT_clip_control");Y?me.clipControlEXT(me.LOWER_LEFT_EXT,me.ZERO_TO_ONE_EXT):me.clipControlEXT(me.LOWER_LEFT_EXT,me.NEGATIVE_ONE_TO_ONE_EXT),ee=Y;const De=K;K=null,this.setClear(De)}},getReversed:function(){return ee},setTest:function(Y){Y?J(i.DEPTH_TEST):de(i.DEPTH_TEST)},setMask:function(Y){ie!==Y&&!D&&(i.depthMask(Y),ie=Y)},setFunc:function(Y){if(ee&&(Y=Jm[Y]),pe!==Y){switch(Y){case mr:i.depthFunc(i.NEVER);break;case gr:i.depthFunc(i.ALWAYS);break;case _r:i.depthFunc(i.LESS);break;case zi:i.depthFunc(i.LEQUAL);break;case vr:i.depthFunc(i.EQUAL);break;case yr:i.depthFunc(i.GEQUAL);break;case xr:i.depthFunc(i.GREATER);break;case Mr:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}pe=Y}},setLocked:function(Y){D=Y},setClear:function(Y){K!==Y&&(ee&&(Y=1-Y),i.clearDepth(Y),K=Y)},reset:function(){D=!1,ie=null,pe=null,K=null,ee=!1}}}function s(){let D=!1,ee=null,ie=null,pe=null,K=null,Y=null,me=null,De=null,nt=null;return{setTest:function(Ye){D||(Ye?J(i.STENCIL_TEST):de(i.STENCIL_TEST))},setMask:function(Ye){ee!==Ye&&!D&&(i.stencilMask(Ye),ee=Ye)},setFunc:function(Ye,ln,jt){(ie!==Ye||pe!==ln||K!==jt)&&(i.stencilFunc(Ye,ln,jt),ie=Ye,pe=ln,K=jt)},setOp:function(Ye,ln,jt){(Y!==Ye||me!==ln||De!==jt)&&(i.stencilOp(Ye,ln,jt),Y=Ye,me=ln,De=jt)},setLocked:function(Ye){D=Ye},setClear:function(Ye){nt!==Ye&&(i.clearStencil(Ye),nt=Ye)},reset:function(){D=!1,ee=null,ie=null,pe=null,K=null,Y=null,me=null,De=null,nt=null}}}const o=new t,r=new n,a=new s,c=new WeakMap,l=new WeakMap;let u={},h={},p=new WeakMap,d=[],g=null,_=!1,m=null,f=null,E=null,w=null,v=null,A=null,T=null,R=new be(0,0,0),P=0,M=!1,x=null,L=null,N=null,H=null,k=null;const X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,te=0;const V=i.getParameter(i.VERSION);V.indexOf("WebGL")!==-1?(te=parseFloat(/^WebGL (\d)/.exec(V)[1]),W=te>=1):V.indexOf("OpenGL ES")!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),W=te>=2);let re=null,he={};const Ee=i.getParameter(i.SCISSOR_BOX),Ve=i.getParameter(i.VIEWPORT),tt=new Qe().fromArray(Ee),st=new Qe().fromArray(Ve);function qe(D,ee,ie,pe){const K=new Uint8Array(4),Y=i.createTexture();i.bindTexture(D,Y),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let me=0;me<ie;me++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(ee,0,i.RGBA,1,1,pe,0,i.RGBA,i.UNSIGNED_BYTE,K):i.texImage2D(ee+me,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,K);return Y}const q={};q[i.TEXTURE_2D]=qe(i.TEXTURE_2D,i.TEXTURE_2D,1),q[i.TEXTURE_CUBE_MAP]=qe(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),q[i.TEXTURE_2D_ARRAY]=qe(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),q[i.TEXTURE_3D]=qe(i.TEXTURE_3D,i.TEXTURE_3D,1,1),o.setClear(0,0,0,1),r.setClear(1),a.setClear(0),J(i.DEPTH_TEST),r.setFunc(zi),Ce(!1),ge(Na),J(i.CULL_FACE),ot(bn);function J(D){u[D]!==!0&&(i.enable(D),u[D]=!0)}function de(D){u[D]!==!1&&(i.disable(D),u[D]=!1)}function Le(D,ee){return h[D]!==ee?(i.bindFramebuffer(D,ee),h[D]=ee,D===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=ee),D===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=ee),!0):!1}function Se(D,ee){let ie=d,pe=!1;if(D){ie=p.get(ee),ie===void 0&&(ie=[],p.set(ee,ie));const K=D.textures;if(ie.length!==K.length||ie[0]!==i.COLOR_ATTACHMENT0){for(let Y=0,me=K.length;Y<me;Y++)ie[Y]=i.COLOR_ATTACHMENT0+Y;ie.length=K.length,pe=!0}}else ie[0]!==i.BACK&&(ie[0]=i.BACK,pe=!0);pe&&i.drawBuffers(ie)}function Ge(D){return g!==D?(i.useProgram(D),g=D,!0):!1}const St={[kn]:i.FUNC_ADD,[eh]:i.FUNC_SUBTRACT,[th]:i.FUNC_REVERSE_SUBTRACT};St[nh]=i.MIN,St[ih]=i.MAX;const C={[sh]:i.ZERO,[oh]:i.ONE,[rh]:i.SRC_COLOR,[dr]:i.SRC_ALPHA,[ph]:i.SRC_ALPHA_SATURATE,[hh]:i.DST_COLOR,[ch]:i.DST_ALPHA,[ah]:i.ONE_MINUS_SRC_COLOR,[fr]:i.ONE_MINUS_SRC_ALPHA,[uh]:i.ONE_MINUS_DST_COLOR,[lh]:i.ONE_MINUS_DST_ALPHA,[dh]:i.CONSTANT_COLOR,[fh]:i.ONE_MINUS_CONSTANT_COLOR,[mh]:i.CONSTANT_ALPHA,[gh]:i.ONE_MINUS_CONSTANT_ALPHA};function ot(D,ee,ie,pe,K,Y,me,De,nt,Ye){if(D===bn){_===!0&&(de(i.BLEND),_=!1);return}if(_===!1&&(J(i.BLEND),_=!0),D!==Ql){if(D!==m||Ye!==M){if((f!==kn||v!==kn)&&(i.blendEquation(i.FUNC_ADD),f=kn,v=kn),Ye)switch(D){case Ei:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ai:i.blendFunc(i.ONE,i.ONE);break;case Fa:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Oa:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Ei:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ai:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Fa:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Oa:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}E=null,w=null,A=null,T=null,R.set(0,0,0),P=0,m=D,M=Ye}return}K=K||ee,Y=Y||ie,me=me||pe,(ee!==f||K!==v)&&(i.blendEquationSeparate(St[ee],St[K]),f=ee,v=K),(ie!==E||pe!==w||Y!==A||me!==T)&&(i.blendFuncSeparate(C[ie],C[pe],C[Y],C[me]),E=ie,w=pe,A=Y,T=me),(De.equals(R)===!1||nt!==P)&&(i.blendColor(De.r,De.g,De.b,nt),R.copy(De),P=nt),m=D,M=!1}function Ie(D,ee){D.side===bt?de(i.CULL_FACE):J(i.CULL_FACE);let ie=D.side===Ct;ee&&(ie=!ie),Ce(ie),D.blending===Ei&&D.transparent===!1?ot(bn):ot(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),r.setFunc(D.depthFunc),r.setTest(D.depthTest),r.setMask(D.depthWrite),o.setMask(D.colorWrite);const pe=D.stencilWrite;a.setTest(pe),pe&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),_e(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?J(i.SAMPLE_ALPHA_TO_COVERAGE):de(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ce(D){x!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),x=D)}function ge(D){D!==Jl?(J(i.CULL_FACE),D!==L&&(D===Na?i.cullFace(i.BACK):D===Kl?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):de(i.CULL_FACE),L=D}function rt(D){D!==N&&(W&&i.lineWidth(D),N=D)}function _e(D,ee,ie){D?(J(i.POLYGON_OFFSET_FILL),(H!==ee||k!==ie)&&(i.polygonOffset(ee,ie),H=ee,k=ie)):de(i.POLYGON_OFFSET_FILL)}function Oe(D){D?J(i.SCISSOR_TEST):de(i.SCISSOR_TEST)}function yt(D){D===void 0&&(D=i.TEXTURE0+X-1),re!==D&&(i.activeTexture(D),re=D)}function dt(D,ee,ie){ie===void 0&&(re===null?ie=i.TEXTURE0+X-1:ie=re);let pe=he[ie];pe===void 0&&(pe={type:void 0,texture:void 0},he[ie]=pe),(pe.type!==D||pe.texture!==ee)&&(re!==ie&&(i.activeTexture(ie),re=ie),i.bindTexture(D,ee||q[D]),pe.type=D,pe.texture=ee)}function b(){const D=he[re];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function y(){try{i.compressedTexImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function F(){try{i.compressedTexImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function $(){try{i.texSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Z(){try{i.texSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function G(){try{i.compressedTexSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Me(){try{i.compressedTexSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ne(){try{i.texStorage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ve(){try{i.texStorage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ye(){try{i.texImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Q(){try{i.texImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function le(D){tt.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),tt.copy(D))}function Re(D){st.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),st.copy(D))}function xe(D,ee){let ie=l.get(ee);ie===void 0&&(ie=new WeakMap,l.set(ee,ie));let pe=ie.get(D);pe===void 0&&(pe=i.getUniformBlockIndex(ee,D.name),ie.set(D,pe))}function ae(D,ee){const pe=l.get(ee).get(D);c.get(ee)!==pe&&(i.uniformBlockBinding(ee,pe,D.__bindingPointIndex),c.set(ee,pe))}function Ue(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),r.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},re=null,he={},h={},p=new WeakMap,d=[],g=null,_=!1,m=null,f=null,E=null,w=null,v=null,A=null,T=null,R=new be(0,0,0),P=0,M=!1,x=null,L=null,N=null,H=null,k=null,tt.set(0,0,i.canvas.width,i.canvas.height),st.set(0,0,i.canvas.width,i.canvas.height),o.reset(),r.reset(),a.reset()}return{buffers:{color:o,depth:r,stencil:a},enable:J,disable:de,bindFramebuffer:Le,drawBuffers:Se,useProgram:Ge,setBlending:ot,setMaterial:Ie,setFlipSided:Ce,setCullFace:ge,setLineWidth:rt,setPolygonOffset:_e,setScissorTest:Oe,activeTexture:yt,bindTexture:dt,unbindTexture:b,compressedTexImage2D:y,compressedTexImage3D:F,texImage2D:ye,texImage3D:Q,updateUBOMapping:xe,uniformBlockBinding:ae,texStorage2D:ne,texStorage3D:ve,texSubImage2D:$,texSubImage3D:Z,compressedTexSubImage2D:G,compressedTexSubImage3D:Me,scissor:le,viewport:Re,reset:Ue}}function jm(i,e,t,n,s,o,r){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new oe,u=new WeakMap;let h;const p=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,y){return d?new OffscreenCanvas(b,y):rs("canvas")}function _(b,y,F){let $=1;const Z=dt(b);if((Z.width>F||Z.height>F)&&($=F/Math.max(Z.width,Z.height)),$<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const G=Math.floor($*Z.width),Me=Math.floor($*Z.height);h===void 0&&(h=g(G,Me));const ne=y?g(G,Me):h;return ne.width=G,ne.height=Me,ne.getContext("2d").drawImage(b,0,0,G,Me),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+G+"x"+Me+")."),ne}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),b;return b}function m(b){return b.generateMipmaps}function f(b){i.generateMipmap(b)}function E(b){return b.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?i.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function w(b,y,F,$,Z=!1){if(b!==null){if(i[b]!==void 0)return i[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let G=y;if(y===i.RED&&(F===i.FLOAT&&(G=i.R32F),F===i.HALF_FLOAT&&(G=i.R16F),F===i.UNSIGNED_BYTE&&(G=i.R8)),y===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(G=i.R8UI),F===i.UNSIGNED_SHORT&&(G=i.R16UI),F===i.UNSIGNED_INT&&(G=i.R32UI),F===i.BYTE&&(G=i.R8I),F===i.SHORT&&(G=i.R16I),F===i.INT&&(G=i.R32I)),y===i.RG&&(F===i.FLOAT&&(G=i.RG32F),F===i.HALF_FLOAT&&(G=i.RG16F),F===i.UNSIGNED_BYTE&&(G=i.RG8)),y===i.RG_INTEGER&&(F===i.UNSIGNED_BYTE&&(G=i.RG8UI),F===i.UNSIGNED_SHORT&&(G=i.RG16UI),F===i.UNSIGNED_INT&&(G=i.RG32UI),F===i.BYTE&&(G=i.RG8I),F===i.SHORT&&(G=i.RG16I),F===i.INT&&(G=i.RG32I)),y===i.RGB_INTEGER&&(F===i.UNSIGNED_BYTE&&(G=i.RGB8UI),F===i.UNSIGNED_SHORT&&(G=i.RGB16UI),F===i.UNSIGNED_INT&&(G=i.RGB32UI),F===i.BYTE&&(G=i.RGB8I),F===i.SHORT&&(G=i.RGB16I),F===i.INT&&(G=i.RGB32I)),y===i.RGBA_INTEGER&&(F===i.UNSIGNED_BYTE&&(G=i.RGBA8UI),F===i.UNSIGNED_SHORT&&(G=i.RGBA16UI),F===i.UNSIGNED_INT&&(G=i.RGBA32UI),F===i.BYTE&&(G=i.RGBA8I),F===i.SHORT&&(G=i.RGBA16I),F===i.INT&&(G=i.RGBA32I)),y===i.RGB&&(F===i.UNSIGNED_INT_5_9_9_9_REV&&(G=i.RGB9_E5),F===i.UNSIGNED_INT_10F_11F_11F_REV&&(G=i.R11F_G11F_B10F)),y===i.RGBA){const Me=Z?ao:Xe.getTransfer($);F===i.FLOAT&&(G=i.RGBA32F),F===i.HALF_FLOAT&&(G=i.RGBA16F),F===i.UNSIGNED_BYTE&&(G=Me===je?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&(G=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(G=i.RGB5_A1)}return(G===i.R16F||G===i.R32F||G===i.RG16F||G===i.RG32F||G===i.RGBA16F||G===i.RGBA32F)&&e.get("EXT_color_buffer_float"),G}function v(b,y){let F;return b?y===null||y===qn||y===ns?F=i.DEPTH24_STENCIL8:y===nn?F=i.DEPTH32F_STENCIL8:y===ts&&(F=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===qn||y===ns?F=i.DEPTH_COMPONENT24:y===nn?F=i.DEPTH_COMPONENT32F:y===ts&&(F=i.DEPTH_COMPONENT16),F}function A(b,y){return m(b)===!0||b.isFramebufferTexture&&b.minFilter!==Ot&&b.minFilter!==tn?Math.log2(Math.max(y.width,y.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?y.mipmaps.length:1}function T(b){const y=b.target;y.removeEventListener("dispose",T),P(y),y.isVideoTexture&&u.delete(y)}function R(b){const y=b.target;y.removeEventListener("dispose",R),x(y)}function P(b){const y=n.get(b);if(y.__webglInit===void 0)return;const F=b.source,$=p.get(F);if($){const Z=$[y.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&M(b),Object.keys($).length===0&&p.delete(F)}n.remove(b)}function M(b){const y=n.get(b);i.deleteTexture(y.__webglTexture);const F=b.source,$=p.get(F);delete $[y.__cacheKey],r.memory.textures--}function x(b){const y=n.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),n.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(y.__webglFramebuffer[$]))for(let Z=0;Z<y.__webglFramebuffer[$].length;Z++)i.deleteFramebuffer(y.__webglFramebuffer[$][Z]);else i.deleteFramebuffer(y.__webglFramebuffer[$]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[$])}else{if(Array.isArray(y.__webglFramebuffer))for(let $=0;$<y.__webglFramebuffer.length;$++)i.deleteFramebuffer(y.__webglFramebuffer[$]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let $=0;$<y.__webglColorRenderbuffer.length;$++)y.__webglColorRenderbuffer[$]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[$]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const F=b.textures;for(let $=0,Z=F.length;$<Z;$++){const G=n.get(F[$]);G.__webglTexture&&(i.deleteTexture(G.__webglTexture),r.memory.textures--),n.remove(F[$])}n.remove(b)}let L=0;function N(){L=0}function H(){const b=L;return b>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+s.maxTextures),L+=1,b}function k(b){const y=[];return y.push(b.wrapS),y.push(b.wrapT),y.push(b.wrapR||0),y.push(b.magFilter),y.push(b.minFilter),y.push(b.anisotropy),y.push(b.internalFormat),y.push(b.format),y.push(b.type),y.push(b.generateMipmaps),y.push(b.premultiplyAlpha),y.push(b.flipY),y.push(b.unpackAlignment),y.push(b.colorSpace),y.join()}function X(b,y){const F=n.get(b);if(b.isVideoTexture&&Oe(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&F.__version!==b.version){const $=b.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(F,b,y);return}}else b.isExternalTexture&&(F.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+y)}function W(b,y){const F=n.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&F.__version!==b.version){q(F,b,y);return}t.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+y)}function te(b,y){const F=n.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&F.__version!==b.version){q(F,b,y);return}t.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+y)}function V(b,y){const F=n.get(b);if(b.version>0&&F.__version!==b.version){J(F,b,y);return}t.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+y)}const re={[Xn]:i.REPEAT,[Wn]:i.CLAMP_TO_EDGE,[Er]:i.MIRRORED_REPEAT},he={[Ot]:i.NEAREST,[Th]:i.NEAREST_MIPMAP_NEAREST,[gs]:i.NEAREST_MIPMAP_LINEAR,[tn]:i.LINEAR,[wo]:i.LINEAR_MIPMAP_NEAREST,[$n]:i.LINEAR_MIPMAP_LINEAR},Ee={[Ch]:i.NEVER,[Nh]:i.ALWAYS,[Ph]:i.LESS,[ll]:i.LEQUAL,[Lh]:i.EQUAL,[Uh]:i.GEQUAL,[Dh]:i.GREATER,[Ih]:i.NOTEQUAL};function Ve(b,y){if(y.type===nn&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===tn||y.magFilter===wo||y.magFilter===gs||y.magFilter===$n||y.minFilter===tn||y.minFilter===wo||y.minFilter===gs||y.minFilter===$n)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(b,i.TEXTURE_WRAP_S,re[y.wrapS]),i.texParameteri(b,i.TEXTURE_WRAP_T,re[y.wrapT]),(b===i.TEXTURE_3D||b===i.TEXTURE_2D_ARRAY)&&i.texParameteri(b,i.TEXTURE_WRAP_R,re[y.wrapR]),i.texParameteri(b,i.TEXTURE_MAG_FILTER,he[y.magFilter]),i.texParameteri(b,i.TEXTURE_MIN_FILTER,he[y.minFilter]),y.compareFunction&&(i.texParameteri(b,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(b,i.TEXTURE_COMPARE_FUNC,Ee[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Ot||y.minFilter!==gs&&y.minFilter!==$n||y.type===nn&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){const F=e.get("EXT_texture_filter_anisotropic");i.texParameterf(b,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function tt(b,y){let F=!1;b.__webglInit===void 0&&(b.__webglInit=!0,y.addEventListener("dispose",T));const $=y.source;let Z=p.get($);Z===void 0&&(Z={},p.set($,Z));const G=k(y);if(G!==b.__cacheKey){Z[G]===void 0&&(Z[G]={texture:i.createTexture(),usedTimes:0},r.memory.textures++,F=!0),Z[G].usedTimes++;const Me=Z[b.__cacheKey];Me!==void 0&&(Z[b.__cacheKey].usedTimes--,Me.usedTimes===0&&M(y)),b.__cacheKey=G,b.__webglTexture=Z[G].texture}return F}function st(b,y,F){return Math.floor(Math.floor(b/F)/y)}function qe(b,y,F,$){const G=b.updateRanges;if(G.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,y.width,y.height,F,$,y.data);else{G.sort((Q,le)=>Q.start-le.start);let Me=0;for(let Q=1;Q<G.length;Q++){const le=G[Me],Re=G[Q],xe=le.start+le.count,ae=st(Re.start,y.width,4),Ue=st(le.start,y.width,4);Re.start<=xe+1&&ae===Ue&&st(Re.start+Re.count-1,y.width,4)===ae?le.count=Math.max(le.count,Re.start+Re.count-le.start):(++Me,G[Me]=Re)}G.length=Me+1;const ne=i.getParameter(i.UNPACK_ROW_LENGTH),ve=i.getParameter(i.UNPACK_SKIP_PIXELS),ye=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,y.width);for(let Q=0,le=G.length;Q<le;Q++){const Re=G[Q],xe=Math.floor(Re.start/4),ae=Math.ceil(Re.count/4),Ue=xe%y.width,D=Math.floor(xe/y.width),ee=ae,ie=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ue),i.pixelStorei(i.UNPACK_SKIP_ROWS,D),t.texSubImage2D(i.TEXTURE_2D,0,Ue,D,ee,ie,F,$,y.data)}b.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ne),i.pixelStorei(i.UNPACK_SKIP_PIXELS,ve),i.pixelStorei(i.UNPACK_SKIP_ROWS,ye)}}function q(b,y,F){let $=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&($=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&($=i.TEXTURE_3D);const Z=tt(b,y),G=y.source;t.bindTexture($,b.__webglTexture,i.TEXTURE0+F);const Me=n.get(G);if(G.version!==Me.__version||Z===!0){t.activeTexture(i.TEXTURE0+F);const ne=Xe.getPrimaries(Xe.workingColorSpace),ve=y.colorSpace===en?null:Xe.getPrimaries(y.colorSpace),ye=y.colorSpace===en||ne===ve?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye);let Q=_(y.image,!1,s.maxTextureSize);Q=yt(y,Q);const le=o.convert(y.format,y.colorSpace),Re=o.convert(y.type);let xe=w(y.internalFormat,le,Re,y.colorSpace,y.isVideoTexture);Ve($,y);let ae;const Ue=y.mipmaps,D=y.isVideoTexture!==!0,ee=Me.__version===void 0||Z===!0,ie=G.dataReady,pe=A(y,Q);if(y.isDepthTexture)xe=v(y.format===ss,y.type),ee&&(D?t.texStorage2D(i.TEXTURE_2D,1,xe,Q.width,Q.height):t.texImage2D(i.TEXTURE_2D,0,xe,Q.width,Q.height,0,le,Re,null));else if(y.isDataTexture)if(Ue.length>0){D&&ee&&t.texStorage2D(i.TEXTURE_2D,pe,xe,Ue[0].width,Ue[0].height);for(let K=0,Y=Ue.length;K<Y;K++)ae=Ue[K],D?ie&&t.texSubImage2D(i.TEXTURE_2D,K,0,0,ae.width,ae.height,le,Re,ae.data):t.texImage2D(i.TEXTURE_2D,K,xe,ae.width,ae.height,0,le,Re,ae.data);y.generateMipmaps=!1}else D?(ee&&t.texStorage2D(i.TEXTURE_2D,pe,xe,Q.width,Q.height),ie&&qe(y,Q,le,Re)):t.texImage2D(i.TEXTURE_2D,0,xe,Q.width,Q.height,0,le,Re,Q.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){D&&ee&&t.texStorage3D(i.TEXTURE_2D_ARRAY,pe,xe,Ue[0].width,Ue[0].height,Q.depth);for(let K=0,Y=Ue.length;K<Y;K++)if(ae=Ue[K],y.format!==Zt)if(le!==null)if(D){if(ie)if(y.layerUpdates.size>0){const me=Ac(ae.width,ae.height,y.format,y.type);for(const De of y.layerUpdates){const nt=ae.data.subarray(De*me/ae.data.BYTES_PER_ELEMENT,(De+1)*me/ae.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,De,ae.width,ae.height,1,le,nt)}y.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,0,ae.width,ae.height,Q.depth,le,ae.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,K,xe,ae.width,ae.height,Q.depth,0,ae.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?ie&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,0,ae.width,ae.height,Q.depth,le,Re,ae.data):t.texImage3D(i.TEXTURE_2D_ARRAY,K,xe,ae.width,ae.height,Q.depth,0,le,Re,ae.data)}else{D&&ee&&t.texStorage2D(i.TEXTURE_2D,pe,xe,Ue[0].width,Ue[0].height);for(let K=0,Y=Ue.length;K<Y;K++)ae=Ue[K],y.format!==Zt?le!==null?D?ie&&t.compressedTexSubImage2D(i.TEXTURE_2D,K,0,0,ae.width,ae.height,le,ae.data):t.compressedTexImage2D(i.TEXTURE_2D,K,xe,ae.width,ae.height,0,ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?ie&&t.texSubImage2D(i.TEXTURE_2D,K,0,0,ae.width,ae.height,le,Re,ae.data):t.texImage2D(i.TEXTURE_2D,K,xe,ae.width,ae.height,0,le,Re,ae.data)}else if(y.isDataArrayTexture)if(D){if(ee&&t.texStorage3D(i.TEXTURE_2D_ARRAY,pe,xe,Q.width,Q.height,Q.depth),ie)if(y.layerUpdates.size>0){const K=Ac(Q.width,Q.height,y.format,y.type);for(const Y of y.layerUpdates){const me=Q.data.subarray(Y*K/Q.data.BYTES_PER_ELEMENT,(Y+1)*K/Q.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Y,Q.width,Q.height,1,le,Re,me)}y.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,le,Re,Q.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,xe,Q.width,Q.height,Q.depth,0,le,Re,Q.data);else if(y.isData3DTexture)D?(ee&&t.texStorage3D(i.TEXTURE_3D,pe,xe,Q.width,Q.height,Q.depth),ie&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,le,Re,Q.data)):t.texImage3D(i.TEXTURE_3D,0,xe,Q.width,Q.height,Q.depth,0,le,Re,Q.data);else if(y.isFramebufferTexture){if(ee)if(D)t.texStorage2D(i.TEXTURE_2D,pe,xe,Q.width,Q.height);else{let K=Q.width,Y=Q.height;for(let me=0;me<pe;me++)t.texImage2D(i.TEXTURE_2D,me,xe,K,Y,0,le,Re,null),K>>=1,Y>>=1}}else if(Ue.length>0){if(D&&ee){const K=dt(Ue[0]);t.texStorage2D(i.TEXTURE_2D,pe,xe,K.width,K.height)}for(let K=0,Y=Ue.length;K<Y;K++)ae=Ue[K],D?ie&&t.texSubImage2D(i.TEXTURE_2D,K,0,0,le,Re,ae):t.texImage2D(i.TEXTURE_2D,K,xe,le,Re,ae);y.generateMipmaps=!1}else if(D){if(ee){const K=dt(Q);t.texStorage2D(i.TEXTURE_2D,pe,xe,K.width,K.height)}ie&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,le,Re,Q)}else t.texImage2D(i.TEXTURE_2D,0,xe,le,Re,Q);m(y)&&f($),Me.__version=G.version,y.onUpdate&&y.onUpdate(y)}b.__version=y.version}function J(b,y,F){if(y.image.length!==6)return;const $=tt(b,y),Z=y.source;t.bindTexture(i.TEXTURE_CUBE_MAP,b.__webglTexture,i.TEXTURE0+F);const G=n.get(Z);if(Z.version!==G.__version||$===!0){t.activeTexture(i.TEXTURE0+F);const Me=Xe.getPrimaries(Xe.workingColorSpace),ne=y.colorSpace===en?null:Xe.getPrimaries(y.colorSpace),ve=y.colorSpace===en||Me===ne?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve);const ye=y.isCompressedTexture||y.image[0].isCompressedTexture,Q=y.image[0]&&y.image[0].isDataTexture,le=[];for(let Y=0;Y<6;Y++)!ye&&!Q?le[Y]=_(y.image[Y],!0,s.maxCubemapSize):le[Y]=Q?y.image[Y].image:y.image[Y],le[Y]=yt(y,le[Y]);const Re=le[0],xe=o.convert(y.format,y.colorSpace),ae=o.convert(y.type),Ue=w(y.internalFormat,xe,ae,y.colorSpace),D=y.isVideoTexture!==!0,ee=G.__version===void 0||$===!0,ie=Z.dataReady;let pe=A(y,Re);Ve(i.TEXTURE_CUBE_MAP,y);let K;if(ye){D&&ee&&t.texStorage2D(i.TEXTURE_CUBE_MAP,pe,Ue,Re.width,Re.height);for(let Y=0;Y<6;Y++){K=le[Y].mipmaps;for(let me=0;me<K.length;me++){const De=K[me];y.format!==Zt?xe!==null?D?ie&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,me,0,0,De.width,De.height,xe,De.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,me,Ue,De.width,De.height,0,De.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,me,0,0,De.width,De.height,xe,ae,De.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,me,Ue,De.width,De.height,0,xe,ae,De.data)}}}else{if(K=y.mipmaps,D&&ee){K.length>0&&pe++;const Y=dt(le[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,pe,Ue,Y.width,Y.height)}for(let Y=0;Y<6;Y++)if(Q){D?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,le[Y].width,le[Y].height,xe,ae,le[Y].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,Ue,le[Y].width,le[Y].height,0,xe,ae,le[Y].data);for(let me=0;me<K.length;me++){const nt=K[me].image[Y].image;D?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,me+1,0,0,nt.width,nt.height,xe,ae,nt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,me+1,Ue,nt.width,nt.height,0,xe,ae,nt.data)}}else{D?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,xe,ae,le[Y]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,Ue,xe,ae,le[Y]);for(let me=0;me<K.length;me++){const De=K[me];D?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,me+1,0,0,xe,ae,De.image[Y]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,me+1,Ue,xe,ae,De.image[Y])}}}m(y)&&f(i.TEXTURE_CUBE_MAP),G.__version=Z.version,y.onUpdate&&y.onUpdate(y)}b.__version=y.version}function de(b,y,F,$,Z,G){const Me=o.convert(F.format,F.colorSpace),ne=o.convert(F.type),ve=w(F.internalFormat,Me,ne,F.colorSpace),ye=n.get(y),Q=n.get(F);if(Q.__renderTarget=y,!ye.__hasExternalTextures){const le=Math.max(1,y.width>>G),Re=Math.max(1,y.height>>G);Z===i.TEXTURE_3D||Z===i.TEXTURE_2D_ARRAY?t.texImage3D(Z,G,ve,le,Re,y.depth,0,Me,ne,null):t.texImage2D(Z,G,ve,le,Re,0,Me,ne,null)}t.bindFramebuffer(i.FRAMEBUFFER,b),_e(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,$,Z,Q.__webglTexture,0,rt(y)):(Z===i.TEXTURE_2D||Z>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,$,Z,Q.__webglTexture,G),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Le(b,y,F){if(i.bindRenderbuffer(i.RENDERBUFFER,b),y.depthBuffer){const $=y.depthTexture,Z=$&&$.isDepthTexture?$.type:null,G=v(y.stencilBuffer,Z),Me=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ne=rt(y);_e(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ne,G,y.width,y.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,ne,G,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,G,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Me,i.RENDERBUFFER,b)}else{const $=y.textures;for(let Z=0;Z<$.length;Z++){const G=$[Z],Me=o.convert(G.format,G.colorSpace),ne=o.convert(G.type),ve=w(G.internalFormat,Me,ne,G.colorSpace),ye=rt(y);F&&_e(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ye,ve,y.width,y.height):_e(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ye,ve,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,ve,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Se(b,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,b),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const $=n.get(y.depthTexture);$.__renderTarget=y,(!$.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),X(y.depthTexture,0);const Z=$.__webglTexture,G=rt(y);if(y.depthTexture.format===is)_e(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0,G):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0);else if(y.depthTexture.format===ss)_e(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0,G):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function Ge(b){const y=n.get(b),F=b.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==b.depthTexture){const $=b.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),$){const Z=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,$.removeEventListener("dispose",Z)};$.addEventListener("dispose",Z),y.__depthDisposeCallback=Z}y.__boundDepthTexture=$}if(b.depthTexture&&!y.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");const $=b.texture.mipmaps;$&&$.length>0?Se(y.__webglFramebuffer[0],b):Se(y.__webglFramebuffer,b)}else if(F){y.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[$]),y.__webglDepthbuffer[$]===void 0)y.__webglDepthbuffer[$]=i.createRenderbuffer(),Le(y.__webglDepthbuffer[$],b,!1);else{const Z=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,G=y.__webglDepthbuffer[$];i.bindRenderbuffer(i.RENDERBUFFER,G),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,G)}}else{const $=b.texture.mipmaps;if($&&$.length>0?t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),Le(y.__webglDepthbuffer,b,!1);else{const Z=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,G=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,G),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,G)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function St(b,y,F){const $=n.get(b);y!==void 0&&de($.__webglFramebuffer,b,b.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&Ge(b)}function C(b){const y=b.texture,F=n.get(b),$=n.get(y);b.addEventListener("dispose",R);const Z=b.textures,G=b.isWebGLCubeRenderTarget===!0,Me=Z.length>1;if(Me||($.__webglTexture===void 0&&($.__webglTexture=i.createTexture()),$.__version=y.version,r.memory.textures++),G){F.__webglFramebuffer=[];for(let ne=0;ne<6;ne++)if(y.mipmaps&&y.mipmaps.length>0){F.__webglFramebuffer[ne]=[];for(let ve=0;ve<y.mipmaps.length;ve++)F.__webglFramebuffer[ne][ve]=i.createFramebuffer()}else F.__webglFramebuffer[ne]=i.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){F.__webglFramebuffer=[];for(let ne=0;ne<y.mipmaps.length;ne++)F.__webglFramebuffer[ne]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(Me)for(let ne=0,ve=Z.length;ne<ve;ne++){const ye=n.get(Z[ne]);ye.__webglTexture===void 0&&(ye.__webglTexture=i.createTexture(),r.memory.textures++)}if(b.samples>0&&_e(b)===!1){F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let ne=0;ne<Z.length;ne++){const ve=Z[ne];F.__webglColorRenderbuffer[ne]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[ne]);const ye=o.convert(ve.format,ve.colorSpace),Q=o.convert(ve.type),le=w(ve.internalFormat,ye,Q,ve.colorSpace,b.isXRRenderTarget===!0),Re=rt(b);i.renderbufferStorageMultisample(i.RENDERBUFFER,Re,le,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ne,i.RENDERBUFFER,F.__webglColorRenderbuffer[ne])}i.bindRenderbuffer(i.RENDERBUFFER,null),b.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),Le(F.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(G){t.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),Ve(i.TEXTURE_CUBE_MAP,y);for(let ne=0;ne<6;ne++)if(y.mipmaps&&y.mipmaps.length>0)for(let ve=0;ve<y.mipmaps.length;ve++)de(F.__webglFramebuffer[ne][ve],b,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ve);else de(F.__webglFramebuffer[ne],b,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0);m(y)&&f(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Me){for(let ne=0,ve=Z.length;ne<ve;ne++){const ye=Z[ne],Q=n.get(ye);let le=i.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(le=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(le,Q.__webglTexture),Ve(le,ye),de(F.__webglFramebuffer,b,ye,i.COLOR_ATTACHMENT0+ne,le,0),m(ye)&&f(le)}t.unbindTexture()}else{let ne=i.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(ne=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ne,$.__webglTexture),Ve(ne,y),y.mipmaps&&y.mipmaps.length>0)for(let ve=0;ve<y.mipmaps.length;ve++)de(F.__webglFramebuffer[ve],b,y,i.COLOR_ATTACHMENT0,ne,ve);else de(F.__webglFramebuffer,b,y,i.COLOR_ATTACHMENT0,ne,0);m(y)&&f(ne),t.unbindTexture()}b.depthBuffer&&Ge(b)}function ot(b){const y=b.textures;for(let F=0,$=y.length;F<$;F++){const Z=y[F];if(m(Z)){const G=E(b),Me=n.get(Z).__webglTexture;t.bindTexture(G,Me),f(G),t.unbindTexture()}}}const Ie=[],Ce=[];function ge(b){if(b.samples>0){if(_e(b)===!1){const y=b.textures,F=b.width,$=b.height;let Z=i.COLOR_BUFFER_BIT;const G=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Me=n.get(b),ne=y.length>1;if(ne)for(let ye=0;ye<y.length;ye++)t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Me.__webglMultisampledFramebuffer);const ve=b.texture.mipmaps;ve&&ve.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Me.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Me.__webglFramebuffer);for(let ye=0;ye<y.length;ye++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(Z|=i.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(Z|=i.STENCIL_BUFFER_BIT)),ne){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Me.__webglColorRenderbuffer[ye]);const Q=n.get(y[ye]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Q,0)}i.blitFramebuffer(0,0,F,$,0,0,F,$,Z,i.NEAREST),c===!0&&(Ie.length=0,Ce.length=0,Ie.push(i.COLOR_ATTACHMENT0+ye),b.depthBuffer&&b.resolveDepthBuffer===!1&&(Ie.push(G),Ce.push(G),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ce)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ie))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ne)for(let ye=0;ye<y.length;ye++){t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.RENDERBUFFER,Me.__webglColorRenderbuffer[ye]);const Q=n.get(y[ye]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.TEXTURE_2D,Q,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Me.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&c){const y=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function rt(b){return Math.min(s.maxSamples,b.samples)}function _e(b){const y=n.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function Oe(b){const y=r.render.frame;u.get(b)!==y&&(u.set(b,y),b.update())}function yt(b,y){const F=b.colorSpace,$=b.format,Z=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||F!==Pi&&F!==en&&(Xe.getTransfer(F)===je?($!==Zt||Z!==rn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),y}function dt(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(l.width=b.naturalWidth||b.width,l.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(l.width=b.displayWidth,l.height=b.displayHeight):(l.width=b.width,l.height=b.height),l}this.allocateTextureUnit=H,this.resetTextureUnits=N,this.setTexture2D=X,this.setTexture2DArray=W,this.setTexture3D=te,this.setTextureCube=V,this.rebindTextures=St,this.setupRenderTarget=C,this.updateRenderTargetMipmap=ot,this.updateMultisampleRenderTarget=ge,this.setupDepthRenderbuffer=Ge,this.setupFrameBufferTexture=de,this.useMultisampledRTT=_e}function Qm(i,e){function t(n,s=en){let o;const r=Xe.getTransfer(s);if(n===rn)return i.UNSIGNED_BYTE;if(n===ca)return i.UNSIGNED_SHORT_4_4_4_4;if(n===la)return i.UNSIGNED_SHORT_5_5_5_1;if(n===sl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===ol)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===nl)return i.BYTE;if(n===il)return i.SHORT;if(n===ts)return i.UNSIGNED_SHORT;if(n===aa)return i.INT;if(n===qn)return i.UNSIGNED_INT;if(n===nn)return i.FLOAT;if(n===us)return i.HALF_FLOAT;if(n===rl)return i.ALPHA;if(n===al)return i.RGB;if(n===Zt)return i.RGBA;if(n===is)return i.DEPTH_COMPONENT;if(n===ss)return i.DEPTH_STENCIL;if(n===ha)return i.RED;if(n===ua)return i.RED_INTEGER;if(n===cl)return i.RG;if(n===pa)return i.RG_INTEGER;if(n===da)return i.RGBA_INTEGER;if(n===Qs||n===eo||n===to||n===no)if(r===je)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(n===Qs)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===eo)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===to)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===no)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(n===Qs)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===eo)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===to)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===no)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===br||n===Tr||n===Ar||n===zr)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(n===br)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Tr)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ar)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===zr)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Rr||n===Cr||n===Pr)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(n===Rr||n===Cr)return r===je?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(n===Pr)return r===je?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Lr||n===Dr||n===Ir||n===Ur||n===Nr||n===Fr||n===Or||n===Br||n===Hr||n===Vr||n===kr||n===Gr||n===Wr||n===$r)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(n===Lr)return r===je?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Dr)return r===je?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ir)return r===je?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ur)return r===je?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Nr)return r===je?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Fr)return r===je?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Or)return r===je?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Br)return r===je?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Hr)return r===je?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Vr)return r===je?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===kr)return r===je?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Gr)return r===je?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Wr)return r===je?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===$r)return r===je?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Xr||n===qr||n===Yr)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(n===Xr)return r===je?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===qr)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Yr)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Zr||n===Jr||n===Kr||n===jr)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(n===Zr)return o.COMPRESSED_RED_RGTC1_EXT;if(n===Jr)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Kr)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===jr)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ns?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const e1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,t1=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class n1{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new wl(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Ht({vertexShader:e1,fragmentShader:t1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new we(new Qn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class i1 extends Jn{constructor(e,t){super();const n=this;let s=null,o=1,r=null,a="local-floor",c=1,l=null,u=null,h=null,p=null,d=null,g=null;const _=typeof XRWebGLBinding<"u",m=new n1,f={},E=t.getContextAttributes();let w=null,v=null;const A=[],T=[],R=new oe;let P=null;const M=new Wt;M.viewport=new Qe;const x=new Wt;x.viewport=new Qe;const L=[M,x],N=new wp;let H=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let J=A[q];return J===void 0&&(J=new Wo,A[q]=J),J.getTargetRaySpace()},this.getControllerGrip=function(q){let J=A[q];return J===void 0&&(J=new Wo,A[q]=J),J.getGripSpace()},this.getHand=function(q){let J=A[q];return J===void 0&&(J=new Wo,A[q]=J),J.getHandSpace()};function X(q){const J=T.indexOf(q.inputSource);if(J===-1)return;const de=A[J];de!==void 0&&(de.update(q.inputSource,q.frame,l||r),de.dispatchEvent({type:q.type,data:q.inputSource}))}function W(){s.removeEventListener("select",X),s.removeEventListener("selectstart",X),s.removeEventListener("selectend",X),s.removeEventListener("squeeze",X),s.removeEventListener("squeezestart",X),s.removeEventListener("squeezeend",X),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",te);for(let q=0;q<A.length;q++){const J=T[q];J!==null&&(T[q]=null,A[q].disconnect(J))}H=null,k=null,m.reset();for(const q in f)delete f[q];e.setRenderTarget(w),d=null,p=null,h=null,s=null,v=null,qe.stop(),n.isPresenting=!1,e.setPixelRatio(P),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){o=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||r},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return p!==null?p:d},this.getBinding=function(){return h===null&&_&&(h=new XRWebGLBinding(s,t)),h},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(w=e.getRenderTarget(),s.addEventListener("select",X),s.addEventListener("selectstart",X),s.addEventListener("selectend",X),s.addEventListener("squeeze",X),s.addEventListener("squeezestart",X),s.addEventListener("squeezeend",X),s.addEventListener("end",W),s.addEventListener("inputsourceschange",te),E.xrCompatible!==!0&&await t.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(R),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let de=null,Le=null,Se=null;E.depth&&(Se=E.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,de=E.stencil?ss:is,Le=E.stencil?ns:qn);const Ge={colorFormat:t.RGBA8,depthFormat:Se,scaleFactor:o};h=this.getBinding(),p=h.createProjectionLayer(Ge),s.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),v=new Yn(p.textureWidth,p.textureHeight,{format:Zt,type:rn,depthTexture:new Sl(p.textureWidth,p.textureHeight,Le,void 0,void 0,void 0,void 0,void 0,void 0,de),stencilBuffer:E.stencil,colorSpace:e.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}else{const de={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:o};d=new XRWebGLLayer(s,t,de),s.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),v=new Yn(d.framebufferWidth,d.framebufferHeight,{format:Zt,type:rn,colorSpace:e.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,r=await s.requestReferenceSpace(a),qe.setContext(s),qe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function te(q){for(let J=0;J<q.removed.length;J++){const de=q.removed[J],Le=T.indexOf(de);Le>=0&&(T[Le]=null,A[Le].disconnect(de))}for(let J=0;J<q.added.length;J++){const de=q.added[J];let Le=T.indexOf(de);if(Le===-1){for(let Ge=0;Ge<A.length;Ge++)if(Ge>=T.length){T.push(de),Le=Ge;break}else if(T[Ge]===null){T[Ge]=de,Le=Ge;break}if(Le===-1)break}const Se=A[Le];Se&&Se.connect(de)}}const V=new z,re=new z;function he(q,J,de){V.setFromMatrixPosition(J.matrixWorld),re.setFromMatrixPosition(de.matrixWorld);const Le=V.distanceTo(re),Se=J.projectionMatrix.elements,Ge=de.projectionMatrix.elements,St=Se[14]/(Se[10]-1),C=Se[14]/(Se[10]+1),ot=(Se[9]+1)/Se[5],Ie=(Se[9]-1)/Se[5],Ce=(Se[8]-1)/Se[0],ge=(Ge[8]+1)/Ge[0],rt=St*Ce,_e=St*ge,Oe=Le/(-Ce+ge),yt=Oe*-Ce;if(J.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(yt),q.translateZ(Oe),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),Se[10]===-1)q.projectionMatrix.copy(J.projectionMatrix),q.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{const dt=St+Oe,b=C+Oe,y=rt-yt,F=_e+(Le-yt),$=ot*C/b*dt,Z=Ie*C/b*dt;q.projectionMatrix.makePerspective(y,F,$,Z,dt,b),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function Ee(q,J){J===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(J.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let J=q.near,de=q.far;m.texture!==null&&(m.depthNear>0&&(J=m.depthNear),m.depthFar>0&&(de=m.depthFar)),N.near=x.near=M.near=J,N.far=x.far=M.far=de,(H!==N.near||k!==N.far)&&(s.updateRenderState({depthNear:N.near,depthFar:N.far}),H=N.near,k=N.far),N.layers.mask=q.layers.mask|6,M.layers.mask=N.layers.mask&3,x.layers.mask=N.layers.mask&5;const Le=q.parent,Se=N.cameras;Ee(N,Le);for(let Ge=0;Ge<Se.length;Ge++)Ee(Se[Ge],Le);Se.length===2?he(N,M,x):N.projectionMatrix.copy(M.projectionMatrix),Ve(q,N,Le)};function Ve(q,J,de){de===null?q.matrix.copy(J.matrixWorld):(q.matrix.copy(de.matrixWorld),q.matrix.invert(),q.matrix.multiply(J.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(J.projectionMatrix),q.projectionMatrixInverse.copy(J.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=os*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(p===null&&d===null))return c},this.setFoveation=function(q){c=q,p!==null&&(p.fixedFoveation=q),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=q)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(N)},this.getCameraTexture=function(q){return f[q]};let tt=null;function st(q,J){if(u=J.getViewerPose(l||r),g=J,u!==null){const de=u.views;d!==null&&(e.setRenderTargetFramebuffer(v,d.framebuffer),e.setRenderTarget(v));let Le=!1;de.length!==N.cameras.length&&(N.cameras.length=0,Le=!0);for(let C=0;C<de.length;C++){const ot=de[C];let Ie=null;if(d!==null)Ie=d.getViewport(ot);else{const ge=h.getViewSubImage(p,ot);Ie=ge.viewport,C===0&&(e.setRenderTargetTextures(v,ge.colorTexture,ge.depthStencilTexture),e.setRenderTarget(v))}let Ce=L[C];Ce===void 0&&(Ce=new Wt,Ce.layers.enable(C),Ce.viewport=new Qe,L[C]=Ce),Ce.matrix.fromArray(ot.transform.matrix),Ce.matrix.decompose(Ce.position,Ce.quaternion,Ce.scale),Ce.projectionMatrix.fromArray(ot.projectionMatrix),Ce.projectionMatrixInverse.copy(Ce.projectionMatrix).invert(),Ce.viewport.set(Ie.x,Ie.y,Ie.width,Ie.height),C===0&&(N.matrix.copy(Ce.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),Le===!0&&N.cameras.push(Ce)}const Se=s.enabledFeatures;if(Se&&Se.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){h=n.getBinding();const C=h.getDepthInformation(de[0]);C&&C.isValid&&C.texture&&m.init(C,s.renderState)}if(Se&&Se.includes("camera-access")&&_){e.state.unbindTexture(),h=n.getBinding();for(let C=0;C<de.length;C++){const ot=de[C].camera;if(ot){let Ie=f[ot];Ie||(Ie=new wl,f[ot]=Ie);const Ce=h.getCameraImage(ot);Ie.sourceTexture=Ce}}}}for(let de=0;de<A.length;de++){const Le=T[de],Se=A[de];Le!==null&&Se!==void 0&&Se.update(Le,J,l||r)}tt&&tt(q,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),g=null}const qe=new Fl;qe.setAnimationLoop(st),this.setAnimationLoop=function(q){tt=q},this.dispose=function(){}}}const Bn=new Kt,s1=new We;function o1(i,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,ml(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,E,w,v){f.isMeshBasicMaterial||f.isMeshLambertMaterial?o(m,f):f.isMeshToonMaterial?(o(m,f),h(m,f)):f.isMeshPhongMaterial?(o(m,f),u(m,f)):f.isMeshStandardMaterial?(o(m,f),p(m,f),f.isMeshPhysicalMaterial&&d(m,f,v)):f.isMeshMatcapMaterial?(o(m,f),g(m,f)):f.isMeshDepthMaterial?o(m,f):f.isMeshDistanceMaterial?(o(m,f),_(m,f)):f.isMeshNormalMaterial?o(m,f):f.isLineBasicMaterial?(r(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?c(m,f,E,w):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function o(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Ct&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Ct&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const E=e.get(f),w=E.envMap,v=E.envMapRotation;w&&(m.envMap.value=w,Bn.copy(v),Bn.x*=-1,Bn.y*=-1,Bn.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Bn.y*=-1,Bn.z*=-1),m.envMapRotation.value.setFromMatrix4(s1.makeRotationFromEuler(Bn)),m.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function r(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,E,w){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*E,m.scale.value=w*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function h(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function p(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function d(m,f,E){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ct&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){const E=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function r1(i,e,t,n){let s={},o={},r=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(E,w){const v=w.program;n.uniformBlockBinding(E,v)}function l(E,w){let v=s[E.id];v===void 0&&(g(E),v=u(E),s[E.id]=v,E.addEventListener("dispose",m));const A=w.program;n.updateUBOMapping(E,A);const T=e.render.frame;o[E.id]!==T&&(p(E),o[E.id]=T)}function u(E){const w=h();E.__bindingPointIndex=w;const v=i.createBuffer(),A=E.__size,T=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,A,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,w,v),v}function h(){for(let E=0;E<a;E++)if(r.indexOf(E)===-1)return r.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(E){const w=s[E.id],v=E.uniforms,A=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let T=0,R=v.length;T<R;T++){const P=Array.isArray(v[T])?v[T]:[v[T]];for(let M=0,x=P.length;M<x;M++){const L=P[M];if(d(L,T,M,A)===!0){const N=L.__offset,H=Array.isArray(L.value)?L.value:[L.value];let k=0;for(let X=0;X<H.length;X++){const W=H[X],te=_(W);typeof W=="number"||typeof W=="boolean"?(L.__data[0]=W,i.bufferSubData(i.UNIFORM_BUFFER,N+k,L.__data)):W.isMatrix3?(L.__data[0]=W.elements[0],L.__data[1]=W.elements[1],L.__data[2]=W.elements[2],L.__data[3]=0,L.__data[4]=W.elements[3],L.__data[5]=W.elements[4],L.__data[6]=W.elements[5],L.__data[7]=0,L.__data[8]=W.elements[6],L.__data[9]=W.elements[7],L.__data[10]=W.elements[8],L.__data[11]=0):(W.toArray(L.__data,k),k+=te.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,N,L.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(E,w,v,A){const T=E.value,R=w+"_"+v;if(A[R]===void 0)return typeof T=="number"||typeof T=="boolean"?A[R]=T:A[R]=T.clone(),!0;{const P=A[R];if(typeof T=="number"||typeof T=="boolean"){if(P!==T)return A[R]=T,!0}else if(P.equals(T)===!1)return P.copy(T),!0}return!1}function g(E){const w=E.uniforms;let v=0;const A=16;for(let R=0,P=w.length;R<P;R++){const M=Array.isArray(w[R])?w[R]:[w[R]];for(let x=0,L=M.length;x<L;x++){const N=M[x],H=Array.isArray(N.value)?N.value:[N.value];for(let k=0,X=H.length;k<X;k++){const W=H[k],te=_(W),V=v%A,re=V%te.boundary,he=V+re;v+=re,he!==0&&A-he<te.storage&&(v+=A-he),N.__data=new Float32Array(te.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=v,v+=te.storage}}}const T=v%A;return T>0&&(v+=A-T),E.__size=v,E.__cache={},this}function _(E){const w={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(w.boundary=4,w.storage=4):E.isVector2?(w.boundary=8,w.storage=8):E.isVector3||E.isColor?(w.boundary=16,w.storage=12):E.isVector4?(w.boundary=16,w.storage=16):E.isMatrix3?(w.boundary=48,w.storage=48):E.isMatrix4?(w.boundary=64,w.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),w}function m(E){const w=E.target;w.removeEventListener("dispose",m);const v=r.indexOf(w.__bindingPointIndex);r.splice(v,1),i.deleteBuffer(s[w.id]),delete s[w.id],delete o[w.id]}function f(){for(const E in s)i.deleteBuffer(s[E]);r=[],s={},o={}}return{bind:c,update:l,dispose:f}}class y3{constructor(e={}){const{canvas:t=Qh(),context:n=null,depth:s=!0,stencil:o=!1,alpha:r=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:p=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=r;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,f=null;const E=[],w=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Tn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let A=!1;this._outputColorSpace=ut;let T=0,R=0,P=null,M=-1,x=null;const L=new Qe,N=new Qe;let H=null;const k=new be(0);let X=0,W=t.width,te=t.height,V=1,re=null,he=null;const Ee=new Qe(0,0,W,te),Ve=new Qe(0,0,W,te);let tt=!1;const st=new ya;let qe=!1,q=!1;const J=new We,de=new z,Le=new Qe,Se={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ge=!1;function St(){return P===null?V:1}let C=n;function ot(S,I){return t.getContext(S,I)}try{const S={alpha:!0,depth:s,stencil:o,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${oa}`),t.addEventListener("webglcontextlost",ie,!1),t.addEventListener("webglcontextrestored",pe,!1),t.addEventListener("webglcontextcreationerror",K,!1),C===null){const I="webgl2";if(C=ot(I,S),C===null)throw ot(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let Ie,Ce,ge,rt,_e,Oe,yt,dt,b,y,F,$,Z,G,Me,ne,ve,ye,Q,le,Re,xe,ae,Ue;function D(){Ie=new _f(C),Ie.init(),xe=new Qm(C,Ie),Ce=new hf(C,Ie,e,xe),ge=new Km(C,Ie),Ce.reversedDepthBuffer&&p&&ge.buffers.depth.setReversed(!0),rt=new xf(C),_e=new Om,Oe=new jm(C,Ie,ge,_e,Ce,xe,rt),yt=new pf(v),dt=new gf(v),b=new bp(C),ae=new cf(C,b),y=new vf(C,b,rt,ae),F=new Sf(C,y,b,rt),Q=new Mf(C,Ce,Oe),ne=new uf(_e),$=new Fm(v,yt,dt,Ie,Ce,ae,ne),Z=new o1(v,_e),G=new Hm,Me=new Xm(Ie),ye=new af(v,yt,dt,ge,F,d,c),ve=new Zm(v,F,Ce),Ue=new r1(C,rt,Ce,ge),le=new lf(C,Ie,rt),Re=new yf(C,Ie,rt),rt.programs=$.programs,v.capabilities=Ce,v.extensions=Ie,v.properties=_e,v.renderLists=G,v.shadowMap=ve,v.state=ge,v.info=rt}D();const ee=new i1(v,C);this.xr=ee,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){const S=Ie.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=Ie.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(S){S!==void 0&&(V=S,this.setSize(W,te,!1))},this.getSize=function(S){return S.set(W,te)},this.setSize=function(S,I,O=!0){if(ee.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=S,te=I,t.width=Math.floor(S*V),t.height=Math.floor(I*V),O===!0&&(t.style.width=S+"px",t.style.height=I+"px"),this.setViewport(0,0,S,I)},this.getDrawingBufferSize=function(S){return S.set(W*V,te*V).floor()},this.setDrawingBufferSize=function(S,I,O){W=S,te=I,V=O,t.width=Math.floor(S*O),t.height=Math.floor(I*O),this.setViewport(0,0,S,I)},this.getCurrentViewport=function(S){return S.copy(L)},this.getViewport=function(S){return S.copy(Ee)},this.setViewport=function(S,I,O,B){S.isVector4?Ee.set(S.x,S.y,S.z,S.w):Ee.set(S,I,O,B),ge.viewport(L.copy(Ee).multiplyScalar(V).round())},this.getScissor=function(S){return S.copy(Ve)},this.setScissor=function(S,I,O,B){S.isVector4?Ve.set(S.x,S.y,S.z,S.w):Ve.set(S,I,O,B),ge.scissor(N.copy(Ve).multiplyScalar(V).round())},this.getScissorTest=function(){return tt},this.setScissorTest=function(S){ge.setScissorTest(tt=S)},this.setOpaqueSort=function(S){re=S},this.setTransparentSort=function(S){he=S},this.getClearColor=function(S){return S.copy(ye.getClearColor())},this.setClearColor=function(){ye.setClearColor(...arguments)},this.getClearAlpha=function(){return ye.getClearAlpha()},this.setClearAlpha=function(){ye.setClearAlpha(...arguments)},this.clear=function(S=!0,I=!0,O=!0){let B=0;if(S){let U=!1;if(P!==null){const j=P.texture.format;U=j===da||j===pa||j===ua}if(U){const j=P.texture.type,ce=j===rn||j===qn||j===ts||j===ns||j===ca||j===la,fe=ye.getClearColor(),ue=ye.getClearAlpha(),ze=fe.r,Pe=fe.g,Te=fe.b;ce?(g[0]=ze,g[1]=Pe,g[2]=Te,g[3]=ue,C.clearBufferuiv(C.COLOR,0,g)):(_[0]=ze,_[1]=Pe,_[2]=Te,_[3]=ue,C.clearBufferiv(C.COLOR,0,_))}else B|=C.COLOR_BUFFER_BIT}I&&(B|=C.DEPTH_BUFFER_BIT),O&&(B|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ie,!1),t.removeEventListener("webglcontextrestored",pe,!1),t.removeEventListener("webglcontextcreationerror",K,!1),ye.dispose(),G.dispose(),Me.dispose(),_e.dispose(),yt.dispose(),dt.dispose(),F.dispose(),ae.dispose(),Ue.dispose(),$.dispose(),ee.dispose(),ee.removeEventListener("sessionstart",jt),ee.removeEventListener("sessionend",Ca),Ln.stop()};function ie(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function pe(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const S=rt.autoReset,I=ve.enabled,O=ve.autoUpdate,B=ve.needsUpdate,U=ve.type;D(),rt.autoReset=S,ve.enabled=I,ve.autoUpdate=O,ve.needsUpdate=B,ve.type=U}function K(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Y(S){const I=S.target;I.removeEventListener("dispose",Y),me(I)}function me(S){De(S),_e.remove(S)}function De(S){const I=_e.get(S).programs;I!==void 0&&(I.forEach(function(O){$.releaseProgram(O)}),S.isShaderMaterial&&$.releaseShaderCache(S))}this.renderBufferDirect=function(S,I,O,B,U,j){I===null&&(I=Se);const ce=U.isMesh&&U.matrixWorld.determinant()<0,fe=Wl(S,I,O,B,U);ge.setMaterial(B,ce);let ue=O.index,ze=1;if(B.wireframe===!0){if(ue=y.getWireframeAttribute(O),ue===void 0)return;ze=2}const Pe=O.drawRange,Te=O.attributes.position;let ke=Pe.start*ze,Ke=(Pe.start+Pe.count)*ze;j!==null&&(ke=Math.max(ke,j.start*ze),Ke=Math.min(Ke,(j.start+j.count)*ze)),ue!==null?(ke=Math.max(ke,0),Ke=Math.min(Ke,ue.count)):Te!=null&&(ke=Math.max(ke,0),Ke=Math.min(Ke,Te.count));const ht=Ke-ke;if(ht<0||ht===1/0)return;ae.setup(U,B,fe,O,ue);let it,et=le;if(ue!==null&&(it=b.get(ue),et=Re,et.setIndex(it)),U.isMesh)B.wireframe===!0?(ge.setLineWidth(B.wireframeLinewidth*St()),et.setMode(C.LINES)):et.setMode(C.TRIANGLES);else if(U.isLine){let Ae=B.linewidth;Ae===void 0&&(Ae=1),ge.setLineWidth(Ae*St()),U.isLineSegments?et.setMode(C.LINES):U.isLineLoop?et.setMode(C.LINE_LOOP):et.setMode(C.LINE_STRIP)}else U.isPoints?et.setMode(C.POINTS):U.isSprite&&et.setMode(C.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)as("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),et.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(Ie.get("WEBGL_multi_draw"))et.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const Ae=U._multiDrawStarts,at=U._multiDrawCounts,$e=U._multiDrawCount,Dt=ue?b.get(ue).bytesPerElement:1,ei=_e.get(B).currentProgram.getUniforms();for(let It=0;It<$e;It++)ei.setValue(C,"_gl_DrawID",It),et.render(Ae[It]/Dt,at[It])}else if(U.isInstancedMesh)et.renderInstances(ke,ht,U.count);else if(O.isInstancedBufferGeometry){const Ae=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,at=Math.min(O.instanceCount,Ae);et.renderInstances(ke,ht,at)}else et.render(ke,ht)};function nt(S,I,O){S.transparent===!0&&S.side===bt&&S.forceSinglePass===!1?(S.side=Ct,S.needsUpdate=!0,ms(S,I,O),S.side=zn,S.needsUpdate=!0,ms(S,I,O),S.side=bt):ms(S,I,O)}this.compile=function(S,I,O=null){O===null&&(O=S),f=Me.get(O),f.init(I),w.push(f),O.traverseVisible(function(U){U.isLight&&U.layers.test(I.layers)&&(f.pushLight(U),U.castShadow&&f.pushShadow(U))}),S!==O&&S.traverseVisible(function(U){U.isLight&&U.layers.test(I.layers)&&(f.pushLight(U),U.castShadow&&f.pushShadow(U))}),f.setupLights();const B=new Set;return S.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;const j=U.material;if(j)if(Array.isArray(j))for(let ce=0;ce<j.length;ce++){const fe=j[ce];nt(fe,O,U),B.add(fe)}else nt(j,O,U),B.add(j)}),f=w.pop(),B},this.compileAsync=function(S,I,O=null){const B=this.compile(S,I,O);return new Promise(U=>{function j(){if(B.forEach(function(ce){_e.get(ce).currentProgram.isReady()&&B.delete(ce)}),B.size===0){U(S);return}setTimeout(j,10)}Ie.get("KHR_parallel_shader_compile")!==null?j():setTimeout(j,10)})};let Ye=null;function ln(S){Ye&&Ye(S)}function jt(){Ln.stop()}function Ca(){Ln.start()}const Ln=new Fl;Ln.setAnimationLoop(ln),typeof self<"u"&&Ln.setContext(self),this.setAnimationLoop=function(S){Ye=S,ee.setAnimationLoop(S),S===null?Ln.stop():Ln.start()},ee.addEventListener("sessionstart",jt),ee.addEventListener("sessionend",Ca),this.render=function(S,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),ee.enabled===!0&&ee.isPresenting===!0&&(ee.cameraAutoUpdate===!0&&ee.updateCamera(I),I=ee.getCamera()),S.isScene===!0&&S.onBeforeRender(v,S,I,P),f=Me.get(S,w.length),f.init(I),w.push(f),J.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),st.setFromProjectionMatrix(J,sn,I.reversedDepth),q=this.localClippingEnabled,qe=ne.init(this.clippingPlanes,q),m=G.get(S,E.length),m.init(),E.push(m),ee.enabled===!0&&ee.isPresenting===!0){const j=v.xr.getDepthSensingMesh();j!==null&&Mo(j,I,-1/0,v.sortObjects)}Mo(S,I,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(re,he),Ge=ee.enabled===!1||ee.isPresenting===!1||ee.hasDepthSensing()===!1,Ge&&ye.addToRenderList(m,S),this.info.render.frame++,qe===!0&&ne.beginShadows();const O=f.state.shadowsArray;ve.render(O,S,I),qe===!0&&ne.endShadows(),this.info.autoReset===!0&&this.info.reset();const B=m.opaque,U=m.transmissive;if(f.setupLights(),I.isArrayCamera){const j=I.cameras;if(U.length>0)for(let ce=0,fe=j.length;ce<fe;ce++){const ue=j[ce];La(B,U,S,ue)}Ge&&ye.render(S);for(let ce=0,fe=j.length;ce<fe;ce++){const ue=j[ce];Pa(m,S,ue,ue.viewport)}}else U.length>0&&La(B,U,S,I),Ge&&ye.render(S),Pa(m,S,I);P!==null&&R===0&&(Oe.updateMultisampleRenderTarget(P),Oe.updateRenderTargetMipmap(P)),S.isScene===!0&&S.onAfterRender(v,S,I),ae.resetDefaultState(),M=-1,x=null,w.pop(),w.length>0?(f=w[w.length-1],qe===!0&&ne.setGlobalState(v.clippingPlanes,f.state.camera)):f=null,E.pop(),E.length>0?m=E[E.length-1]:m=null};function Mo(S,I,O,B){if(S.visible===!1)return;if(S.layers.test(I.layers)){if(S.isGroup)O=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(I);else if(S.isLight)f.pushLight(S),S.castShadow&&f.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||st.intersectsSprite(S)){B&&Le.setFromMatrixPosition(S.matrixWorld).applyMatrix4(J);const ce=F.update(S),fe=S.material;fe.visible&&m.push(S,ce,fe,O,Le.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||st.intersectsObject(S))){const ce=F.update(S),fe=S.material;if(B&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Le.copy(S.boundingSphere.center)):(ce.boundingSphere===null&&ce.computeBoundingSphere(),Le.copy(ce.boundingSphere.center)),Le.applyMatrix4(S.matrixWorld).applyMatrix4(J)),Array.isArray(fe)){const ue=ce.groups;for(let ze=0,Pe=ue.length;ze<Pe;ze++){const Te=ue[ze],ke=fe[Te.materialIndex];ke&&ke.visible&&m.push(S,ce,ke,O,Le.z,Te)}}else fe.visible&&m.push(S,ce,fe,O,Le.z,null)}}const j=S.children;for(let ce=0,fe=j.length;ce<fe;ce++)Mo(j[ce],I,O,B)}function Pa(S,I,O,B){const U=S.opaque,j=S.transmissive,ce=S.transparent;f.setupLightsView(O),qe===!0&&ne.setGlobalState(v.clippingPlanes,O),B&&ge.viewport(L.copy(B)),U.length>0&&fs(U,I,O),j.length>0&&fs(j,I,O),ce.length>0&&fs(ce,I,O),ge.buffers.depth.setTest(!0),ge.buffers.depth.setMask(!0),ge.buffers.color.setMask(!0),ge.setPolygonOffset(!1)}function La(S,I,O,B){if((O.isScene===!0?O.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[B.id]===void 0&&(f.state.transmissionRenderTarget[B.id]=new Yn(1,1,{generateMipmaps:!0,type:Ie.has("EXT_color_buffer_half_float")||Ie.has("EXT_color_buffer_float")?us:rn,minFilter:$n,samples:4,stencilBuffer:o,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Xe.workingColorSpace}));const j=f.state.transmissionRenderTarget[B.id],ce=B.viewport||L;j.setSize(ce.z*v.transmissionResolutionScale,ce.w*v.transmissionResolutionScale);const fe=v.getRenderTarget(),ue=v.getActiveCubeFace(),ze=v.getActiveMipmapLevel();v.setRenderTarget(j),v.getClearColor(k),X=v.getClearAlpha(),X<1&&v.setClearColor(16777215,.5),v.clear(),Ge&&ye.render(O);const Pe=v.toneMapping;v.toneMapping=Tn;const Te=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),f.setupLightsView(B),qe===!0&&ne.setGlobalState(v.clippingPlanes,B),fs(S,O,B),Oe.updateMultisampleRenderTarget(j),Oe.updateRenderTargetMipmap(j),Ie.has("WEBGL_multisampled_render_to_texture")===!1){let ke=!1;for(let Ke=0,ht=I.length;Ke<ht;Ke++){const it=I[Ke],et=it.object,Ae=it.geometry,at=it.material,$e=it.group;if(at.side===bt&&et.layers.test(B.layers)){const Dt=at.side;at.side=Ct,at.needsUpdate=!0,Da(et,O,B,Ae,at,$e),at.side=Dt,at.needsUpdate=!0,ke=!0}}ke===!0&&(Oe.updateMultisampleRenderTarget(j),Oe.updateRenderTargetMipmap(j))}v.setRenderTarget(fe,ue,ze),v.setClearColor(k,X),Te!==void 0&&(B.viewport=Te),v.toneMapping=Pe}function fs(S,I,O){const B=I.isScene===!0?I.overrideMaterial:null;for(let U=0,j=S.length;U<j;U++){const ce=S[U],fe=ce.object,ue=ce.geometry,ze=ce.group;let Pe=ce.material;Pe.allowOverride===!0&&B!==null&&(Pe=B),fe.layers.test(O.layers)&&Da(fe,I,O,ue,Pe,ze)}}function Da(S,I,O,B,U,j){S.onBeforeRender(v,I,O,B,U,j),S.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),U.onBeforeRender(v,I,O,B,S,j),U.transparent===!0&&U.side===bt&&U.forceSinglePass===!1?(U.side=Ct,U.needsUpdate=!0,v.renderBufferDirect(O,I,B,U,S,j),U.side=zn,U.needsUpdate=!0,v.renderBufferDirect(O,I,B,U,S,j),U.side=bt):v.renderBufferDirect(O,I,B,U,S,j),S.onAfterRender(v,I,O,B,U,j)}function ms(S,I,O){I.isScene!==!0&&(I=Se);const B=_e.get(S),U=f.state.lights,j=f.state.shadowsArray,ce=U.state.version,fe=$.getParameters(S,U.state,j,I,O),ue=$.getProgramCacheKey(fe);let ze=B.programs;B.environment=S.isMeshStandardMaterial?I.environment:null,B.fog=I.fog,B.envMap=(S.isMeshStandardMaterial?dt:yt).get(S.envMap||B.environment),B.envMapRotation=B.environment!==null&&S.envMap===null?I.environmentRotation:S.envMapRotation,ze===void 0&&(S.addEventListener("dispose",Y),ze=new Map,B.programs=ze);let Pe=ze.get(ue);if(Pe!==void 0){if(B.currentProgram===Pe&&B.lightsStateVersion===ce)return Ua(S,fe),Pe}else fe.uniforms=$.getUniforms(S),S.onBeforeCompile(fe,v),Pe=$.acquireProgram(fe,ue),ze.set(ue,Pe),B.uniforms=fe.uniforms;const Te=B.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Te.clippingPlanes=ne.uniform),Ua(S,fe),B.needsLights=Xl(S),B.lightsStateVersion=ce,B.needsLights&&(Te.ambientLightColor.value=U.state.ambient,Te.lightProbe.value=U.state.probe,Te.directionalLights.value=U.state.directional,Te.directionalLightShadows.value=U.state.directionalShadow,Te.spotLights.value=U.state.spot,Te.spotLightShadows.value=U.state.spotShadow,Te.rectAreaLights.value=U.state.rectArea,Te.ltc_1.value=U.state.rectAreaLTC1,Te.ltc_2.value=U.state.rectAreaLTC2,Te.pointLights.value=U.state.point,Te.pointLightShadows.value=U.state.pointShadow,Te.hemisphereLights.value=U.state.hemi,Te.directionalShadowMap.value=U.state.directionalShadowMap,Te.directionalShadowMatrix.value=U.state.directionalShadowMatrix,Te.spotShadowMap.value=U.state.spotShadowMap,Te.spotLightMatrix.value=U.state.spotLightMatrix,Te.spotLightMap.value=U.state.spotLightMap,Te.pointShadowMap.value=U.state.pointShadowMap,Te.pointShadowMatrix.value=U.state.pointShadowMatrix),B.currentProgram=Pe,B.uniformsList=null,Pe}function Ia(S){if(S.uniformsList===null){const I=S.currentProgram.getUniforms();S.uniformsList=io.seqWithValue(I.seq,S.uniforms)}return S.uniformsList}function Ua(S,I){const O=_e.get(S);O.outputColorSpace=I.outputColorSpace,O.batching=I.batching,O.batchingColor=I.batchingColor,O.instancing=I.instancing,O.instancingColor=I.instancingColor,O.instancingMorph=I.instancingMorph,O.skinning=I.skinning,O.morphTargets=I.morphTargets,O.morphNormals=I.morphNormals,O.morphColors=I.morphColors,O.morphTargetsCount=I.morphTargetsCount,O.numClippingPlanes=I.numClippingPlanes,O.numIntersection=I.numClipIntersection,O.vertexAlphas=I.vertexAlphas,O.vertexTangents=I.vertexTangents,O.toneMapping=I.toneMapping}function Wl(S,I,O,B,U){I.isScene!==!0&&(I=Se),Oe.resetTextureUnits();const j=I.fog,ce=B.isMeshStandardMaterial?I.environment:null,fe=P===null?v.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Pi,ue=(B.isMeshStandardMaterial?dt:yt).get(B.envMap||ce),ze=B.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,Pe=!!O.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Te=!!O.morphAttributes.position,ke=!!O.morphAttributes.normal,Ke=!!O.morphAttributes.color;let ht=Tn;B.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(ht=v.toneMapping);const it=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,et=it!==void 0?it.length:0,Ae=_e.get(B),at=f.state.lights;if(qe===!0&&(q===!0||S!==x)){const At=S===x&&B.id===M;ne.setState(B,S,At)}let $e=!1;B.version===Ae.__version?(Ae.needsLights&&Ae.lightsStateVersion!==at.state.version||Ae.outputColorSpace!==fe||U.isBatchedMesh&&Ae.batching===!1||!U.isBatchedMesh&&Ae.batching===!0||U.isBatchedMesh&&Ae.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&Ae.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&Ae.instancing===!1||!U.isInstancedMesh&&Ae.instancing===!0||U.isSkinnedMesh&&Ae.skinning===!1||!U.isSkinnedMesh&&Ae.skinning===!0||U.isInstancedMesh&&Ae.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Ae.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&Ae.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&Ae.instancingMorph===!1&&U.morphTexture!==null||Ae.envMap!==ue||B.fog===!0&&Ae.fog!==j||Ae.numClippingPlanes!==void 0&&(Ae.numClippingPlanes!==ne.numPlanes||Ae.numIntersection!==ne.numIntersection)||Ae.vertexAlphas!==ze||Ae.vertexTangents!==Pe||Ae.morphTargets!==Te||Ae.morphNormals!==ke||Ae.morphColors!==Ke||Ae.toneMapping!==ht||Ae.morphTargetsCount!==et)&&($e=!0):($e=!0,Ae.__version=B.version);let Dt=Ae.currentProgram;$e===!0&&(Dt=ms(B,I,U));let ei=!1,It=!1,Ui=!1;const ct=Dt.getUniforms(),Vt=Ae.uniforms;if(ge.useProgram(Dt.program)&&(ei=!0,It=!0,Ui=!0),B.id!==M&&(M=B.id,It=!0),ei||x!==S){ge.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),ct.setValue(C,"projectionMatrix",S.projectionMatrix),ct.setValue(C,"viewMatrix",S.matrixWorldInverse);const Lt=ct.map.cameraPosition;Lt!==void 0&&Lt.setValue(C,de.setFromMatrixPosition(S.matrixWorld)),Ce.logarithmicDepthBuffer&&ct.setValue(C,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&ct.setValue(C,"isOrthographic",S.isOrthographicCamera===!0),x!==S&&(x=S,It=!0,Ui=!0)}if(U.isSkinnedMesh){ct.setOptional(C,U,"bindMatrix"),ct.setOptional(C,U,"bindMatrixInverse");const At=U.skeleton;At&&(At.boneTexture===null&&At.computeBoneTexture(),ct.setValue(C,"boneTexture",At.boneTexture,Oe))}U.isBatchedMesh&&(ct.setOptional(C,U,"batchingTexture"),ct.setValue(C,"batchingTexture",U._matricesTexture,Oe),ct.setOptional(C,U,"batchingIdTexture"),ct.setValue(C,"batchingIdTexture",U._indirectTexture,Oe),ct.setOptional(C,U,"batchingColorTexture"),U._colorsTexture!==null&&ct.setValue(C,"batchingColorTexture",U._colorsTexture,Oe));const kt=O.morphAttributes;if((kt.position!==void 0||kt.normal!==void 0||kt.color!==void 0)&&Q.update(U,O,Dt),(It||Ae.receiveShadow!==U.receiveShadow)&&(Ae.receiveShadow=U.receiveShadow,ct.setValue(C,"receiveShadow",U.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(Vt.envMap.value=ue,Vt.flipEnvMap.value=ue.isCubeTexture&&ue.isRenderTargetTexture===!1?-1:1),B.isMeshStandardMaterial&&B.envMap===null&&I.environment!==null&&(Vt.envMapIntensity.value=I.environmentIntensity),It&&(ct.setValue(C,"toneMappingExposure",v.toneMappingExposure),Ae.needsLights&&$l(Vt,Ui),j&&B.fog===!0&&Z.refreshFogUniforms(Vt,j),Z.refreshMaterialUniforms(Vt,B,V,te,f.state.transmissionRenderTarget[S.id]),io.upload(C,Ia(Ae),Vt,Oe)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(io.upload(C,Ia(Ae),Vt,Oe),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&ct.setValue(C,"center",U.center),ct.setValue(C,"modelViewMatrix",U.modelViewMatrix),ct.setValue(C,"normalMatrix",U.normalMatrix),ct.setValue(C,"modelMatrix",U.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){const At=B.uniformsGroups;for(let Lt=0,So=At.length;Lt<So;Lt++){const Dn=At[Lt];Ue.update(Dn,Dt),Ue.bind(Dn,Dt)}}return Dt}function $l(S,I){S.ambientLightColor.needsUpdate=I,S.lightProbe.needsUpdate=I,S.directionalLights.needsUpdate=I,S.directionalLightShadows.needsUpdate=I,S.pointLights.needsUpdate=I,S.pointLightShadows.needsUpdate=I,S.spotLights.needsUpdate=I,S.spotLightShadows.needsUpdate=I,S.rectAreaLights.needsUpdate=I,S.hemisphereLights.needsUpdate=I}function Xl(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(S,I,O){const B=_e.get(S);B.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,B.__autoAllocateDepthBuffer===!1&&(B.__useRenderToTexture=!1),_e.get(S.texture).__webglTexture=I,_e.get(S.depthTexture).__webglTexture=B.__autoAllocateDepthBuffer?void 0:O,B.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,I){const O=_e.get(S);O.__webglFramebuffer=I,O.__useDefaultFramebuffer=I===void 0};const ql=C.createFramebuffer();this.setRenderTarget=function(S,I=0,O=0){P=S,T=I,R=O;let B=!0,U=null,j=!1,ce=!1;if(S){const ue=_e.get(S);if(ue.__useDefaultFramebuffer!==void 0)ge.bindFramebuffer(C.FRAMEBUFFER,null),B=!1;else if(ue.__webglFramebuffer===void 0)Oe.setupRenderTarget(S);else if(ue.__hasExternalTextures)Oe.rebindTextures(S,_e.get(S.texture).__webglTexture,_e.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Te=S.depthTexture;if(ue.__boundDepthTexture!==Te){if(Te!==null&&_e.has(Te)&&(S.width!==Te.image.width||S.height!==Te.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Oe.setupDepthRenderbuffer(S)}}const ze=S.texture;(ze.isData3DTexture||ze.isDataArrayTexture||ze.isCompressedArrayTexture)&&(ce=!0);const Pe=_e.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Pe[I])?U=Pe[I][O]:U=Pe[I],j=!0):S.samples>0&&Oe.useMultisampledRTT(S)===!1?U=_e.get(S).__webglMultisampledFramebuffer:Array.isArray(Pe)?U=Pe[O]:U=Pe,L.copy(S.viewport),N.copy(S.scissor),H=S.scissorTest}else L.copy(Ee).multiplyScalar(V).floor(),N.copy(Ve).multiplyScalar(V).floor(),H=tt;if(O!==0&&(U=ql),ge.bindFramebuffer(C.FRAMEBUFFER,U)&&B&&ge.drawBuffers(S,U),ge.viewport(L),ge.scissor(N),ge.setScissorTest(H),j){const ue=_e.get(S.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+I,ue.__webglTexture,O)}else if(ce){const ue=I;for(let ze=0;ze<S.textures.length;ze++){const Pe=_e.get(S.textures[ze]);C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0+ze,Pe.__webglTexture,O,ue)}}else if(S!==null&&O!==0){const ue=_e.get(S.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,ue.__webglTexture,O)}M=-1},this.readRenderTargetPixels=function(S,I,O,B,U,j,ce,fe=0){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ue=_e.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ce!==void 0&&(ue=ue[ce]),ue){ge.bindFramebuffer(C.FRAMEBUFFER,ue);try{const ze=S.textures[fe],Pe=ze.format,Te=ze.type;if(!Ce.textureFormatReadable(Pe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ce.textureTypeReadable(Te)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=S.width-B&&O>=0&&O<=S.height-U&&(S.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+fe),C.readPixels(I,O,B,U,xe.convert(Pe),xe.convert(Te),j))}finally{const ze=P!==null?_e.get(P).__webglFramebuffer:null;ge.bindFramebuffer(C.FRAMEBUFFER,ze)}}},this.readRenderTargetPixelsAsync=async function(S,I,O,B,U,j,ce,fe=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ue=_e.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ce!==void 0&&(ue=ue[ce]),ue)if(I>=0&&I<=S.width-B&&O>=0&&O<=S.height-U){ge.bindFramebuffer(C.FRAMEBUFFER,ue);const ze=S.textures[fe],Pe=ze.format,Te=ze.type;if(!Ce.textureFormatReadable(Pe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ce.textureTypeReadable(Te))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ke=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,ke),C.bufferData(C.PIXEL_PACK_BUFFER,j.byteLength,C.STREAM_READ),S.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+fe),C.readPixels(I,O,B,U,xe.convert(Pe),xe.convert(Te),0);const Ke=P!==null?_e.get(P).__webglFramebuffer:null;ge.bindFramebuffer(C.FRAMEBUFFER,Ke);const ht=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await eu(C,ht,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,ke),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,j),C.deleteBuffer(ke),C.deleteSync(ht),j}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,I=null,O=0){const B=Math.pow(2,-O),U=Math.floor(S.image.width*B),j=Math.floor(S.image.height*B),ce=I!==null?I.x:0,fe=I!==null?I.y:0;Oe.setTexture2D(S,0),C.copyTexSubImage2D(C.TEXTURE_2D,O,0,0,ce,fe,U,j),ge.unbindTexture()};const Yl=C.createFramebuffer(),Zl=C.createFramebuffer();this.copyTextureToTexture=function(S,I,O=null,B=null,U=0,j=null){j===null&&(U!==0?(as("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),j=U,U=0):j=0);let ce,fe,ue,ze,Pe,Te,ke,Ke,ht;const it=S.isCompressedTexture?S.mipmaps[j]:S.image;if(O!==null)ce=O.max.x-O.min.x,fe=O.max.y-O.min.y,ue=O.isBox3?O.max.z-O.min.z:1,ze=O.min.x,Pe=O.min.y,Te=O.isBox3?O.min.z:0;else{const kt=Math.pow(2,-U);ce=Math.floor(it.width*kt),fe=Math.floor(it.height*kt),S.isDataArrayTexture?ue=it.depth:S.isData3DTexture?ue=Math.floor(it.depth*kt):ue=1,ze=0,Pe=0,Te=0}B!==null?(ke=B.x,Ke=B.y,ht=B.z):(ke=0,Ke=0,ht=0);const et=xe.convert(I.format),Ae=xe.convert(I.type);let at;I.isData3DTexture?(Oe.setTexture3D(I,0),at=C.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(Oe.setTexture2DArray(I,0),at=C.TEXTURE_2D_ARRAY):(Oe.setTexture2D(I,0),at=C.TEXTURE_2D),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,I.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,I.unpackAlignment);const $e=C.getParameter(C.UNPACK_ROW_LENGTH),Dt=C.getParameter(C.UNPACK_IMAGE_HEIGHT),ei=C.getParameter(C.UNPACK_SKIP_PIXELS),It=C.getParameter(C.UNPACK_SKIP_ROWS),Ui=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,it.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,it.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,ze),C.pixelStorei(C.UNPACK_SKIP_ROWS,Pe),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Te);const ct=S.isDataArrayTexture||S.isData3DTexture,Vt=I.isDataArrayTexture||I.isData3DTexture;if(S.isDepthTexture){const kt=_e.get(S),At=_e.get(I),Lt=_e.get(kt.__renderTarget),So=_e.get(At.__renderTarget);ge.bindFramebuffer(C.READ_FRAMEBUFFER,Lt.__webglFramebuffer),ge.bindFramebuffer(C.DRAW_FRAMEBUFFER,So.__webglFramebuffer);for(let Dn=0;Dn<ue;Dn++)ct&&(C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,_e.get(S).__webglTexture,U,Te+Dn),C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,_e.get(I).__webglTexture,j,ht+Dn)),C.blitFramebuffer(ze,Pe,ce,fe,ke,Ke,ce,fe,C.DEPTH_BUFFER_BIT,C.NEAREST);ge.bindFramebuffer(C.READ_FRAMEBUFFER,null),ge.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else if(U!==0||S.isRenderTargetTexture||_e.has(S)){const kt=_e.get(S),At=_e.get(I);ge.bindFramebuffer(C.READ_FRAMEBUFFER,Yl),ge.bindFramebuffer(C.DRAW_FRAMEBUFFER,Zl);for(let Lt=0;Lt<ue;Lt++)ct?C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,kt.__webglTexture,U,Te+Lt):C.framebufferTexture2D(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,kt.__webglTexture,U),Vt?C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,At.__webglTexture,j,ht+Lt):C.framebufferTexture2D(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,At.__webglTexture,j),U!==0?C.blitFramebuffer(ze,Pe,ce,fe,ke,Ke,ce,fe,C.COLOR_BUFFER_BIT,C.NEAREST):Vt?C.copyTexSubImage3D(at,j,ke,Ke,ht+Lt,ze,Pe,ce,fe):C.copyTexSubImage2D(at,j,ke,Ke,ze,Pe,ce,fe);ge.bindFramebuffer(C.READ_FRAMEBUFFER,null),ge.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else Vt?S.isDataTexture||S.isData3DTexture?C.texSubImage3D(at,j,ke,Ke,ht,ce,fe,ue,et,Ae,it.data):I.isCompressedArrayTexture?C.compressedTexSubImage3D(at,j,ke,Ke,ht,ce,fe,ue,et,it.data):C.texSubImage3D(at,j,ke,Ke,ht,ce,fe,ue,et,Ae,it):S.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,j,ke,Ke,ce,fe,et,Ae,it.data):S.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,j,ke,Ke,it.width,it.height,et,it.data):C.texSubImage2D(C.TEXTURE_2D,j,ke,Ke,ce,fe,et,Ae,it);C.pixelStorei(C.UNPACK_ROW_LENGTH,$e),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Dt),C.pixelStorei(C.UNPACK_SKIP_PIXELS,ei),C.pixelStorei(C.UNPACK_SKIP_ROWS,It),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Ui),j===0&&I.generateMipmaps&&C.generateMipmap(at),ge.unbindTexture()},this.initRenderTarget=function(S){_e.get(S).__webglFramebuffer===void 0&&Oe.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?Oe.setTextureCube(S,0):S.isData3DTexture?Oe.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?Oe.setTexture2DArray(S,0):Oe.setTexture2D(S,0),ge.unbindTexture()},this.resetState=function(){T=0,R=0,P=null,ge.reset(),ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return sn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Xe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Xe._getUnpackColorSpace()}}class x3 extends bu{constructor(){super();const e=new gt;e.deleteAttribute("uv");const t=new Je({side:Ct}),n=new Je,s=new vo(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const o=new we(e,t);o.position.set(-.757,13.219,.717),o.scale.set(31.713,28.305,28.591),this.add(o);const r=new Ru(e,n,6),a=new ft;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),r.setMatrixAt(0,a.matrix),a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),r.setMatrixAt(1,a.matrix),a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),r.setMatrixAt(2,a.matrix),a.position.set(-2.017,.018,6.124),a.rotation.set(0,.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),r.setMatrixAt(3,a.matrix),a.position.set(2.291,-.756,-2.621),a.rotation.set(0,-.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),r.setMatrixAt(4,a.matrix),a.position.set(-2.193,-.369,-5.547),a.rotation.set(0,.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),r.setMatrixAt(5,a.matrix),this.add(r);const c=new we(e,Mi(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);const l=new we(e,Mi(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);const u=new we(e,Mi(17));u.position.set(14.904,12.198,-1.832),u.scale.set(.15,4.265,6.331),this.add(u);const h=new we(e,Mi(43));h.position.set(-.462,8.89,14.52),h.scale.set(4.38,5.441,.088),this.add(h);const p=new we(e,Mi(20));p.position.set(3.235,11.486,-12.541),p.scale.set(2.5,2,.1),this.add(p);const d=new we(e,Mi(100));d.position.set(0,20,0),d.scale.set(1,.1,1),this.add(d)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function Mi(i){return new fp({color:0,emissive:16777215,emissiveIntensity:i})}const a1=1,c1="第一扇门",l1="点击画面锁定鼠标。左键在白色面板上开一扇蓝色传送门，然后走进去。橙色传送门已经在隔壁房间等你了。",h1="blue",u1={pos:[0,0,3],yaw:0},p1=[{pos:[0,-.25,0],size:[13,.5,13],mat:"concrete"},{pos:[0,5.25,0],size:[13,.5,13],mat:"metal"},{pos:[-6.25,2.5,0],size:[.5,5,12],mat:"metal"},{pos:[6.25,2.5,0],size:[.5,5,12],mat:"metal"},{pos:[0,2.5,-6.25],size:[13,5,.5],mat:"metal"},{pos:[0,2.5,6.25],size:[13,5,.5],mat:"metal"},{pos:[-5.98,2,0],size:[.04,4,8],mat:"white"},{pos:[5.98,2,0],size:[.04,4,8],mat:"white"},{pos:[0,2,-5.98],size:[8,4,.04],mat:"white"},{pos:[0,2,5.98],size:[8,4,.04],mat:"white"},{pos:[18,-.25,0],size:[9,.5,9],mat:"concrete"},{pos:[18,5.25,0],size:[9,.5,9],mat:"metal"},{pos:[13.75,2.5,0],size:[.5,5,8],mat:"metal"},{pos:[22.25,2.5,0],size:[.5,5,8],mat:"metal"},{pos:[18,2.5,-4.25],size:[9,5,.5],mat:"metal"},{pos:[18,2.5,4.25],size:[9,5,.5],mat:"metal"}],d1=[{type:"portal",color:"orange",pos:[14,1.13,0],normal:[1,0,0],up:[0,1,0]},{type:"exit",pos:[20,1.25,0],size:[2.2,2.5,2.2]},{type:"light",pos:[0,4.85,0],intensity:35,shadow:!0},{type:"light",pos:[18,4.85,0],intensity:25,shadow:!0}],f1=0,m1={version:a1,name:c1,hint:l1,gun:h1,spawn:u1,brushes:p1,entities:d1,chapter:f1},g1=1,_1="玻璃之隔",v1="传送门打不穿玻璃。退后几步，越过玻璃找一面能看到的白色面板。右键发射橙色传送门。",y1="both",x1={pos:[0,0,5.5],yaw:0},M1=[{pos:[0,-.25,-1],size:[17,.5,19],mat:"concrete"},{pos:[0,9.25,-1],size:[17,.5,19],mat:"metal"},{pos:[-8.25,4.5,-1],size:[.5,9,18],mat:"metal"},{pos:[8.25,4.5,-1],size:[.5,9,18],mat:"metal"},{pos:[0,4.5,-10.25],size:[17,9,.5],mat:"metal"},{pos:[0,4.5,8.25],size:[17,9,.5],mat:"metal"},{pos:[0,1.3,0],size:[16,2.6,.3],mat:"glass"},{pos:[0,2.25,7.98],size:[12,4.5,.04],mat:"white"},{pos:[-7.98,2,4.25],size:[.04,4,5.5],mat:"white"},{pos:[7.98,2,4.25],size:[.04,4,5.5],mat:"white"},{pos:[0,6.55,-9.98],size:[14,4.1,.04],mat:"white"}],S1=[{type:"exit",pos:[0,1.25,-7.5],size:[2.2,2.5,2.2]},{type:"light",pos:[0,8.85,4],intensity:40,shadow:!0},{type:"light",pos:[0,8.85,-6],intensity:35,shadow:!0}],w1=0,E1={version:g1,name:_1,hint:v1,gun:y1,spawn:x1,brushes:M1,entities:S1,chapter:w1},b1=1,T1="搬运方块",A1="方块在高台上。用传送门上去，按 E 拿起方块，带着它穿门回来，放到红色按钮上就能开门。",z1="both",R1={pos:[0,0,5],yaw:0},C1=[{pos:[0,-.25,0],size:[17,.5,17],mat:"concrete"},{pos:[0,10.25,0],size:[17,.5,17],mat:"metal"},{pos:[-8.25,5,0],size:[.5,10,16],mat:"metal"},{pos:[0,5,-8.25],size:[17,10,.5],mat:"metal"},{pos:[0,5,8.25],size:[17,10,.5],mat:"metal"},{pos:[8.25,5,-4.75],size:[.5,10,6.5],mat:"metal"},{pos:[8.25,5,4.75],size:[.5,10,6.5],mat:"metal"},{pos:[8.25,6.5,0],size:[.5,7,3],mat:"metal"},{pos:[11.5,-.25,0],size:[6,.5,4],mat:"concrete"},{pos:[11.5,3.25,0],size:[6,.5,4],mat:"metal"},{pos:[11.5,1.5,-1.75],size:[6,3,.5],mat:"metal"},{pos:[11.5,1.5,1.75],size:[6,3,.5],mat:"metal"},{pos:[14.25,1.5,0],size:[.5,3,3],mat:"metal"},{pos:[0,2,-6],size:[16,4,4],mat:"metal"},{pos:[0,6.75,-7.98],size:[12,5.5,.04],mat:"white"},{pos:[0,2,7.98],size:[12,4,.04],mat:"white"}],P1=[{type:"cube",pos:[0,4.35,-6]},{type:"button",id:"b1",pos:[4,0,3]},{type:"door",pos:[8.25,1.5,0],size:[.3,3,3],requires:["b1"]},{type:"exit",pos:[12.9,1.25,0],size:[2,2.5,2.6]},{type:"light",pos:[11.5,2.85,0],intensity:6},{type:"light",pos:[0,9.85,0],intensity:45,shadow:!0},{type:"light",pos:[0,9.85,-6],intensity:25}],L1=0,D1={version:b1,name:T1,hint:A1,gun:z1,spawn:R1,brushes:C1,entities:P1,chapter:L1},I1=1,U1="天降",N1="传送门也能开在地面和天花板上。从地上的门掉下去，就会从天花板上的门掉出来。",F1="both",O1={pos:[0,0,5.3],yaw:0},B1=[{pos:[0,-.25,-2],size:[17,.5,17],mat:"concrete"},{pos:[0,12.25,-2],size:[17,.5,17],mat:"metal"},{pos:[-8.25,6,-2],size:[.5,12,16],mat:"metal"},{pos:[8.25,6,-2],size:[.5,12,16],mat:"metal"},{pos:[0,6,-10.25],size:[17,12,.5],mat:"metal"},{pos:[0,6,6.25],size:[17,12,.5],mat:"metal"},{pos:[0,3,-7],size:[16,6,6],mat:"metal"},{pos:[0,11.98,-6.9],size:[8,.04,5.2],mat:"white"},{pos:[0,.02,2],size:[8,.04,5],mat:"white"}],H1=[{type:"exit",pos:[0,7.25,-8],size:[2.2,2.5,2.2]},{type:"light",pos:[0,11.85,1],intensity:45,shadow:!0},{type:"light",pos:[0,11.85,-7],intensity:30,shadow:!0}],V1=0,k1={version:I1,name:U1,hint:N1,gun:F1,spawn:O1,brushes:B1,entities:H1,chapter:V1},G1=1,W1="飞跃",$1="速度穿过传送门时会被保留。从高台跳进地面上的门，就能从墙上的门高速飞出去，越过酸液池。",X1="both",q1={pos:[0,10,8.5],yaw:0},Y1=[{pos:[0,20.25,-7],size:[13,.5,35],mat:"metal"},{pos:[-6.25,9,-7],size:[.5,22,34],mat:"metal"},{pos:[6.25,9,-7],size:[.5,22,34],mat:"metal"},{pos:[0,9,-24.25],size:[13,22,.5],mat:"metal"},{pos:[0,9,10.25],size:[13,22,.5],mat:"metal"},{pos:[0,-1.25,4.25],size:[13,2.5,12.5],mat:"concrete"},{pos:[0,-2.25,-6],size:[13,.5,8],mat:"concrete"},{pos:[0,-1.25,-17.25],size:[13,2.5,14.5],mat:"concrete"},{pos:[0,5,8.5],size:[12,10,3],mat:"metal"},{pos:[0,15.25,9.98],size:[8,8.5,.04],mat:"white"},{pos:[0,.02,2.45],size:[8,.04,8.7],mat:"white"}],Z1=[{type:"hazard",pos:[0,-1.2,-6],size:[12,1.6,8]},{type:"exit",pos:[0,1.25,-20],size:[2.4,2.5,2.4]},{type:"light",pos:[0,19.85,4],intensity:70,shadow:!0},{type:"light",pos:[0,19.85,-6],intensity:50},{type:"light",pos:[0,19.85,-17],intensity:60,shadow:!0}],J1=0,K1={version:G1,name:W1,hint:$1,gun:X1,spawn:q1,brushes:Y1,entities:Z1,chapter:J1},j1=1,Q1="无限下落",e5="地面和天花板上的一对门会让你一直下落、越掉越快。下落途中把其中一扇门改开到墙上，就能把这股速度带出去。",t5="both",n5={pos:[3,0,4.5],yaw:-90},i5=[{pos:[13,14.25,0],size:[27,.5,13],mat:"metal"},{pos:[-.25,6,0],size:[.5,16,12],mat:"metal"},{pos:[26.25,6,0],size:[.5,16,12],mat:"metal"},{pos:[13,6,-6.25],size:[27,16,.5],mat:"metal"},{pos:[13,6,6.25],size:[27,16,.5],mat:"metal"},{pos:[2.25,-1.25,0],size:[5.5,2.5,13],mat:"concrete"},{pos:[10,-2.25,0],size:[10,.5,13],mat:"concrete"},{pos:[20.75,-1.25,0],size:[11.5,2.5,13],mat:"concrete"},{pos:[2.6,.02,0],size:[4,.04,5],mat:"white"},{pos:[2.6,13.98,0],size:[4.4,.04,6],mat:"white"},{pos:[.02,7,0],size:[.04,6,11],mat:"white"}],s5=[{type:"hazard",pos:[10,-1.2,0],size:[10,1.6,12]},{type:"exit",pos:[23,1.25,0],size:[2.4,2.5,2.4]},{type:"light",pos:[2.5,13.85,-4.5],intensity:45,shadow:!0},{type:"light",pos:[12,13.85,0],intensity:50},{type:"light",pos:[21,13.85,0],intensity:50,shadow:!0}],o5=0,r5={version:j1,name:Q1,hint:e5,gun:t5,spawn:n5,brushes:i5,entities:s5,chapter:o5},a5=1,c5="隔栅取物",l5="传送门子弹能穿过栅格，人和方块却过不去。试试把门开在方块底下。",h5="both",u5={pos:[0,0,5.5],yaw:0},p5=[{pos:[0,-.25,1],size:[17,.5,15],mat:"concrete"},{pos:[0,7.25,1],size:[17,.5,15],mat:"metal"},{pos:[-8.25,3.5,1],size:[.5,7,14],mat:"metal"},{pos:[0,3.5,8.25],size:[17,7,.5],mat:"metal"},{pos:[8.25,3.5,-3.75],size:[.5,7,4.5],mat:"metal"},{pos:[8.25,3.5,4.75],size:[.5,7,6.5],mat:"metal"},{pos:[8.25,5,0],size:[.5,4,3],mat:"metal"},{pos:[11.5,-.25,0],size:[6,.5,4],mat:"concrete"},{pos:[11.5,3.25,0],size:[6,.5,4],mat:"metal"},{pos:[11.5,1.5,-1.75],size:[6,3,.5],mat:"metal"},{pos:[11.5,1.5,1.75],size:[6,3,.5],mat:"metal"},{pos:[14.25,1.5,0],size:[.5,3,3],mat:"metal"},{pos:[-5.75,3.5,-6.25],size:[5.5,7,.5],mat:"metal"},{pos:[5.75,3.5,-6.25],size:[5.5,7,.5],mat:"metal"},{pos:[0,.5,-6.25],size:[6,1,.5],mat:"metal"},{pos:[0,4.6,-6.25],size:[6,4.8,.5],mat:"metal"},{pos:[0,.5,-8],size:[7,1,3],mat:"metal"},{pos:[0,2.45,-8],size:[7,.5,3],mat:"metal"},{pos:[-3.25,1.6,-8],size:[.5,1.2,3],mat:"metal"},{pos:[3.25,1.6,-8],size:[.5,1.2,3],mat:"metal"},{pos:[0,1.6,-9.25],size:[6,1.2,.5],mat:"metal"},{pos:[0,1.6,-6],size:[6,1.2,.1],mat:"grate"},{pos:[0,1.02,-7.75],size:[5.8,.04,2.4],mat:"white"},{pos:[-7.98,2,1],size:[.04,4,10],mat:"white"},{pos:[0,2,7.98],size:[12,4,.04],mat:"white"}],d5=[{type:"cube",pos:[0,1.4,-7.75]},{type:"button",id:"b1",pos:[4,0,2.5]},{type:"door",pos:[8.25,1.5,0],size:[.3,3,3],requires:["b1"]},{type:"exit",pos:[12.9,1.25,0],size:[2,2.5,2.6]},{type:"light",pos:[11.5,2.85,0],intensity:6},{type:"light",pos:[0,6.85,1.5],intensity:45,shadow:!0},{type:"light",pos:[0,2.1,-7.8],intensity:3,fixture:!1,distance:5}],f5=0,m5={version:a5,name:c5,hint:l5,gun:h5,spawn:u5,brushes:p5,entities:d5,chapter:f5},g5=1,_5="小屋大有乾坤",v5="实验室正中间那间小屋，走进去看看。两个按钮都要压上方块才能开门。传送门也能隔着空间门打出去。",y5="both",x5={pos:[0,0,7],yaw:0},M5=[{pos:[0,-.25,0],size:[21,.5,21],mat:"concrete"},{pos:[0,7.25,0],size:[21,.5,21],mat:"metal"},{pos:[-10.25,3.5,0],size:[.5,7,20],mat:"metal"},{pos:[0,3.5,-10.25],size:[21,7,.5],mat:"metal"},{pos:[0,3.5,10.25],size:[21,7,.5],mat:"metal"},{pos:[10.25,3.5,-5.75],size:[.5,7,8.5],mat:"metal"},{pos:[10.25,3.5,5.75],size:[.5,7,8.5],mat:"metal"},{pos:[10.25,5,0],size:[.5,4,3],mat:"metal"},{pos:[13.5,-.25,0],size:[6,.5,4],mat:"concrete"},{pos:[13.5,3.25,0],size:[6,.5,4],mat:"metal"},{pos:[13.5,1.5,-1.75],size:[6,3,.5],mat:"metal"},{pos:[13.5,1.5,1.75],size:[6,3,.5],mat:"metal"},{pos:[16.25,1.5,0],size:[.5,3,3],mat:"metal"},{pos:[-8.5,2,-3],size:[3,4,6],mat:"metal"},{pos:[-9.98,5.5,-3],size:[.04,2.9,5],mat:"white"},{pos:[0,2,9.98],size:[8,4,.04],mat:"white"},{pos:[0,1.7,-3.05],size:[3.2,3.4,.3],mat:"metal"},{pos:[-1.45,1.7,-1.6],size:[.3,3.4,2.6],mat:"metal"},{pos:[1.45,1.7,-1.6],size:[.3,3.4,2.6],mat:"metal"},{pos:[0,3.25,-1.6],size:[2.6,.3,2.6],mat:"metal"},{pos:[-1.3,1.7,-.15],size:[.6,3.4,.3],mat:"metal"},{pos:[0,3,-.15],size:[2,.8,.3],mat:"metal"},{pos:[1.3,1.7,-.15],size:[.6,3.4,.3],mat:"metal"},{pos:[100,-.25,-15],size:[25,.5,31],mat:"concrete"},{pos:[100,14.25,-15],size:[25,.5,31],mat:"metal"},{pos:[87.75,7,-15],size:[.5,14,30],mat:"metal"},{pos:[112.25,7,-15],size:[.5,14,30],mat:"metal"},{pos:[100,7,-30.25],size:[25,14,.5],mat:"metal"},{pos:[93.25,7,.25],size:[11.5,14,.5],mat:"metal"},{pos:[100,8.3,.25],size:[2,11.4,.5],mat:"metal"},{pos:[106.75,7,.25],size:[11.5,14,.5],mat:"metal"},{pos:[100,1.5,1],size:[3,3,1],mat:"metal"},{pos:[100,4,-27],size:[24,8,6],mat:"metal"},{pos:[100,10.775,-29.98],size:[8,5.45,.04],mat:"white"},{pos:[88.5,4,-23.8],size:[1,8,.4],mat:"concrete"}],S5=[{type:"gateway",a:{pos:[0,1.3,0],normal:[0,0,1]},b:{pos:[100,1.3,0],normal:[0,0,-1]},size:[2,2.6]},{type:"cube",pos:[-8.3,4.35,-5]},{type:"cube",pos:[105,8.35,-27]},{type:"button",id:"b1",pos:[6,0,-3.5]},{type:"button",id:"b2",pos:[6,0,3.5]},{type:"door",pos:[10.25,1.5,0],size:[.3,3,3],requires:["b1","b2"]},{type:"exit",pos:[14.9,1.25,0],size:[2,2.5,2.6]},{type:"light",pos:[13.5,2.85,0],intensity:6},{type:"light",pos:[0,6.8,3],intensity:55,shadow:!0},{type:"light",pos:[-6,6.8,-5],intensity:30},{type:"light",pos:[100,13.7,-12],intensity:140,shadow:!0,distance:40},{type:"light",pos:[100,13.7,-27],intensity:70,distance:30},{type:"light",pos:[100,6,-3],intensity:25,distance:18}],w5=1,E5={version:g5,name:_5,hint:v5,gun:y5,spawn:x5,brushes:M5,entities:S5,chapter:w5},b5=1,T5="同一扇门",A5="这扇门通往哪里，取决于门边的按钮有没有被压住。你自己开的传送门可不管这些。",z5="both",R5={pos:[3,0,2],yaw:0},C5=[{pos:[0,-.25,0],size:[13,.5,13],mat:"concrete"},{pos:[0,5.25,0],size:[13,.5,13],mat:"metal"},{pos:[-6.25,2.5,0],size:[.5,5,12],mat:"metal"},{pos:[6.25,2.5,0],size:[.5,5,12],mat:"metal"},{pos:[0,2.5,6.25],size:[13,5,.5],mat:"metal"},{pos:[-3.75,2.5,-6.25],size:[5.5,5,.5],mat:"metal"},{pos:[0,3.9,-6.25],size:[2,2.2,.5],mat:"metal"},{pos:[3.75,2.5,-6.25],size:[5.5,5,.5],mat:"metal"},{pos:[0,1.65,-7],size:[3,3.3,1],mat:"metal"},{pos:[0,1.7,5.98],size:[5,3.4,.04],mat:"white"},{pos:[60,-.25,0],size:[13,.5,13],mat:"concrete"},{pos:[60,6.25,0],size:[13,.5,13],mat:"metal"},{pos:[53.75,3,0],size:[.5,6,12],mat:"metal"},{pos:[66.25,3,0],size:[.5,6,12],mat:"metal"},{pos:[60,3,-6.25],size:[13,6,.5],mat:"metal"},{pos:[56.25,3,6.25],size:[5.5,6,.5],mat:"metal"},{pos:[60,4.4,6.25],size:[2,3.2,.5],mat:"metal"},{pos:[63.75,3,6.25],size:[5.5,6,.5],mat:"metal"},{pos:[60,1.65,7],size:[3,3.3,1],mat:"metal"},{pos:[60,1.75,-4],size:[12,3.5,4],mat:"metal"},{pos:[60,4.775,-5.98],size:[6,2.35,.04],mat:"white"},{pos:[120,-.25,0],size:[13,.5,13],mat:"concrete"},{pos:[120,5.25,0],size:[13,.5,13],mat:"metal"},{pos:[113.75,2.5,0],size:[.5,5,12],mat:"metal"},{pos:[120,2.5,-6.25],size:[13,5,.5],mat:"metal"},{pos:[116.25,2.5,6.25],size:[5.5,5,.5],mat:"metal"},{pos:[120,3.9,6.25],size:[2,2.2,.5],mat:"metal"},{pos:[123.75,2.5,6.25],size:[5.5,5,.5],mat:"metal"},{pos:[120,1.65,7],size:[3,3.3,1],mat:"metal"},{pos:[126.25,2.5,-3.75],size:[.5,5,4.5],mat:"metal"},{pos:[126.25,2.5,3.75],size:[.5,5,4.5],mat:"metal"},{pos:[126.25,4,0],size:[.5,2,3],mat:"metal"},{pos:[129.5,-.25,0],size:[6,.5,4],mat:"concrete"},{pos:[129.5,3.25,0],size:[6,.5,4],mat:"metal"},{pos:[129.5,1.5,-1.75],size:[6,3,.5],mat:"metal"},{pos:[129.5,1.5,1.75],size:[6,3,.5],mat:"metal"},{pos:[132.25,1.5,0],size:[.5,3,3],mat:"metal"},{pos:[114.02,1.7,0],size:[.04,3.4,6],mat:"white"}],P5=[{type:"gateway",a:{pos:[0,1.4,-6],normal:[0,0,1]},b:{pos:[60,1.4,6],normal:[0,0,-1]},size:[2,2.8],when:["!b1"]},{type:"gateway",a:{pos:[0,1.4,-6],normal:[0,0,1]},b:{pos:[120,1.4,6],normal:[0,0,-1]},size:[2,2.8],when:["b1"]},{type:"button",id:"b1",pos:[0,0,4.9]},{type:"cube",pos:[64,3.85,-4]},{type:"button",id:"b2",pos:[121,0,-3]},{type:"door",pos:[126.25,1.5,0],size:[.3,3,3],requires:["b2"]},{type:"exit",pos:[130.9,1.25,0],size:[2,2.5,2.6]},{type:"light",pos:[129.5,2.85,0],intensity:6},{type:"light",pos:[0,4.8,0],intensity:40,shadow:!0},{type:"light",pos:[60,5.8,0],intensity:45,shadow:!0,color:14214911},{type:"light",pos:[120,4.8,0],intensity:40,shadow:!0,color:16769728}],L5=1,D5={version:b5,name:T5,hint:A5,gun:z5,spawn:R5,brushes:C5,entities:P5,chapter:L5},I5=1,U5="窥视孔",N5="小窗户太小，人钻不过去，但手能伸进去，传送门也能打过去。",F5="both",O5={pos:[4,0,4],yaw:0},B5=[{pos:[0,-.25,0],size:[15,.5,15],mat:"concrete"},{pos:[0,6.25,0],size:[15,.5,15],mat:"metal"},{pos:[-7.25,3,0],size:[.5,6,14],mat:"metal"},{pos:[0,3,-7.25],size:[15,6,.5],mat:"metal"},{pos:[0,3,7.25],size:[15,6,.5],mat:"metal"},{pos:[7.25,3,-4.25],size:[.5,6,5.5],mat:"metal"},{pos:[7.25,3,4.25],size:[.5,6,5.5],mat:"metal"},{pos:[7.25,4.5,0],size:[.5,3,3],mat:"metal"},{pos:[10.5,-.25,0],size:[6,.5,4],mat:"concrete"},{pos:[10.5,3.25,0],size:[6,.5,4],mat:"metal"},{pos:[10.5,1.5,-1.75],size:[6,3,.5],mat:"metal"},{pos:[10.5,1.5,1.75],size:[6,3,.5],mat:"metal"},{pos:[13.25,1.5,0],size:[.5,3,3],mat:"metal"},{pos:[-6.98,1.7,0],size:[.04,3.4,6],mat:"white"},{pos:[-.1,1.1,.95],size:[2.4,2.2,.1],mat:"glass"},{pos:[-.1,1.1,3.05],size:[2.4,2.2,.1],mat:"glass"},{pos:[1.05,1.1,2],size:[.1,2.2,2],mat:"glass"},{pos:[-1.15,1.1,2],size:[.3,2.2,2],mat:"metal"},{pos:[-.1,2.25,2],size:[2.4,.1,2.2],mat:"glass"},{pos:[100,-.25,0],size:[13,.5,15],mat:"concrete"},{pos:[100,6.25,0],size:[13,.5,15],mat:"metal"},{pos:[93.75,3,0],size:[.5,6,14],mat:"metal"},{pos:[106.25,3,0],size:[.5,6,14],mat:"metal"},{pos:[100,3,-7.25],size:[13,6,.5],mat:"metal"},{pos:[100,3,7.25],size:[13,6,.5],mat:"metal"},{pos:[100,1.75,-6.98],size:[6,3.5,.04],mat:"white"}],H5=[{type:"gateway",a:{pos:[0,1.8,-7],normal:[0,0,1]},b:{pos:[100,1.8,7],normal:[0,0,-1]},size:[1,1],frame:!0},{type:"gateway",a:{pos:[3,.65,7],normal:[0,0,-1]},b:{pos:[-1,.65,2],normal:[1,0,0]},size:[1,1],frame:!0},{type:"cube",pos:[-.3,.35,2]},{type:"button",id:"b1",pos:[97,0,-2]},{type:"door",pos:[7.25,1.5,0],size:[.3,3,3],requires:["b1"]},{type:"exit",pos:[11.9,1.25,0],size:[2,2.5,2.6]},{type:"light",pos:[10.5,2.85,0],intensity:6},{type:"light",pos:[0,5.8,0],intensity:45,shadow:!0},{type:"light",pos:[0,2.1,2],intensity:4,fixture:!1,distance:4},{type:"light",pos:[100,5.8,0],intensity:45,shadow:!0,color:14214911}],V5=1,k5={version:I5,name:U5,hint:N5,gun:F5,spawn:O5,brushes:B5,entities:H5,chapter:V5},G5=1,W5="无底洞",$5="地上那个洞通往哪里，取决于开关。开关亮着的几秒钟里，洞会接到正上方的天花板。",X5="both",q5={pos:[0,0,4],yaw:90},Y5={color:461067,near:14,far:70},Z5=[{pos:[0,8.25,0],size:[13,.5,13],mat:"metal"},{pos:[-6.25,4,0],size:[.5,8,12],mat:"metal"},{pos:[6.25,4,0],size:[.5,8,12],mat:"metal"},{pos:[0,4,-6.25],size:[13,8,.5],mat:"metal"},{pos:[0,4,6.25],size:[13,8,.5],mat:"metal"},{pos:[-5.35,-.25,0],size:[2.3,.5,13],mat:"concrete"},{pos:[-3,-.25,-3.85],size:[2.4,.5,5.3],mat:"concrete"},{pos:[-3,-.25,3.85],size:[2.4,.5,5.3],mat:"concrete"},{pos:[2.35,-.25,0],size:[8.3,.5,13],mat:"concrete"},{pos:[-3,-2.75,0],size:[4.4,.5,4.4],mat:"concrete"},{pos:[-4.95,-1.5,0],size:[.5,2,4.4],mat:"metal"},{pos:[-1.05,-1.5,0],size:[.5,2,4.4],mat:"metal"},{pos:[-3,-1.5,-1.95],size:[3.4,2,.5],mat:"metal"},{pos:[-3,-1.5,1.95],size:[3.4,2,.5],mat:"metal"},{pos:[4.5,2.5,0],size:[3,5,12],mat:"metal"},{pos:[5.98,6.5,0],size:[.04,2.9,4],mat:"white"},{pos:[-5.98,1.7,0],size:[.04,3.4,4],mat:"white"},{pos:[120,10.25,0],size:[41,.5,11],mat:"metal"},{pos:[99.75,5,0],size:[.5,10,10],mat:"metal"},{pos:[140.25,5,0],size:[.5,10,10],mat:"metal"},{pos:[120,5,-5.25],size:[41,10,.5],mat:"metal"},{pos:[120,5,5.25],size:[41,10,.5],mat:"metal"},{pos:[108.75,-1.75,0],size:[18.5,.5,11],mat:"concrete"},{pos:[129.25,-1,0],size:[22.5,2,11],mat:"concrete"},{pos:[99.75,-.75,0],size:[.5,1.5,11],mat:"metal"},{pos:[109,-.75,-5.25],size:[18,1.5,.5],mat:"metal"},{pos:[109,-.75,5.25],size:[18,1.5,.5],mat:"metal"},{pos:[-3,4.01,-1.05],size:[2.2,7.98,.1],mat:"glass"},{pos:[-3,4.01,1.05],size:[2.2,7.98,.1],mat:"glass"},{pos:[-1.95,4.01,0],size:[.1,7.98,2],mat:"glass"},{pos:[-4.05,5.2,0],size:[.1,5.6,2],mat:"glass"}],J5=[{type:"gateway",a:{pos:[-3,0,0],normal:[0,1,0],up:[0,0,-1]},b:{pos:[-3,8,0],normal:[0,-1,0],up:[0,0,-1]},size:[2.4,2.4],when:["s1"]},{type:"gateway",a:{pos:[-3,0,0],normal:[0,1,0],up:[0,0,-1]},b:{pos:[100,6,0],normal:[1,0,0]},size:[2.4,2.4],when:["!s1"]},{type:"switch",id:"s1",pos:[4.5,5,-3],yaw:90,timer:4},{type:"hazard",pos:[109,-.9,0],size:[18,1.2,10]},{type:"exit",pos:[136,1.25,0],size:[4,2.5,9]},{type:"light",pos:[0,7.8,0],intensity:45,shadow:!0},{type:"light",pos:[4.5,7.8,-3],intensity:15},{type:"light",pos:[108,9.8,0],intensity:80,distance:30},{type:"light",pos:[130,9.8,0],intensity:80,distance:30,shadow:!0}],K5=1,j5={version:G5,name:W5,hint:$5,gun:X5,spawn:q5,fog:Y5,brushes:Z5,entities:J5,chapter:K5},Q5=1,eg="单向镜",tg="这几扇门只能往前走，走过去回头看，门洞已经封死了。往前看却能一直看下去，传送门也能一直打下去。力场会销毁方块。",ng="both",ig={pos:[0,0,3],yaw:0},sg=[{pos:[0,-.25,0],size:[13,.5,13],mat:"concrete"},{pos:[0,6.25,0],size:[13,.5,13],mat:"metal"},{pos:[-6.25,3,0],size:[.5,6,12],mat:"metal"},{pos:[6.25,3,0],size:[.5,6,12],mat:"metal"},{pos:[-3.75,3,-6.25],size:[5.5,6,.5],mat:"metal"},{pos:[0,4.4,-6.25],size:[2,3.2,.5],mat:"metal"},{pos:[3.75,3,-6.25],size:[5.5,6,.5],mat:"metal"},{pos:[0,1.65,-7],size:[3,3.3,1],mat:"metal"},{pos:[-3.75,3,6.25],size:[5.5,6,.5],mat:"metal"},{pos:[0,4.4,6.25],size:[2,3.2,.5],mat:"metal"},{pos:[3.75,3,6.25],size:[5.5,6,.5],mat:"metal"},{pos:[0,1.65,7],size:[3,3.3,1],mat:"metal"},{pos:[100,-.25,0],size:[13,.5,13],mat:"concrete"},{pos:[100,6.25,0],size:[13,.5,13],mat:"metal"},{pos:[93.75,3,0],size:[.5,6,12],mat:"metal"},{pos:[98.25,3,-6.25],size:[9.5,6,.5],mat:"metal"},{pos:[104,4.4,-6.25],size:[2,3.2,.5],mat:"metal"},{pos:[105.75,3,-6.25],size:[1.5,6,.5],mat:"metal"},{pos:[104,1.65,-7],size:[3,3.3,1],mat:"metal"},{pos:[96.25,3,6.25],size:[5.5,6,.5],mat:"metal"},{pos:[100,4.4,6.25],size:[2,3.2,.5],mat:"metal"},{pos:[103.75,3,6.25],size:[5.5,6,.5],mat:"metal"},{pos:[100,1.65,7],size:[3,3.3,1],mat:"metal"},{pos:[106.25,3,-3.75],size:[.5,6,4.5],mat:"metal"},{pos:[106.25,3,3.75],size:[.5,6,4.5],mat:"metal"},{pos:[106.25,4.5,0],size:[.5,3,3],mat:"metal"},{pos:[109.5,-.25,0],size:[6,.5,4],mat:"concrete"},{pos:[109.5,3.25,0],size:[6,.5,4],mat:"metal"},{pos:[109.5,1.5,-1.75],size:[6,3,.5],mat:"metal"},{pos:[109.5,1.5,1.75],size:[6,3,.5],mat:"metal"},{pos:[112.25,1.5,0],size:[.5,3,3],mat:"metal"},{pos:[98.5,1.7,-5.98],size:[6,3.4,.04],mat:"white"},{pos:[200,-.25,0],size:[13,.5,13],mat:"concrete"},{pos:[200,6.25,0],size:[13,.5,13],mat:"metal"},{pos:[193.75,3,0],size:[.5,6,12],mat:"metal"},{pos:[206.25,3,0],size:[.5,6,12],mat:"metal"},{pos:[196.25,3,-6.25],size:[5.5,6,.5],mat:"metal"},{pos:[200,4.4,-6.25],size:[2,3.2,.5],mat:"metal"},{pos:[203.75,3,-6.25],size:[5.5,6,.5],mat:"metal"},{pos:[200,1.65,-7],size:[3,3.3,1],mat:"metal"},{pos:[196.25,3,6.25],size:[5.5,6,.5],mat:"metal"},{pos:[200,4.4,6.25],size:[2,3.2,.5],mat:"metal"},{pos:[203.75,3,6.25],size:[5.5,6,.5],mat:"metal"},{pos:[200,1.65,7],size:[3,3.3,1],mat:"metal"},{pos:[204.5,1.75,0],size:[3,3.5,12],mat:"metal"},{pos:[194.02,1.7,0],size:[.04,3.4,6],mat:"white"},{pos:[205.98,4.775,0],size:[.04,2.35,6],mat:"white"}],og=[{type:"gateway",a:{pos:[0,1.4,-6],normal:[0,0,1]},b:{pos:[100,1.4,6],normal:[0,0,-1]},size:[2,2.8],oneWay:"ab"},{type:"gateway",a:{pos:[104,1.4,-6],normal:[0,0,1]},b:{pos:[200,1.4,6],normal:[0,0,-1]},size:[2,2.8],oneWay:"ab"},{type:"gateway",a:{pos:[200,1.4,-6],normal:[0,0,1]},b:{pos:[0,1.4,6],normal:[0,0,-1]},size:[2,2.8],oneWay:"ab"},{type:"fizzler",pos:[200,1.5,-5.3],size:[2.4,3,.1]},{type:"button",id:"b1",pos:[98,0,1]},{type:"cube",pos:[204.5,3.85,3]},{type:"door",pos:[106.25,1.5,0],size:[.3,3,3],requires:["b1"]},{type:"exit",pos:[110.9,1.25,0],size:[2,2.5,2.6]},{type:"light",pos:[109.5,2.85,0],intensity:6},{type:"light",pos:[0,5.8,0],intensity:40,shadow:!0},{type:"light",pos:[100,5.8,0],intensity:40,shadow:!0,color:14214911},{type:"light",pos:[200,5.8,0],intensity:40,shadow:!0,color:16769728}],rg=1,ag={version:Q5,name:eg,hint:tg,gun:ng,spawn:ig,brushes:sg,entities:og,chapter:rg},cg=1,lg="爱丽丝的门",hg="拱门后面是一个“很小”的地方。小个子压不动按钮，被你抱着一起缩小的方块也一样。",ug="both",pg={pos:[3,0,6],yaw:20},dg=[{pos:[0,-.25,0],size:[17,.5,17],mat:"concrete"},{pos:[0,6.25,0],size:[17,.5,17],mat:"metal"},{pos:[-8.25,3,0],size:[.5,6,16],mat:"metal"},{pos:[8.25,3,0],size:[.5,6,16],mat:"metal"},{pos:[0,3,8.25],size:[17,6,.5],mat:"metal"},{pos:[-6.75,3,-8.25],size:[3.5,6,.5],mat:"metal"},{pos:[-4,4.5,-8.25],size:[2,3,.5],mat:"metal"},{pos:[2.75,3,-8.25],size:[11.5,6,.5],mat:"metal"},{pos:[-4,-.25,-9.35],size:[3,.5,1.7],mat:"concrete"},{pos:[-4,3.25,-9.35],size:[3,.5,1.7],mat:"metal"},{pos:[-5.25,1.5,-9.35],size:[.5,3,1.7],mat:"metal"},{pos:[-2.75,1.5,-9.35],size:[.5,3,1.7],mat:"metal"},{pos:[-4,1.5,-9.95],size:[2,3,.5],mat:"metal"},{pos:[-5.2,1.7,-7.75],size:[.4,3.4,.3],mat:"concrete"},{pos:[-2.8,1.7,-7.75],size:[.4,3.4,.3],mat:"concrete"},{pos:[-4,3.2,-7.75],size:[2.8,.4,.3],mat:"concrete"},{pos:[7.98,1.75,0],size:[.04,3.5,6],mat:"white"},{pos:[33,-.25,0],size:[7,.5,7],mat:"concrete"},{pos:[33,3.25,0],size:[7,.5,7],mat:"metal"},{pos:[33,1.5,-3.25],size:[7,3,.5],mat:"metal"},{pos:[33,1.5,3.25],size:[7,3,.5],mat:"metal"},{pos:[29.75,1.5,-1.875],size:[.5,3,3.25],mat:"metal"},{pos:[29.75,1.875,0],size:[.5,2.25,.5],mat:"metal"},{pos:[29.75,1.5,1.875],size:[.5,3,3.25],mat:"metal"},{pos:[29,.375,0],size:[1,1.75,2],mat:"metal"},{pos:[36.25,1.5,-1.925],size:[.5,3,3.15],mat:"metal"},{pos:[36.25,1.85,0],size:[.5,2.3,.7],mat:"metal"},{pos:[36.25,1.5,1.925],size:[.5,3,3.15],mat:"metal"},{pos:[34,1.3,-2.98],size:[3.2,2.6,.04],mat:"white"},{pos:[38,-.25,0],size:[3,.5,1.7],mat:"concrete"},{pos:[38,.95,0],size:[3,.5,1.7],mat:"metal"},{pos:[38,.35,-.6],size:[3,.7,.5],mat:"metal"},{pos:[38,.35,.6],size:[3,.7,.5],mat:"metal"},{pos:[39.75,.6,0],size:[.5,1.2,1.7],mat:"metal"}],fg=[{type:"gateway",a:{pos:[-4,1.5,-8],normal:[0,0,1]},b:{pos:[30,.375,0],normal:[1,0,0]},size:[2,3],sizeB:[.5,.75]},{type:"cube",pos:[-5,.31,3]},{type:"button",id:"b2",pos:[34,0,-.9]},{type:"door",pos:[36.25,.35,0],size:[.2,.7,.7],requires:["b2"]},{type:"exit",pos:[38.8,.35,0],size:[.9,.7,.6]},{type:"light",pos:[0,5.85,0],intensity:40,shadow:!0},{type:"light",pos:[-4,5.85,-6],intensity:18},{type:"light",pos:[33,2.85,0],intensity:14,shadow:!0},{type:"light",pos:[38,.6,0],intensity:1.2,fixture:!1,distance:3}],mg=2,gg={version:cg,name:lg,hint:hg,gun:ug,spawn:pg,brushes:dg,entities:fg,chapter:mg},_g=1,vg="千斤按钮",yg="黄黑相间的重型按钮要很重的东西才压得动。暖色的大号白板上开出的门特别大——从那里出来的东西也一样。",xg="both",Mg={pos:[3,0,7],yaw:0},Sg=[{pos:[0,-.25,0],size:[21,.5,21],mat:"concrete"},{pos:[0,9.25,0],size:[21,.5,21],mat:"metal"},{pos:[-10.25,4.5,0],size:[.5,9,20],mat:"metal"},{pos:[0,4.5,-10.25],size:[21,9,.5],mat:"metal"},{pos:[0,4.5,10.25],size:[21,9,.5],mat:"metal"},{pos:[10.25,4.5,-5.75],size:[.5,9,8.5],mat:"metal"},{pos:[10.25,4.5,5.75],size:[.5,9,8.5],mat:"metal"},{pos:[10.25,6,0],size:[.5,6,3],mat:"metal"},{pos:[13.5,-.25,0],size:[6,.5,4],mat:"concrete"},{pos:[13.5,3.25,0],size:[6,.5,4],mat:"metal"},{pos:[13.5,1.5,-1.75],size:[6,3,.5],mat:"metal"},{pos:[13.5,1.5,1.75],size:[6,3,.5],mat:"metal"},{pos:[16.25,1.5,0],size:[.5,3,3],mat:"metal"},{pos:[0,1.2,-7.5],size:[20,2.4,5],mat:"concrete"},{pos:[0,2.45,-5.075],size:[20,.1,.15],mat:"metal"},{pos:[-9.98,1.75,3],size:[.04,3.5,6],mat:"white"},{pos:[-5.5,2.9,9.98],size:[6,5.8,.04],mat:"whiteL"}],wg=[{type:"cube",pos:[-6,.31,4]},{type:"button",id:"hb",pos:[0,2.4,-7.5],heavy:!0},{type:"door",pos:[10.25,1.5,0],size:[.3,3,3],requires:["hb"]},{type:"exit",pos:[14.9,1.25,0],size:[2,2.5,2.6]},{type:"light",pos:[13.5,2.85,0],intensity:6},{type:"light",pos:[0,8.85,4],intensity:55,shadow:!0},{type:"light",pos:[0,8.85,-6],intensity:40,shadow:!0},{type:"light",pos:[-6,8.85,6],intensity:25}],Eg=2,bg={version:_g,name:vg,hint:yg,gun:xg,spawn:Mg,brushes:Sg,entities:wg,chapter:Eg},Tg=1,Ag="巨人一跃",zg="巨人跑得快、跳得远，可是普通大小的门和门洞都钻不进去。到了对岸，换个角度看看。",Rg="both",Cg={pos:[3,0,10],yaw:0},Pg=-6,Lg=[{pos:[0,11.25,-3],size:[15,.5,35],mat:"metal"},{pos:[-7.25,3.75,-3],size:[.5,14.5,35],mat:"metal"},{pos:[0,3.75,14.25],size:[15,14.5,.5],mat:"metal"},{pos:[0,3.75,-20.25],size:[15,14.5,.5],mat:"metal"},{pos:[7.25,3.75,-18.75],size:[.5,14.5,3.5],mat:"metal"},{pos:[7.25,-1.25,-16],size:[.5,4.5,2],mat:"metal"},{pos:[7.25,7.3,-16],size:[.5,7.4,2],mat:"metal"},{pos:[7.25,3.75,-.25],size:[.5,14.5,29.5],mat:"metal"},{pos:[0,-.25,7],size:[14,.5,14],mat:"concrete"},{pos:[0,-3.25,-3.5],size:[14,.5,7],mat:"concrete"},{pos:[0,-1.5,-.15],size:[14,3,.3],mat:"metal"},{pos:[0,-1,-6.85],size:[14,4,.3],mat:"metal"},{pos:[0,.75,-13.35],size:[14,.5,13.3],mat:"concrete"},{pos:[-4,6,-10.25],size:[6,10,.5],mat:"metal"},{pos:[11.5,.75,-16],size:[8,.5,9],mat:"concrete"},{pos:[11.5,4.75,-16],size:[8,.5,9],mat:"metal"},{pos:[11.5,2.75,-20.25],size:[8,3.5,.5],mat:"metal"},{pos:[11.5,2.75,-11.75],size:[8,3.5,.5],mat:"metal"},{pos:[15.25,2.75,-16],size:[.5,3.5,8],mat:"metal"},{pos:[-6.98,1.75,8],size:[.04,3.5,4],mat:"white"},{pos:[0,2.9,13.98],size:[6,5.8,.04],mat:"whiteL"},{pos:[-6.98,4,-16],size:[.04,6,7],mat:"whiteL"},{pos:[14.98,2.65,-16],size:[.04,3.3,4],mat:"white"}],Dg=[{type:"hazard",pos:[0,-2.2,-3.5],size:[14,1.6,7]},{type:"exit",pos:[12.5,2.25,-13.6],size:[2.2,2.5,2.2]},{type:"light",pos:[0,10.85,8],intensity:50,shadow:!0},{type:"light",pos:[0,10.85,-3],intensity:35},{type:"light",pos:[1,10.85,-15],intensity:50,shadow:!0},{type:"light",pos:[-5,10.85,-16],intensity:25},{type:"light",pos:[11,4.35,-16],intensity:14,shadow:!0}],Ig=2,Ug={version:Tg,name:Ag,hint:zg,gun:Rg,spawn:Cg,killY:Pg,brushes:Lg,entities:Dg,chapter:Ig},Ng=1,Fg="微缩工坊",Og="通风管只有小个子钻得过去。淡蓝色小号白板开出的门很小，穿过它的东西都会跟着变小——反过来走也一样。",Bg="both",Hg={pos:[0,0,8],yaw:0},Vg=[{pos:[0,-.25,2],size:[19,.5,17],mat:"concrete"},{pos:[0,7.25,2],size:[19,.5,17],mat:"metal"},{pos:[-9.25,3.5,2],size:[.5,7,16],mat:"metal"},{pos:[0,3.5,10.25],size:[19,7,.5],mat:"metal"},{pos:[9.25,3.5,-3.75],size:[.5,7,4.5],mat:"metal"},{pos:[9.25,3.5,5.75],size:[.5,7,8.5],mat:"metal"},{pos:[9.25,5,0],size:[.5,4,3],mat:"metal"},{pos:[12.5,-.25,0],size:[6,.5,4],mat:"concrete"},{pos:[12.5,3.25,0],size:[6,.5,4],mat:"metal"},{pos:[12.5,1.5,-1.75],size:[6,3,.5],mat:"metal"},{pos:[12.5,1.5,1.75],size:[6,3,.5],mat:"metal"},{pos:[15.25,1.5,0],size:[.5,3,3],mat:"metal"},{pos:[-2.375,3.5,-6.25],size:[14.25,7,.5],mat:"metal"},{pos:[5,4,-6.25],size:[.5,6,.5],mat:"metal"},{pos:[7.375,3.5,-6.25],size:[4.25,7,.5],mat:"metal"},{pos:[12.85,.4,0],size:[4.3,.8,3],mat:"concrete"},{pos:[-8.98,1.75,4.5],size:[.04,3.5,5],mat:"white"},{pos:[8.98,.8,4],size:[.04,1.6,2],mat:"whiteS"},{pos:[4.125,-.25,-8.125],size:[3.25,.5,3.25],mat:"concrete"},{pos:[4.125,1.25,-8.125],size:[3.25,.5,3.25],mat:"metal"},{pos:[3.625,.5,-7.625],size:[2.25,1,2.25],mat:"metal"},{pos:[5.5,.5,-8.125],size:[.5,1,3.25],mat:"metal"},{pos:[4.125,.5,-9.5],size:[3.25,1,.5],mat:"metal"},{pos:[-2,-.25,-11],size:[9,.5,9],mat:"concrete"},{pos:[-2,4.25,-11],size:[9,.5,9],mat:"metal"},{pos:[-6.25,2,-11],size:[.5,4,8],mat:"metal"},{pos:[-2,2,-15.25],size:[9,4,.5],mat:"metal"},{pos:[-2,2,-6.75],size:[9,4,.5],mat:"metal"},{pos:[2.25,2,-12.375],size:[.5,4,6.25],mat:"metal"},{pos:[2.25,2.5,-9],size:[.5,3,.5],mat:"metal"},{pos:[2.25,2,-7.625],size:[.5,4,2.25],mat:"metal"},{pos:[-2,3.98,-11],size:[2.6,.04,2.6],mat:"white"},{pos:[1.98,.8,-12.25],size:[.04,1.6,2.5],mat:"whiteS"},{pos:[-5.25,.6,-14.25],size:[1.5,1.2,1.5],mat:"metal"},{pos:[-5.5,1,-7.75],size:[1,2,1.5],mat:"metal"}],kg=[{type:"cube",pos:[-4,.31,5]},{type:"button",id:"b1",pos:[-2,0,-11]},{type:"door",pos:[9.25,1.5,0],size:[.3,3,3],requires:["b1"]},{type:"exit",pos:[13.9,2.05,0],size:[2,2.5,2.6]},{type:"light",pos:[12.5,2.85,0],intensity:6},{type:"light",pos:[0,6.85,4],intensity:45,shadow:!0},{type:"light",pos:[0,6.85,-3],intensity:25},{type:"light",pos:[-2,3.85,-11],intensity:20,shadow:!0},{type:"light",pos:[4,.9,-8],intensity:1.5,fixture:!1,distance:4}],Gg=2,Wg={version:Ng,name:Fg,hint:Og,gun:Bg,spawn:Hg,brushes:Vg,entities:kg,chapter:Gg},$g=1,Xg="套娃尺度",qg="小屋的门只有很小很小的人才进得去，缩小一次还不够。重型按钮要一块很大的方块，而只有巨人才搬得动它。",Yg="both",Zg={pos:[4,0,7.5],yaw:15},Jg=[{pos:[0,-.25,1],size:[19,.5,17],mat:"concrete"},{pos:[0,8.25,1],size:[19,.5,17],mat:"metal"},{pos:[-9.25,4,1],size:[.5,8,16],mat:"metal"},{pos:[0,4,-7.25],size:[19,8,.5],mat:"metal"},{pos:[0,4,9.25],size:[19,8,.5],mat:"metal"},{pos:[9.25,4,-4.25],size:[.5,8,5.5],mat:"metal"},{pos:[9.25,4,5.25],size:[.5,8,7.5],mat:"metal"},{pos:[9.25,5.5,0],size:[.5,5,3],mat:"metal"},{pos:[12.5,-.25,0],size:[6,.5,4],mat:"concrete"},{pos:[12.5,3.25,0],size:[6,.5,4],mat:"metal"},{pos:[12.5,1.5,-1.75],size:[6,3,.5],mat:"metal"},{pos:[12.5,1.5,1.75],size:[6,3,.5],mat:"metal"},{pos:[15.25,1.5,0],size:[.5,3,3],mat:"metal"},{pos:[-8.98,1.75,1.5],size:[.04,3.5,5],mat:"white"},{pos:[8.98,.8,6],size:[.04,1.6,2],mat:"whiteS"},{pos:[-5,2.9,-6.98],size:[6,5.8,.04],mat:"whiteL"},{pos:[-2.112,.75,4.8],size:[1.775,1.5,.4],mat:"concrete"},{pos:[-1,1.05,4.8],size:[.45,.9,.4],mat:"concrete"},{pos:[.112,.75,4.8],size:[1.775,1.5,.4],mat:"concrete"},{pos:[-1,.75,3.8],size:[4,1.5,1.6],mat:"concrete"},{pos:[-1,1.56,4],size:[4.3,.12,2.3],mat:"metal"},{pos:[-1,1.86,4],size:[3.2,.48,1.4],mat:"metal"},{pos:[35,-.25,0],size:[11,.5,13],mat:"concrete"},{pos:[35,6.25,0],size:[11,.5,13],mat:"metal"},{pos:[40.25,3,0],size:[.5,6,12],mat:"metal"},{pos:[35,3,-6.25],size:[11,6,.5],mat:"metal"},{pos:[35,3,6.25],size:[11,6,.5],mat:"metal"},{pos:[29.75,3,-3.8],size:[.5,6,5.4],mat:"metal"},{pos:[29.75,4.48,0],size:[.5,3.04,2.2],mat:"metal"},{pos:[29.75,3,3.8],size:[.5,6,5.4],mat:"metal"},{pos:[28.65,-.25,0],size:[1.7,.5,3.2],mat:"concrete"},{pos:[28.65,3.25,0],size:[1.7,.5,3.2],mat:"metal"},{pos:[28.65,1.5,-1.35],size:[1.7,3,.5],mat:"metal"},{pos:[28.65,1.5,1.35],size:[1.7,3,.5],mat:"metal"},{pos:[28.05,1.5,0],size:[.5,3,2.2],mat:"metal"},{pos:[32,1.6,-4.5],size:[4,3.2,3],mat:"concrete"},{pos:[33.95,3.35,-4.5],size:[.1,.3,3],mat:"metal"},{pos:[30.02,4.55,-4.5],size:[.04,2.7,2.6],mat:"white"},{pos:[30.02,1.75,4],size:[.04,3.5,3.4],mat:"white"},{pos:[37.5,.45,3.5],size:[3,.9,3],mat:"concrete"},{pos:[37.5,.96,3.5],size:[3.4,.12,3.4],mat:"metal"},{pos:[39.15,1.1,-4],size:[1.3,2.2,3],mat:"metal"}],Kg=[{type:"gateway",a:{pos:[30,1.48,0],normal:[1,0,0]},b:{pos:[-1,.3,5],normal:[0,0,1]},size:[2.2,2.96],sizeB:[.45,.6]},{type:"cube",pos:[32.3,3.51,-4.5]},{type:"button",id:"hb",pos:[5,0,-3],heavy:!0},{type:"door",pos:[9.25,1.5,0],size:[.3,3,3],requires:["hb"]},{type:"exit",pos:[13.9,1.25,0],size:[2,2.5,2.6]},{type:"light",pos:[12.5,2.85,0],intensity:6},{type:"light",pos:[0,7.85,4],intensity:45,shadow:!0},{type:"light",pos:[0,7.85,-3],intensity:35,shadow:!0},{type:"light",pos:[-1,.75,5.6],intensity:1,fixture:!1,distance:2.5,color:16767392},{type:"light",pos:[35,5.85,0],intensity:35,shadow:!0,color:16769720},{type:"light",pos:[32,5.85,-4.5],intensity:12,color:16769720}],jg=2,Qg={version:$g,name:Xg,hint:qg,gun:Yg,spawn:Zg,brushes:Jg,entities:Kg,chapter:jg},e2=1,t2="折光",n2="激光很烫，人过不去，但传送门可以绕过它。折射方块会把射进来的光，转向它正面朝着的方向。",i2="both",s2={pos:[-2,0,-3],yaw:180},o2=[{pos:[0,-.25,0],size:[17,.5,17],mat:"concrete"},{pos:[0,6.25,0],size:[17,.5,17],mat:"metal"},{pos:[-8.25,3,0],size:[.5,6,16],mat:"metal"},{pos:[0,3,-8.25],size:[17,6,.5],mat:"metal"},{pos:[0,3,8.25],size:[17,6,.5],mat:"metal"},{pos:[8.25,3,-6.5],size:[.5,6,3],mat:"metal"},{pos:[8.25,4.5,-4],size:[.5,3,2],mat:"metal"},{pos:[8.25,3,2.5],size:[.5,6,11],mat:"metal"},{pos:[11.5,-.25,-4],size:[6,.5,3],mat:"concrete"},{pos:[11.5,3.25,-4],size:[6,.5,3],mat:"metal"},{pos:[11.5,1.5,-5.25],size:[6,3,.5],mat:"metal"},{pos:[11.5,1.5,-2.75],size:[6,3,.5],mat:"metal"},{pos:[14.25,1.5,-4],size:[.5,3,2],mat:"metal"},{pos:[7.98,1.15,4],size:[.04,2.3,1.3],mat:"white"},{pos:[-1.5,.02,6.25],size:[3,.04,2.5],mat:"white"},{pos:[-7.98,1.15,-.5],size:[.04,2.3,1.3],mat:"white"},{pos:[5,.5,-.5],size:[1,1,1],mat:"metal"}],r2=[{type:"laser",pos:[-7.7,1.3,4],dir:[1,0,0]},{type:"catcher",id:"c1",pos:[5,1.3,-7.75],normal:[0,0,1]},{type:"cube",kind:"prism",pos:[-5,.31,6.5]},{type:"exit",pos:[12.9,1.25,-4],size:[2,2.5,1.6]},{type:"light",pos:[11.5,2.85,-4],intensity:6},{type:"door",pos:[8.25,1.5,-4],size:[.3,3,2],requires:["c1"]},{type:"light",pos:[-3,5.85,6],intensity:30,shadow:!0},{type:"light",pos:[-2,5.85,-3],intensity:35,shadow:!0},{type:"light",pos:[5,5.85,-4],intensity:25}],a2=3,c2={version:e2,name:t2,hint:n2,gun:i2,spawn:s2,brushes:o2,entities:r2,chapter:a2},l2=1,h2="双光束",u2="左下那台激光器要等第一个接收器亮了才会通电。一个方块、两扇门，各管一束光。先想清楚，最后你该站在哪儿。",p2="both",d2={pos:[0,0,2],yaw:0},f2=[{pos:[0,-.25,0],size:[19,.5,19],mat:"concrete"},{pos:[0,7.25,0],size:[19,.5,19],mat:"metal"},{pos:[-9.25,3.5,0],size:[.5,7,18],mat:"metal"},{pos:[9.25,3.5,0],size:[.5,7,18],mat:"metal"},{pos:[0,3.5,9.25],size:[19,7,.5],mat:"metal"},{pos:[-8.5,3.5,-9.25],size:[2,7,.5],mat:"metal"},{pos:[-6.5,5,-9.25],size:[2,4,.5],mat:"metal"},{pos:[2,3.5,-9.25],size:[15,7,.5],mat:"metal"},{pos:[-6.5,-.25,-12.5],size:[3,.5,6],mat:"concrete"},{pos:[-6.5,3.25,-12.5],size:[3,.5,6],mat:"metal"},{pos:[-7.75,1.5,-12.5],size:[.5,3,6],mat:"metal"},{pos:[-5.25,1.5,-12.5],size:[.5,3,6],mat:"metal"},{pos:[-6.5,1.5,-15.25],size:[2,3,.5],mat:"metal"},{pos:[8.98,1.35,6],size:[.04,2.3,1.3],mat:"white"},{pos:[-4,1.35,8.98],size:[1.3,2.3,.04],mat:"white"},{pos:[5,1.35,-8.98],size:[1.3,2.3,.04],mat:"white"},{pos:[5,.5,-4],size:[1,1,1],mat:"metal"}],m2=[{type:"laser",pos:[-8.7,1.3,6],dir:[1,0,0]},{type:"laser",pos:[-8.7,1.3,-4],dir:[1,0,0],when:["c1"]},{type:"catcher",id:"c1",pos:[-4,1.3,-8.75],normal:[0,0,1]},{type:"catcher",id:"c2",pos:[5,1.3,8.75],normal:[0,0,-1]},{type:"cube",kind:"prism",pos:[0,.31,-6.5]},{type:"exit",pos:[-6.5,1.25,-13.9],size:[1.6,2.5,2]},{type:"light",pos:[-6.5,2.85,-12.5],intensity:6},{type:"door",pos:[-6.5,1.5,-9.25],size:[2,3,.3],requires:["c1","c2"]},{type:"light",pos:[-4,6.85,-4],intensity:35,shadow:!0},{type:"light",pos:[4,6.85,4],intensity:35,shadow:!0},{type:"light",pos:[4,6.85,-5],intensity:20},{type:"light",pos:[-5,6.85,5],intensity:20}],g2=3,_2={version:l2,name:h2,hint:u2,gun:p2,spawn:d2,brushes:f2,entities:m2,chapter:g2},v2=1,y2="光之桥",x2="光桥是实心的，钻进哪扇门，你也能跟着走进去。激光也会跟着钻。方块放进光路就能挡住它，端着方块走，它就一直挡在你前面。",M2="both",S2={pos:[3,0,8.5],yaw:0},w2=[{pos:[0,-8.25,-3],size:[17,.5,27],mat:"concrete"},{pos:[0,10.25,-3],size:[17,.5,27],mat:"metal"},{pos:[-8.25,1,-3],size:[.5,18,26],mat:"metal"},{pos:[8.25,1,-3],size:[.5,18,26],mat:"metal"},{pos:[0,1,10.25],size:[17,18,.5],mat:"metal"},{pos:[-6.75,1,-16.25],size:[3.5,18,.5],mat:"metal"},{pos:[-4,-1,-16.25],size:[2,14,.5],mat:"metal"},{pos:[-4,9.5,-16.25],size:[2,1,.5],mat:"metal"},{pos:[2.75,1,-16.25],size:[11.5,18,.5],mat:"metal"},{pos:[-4,5.75,-19.5],size:[3,.5,6],mat:"concrete"},{pos:[-4,9.25,-19.5],size:[3,.5,6],mat:"metal"},{pos:[-5.25,7.5,-19.5],size:[.5,3,6],mat:"metal"},{pos:[-2.75,7.5,-19.5],size:[.5,3,6],mat:"metal"},{pos:[-4,7.5,-22.25],size:[2,3,.5],mat:"metal"},{pos:[0,-4,7],size:[16,8,6],mat:"concrete"},{pos:[0,-1,-13.5],size:[16,14,5],mat:"concrete"},{pos:[7.98,1.15,6],size:[.04,2.3,1.3],mat:"white"},{pos:[0,7.15,9.98],size:[1.3,2.3,.04],mat:"white"}],E2=[{type:"bridge",pos:[-7.7,.15,6],dir:[1,0,0]},{type:"laser",pos:[0,6.42,-15.7],dir:[0,0,1]},{type:"hazard",pos:[0,-7.5,-3.5],size:[16,1,15]},{type:"cube",pos:[-5,.31,8.2]},{type:"button",id:"b1",pos:[-6,6,-12.6]},{type:"exit",pos:[-4,7.25,-20.9],size:[1.6,2.5,2]},{type:"light",pos:[-4,8.85,-19.5],intensity:6},{type:"door",pos:[-4,7.5,-16.25],size:[2,3,.3],requires:["b1"]},{type:"light",pos:[0,9.85,7],intensity:45,shadow:!0},{type:"light",pos:[0,9.85,-3],intensity:35},{type:"light",pos:[0,9.85,-13],intensity:40,shadow:!0},{type:"light",pos:[0,-6,-3.5],intensity:12,color:8257386,fixture:!1,distance:14}],b2=3,T2={version:v2,name:y2,hint:x2,gun:M2,spawn:S2,brushes:w2,entities:E2,chapter:b2},A2=1,z2="弹射轨道",R2="弹射板会把站在上面的东西，抛向箭头所指的那面悬空的墙。落点上正好有一块白板。门的另一头开在哪里，东西就从哪里出来。",C2="both",P2={pos:[-4,0,8.6],yaw:0},L2=[{pos:[0,-6.25,-6],size:[17,.5,33],mat:"concrete"},{pos:[0,12.25,-6],size:[17,.5,33],mat:"metal"},{pos:[-8.25,3,-6],size:[.5,18,32],mat:"metal"},{pos:[8.25,3,-6],size:[.5,18,32],mat:"metal"},{pos:[0,3,10.25],size:[17,18,.5],mat:"metal"},{pos:[-4.75,3,-22.25],size:[7.5,18,.5],mat:"metal"},{pos:[0,-3,-22.25],size:[2,6,.5],mat:"metal"},{pos:[0,7.5,-22.25],size:[2,9,.5],mat:"metal"},{pos:[4.75,3,-22.25],size:[7.5,18,.5],mat:"metal"},{pos:[0,-.25,-25.5],size:[3,.5,6],mat:"concrete"},{pos:[0,3.25,-25.5],size:[3,.5,6],mat:"metal"},{pos:[-1.25,1.5,-25.5],size:[.5,3,6],mat:"metal"},{pos:[1.25,1.5,-25.5],size:[.5,3,6],mat:"metal"},{pos:[0,1.5,-28.25],size:[2,3,.5],mat:"metal"},{pos:[0,-3,6],size:[16,6,8],mat:"concrete"},{pos:[0,-3,-18],size:[16,6,8],mat:"concrete"},{pos:[0,8.2,-11.25],size:[1.6,7.6,.5],mat:"metal"},{pos:[0,5.65,-10.98],size:[1.3,2.3,.04],mat:"white"},{pos:[5,3,6],size:[2.2,6,2.2],mat:"metal"},{pos:[5,6.25,5],size:[2.2,.5,.2],mat:"metal"},{pos:[5,6.25,7],size:[2.2,.5,.2],mat:"metal"},{pos:[4,6.25,6],size:[.2,.5,1.8],mat:"metal"},{pos:[6,6.25,6],size:[.2,.5,1.8],mat:"metal"},{pos:[5,11.98,6],size:[1.3,.04,2.4],mat:"white"},{pos:[0,11.98,-18],size:[3,.04,3],mat:"white"}],D2=[{type:"launcher",pos:[0,0,5],target:[0,4.9,-11],time:1},{type:"hazard",pos:[0,-5.5,-6],size:[16,1,16]},{type:"cube",pos:[-4,.31,6.8]},{type:"button",id:"b1",pos:[5,6,6]},{type:"exit",pos:[0,1.25,-26.9],size:[1.6,2.5,2]},{type:"light",pos:[0,2.85,-25.5],intensity:6},{type:"door",pos:[0,1.5,-22.25],size:[2,3,.3],requires:["b1"]},{type:"light",pos:[-2,11.85,6],intensity:50,shadow:!0},{type:"light",pos:[0,11.85,-6],intensity:40},{type:"light",pos:[0,11.85,-18],intensity:45,shadow:!0},{type:"light",pos:[5,9,6],intensity:10,fixture:!1,distance:8},{type:"light",pos:[0,-4,-6],intensity:14,color:8257386,fixture:!1,distance:16}],I2=3,U2={version:A2,name:z2,hint:R2,gun:C2,spawn:P2,brushes:L2,entities:D2,chapter:I2},N2=1,F2="凝胶跑酷",O2="橙色推进凝胶让你越跑越快，速度穿过传送门不会丢。蓝色弹跳凝胶会把你弹回掉下来的高度。",B2="both",H2={pos:[-20,0,2],yaw:-90},V2=[{pos:[0,-6.25,-11],size:[17,.5,31],mat:"concrete"},{pos:[0,14.25,-11],size:[17,.5,31],mat:"metal"},{pos:[8.25,4,-11],size:[.5,20,30],mat:"metal"},{pos:[0,4,4.25],size:[17,20,.5],mat:"metal"},{pos:[-8.25,4,-13.25],size:[.5,20,26.5],mat:"metal"},{pos:[-8.25,10,2.25],size:[.5,8,4.5],mat:"metal"},{pos:[-8.25,-3,2.25],size:[.5,6,4.5],mat:"metal"},{pos:[-5,4,-26.25],size:[7,20,.5],mat:"metal"},{pos:[0,-3,-26.25],size:[3,6,.5],mat:"metal"},{pos:[0,8.5,-26.25],size:[3,11,.5],mat:"metal"},{pos:[5,4,-26.25],size:[7,20,.5],mat:"metal"},{pos:[0,-3,2],size:[16,6,4],mat:"concrete"},{pos:[0,-3,-19],size:[16,6,14],mat:"concrete"},{pos:[-15,-.25,2],size:[15,.5,5],mat:"concrete"},{pos:[-15,6.25,2],size:[15,.5,5],mat:"metal"},{pos:[-22.25,3,2],size:[.5,6,4],mat:"metal"},{pos:[-15,3,-.25],size:[15,6,.5],mat:"metal"},{pos:[-15,3,4.25],size:[15,6,.5],mat:"metal"},{pos:[-6.8,.015,2],size:[29.6,.03,2.8],mat:"speed"},{pos:[7.98,1.15,2],size:[.04,2.3,1.3],mat:"white"},{pos:[0,9.15,3.98],size:[1.3,2.3,.04],mat:"white"},{pos:[0,-.25,-33.25],size:[11,.5,14.5],mat:"concrete"},{pos:[0,18.25,-33.25],size:[11,.5,14.5],mat:"metal"},{pos:[-5.25,9,-33.25],size:[.5,18,13.5],mat:"metal"},{pos:[5.25,9,-33.25],size:[.5,18,13.5],mat:"metal"},{pos:[-3.5,9,-40.25],size:[4,18,.5],mat:"metal"},{pos:[0,4.5,-40.25],size:[3,9,.5],mat:"metal"},{pos:[0,15,-40.25],size:[3,6,.5],mat:"metal"},{pos:[3.5,9,-40.25],size:[4,18,.5],mat:"metal"},{pos:[0,16.25,-26.25],size:[11,4.5,.5],mat:"metal"},{pos:[0,4.5,-38],size:[10,9,4],mat:"concrete"},{pos:[0,.025,-34.2],size:[4,.05,3.6],mat:"bounce"},{pos:[-3.9,.02,-30.25],size:[1.4,.04,2.5],mat:"white"},{pos:[0,17.98,-34.3],size:[2.6,.04,2.6],mat:"white"},{pos:[0,2.75,-50.25],size:[7,.5,20.5],mat:"concrete"},{pos:[0,15.25,-50.25],size:[7,.5,20.5],mat:"metal"},{pos:[-3.25,9,-50.25],size:[.5,12,19.5],mat:"metal"},{pos:[3.25,9,-50.25],size:[.5,12,19.5],mat:"metal"},{pos:[0,9,-60.25],size:[7,12,.5],mat:"metal"},{pos:[0,13.75,-40.25],size:[7,3.5,.5],mat:"metal"},{pos:[0,6,-42.25],size:[6,6,3.5],mat:"concrete"},{pos:[0,6,-58],size:[6,6,4],mat:"concrete"}],k2=[{type:"hazard",pos:[0,-5.5,-6],size:[16,1,12]},{type:"hazard",pos:[0,3.5,-50],size:[6,1,12]},{type:"platform",pos:[0,8.8,-45.6],to:[0,8.8,-54.4],size:[2.8,.4,2.8],period:8},{type:"exit",pos:[0,10.25,-58.2],size:[2.4,2.5,2.4]},{type:"light",pos:[-15,5.85,2],intensity:25,shadow:!0},{type:"light",pos:[0,13.85,0],intensity:45,shadow:!0},{type:"light",pos:[0,13.85,-18],intensity:45,shadow:!0},{type:"light",pos:[0,-4,-6],intensity:14,color:8257386,fixture:!1,distance:16},{type:"light",pos:[0,17.85,-31],intensity:40,shadow:!0},{type:"light",pos:[0,14.85,-50],intensity:30,shadow:!0},{type:"light",pos:[0,6,-50],intensity:8,color:8257386,fixture:!1,distance:10}],G2=3,W2={version:N2,name:F2,hint:O2,gun:B2,spawn:H2,brushes:V2,entities:k2,chapter:G2},$2=1,X2="倒计时",q2="开关只让大门开 6 秒，走过去根本来不及。穿过力场会抹掉你的传送门——那就在力场另一边开门，然后别再碰它。",Y2="both",Z2={pos:[0,0,5],yaw:0},J2=[{pos:[-10.25,3.25,-13],size:[.5,13.5,42],mat:"metal"},{pos:[10.25,3.25,-13],size:[.5,13.5,42],mat:"metal"},{pos:[0,3.25,8.25],size:[21,13.5,.5],mat:"metal"},{pos:[0,10.25,-13],size:[21,.5,43],mat:"metal"},{pos:[-6,3.25,-34.25],size:[9,13.5,.5],mat:"metal"},{pos:[0,-1.75,-34.25],size:[3,3.5,.5],mat:"metal"},{pos:[0,6.5,-34.25],size:[3,7,.5],mat:"metal"},{pos:[6,3.25,-34.25],size:[9,13.5,.5],mat:"metal"},{pos:[0,-1.75,2],size:[20,3.5,12],mat:"concrete"},{pos:[0,-3.25,-10],size:[20,.5,12],mat:"concrete"},{pos:[0,-1.75,-25],size:[20,3.5,18],mat:"concrete"},{pos:[-5.75,5,-21.25],size:[8.5,10,.5],mat:"metal"},{pos:[0,6.5,-21.25],size:[3,7,.5],mat:"metal"},{pos:[2.25,5,-21.25],size:[1.5,10,.5],mat:"metal"},{pos:[5.5,.5,-21.25],size:[5,1,.5],mat:"metal"},{pos:[5.5,6.5,-21.25],size:[5,7,.5],mat:"metal"},{pos:[9,5,-21.25],size:[2,10,.5],mat:"metal"},{pos:[5.5,2,-21.25],size:[5,2,.1],mat:"grate"},{pos:[-9.98,1.3,3],size:[.04,2.6,4],mat:"white"},{pos:[-6,1.3,-21.52],size:[4,2.6,.04],mat:"white"},{pos:[0,-.25,-37.75],size:[4,.5,6.5],mat:"concrete"},{pos:[0,3.25,-37.75],size:[4,.5,6.5],mat:"metal"},{pos:[-1.75,1.5,-37.5],size:[.5,3,6],mat:"metal"},{pos:[1.75,1.5,-37.5],size:[.5,3,6],mat:"metal"},{pos:[0,1.5,-40.75],size:[3,3,.5],mat:"metal"}],K2=[{type:"switch",id:"s1",pos:[-7,0,6.5],yaw:0,timer:6},{type:"door",pos:[0,1.5,-34.25],size:[3,3,.3],requires:["s1"]},{type:"platform",pos:[0,-.2,-5.5],to:[0,-.2,-14.5],size:[3,.4,3],period:8},{type:"hazard",pos:[0,-2.2,-10],size:[20,1.6,12]},{type:"fizzler",pos:[0,1.5,-21.25],size:[3,3,.5]},{type:"exit",pos:[0,1.25,-38.9],size:[2.6,2.5,2]},{type:"light",pos:[0,2.85,-37.5],intensity:6},{type:"light",pos:[0,9.8,3],intensity:55,shadow:!0},{type:"light",pos:[0,9.8,-10],intensity:45},{type:"light",pos:[0,9.8,-27],intensity:55,shadow:!0},{type:"light",pos:[-7,3,7.6],intensity:6,fixture:!1,color:12574975}],j2=4,Q2={version:$2,name:X2,hint:q2,gun:Y2,spawn:Z2,brushes:J2,entities:K2,chapter:j2},e_=1,t_="光与影",n_="最低的那道激光离地 0.6 米。门的大小决定你的大小——一次缩得不够，就缩得更狠一点。",i_="both",s_={pos:[0,0,7],yaw:0},o_=[{pos:[0,-.25,-3],size:[17,.5,27],mat:"concrete"},{pos:[0,8.25,-3],size:[17,.5,27],mat:"metal"},{pos:[-8.25,4,-3],size:[.5,8,26],mat:"metal"},{pos:[8.25,4,-3],size:[.5,8,26],mat:"metal"},{pos:[0,4,10.25],size:[17,8,.5],mat:"metal"},{pos:[-7,4,-16.25],size:[3,8,.5],mat:"metal"},{pos:[-4,5.5,-16.25],size:[3,5,.5],mat:"metal"},{pos:[3,4,-16.25],size:[11,8,.5],mat:"metal"},{pos:[0,5.2,-2],size:[16,5.6,.1],mat:"glass"},{pos:[5,.15,-2],size:[1.2,.3,1.2],mat:"metal"},{pos:[-2,4,-6.25],size:[12,8,.5],mat:"metal"},{pos:[-7.98,2.8,4.5],size:[.04,5.6,7],mat:"whiteL"},{pos:[7.98,.6,5],size:[.04,1.2,2],mat:"whiteS"},{pos:[-4.5,2.8,-6.52],size:[5,5.6,.04],mat:"whiteL"},{pos:[-4,-.25,-19.75],size:[4,.5,6.5],mat:"concrete"},{pos:[-4,3.25,-19.75],size:[4,.5,6.5],mat:"metal"},{pos:[-5.75,1.5,-19.5],size:[.5,3,6],mat:"metal"},{pos:[-2.25,1.5,-19.5],size:[.5,3,6],mat:"metal"},{pos:[-4,1.5,-22.75],size:[3,3,.5],mat:"metal"}],r_=[{type:"laser",pos:[-7.7,.6,-2],dir:[1,0,0]},{type:"laser",pos:[-7.7,1.25,-2],dir:[1,0,0]},{type:"laser",pos:[-7.7,1.9,-2],dir:[1,0,0]},{type:"catcher",id:"c1",pos:[5,.6,9.75],normal:[0,0,-1]},{type:"cube",kind:"prism",pos:[0,.31,-11],yaw:0},{type:"door",pos:[-4,1.5,-16.25],size:[3,3,.3],requires:["c1"]},{type:"exit",pos:[-4,1.25,-20.9],size:[2.6,2.5,2]},{type:"light",pos:[-4,2.85,-19.5],intensity:6},{type:"light",pos:[0,7.8,5],intensity:45,shadow:!0},{type:"light",pos:[0,7.8,-3],intensity:30},{type:"light",pos:[-1,7.8,-11],intensity:40,shadow:!0},{type:"light",pos:[7.5,1.6,5],intensity:4,fixture:!1,color:12574975}],a_=4,c_={version:e_,name:t_,hint:n_,gun:i_,spawn:s_,brushes:o_,entities:r_,chapter:a_},l_=1,h_="迷途回廊",u_="这边没有一块白板，所以桥只能从“别的地方”伸过来。力场挡住了方块，却挡不住传送门。",p_="both",d_={pos:[0,0,2],yaw:180},f_=-12,m_=[{pos:[-10.25,1.75,-12],size:[.5,16.5,41],mat:"metal"},{pos:[10.25,1.75,-12],size:[.5,16.5,41],mat:"metal"},{pos:[0,10.25,-12],size:[21,.5,41],mat:"metal"},{pos:[0,1.75,-32.25],size:[21,16.5,.5],mat:"metal"},{pos:[-8.5,5,8.25],size:[3,10,.5],mat:"metal"},{pos:[-6,6.5,8.25],size:[2,7,.5],mat:"metal"},{pos:[-3,5,8.25],size:[4,10,.5],mat:"metal"},{pos:[0,6.5,8.25],size:[2,7,.5],mat:"metal"},{pos:[3,5,8.25],size:[4,10,.5],mat:"metal"},{pos:[6,6.5,8.25],size:[2,7,.5],mat:"metal"},{pos:[8.5,5,8.25],size:[3,10,.5],mat:"metal"},{pos:[-6,-.25,9.5],size:[3,.5,2],mat:"concrete"},{pos:[-6,3.25,9.5],size:[3,.5,2],mat:"metal"},{pos:[-6,1.5,10.25],size:[3,3,.5],mat:"metal"},{pos:[-7.25,1.5,9.25],size:[.5,3,1.5],mat:"metal"},{pos:[-4.75,1.5,9.25],size:[.5,3,1.5],mat:"metal"},{pos:[0,-.25,9.5],size:[3,.5,2],mat:"concrete"},{pos:[0,3.25,9.5],size:[3,.5,2],mat:"metal"},{pos:[0,1.5,10.25],size:[3,3,.5],mat:"metal"},{pos:[-1.25,1.5,9.25],size:[.5,3,1.5],mat:"metal"},{pos:[1.25,1.5,9.25],size:[.5,3,1.5],mat:"metal"},{pos:[6,-.25,9.5],size:[3,.5,2],mat:"concrete"},{pos:[6,3.25,9.5],size:[3,.5,2],mat:"metal"},{pos:[6,1.5,10.25],size:[3,3,.5],mat:"metal"},{pos:[4.75,1.5,9.25],size:[.5,3,1.5],mat:"metal"},{pos:[7.25,1.5,9.25],size:[.5,3,1.5],mat:"metal"},{pos:[0,-3.25,1],size:[20,6.5,14],mat:"concrete"},{pos:[0,-6.25,-14],size:[20,.5,16],mat:"concrete"},{pos:[0,-3.25,-27],size:[20,6.5,10],mat:"concrete"},{pos:[56,-.25,0],size:[13,.5,13],mat:"concrete"},{pos:[56,6.25,0],size:[13,.5,13],mat:"metal"},{pos:[56,3,-6.25],size:[13,6,.5],mat:"metal"},{pos:[56,3,6.25],size:[13,6,.5],mat:"metal"},{pos:[49.75,3,-3.75],size:[.5,6,5.5],mat:"metal"},{pos:[49.75,4.5,0],size:[.5,3,2],mat:"metal"},{pos:[49.75,3,3.75],size:[.5,6,5.5],mat:"metal"},{pos:[48.75,-.25,0],size:[1.5,.5,3],mat:"concrete"},{pos:[48.75,3.25,0],size:[1.5,.5,3],mat:"metal"},{pos:[48.25,1.5,0],size:[.5,3,3],mat:"metal"},{pos:[49,1.5,-1.25],size:[1,3,.5],mat:"metal"},{pos:[49,1.5,1.25],size:[1,3,.5],mat:"metal"},{pos:[62.25,3,-2],size:[.5,6,9],mat:"metal"},{pos:[62.25,4.5,4],size:[.5,3,3],mat:"metal"},{pos:[62.25,3,6],size:[.5,6,1],mat:"metal"},{pos:[64,-.25,4],size:[3,.5,4],mat:"concrete"},{pos:[64,3.25,4],size:[3,.5,4],mat:"metal"},{pos:[64,1.5,2.25],size:[3,3,.5],mat:"metal"},{pos:[64,1.5,5.75],size:[3,3,.5],mat:"metal"},{pos:[65.25,1.5,4],size:[.5,3,3],mat:"metal"},{pos:[64.98,1.15,4],size:[.04,2.3,2.6],mat:"white"},{pos:[56,1.15,-5.98],size:[3,2.3,.04],mat:"white"},{pos:[61.98,1.15,0],size:[.04,2.3,3],mat:"white"}],g_=[{type:"gateway",a:{pos:[-6,1.5,8],normal:[0,0,-1]},b:{pos:[50,1.5,0],normal:[1,0,0]},size:[2,3]},{type:"gateway",a:{pos:[0,1.5,8],normal:[0,0,-1]},b:{pos:[6,1.5,8],normal:[0,0,-1]},size:[2,3]},{type:"hazard",pos:[0,-5.2,-14],size:[20,1.6,16]},{type:"bridge",pos:[56,.15,5.7],dir:[0,0,-1],when:["b1"]},{type:"button",id:"b1",pos:[53,0,3]},{type:"cube",pos:[63.2,.31,3.1]},{type:"fizzler",pos:[62.25,1.5,4],size:[.5,3,3]},{type:"exit",pos:[0,1.25,-28.5],size:[2.4,2.5,2.4]},{type:"light",pos:[0,9.8,2],intensity:50,shadow:!0},{type:"light",pos:[0,9.8,-14],intensity:35},{type:"light",pos:[0,9.8,-27],intensity:45,shadow:!0},{type:"light",pos:[56,5.8,0],intensity:40,shadow:!0,color:14214911},{type:"light",pos:[63.8,2.85,4],intensity:5}],__=4,v_={version:l_,name:h_,hint:u_,gun:p_,spawn:d_,killY:f_,brushes:m_,entities:g_,chapter:__},y_=1,x_="重力陷阱",M_="体型越大，弹得越高，也越重。可是太大了，有的门就钻不过去。",S_="both",w_={pos:[0,0,7],yaw:0},E_=[{pos:[-10.25,5.75,-12],size:[.5,16.5,44],mat:"metal"},{pos:[10.25,5.75,-12],size:[.5,16.5,44],mat:"metal"},{pos:[0,5.75,10.25],size:[21,16.5,.5],mat:"metal"},{pos:[0,14.25,-12],size:[21,.5,45],mat:"metal"},{pos:[-6,5.75,-34.25],size:[9,16.5,.5],mat:"metal"},{pos:[0,1.25,-34.25],size:[3,7.5,.5],mat:"metal"},{pos:[0,11,-34.25],size:[3,6,.5],mat:"metal"},{pos:[6,5.75,-34.25],size:[9,16.5,.5],mat:"metal"},{pos:[0,-1.25,3],size:[20,2.5,14],mat:"concrete"},{pos:[-6.5,-1.25,-6],size:[7,2.5,4],mat:"concrete"},{pos:[6.5,-1.25,-6],size:[7,2.5,4],mat:"concrete"},{pos:[0,-1.25,-6],size:[6,2.5,4],mat:"bounce"},{pos:[0,-2.25,-11],size:[20,.5,6],mat:"concrete"},{pos:[0,1.25,-24],size:[20,7.5,20],mat:"concrete"},{pos:[-6,9.5,-20.25],size:[8,9,.5],mat:"metal"},{pos:[0,11.75,-20.25],size:[4,4.5,.5],mat:"metal"},{pos:[6,9.5,-20.25],size:[8,9,.5],mat:"metal"},{pos:[-9.98,1.3,4],size:[.04,2.6,4],mat:"white"},{pos:[9.98,2.8,3],size:[.04,5.6,6],mat:"whiteL"},{pos:[6,7.8,-20.52],size:[6,5.6,.04],mat:"whiteL"},{pos:[-7,6.3,-20.52],size:[4,2.6,.04],mat:"white"},{pos:[0,4.75,-37.75],size:[4,.5,6.5],mat:"concrete"},{pos:[0,8.25,-37.75],size:[4,.5,6.5],mat:"metal"},{pos:[-1.75,6.5,-37.5],size:[.5,3,6],mat:"metal"},{pos:[1.75,6.5,-37.5],size:[.5,3,6],mat:"metal"},{pos:[0,6.5,-40.75],size:[3,3,.5],mat:"metal"}],b_=[{type:"cube",pos:[-4,.31,4]},{type:"hazard",pos:[0,-1.2,-11],size:[20,1.6,6]},{type:"button",id:"hb",pos:[0,5,-27],heavy:!0},{type:"door",pos:[0,6.5,-34.25],size:[3,3,.3],requires:["hb"]},{type:"exit",pos:[0,6.25,-38.9],size:[2.6,2.5,2]},{type:"light",pos:[0,7.85,-37.5],intensity:6},{type:"light",pos:[0,13.8,4],intensity:70,shadow:!0},{type:"light",pos:[0,13.8,-11],intensity:50},{type:"light",pos:[0,13.8,-27],intensity:60,shadow:!0},{type:"light",pos:[0,13.8,-17],intensity:35}],T_=4,A_={version:y_,name:x_,hint:M_,gun:S_,spawn:w_,brushes:E_,entities:b_,chapter:T_},z_=1,R_="终极试炼",C_="四个房间，四道考验：光、缩、力、升。每一关都用得上你学过的东西——包括隔着传送门伸手。",P_="both",L_={pos:[0,0,4],yaw:0},D_=-10,I_=[{pos:[0,-.25,-4],size:[17,.5,21],mat:"concrete"},{pos:[0,7.25,-4],size:[17,.5,21],mat:"metal"},{pos:[-8.25,3.5,-4],size:[.5,7,20],mat:"metal"},{pos:[8.25,3.5,-4],size:[.5,7,20],mat:"metal"},{pos:[0,3.5,6.25],size:[17,7,.5],mat:"metal"},{pos:[-5,3.5,-14.25],size:[7,7,.5],mat:"metal"},{pos:[0,5,-14.25],size:[3,4,.5],mat:"metal"},{pos:[5,3.5,-14.25],size:[7,7,.5],mat:"metal"},{pos:[-5,2,4.5],size:[6,4,3],mat:"metal"},{pos:[-5,5.3,5.98],size:[4,2.6,.04],mat:"white"},{pos:[7.98,1.3,2],size:[.04,2.6,4],mat:"white"},{pos:[7.98,2.5,-4],size:[.04,2.6,1.3],mat:"white"},{pos:[5,2.5,5.98],size:[1.3,2.6,.04],mat:"white"},{pos:[0,-.25,-24.25],size:[17,.5,19.5],mat:"concrete"},{pos:[0,6.25,-24.25],size:[17,.5,19.5],mat:"metal"},{pos:[8.25,3,-24.25],size:[.5,6,19.5],mat:"metal"},{pos:[-8.25,3,-29.5],size:[.5,6,9],mat:"metal"},{pos:[-8.25,4.5,-24],size:[.5,3,2],mat:"metal"},{pos:[-8.25,3,-18.75],size:[.5,6,8.5],mat:"metal"},{pos:[-9.25,-.25,-24],size:[1.5,.5,3],mat:"concrete"},{pos:[-9.25,3.75,-24],size:[1.5,.5,3],mat:"metal"},{pos:[-9.25,1.75,-25.25],size:[1.5,3.5,.5],mat:"metal"},{pos:[-9.25,1.75,-22.75],size:[1.5,3.5,.5],mat:"metal"},{pos:[-9.75,1.75,-24],size:[.5,3.5,2],mat:"metal"},{pos:[-5,8,-34.25],size:[7,16,.5],mat:"metal"},{pos:[0,9.5,-34.25],size:[3,13,.5],mat:"metal"},{pos:[5,8,-34.25],size:[7,16,.5],mat:"metal"},{pos:[62,-.25,0],size:[5,.5,5],mat:"concrete"},{pos:[62,2.05,0],size:[5,.5,5],mat:"metal"},{pos:[64.25,.9,0],size:[.5,1.8,4],mat:"metal"},{pos:[62,.9,-2.25],size:[5,1.8,.5],mat:"metal"},{pos:[62,.9,2.25],size:[5,1.8,.5],mat:"metal"},{pos:[59.75,.9,-1.375],size:[.5,1.8,2.25],mat:"metal"},{pos:[59.75,1.275,0],size:[.5,1.05,.5],mat:"metal"},{pos:[59.75,.9,1.375],size:[.5,1.8,2.25],mat:"metal"},{pos:[59,-.25,0],size:[1,.5,1.5],mat:"concrete"},{pos:[59,1.1,0],size:[1,.2,1.5],mat:"metal"},{pos:[58.6,.5,0],size:[.2,1,1.5],mat:"metal"},{pos:[59.1,.5,-.625],size:[.8,1,.25],mat:"metal"},{pos:[59.1,.5,.625],size:[.8,1,.25],mat:"metal"},{pos:[63.25,.3,0],size:[1.5,.6,4],mat:"metal"},{pos:[61.25,.55,-1.98],size:[1.5,1.1,.04],mat:"whiteS"},{pos:[63.25,1.15,1.98],size:[1.3,1.1,.04],mat:"whiteS"},{pos:[-8.25,6.5,-50.25],size:[.5,19,31.5],mat:"metal"},{pos:[8.25,6.5,-50.25],size:[.5,19,31.5],mat:"metal"},{pos:[0,16.25,-50.25],size:[17,.5,31.5],mat:"metal"},{pos:[0,-1.5,-39.25],size:[16,3,9.5],mat:"concrete"},{pos:[0,-2.75,-48],size:[16,.5,8],mat:"concrete"},{pos:[0,-1.5,-59],size:[16,3,14],mat:"concrete"},{pos:[0,15.98,-40.5],size:[5,.04,7],mat:"white"},{pos:[0,12.6,-34.52],size:[4,2.4,.04],mat:"white"},{pos:[-5,8,-66.25],size:[7,16,.5],mat:"metal"},{pos:[0,9.5,-66.25],size:[3,13,.5],mat:"metal"},{pos:[5,8,-66.25],size:[7,16,.5],mat:"metal"},{pos:[0,-.25,-81.5],size:[17,.5,31],mat:"concrete"},{pos:[0,12.25,-81.5],size:[17,.5,31],mat:"metal"},{pos:[-8.25,6,-81.5],size:[.5,12,30],mat:"metal"},{pos:[8.25,6,-81.5],size:[.5,12,30],mat:"metal"},{pos:[0,6,-96.75],size:[17,12,.5],mat:"metal"},{pos:[0,3,-92.5],size:[16,6,8],mat:"metal"},{pos:[0,1.3,-88.48],size:[3,2.6,.04],mat:"white"},{pos:[3.05,6,-69.5],size:[.1,12,6],mat:"grate"},{pos:[5.55,6,-72.55],size:[4.9,12,.1],mat:"grate"},{pos:[7.98,1.3,-69.5],size:[.04,2.6,1.6],mat:"white"}],U_=[{type:"laser",pos:[-7.7,2.2,-4],dir:[1,0,0]},{type:"laser",pos:[-5,.31,-13.7],dir:[0,0,1]},{type:"catcher",id:"c1",pos:[5,2.2,-13.75],normal:[0,0,1]},{type:"catcher",id:"c2",pos:[-7.75,.5,-8],normal:[1,0,0]},{type:"cube",kind:"prism",pos:[-3.6,4.31,4.2],yaw:0},{type:"door",pos:[0,1.5,-14.25],size:[3,3,.3],requires:["c1","c2"]},{type:"light",pos:[0,6.8,0],intensity:40,shadow:!0},{type:"light",pos:[0,6.8,-10],intensity:30},{type:"gateway",a:{pos:[-8,1.5,-24],normal:[1,0,0]},b:{pos:[60,.375,0],normal:[1,0,0]},size:[2,3],sizeB:[.5,.75]},{type:"cube",pos:[63.3,.675,-1.2],scale:.25},{type:"button",id:"b2",pos:[0,0,-28]},{type:"door",pos:[0,1.5,-34.25],size:[3,3,.3],requires:["b2"]},{type:"light",pos:[0,5.8,-24],intensity:40,shadow:!0},{type:"light",pos:[62,1.7,0],intensity:3,distance:6},{type:"launcher",pos:[0,0,-39.5],target:[0,20,-40.5],time:1.1},{type:"hazard",pos:[0,-1.7,-48],size:[16,1.6,8]},{type:"fizzler",pos:[0,8,-48],size:[16,16,.1]},{type:"light",pos:[0,15.8,-40],intensity:50,shadow:!0},{type:"light",pos:[0,15.8,-59],intensity:50},{type:"switch",id:"s2",pos:[7,0,-69.5],yaw:-90,timer:5},{type:"platform",pos:[0,-.2,-87],to:[0,5.8,-87],size:[3,.4,3],speed:2,when:["s2"]},{type:"exit",pos:[0,7.25,-93.5],size:[2.2,2.5,2.2]},{type:"light",pos:[0,11.8,-74.5],intensity:45,shadow:!0},{type:"light",pos:[0,11.8,-90.5],intensity:40}],N_=4,F_={version:z_,name:R_,hint:C_,gun:P_,spawn:L_,killY:D_,brushes:I_,entities:U_,chapter:N_},O_=1,B_="空门",H_="圆台一踩，壁龛就变成了窗。可窗只在你踩着的时候才存在——这时候，出口去哪儿了？",V_="none",k_={pos:[0,0,5.5],yaw:0},G_=[{pos:[0,-.25,1.5],size:[15,.5,12],mat:"concrete"},{pos:[0,4.75,1.5],size:[15,.5,12],mat:"metal"},{pos:[-7.25,2.25,1.5],size:[.5,4.5,11],mat:"metal"},{pos:[7.25,2.25,1.5],size:[.5,4.5,11],mat:"metal"},{pos:[0,2.25,7.25],size:[15,4.5,.5],mat:"metal"},{pos:[-4.3,2.25,-4.25],size:[6.4,4.5,.5],mat:"metal"},{pos:[0,3.55,-4.25],size:[2.2,1.9,.5],mat:"metal"},{pos:[4.3,2.25,-4.25],size:[6.4,4.5,.5],mat:"metal"},{pos:[-1.35,1.55,-5.8],size:[.5,3.1,2.6],mat:"metal"},{pos:[1.35,1.55,-5.8],size:[.5,3.1,2.6],mat:"metal"},{pos:[0,2.85,-5.8],size:[2.2,.5,2.6],mat:"metal"},{pos:[0,1.3,-6.85],size:[2.2,2.6,.5],mat:"metal"},{pos:[0,-.25,-5.8],size:[3.2,.5,2.6],mat:"concrete"},{pos:[0,.085,-6.525],size:[2.2,.07,.05],mat:"glow",color:16757575,intensity:1.8,deco:!0},{pos:[-1.055,1.3,-6.475],size:[.05,2.4,.05],mat:"glow",color:16757575,intensity:1.2,deco:!0},{pos:[1.055,1.3,-6.475],size:[.05,2.4,.05],mat:"glow",color:16757575,intensity:1.2,deco:!0},{pos:[-6.2,.275,-3.2],size:[.77,.55,.77],mat:"concrete",color:13624284},{pos:[-6.2,1.155,-3.2],size:[1.21,1.21,1.21],mat:"grass",shape:"sphere",color:5222008,deco:!0},{pos:[-5.925,.935,-3.365],size:[.77,.77,.77],mat:"grass",shape:"sphere",color:4168808,deco:!0},{pos:[6.2,.275,-3.2],size:[.77,.55,.77],mat:"concrete",color:13624284},{pos:[6.2,1.155,-3.2],size:[1.21,1.21,1.21],mat:"grass",shape:"sphere",color:5222008,deco:!0},{pos:[6.475,.935,-3.365],size:[.77,.77,.77],mat:"grass",shape:"sphere",color:4168808,deco:!0},{pos:[6.4,.225,6.2],size:[.63,.45,.63],mat:"concrete",color:13624284},{pos:[6.4,.945,6.2],size:[.99,.99,.99],mat:"grass",shape:"sphere",color:5222008,deco:!0},{pos:[6.625,.765,6.065],size:[.63,.63,.63],mat:"grass",shape:"sphere",color:4168808,deco:!0},{pos:[4.5,.225,1],size:[2.2,.45,.8],mat:"concrete"},{pos:[0,.01,-2.2],size:[2.1,.02,2.1],mat:"glow",shape:"cyl",color:16757575,intensity:.7,deco:!0},{pos:[100,-.25,-2],size:[13,.5,13],mat:"concrete"},{pos:[100,4.75,-2],size:[13,.5,13],mat:"metal"},{pos:[93.75,2.25,-2],size:[.5,4.5,12],mat:"metal"},{pos:[106.25,2.25,-2],size:[.5,4.5,12],mat:"metal"},{pos:[100,2.25,-8.25],size:[13,4.5,.5],mat:"metal"},{pos:[96.2,2.25,4.25],size:[5.4,4.5,.5],mat:"metal"},{pos:[100,3.55,4.25],size:[2.2,1.9,.5],mat:"metal"},{pos:[103.8,2.25,4.25],size:[5.4,4.5,.5],mat:"metal"},{pos:[98.65,1.55,5.55],size:[.5,3.1,2.1],mat:"metal"},{pos:[101.35,1.55,5.55],size:[.5,3.1,2.1],mat:"metal"},{pos:[100,2.85,5.55],size:[2.2,.5,2.1],mat:"metal"},{pos:[100,1.3,6.35],size:[2.2,2.6,.5],mat:"metal"},{pos:[100,-.25,5.55],size:[3.2,.5,2.1],mat:"concrete"},{pos:[96,2.25,-6],size:[1,4.5,1],mat:"metal"},{pos:[104,2.25,-6],size:[1,4.5,1],mat:"metal"},{pos:[96,2.25,-1],size:[1,4.5,1],mat:"metal"},{pos:[104,2.25,-1],size:[1,4.5,1],mat:"metal"},{pos:[100,.01,3.1],size:[2.1,.02,2.1],mat:"glow",shape:"cyl",color:16757575,intensity:.7,deco:!0}],W_=[{type:"cube",pos:[-4,.3,2]},{type:"button",id:"p",pos:[0,0,-2.2]},{type:"button",id:"pv",pos:[100,0,3.1]},{type:"gateway",a:{pos:[0,1.3,-4],normal:[0,0,1]},b:{pos:[100,1.3,4],normal:[0,0,-1]},size:[2.2,2.6],when:["p"]},{type:"exit",pos:[0,1,-5.3],size:[1.8,2,1.8],when:["pv"]},{type:"light",pos:[-3,4.2,1],intensity:40,color:16771528},{type:"light",pos:[3,4.2,4],intensity:34,color:16771528},{type:"light",pos:[0,2.3,-5.6],intensity:9,color:16757575,fixture:!1,distance:7},{type:"light",pos:[100,4.2,-2],intensity:46,color:13495039,distance:26},{type:"light",pos:[100,2.6,2.6],intensity:8,color:16757575,fixture:!1,distance:6}],$_=5,X_="出口一直在壁龛里，是窗把它遮住了。人进不去窗，方块可以：踩着圆台把方块递过去，松开脚，窗消失，出口就亮了。",q_={version:O_,name:B_,hint:H_,gun:V_,spawn:k_,brushes:G_,entities:W_,chapter:$_,reveal:X_},Y_=1,Z_="归巢",J_="出口门只认那块板。方块一旦拿走，得想个办法让它回到出生的地方。",K_="none",j_={pos:[0,0,10],yaw:0},Q_=[{pos:[0,-.25,6.25],size:[17,.5,12.5],mat:"concrete"},{pos:[0,5.25,6],size:[17,.5,13],mat:"metal"},{pos:[-8.25,2.5,6.25],size:[.5,5,12.5],mat:"metal"},{pos:[8.25,2.5,6.25],size:[.5,5,12.5],mat:"metal"},{pos:[0,2.5,12.25],size:[17,5,.5],mat:"metal"},{pos:[0,-4.25,-11.5],size:[17,.5,22],mat:"concrete"},{pos:[0,5.25,-11.5],size:[17,.5,22],mat:"metal"},{pos:[-8.25,.5,-11.5],size:[.5,9,22],mat:"metal"},{pos:[8.25,.5,-11.5],size:[.5,9,22],mat:"metal"},{pos:[-5,.5,-.25],size:[7,9,.5],mat:"metal"},{pos:[0,4,-.25],size:[3,2,.5],mat:"metal"},{pos:[2.75,.5,-.25],size:[2.5,9,.5],mat:"metal"},{pos:[5.75,-2,-.25],size:[3.5,4,.5],mat:"metal"},{pos:[5.75,4,-.25],size:[3.5,2,.5],mat:"metal"},{pos:[8,.5,-.25],size:[1,9,.5],mat:"metal"},{pos:[5.75,1.5,-.25],size:[3.5,3,.5],mat:"glass"},{pos:[0,-2,-.25],size:[3,4,.5],mat:"concrete"},{pos:[0,-2,-3.25],size:[6,4,5.5],mat:"concrete"},{pos:[-5,.5,-22.25],size:[7,9,.5],mat:"metal"},{pos:[0,2,-22.25],size:[3,6,.5],mat:"metal"},{pos:[5,.5,-22.25],size:[7,9,.5],mat:"metal"},{pos:[0,-4.25,-25.25],size:[4,.5,6.5],mat:"concrete"},{pos:[0,-.75,-25.25],size:[4,.5,6.5],mat:"metal"},{pos:[-1.75,-2.5,-25.25],size:[.5,3,6.5],mat:"metal"},{pos:[1.75,-2.5,-25.25],size:[.5,3,6.5],mat:"metal"},{pos:[0,-2.5,-28.25],size:[3,3,.5],mat:"metal"},{pos:[5,-3.88,-12.25],size:[5,.24,5.5],mat:"acid",color:3119722,intensity:.12,deco:!0},{pos:[5,-3.89,-15.025],size:[5.3,.22,.25],mat:"concrete",deco:!0},{pos:[5,-3.89,-9.475],size:[5.3,.22,.25],mat:"concrete",deco:!0},{pos:[2.475,-3.89,-12.25],size:[.25,.22,5.3],mat:"concrete",deco:!0},{pos:[7.525,-3.89,-12.25],size:[.25,.22,5.3],mat:"concrete",deco:!0},{pos:[-6.8,.275,1.2],size:[.77,.55,.77],mat:"concrete",color:13624284},{pos:[-6.8,1.155,1.2],size:[1.21,1.21,1.21],mat:"grass",shape:"sphere",color:5222008,deco:!0},{pos:[-6.525,.935,1.035],size:[.77,.77,.77],mat:"grass",shape:"sphere",color:4168808,deco:!0},{pos:[6.8,.275,1.2],size:[.77,.55,.77],mat:"concrete",color:13624284},{pos:[6.8,1.155,1.2],size:[1.21,1.21,1.21],mat:"grass",shape:"sphere",color:5222008,deco:!0},{pos:[7.075,.935,1.035],size:[.77,.77,.77],mat:"grass",shape:"sphere",color:4168808,deco:!0},{pos:[-6.8,.25,10.8],size:[.7,.5,.7],mat:"concrete",color:13624284},{pos:[-6.8,1.05,10.8],size:[1.1,1.1,1.1],mat:"grass",shape:"sphere",color:5222008,deco:!0},{pos:[-6.55,.85,10.65],size:[.7,.7,.7],mat:"grass",shape:"sphere",color:4168808,deco:!0},{pos:[-6.6,-3.7,-2],size:[.84,.6,.84],mat:"concrete",color:13624284},{pos:[-6.6,-2.74,-2],size:[1.32,1.32,1.32],mat:"grass",shape:"sphere",color:3972984,deco:!0},{pos:[-6.3,-2.98,-2.18],size:[.84,.84,.84],mat:"grass",shape:"sphere",color:4168808,deco:!0},{pos:[-6.6,-3.7,-18],size:[.84,.6,.84],mat:"concrete",color:13624284},{pos:[-6.6,-2.74,-18],size:[1.32,1.32,1.32],mat:"grass",shape:"sphere",color:3972984,deco:!0},{pos:[-6.3,-2.98,-18.18],size:[.84,.84,.84],mat:"grass",shape:"sphere",color:4168808,deco:!0},{pos:[6.6,-3.7,-18],size:[.84,.6,.84],mat:"concrete",color:13624284},{pos:[6.6,-2.74,-18],size:[1.32,1.32,1.32],mat:"grass",shape:"sphere",color:3972984,deco:!0},{pos:[6.9,-2.98,-18.18],size:[.84,.84,.84],mat:"grass",shape:"sphere",color:4168808,deco:!0},{pos:[-5,.01,8],size:[2.1,.02,2.1],mat:"glow",shape:"cyl",color:16757575,intensity:.7,deco:!0}],ev=[{type:"button",id:"p",pos:[-5,0,8]},{type:"cube",pos:[-5,.46,8]},{type:"door",pos:[0,1.5,-.25],size:[3,3,.3],requires:["!p"]},{type:"door",pos:[0,-2.5,-22.25],size:[3,3,.3],requires:["p"]},{type:"hazard",pos:[5,-3.4,-12.25],size:[5,1.2,5.5],hidden:!0},{type:"exit",pos:[0,-2.75,-26.4],size:[2,2.5,2]},{type:"light",pos:[-3,4.7,7],intensity:44,color:16769981},{type:"light",pos:[3,4.7,2],intensity:34,color:16769981},{type:"light",pos:[-2,4.7,-4],intensity:40,color:12577023,distance:26},{type:"light",pos:[0,4.7,-14],intensity:44,color:12577023,distance:26},{type:"light",pos:[5,-3.2,-12.25],intensity:14,color:7208872,fixture:!1,distance:12},{type:"light",pos:[0,-1.3,-26],intensity:8,fixture:!1,distance:8}],tv=5,nv="被销毁的方块会回到出生的位置。酸液就是回家的传送门：把方块丢进酸池，它回到板上，出口门便开了。",iv={version:Y_,name:Z_,hint:J_,gun:K_,spawn:j_,brushes:Q_,entities:ev,chapter:tv,reveal:nv},sv=1,ov="暗中成桥",rv="桥只在对面没被照到时才存在。那块挡光的东西，不一定非要放着不动。",av="none",cv=-20,lv={pos:[-10.5,0,-2.5],yaw:-90},hv=[{pos:[1,5.25,0],size:[27,.5,9],mat:"metal"},{pos:[-12.25,-.5,0],size:[.5,11,8],mat:"metal"},{pos:[14.25,-.5,0],size:[.5,11,8],mat:"metal"},{pos:[1,-.5,4.25],size:[27,11,.5],mat:"metal"},{pos:[-1.75,-.25,-4.25],size:[21.5,11.5,.5],mat:"metal"},{pos:[10.5,-3,-4.25],size:[3,6,.5],mat:"metal"},{pos:[10.5,4.25,-4.25],size:[3,2.5,.5],mat:"metal"},{pos:[13.25,-.25,-4.25],size:[2.5,11.5,.5],mat:"metal"},{pos:[1,-6.25,0],size:[27,.5,9],mat:"concrete"},{pos:[-9,-3,0],size:[6,6,8],mat:"concrete"},{pos:[10,-3,0],size:[8,6,8],mat:"concrete"},{pos:[-11.3,1.65,0],size:[1.2,.1,.6],mat:"concrete"},{pos:[0,-1.5,-.575],size:[12,9,.05],mat:"glass"},{pos:[0,-1.5,.575],size:[12,9,.05],mat:"glass"},{pos:[0,-5.85,0],size:[12,.3,8],mat:"acid",color:3119722,intensity:.12,deco:!0},{pos:[10.5,-.25,-7],size:[5,.5,5],mat:"concrete"},{pos:[10.5,3.25,-7],size:[5,.5,5],mat:"metal"},{pos:[7.75,1.75,-7],size:[.5,3.5,5],mat:"metal"},{pos:[13.25,1.75,-7],size:[.5,3.5,5],mat:"metal"},{pos:[10.5,1.75,-9.75],size:[6,3.5,.5],mat:"metal"},{pos:[-11.2,.25,-3.2],size:[.7,.5,.7],mat:"concrete",color:13624284},{pos:[-11.2,1.05,-3.2],size:[1.1,1.1,1.1],mat:"grass",shape:"sphere",color:5222008,deco:!0},{pos:[-10.95,.85,-3.35],size:[.7,.7,.7],mat:"grass",shape:"sphere",color:4168808,deco:!0},{pos:[13.2,.25,3.2],size:[.7,.5,.7],mat:"concrete",color:13624284},{pos:[13.2,1.05,3.2],size:[1.1,1.1,1.1],mat:"grass",shape:"sphere",color:5222008,deco:!0},{pos:[13.45,.85,3.05],size:[.7,.7,.7],mat:"grass",shape:"sphere",color:4168808,deco:!0},{pos:[7,.225,3.2],size:[.63,.45,.63],mat:"concrete",color:13624284},{pos:[7,.945,3.2],size:[.99,.99,.99],mat:"grass",shape:"sphere",color:5222008,deco:!0},{pos:[7.225,.765,3.065],size:[.63,.63,.63],mat:"grass",shape:"sphere",color:4168808,deco:!0},{pos:[-11.7,.006,0],size:[.5,.012,1.6],mat:"glow",color:8378623,intensity:1.4,deco:!0},{pos:[10.5,.01,2.4],size:[2.1,.02,2.1],mat:"glow",shape:"cyl",color:8378623,intensity:.7,deco:!0}],uv=[{type:"bridge",pos:[-11.7,.02,0],dir:[1,0,0],when:["!c"]},{type:"laser",pos:[-11.7,2,0],dir:[1,0,0]},{type:"catcher",id:"c",pos:[13.95,2,0],normal:[-1,0,0]},{type:"cube",pos:[-10.5,.31,2.5]},{type:"button",id:"f",pos:[10.5,0,2.4]},{type:"door",pos:[10.5,1.5,-4.25],size:[3,3,.3],requires:["f"]},{type:"exit",pos:[10.5,1.25,-7.5],size:[2,2.5,2]},{type:"light",pos:[-8.5,4.6,0],intensity:36,color:13625087,distance:24},{type:"light",pos:[0,4.6,0],intensity:40,color:12115199,distance:28},{type:"light",pos:[10.5,4.6,0],intensity:36,color:13625087,distance:24},{type:"light",pos:[0,-4.6,0],intensity:14,color:7208872,fixture:!1,distance:14},{type:"light",pos:[10.5,2.6,-7.5],intensity:8,fixture:!1,distance:8}],pv=5,dv="方块不只是能搬的东西，它还会投下影子。把它举在光束里，沿着光一路走过去，影子到哪里，桥就到哪里。",fv={version:sv,name:ov,hint:rv,gun:av,killY:cv,spawn:lv,brushes:hv,entities:uv,chapter:pv,reveal:dv},mv=1,gv="侧身的桥",_v="那道光幕是实心的，可它立在了没用的地方。光桥能穿过传送门，出来时朝向哪边？",vv="both",yv=-20,xv={pos:[-10,1.2,3],yaw:-90},Mv=[{pos:[1,6.25,0],size:[31,.5,11],mat:"metal"},{pos:[-14.25,0,0],size:[.5,12,10],mat:"metal"},{pos:[16.25,0,0],size:[.5,12,10],mat:"metal"},{pos:[1,0,-5.25],size:[31,12,.5],mat:"metal"},{pos:[1,0,5.25],size:[31,12,.5],mat:"metal"},{pos:[1,-6.25,0],size:[31,.5,11],mat:"concrete"},{pos:[-11,-3,0],size:[6,6,10],mat:"concrete"},{pos:[-11.2,.6,0],size:[4.4,1.2,10],mat:"concrete"},{pos:[12,-2.4,0],size:[8,7.2,10],mat:"concrete"},{pos:[0,-3,0],size:[2,6,3],mat:"concrete"},{pos:[0,.02,0],size:[1.3,.04,2.3],mat:"white"},{pos:[-13.98,1.25,0],size:[.04,2.3,1.3],mat:"white"},{pos:[-11.55,3.15,-4.98],size:[1.3,2.3,.04],mat:"white"},{pos:[-11.85,5.98,0],size:[1.3,.04,2.3],mat:"white"},{pos:[-11.55,1.22,-2.75],size:[1.3,.04,2.3],mat:"white"},{pos:[-.74,.01,0],size:[.08,.02,2.6],mat:"glow",color:8378623,intensity:1.6,deco:!0},{pos:[.74,.01,0],size:[.08,.02,2.6],mat:"glow",color:8378623,intensity:1.6,deco:!0},{pos:[0,.01,-1.26],size:[1.4,.02,.08],mat:"glow",color:8378623,intensity:1.6,deco:!0},{pos:[0,.01,1.26],size:[1.4,.02,.08],mat:"glow",color:8378623,intensity:1.6,deco:!0},{pos:[0,-5.85,0],size:[16,.3,10],mat:"acid",color:3119722,intensity:.12,deco:!0},{pos:[-13.2,.225,4.2],size:[.63,.45,.63],mat:"concrete",color:13624284},{pos:[-13.2,.945,4.2],size:[.99,.99,.99],mat:"grass",shape:"sphere",color:5222008,deco:!0},{pos:[-12.975,.765,4.065],size:[.63,.63,.63],mat:"grass",shape:"sphere",color:4168808,deco:!0},{pos:[-13.2,.225,-4.2],size:[.63,.45,.63],mat:"concrete",color:13624284},{pos:[-13.2,.945,-4.2],size:[.99,.99,.99],mat:"grass",shape:"sphere",color:5222008,deco:!0},{pos:[-12.975,.765,-4.335],size:[.63,.63,.63],mat:"grass",shape:"sphere",color:4168808,deco:!0},{pos:[15.3,1.425,4.2],size:[.63,.45,.63],mat:"concrete",color:13624284},{pos:[15.3,2.145,4.2],size:[.99,.99,.99],mat:"grass",shape:"sphere",color:5222008,deco:!0},{pos:[15.525,1.965,4.065],size:[.63,.63,.63],mat:"grass",shape:"sphere",color:4168808,deco:!0},{pos:[15.3,1.425,-4.2],size:[.63,.45,.63],mat:"concrete",color:13624284},{pos:[15.3,2.145,-4.2],size:[.99,.99,.99],mat:"grass",shape:"sphere",color:5222008,deco:!0},{pos:[15.525,1.965,-4.335],size:[.63,.63,.63],mat:"grass",shape:"sphere",color:4168808,deco:!0},{pos:[-13.925,.65,4.025],size:[.05,.9,.05],mat:"glow",color:8378623,intensity:1.2,deco:!0}],Sv=[{type:"bridge",pos:[0,5.85,0],dir:[0,-1,0],up:[0,0,-1]},{type:"hazard",pos:[0,-5,0],size:[16,1.5,10],hidden:!0},{type:"exit",pos:[14,2.45,0],size:[2,2.5,2]},{type:"light",pos:[-10,5.6,0],intensity:40,color:13625087,distance:26},{type:"light",pos:[0,5.6,0],intensity:34,color:12115199,distance:26},{type:"light",pos:[12,5.6,0],intensity:34,color:13625087,distance:24},{type:"light",pos:[0,-4.4,0],intensity:14,color:7208872,fixture:!1,distance:14},{type:"light",pos:[14,3.4,0],intensity:8,fixture:!1,distance:8}],wv=5,Ev="光桥是一张固体的光片，竖着是墙。传送门能把它放倒：让垂下的光幕钻进岛上的门，再从墙上的门里横着长出来，就是一条路。",bv={version:mv,name:gv,hint:_v,gun:vv,killY:yv,spawn:xv,brushes:Mv,entities:Sv,chapter:wv,reveal:Ev},Tv=1,Av="窥缝",zv="透过玻璃能看见金库里的白墙，可子弹穿不过去。墙脚那条缝，要多低的视线才望得进去？",Rv="both",Cv={pos:[0,0,2],yaw:0},Pv=[{pos:[0,-.25,-1.5],size:[15,.5,10],mat:"concrete"},{pos:[0,5.25,-1.5],size:[15,.5,10],mat:"metal"},{pos:[-7.25,2.5,-1.5],size:[.5,5,9],mat:"metal"},{pos:[7.25,2.5,-1.5],size:[.5,5,9],mat:"metal"},{pos:[0,2.5,3.25],size:[15,5,.5],mat:"metal"},{pos:[-6.5,2.5,-9],size:[2,5,6],mat:"concrete"},{pos:[-3.5,.5,-9],size:[4,1,6],mat:"concrete"},{pos:[-3.5,3.8,-9],size:[4,2.4,6],mat:"concrete"},{pos:[-1,2.5,-9],size:[1,5,6],mat:"concrete"},{pos:[0,.275,-9],size:[1,.55,6],mat:"concrete"},{pos:[0,2.95,-9],size:[1,4.1,6],mat:"concrete"},{pos:[4,2.5,-9],size:[7,5,6],mat:"concrete"},{pos:[-3.5,1.8,-6.25],size:[4,1.6,.1],mat:"glass"},{pos:[0,.558,-9],size:[1,.015,5.96],mat:"glow",color:8378623,intensity:1.3,deco:!0},{pos:[-.54,.725,-6.01],size:[.08,.51,.02],mat:"glow",color:8378623,intensity:1.1,deco:!0},{pos:[.54,.725,-6.01],size:[.08,.51,.02],mat:"glow",color:8378623,intensity:1.1,deco:!0},{pos:[0,.94,-6.01],size:[1,.08,.02],mat:"glow",color:8378623,intensity:1.1,deco:!0},{pos:[0,.51,-6.01],size:[1,.08,.02],mat:"glow",color:8378623,intensity:1.1,deco:!0},{pos:[-3.5,.96,-6.01],size:[4.2,.08,.02],mat:"glow",color:16757575,intensity:1,deco:!0},{pos:[-3.5,2.64,-6.01],size:[4.2,.08,.02],mat:"glow",color:16757575,intensity:1,deco:!0},{pos:[-5.55,1.8,-6.01],size:[.1,1.6,.02],mat:"glow",color:16757575,intensity:1,deco:!0},{pos:[-1.45,1.8,-6.01],size:[.1,1.6,.02],mat:"glow",color:16757575,intensity:1,deco:!0},{pos:[0,-.25,-16],size:[15,.5,9],mat:"concrete"},{pos:[0,5.25,-16],size:[15,.5,9],mat:"metal"},{pos:[-7.25,2.5,-16],size:[.5,5,8],mat:"metal"},{pos:[7.25,2.5,-16],size:[.5,5,8],mat:"metal"},{pos:[0,2.5,-20.25],size:[15,5,.5],mat:"metal"},{pos:[0,2,-19.98],size:[6,4,.04],mat:"white"},{pos:[-3.075,2,-19.875],size:[.05,3.9,.05],mat:"glow",color:16757575,intensity:1.2,deco:!0},{pos:[3.075,2,-19.875],size:[.05,3.9,.05],mat:"glow",color:16757575,intensity:1.2,deco:!0},{pos:[5.8,.25,-14],size:[.7,.5,.7],mat:"concrete",color:13624284},{pos:[5.8,1.05,-14],size:[1.1,1.1,1.1],mat:"grass",shape:"sphere",color:5222008,deco:!0},{pos:[6.05,.85,-14.15],size:[.7,.7,.7],mat:"grass",shape:"sphere",color:4168808,deco:!0},{pos:[-6,.225,-19],size:[.63,.45,.63],mat:"concrete",color:13624284},{pos:[-6,.945,-19],size:[.99,.99,.99],mat:"grass",shape:"sphere",color:5222008,deco:!0},{pos:[-5.775,.765,-19.135],size:[.63,.63,.63],mat:"grass",shape:"sphere",color:4168808,deco:!0},{pos:[-6.98,1.5,-2],size:[.04,3,4],mat:"white"},{pos:[6.98,.75,-1.4],size:[.04,1.5,1.2],mat:"whiteS"},{pos:[-6.2,.25,2.2],size:[.7,.5,.7],mat:"concrete",color:13624284},{pos:[-6.2,1.05,2.2],size:[1.1,1.1,1.1],mat:"grass",shape:"sphere",color:5222008,deco:!0},{pos:[-5.95,.85,2.05],size:[.7,.7,.7],mat:"grass",shape:"sphere",color:4168808,deco:!0},{pos:[6.2,.25,2.2],size:[.7,.5,.7],mat:"concrete",color:13624284},{pos:[6.2,1.05,2.2],size:[1.1,1.1,1.1],mat:"grass",shape:"sphere",color:5222008,deco:!0},{pos:[6.45,.85,2.05],size:[.7,.7,.7],mat:"grass",shape:"sphere",color:4168808,deco:!0}],Lv=[{type:"exit",pos:[-3.5,1.25,-16],size:[2,2.5,2]},{type:"light",pos:[-2,4.6,0],intensity:40,color:15005439},{type:"light",pos:[3,4.6,-3],intensity:28,color:15005439},{type:"light",pos:[0,4.4,-16],intensity:60,color:16771524,distance:26},{type:"light",pos:[0,1.8,-18.6],intensity:12,color:16771524,fixture:!1,distance:10}],Dv=5,Iv="缩小的不只是身体，还有眼睛。子弹从眼睛里射出，眼睛矮了，才能顺着细缝一直飞到金库深处的白墙。",Uv={version:Tv,name:Av,hint:zv,gun:Rv,spawn:Cv,brushes:Pv,entities:Lv,chapter:Dv,reveal:Iv},Nv=1,Fv="自断后路",Ov="松开踏板，门依然开着。是谁在撑着它？而出口的大门，似乎有自己的脾气。",Bv="none",Hv=-20,Vv={pos:[-4,0,11],yaw:0},kv=[{pos:[0,-.25,7],size:[15,.5,15],mat:"concrete"},{pos:[0,5.25,7],size:[15,.5,15],mat:"metal"},{pos:[-7.25,2.5,7],size:[.5,5,14],mat:"metal"},{pos:[7.25,2.5,7],size:[.5,5,14],mat:"metal"},{pos:[0,2.5,14.25],size:[15,5,.5],mat:"metal"},{pos:[-4.25,2.75,-.25],size:[6.5,5.5,.5],mat:"metal"},{pos:[0,4.35,-.25],size:[2,2.3,.5],mat:"metal"},{pos:[4.25,2.75,-.25],size:[6.5,5.5,.5],mat:"metal"},{pos:[0,-.25,-1.5],size:[3,.5,2],mat:"concrete"},{pos:[-1.25,1.85,-1.5],size:[.5,3.7,2],mat:"metal"},{pos:[1.25,1.85,-1.5],size:[.5,3.7,2],mat:"metal"},{pos:[0,3.45,-1.5],size:[3,.5,2],mat:"metal"},{pos:[0,1.85,-2.25],size:[3,3.7,.5],mat:"metal"},{pos:[100,-.25,-12],size:[25,.5,25],mat:"concrete"},{pos:[100,5.25,-12],size:[25,.5,25],mat:"metal"},{pos:[87.75,2.5,-12],size:[.5,5,24],mat:"metal"},{pos:[112.25,2.5,-12],size:[.5,5,24],mat:"metal"},{pos:[93.25,2.75,.25],size:[11.5,5.5,.5],mat:"metal"},{pos:[100,4.35,.25],size:[2,2.3,.5],mat:"metal"},{pos:[106.75,2.75,.25],size:[11.5,5.5,.5],mat:"metal"},{pos:[100,-.25,1.5],size:[3,.5,2],mat:"concrete"},{pos:[98.75,1.85,1.5],size:[.5,3.7,2],mat:"metal"},{pos:[101.25,1.85,1.5],size:[.5,3.7,2],mat:"metal"},{pos:[100,3.45,1.5],size:[3,.5,2],mat:"metal"},{pos:[100,1.85,2.25],size:[3,3.7,.5],mat:"metal"},{pos:[96,2.75,-24.25],size:[17,5.5,.5],mat:"metal"},{pos:[106,4.25,-24.25],size:[3,2.5,.5],mat:"metal"},{pos:[110,2.75,-24.25],size:[5,5.5,.5],mat:"metal"},{pos:[106,-.25,-27.25],size:[4,.5,5.5],mat:"concrete"},{pos:[106,3.25,-27.25],size:[4,.5,5.5],mat:"metal"},{pos:[104.25,1.5,-27],size:[.5,3,5],mat:"metal"},{pos:[107.75,1.5,-27],size:[.5,3,5],mat:"metal"},{pos:[106,1.5,-29.75],size:[3,3,.5],mat:"metal"},{pos:[100,.95,-12],size:[.8,1.9,.8],mat:"concrete"},{pos:[-4,.017,4.085],size:[1.9,.01,.07],mat:"glow",color:16757575,intensity:1.8,deco:!0},{pos:[-4,.017,5.915],size:[1.9,.01,.07],mat:"glow",color:16757575,intensity:1.8,deco:!0},{pos:[-4.915,.017,5],size:[.07,.01,1.76],mat:"glow",color:16757575,intensity:1.8,deco:!0},{pos:[-3.085,.017,5],size:[.07,.01,1.76],mat:"glow",color:16757575,intensity:1.8,deco:!0},{pos:[-1.08,1.64,.04],size:[.08,3.28,.04],mat:"glow",color:16757575,intensity:1.6,deco:!0},{pos:[1.08,1.64,.04],size:[.08,3.28,.04],mat:"glow",color:16757575,intensity:1.6,deco:!0},{pos:[0,3.24,.04],size:[2.24,.08,.04],mat:"glow",color:16757575,intensity:1.6,deco:!0},{pos:[100,1.63,-23.99],size:[1.44,.1,.02],mat:"glow",color:16757575,intensity:2.4,deco:!0},{pos:[100,2.97,-23.99],size:[1.44,.1,.02],mat:"glow",color:16757575,intensity:2.4,deco:!0},{pos:[99.33,2.3,-23.99],size:[.1,1.24,.02],mat:"glow",color:16757575,intensity:2.4,deco:!0},{pos:[100.67,2.3,-23.99],size:[.1,1.24,.02],mat:"glow",color:16757575,intensity:2.4,deco:!0},{pos:[106,3.135,-23.96],size:[3,.07,.04],mat:"glow",color:16757575,intensity:1.6,deco:!0},{pos:[100,1.915,-12],size:[1,.03,1],mat:"glow",color:16757575,intensity:1.2,deco:!0},{pos:[0,2.3,13.85],size:[.6,.8,.3],mat:"plate"},{pos:[-6.2,.25,12.6],size:[.56,.5,.56],mat:"concrete",color:5327428,deco:!0},{pos:[-6.2,.95,12.6],size:[.9,.9,.9],mat:"grass",shape:"sphere",color:6986328,deco:!0},{pos:[-6,1.3,12.5],size:[.6,.6,.6],mat:"grass",shape:"sphere",color:8827754,deco:!0},{pos:[6.2,.25,12.6],size:[.56,.5,.56],mat:"concrete",color:5327428,deco:!0},{pos:[6.2,.95,12.6],size:[.9,.9,.9],mat:"grass",shape:"sphere",color:6986328,deco:!0},{pos:[6.4,1.3,12.5],size:[.6,.6,.6],mat:"grass",shape:"sphere",color:8827754,deco:!0},{pos:[89.2,.275,-22.6],size:[.616,.55,.616],mat:"concrete",color:5327428,deco:!0},{pos:[89.2,1.045,-22.6],size:[.9900000000000001,.9900000000000001,.9900000000000001],mat:"grass",shape:"sphere",color:6986328,deco:!0},{pos:[89.42,1.4300000000000002,-22.71],size:[.66,.66,.66],mat:"grass",shape:"sphere",color:8827754,deco:!0},{pos:[110.8,.275,-22.6],size:[.616,.55,.616],mat:"concrete",color:5327428,deco:!0},{pos:[110.8,1.045,-22.6],size:[.9900000000000001,.9900000000000001,.9900000000000001],mat:"grass",shape:"sphere",color:6986328,deco:!0},{pos:[111.02,1.4300000000000002,-22.71],size:[.66,.66,.66],mat:"grass",shape:"sphere",color:8827754,deco:!0}],Gv=[{type:"gateway",a:{pos:[0,1.5,0],normal:[0,0,1]},b:{pos:[100,1.5,0],normal:[0,0,-1]},size:[2,3],frame:!1,when:["s"]},{type:"button",id:"s",pos:[-4,0,5]},{type:"cube",pos:[3,.31,9]},{type:"laser",pos:[0,2.3,13.55],dir:[0,0,-1]},{type:"catcher",id:"s",pos:[100,2.3,-23.95],normal:[0,0,1]},{type:"door",pos:[106,1.5,-24.25],size:[3,3,.3],requires:["!s"]},{type:"exit",pos:[106,1.25,-27.9],size:[2.6,2.5,2]},{type:"light",pos:[106,2.85,-27],intensity:7},{type:"light",pos:[-3.2,4.6,8],intensity:24,color:16769720,shadow:!0},{type:"light",pos:[3.2,4.6,3],intensity:14,color:16769720},{type:"light",pos:[-4,1.2,5],intensity:5,color:16757575,fixture:!1,distance:7},{type:"light",pos:[95,4.6,-8],intensity:22,color:11065599,shadow:!0},{type:"light",pos:[100,4.6,-18],intensity:20,color:13624575},{type:"light",pos:[106,2.2,-22.5],intensity:8,color:16757575,fixture:!1,distance:10},{type:"light",pos:[100,2.2,-21.8],intensity:6,color:16757575,fixture:!1,distance:8}],Wv=6,$v="撑着你来路的那束光，恰恰是锁住出口的东西。要出去，就得亲手把光掐灭，身后的路也随之塌掉。",Xv={version:Nv,name:Fv,hint:Ov,gun:Bv,killY:Hv,spawn:Vv,brushes:kv,entities:Gv,chapter:Wv,reveal:$v},qv=1,Yv="画后之室",Zv="拉杆让出口亮了，壁龛却成了一幅画。画盖住的房间，真的不在了吗？",Jv="both",Kv=-20,jv={pos:[0,0,5.5],yaw:0},Qv=[{pos:[0,-.25,1.5],size:[15,.5,12],mat:"concrete"},{pos:[0,4.75,1.5],size:[15,.5,12],mat:"metal"},{pos:[-7.25,2.25,1.5],size:[.5,4.5,11],mat:"metal"},{pos:[7.25,2.25,1.5],size:[.5,4.5,11],mat:"metal"},{pos:[0,2.25,7.25],size:[15,4.5,.5],mat:"metal"},{pos:[-4.3,2.5,-4.25],size:[6.4,5,.5],mat:"metal"},{pos:[0,3.8,-4.25],size:[2.2,2.4,.5],mat:"metal"},{pos:[4.3,2.5,-4.25],size:[6.4,5,.5],mat:"metal"},{pos:[0,-.25,-5.7],size:[3.2,.5,4.4],mat:"concrete"},{pos:[-1.35,1.4,-5.7],size:[.5,2.8,3.4],mat:"metal"},{pos:[1.35,1.4,-5.7],size:[.5,2.8,3.4],mat:"metal"},{pos:[0,1.4,-7.65],size:[3.2,2.8,.5],mat:"metal"},{pos:[0,3.05,-5.95],size:[3.2,.5,3.9],mat:"metal"},{pos:[0,1.4,-7.38],size:[2.2,2.4,.04],mat:"white",color:13815234},{pos:[6.98,1.4,1.5],size:[.04,2.4,3],mat:"white",color:13815234},{pos:[100,-.25,-2],size:[13,.5,13],mat:"concrete"},{pos:[100,4.75,-2],size:[13,.5,13],mat:"metal"},{pos:[93.75,2.25,-2],size:[.5,4.5,12],mat:"metal"},{pos:[106.25,2.25,-2],size:[.5,4.5,12],mat:"metal"},{pos:[100,2.25,-8.25],size:[13,4.5,.5],mat:"metal"},{pos:[100,2.25,4.25],size:[13,4.5,.5],mat:"metal"}],ey=[{type:"switch",id:"t",pos:[-4.2,0,-3.4],yaw:0,timer:10},{type:"gateway",a:{pos:[0,1.3,-4],normal:[0,0,1]},b:{pos:[100,1.3,4],normal:[0,0,-1]},size:[2.2,2.6],frame:!1,when:["t"]},{type:"gateway",a:{pos:[94.02,1.3,-2],normal:[1,0,0]},b:{pos:[-6.98,1.3,3],normal:[1,0,0]},size:[2,2.6],frame:!0,color:16757575,oneWay:"ab",when:["!t"]},{type:"exit",pos:[0,1.25,-6.3],size:[2,2.5,2.2],when:["t"]},{type:"light",pos:[0,4.2,2],intensity:34,color:16769720,shadow:!0},{type:"light",pos:[0,2.3,-5.6],intensity:3,color:16757575,fixture:!1,distance:6},{type:"light",pos:[100,4.2,-2],intensity:24,color:6990079}],ty=6,ny="那扇窗只是盖在真房间上的一幅画，而你的传送门不认这幅画：趁壁龛还开着，把门打在它的后墙上，再从侧面走进去。",iy={version:qv,name:Yv,hint:Zv,gun:Jv,killY:Kv,spawn:jv,brushes:Qv,entities:ey,chapter:ty,reveal:ny},sy=1,oy="清场",ry="桥要方块压着才在，出口门却要方块回到笼子里。一个方块，怎么同时在两处？",ay="both",cy=-12,ly={pos:[0,0,12],yaw:0},hy=[{pos:[0,6.25,-6],size:[19,.5,41],mat:"metal"},{pos:[-9.25,3,-6],size:[.5,6,40],mat:"metal"},{pos:[9.25,3,-6],size:[.5,6,40],mat:"metal"},{pos:[0,3,14.25],size:[19,6,.5],mat:"metal"},{pos:[-5.5,3.25,-26.25],size:[8,6.5,.5],mat:"metal"},{pos:[0,4.75,-26.25],size:[3,3.5,.5],mat:"metal"},{pos:[5.5,3.25,-26.25],size:[8,6.5,.5],mat:"metal"},{pos:[0,-2.25,4.25],size:[19,4.5,20.5],mat:"concrete"},{pos:[0,-2.25,-20.25],size:[19,4.5,12.5],mat:"concrete"},{pos:[0,-4.25,-10],size:[19,.5,8],mat:"concrete"},{pos:[-9.25,-2.25,-10],size:[.5,4.5,8],mat:"metal"},{pos:[9.25,-2.25,-10],size:[.5,4.5,8],mat:"metal"},{pos:[0,-2.5,-10],size:[18,3,8],mat:"acid",color:3119722,intensity:.1,deco:!0},{pos:[0,.013,-6.06],size:[18,.015,.12],mat:"glow",color:6221984,intensity:1.4,deco:!0},{pos:[0,.013,-13.94],size:[18,.015,.12],mat:"glow",color:6221984,intensity:1.4,deco:!0},{pos:[-7,1.75,5.95],size:[4,3.5,.1],mat:"metal"},{pos:[-7,1.75,10.05],size:[4,3.5,.1],mat:"metal"},{pos:[-5.025,1.75,8],size:[.05,3.5,4],mat:"grate"},{pos:[-7,3.53,8],size:[4,.06,4],mat:"grate"},{pos:[-8.98,1.4,8],size:[.04,2.4,2.2],mat:"white"},{pos:[8.98,1.4,6.2],size:[.04,2.4,2.4],mat:"white"},{pos:[0,-.25,-29.5],size:[4,.5,6],mat:"concrete"},{pos:[0,3.25,-29.5],size:[4,.5,6],mat:"metal"},{pos:[-1.75,1.5,-29.25],size:[.5,3,5.5],mat:"metal"},{pos:[1.75,1.5,-29.25],size:[.5,3,5.5],mat:"metal"},{pos:[0,1.5,-32.25],size:[3,3,.5],mat:"metal"},{pos:[-8.2,.017,7.335],size:[1.4,.01,.07],mat:"glow",color:16757575,intensity:1.8,deco:!0},{pos:[-8.2,.017,8.665],size:[1.4,.01,.07],mat:"glow",color:16757575,intensity:1.8,deco:!0},{pos:[-8.865,.017,8],size:[.07,.01,1.26],mat:"glow",color:16757575,intensity:1.8,deco:!0},{pos:[-7.535,.017,8],size:[.07,.01,1.26],mat:"glow",color:16757575,intensity:1.8,deco:!0},{pos:[4,.017,-3.965],size:[2,.01,.07],mat:"glow",color:5232895,intensity:1.8,deco:!0},{pos:[4,.017,-2.035],size:[2,.01,.07],mat:"glow",color:5232895,intensity:1.8,deco:!0},{pos:[3.035,.017,-3],size:[.07,.01,1.86],mat:"glow",color:5232895,intensity:1.8,deco:!0},{pos:[4.965,.017,-3],size:[.07,.01,1.86],mat:"glow",color:5232895,intensity:1.8,deco:!0},{pos:[0,.017,-17.965],size:[2,.01,.07],mat:"glow",color:5232895,intensity:1.8,deco:!0},{pos:[0,.017,-16.035],size:[2,.01,.07],mat:"glow",color:5232895,intensity:1.8,deco:!0},{pos:[-.965,.017,-17],size:[.07,.01,1.86],mat:"glow",color:5232895,intensity:1.8,deco:!0},{pos:[.965,.017,-17],size:[.07,.01,1.86],mat:"glow",color:5232895,intensity:1.8,deco:!0},{pos:[2.4,1.5,-4.6],size:[.1,3,.1],mat:"glow",color:5232895,intensity:1.5,deco:!0},{pos:[5.6,1.5,-4.6],size:[.1,3,.1],mat:"glow",color:5232895,intensity:1.5,deco:!0},{pos:[2.4,1.5,-1.4],size:[.1,3,.1],mat:"glow",color:5232895,intensity:1.5,deco:!0},{pos:[5.6,1.5,-1.4],size:[.1,3,.1],mat:"glow",color:5232895,intensity:1.5,deco:!0},{pos:[0,3.135,-25.96],size:[3.2,.07,.04],mat:"glow",color:16757575,intensity:1.6,deco:!0},{pos:[0,.06,-5.725],size:[1.8,.12,.35],mat:"plate"},{pos:[0,.135,-5.875],size:[1.8,.03,.05],mat:"glow",color:5232895,intensity:1.8,deco:!0},{pos:[-8.2,.275,12.8],size:[.616,.55,.616],mat:"concrete",color:5327428,deco:!0},{pos:[-8.2,1.045,12.8],size:[.9900000000000001,.9900000000000001,.9900000000000001],mat:"grass",shape:"sphere",color:6986328,deco:!0},{pos:[-7.9799999999999995,1.4300000000000002,12.690000000000001],size:[.66,.66,.66],mat:"grass",shape:"sphere",color:8827754,deco:!0},{pos:[8.2,.275,12.8],size:[.616,.55,.616],mat:"concrete",color:5327428,deco:!0},{pos:[8.2,1.045,12.8],size:[.9900000000000001,.9900000000000001,.9900000000000001],mat:"grass",shape:"sphere",color:6986328,deco:!0},{pos:[8.42,1.4300000000000002,12.690000000000001],size:[.66,.66,.66],mat:"grass",shape:"sphere",color:8827754,deco:!0},{pos:[-8.2,.275,-24.6],size:[.616,.55,.616],mat:"concrete",color:5327428,deco:!0},{pos:[-8.2,1.045,-24.6],size:[.9900000000000001,.9900000000000001,.9900000000000001],mat:"grass",shape:"sphere",color:6986328,deco:!0},{pos:[-7.9799999999999995,1.4300000000000002,-24.71],size:[.66,.66,.66],mat:"grass",shape:"sphere",color:8827754,deco:!0},{pos:[8.2,.275,-24.6],size:[.616,.55,.616],mat:"concrete",color:5327428,deco:!0},{pos:[8.2,1.045,-24.6],size:[.9900000000000001,.9900000000000001,.9900000000000001],mat:"grass",shape:"sphere",color:6986328,deco:!0},{pos:[8.42,1.4300000000000002,-24.71],size:[.66,.66,.66],mat:"grass",shape:"sphere",color:8827754,deco:!0}],uy=[{type:"button",id:"p",pos:[-8.2,0,8]},{type:"cube",pos:[-8.2,.46,8]},{type:"button",id:"q",pos:[4,0,-3]},{type:"button",id:"f",pos:[0,0,-17]},{type:"bridge",pos:[0,.15,-5.8],dir:[0,0,-1],when:["q"]},{type:"fizzler",pos:[4,1.5,-3],size:[3.2,3,3.2],when:["f"]},{type:"hazard",pos:[0,-1.5,-10],size:[18,1.2,8],hidden:!0},{type:"door",pos:[0,1.5,-26.25],size:[3,3,.3],requires:["p"]},{type:"exit",pos:[0,1.25,-30.4],size:[2.6,2.5,2]},{type:"light",pos:[0,2.85,-29.25],intensity:7},{type:"light",pos:[0,5.8,9],intensity:30,color:16769720,shadow:!0},{type:"light",pos:[0,5.8,-2],intensity:26,color:16769720},{type:"light",pos:[0,5.8,-19],intensity:30,color:13624575,shadow:!0},{type:"light",pos:[-7.4,2.8,8],intensity:7,color:16757575,fixture:!1},{type:"light",pos:[4,2.4,-3],intensity:7,color:5232895,fixture:!1},{type:"light",pos:[0,2.4,-17],intensity:6,color:5232895,fixture:!1},{type:"light",pos:[0,2.6,-24.8],intensity:8,color:16757575,fixture:!1}],py=6,dy="销毁就是快递：方块过桥用完之后，踩一下远处的板子把它销毁，它会自己回到笼里的板上。先用，最后才送回家。",fy={version:sy,name:oy,hint:ry,gun:ay,killY:cy,spawn:ly,brushes:hy,entities:uy,chapter:py,reveal:dy},my=1,gy="扳机",_y="弹射板毫无反应。站上去，墙上的窗开了：窗里那道光，要照到哪儿才算数？",vy="none",yy=-20,xy={pos:[0,0,5.5],yaw:0},My=[{pos:[0,-.25,2],size:[15,.5,13],mat:"concrete"},{pos:[0,9.25,2],size:[15,.5,13],mat:"metal"},{pos:[-7.25,4.5,2],size:[.5,9,12],mat:"metal"},{pos:[7.25,4.5,2],size:[.5,9,12],mat:"metal"},{pos:[0,4.5,8.25],size:[15,9,.5],mat:"metal"},{pos:[-4.3,4.75,-4.25],size:[6.4,9.5,.5],mat:"metal"},{pos:[0,6.05,-4.25],size:[2.2,6.9,.5],mat:"metal"},{pos:[4.3,4.75,-4.25],size:[6.4,9.5,.5],mat:"metal"},{pos:[0,-.25,-5.3],size:[3.2,.5,3.6],mat:"concrete"},{pos:[-1.35,1.4,-5.3],size:[.5,2.8,2.6],mat:"metal"},{pos:[1.35,1.4,-5.3],size:[.5,2.8,2.6],mat:"metal"},{pos:[0,1.4,-6.85],size:[3.2,2.8,.5],mat:"metal"},{pos:[0,3.05,-5.55],size:[3.2,.5,3.1],mat:"metal"},{pos:[5.75,2.2,-1],size:[2.5,4.4,6],mat:"concrete"},{pos:[100,-.25,-1],size:[13,.5,11],mat:"concrete"},{pos:[100,4.75,-1],size:[13,.5,11],mat:"metal"},{pos:[93.75,2.25,-1],size:[.5,4.5,10],mat:"metal"},{pos:[106.25,2.25,-1],size:[.5,4.5,10],mat:"metal"},{pos:[100,2.25,-6.25],size:[13,4.5,.5],mat:"metal"},{pos:[100,2.25,4.25],size:[13,4.5,.5],mat:"metal"},{pos:[100,.02,3.25],size:[12,.02,.1],mat:"glow",color:16757575,intensity:1.2,deco:!0},{pos:[0,.017,-3.945],size:[1.96,.01,.07],mat:"glow",color:16757575,intensity:1.8,deco:!0},{pos:[0,.017,-2.055],size:[1.96,.01,.07],mat:"glow",color:16757575,intensity:1.8,deco:!0},{pos:[-.945,.017,-3],size:[.07,.01,1.82],mat:"glow",color:16757575,intensity:1.8,deco:!0},{pos:[.945,.017,-3],size:[.07,.01,1.82],mat:"glow",color:16757575,intensity:1.8,deco:!0},{pos:[0,.02,-3.45],size:[.06,.02,.9],mat:"glow",color:16757575,intensity:1.5,deco:!0},{pos:[-1.15,1.34,-3.95],size:[.06,2.68,.04],mat:"glow",color:16757575,intensity:1.6,deco:!0},{pos:[1.15,1.34,-3.95],size:[.06,2.68,.04],mat:"glow",color:16757575,intensity:1.6,deco:!0},{pos:[0,2.65,-3.95],size:[2.36,.06,.04],mat:"glow",color:16757575,intensity:1.6,deco:!0},{pos:[103.5,1.015,-5.99],size:[1.24,.07,.02],mat:"glow",color:16757575,intensity:1.8,deco:!0},{pos:[103.5,2.185,-5.99],size:[1.24,.07,.02],mat:"glow",color:16757575,intensity:1.8,deco:!0},{pos:[102.915,1.6,-5.99],size:[.07,1.1,.02],mat:"glow",color:16757575,intensity:1.8,deco:!0},{pos:[104.085,1.6,-5.99],size:[.07,1.1,.02],mat:"glow",color:16757575,intensity:1.8,deco:!0},{pos:[94.15,1.6,3.25],size:[.3,.8,.5],mat:"plate"},{pos:[-6,.3,6.8],size:[.672,.6,.672],mat:"concrete",color:5327428,deco:!0},{pos:[-6,1.14,6.8],size:[1.08,1.08,1.08],mat:"grass",shape:"sphere",color:6986328,deco:!0},{pos:[-5.76,1.56,6.68],size:[.72,.72,.72],mat:"grass",shape:"sphere",color:8827754,deco:!0},{pos:[6,.3,6.8],size:[.672,.6,.672],mat:"concrete",color:5327428,deco:!0},{pos:[6,1.14,6.8],size:[1.08,1.08,1.08],mat:"grass",shape:"sphere",color:6986328,deco:!0},{pos:[6.24,1.56,6.68],size:[.72,.72,.72],mat:"grass",shape:"sphere",color:8827754,deco:!0},{pos:[6,4.6,-3.4],size:[.448,.4,.448],mat:"concrete",color:5327428,deco:!0},{pos:[6,5.16,-3.4],size:[.7200000000000001,.7200000000000001,.7200000000000001],mat:"grass",shape:"sphere",color:6986328,deco:!0},{pos:[6.16,5.44,-3.48],size:[.48,.48,.48],mat:"grass",shape:"sphere",color:8827754,deco:!0}],Sy=[{type:"cube",kind:"prism",pos:[-3,.31,3],yaw:0},{type:"button",id:"p",pos:[0,0,-3]},{type:"launcher",pos:[0,0,-3],target:[5.5,4.4,-1],time:1.5,when:["c"]},{type:"gateway",a:{pos:[0,1.3,-4],normal:[0,0,1]},b:{pos:[100,1.3,4],normal:[0,0,-1]},size:[2.2,2.6],frame:!1,when:["p"]},{type:"laser",pos:[94.45,1.6,3.25],dir:[1,0,0]},{type:"catcher",id:"c",pos:[103.5,1.6,-5.75],normal:[0,0,1]},{type:"exit",pos:[5.5,5.65,-1],size:[2,2.5,2]},{type:"light",pos:[0,8.6,2],intensity:52,color:16769720,shadow:!0},{type:"light",pos:[0,2.4,-6],intensity:8,color:16757575,fixture:!1},{type:"light",pos:[5.5,6.4,-1],intensity:12,color:16769720,fixture:!1},{type:"light",pos:[100,4.2,-1],intensity:26,color:9421055},{type:"light",pos:[103.5,2.6,-4.8],intensity:7,color:16757575,fixture:!1}],wy=6,Ey="发射者、反射镜、炮弹是同一个人：站上弹射板窗才会打开，举着棱镜把光送进接收器，接收器一亮，板子就把你自己弹了出去。",by={version:my,name:gy,hint:_y,gun:vy,killY:yy,spawn:xy,brushes:My,entities:Sy,chapter:wy,reveal:Ey},Ty=1,Ay="升降机",zy="重型踏板在十几米的半空。地上两块白板，一小一大——它们为什么要不一样大？",Ry="both",Cy={pos:[-12,3,0],yaw:-90},Py=[{pos:[15,-.25,0],size:[59,.5,17],mat:"concrete"},{pos:[15,34.25,0],size:[59,.5,17],mat:"metal"},{pos:[-14.25,17,0],size:[.5,34,16],mat:"metal"},{pos:[44.25,17,0],size:[.5,34,16],mat:"metal"},{pos:[15,17,8.25],size:[59,34,.5],mat:"metal"},{pos:[-6.5,17.25,-8.25],size:[16,34.5,.5],mat:"metal"},{pos:[3,18.75,-8.25],size:[3,31.5,.5],mat:"metal"},{pos:[24.5,17.25,-8.25],size:[40,34.5,.5],mat:"metal"},{pos:[-10,1.5,-2.5],size:[8,3,11],mat:"concrete"},{pos:[-10.3,.15,5.5],size:[7.4,.3,5],mat:"concrete"},{pos:[-10.6,.3,5.5],size:[6.8,.6,5],mat:"concrete"},{pos:[-10.9,.45,5.5],size:[6.2,.9,5],mat:"concrete"},{pos:[-11.2,.6,5.5],size:[5.6,1.2,5],mat:"concrete"},{pos:[-11.5,.75,5.5],size:[5,1.5,5],mat:"concrete"},{pos:[-11.8,.9,5.5],size:[4.4,1.8,5],mat:"concrete"},{pos:[-12.1,1.05,5.5],size:[3.8,2.1,5],mat:"concrete"},{pos:[-12.4,1.2,5.5],size:[3.2,2.4,5],mat:"concrete"},{pos:[-12.7,1.35,5.5],size:[2.6,2.7,5],mat:"concrete"},{pos:[-13,1.5,5.5],size:[2,3,5],mat:"concrete"},{pos:[-2.4,.02,0],size:[7.2,.04,3],mat:"white"},{pos:[7.5,.02,0],size:[12,.04,7],mat:"whiteL"},{pos:[25.5,7,0],size:[15,14,8],mat:"concrete"},{pos:[25.5,14.75,-3.85],size:[15,1.5,.3],mat:"concrete"},{pos:[25.5,14.75,3.85],size:[15,1.5,.3],mat:"concrete"},{pos:[32.85,14.75,0],size:[.3,1.5,7.4],mat:"concrete"},{pos:[18.15,14.75,-2.6],size:[.3,1.5,2.2],mat:"concrete"},{pos:[18.15,14.75,2.6],size:[.3,1.5,2.2],mat:"concrete"},{pos:[25.5,15.51,-3.85],size:[15,.02,.1],mat:"glow",color:16757575,intensity:1.2,deco:!0},{pos:[25.5,15.51,3.85],size:[15,.02,.1],mat:"glow",color:16757575,intensity:1.2,deco:!0},{pos:[17.75,.45,0],size:[.5,.9,8],mat:"concrete"},{pos:[3,-.25,-11.75],size:[4,.5,6.5],mat:"concrete"},{pos:[3,3.25,-11.75],size:[4,.5,6.5],mat:"metal"},{pos:[1.25,1.5,-11.5],size:[.5,3,6],mat:"metal"},{pos:[4.75,1.5,-11.5],size:[.5,3,6],mat:"metal"},{pos:[3,1.5,-14.75],size:[3,3,.5],mat:"metal"},{pos:[11.385,.015,-7.9],size:[13.17,.02,.1],mat:"glow",color:16757575,intensity:1.5,deco:!0},{pos:[17.935,.015,-5.925],size:[.07,.02,4.05],mat:"glow",color:16757575,intensity:1.5,deco:!0},{pos:[17.97,7.003,-3.9],size:[.06,13.995,.1],mat:"glow",color:16757575,intensity:1.5,deco:!0},{pos:[17.97,7.003,3.9],size:[.06,13.995,.1],mat:"glow",color:16757575,intensity:1.5,deco:!0},{pos:[24,14.017,.95],size:[3.4,.01,.1],mat:"glow",color:16757575,intensity:1.8,deco:!0},{pos:[24,14.017,4.25],size:[3.4,.01,.1],mat:"glow",color:16757575,intensity:1.8,deco:!0},{pos:[22.35,14.017,2.6],size:[.1,.01,3.2],mat:"glow",color:16757575,intensity:1.8,deco:!0},{pos:[25.65,14.017,2.6],size:[.1,.01,3.2],mat:"glow",color:16757575,intensity:1.8,deco:!0},{pos:[-13.2,3.25,7],size:[.56,.5,.56],mat:"concrete",color:5327428,deco:!0},{pos:[-13.2,3.95,7],size:[.9,.9,.9],mat:"grass",shape:"sphere",color:6986328,deco:!0},{pos:[-13,4.3,6.9],size:[.6,.6,.6],mat:"grass",shape:"sphere",color:8827754,deco:!0},{pos:[30,.325,7.2],size:[.728,.65,.728],mat:"concrete",color:5327428,deco:!0},{pos:[30,1.2349999999999999,7.2],size:[1.1700000000000002,1.1700000000000002,1.1700000000000002],mat:"grass",shape:"sphere",color:6986328,deco:!0},{pos:[30.26,1.6900000000000002,7.07],size:[.78,.78,.78],mat:"grass",shape:"sphere",color:8827754,deco:!0},{pos:[30,.325,-7.2],size:[.728,.65,.728],mat:"concrete",color:5327428,deco:!0},{pos:[30,1.2349999999999999,-7.2],size:[1.1700000000000002,1.1700000000000002,1.1700000000000002],mat:"grass",shape:"sphere",color:6986328,deco:!0},{pos:[30.26,1.6900000000000002,-7.33],size:[.78,.78,.78],mat:"grass",shape:"sphere",color:8827754,deco:!0}],Ly=[{type:"button",id:"hb1",pos:[24,14,2.6],heavy:!0},{type:"door",pos:[3,1.5,-8.25],size:[3,3,.3],requires:["hb1"]},{type:"cube",pos:[25.5,14.67,-2.4],scale:2.2},{type:"exit",pos:[3,1.25,-12.9],size:[2.6,2.5,2]},{type:"light",pos:[3,2.85,-11.5],intensity:7},{type:"light",pos:[0,33,0],intensity:110,color:16769720,shadow:!0,distance:60},{type:"light",pos:[-9,6,0],intensity:22,color:16769720},{type:"light",pos:[23,19,0],intensity:70,color:16767392,distance:34},{type:"light",pos:[23,16,3],intensity:10,color:16757575,distance:12,fixture:!1},{type:"light",pos:[3,2.6,-7],intensity:8,color:16757575,fixture:!1}],Dy=6,Iy="传送门的大小之比不只改变体型，还会乘到速度上。小口进、大口出，冲出去比掉下来高得多：一大一小两扇门，就是一台电梯。",Uy={version:Ty,name:Ay,hint:zy,gun:Ry,spawn:Cy,brushes:Py,entities:Ly,chapter:Dy,reveal:Iy},Ny=1,Fy="尺度环",Oy="先走进那扇大门看看。再想想：同一个洞，换个方向，对人和对方块是不是一回事？",By="none",Hy=-20,Vy={hemi:.7,exposure:.95,bloom:.28},ky={pos:[0,0,3],yaw:0},Gy=[{pos:[0,4.25,0],size:[17,.5,11],mat:"metal"},{pos:[0,2,5.25],size:[17,4,.5],mat:"concrete",color:14471350},{pos:[0,-.25,0],size:[19.4,.5,11],mat:"concrete",color:12756604},{pos:[8.6,2.25,-4.5],size:[1.2,4.5,2],mat:"concrete",color:14471350},{pos:[8.6,3.75,-2],size:[1.2,1.5,3],mat:"concrete",color:14471350},{pos:[8.6,2.25,2.5],size:[1.2,4.5,6],mat:"concrete",color:14471350},{pos:[9.45,2.25,0],size:[.5,4.5,11],mat:"concrete",color:14471350},{pos:[-8.6,2.25,-2.05],size:[1.2,4.5,6.9],mat:"concrete",color:14471350},{pos:[-8.6,2.85,2],size:[1.2,3.3,1.2],mat:"concrete",color:14471350},{pos:[-8.6,2.25,4.05],size:[1.2,4.5,2.9],mat:"concrete",color:14471350},{pos:[-9.45,2.25,0],size:[.5,4.5,11],mat:"concrete",color:14471350},{pos:[-5.45,2,-5.25],size:[6.1,4,.5],mat:"concrete",color:14471350},{pos:[-2,2.45,-5.25],size:[.8,3.1,.5],mat:"concrete",color:14471350},{pos:[3.45,2,-5.25],size:[10.1,4,.5],mat:"concrete",color:14471350},{pos:[-2,-.25,-7.7],size:[1.2,.5,4.4],mat:"concrete",color:12756604},{pos:[-2.75,.65,-7.7],size:[.3,1.3,4.4],mat:"concrete",color:14471350},{pos:[-1.25,.65,-7.7],size:[.3,1.3,4.4],mat:"concrete",color:14471350},{pos:[-2,1.15,-7.7],size:[1.8,.3,4.4],mat:"concrete",color:14471350},{pos:[-2,.65,-9.75],size:[1.8,1.3,.3],mat:"concrete",color:14471350},{pos:[0,.012,.6],size:[13.6,.02,3.2],mat:"grass",color:3820152,deco:!0},{pos:[0,.021,-1],size:[13.6,.018,.04],mat:"glow",color:16765803,intensity:1,deco:!0},{pos:[0,.021,2.2],size:[13.6,.018,.04],mat:"glow",color:16765803,intensity:1,deco:!0},{pos:[7.975,1.5,-3.55],size:[.05,3.2,.1],mat:"glow",color:16765803,intensity:1.6,deco:!0},{pos:[7.975,1.5,-.45],size:[.05,3.2,.1],mat:"glow",color:16765803,intensity:1.6,deco:!0},{pos:[7.975,3.05,-2],size:[.05,.1,3],mat:"glow",color:16765803,intensity:1.6,deco:!0},{pos:[-7.975,.6,1.35],size:[.05,1.4,.1],mat:"glow",color:16765803,intensity:1.6,deco:!0},{pos:[-7.975,.6,2.65],size:[.05,1.4,.1],mat:"glow",color:16765803,intensity:1.6,deco:!0},{pos:[-7.975,1.25,2],size:[.05,.1,1.2],mat:"glow",color:16765803,intensity:1.6,deco:!0},{pos:[7.94,3.35,-2],size:[.22,.22,.22],mat:"glow",shape:"sphere",color:16765803,intensity:2.2,deco:!0},{pos:[-7.94,1.55,2],size:[.16,.16,.16],mat:"glow",shape:"sphere",color:16765803,intensity:2.2,deco:!0},{pos:[0,2.66,-4.94],size:[17,.08,.04],mat:"glow",color:16765803,intensity:.8,deco:!0},{pos:[-2,1.25,-5],size:[.12,.12,.12],mat:"glow",shape:"sphere",color:16762992,intensity:2.4,deco:!0},{pos:[7.1,.22,4.2],size:[.5,.44,.5],mat:"concrete",shape:"cyl",color:12159582,deco:!0},{pos:[7.1,.46,4.2],size:[.44,.04,.44],mat:"concrete",shape:"cyl",color:4864554,deco:!0},{pos:[7.1,.95,4.2],size:[.8,.8,.8],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[7.26,.7,4.3],size:[.55,.55,.55],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[6.95,.78,4.08],size:[.6,.6,.6],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[7.12,1.25,4.24],size:[.5,.5,.5],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[7.1,.242,-4.3],size:[.55,.484,.55],mat:"concrete",shape:"cyl",color:12159582,deco:!0},{pos:[7.1,.506,-4.3],size:[.484,.044,.484],mat:"concrete",shape:"cyl",color:4864554,deco:!0},{pos:[7.1,1.045,-4.3],size:[.88,.88,.88],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[7.276,.77,-4.19],size:[.605,.605,.605],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[6.935,.858,-4.432],size:[.66,.66,.66],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[7.122,1.375,-4.256],size:[.55,.55,.55],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-7.1,.264,-4.2],size:[.6,.528,.6],mat:"concrete",shape:"cyl",color:12159582,deco:!0},{pos:[-7.1,.552,-4.2],size:[.528,.048,.528],mat:"concrete",shape:"cyl",color:4864554,deco:!0},{pos:[-7.1,1.14,-4.2],size:[.96,.96,.96],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-6.908,.84,-4.08],size:[.66,.66,.66],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-7.28,.936,-4.344],size:[.72,.72,.72],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-7.076,1.5,-4.152],size:[.6,.6,.6],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-7.1,.198,4.2],size:[.45,.396,.45],mat:"concrete",shape:"cyl",color:12159582,deco:!0},{pos:[-7.1,.414,4.2],size:[.396,.036,.396],mat:"concrete",shape:"cyl",color:4864554,deco:!0},{pos:[-7.1,.855,4.2],size:[.72,.72,.72],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-6.956,.63,4.29],size:[.495,.495,.495],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-7.235,.702,4.092],size:[.54,.54,.54],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-7.082,1.125,4.236],size:[.45,.45,.45],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-4.5,3.65,0],size:[.02,.7,.02],mat:"glow",color:16769712,intensity:.4,deco:!0},{pos:[-4.5,3.25,.6],size:[.34,.34,.34],mat:"glow",shape:"sphere",color:16769712,intensity:1.8,deco:!0},{pos:[0,3.65,0],size:[.02,.7,.02],mat:"glow",color:16769712,intensity:.4,deco:!0},{pos:[0,3.25,.6],size:[.34,.34,.34],mat:"glow",shape:"sphere",color:16769712,intensity:1.8,deco:!0},{pos:[4.5,3.65,0],size:[.02,.7,.02],mat:"glow",color:16769712,intensity:.4,deco:!0},{pos:[4.5,3.25,.6],size:[.34,.34,.34],mat:"glow",shape:"sphere",color:16769712,intensity:1.8,deco:!0},{pos:[-2,.01,-7.9],size:[.8,.015,2.4],mat:"concrete",color:14727258,deco:!0}],Wy=[{type:"light",pos:[0,3.6,0],intensity:46,color:16774108,shadow:!0},{type:"light",pos:[-6,3.4,-3],intensity:22,color:16773328},{type:"light",pos:[6,3.4,3.2],intensity:22,color:16773328},{type:"light",pos:[-2,.8,-7.2],intensity:3,color:16762992,distance:5},{type:"gateway",a:{pos:[8,1.5,-2],normal:[-1,0,0],up:[0,1,0]},b:{pos:[-8,.6,2],normal:[1,0,0],up:[0,1,0]},size:[3,3],sizeB:[1.2,1.2]},{type:"button",id:"hb",pos:[5.8,0,-2],heavy:!0},{type:"cube",pos:[-6.3,.31,3]},{type:"door",pos:[-2,.5,-5.25],size:[1,1,.3],requires:["hb"]},{type:"exit",pos:[-2,.45,-8.2],size:[.7,.9,1]}],$y=7,Xy="东门和西窗是同一个洞的两头。同一个洞，对人是缩小器，对方块却是放大器，因为你们穿过它的方向相反。",qy={version:Ny,name:Fy,hint:Oy,gun:By,killY:Hy,look:Vy,spawn:ky,brushes:Gy,entities:Wy,chapter:$y,reveal:Xy},Yy=1,Zy="矮人之光",Jy="光从棱镜的正中心射出，而缝只有两指高：这块棱镜够矮吗？还有，你自己是怎么到缝那一头去的？",Ky="both",jy=-20,Qy={hemi:.7,exposure:.95,bloom:.28},ex={pos:[0,0,2],yaw:0},tx=[{pos:[0,-.25,-1.5],size:[15,.5,10],mat:"concrete",color:12756604},{pos:[0,5.25,-1.5],size:[15,.5,10],mat:"metal"},{pos:[-7.25,2.5,-1.5],size:[.5,5,9],mat:"concrete",color:14471350},{pos:[7.25,2.5,-1.5],size:[.5,5,9],mat:"concrete",color:14471350},{pos:[0,2.5,3.25],size:[15,5,.5],mat:"concrete",color:14471350},{pos:[-6.25,2.5,-7],size:[2.5,5,2],mat:"concrete",color:14471350},{pos:[-2.75,.475,-7],size:[4.5,.95,2],mat:"concrete",color:14471350},{pos:[-2.75,4.1,-7],size:[4.5,1.8,2],mat:"concrete",color:14471350},{pos:[0,.275,-7],size:[1,.55,2],mat:"concrete",color:14471350},{pos:[0,.925,-7],size:[1,.05,2],mat:"concrete",color:14471350},{pos:[0,4.1,-7],size:[1,1.8,2],mat:"concrete",color:14471350},{pos:[2.75,.475,-7],size:[4.5,.95,2],mat:"concrete",color:14471350},{pos:[2.75,4.1,-7],size:[4.5,1.8,2],mat:"concrete",color:14471350},{pos:[6.25,2.5,-7],size:[2.5,5,2],mat:"concrete",color:14471350},{pos:[0,2.075,-6.03],size:[10,2.25,.06],mat:"glass"},{pos:[-6.98,1.5,-2],size:[.04,3,4],mat:"white"},{pos:[6.98,.75,-1.4],size:[.04,1.5,1.2],mat:"whiteS"},{pos:[0,-.25,-14],size:[15,.5,13],mat:"concrete",color:12756604},{pos:[0,5.25,-14],size:[15,.5,13],mat:"metal"},{pos:[-7.25,2.5,-14],size:[.5,5,12],mat:"concrete",color:14471350},{pos:[7.25,2.5,-14],size:[.5,5,12],mat:"concrete",color:14471350},{pos:[0,2.5,-20.25],size:[15,5,.5],mat:"concrete",color:14471350},{pos:[0,2,-19.98],size:[6,4,.04],mat:"white"},{pos:[5.2,2.6,-19.05],size:[.4,5.2,2.9],mat:"metal"},{pos:[5.2,2.7,-16],size:[.4,5,3.2],mat:"metal"},{pos:[5.2,2.6,-10.95],size:[.4,5.2,6.9],mat:"metal"},{pos:[0,.012,-1.5],size:[9,.02,5],mat:"grass",color:3820152,deco:!0},{pos:[0,.021,-3.96],size:[8.8,.018,.04],mat:"glow",color:16765803,intensity:.9,deco:!0},{pos:[-.53,.725,-5.975],size:[.06,.47,.05],mat:"glow",color:16765803,intensity:1.5,deco:!0},{pos:[.53,.725,-5.975],size:[.06,.47,.05],mat:"glow",color:16765803,intensity:1.5,deco:!0},{pos:[0,.93,-5.975],size:[1,.06,.05],mat:"glow",color:16765803,intensity:1.5,deco:!0},{pos:[0,.52,-5.975],size:[1,.06,.05],mat:"glow",color:16765803,intensity:1.5,deco:!0},{pos:[-5.06,2.075,-6.035],size:[.12,2.49,.05],mat:"glow",color:16765803,intensity:1.2,deco:!0},{pos:[5.06,2.075,-6.035],size:[.12,2.49,.05],mat:"glow",color:16765803,intensity:1.2,deco:!0},{pos:[0,3.26,-6.035],size:[10,.12,.05],mat:"glow",color:16765803,intensity:1.2,deco:!0},{pos:[0,.89,-6.035],size:[10,.12,.05],mat:"glow",color:16765803,intensity:1.2,deco:!0},{pos:[-6.2,.264,2.2],size:[.6,.528,.6],mat:"concrete",shape:"cyl",color:12159582,deco:!0},{pos:[-6.2,.552,2.2],size:[.528,.048,.528],mat:"concrete",shape:"cyl",color:4864554,deco:!0},{pos:[-6.2,1.14,2.2],size:[.96,.96,.96],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-6.008,.84,2.32],size:[.66,.66,.66],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-6.38,.936,2.056],size:[.72,.72,.72],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-6.176,1.5,2.248],size:[.6,.6,.6],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[6.2,.22,2.2],size:[.5,.44,.5],mat:"concrete",shape:"cyl",color:12159582,deco:!0},{pos:[6.2,.46,2.2],size:[.44,.04,.44],mat:"concrete",shape:"cyl",color:4864554,deco:!0},{pos:[6.2,.95,2.2],size:[.8,.8,.8],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[6.36,.7,2.3],size:[.55,.55,.55],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[6.05,.78,2.08],size:[.6,.6,.6],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[6.22,1.25,2.24],size:[.5,.5,.5],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-6.2,.22,-5.2],size:[.5,.44,.5],mat:"concrete",shape:"cyl",color:12159582,deco:!0},{pos:[-6.2,.46,-5.2],size:[.44,.04,.44],mat:"concrete",shape:"cyl",color:4864554,deco:!0},{pos:[-6.2,.95,-5.2],size:[.8,.8,.8],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-6.04,.7,-5.1],size:[.55,.55,.55],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-6.35,.78,-5.32],size:[.6,.6,.6],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-6.18,1.25,-5.16],size:[.5,.5,.5],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[6.3,.242,-5.3],size:[.55,.484,.55],mat:"concrete",shape:"cyl",color:12159582,deco:!0},{pos:[6.3,.506,-5.3],size:[.484,.044,.484],mat:"concrete",shape:"cyl",color:4864554,deco:!0},{pos:[6.3,1.045,-5.3],size:[.88,.88,.88],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[6.476,.77,-5.19],size:[.605,.605,.605],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[6.135,.858,-5.432],size:[.66,.66,.66],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[6.322,1.375,-5.256],size:[.55,.55,.55],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[0,.008,-14],size:[13.6,.012,11.6],mat:"plate",color:13215834,deco:!0},{pos:[0,.023,-19.85],size:[13.8,.014,.1],mat:"glow",color:16765803,intensity:1,deco:!0},{pos:[-3,.023,-13.425],size:[.2,.014,8.85],mat:"glow",color:16765803,intensity:.8,deco:!0},{pos:[2.5,.017,-16],size:[.9,.03,.9],mat:"plate",color:16773296,deco:!0},{pos:[6.65,.035,-16],size:[.5,.03,3.2],mat:"glow",color:16757575,intensity:.9,deco:!0},{pos:[-4.3,1.25,-17.475],size:[.1,2.7,.05],mat:"glow",color:16765803,intensity:1.2,deco:!0},{pos:[-1.7,1.25,-17.475],size:[.1,2.7,.05],mat:"glow",color:16765803,intensity:1.2,deco:!0},{pos:[-3,2.55,-17.475],size:[2.5,.1,.05],mat:"glow",color:16765803,intensity:1.2,deco:!0},{pos:[-6.2,.286,-19.2],size:[.65,.572,.65],mat:"concrete",shape:"cyl",color:12159582,deco:!0},{pos:[-6.2,.598,-19.2],size:[.572,.052,.572],mat:"concrete",shape:"cyl",color:4864554,deco:!0},{pos:[-6.2,1.235,-19.2],size:[1.04,1.04,1.04],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-5.992,.91,-19.07],size:[.715,.715,.715],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-6.395,1.014,-19.356],size:[.78,.78,.78],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-6.174,1.625,-19.148],size:[.65,.65,.65],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[2.5,.9,-16],size:[.12,.12,.12],mat:"glow",shape:"sphere",color:16738885,intensity:1.6,deco:!0}],nx=[{type:"light",pos:[0,4.2,0],intensity:34,color:16773592,shadow:!0},{type:"light",pos:[0,3.2,-4.5],intensity:8,color:16769712,distance:8},{type:"light",pos:[0,4.3,-14],intensity:40,color:16771e3,shadow:!0,distance:26},{type:"light",pos:[6.2,1.4,-16],intensity:4,color:16757575,distance:5},{type:"cube",kind:"prism",pos:[-3,.31,.5],yaw:0},{type:"laser",pos:[2.5,.1,-8.3],dir:[0,0,-1]},{type:"catcher",id:"c",pos:[6.95,.45,-16],normal:[-1,0,0]},{type:"exit",pos:[-3,1.25,-17.5],size:[2.5,2.5,3],when:["c"]}],ix=7,sx="棱镜的光从方块中心射出，所以镜子要缩小，光才低得进缝。同一对缩小门要先用在棱镜上，才能再接到金库。",ox={version:Yy,name:Zy,hint:Jy,gun:Ky,killY:jy,look:Qy,spawn:ex,brushes:tx,entities:nx,chapter:ix,reveal:sx},rx=1,ax="连环锁",cx="三扇门各等着前一束光，像咬住自己尾巴的蛇。想想怎么把它点着，又怎么让它熄灭。",lx="none",hx=-20,ux={hemi:.7,exposure:.95,bloom:.3},px={pos:[-8.5,0,4.5],yaw:0},dx=[{pos:[0,-.25,-2],size:[21,.5,17],mat:"concrete",color:12756604},{pos:[0,5.25,-2],size:[21,.5,17],mat:"metal"},{pos:[10.25,2.5,-2],size:[.5,5,16],mat:"concrete",color:14471350},{pos:[0,2.5,-10.25],size:[21,5,.5],mat:"concrete",color:14471350},{pos:[0,2.5,6.25],size:[21,5,.5],mat:"concrete",color:14471350},{pos:[-10.25,2.75,-6.75],size:[.5,5.5,7.5],mat:"concrete",color:14471350},{pos:[-10.25,4.25,-1.5],size:[.5,2.5,3],mat:"concrete",color:14471350},{pos:[-10.25,2.75,1],size:[.5,5.5,2],mat:"concrete",color:14471350},{pos:[-10.25,.4,3.5],size:[.5,.8,3],mat:"concrete",color:14471350},{pos:[-10.25,4.25,3.5],size:[.5,2.5,3],mat:"concrete",color:14471350},{pos:[-10.25,2.75,5.75],size:[.5,5.5,1.5],mat:"concrete",color:14471350},{pos:[-10.25,1.9,3.5],size:[.1,2.2,3],mat:"glass"},{pos:[-8.5,2.5,-3],size:[3,5,.5],mat:"concrete",color:14471350},{pos:[-6,4,-3],size:[2,2,.5],mat:"concrete",color:14471350},{pos:[-3,2.5,-3],size:[4,5,.5],mat:"concrete",color:14471350},{pos:[0,4,-3],size:[2,2,.5],mat:"concrete",color:14471350},{pos:[3,2.5,-3],size:[4,5,.5],mat:"concrete",color:14471350},{pos:[6,4,-3],size:[2,2,.5],mat:"concrete",color:14471350},{pos:[8.5,2.5,-3],size:[3,5,.5],mat:"concrete",color:14471350},{pos:[-17.25,-.25,-2],size:[14.5,.5,17],mat:"concrete",color:12756604},{pos:[-17.25,5.25,-2],size:[14.5,.5,17],mat:"metal"},{pos:[-24.25,2.5,-2],size:[.5,5,16],mat:"concrete",color:14471350},{pos:[-17.25,2.5,6.25],size:[14.5,5,.5],mat:"concrete",color:14471350},{pos:[-21.75,2.5,-10.25],size:[5.5,5,.5],mat:"concrete",color:14471350},{pos:[-18,4,-10.25],size:[2,2,.5],mat:"concrete",color:14471350},{pos:[-13.5,2.5,-10.25],size:[7,5,.5],mat:"concrete",color:14471350},{pos:[-18,-.25,-13.5],size:[4,.5,7],mat:"concrete",color:12756604},{pos:[-18,3.75,-13.5],size:[4,.5,7],mat:"metal"},{pos:[-19.75,1.75,-13.5],size:[.5,3.5,6],mat:"concrete",color:14471350},{pos:[-16.25,1.75,-13.5],size:[.5,3.5,6],mat:"concrete",color:14471350},{pos:[-18,1.75,-16.75],size:[4,3.5,.5],mat:"concrete",color:14471350},{pos:[0,.008,1.6],size:[7.4,.016,7.4],mat:"glow",shape:"cyl",color:16765803,intensity:1.1,deco:!0},{pos:[0,.012,1.6],size:[7.12,.02,7.12],mat:"plate",shape:"cyl",color:14273968,deco:!0},{pos:[0,.008,1.6],size:[3.6,.016,3.6],mat:"glow",shape:"cyl",color:16765803,intensity:1.1,deco:!0},{pos:[0,.012,1.6],size:[3.4,.02,3.4],mat:"plate",shape:"cyl",color:14273968,deco:!0},{pos:[-7.05,1.5,-2.725],size:[.1,3.2,.05],mat:"glow",color:16765803,intensity:1.2,deco:!0},{pos:[-4.95,1.5,-2.725],size:[.1,3.2,.05],mat:"glow",color:16765803,intensity:1.2,deco:!0},{pos:[-6,3.05,-2.725],size:[2,.1,.05],mat:"glow",color:16765803,intensity:1.2,deco:!0},{pos:[-1.05,1.5,-2.725],size:[.1,3.2,.05],mat:"glow",color:16765803,intensity:1.2,deco:!0},{pos:[1.05,1.5,-2.725],size:[.1,3.2,.05],mat:"glow",color:16765803,intensity:1.2,deco:!0},{pos:[0,3.05,-2.725],size:[2,.1,.05],mat:"glow",color:16765803,intensity:1.2,deco:!0},{pos:[4.95,1.5,-2.725],size:[.1,3.2,.05],mat:"glow",color:16765803,intensity:1.2,deco:!0},{pos:[7.05,1.5,-2.725],size:[.1,3.2,.05],mat:"glow",color:16765803,intensity:1.2,deco:!0},{pos:[6,3.05,-2.725],size:[2,.1,.05],mat:"glow",color:16765803,intensity:1.2,deco:!0},{pos:[-9.975,1.5,-3.05],size:[.05,3.2,.1],mat:"glow",color:16757575,intensity:1.2,deco:!0},{pos:[-9.975,1.5,.05],size:[.05,3.2,.1],mat:"glow",color:16757575,intensity:1.2,deco:!0},{pos:[-9.975,3.05,-1.5],size:[.05,.1,3],mat:"glow",color:16757575,intensity:1.2,deco:!0},{pos:[-9.975,1.9,1.95],size:[.05,2.4,.1],mat:"glow",color:16765803,intensity:1,deco:!0},{pos:[-9.975,1.9,5.05],size:[.05,2.4,.1],mat:"glow",color:16765803,intensity:1,deco:!0},{pos:[-9.975,3.05,3.5],size:[.05,.1,3],mat:"glow",color:16765803,intensity:1,deco:!0},{pos:[-9.975,.75,3.5],size:[.05,.1,3],mat:"glow",color:16765803,intensity:1,deco:!0},{pos:[-19.05,1.5,-9.975],size:[.1,3.2,.05],mat:"glow",color:16757575,intensity:1.2,deco:!0},{pos:[-16.95,1.5,-9.975],size:[.1,3.2,.05],mat:"glow",color:16757575,intensity:1.2,deco:!0},{pos:[-18,3.05,-9.975],size:[2,.1,.05],mat:"glow",color:16757575,intensity:1.2,deco:!0},{pos:[9,.264,5],size:[.6,.528,.6],mat:"concrete",shape:"cyl",color:12159582,deco:!0},{pos:[9,.552,5],size:[.528,.048,.528],mat:"concrete",shape:"cyl",color:4864554,deco:!0},{pos:[9,1.14,5],size:[.96,.96,.96],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[9.192,.84,5.12],size:[.66,.66,.66],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[8.82,.936,4.856],size:[.72,.72,.72],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[9.024,1.5,5.048],size:[.6,.6,.6],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-9.2,0,-2.2],size:[0,0,0],mat:"concrete",shape:"cyl",color:12159582,deco:!0},{pos:[-9.2,0,-2.2],size:[0,0,0],mat:"concrete",shape:"cyl",color:4864554,deco:!0},{pos:[-9.2,0,-2.2],size:[0,0,0],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-9.2,0,-2.2],size:[0,0,0],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-9.2,0,-2.2],size:[0,0,0],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-9.2,0,-2.2],size:[0,0,0],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[9,.22,-2.2],size:[.5,.44,.5],mat:"concrete",shape:"cyl",color:12159582,deco:!0},{pos:[9,.46,-2.2],size:[.44,.04,.44],mat:"concrete",shape:"cyl",color:4864554,deco:!0},{pos:[9,.95,-2.2],size:[.8,.8,.8],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[9.16,.7,-2.1],size:[.55,.55,.55],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[8.85,.78,-2.32],size:[.6,.6,.6],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[9.02,1.25,-2.16],size:[.5,.5,.5],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-23,.264,5],size:[.6,.528,.6],mat:"concrete",shape:"cyl",color:12159582,deco:!0},{pos:[-23,.552,5],size:[.528,.048,.528],mat:"concrete",shape:"cyl",color:4864554,deco:!0},{pos:[-23,1.14,5],size:[.96,.96,.96],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-22.808,.84,5.12],size:[.66,.66,.66],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-23.18,.936,4.856],size:[.72,.72,.72],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-22.976,1.5,5.048],size:[.6,.6,.6],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-11.4,.22,-9],size:[.5,.44,.5],mat:"concrete",shape:"cyl",color:12159582,deco:!0},{pos:[-11.4,.46,-9],size:[.44,.04,.44],mat:"concrete",shape:"cyl",color:4864554,deco:!0},{pos:[-11.4,.95,-9],size:[.8,.8,.8],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-11.24,.7,-8.9],size:[.55,.55,.55],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-11.55,.78,-9.12],size:[.6,.6,.6],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-11.38,1.25,-8.96],size:[.5,.5,.5],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[0,.02,-9.55],size:[20,.02,.1],mat:"glow",color:16738885,intensity:.6,deco:!0}],fx=[{type:"laser",pos:[-6,1.3,5.7],dir:[0,0,-1]},{type:"laser",pos:[0,1.3,5.7],dir:[0,0,-1]},{type:"laser",pos:[6,1.3,5.7],dir:[0,0,-1]},{type:"laser",pos:[-9.7,3.4,3],dir:[1,0,0],when:["p"]},{type:"catcher",id:"c3",pos:[9.75,3.4,3],normal:[-1,0,0]},{type:"catcher",id:"c1",pos:[-6,1.3,-9.75],normal:[0,0,1]},{type:"catcher",id:"c2",pos:[0,1.3,-9.75],normal:[0,0,1]},{type:"catcher",id:"c3",pos:[6,1.3,-9.75],normal:[0,0,1]},{type:"door",pos:[-6,1.5,-3],size:[2,3,.3],requires:["c3"]},{type:"door",pos:[0,1.5,-3],size:[2,3,.3],requires:["c1","!z"]},{type:"door",pos:[6,1.5,-3],size:[2,3,.3],requires:["c2"]},{type:"button",id:"p",pos:[-8.5,0,1],heavy:!0},{type:"cube",pos:[-8.5,.48,3.2],scale:1.55},{type:"door",pos:[-10.25,1.5,-1.5],size:[.3,3,3],requires:["c1"]},{type:"button",id:"q",pos:[-16,0,-1.5]},{type:"button",id:"z",pos:[-14,0,3.5]},{type:"door",pos:[-18,1.5,-10.25],size:[2,3,.3],requires:["q","!c1"]},{type:"exit",pos:[-18,1.25,-14.4],size:[2,2.5,2]},{type:"light",pos:[-5,4.4,1],intensity:30,color:16773594,shadow:!0},{type:"light",pos:[5,4.4,1],intensity:26,color:16773594},{type:"light",pos:[0,4.4,-6.5],intensity:18,color:16758922,distance:14},{type:"light",pos:[-17,4.4,-2],intensity:32,color:16769200,shadow:!0},{type:"light",pos:[-18,3,-14],intensity:4,color:16767392,distance:6}],mx=7,gx="首尾相咬的死锁环就是一个记忆单元：一点火花点亮整圈并且保持，要让出口认可，再踩一块板把环亲手掐断。点火、转交、熄灭，顺序就是答案。",_x={version:rx,name:ax,hint:cx,gun:lx,killY:hx,look:ux,spawn:px,brushes:dx,entities:fx,chapter:mx,reveal:gx},vx=1,yx="登楼借影",xx="一块方块要干好几件事，可它偏偏压在楼下的踏板上。想想怎么让它和你在同一层。",Mx="both",Sx=-30,wx={hemi:.7,exposure:.95,bloom:.3},Ex={pos:[-1,0,6],yaw:0},bx=[{pos:[1.5,-.25,0],size:[24,.5,25],mat:"concrete",color:12756604},{pos:[1.5,13.25,0],size:[24,.5,25],mat:"metal"},{pos:[-10.25,6.5,0],size:[.5,13,24],mat:"concrete",color:14471350},{pos:[13.25,6.5,0],size:[.5,13,24],mat:"concrete",color:14471350},{pos:[1.5,6.5,12.25],size:[24,13,.5],mat:"concrete",color:14471350},{pos:[-.75,6.75,-12.25],size:[19.5,13.5,.5],mat:"concrete",color:14471350},{pos:[10.5,3.9,-12.25],size:[3,7.8,.5],mat:"concrete",color:14471350},{pos:[10.5,12.15,-12.25],size:[3,2.7,.5],mat:"concrete",color:14471350},{pos:[12.75,6.75,-12.25],size:[1.5,13.5,.5],mat:"concrete",color:14471350},{pos:[-8.75,3.9,-8],size:[2.5,7.8,8],mat:"concrete",color:14471350},{pos:[-3.75,3.9,-8],size:[1.5,7.8,8],mat:"concrete",color:14471350},{pos:[-6,3.9,-9.5],size:[3,7.8,5],mat:"concrete",color:14471350},{pos:[-6,5.2,-3.85],size:[3,5.2,.3],mat:"concrete",color:14471350},{pos:[10,3.9,-8],size:[6,7.8,8],mat:"concrete",color:14471350},{pos:[-3.75,1.325,-3.98],size:[1.3,2.35,.04],mat:"white"},{pos:[-8.8,9.2,-11.98],size:[2.2,2.4,.04],mat:"white"},{pos:[-6.5,8.5,-3.98],size:[7,1.4,.04],mat:"glass"},{pos:[-2.98,8.5,-10.25],size:[.04,1.4,3.5],mat:"glass"},{pos:[-2.98,8.5,-5.75],size:[.04,1.4,3.5],mat:"glass"},{pos:[2,8,-8.525],size:[10,7,.05],mat:"glass"},{pos:[2,8,-7.475],size:[10,7,.05],mat:"glass"},{pos:[10.5,7.55,-15],size:[4,.5,6],mat:"concrete",color:14471350},{pos:[10.5,11.05,-15],size:[4,.5,6],mat:"metal"},{pos:[8.75,9.3,-15],size:[.5,3,5],mat:"concrete",color:14471350},{pos:[12.25,9.3,-15],size:[.5,3,5],mat:"concrete",color:14471350},{pos:[10.5,9.3,-17.75],size:[4,3,.5],mat:"concrete",color:14471350},{pos:[-7.48,3.91,-6.93],size:[.04,7.78,.06],mat:"glow",color:16765803,intensity:.8,deco:!0},{pos:[-4.52,3.91,-6.93],size:[.04,7.78,.06],mat:"glow",color:16765803,intensity:.8,deco:!0},{pos:[-6,.04,-6.93],size:[3,.04,.06],mat:"glow",color:16765803,intensity:.8,deco:!0},{pos:[-4,.021,-3.4],size:[.1,.018,1.4],mat:"glow",color:16765803,intensity:1,deco:!0},{pos:[-4.775,.021,-4.05],size:[1.65,.018,.1],mat:"glow",color:16765803,intensity:1,deco:!0},{pos:[-3.02,7.8,-8.1],size:[.04,.04,7.8],mat:"glow",color:16765803,intensity:1.2,deco:!0},{pos:[7.02,7.8,-8.1],size:[.04,.04,7.8],mat:"glow",color:16765803,intensity:1.2,deco:!0},{pos:[-6.5,7.8,-4.02],size:[7,.04,.04],mat:"glow",color:16765803,intensity:.8,deco:!0},{pos:[10,7.8,-4.02],size:[6,.04,.04],mat:"glow",color:16765803,intensity:.8,deco:!0},{pos:[-9.2,8.064,-5.2],size:[.6,.528,.6],mat:"concrete",shape:"cyl",color:12159582,deco:!0},{pos:[-9.2,8.352,-5.2],size:[.528,.048,.528],mat:"concrete",shape:"cyl",color:4864554,deco:!0},{pos:[-9.2,8.94,-5.2],size:[.96,.96,.96],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-9.008,8.64,-5.08],size:[.66,.66,.66],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-9.38,8.736,-5.344],size:[.72,.72,.72],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-9.176,9.3,-5.152],size:[.6,.6,.6],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-9,8.02,-11],size:[.5,.44,.5],mat:"concrete",shape:"cyl",color:12159582,deco:!0},{pos:[-9,8.26,-11],size:[.44,.04,.44],mat:"concrete",shape:"cyl",color:4864554,deco:!0},{pos:[-9,8.75,-11],size:[.8,.8,.8],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-8.84,8.5,-10.9],size:[.55,.55,.55],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-9.15,8.58,-11.12],size:[.6,.6,.6],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-8.98,9.05,-10.96],size:[.5,.5,.5],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[12,8.064,-5.2],size:[.6,.528,.6],mat:"concrete",shape:"cyl",color:12159582,deco:!0},{pos:[12,8.352,-5.2],size:[.528,.048,.528],mat:"concrete",shape:"cyl",color:4864554,deco:!0},{pos:[12,8.94,-5.2],size:[.96,.96,.96],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[12.192,8.64,-5.08],size:[.66,.66,.66],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[11.82,8.736,-5.344],size:[.72,.72,.72],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[12.024,9.3,-5.152],size:[.6,.6,.6],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-9.3,.308,9.6],size:[.7,.616,.7],mat:"concrete",shape:"cyl",color:12159582,deco:!0},{pos:[-9.3,.644,9.6],size:[.616,.056,.616],mat:"concrete",shape:"cyl",color:4864554,deco:!0},{pos:[-9.3,1.33,9.6],size:[1.12,1.12,1.12],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-9.076,.98,9.74],size:[.77,.77,.77],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-9.51,1.092,9.432],size:[.84,.84,.84],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-9.272,1.75,9.656],size:[.7,.7,.7],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[11.8,.308,9.8],size:[.7,.616,.7],mat:"concrete",shape:"cyl",color:12159582,deco:!0},{pos:[11.8,.644,9.8],size:[.616,.056,.616],mat:"concrete",shape:"cyl",color:4864554,deco:!0},{pos:[11.8,1.33,9.8],size:[1.12,1.12,1.12],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[12.024,.98,9.94],size:[.77,.77,.77],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[11.59,1.092,9.632],size:[.84,.84,.84],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[11.828,1.75,9.856],size:[.7,.7,.7],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[8.95,9.3,-11.975],size:[.1,3.2,.05],mat:"glow",color:16765803,intensity:1.3,deco:!0},{pos:[12.05,9.3,-11.975],size:[.1,3.2,.05],mat:"glow",color:16765803,intensity:1.3,deco:!0},{pos:[10.5,10.85,-11.975],size:[3,.1,.05],mat:"glow",color:16765803,intensity:1.3,deco:!0},{pos:[10.5,7.75,-11.975],size:[3,.1,.05],mat:"glow",color:16765803,intensity:1.3,deco:!0},{pos:[-7.55,1.3,-3.675],size:[.1,2.8,.05],mat:"glow",color:16765803,intensity:1.3,deco:!0},{pos:[-4.45,1.3,-3.675],size:[.1,2.8,.05],mat:"glow",color:16765803,intensity:1.3,deco:!0},{pos:[-6,2.65,-3.675],size:[3,.1,.05],mat:"glow",color:16765803,intensity:1.3,deco:!0},{pos:[2,.01,4],size:[12,.02,10],mat:"plate",color:14272410,deco:!0}],Tx=[{type:"platform",pos:[-6,-.18,-5.6],to:[-6,6.85,-5.6],size:[2.9,.4,2.6],speed:1.5,when:["h"]},{type:"button",id:"h",pos:[-4,0,-2.7]},{type:"button",id:"f",pos:[10,7.8,-5.6]},{type:"cube",pos:[-3.5,.31,1.5]},{type:"laser",pos:[-9.7,9.8,-8],dir:[1,0,0]},{type:"catcher",id:"c",pos:[12.95,9.8,-8],normal:[-1,0,0]},{type:"bridge",pos:[-9.7,7.819999999999999,-8],dir:[1,0,0],when:["!c"]},{type:"door",pos:[10.5,9.3,-12.25],size:[3,3,.3],requires:["f"]},{type:"exit",pos:[10.5,9.05,-15.5],size:[2.2,2.5,2.2]},{type:"light",pos:[2,11.8,2],intensity:70,color:16773594,shadow:!0,distance:30},{type:"light",pos:[-6.5,5.5,-2.5],intensity:26,color:16769200,distance:16},{type:"light",pos:[-6,11.2,-9],intensity:40,color:16771528,distance:18},{type:"light",pos:[10,11.4,-8],intensity:36,color:16771528,distance:18},{type:"light",pos:[10.5,10.5,-15],intensity:6,color:16767392,distance:7}],Ax=7,zx="同一个方块一路上有三种身份：先当砝码托起升降机，再被远程拉上楼变成影子替你挡光，最后压住终点的板子。顺序决定一切。",Rx={version:vx,name:yx,hint:xx,gun:Mx,killY:Sx,look:wx,spawn:Ex,brushes:bx,entities:Tx,chapter:Ax,reveal:zx},Cx=1,Px="小人国",Lx="你有没有想过，是房间太大了，还是你太小了？那两扇发光的门，值得都走一遍。",Dx="none",Ix=-20,Ux={hemi:.7,exposure:.92,bloom:.34,env:.7},Nx={color:15129798,near:7,far:70},Fx={pos:[3.5,0,3.5],yaw:90,scale:.25},Ox=[{pos:[0,4.75,0],size:[10,.5,11],mat:"metal"},{pos:[0,2.25,5.25],size:[10,4.5,.5],mat:"concrete",color:14471350},{pos:[0,-.25,0],size:[12,.5,11],mat:"concrete",color:12756604},{pos:[-5,2.25,-2],size:[1,4.5,7],mat:"concrete",color:14471350},{pos:[-5,3.75,2.5],size:[1,1.5,2],mat:"concrete",color:14471350},{pos:[-5,2.25,4.5],size:[1,4.5,2],mat:"concrete",color:14471350},{pos:[-5.75,2.25,0],size:[.5,4.5,11],mat:"concrete",color:14471350},{pos:[5,2.25,-4.25],size:[1,4.5,2.5],mat:"concrete",color:14471350},{pos:[5,3,-2.5],size:[1,3,1],mat:"concrete",color:14471350},{pos:[5,2.25,1.75],size:[1,4.5,7.5],mat:"concrete",color:14471350},{pos:[5.75,2.25,0],size:[.5,4.5,11],mat:"concrete",color:14471350},{pos:[-1.5,2.25,-5.25],size:[8,4.5,.5],mat:"concrete",color:14471350},{pos:[3,2.6,-5.25],size:[1,3.8,.5],mat:"concrete",color:14471350},{pos:[4.5,2.25,-5.25],size:[2,4.5,.5],mat:"concrete",color:14471350},{pos:[3,-.25,-7.75],size:[1,.5,4.5],mat:"concrete",color:12756604},{pos:[2.45,.375,-7.75],size:[.1,.75,4.5],mat:"metal"},{pos:[3.55,.375,-7.75],size:[.1,.75,4.5],mat:"metal"},{pos:[3,.875,-7.75],size:[1.2,.25,4.5],mat:"metal"},{pos:[3,-.25,-11.5],size:[5,.5,4],mat:"concrete",color:12756604},{pos:[3,1.25,-11.5],size:[5,.5,4],mat:"metal"},{pos:[.75,.5,-11.5],size:[.5,1,3],mat:"metal"},{pos:[5.25,.5,-11.5],size:[.5,1,3],mat:"metal"},{pos:[3,.5,-13.25],size:[5,1,.5],mat:"metal"},{pos:[1.5,.5,-9.75],size:[2,1,.5],mat:"metal"},{pos:[4.5,.5,-9.75],size:[2,1,.5],mat:"metal"},{pos:[-4.47,1.5,1.44],size:[.06,3.24,.12],mat:"glow",color:6742271,intensity:1.5,deco:!0},{pos:[-4.47,1.5,3.56],size:[.06,3.24,.12],mat:"glow",color:6742271,intensity:1.5,deco:!0},{pos:[-4.47,3.06,2.5],size:[.06,.12,2],mat:"glow",color:6742271,intensity:1.5,deco:!0},{pos:[4.47,.75,-3.06],size:[.06,1.74,.12],mat:"glow",color:6742271,intensity:1.5,deco:!0},{pos:[4.47,.75,-1.94],size:[.06,1.74,.12],mat:"glow",color:6742271,intensity:1.5,deco:!0},{pos:[4.47,1.56,-2.5],size:[.06,.12,1],mat:"glow",color:6742271,intensity:1.5,deco:!0},{pos:[-.8,.045,3.7],size:[.09,1.7,.09],mat:"concrete",shape:"cyl",color:15909424,rot:[0,8,90],deco:!0},{pos:[-1.6912412618674133,.045,3.825255790864059],size:[.09,.1,.09],mat:"concrete",shape:"cyl",color:14256790,rot:[0,8,90],deco:!0},{pos:[-1.572409093618425,.045,3.808555018748851],size:[.092,.06,.092],mat:"concrete",shape:"cyl",color:12106948,rot:[0,8,90],deco:!0},{pos:[.0813385811799976,.045,3.576135940145542],size:[.05,.08,.05],mat:"concrete",shape:"cyl",color:3815994,rot:[0,8,90],deco:!0},{pos:[1.9,.011,-1.6],size:[.34,.02,.34],mat:"plate",shape:"cyl",color:14727242,deco:!0},{pos:[1.9,.0125,-1.6],size:[.26,.02,.26],mat:"plate",shape:"cyl",color:15782522,deco:!0},{pos:[-3.7,.06,-4.5],size:[.8,.12,.6],mat:"concrete",color:6983608,deco:!0},{pos:[-3.65,.18,-4.45],size:[.8,.12,.6],mat:"concrete",color:12081738,deco:!0},{pos:[-3.65,.29,-4.45],size:[.7,.1,.5],mat:"concrete",color:8038506,deco:!0},{pos:[-2.1,1.95,-4.95],size:[1.8,.1,.04],mat:"glow",color:16765803,intensity:.9,deco:!0},{pos:[-2.1,3.05,-4.95],size:[1.8,.1,.04],mat:"glow",color:16765803,intensity:.9,deco:!0},{pos:[-2.95,2.5,-4.95],size:[.1,1.2,.04],mat:"glow",color:16765803,intensity:.9,deco:!0},{pos:[-1.25,2.5,-4.95],size:[.1,1.2,.04],mat:"glow",color:16765803,intensity:.9,deco:!0},{pos:[-2.1,2.5,-4.965],size:[1.6,1,.03],mat:"concrete",color:12571880,deco:!0},{pos:[-.55,1.3,-4.965],size:[.3,.4,.03],mat:"concrete",color:16052194,deco:!0},{pos:[-.55,1.34,-4.935],size:[.06,.12,.03],mat:"concrete",color:14275264,deco:!0},{pos:[-1.05,.46,4.965],size:[.3,.32,.03],mat:"concrete",color:16052194,deco:!0},{pos:[-1.1,.4,4.945],size:[.04,.08,.01],mat:"concrete",color:3158064,deco:!0},{pos:[-1,.4,4.945],size:[.04,.08,.01],mat:"concrete",color:3158064,deco:!0},{pos:[-3.9,.286,4],size:[.65,.572,.65],mat:"concrete",shape:"cyl",color:12159582,deco:!0},{pos:[-3.9,.598,4],size:[.572,.052,.572],mat:"concrete",shape:"cyl",color:4864554,deco:!0},{pos:[-3.9,1.235,4],size:[1.04,1.04,1.04],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-3.692,.91,4.13],size:[.715,.715,.715],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-4.095,1.014,3.844],size:[.78,.78,.78],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[-3.874,1.625,4.052],size:[.65,.65,.65],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[4,.22,4.2],size:[.5,.44,.5],mat:"concrete",shape:"cyl",color:12159582,deco:!0},{pos:[4,.46,4.2],size:[.44,.04,.44],mat:"concrete",shape:"cyl",color:4864554,deco:!0},{pos:[4,.95,4.2],size:[.8,.8,.8],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[4.16,.7,4.3],size:[.55,.55,.55],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[3.85,.78,4.08],size:[.6,.6,.6],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[4.02,1.25,4.24],size:[.5,.5,.5],mat:"grass",shape:"sphere",color:6989930,deco:!0},{pos:[0,4.15,0],size:[.5,.5,.5],mat:"glow",shape:"sphere",color:16773334,intensity:1.8,deco:!0},{pos:[0,4.325,0],size:[.02,.35,.02],mat:"glow",color:16773334,intensity:.4,deco:!0},{pos:[3.6,.008,-11.4],size:[2,.015,2.4],mat:"concrete",color:15124618,deco:!0},{pos:[1.4,.8,-12.3],size:[.12,.12,.12],mat:"glow",shape:"sphere",color:16762992,intensity:2.2,deco:!0},{pos:[4.6,.8,-12.3],size:[.12,.12,.12],mat:"glow",shape:"sphere",color:16762992,intensity:2.2,deco:!0},{pos:[3,.64,-9.85],size:[.9,.04,.1],mat:"glow",color:16765803,intensity:1.2,deco:!0}],Bx=[{type:"gateway",a:{pos:[-4.5,1.5,2.5],normal:[1,0,0]},b:{pos:[4.5,.75,-2.5],normal:[-1,0,0]},size:[2,3],sizeB:[1,1.5],frame:!0,color:6742271},{type:"cube",pos:[.5,.31,0]},{type:"button",id:"p",pos:[-2,0,-2.5]},{type:"door",pos:[3,.35,-5.25],size:[1,.7,.3],requires:["p"]},{type:"exit",pos:[3,.35,-11.6],size:[1.4,.7,1.6]},{type:"light",pos:[0,3.9,0],intensity:40,color:16773334,shadow:!0},{type:"light",pos:[-3,3.2,3],intensity:16,color:16770752,distance:14},{type:"light",pos:[3,.7,-7.5],intensity:2.5,color:16767392,distance:5},{type:"light",pos:[3,.8,-11.5],intensity:3.5,color:16762992,distance:5}],Hx=7,Vx="不是大厅变大了，是你变小了：整座大厅一直只是一间普通的屋子。从小门进、大门出，你就长回原样；要钻老鼠洞，还得再变小。",kx={version:Cx,name:Px,hint:Lx,gun:Dx,killY:Ix,look:Ux,fog:Nx,spawn:Fx,brushes:Ox,entities:Bx,chapter:Hx,reveal:Vx},M3=["第 1 章 · 基础训练","第 2 章 · 非欧空间","第 3 章 · 放大与缩小","第 4 章 · 光与力","第 5 章 · 综合难关","第 6 章 · 错觉","第 7 章 · 因果","第 8 章 · 顿悟"],S3=[m1,E1,D1,k1,K1,r5,m5,E5,D5,k5,j5,ag,gg,bg,Ug,Wg,Qg,c2,_2,T2,U2,W2,Q2,c_,v_,A_,F_,q_,iv,fv,bv,Uv,Xv,iy,fy,by,Uy,qy,ox,_x,Rx,kx];function xo(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function an(i,e,t=5,n=4){const s=xo(e),o=new Float32Array(i*i);let r=1,a=0;for(let c=0;c<t;c++){const l=n<<c,u=new Float32Array(l*l);for(let h=0;h<u.length;h++)u[h]=s();for(let h=0;h<i;h++){const p=h/i*l,d=Math.floor(p),g=p-d,_=g*g*(3-2*g);for(let m=0;m<i;m++){const f=m/i*l,E=Math.floor(f),w=f-E,v=w*w*(3-2*w),A=u[d%l*l+E%l],T=u[d%l*l+(E+1)%l],R=u[(d+1)%l*l+E%l],P=u[(d+1)%l*l+(E+1)%l];o[h*i+m]+=r*(A+(T-A)*v+(R-A)*_+(A-T-R+P)*v*_)}}a+=r,r*=.5}for(let c=0;c<o.length;c++)o[c]/=a;return o}function Cn(i,e){const t=document.createElement("canvas");t.width=t.height=i;const n=t.getContext("2d"),s=n.createImageData(i,i);return e(s.data),n.putImageData(s,0,0),t}function ds(i,e,t){return Cn(e,n=>{for(let s=0;s<e;s++)for(let o=0;o<e;o++){const r=i[s*e+(o-1+e)%e],a=i[s*e+(o+1)%e],c=i[(s-1+e)%e*e+o],l=i[(s+1)%e*e+o];let u=(r-a)*t,h=(l-c)*t,p=1;const d=Math.hypot(u,h,p);u/=d,h/=d,p/=d;const g=(s*e+o)*4;n[g]=(u*.5+.5)*255,n[g+1]=(h*.5+.5)*255,n[g+2]=(p*.5+.5)*255,n[g+3]=255}})}function Jt(i,e,t){const n=new _n(i);return n.wrapS=n.wrapT=Xn,n.colorSpace=e?ut:en,n.anisotropy=t,n.needsUpdate=!0,n}function Gx(i,e){const t=an(i,11,6,4),n=an(i,97,3,64),s=2,o=xo(5),r=[];for(let p=0;p<s*s;p++)r.push(.94+o()*.08);const a=Math.max(2,i/170),c=new Float32Array(i*i),l=new Float32Array(i*i),u=Cn(i,p=>{for(let d=0;d<i;d++)for(let g=0;g<i;g++){const _=g/i*s,m=d/i*s,f=Math.min(_-Math.floor(_),Math.ceil(_)-_)*(i/s),E=Math.min(m-Math.floor(m),Math.ceil(m)-m)*(i/s),w=Math.min(f,E),v=w<a?0:w<a*2?(w-a)/a:1,A=r[Math.floor(m)*s+Math.floor(_)],T=d*i+g,R=(.74+t[T]*.16+n[T]*.06)*A*(.55+.45*v);c[T]=v*.8+n[T]*.15+t[T]*.05,l[T]=.62+t[T]*.25;const P=T*4;p[P]=R*238,p[P+1]=R*238,p[P+2]=R*232,p[P+3]=255}}),h=Cn(i,p=>{for(let d=0;d<i*i;d++){const g=l[d]*255;p[d*4]=g,p[d*4+1]=g,p[d*4+2]=g,p[d*4+3]=255}});return new Je({map:Jt(u,!0,e),normalMap:Jt(ds(c,i,6),!1,e),roughnessMap:Jt(h,!1,e),roughness:1,metalness:0,envMapIntensity:.5})}function Wx(i,e){const t=an(i,23,5,4),n=xo(77),s=new Float32Array(i);for(let h=0;h<i;h++)s[h]=n();const o=new Float32Array(i*i),r=new Float32Array(i*i),c=i/2,l=Cn(i,h=>{for(let p=0;p<i;p++)for(let d=0;d<i;d++){const g=p*i+d,_=d%c,m=p%c,f=Math.min(_,m,c-_,c-m),E=f<3?.35:f<6?.8:1;let w=0;const v=c*.06;for(const[P,M]of[[v*1.4,v*1.4],[c-v*1.4,v*1.4],[v*1.4,c-v*1.4],[c-v*1.4,c-v*1.4]]){const x=Math.hypot(_-P,m-M)/(v*.45);x<1&&(w=Math.max(w,Math.sqrt(1-x*x)))}const A=.85+s[p]*.15,T=(.2+t[g]*.12)*A*E+w*.08;o[g]=E*.7+w*.6+s[p]*.05,r[g]=.38+t[g]*.3+(1-E)*.2;const R=g*4;h[R]=T*255,h[R+1]=T*262,h[R+2]=T*270,h[R+3]=255}}),u=Cn(i,h=>{for(let p=0;p<i*i;p++){const d=Math.min(1,r[p])*255;h[p*4]=d,h[p*4+1]=d,h[p*4+2]=d,h[p*4+3]=255}});return new Je({map:Jt(l,!0,e),normalMap:Jt(ds(o,i,5),!1,e),roughnessMap:Jt(u,!1,e),roughness:1,metalness:.75,envMapIntensity:.9})}function $x(i,e){const t=an(i,41,6,6),n=an(i,43,2,96),s=new Float32Array(i*i),o=Cn(i,r=>{for(let a=0;a<i*i;a++){const c=n[a]>.78?.6:1,l=(.32+t[a]*.18)*c;s[a]=t[a]*.6+(c<1?0:.4),r[a*4]=l*250,r[a*4+1]=l*248,r[a*4+2]=l*240,r[a*4+3]=255}});return new Je({map:Jt(o,!0,e),normalMap:Jt(ds(s,i,4),!1,e),roughness:.92,metalness:0,envMapIntensity:.3})}function Xx(i,e){const n=Cn(i,s=>{for(let o=0;o<i;o++)for(let r=0;r<i;r++){const a=(r+o)/i*16,c=(r-o+i)/i*16,l=Math.abs(a-Math.round(a)),u=Math.abs(c-Math.round(c)),h=l<.12||u<.12,p=r<i*.02||o<i*.02||r>i*.98||o>i*.98,d=(o*i+r)*4,g=h||p?70:0;s[d]=g,s[d+1]=g,s[d+2]=g+6,s[d+3]=h||p?255:0}});return new Je({map:Jt(n,!0,e),alphaTest:.5,side:bt,metalness:.8,roughness:.4})}function qx(){return new Il({color:10470608,metalness:0,roughness:.04,transparent:!0,opacity:.16,envMapIntensity:1.6,clearcoat:1,depthWrite:!1,side:bt})}function Yx(i,e){const t=an(i,59,5,4),n=ds(t,i,10),s=Jt(n,!1,e);return new Je({color:2910998,emissive:3997482,emissiveIntensity:.35,normalMap:s,roughness:.15,metalness:.1,transparent:!0,opacity:.92})}function jc(i,e,t,n,s){const o=an(i,s,5,6),r=an(i,s+1,3,12),a=new Float32Array(i*i);for(let c=0;c<a.length;c++)a[c]=o[c]*.5+Math.max(0,r[c]-.55)*1.6;return new Il({color:t,emissive:n,emissiveIntensity:.18,normalMap:Jt(ds(a,i,8),!1,e),roughness:.18,metalness:0,clearcoat:1,clearcoatRoughness:.1,envMapIntensity:1.1})}let qi=null;function Zx(i,e){const t=an(i,31,6,4),n=an(i,77,3,32),s=xo(1234),o=Cn(i,a=>{for(let c=0;c<i*i;c++){const l=Math.min(1,Math.max(0,(t[c]-.3)*2.2)),u=.8+n[c]*.45+(s()-.5)*.18;a[c*4]=(62+66*l)*u,a[c*4+1]=(118+72*l)*u,a[c*4+2]=(42+36*l)*u,a[c*4+3]=255}}),r=new _n(o);return r.wrapS=r.wrapT=Xn,r.colorSpace=ut,r.anisotropy=e,new Je({map:r,roughness:.96,metalness:0})}let kl=4;function Pn(i="high",e=4){if(qi)return qi;const t=128;kl=e;const n=Gx(t,e),s=n.clone();s.color=new be(14216447);const o=n.clone();return o.color=new be(16773334),qi={white:n,whiteS:s,whiteL:o,metal:Wx(t,e),concrete:$x(t,e),plate:new Je({color:10134445,roughness:.5,metalness:.6}),glass:qx(),grate:Xx(t,e),acid:Yx(t,e),glow:new Rn({color:16777215}),grass:Zx(256,e),bounce:jc(t,e,1736191,670975,131),speed:jc(t,e,16742928,16730624,151)},Kx(qi),qi}const Jx="./tex/",ar=new Map;function cr(i,e){if(ar.has(i))return ar.get(i);const t=new Promise((n,s)=>{new xp().load(Jx+i,o=>{o.wrapS=o.wrapT=Xn,o.colorSpace=e?ut:en,o.anisotropy=kl,n(o)},void 0,s)});return ar.set(i,t),t}const lr=new Map;function so(i){return lr.has(i)||lr.set(i,Promise.all([cr(`${i}_c.webp`,!0),cr(`${i}_n.webp`,!1),cr(`${i}_o.webp`,!1)]).then(([e,t,n])=>({map:e,normalMap:t,orm:n})).catch(()=>null)),lr.get(i)}function oo(i,e,{normalScale:t=1,aoIntensity:n=1,roughness:s=1,metalness:o=1}={}){if(e){i.map=e.map,i.normalMap=e.normalMap,i.normalScale?.set(t,t),i.aoMap=e.orm,i.aoMapIntensity=n,i.roughnessMap=e.orm,i.metalnessMap=e.orm,i.roughness=s,i.metalness=o,i.needsUpdate=!0;for(const r of ro.get(i)??[])r.map=i.map,r.normalMap=i.normalMap,r.normalScale?.copy(i.normalScale),r.aoMap=i.aoMap,r.aoMapIntensity=i.aoMapIntensity,r.roughnessMap=i.roughnessMap,r.metalnessMap=i.metalnessMap,r.roughness=i.roughness,r.metalness=i.metalness,r.needsUpdate=!0}}const ro=new Map,Qc=new Map;function w3(i,e){const t=i.uuid+":"+e;let n=Qc.get(t);return n||(n=i.clone(),n.color.setHex(e),ro.has(i)||ro.set(i,[]),ro.get(i).push(n),Qc.set(t,n)),n}function Kx(i){so("white").then(e=>{for(const t of["white","whiteS","whiteL"])oo(i[t],e,{normalScale:1,aoIntensity:1})}),so("dark").then(e=>oo(i.metal,e,{normalScale:1.1,aoIntensity:1})),jx(i,"floor_light"),so("plate").then(e=>oo(i.plate,e,{normalScale:1.2}))}let hr=null;function jx(i,e){hr!==e&&(hr=e,so(e).then(t=>{hr===e&&oo(i.concrete,t,{normalScale:1,aoIntensity:1})}))}const E3=["white","whiteS","whiteL","metal","concrete","plate","glass","grate","bounce","speed","grass","glow","acid"],b3={white:"白色面板（可开门）",whiteS:"小号面板（开出小门，穿过会缩小）",whiteL:"大号面板（开出大门，穿过会放大）",metal:"金属（不可开门）",concrete:"地砖 / 混凝土（不可开门）",plate:"八角金属板（不可开门）",glass:"玻璃（挡子弹）",grate:"栅格（子弹可穿过）",bounce:"弹跳凝胶（蓝）",speed:"推进凝胶（橙）",grass:"草地（不可开门）",glow:"自发光（水晶、灯带，配合 color、intensity）",acid:"酸液外观（只有样子，没有致死范围；配合 hazard hidden 使用）"},T3=new Map([["white",1],["whiteS",.45],["whiteL",2.2]]),A3={white:2,whiteS:.9,whiteL:4.4,metal:2,concrete:3,plate:2,grass:5,acid:4};function z3(i,e,t=2,n="box"){let s;n==="sphere"?s=new _o(i[0]/2,72,44):n==="cyl"?s=new Pt(i[0]/2,i[0]/2,i[1],48,1):s=new gt(i[0],i[1],i[2]);const o=s.attributes.position,r=s.attributes.normal,a=s.attributes.uv;for(let c=0;c<o.count;c++){const l=o.getX(c)+e[0],u=o.getY(c)+e[1],h=o.getZ(c)+e[2],p=Math.abs(r.getX(c)),d=Math.abs(r.getY(c)),g=Math.abs(r.getZ(c));let _,m;n!=="box"?p>=d&&p>=g?(_=h*Math.sign(r.getX(c)||1),m=u):d>=g?(_=l,m=h):(_=-l*Math.sign(r.getZ(c)||1),m=u):p>.5?(_=h*Math.sign(r.getX(c)),m=u):d>.5?(_=l,m=h):(_=-l*Math.sign(r.getZ(c)),m=u),a.setXY(c,-_/t,m/t)}return a.needsUpdate=!0,s}let Yi=null;function Gl(){if(Yi)return Yi;const i=document.createElement("canvas");i.width=i.height=128;const e=i.getContext("2d"),t=e.createRadialGradient(64,64,0,64,64,64);return t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.18,"rgba(255,255,255,0.55)"),t.addColorStop(.5,"rgba(255,255,255,0.12)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,128,128),Yi=new _n(i),Yi.colorSpace=ut,Yi}function R3(i,e,t){const n=new go(t,e,28,1,!0);n.translate(0,-e/2,0);const s=new Ht({uniforms:{color:{value:new be(i)},strength:{value:.1}},vertexShader:`varying vec3 vN; varying vec3 vV; varying float vH;
      void main(){
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vN = normalize(normalMatrix * normal);
        vV = normalize(-mv.xyz);
        vH = -position.y / ${e.toFixed(3)};
        gl_Position = projectionMatrix * mv;
      }`,fragmentShader:`uniform vec3 color; uniform float strength; varying vec3 vN; varying vec3 vV; varying float vH;
      void main(){
        float edge = pow(abs(dot(normalize(vN), normalize(vV))), 1.6);
        float fade = (1.0 - vH) * smoothstep(0.0, 0.08, vH);
        gl_FragColor = vec4(color * strength * edge * fade * 2.0, 1.0);
      }`,transparent:!0,blending:Ai,depthWrite:!1,side:bt}),o=new we(n,s);return o.frustumCulled=!1,o.renderOrder=3,o}class C3{constructor(e,{count:t=160,size:n=new z(18,7,18)}={}){const s=new pt,o=new Float32Array(t*3),r=c=>{const l=Math.sin(c*127.1+311.7)*43758.5453;return l-Math.floor(l)};for(let c=0;c<t;c++)o[c*3]=r(c*3+1),o[c*3+1]=r(c*3+2),o[c*3+2]=r(c*3+3);s.setAttribute("position",new Bt(o,3)),this.uniforms={time:{value:0},cam:{value:new z},box:{value:n},color:{value:new be(14412543)},map:{value:Gl()},pr:{value:1}};const a=new Ht({uniforms:this.uniforms,vertexShader:`uniform float time; uniform vec3 cam; uniform vec3 box; uniform float pr; varying float vA;
        void main(){
          vec3 s = position;
          vec3 drift = vec3(sin(time*0.11 + s.x*40.0)*0.6, -0.05 - s.y*0.06, cos(time*0.09 + s.z*40.0)*0.6) * time;
          vec3 p = s * box + drift;
          p = cam + mod(p - cam + box*0.5, box) - box*0.5;
          vec4 mv = viewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          float d = -mv.z;
          gl_PointSize = pr * (1.5 + s.y*2.5) * 30.0 / max(d, 1.5);
          vA = smoothstep(0.5, 2.0, d) * (1.0 - smoothstep(6.0, 9.0, d)) * (0.35 + 0.65*fract(s.x*91.7));
        }`,fragmentShader:`uniform vec3 color; uniform sampler2D map; varying float vA;
        void main(){ float a = texture2D(map, gl_PointCoord).a * vA * 0.28; gl_FragColor = vec4(color * a, 1.0); }`,transparent:!0,blending:Ai,depthWrite:!1});this.points=new Uu(s,a),this.points.frustumCulled=!1,this.points.renderOrder=4,e.add(this.points),this.accent=new be(5619967)}setColor(e,t){this.uniforms.color.value.setHex(e),this.accent.setHex(t)}setPixelRatio(e){this.uniforms.pr.value=e}update(e,t){this.uniforms.time.value=e,this.uniforms.cam.value.copy(t)}}const ur=.62,pr=1.12,P3=2.2,wi={blue:new be(2067455),orange:new be(16742930),gate:new be(10479871)},Qx=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,e3=`
  uniform sampler2D map;
  uniform vec2 resolution;
  uniform vec3 color;
  uniform vec3 fallback;
  uniform float time;
  uniform float open;
  uniform float linked;
  uniform float rect;
  uniform float seamless;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
  }

  void main() {
    vec2 p = (vUv - 0.5) * 2.0;
    float ang = atan(p.y, p.x);
    vec3 col;
    if (seamless > 0.5) {
      // 无缝门：和普通门洞一模一样，没有任何边框
      col = linked > 0.5 ? texture2D(map, gl_FragCoord.xy / resolution).rgb : fallback;
      gl_FragColor = vec4(col, 1.0);
    } else {
      float r;
      if (rect > 0.5) {
        r = max(abs(p.x), abs(p.y)) / max(open, 0.001);
      } else {
        // 边缘带一点随时间流动的抖动，像能量场
        float wobble = 0.035 * (noise(vec2(ang * 3.0, time * 1.7)) - 0.5);
        r = length(p) / max(open, 0.001) + wobble;
      }
      if (r > 1.0) discard;
      if (linked > 0.5) {
        col = texture2D(map, gl_FragCoord.xy / resolution).rgb;
      } else {
        float swirl = noise(vec2(ang * 2.0 + time * 0.8 + r * 6.0, r * 4.0 - time));
        col = color * (0.25 + 0.6 * swirl) * (1.2 - r);
      }
      float edge0 = rect > 0.5 ? 0.95 : 0.84;
      float rim = smoothstep(edge0, edge0 + 0.13 * (1.0 - rect * 0.7), r);
      float flick = noise(vec2(ang * 6.0, time * 3.0));
      col = mix(col, color * (2.2 + 2.5 * flick), rim);
      col += color * 0.35 * smoothstep(0.6, 0.9, r) * (1.0 - rim) * (1.0 - rect);
      gl_FragColor = vec4(col, 1.0);
    }
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;class L3{constructor(e,{shape:t="ellipse",seamless:n=!1,halfW:s=ur,halfH:o=pr}={}){this.color=e,this.shape=t,this.seamless=n,this.halfW=s,this.halfH=o,this.size=1,this.placed=!1,this.fixed=!1,this.active=!0,this.gateway=!1,this.exitOnly=!1,this.other=null,this.position=new z,this.normal=new z(0,0,1),this.up=new z(0,1,0),this.right=new z(1,0,0),this.matrix=new We,this.matrixInv=new We,this.quaternion=new An,this.quaternionInv=new An,this.teleport=new We,this.teleportQ=new An,this.teleportScale=1,this.surface=null,this.tunnel=new Set,this.openT=0;const r=wi[e]??wi.gate;this.material=new Ht({uniforms:{map:{value:null},resolution:{value:new oe(1,1)},color:{value:r.clone()},fallback:{value:new be(461067)},time:{value:0},open:{value:0},linked:{value:0},rect:{value:t==="rect"?1:0},seamless:{value:n?1:0}},vertexShader:Qx,fragmentShader:e3,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-4}),this.mesh=new we(new Qn(1,1),this.material),this.mesh.visible=!1,this.mesh.renderOrder=1,this.mesh.userData.portal=this,this.light=new vo(r,0,4,2),this.light.castShadow=!1,this._resizeMesh()}_resizeMesh(){const e=this.seamless?[1,1]:this.shape==="rect"?[1.02,1.02]:[1.06,1.03];this.mesh.scale.set(this.halfW*2*e[0],this.halfH*2*e[1],1)}setSize(e){this.size=e,this.halfW=ur*e,this.halfH=pr*e,this._resizeMesh()}place(e,t,n,s){this.position.copy(e),this.normal.copy(t).normalize(),this.up.copy(n).normalize(),this.right.crossVectors(this.up,this.normal).normalize(),this.matrix.makeBasis(this.right,this.up,this.normal).setPosition(this.position),this.matrixInv.copy(this.matrix).invert(),this.quaternion.setFromRotationMatrix(this.matrix),this.quaternionInv.copy(this.quaternion).invert(),this.surface=s,this.placed=!0,this.openT=this.gateway?1:0,this.mesh.position.copy(e).addScaledVector(this.normal,this.seamless?5e-4:.002),this.mesh.quaternion.copy(this.quaternion),this.mesh.updateMatrixWorld(!0),this.mesh.visible=this.active&&!this.exitOnly,this.light.position.copy(e).addScaledVector(this.normal,.4*this.size)}remove(){this.placed=!1,this.mesh.visible=!1,this.light.intensity=0,this.tunnel.clear()}setActive(e){this.active=e,this.mesh.visible=e&&this.placed&&!this.exitOnly}get linked(){return this.placed&&this.active&&!this.exitOnly&&this.other&&this.other.placed&&this.other.active}signedDistance(e){return(e.x-this.position.x)*this.normal.x+(e.y-this.position.y)*this.normal.y+(e.z-this.position.z)*this.normal.z}toLocal(e,t){return t.copy(e).applyMatrix4(this.matrixInv)}norm(e){const t=e.x/this.halfW,n=e.y/this.halfH;return this.shape==="rect"?Math.max(t*t,n*n):t*t+n*n}contains(e,t=1){return this.norm(e)<=t*t}fits(e,t){return Math.abs(this.normal.y)>.5?e<=Math.min(this.halfW,this.halfH)*.97:e<=this.halfW*.97&&t<=this.halfH*2*.98}static inEllipse(e,t=1){const n=e.x/(ur*t),s=e.y/(pr*t);return n*n+s*s<=1}update(e,t){if(!this.placed)return;this.openT=Math.min(1,this.openT+e*5);const n=this.openT,s=1-Math.pow(1-n,3);this.material.uniforms.open.value=s,this.material.uniforms.time.value=t,this.light.intensity=this.gateway?0:3.5*s*Math.min(2,this.size)}}const t3=.3;let Ks=null;function n3(){if(Ks)return Ks;const i=256,e=document.createElement("canvas");e.width=e.height=i;const t=e.getContext("2d");t.fillStyle="#4a4e52",t.fillRect(0,0,i,i);const n=i*.16,s=t.createLinearGradient(0,0,i,i);s.addColorStop(0,"#d8d8d2"),s.addColorStop(1,"#b9bab4"),t.fillStyle=s,t.fillRect(n,n,i-n*2,i-n*2),t.strokeStyle="#33373a",t.lineWidth=3,t.strokeRect(n,n,i-n*2,i-n*2),t.fillStyle="#25282b";for(const[u,h]of[[n/2,n/2],[i-n/2,n/2],[n/2,i-n/2],[i-n/2,i-n/2]])t.beginPath(),t.arc(u,h,i*.02,0,Math.PI*2),t.fill();t.fillStyle="#5d6266",t.beginPath(),t.arc(i/2,i/2,i*.2,0,Math.PI*2),t.fill();const o=new _n(e);o.colorSpace=ut;const r=document.createElement("canvas");r.width=r.height=i;const a=r.getContext("2d");a.fillStyle="#000",a.fillRect(0,0,i,i);const c=a.createRadialGradient(i/2,i/2,i*.08,i/2,i/2,i*.17);c.addColorStop(0,"#9fdcff"),c.addColorStop(.7,"#2a90ff"),c.addColorStop(1,"#000"),a.fillStyle=c,a.beginPath(),a.arc(i/2,i/2,i*.17,0,Math.PI*2),a.fill();const l=new _n(r);return l.colorSpace=ut,Ks=new Je({map:o,emissiveMap:l,emissive:16777215,emissiveIntensity:1.2,roughness:.45,metalness:.35}),Ks}let js=null;function i3(){if(js)return js;const i=256,e=l=>{const u=document.createElement("canvas");u.width=u.height=i;const h=u.getContext("2d");h.fillStyle="#3c4044",h.fillRect(0,0,i,i);const p=i*.14;h.fillStyle="#9ea3a6",h.fillRect(p,p,i-p*2,i-p*2),h.strokeStyle="#22262a",h.lineWidth=4,h.strokeRect(p,p,i-p*2,i-p*2),l?(h.fillStyle="#2a0805",h.beginPath(),h.arc(i/2,i/2,i*.3,0,Math.PI*2),h.fill()):(h.fillStyle="#5a2a22",h.beginPath(),h.moveTo(i*.5,i*.25),h.lineTo(i*.7,i*.55),h.lineTo(i*.3,i*.55),h.closePath(),h.fill());const d=new _n(u);return d.colorSpace=ut,d},t=new Je({map:e(!1),roughness:.5,metalness:.35}),n=document.createElement("canvas");n.width=n.height=i;const s=n.getContext("2d"),o=s.createRadialGradient(i/2,i/2,0,i/2,i/2,i*.3);o.addColorStop(0,"#ffd0c0"),o.addColorStop(.5,"#ff3010"),o.addColorStop(1,"#000"),s.fillStyle="#000",s.fillRect(0,0,i,i),s.fillStyle=o,s.beginPath(),s.arc(i/2,i/2,i*.3,0,Math.PI*2),s.fill();const r=new _n(n);r.colorSpace=ut;const a=new Je({map:e(!0),emissiveMap:r,emissive:16777215,emissiveIntensity:1.4,roughness:.2,metalness:.3}),c=t.clone();return js=[t,t,c,c,t,a],js}function D3(i="normal"){const e=t3*2,t=new gt(e,e,e),n=new we(t,i==="prism"?i3():n3());return n.castShadow=!0,n.receiveShadow=!0,n}function I3(i=!1){const e=Pn(),t=new Tt;if(i){const a=document.createElement("canvas");a.width=512,a.height=64;const c=a.getContext("2d");for(let h=-2;h<20;h++)c.fillStyle=h%2?"#111":"#f0c020",c.beginPath(),c.moveTo(h*32,64),c.lineTo(h*32+32,64),c.lineTo(h*32+64,0),c.lineTo(h*32+32,0),c.fill();const l=new _n(a);l.colorSpace=ut,l.wrapS=Xn,l.repeat.set(3,1);const u=new we(new Pt(1,1,.13,48,1,!0),new Je({map:l,roughness:.6}));u.position.y=.065,t.add(u)}const n=new we(new Pt(.85,.95,.12,40),e.metal);n.position.y=.06,n.receiveShadow=!0,n.castShadow=!0,t.add(n);const s=new Je({color:9051156,emissive:16722448,emissiveIntensity:.6,roughness:.35,metalness:.2}),o=new we(new Pt(.62,.66,.1,40),s);o.position.y=.17,o.castShadow=!0,t.add(o);const r=new we(new ps(.72,.035,8,48),new Je({color:2236962,metalness:.9,roughness:.3}));return r.rotation.x=Math.PI/2,r.position.y=.13,t.add(r),i&&t.scale.set(1.7,1.2,1.7),{group:t,plunger:o,plungerMat:s}}function U3(){const i=Pn(),e=new Tt,t=new we(new Pt(.28,.34,.08,24),i.metal);t.position.y=.04,e.add(t);const n=new we(new Pt(.06,.07,.95,12),i.metal);n.position.y=.55,n.castShadow=!0,e.add(n);const s=new we(new gt(.34,.14,.3),new Je({color:14211282,roughness:.4,metalness:.2}));s.position.y=1.08,s.rotation.x=-.35,s.castShadow=!0,e.add(s);const o=new Je({color:9051156,emissive:16722448,emissiveIntensity:.8}),r=new we(new Pt(.09,.09,.06,20),o);r.position.set(0,1.16,.02),r.rotation.x=-.35,e.add(r);const a=new Rn({color:3211104}),c=new we(new ps(.2,.018,6,40),a);return c.position.y=.09,c.rotation.x=Math.PI/2,c.visible=!1,e.add(c),{group:e,capMat:o,ring:c}}function N3(i){const e=Pn(),t=new Tt,n=new we(new gt(.9,.9,.3),e.metal);n.position.z=.15,n.castShadow=!0,t.add(n);const s=i==="laser"?16722448:4894975,o=new Je({color:1114112,emissive:s,emissiveIntensity:2.5});if(i==="laser"){const r=new we(new Pt(.2,.24,.12,24),o);r.rotation.x=Math.PI/2,r.position.z=.34,t.add(r)}else{const r=new we(new gt(.8,.08,.1),o);r.position.set(0,0,.33),t.add(r)}return{group:t,lensMat:o}}function F3(){const i=Pn(),e=new Tt,t=new we(new gt(.9,.9,.25),i.metal);t.position.z=.125,e.add(t);const n=new we(new ps(.3,.05,10,32),new Je({color:7829367,metalness:.9,roughness:.3}));n.position.z=.27,e.add(n);const s=new Je({color:2230792,emissive:4198408,emissiveIntensity:1}),o=new we(new _o(.24,20,12,0,Math.PI*2,0,Math.PI/2),s);return o.rotation.x=Math.PI/2,o.position.z=.25,e.add(o),{group:e,coreMat:s}}function O3(){const i=Pn(),e=new Tt,t=new we(new Pt(1,1.05,.12,40),i.metal);t.position.y=.06,t.receiveShadow=!0,e.add(t);const n=new Je({color:14277590,roughness:.45,metalness:.2}),s=new we(new Pt(.85,.85,.06,40),n);s.position.y=.14,s.receiveShadow=!0,e.add(s);const o=new Je({color:666170,emissive:2797823,emissiveIntensity:1.3}),r=new Tt;for(let a=0;a<3;a++){const c=new zl;c.moveTo(-.35,0),c.lineTo(0,.25),c.lineTo(.35,0),c.lineTo(.35,-.1),c.lineTo(0,.15),c.lineTo(-.35,-.1),c.closePath();const l=new we(new Ta(c),o);l.rotation.x=-Math.PI/2,l.position.set(0,.175,.35-a*.28),r.add(l)}return e.add(r),{group:e,plate:s,arrows:r,arrowMat:o}}function B3(i){const e=new Tt,t=new Ht({uniforms:{time:{value:0},on:{value:1}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`
      uniform float time; uniform float on; varying vec2 vUv;
      float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }
      void main(){
        float lines = smoothstep(0.92, 1.0, sin(vUv.y * 90.0 + time * 6.0) * 0.5 + 0.5);
        float spark = step(0.985, h(floor(vec2(vUv.x * 60.0, vUv.y * 30.0 - time * 8.0))));
        float edge = smoothstep(0.08, 0.0, min(vUv.x, 1.0 - vUv.x));
        float a = (0.08 + lines * 0.22 + spark * 0.5 + edge * 0.4) * on;
        gl_FragColor = vec4(vec3(0.35, 0.7, 1.0) * 1.6, a);
      }`,transparent:!0,depthWrite:!1,side:bt,blending:Ai}),n=i.indexOf(Math.min(...i)),s=n===0?i[2]:i[0],o=n===1?i[2]:i[1],r=new we(new Qn(s,o),t);n===0&&(r.rotation.y=Math.PI/2),n===1&&(r.rotation.x=-Math.PI/2),r.renderOrder=3,e.add(r);const a=Pn(),c=new gt(.15,n===1?.15:o,.15);for(const l of[-1,1]){const u=new we(c,a.metal);n===0?u.position.z=l*s/2:u.position.x=l*s/2,e.add(u)}return{group:e,mat:t}}function H3(i){const e=Pn(),t=new Tt,n=new we(new gt(i[0],i[1],i[2]),e.metal);n.castShadow=!0,n.receiveShadow=!0,t.add(n);const s=new Je({color:2228224,emissive:16719888,emissiveIntensity:1.5}),o=Math.min(i[0],i[2])===i[0]?0:2;for(const r of[-1,1]){const a=o===0?[.02,.08,i[2]*.8]:[i[0]*.8,.08,.02],c=new we(new gt(...a),s);o===0?c.position.x=r*(i[0]/2+.01):c.position.z=r*(i[2]/2+.01),c.position.y=i[1]*.15,t.add(c)}return{group:t,lightMat:s}}function s3(i,e){const t=document.createElement("canvas");t.width=512,t.height=160;const n=t.getContext("2d");n.fillStyle="rgba(10,14,18,0.9)",n.fillRect(0,0,512,160),n.strokeStyle=e,n.lineWidth=6,n.strokeRect(8,8,496,144),n.fillStyle=e,n.font='bold 84px "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif',n.textAlign="center",n.textBaseline="middle",n.fillText(i,256,84);const s=new _n(t);return s.colorSpace=ut,s}function V3(i){const e=new Tt,t=new Je({color:666128,emissive:4259712,emissiveIntensity:3.2}),n=i[0],s=i[2],o=i[1],r=new gt(.08,o,.08);for(const[h,p]of[[-n/2,-s/2],[n/2,-s/2],[-n/2,s/2],[n/2,s/2]]){const d=new we(r,t);d.position.set(h,0,p),e.add(d)}const a=new we(new Pt(Math.min(n,s)*.42,Math.min(n,s)*.45,.06,48),new Je({color:1777184,metalness:.8,roughness:.3,emissive:3211120,emissiveIntensity:.25}));a.position.y=-o/2+.03,a.receiveShadow=!0,e.add(a);const c=new we(new Pt(Math.min(n,s)*.4,Math.min(n,s)*.4,o,32,1,!0),new Rn({color:5308304,transparent:!0,opacity:.08,depthWrite:!1,side:bt}));e.add(c);const l=new xl(new va({map:s3("EXIT 出口","#5dff95"),depthWrite:!1}));l.scale.set(1.6,.5,1),l.position.y=o/2+.35,e.add(l);const u=new vo(5308304,2.5,6,2);return u.position.y=0,e.add(u),e.userData.beam=c,e.userData.glow=t,e}function k3(i,e=!1){const t=Pn(),n=new Tt,s=new Qn(i[0],i[2],1,1),o=s.attributes.uv;for(let l=0;l<o.count;l++)o.setXY(l,o.getX(l)*i[0]/3,o.getY(l)*i[2]/3);const r=new we(s,t.acid);r.rotation.x=-Math.PI/2;const a=e?-i[1]/2+.06:i[1]/2;r.position.y=a,r.receiveShadow=!0,n.add(r);const c=new vo(5308208,2,Math.max(i[0],i[2])*.8,2);return c.position.y=a+.5,n.add(c),n}function G3(i){const e=new Tt,t=new be(i.color??16773856),n=new we(new gt(1.4,.05,.5),new Rn({color:t.clone().multiplyScalar(3.2)}));n.position.y=-.01,e.add(n);const s=new Je({color:2830133,metalness:.8,roughness:.35}),o=new we(new gt(1.56,.1,.66),s);o.position.y=.06,e.add(o);for(const a of[-1,1]){const c=new we(new gt(.06,.07,.66),s);c.position.set(a*.75,0,0),e.add(c)}for(const a of[-1,1]){const c=new we(new gt(1.56,.07,.06),s);c.position.set(0,0,a*.3),e.add(c)}const r=new xl(new va({map:Gl(),color:t,transparent:!0,opacity:.55,blending:Ai,depthWrite:!1}));return r.scale.set(3.6,3.6,1),r.position.y=-.35,e.add(r),e}function W3(){const i=new Tt,e=new we(new xa(.3,1.2,4,12),new Je({color:4172287,transparent:!0,opacity:.6}));e.position.y=.9,i.add(e);const t=new we(new go(.18,.5,12),new Je({color:16777215}));return t.rotation.x=-Math.PI/2,t.position.set(0,1.6,-.45),i.add(t),i}function $3(i){const e=new ba(.9,1,40);e.scale(.62,1.12,1);const t=new we(e,new Rn({color:wi[i]??wi.orange,side:bt})),n=new we(new Ma(.9,40).scale(.62,1.12,1),new Rn({color:wi[i]??wi.orange,transparent:!0,opacity:.25,side:bt}));return t.add(n),t}export{O3 as $,Sh as A,gt as B,v3 as C,bt as D,Kt as E,He as F,g3 as G,u3 as H,b3 as I,$3 as J,G3 as K,mo as L,o3 as M,vo as N,ft as O,Hn as P,An as Q,fo as R,m3 as S,r3 as T,k3 as U,z as V,y3 as W,V3 as X,H3 as Y,B3 as Z,z3 as _,oe as a,F3 as a0,N3 as a1,U3 as a2,I3 as a3,D3 as a4,W3 as a5,w3 as a6,c3 as a7,Ml as a8,h3 as a9,Eh as aA,bh as aB,wh as aC,Ct as aD,xl as aE,va as aF,Gl as aG,jx as aH,A3 as aI,jl as aJ,C3 as aK,vl as aL,T3 as aM,R3 as aN,M3 as aO,Qe as aa,L3 as ab,P3 as ac,t3 as ad,Je as ae,xa as af,wi as ag,Ai as ah,Bt as ai,Iu as aj,Uu as ak,ya as al,jn as am,Yn as an,us as ao,Nl as ap,Ht as aq,yu as ar,bn as as,d3 as at,l3 as au,Xe as av,je as aw,yh as ax,xh as ay,Mh as az,a3 as b,f3 as c,Rn as d,Pt as e,pt as f,we as g,Dl as h,Du as i,ps as j,_o as k,We as l,Qn as m,ut as n,bu as o,be as p,Pc as q,x3 as r,p3 as s,_3 as t,Wt as u,Tt as v,Pn as w,S3 as x,Kn as y,E3 as z};
