# com.developatic.pagingControl


## Features

* Simply swippig between pages.
* Works on Android (tested on SDK 7.0.2), iOS

## Working Example
![Imgur](https://media.giphy.com/media/xUOwFTbrmWIx6AC7OU/giphy.gif)


## Quick Start
* Unzip the folder to your project under `com.developatic.pagingControl`.

In config.json add : 
```javascript
"dependencies": {
        "com.developatic.pagingControl": "1.0"
}
```

## Usage

XML: 

```xml
<Alloy>
    <Window class="container" >
       <Widget id="pagingcontrol" src="com.developatic.pagingControl"/>
    </Window>
</Alloy>
```


JS: 

```js
    var views = [];
    for (var i=0; i < 10; i++) {
       var view = Ti.UI.createView({
         height : 500,
         width : 250,
         backgroundColor : (i%2 == 0) ? 'black' : 'red'  
       });
       views.push(view);
    };

    $.pagingcontrol.setViews(views,{
      widthOfView : 250, 
      margin : 20,
      showIndicator : true // false by default
    });
```


## Methods

|Name|Params|Description|
|---|---|---|
|`setViews`|`(views : Array<Titanium.UI.View>, params : { widthOfView, margin, showIndicator : bool })`|Sets the value of the views property, and sets the width of views and margin between them.|
|`moveNext`|`null`|Sets the current page to the next consecutive page in views.|
|`movePrevious`|`null`|Sets the current page to the previous consecutive page in views.|

