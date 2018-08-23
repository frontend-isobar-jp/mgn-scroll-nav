# mgn-scroll-nav ( Don't Need jQuery )


Implement scroll position with linked navigation. If scroll position intrudes the specified content area, assign class="active".
- Target browser : IE9+

___

# Install

```
npm i mgn-scroll-nav -S
```

## Or Download raw data
[↓ download "mgn-scroll-nav.js"](https://raw.githubusercontent.com/frontend-isobar-jp/mgn-scroll-nav/master/src/mgn-scroll-nav.js)


___

# Import

```
import mgnScrollNav from 'mgn-scroll-nav';
```

___

# Constructor

```
new mgnScrollNav( element [, option] )
```
|Argument|Data type|Default|Descroption|
|:-------|:--------|:------|:----------|
|element|String|-(Required)|Specify target element.<br>ex) ".j-scrollnav"|
|option|Object|-|ex)<br>option = {<br>boxElm: ".box",<br>activeElm: ".icon",<br>posFix: "50%",<br>edgeJudge: false<br>}|

|Option|Data type|Default|Descroption|
|:-------|:--------|:------|:----------|
|boxElm|String|".f-section"|Specify element to scroll to.|
|activeElm|String|"li"|Specify which child element of the element specified in element argument to be attached with **.active**.|
|posFix|Number or String|0|Specify the distinctive position (from window) to attach **.active**.<br>Please use **string** for **% unit** and **number** for **px unit**.|
|edgeJudge|Boolean|true|Specify whether to attach **.active** to the last (or first) element when reach the bottom (or first) of page.|

___

# Demo

[https://frontend-isobar-jp.github.io/mgn-scroll-nav/](https://frontend-isobar-jp.github.io/mgn-scroll-nav/)

```
import mgnScrollNav from 'mgn-scroll-nav';

new mgnScrollNav(
    ".j-scrollnav",
    {
        boxElm: '.f-box',
        activeElm: '.icon',
        posFix:  '50%',
        edgeJudge: false

    }
);
```
