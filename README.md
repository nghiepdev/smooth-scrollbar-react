# SMOOTH-SCROLLBAR-REACT

A wrapper for [smooth-scrollbar](https://github.com/idiotWu/smooth-scrollbar) to React Component.

[![NPM version](https://img.shields.io/npm/v/smooth-scrollbar-react.svg)](https://www.npmjs.com/package/smooth-scrollbar-react)
[![NPM monthly download](https://img.shields.io/npm/dm/smooth-scrollbar-react.svg)](https://www.npmjs.com/package/smooth-scrollbar-react)

## Demo

https://codesandbox.io/s/smooth-scrollbar-react-4pu86

## Installation

```sh
$ yarn add smooth-scrollbar smooth-scrollbar-react
```

## Usage

```js
import {Scrollbar} from 'smooth-scrollbar-react';
```

```jsx
<Scrollbar
  damping={number}
  thumbMinSize={number}
  renderByPixels={boolean}
  alwaysShowTracks={boolean}
  continuousScrolling={boolean}
  wheelEventTarget={element}
  plugins={object}
  onScroll={func}>
  your contents here...
</Scrollbar>
```

### Available Options

|      parameter      |   type    | default | description                                                                                                                                                    |
| :-----------------: | :-------: | :-----: | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|       damping       | `number`  |  `0.1`  | Momentum reduction damping factor, a float value between `(0, 1)`. The lower the value is, the more smooth the scrolling will be (also the more paint frames). |
|    thumbMinSize     | `number`  |  `20`   | Minimal size for scrollbar thumbs.                                                                                                                             |
|   renderByPixels    | `boolean` | `true`  | Render every frame in integer pixel values, set to `true` to improve scrolling performance.                                                                    |
|  alwaysShowTracks   | `boolean` | `false` | Keep scrollbar tracks visible.                                                                                                                                 |
| continuousScrolling | `boolean` | `true`  | Set to `true` to allow outer scrollbars continue scrolling when current scrollbar reaches edge.                                                                |
|       plugins       | `object`  |  `{}`   | Options for plugins, see [Plugin System](https://github.com/idiotWu/smooth-scrollbar/blob/master/docs/plugin.md).                                              |

**Confusing with the option field? Try edit tool [here](http://idiotwu.github.io/smooth-scrollbar/)!**

## Examples

### Original code:

```jsx
function App() {
  return (
    <div className='App'>
      <div className='list-data'>
        {[...Array(20).keys()].map((value, index) => (
          <div key={index}>{value + index}</div>
        ))}
      </div>
    </div>
  );
}
```

### Option 1:

```jsx
import {Scrollbar} from 'smooth-scrollbar-react';

function App() {
  return (
    <div className='App'>
      <Scrollbar
        plugins={{
          overscroll: {
            effect: 'bounce',
          },
        }}>
        <div className='list-data' style={{height: '200px'}}>
          {[...Array(20).keys()].map((value, index) => (
            <div key={index}>{value + index}</div>
          ))}
        </div>
      </Scrollbar>
    </div>
  );
}
```

### Option 2: Recommended(Using `display: flex`)

```jsx
import {Scrollbar} from 'smooth-scrollbar-react';

function App() {
  return (
    <div className='App'>
      <div className='list-data' style={{display: 'flex', maxHeight: '200px'}}>
        <Scrollbar
          plugins={{
            overscroll: {
              effect: 'glow',
            },
          }}>
          {[...Array(20).keys()].map((value, index) => (
            <div key={index}>{value + index}</div>
          ))}
        </Scrollbar>
      </div>
    </div>
  );
}
```

## License

MIT
