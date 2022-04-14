# Paramser

Collection of small methods to help you to manipulate the URL search params. This package uses [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams) browser API under the hood (no dependencies!). Package's API is simple, yet very powerful. Check out the documentation below on how to use it.

## Why bother?

- simple API
- small methods responsible for single functionality
- uses browser API URLSearchParams

## Requirements

- Node >= 10.x.x (if you need it for SSR)

## Installation

Just install the package and import a hook that you want to use.

```shell
npm i paramser
```

or

```shell
yarn add paramser
```

```javascript
import { appendParam } from 'paramser';
import { excludeParam } from 'paramser';
import { getAllParams } from 'paramser';
import { getParam } from 'paramser';
import { hasParam } from 'paramser';
import { pickParam } from 'paramser';
import { stringifyParams } from 'paramser';
```

## Usage

### `getParams`

Returns the values for a specific search param.

```javascript
// With single param in the search
getParam('?topic=api', 'topic'); // Returns 'api'

// With multiple params in the search
getParam('?topic=api&topic=not-an-api', 'topic'); // Returns ['api', 'not-an-api']

// Parse params to numbers when possible
getParam('?topic=api&amount=121', 'amount', { parseNumbers: true }); // Returns 121

// Parse params to booleans when possible
getParam('?topic=api&isValid=true', 'isValid', { parseBooleans: true }); // Returns true
```

| Name                  | Type      | Description                       | Required |
| --------------------- | --------- | --------------------------------- | -------- |
| search                | `string`  | Search params from the URL        | `true`   |
| paramKey              | `string`  | Name of the param to get          | `true`   |
| options.parseNumbers  | `boolean` | Parse to number type if possible  | `false`  |
| options.parseBooleans | `boolean` | Parse to boolean type if possible | `false`  |

### `getAllParams`

Returns all params. It can either be an object with key/value pairs or array with just keys or values.

```javascript
// Get object with key/value pairs
getAllParams('?topic=api&technology=nodejs&level=junior');
// Returns {
//  topic: 'api',
//  technology: 'nodejs',
//  level: 'junior'
// }

// Parse params to numbers and booleans when possible
getAllParams('?topic=api&technology=nodejs&amount=121&isValid=true', {
  parseNumbers: true,
  parseBooleans: true,
});
// Returns {
//  topic: 'api',
//  technology: 'nodejs',
//  amount: 121,
//  isValid: true
// }

// Get just an array of keys
getAllParams('?topic=api&technology=nodejs&level=junior', {
  keysOnly: true,
}); // Returns ['topic', 'technology', 'level']

// Get just an array of keys
getAllParams('?topic=api&technology=nodejs&level=junior', {
  valuesOnly: true,
}); // Returns ['api', 'nodejs', 'junior']

// Parse params to numbers and booleans when possible
getAllParams('?topic=api&technology=nodejs&amount=121&isValid=true', {
  valuesOnly: true,
  parseNumbers: true,
  parseBooleans: true,
}); // Returns ['api', 'nodejs', 121, true]
```

| Name                  | Type      | Description                                     | Required |
| --------------------- | --------- | ----------------------------------------------- | -------- |
| search                | `string`  | Search params from the URL                      | `true`   |
| options.keysOnly      | `boolean` | If set to true, returns only an array of keys   | `false`  |
| options.valuesOnly    | `boolean` | If set to true, returns only an array of values | `false`  |
| options.parseNumbers  | `boolean` | Parse to number type if possible                | `false`  |
| options.parseBooleans | `boolean` | Parse to booleans type if possible              | `false`  |

### `appendParam`

Appends additional search params. Returns updated params string.

```javascript
// Appends two params
appendParam('?topic=api', {
  technology: 'nodejs',
  level: 'junior',
});
// Returns `topic=api&technology=nodejs&level=junior`
appendParam(
  '?topic=api',
  { technology: ['javascript', 'nodejs', 'react'] },
  { arrayType: 'separator', separator: '|' }
);
// Returns `topic=api&technology=api|nodejs|react`

appendParam(
  '?topic=api',
  { technology: ['javascript', 'nodejs', 'react'] },
  { arrayType: 'separator', separator: ',' }
);
// Returns `topic=api&technology=api,nodejs,react`

appendParam(
  '?topic=api',
  { technology: ['javascript', 'nodejs', 'react'] },
  { arrayType: 'bracket' }
);
// Returns `topic=api&technology[]=api&technology[]=nodejs&technology[]=react`

appendParam(
  '?topic=api',
  { technology: ['javascript', 'nodejs', 'react'] },
  { arrayType: 'indexedBracket' }
);
// Returns `topic=api&technology[0]=api&technology[1]=nodejs&technology[2]=react`
```

