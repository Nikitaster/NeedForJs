# NeedForJs

## Github Pages
[Link to](https://nikitaster.github.io/NeedForJs/index.html) 


## Electron usage: 

### Installation
```bash
npm init
(in repo script name = main.js)
npm i -D electron@latest 
npm i path url -D    
```

### Start
```npm
electron .
```
or in package.json
```JavaScript
"scripts": {
  "start": "electron ."
},
```
```npm
npm start
```

### Deploy
### Electron-packager
```bash
npm i electron-packager -g
npm i electron-packager -D
electron-packager .
```
