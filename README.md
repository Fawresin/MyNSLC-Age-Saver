# MyNSLC Age Saver

This userscript will store the date of birth info you entered and submitted on
the age verification page of the Cannabis MyNSLC site. It will also autofill the
fields and submit the info for you on subsequent visits.

It was created out of pure annoyance of browsing said site and getting kicked to
the age verification page multiple times within the same session.

If you want to see the page again for whatever reason, simply open the web
console in your browser and execute the following line to delete what was stored
by the script:

```javascript
localStorage.removeItem('faw_dob');
```

It is released under the MIT license.