| Name   | Type     | Description                                         | Required |
| ------ | -------- | --------------------------------------------------- | -------- |
| search | `string` | Search params from the URL                          | `true`   |
| params | `object` | Key/value pairs of params that needs to be appended | `true`   |

### `excludeParam`

Removes search params from the url. Returns updated params string.

```javascript
// Removes single param
excludeParam('?topic=api&technology=nodejs', 'technology');
// Returns `topic=api`

// Removes multiple params
excludeParam('?topic=api&technology=nodejs&level=junior', [
  'topic',
  'technology',
]);
// Returns `level=junior`
```

| Name   | Type                      | Description                            | Required |
| ------ | ------------------------- | -------------------------------------- | -------- |
| search | `string`                  | Search params from the URL             | `true`   |
| params | `string or array<string>` | Param or array of params to be removed | `true`   |

### `hasParam`

Checks if param exists.

```javascript
hasParam('?topic=api&technology=nodejs&level=junior', 'topic');
// Returns true

hasParam('?topic=api&level=junior', 'technology');
// Returns false
```

| Name   | Type     | Description                           | Required |
| ------ | -------- | ------------------------------------- | -------- |
| search | `string` | Search params from the URL            | `true`   |
| params | `string` | Param that existence is to be checked | `true`   |

### `pickParam`

Picks which param(s) needs to remain and removes other ones.

```javascript
// Picks only topic param
pickParam('?topic=api&technology=nodejs&level=junior', 'topic');
// Returns `topic=api`

// Picks two params param
pickParam('?topic=api&technology=nodejs&level=junior', ['topic', 'level']);
// Returns `topic=api&level=junior`
```

| Name   | Type                      | Description                        | Required |
| ------ | ------------------------- | ---------------------------------- | -------- |
| search | `string`                  | Search params from the URL         | `true`   |
| params | `string or array<string>` | Param or array of params to remain | `true`   |

### `stringifyParams`

Creates a search param string, based on provided object.

```javascript
stringifyParams({ topic: 'api', technology: 'nodejs' });
// Returns `topic=api&technology=nodejs`
```

An array can also be passed as a value of the param. There are few options to do that.

```javascript
stringifyParams(
  { topic: ['api', 'nodejs', 'react'] },
  { arrayType: 'separator', separator: '|' }
);
// Returns `topic=api|nodejs|react`

stringifyParams(
  { topic: ['api', 'nodejs', 'react'] },
  { arrayType: 'separator', separator: ',' }
);
// Returns `topic=api,nodejs,react`

stringifyParams(
  { topic: ['api', 'nodejs', 'react'] },
  { arrayType: 'bracket' }
);
// Returns `topic[]=api&topic[]=nodejs&topic[]=react`

stringifyParams(
  { topic: ['api', 'nodejs', 'react'] },
  { arrayType: 'indexedBracket' }
);
// Returns `topic[0]=api&topic[1]=nodejs&topic[2]=react`
```

| Name              | Type                                           | Description                                                                                                      | Required |
| ----------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | -------- |
| params            | `object<string, string or array>`              | Object with params to stringify                                                                                  | `true`   |
| options.arrayType | `'separator' or 'bracket' or 'indexedBracket'` | Defines how array should be parsed                                                                               | `false`  |
| options.separator | `string`                                       | Defines what kind of separator will be used in array. Use with care as not all characters will work with the URL | `false`  |

## Tips

- to get the params from your url, you can use:
  - in most cases -> `window.location.search`
  - with React Router -> `this.props.location.search` or `props.location.search`
  - with Reach Router -> `import { useLocation } from "@reach/router"` and then `const { search } = useLocation()`
- notice that methods that return the search string, will return it without the question mark i.e. `topic=api&technology=nodejs`, it's because assigning new string to `location.search` will add it automatically `location.search = topic=api&technology=nodejs -> ?topic=api&technology=nodejs`

## Browser support

- all major desktop and mobile browsers apart from Internet Explorer (there's no plan for supporting it)

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Maciek Grzybek - [@maciek_g88](https://twitter.com/maciek_g88) - maciekgrzybek1@gmail.com - [www.maciekgrzybek.dev](https://www.maciekgrzybek.dev)
