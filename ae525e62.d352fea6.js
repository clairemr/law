(window.webpackJsonp=window.webpackJsonp||[]).push([[51],{186:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return l})),t.d(n,"metadata",(function(){return o})),t.d(n,"rightToc",(function(){return c})),t.d(n,"default",(function(){return b}));var i=t(2),r=t(9),a=(t(0),t(206)),l={id:"index",title:"@cosmos-building-blocks/pipeline",sidebar_label:"README"},o={id:"@cosmos-building-blocks/pipeline/index",title:"@cosmos-building-blocks/pipeline",description:"@cosmos-building-blocks/pipeline \u203a Globals",source:"@site/docs/@cosmos-building-blocks/pipeline/index.md",permalink:"/law/docs/@cosmos-building-blocks/pipeline/index",editUrl:"https://github.com/cdk-cosmos/law/edit/master/docs/@cosmos-building-blocks/pipeline/index.md",sidebar_label:"README",sidebar:"docs",previous:{title:"AppNodePipelineProps",permalink:"/law/docs/@cosmos-building-blocks/pipeline/interfaces/_index_.appnodepipelineprops"},next:{title:"index",permalink:"/law/docs/@cosmos-building-blocks/service/modules/_index_"}},c=[{value:"Development",id:"development",children:[{value:"Packages",id:"packages",children:[]},{value:"Testing Packages",id:"testing-packages",children:[]},{value:"Test Cdk Apps (cdk-test)",id:"test-cdk-apps-cdk-test",children:[]}]}],p={rightToc:c};function b(e){var n=e.components,t=Object(r.a)(e,["components"]);return Object(a.b)("wrapper",Object(i.a)({},p,t,{components:n,mdxType:"MDXLayout"}),Object(a.b)("p",null,Object(a.b)("a",Object(i.a)({parentName:"p"},{href:"/law/docs/@cosmos-building-blocks/pipeline/index"}),"@cosmos-building-blocks/pipeline")," \u203a ",Object(a.b)("a",Object(i.a)({parentName:"p"},{href:"/law/docs/@cosmos-building-blocks/pipeline/globals"}),"Globals")),Object(a.b)("h1",{id:"cosmos-cdk-packages"},"Cosmos CDK Packages"),Object(a.b)("p",null,Object(a.b)("img",Object(i.a)({parentName:"p"},{src:"shields/coverage.svg",alt:"coverage"}))),Object(a.b)("h2",{id:"development"},"Development"),Object(a.b)("h3",{id:"packages"},"Packages"),Object(a.b)("ol",null,Object(a.b)("li",{parentName:"ol"},"Clone Repo"),Object(a.b)("li",{parentName:"ol"},"Run ",Object(a.b)("inlineCode",{parentName:"li"},"yarn")," then ",Object(a.b)("inlineCode",{parentName:"li"},"yarn link")," then ",Object(a.b)("inlineCode",{parentName:"li"},"yarn bootstrap"))),Object(a.b)("h3",{id:"testing-packages"},"Testing Packages"),Object(a.b)("ol",null,Object(a.b)("li",{parentName:"ol"},"Build ",Object(a.b)("inlineCode",{parentName:"li"},"yarn build")),Object(a.b)("li",{parentName:"ol"},"Lint ",Object(a.b)("inlineCode",{parentName:"li"},"yarn lint")),Object(a.b)("li",{parentName:"ol"},"Test ",Object(a.b)("inlineCode",{parentName:"li"},"yarn test"))),Object(a.b)("h3",{id:"test-cdk-apps-cdk-test"},"Test Cdk Apps (cdk-test)"),Object(a.b)("ol",null,Object(a.b)("li",{parentName:"ol"},Object(a.b)("inlineCode",{parentName:"li"},"cd")," into the app"),Object(a.b)("li",{parentName:"ol"},Object(a.b)("inlineCode",{parentName:"li"},"npm install")," like it was any normal cdk app"),Object(a.b)("li",{parentName:"ol"},Object(a.b)("inlineCode",{parentName:"li"},"npx cdk synth")," like normal")),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"npx lerna link"),"\n",Object(a.b)("inlineCode",{parentName:"p"},"npx lerna bootstrap"),"\n",Object(a.b)("inlineCode",{parentName:"p"},"npx lerna publish"),"\n",Object(a.b)("inlineCode",{parentName:"p"},"npx lerna publish --force-publish=*")),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},'("@?aws-cdk(/.+)?": ".?)([0-9]+.[0-9]+.[0-9]+)(")')," -> ",Object(a.b)("inlineCode",{parentName:"p"},"$11.27.0$4")))}b.isMDXComponent=!0},206:function(e,n,t){"use strict";t.d(n,"a",(function(){return s})),t.d(n,"b",(function(){return m}));var i=t(0),r=t.n(i);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,i,r=function(e,n){if(null==e)return{};var t,i,r={},a=Object.keys(e);for(i=0;i<a.length;i++)t=a[i],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)t=a[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var p=r.a.createContext({}),b=function(e){var n=r.a.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},s=function(e){var n=b(e.components);return r.a.createElement(p.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.a.createElement(r.a.Fragment,{},n)}},u=r.a.forwardRef((function(e,n){var t=e.components,i=e.mdxType,a=e.originalType,l=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),s=b(t),u=i,m=s["".concat(l,".").concat(u)]||s[u]||d[u]||a;return t?r.a.createElement(m,o(o({ref:n},p),{},{components:t})):r.a.createElement(m,o({ref:n},p))}));function m(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var a=t.length,l=new Array(a);l[0]=u;var o={};for(var c in n)hasOwnProperty.call(n,c)&&(o[c]=n[c]);o.originalType=e,o.mdxType="string"==typeof e?e:i,l[1]=o;for(var p=2;p<a;p++)l[p]=t[p];return r.a.createElement.apply(null,l)}return r.a.createElement.apply(null,t)}u.displayName="MDXCreateElement"}}]);