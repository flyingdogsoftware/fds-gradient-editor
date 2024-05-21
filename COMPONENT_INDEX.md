# Component Index

## Components

- [`default`](#default)

---

## `default`

### Props

| Prop name | Kind                  | Reactive | Type                   | Default value                                                                                                                                                            | Description                     |
| :-------- | :-------------------- | :------- | :--------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------- |
| icon      | <code>let</code>      | No       | <code>string</code>    | <code>""</code>                                                                                                                                                          | example parameter               |
| getInfo   | <code>function</code> | No       | <code>() => any</code> | <code>() => { if (type==="version"){ return new Promise(resolve => { resolve(componentversion); }); } let res = await fdsHelper.getInfo(type,name); return res; }</code> | Get information about component |
| version   | <code>const</code>    | No       | <code>string</code>    | --                                                                                                                                                                       | version of component            |

### Slots

None.

### Events

None.
