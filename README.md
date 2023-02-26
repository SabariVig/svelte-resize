# Resize Svelte

## Description

Custom minimal resize library for svelte which does not use Resize Observable API, 

## Installation


With pnpm:

```sh
pnpm install resizevelt
```

With Yarn:

```sh
yarn add resizevelt
```


With NPM:

```sh
npm install resizevelt
```

## Usage

```svelte

<script>
  import { resize } from 'resizevelt'
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
