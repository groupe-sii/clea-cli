# Types primitifs

| Types primitifs                       |           |
|---------------------------------------|-----------|
| N'importe quel type                   | any       |
| Type void                             | void      |
| String (inclus le multi lignes ES6)   | string    |
| Nombre                                | number    |
| Boolean                               | boolean   |

# Types nommés

## Interface

```ts
interface Child extends Parent, SomeClass {
  property:Type;
  optionalProp?:Type;
  optionalMethod?(arg1:Type):ReturnType;
}
```

## Class

```ts
class Child extends Parent implements Child, OtherChild {
  property:Type;
  defaultProperty:Type = 'default value';
  private _privateProperty:Type;
  static staticProperty:Type;
  constructor(arg1:Type) {
    super(arg1);
  }
  private _privateMethod():Type {}
  methodProperty:(arg1:Type) => ReturnType;
  overloadedMethod(arg1:Type):ReturnType;
  overloadedMethod(arg1:OtherType):ReturnType;
  overloadedMethod(arg1:CommonT):CommonReturnT {}
  static staticMethod():ReturnType {}
  subclassedMethod(arg1:Type):ReturnType {
    super.subclassedMethod(arg1);
  }
}
```

## Enum

```ts
enum Options {
  FIRST,
  EXPLICIT = 1,
  BOOLEAN = Options.FIRST | Options.EXPLICIT
}
```

## Type d'objets

### Type `any` implicite

```ts
{ foo; bar; }
```

### Propriété optionnelle

```ts
{ required:Type; optional?:Type; }
```

### Hash map

```ts
{ [key:string]:Type; }
```

### Type unis

```ts
let myUnionVariable: number | string;
```

### Tableaux et tuples

#### Tableau de strings

```ts
string[] ou Array<string>
```

#### Tableau de functions qui retournes des string

```ts
{ ():string; }[] ou Array<() => string>
```

#### Tuples

```ts
let myTuple: [string, number];
myTuple = ['test', 42];
```

### Fonctions

#### Fonction

```ts
function fn(arg1:Type, arg2:Type):ReturnType {}
```

#### Paramètre optionnel

```ts
function fn(arg1:Type, arg2:Type = 'default'):ReturnType {}
```

#### Fonction fléché

```ts
(arg1:Type):ReturnType => {} ou
(arg1:Type):ReturnType => Expression
```

### Type générique

#### Dans les fonctions

```ts
function maFonction<T>(items:T[], callback:(item:T) => T):T[] {}
```

#### Dans une interface

```ts
interface Pair<T1, T2> {
  first:T1;
  second:T2;
}
```

#### Hérité

```ts
<T extends ConstrainedType>():T
```
