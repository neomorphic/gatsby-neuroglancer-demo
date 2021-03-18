# react-neuroglancer in a Gatsby app

1. Check commits b09e2fd18ec478dbebfed93b76fde4035df98734 and 115db224fea202204e1e4d53a88f6d113b10f017 for the changes that need to be made.
2. finally after running npm install, you will need to modify one of the gatsby webpack configuration files.
```
node_modules/gatsby/dist/utils/webpack-utils.js
```
Remove the svg test in the webpack config that modifies svgs
```
test: /\.(ico|svg|jpg|jpeg|png|gif|webp|avif)(\?.*)?$/
```
to
```
test: /\.(ico|jpg|jpeg|png|gif|webp|avif)(\?.*)?$/
```