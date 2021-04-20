(window.webpackJsonp=window.webpackJsonp||[]).push([[144],{199:function(e,o,t){"use strict";t.r(o),t.d(o,"frontMatter",(function(){return i})),t.d(o,"metadata",(function(){return c})),t.d(o,"rightToc",(function(){return s})),t.d(o,"default",(function(){return p}));var n=t(2),r=t(6),a=(t(0),t(275)),i={id:"README",title:"@cosmos-building-blocks/common",sidebar_label:"README"},c={unversionedId:"@cosmos-building-blocks/common/README",id:"@cosmos-building-blocks/common/README",isDocsHomePage:!1,title:"@cosmos-building-blocks/common",description:"@cosmos-building-blocks/common \u203a Globals",source:"@site/docs/@cosmos-building-blocks/common/README.md",permalink:"/law/docs/@cosmos-building-blocks/common/README",sidebar_label:"README",sidebar:"docs",previous:{title:"SsmState",permalink:"/law/docs/@cosmos-building-blocks/common/classes/ssmstate"},next:{title:"ImportedResolverRule",permalink:"/law/docs/@cosmos-building-blocks/network/classes/importedresolverrule"}},s=[{value:"The Cosmos CDK Toolkit",id:"the-cosmos-cdk-toolkit",children:[{value:"Bootstrapping the Bootstrapper",id:"bootstrapping-the-bootstrapper",children:[]},{value:"Using the Boostrapper",id:"using-the-boostrapper",children:[]}]}],l={rightToc:s};function p(e){var o=e.components,t=Object(r.a)(e,["components"]);return Object(a.b)("wrapper",Object(n.a)({},l,t,{components:o,mdxType:"MDXLayout"}),Object(a.b)("p",null,Object(a.b)("a",Object(n.a)({parentName:"p"},{href:"/law/docs/@cosmos-building-blocks/common/README"}),"@cosmos-building-blocks/common")," \u203a ",Object(a.b)("a",Object(n.a)({parentName:"p"},{href:"/law/docs/@cosmos-building-blocks/common/globals"}),"Globals")),Object(a.b)("h1",{id:"common"},"Common"),Object(a.b)("p",null,"Constructs and tools common to all Cosmos projects. "),Object(a.b)("h2",{id:"the-cosmos-cdk-toolkit"},"The Cosmos CDK Toolkit"),Object(a.b)("p",null,"Before a Cosmos core or extension can be bootstrapped to AWS accounts, the necessary bootstrapping resources first need to be deployed. Those resources are part of the Cosmos CDK Toolkit."),Object(a.b)("p",null,"The AWS CDK already provides a toolkit for use in its ",Object(a.b)("a",Object(n.a)({parentName:"p"},{href:"https://docs.aws.amazon.com/cdk/latest/guide/bootstrapping.html"}),"boostrapping process"),", but the Cosmos extends this toolkit with additional functionality to make deploying a Cosmos core or extension easier. The Cosmos CDK Toolkit includes, in addition to an s3 bucket for staging assets, a CodeBuild project that deploys your CDK. Because this deploy project runs in AWS as opposed to on your local workstation, the necessary roles are already configured for you."),Object(a.b)("p",null,"When the steps below are completed you'll be able to ",Object(a.b)("a",Object(n.a)({parentName:"p"},{href:"#using-the-boostrapper"}),"run the Bootstrapper App"),", which archives your current working directory, copies it to the CDK Toolkit s3 bucket in your master account, and triggers the CodeBuild job to bootstrap your Cosmos core or extension. "),Object(a.b)("h3",{id:"bootstrapping-the-bootstrapper"},"Bootstrapping the Bootstrapper"),Object(a.b)("p",null,"Deploying the Cosmos CDK Toolkit requires the following environment variables to be exported in your local environment:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"AWS_MASTER_ACCOUNT"),": Your management account in a typical multi-account pattern. "),Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"AWS_ACCOUNT"),": The account in which the Cosmos CDK Toolkit will be deployed. This may be the master account. ")),Object(a.b)("p",null,"For example:"),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{}),"export AWS_MASTER_ACCOUNT=11111111\nexport AWS_ACCOUNT=22222222\n")),Object(a.b)("p",null,"Then use the below command to deploy the Cosmos CDK Toolkit resources to your environments."),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},'npx cdk bootstrap --template "node_modules/@cosmos-building-blocks/common/lib/cdk-toolkit/template.yaml" --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess --trust ${AWS_MASTER_ACCOUNT} aws://${AWS_ACCOUNT}/ap-southeast-2')),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"--template")," substitutes the regular CDK Toolkit template with the Cosmos version"),Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"--cloudformation-execution-policies")," attaches the required policy to the deployment role"),Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"--trust")," defines the AWS account that may deploy into the environment being bootstrapped")),Object(a.b)("p",null,"This command will need to be run once for each AWS account in your multi-account pattern, substituting the ",Object(a.b)("inlineCode",{parentName:"p"},"AWS_ACCOUNT")," environment variable each time to target each account. You will need to have the required credentials for each account either in your AWS CLI configuration or exported locally as environment variables. "),Object(a.b)("h3",{id:"using-the-boostrapper"},"Using the Boostrapper"),Object(a.b)("p",null,"Once the The Cosmos CDK Toolkit is deployed, it can be used to bootstrap your Cosmos core or extension. "),Object(a.b)("p",null,"Run the below command in the base directory of your project and it will archive your project and pass it as an asset to the CDK Toolkit s3 bucket in your master account, and trigger the CodeBuild job to bootstrap your Cosmos core or extension. "),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"npx cdk --app \u201cnode_modules/@cosmos-building-blocks/common/lib/cdk-toolkit/bootstrap-app.js\u201d deploy")),Object(a.b)("p",null,"The command will default to deploying a Cosmos extension. To deploy a Cosmos core set environment variable ",Object(a.b)("inlineCode",{parentName:"p"},"CORE")," to ",Object(a.b)("inlineCode",{parentName:"p"},"true"),":"),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"CORE=true npx cdk --app \u201cnode_modules/@cosmos-building-blocks/common/lib/cdk-toolkit/bootstrap-app.js\u201d deploy")),Object(a.b)("p",null,"To deploy only specific stacks, set environment variable ",Object(a.b)("inlineCode",{parentName:"p"},"STACKS")," to the required stacks. "),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},'STACKS="Stack1 Stack2" npx cdk --app \u201cnode_modules/@cosmos-building-blocks/common/lib/cdk-toolkit/bootstrap-app.js\u201d deploy')))}p.isMDXComponent=!0},275:function(e,o,t){"use strict";t.d(o,"a",(function(){return b})),t.d(o,"b",(function(){return d}));var n=t(0),r=t.n(n);function a(e,o,t){return o in e?Object.defineProperty(e,o,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[o]=t,e}function i(e,o){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);o&&(n=n.filter((function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable}))),t.push.apply(t,n)}return t}function c(e){for(var o=1;o<arguments.length;o++){var t=null!=arguments[o]?arguments[o]:{};o%2?i(Object(t),!0).forEach((function(o){a(e,o,t[o])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(t,o))}))}return e}function s(e,o){if(null==e)return{};var t,n,r=function(e,o){if(null==e)return{};var t,n,r={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],o.indexOf(t)>=0||(r[t]=e[t]);return r}(e,o);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],o.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var l=r.a.createContext({}),p=function(e){var o=r.a.useContext(l),t=o;return e&&(t="function"==typeof e?e(o):c(c({},o),e)),t},b=function(e){var o=p(e.components);return r.a.createElement(l.Provider,{value:o},e.children)},u={inlineCode:"code",wrapper:function(e){var o=e.children;return r.a.createElement(r.a.Fragment,{},o)}},m=r.a.forwardRef((function(e,o){var t=e.components,n=e.mdxType,a=e.originalType,i=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),b=p(t),m=n,d=b["".concat(i,".").concat(m)]||b[m]||u[m]||a;return t?r.a.createElement(d,c(c({ref:o},l),{},{components:t})):r.a.createElement(d,c({ref:o},l))}));function d(e,o){var t=arguments,n=o&&o.mdxType;if("string"==typeof e||n){var a=t.length,i=new Array(a);i[0]=m;var c={};for(var s in o)hasOwnProperty.call(o,s)&&(c[s]=o[s]);c.originalType=e,c.mdxType="string"==typeof e?e:n,i[1]=c;for(var l=2;l<a;l++)i[l]=t[l];return r.a.createElement.apply(null,i)}return r.a.createElement.apply(null,t)}m.displayName="MDXCreateElement"}}]);