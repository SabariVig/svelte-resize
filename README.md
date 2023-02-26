# Resize Svelte
 
<p align="center">
<img alt="npm" src="https://img.shields.io/npm/v/svelte-resize?logoColor=red&style=for-the-badge">
  <img alt="license" src="https://img.shields.io/badge/License-MIT-black?style=for-the-badge">
  <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/svelte-resize?color=brightgreen&style=for-the-badge">
  <img alt="svelte" src="https://img.shields.io/badge/Made-for%20Svelte-red?style=for-the-badge&logo=svelte">
</p>
<br>

<p align="center">
<img src="https://user-images.githubusercontent.com/33371586/221412630-75532820-7067-4a12-be87-ff3fa47aee9d.png" width="200px" />
</p>


## Description

svelte-resize is vanilla without any 3rd party dependencies library made for svelte written in typescript. Super simple API thats easy to integrate.

## Demo

![Recording 2023-02-26 at 18 43 47](https://user-images.githubusercontent.com/33371586/221412647-157d40d9-06cc-459b-9e55-c499aa785158.gif)


## Installation


With pnpm:

```sh
pnpm install svelte-resize
```

With Yarn:

```sh
yarn add svelte-resize
```


With NPM:

```sh
npm install svelte-resize
```

## Usage

```svelte

<script>
  import { resize } from 'svelte-resize'
</script>


<div use:resize />

```


## Props

### Main props

| prop     | Description                                                                        | type                                | default  | required |
| -------- | ---------------------------------------------------------------------------------- | ----------------------------------- | -------- | --------|
| disabled | Disables resize       | boolean                              | false       | false|
| minimumSize     | Sets the minimum size in px the node is allowed to resize              | number                              | 20 px        | false|
| maximumSize | Sets the maxiumum size in px the node is allowed to resize |  number | null     | false
| handlerSize    | Size of the resize handler                                                               | number     | 10 px | false
| handler      | Specifies the corner that is able to resize                                                             | { leftTop, leftBottom, rightTop, rightBottom }                              | { leftTop: true, leftBottom: true, rightTop: true, rightBottom: true }       | false
| borderStyle   | Style applied to handler               | string                             | ""2px solid rgba(0, 0, 0, 0.4)"    | false
