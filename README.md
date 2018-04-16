# Circleci docker images

## Deploying new versions of images.


### Install globally with npm

```
npm install -g
dockerium --interactive --save <config output path> --build <org/imagename:version>
```

### Use from this repo
```
npm install
npm run start -- --interactive --save <config output path> --build <org/imagename:version>
```
