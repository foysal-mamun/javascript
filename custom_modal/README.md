## Custom Modal
modal with pure javascript

## Usage

### 1. open custom modal

``` javascript
lifoModal(
  { 
		title:    "Custom modal box",
		bodyText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id orci ultrices leo ullamcorper euismod eget vestibulum mi. ",        			
	}, 
	function(){
		console.log("modal ok");
	}, 
	function(){
		console.log("modal close");
	}
).open();
```

### 2. open As alert box
``` javascript
alert("Request Seccess");
```

### 3. close custom modal
``` javascript
var modalObject = lifoModal(...);
modalObject.close();
```
