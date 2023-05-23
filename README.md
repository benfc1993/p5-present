# p5 Present

presentation tool using p5 js

This code comes with an example presentation in `src/presentation`

There are two example template functions and an example slide in `src/presentation/templates`

---

## Setup

This project uses yarn

```bash
yarn
```

---

## Running Application

### Dev mode

```bash
yarn dev
```

- This will run the Node.js server.
- The presentation on localhost:3000
- The presenter mode on localhost:3000/presenter

### 'Production' mode

```bash
yarn start
```

The only difference currently is minified and uglified code.

- This will run the Node.js server.
- The presentation on localhost:3000
- The presenter mode on localhost:3000/presenter

## Assets

Asset files are automatically read and imported to be used by p5.js.

Fonts can be added to the `public/assets/fonts` directory.
Images can be added to the `public/assets/images` directory.

when the `assetList.sh` script is run it will generate a list off the image and font files.
This is then used to load the assets in the below files:

Fonts: `src/assetInitialisation/loadFonts.ts`
Images: `src/assetInitialisation/loadImages.ts`
