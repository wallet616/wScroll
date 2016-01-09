# wScroll
A Javascript library that allows you to add to objects **scrollbar** with **modifiable** **appearance** and **size**.

###### About the library
The wScroll library is a tool to create objects like *div*'s with scrollbar.
It is quite usefull if you want to create an list of elements, without using iframe because of unadjusted look.

Whole plugin is pretty simple, and unfortunately works only at desktop devices. 
Support for mobile devices will approach soon... probably.

Works only for vertical scrollbar, horizontal isn't and won't be supported.

###### Usage
First You have to link library to you webpage by adding in head section patch to `wScroll.css` and `wScroll.js`.
```
<link rel="stylesheet" href="wScroll/wScroll.css">
<script src="wScroll/wScroll.js"></script>
```
Then create an object with specified `id`.
```
<div id="test01">
  <div id="myDiv">
    My content. 
  </div>
</div>
```
Finaly add somewhere script that runs the library. Folowing arguments means in the order: `ID_of_the_element`.
```
<script>wScroll("test01");</script>
```
Height of the object that you call the function on always matchest hte height of that element. It means if You set fixed size it will be that fixed size, if you set height to `100%` then it will match te height of the parent.
Important: You can change properties of the object that You runs the script on, but You cannot change directly the content *(but You can chane the properties like height and width)* of that object. In case you want to dynamicly change the content, it is necesery to create one more object inside of the very first one, like that called `myDiv`. Then modify `myDiv` in any way you want.
