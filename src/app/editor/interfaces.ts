import { SharedMap, SharedString } from 'fluid-framework';

// export interface ISchema {
//   initialObjects: {
//     map1: SharedMap,
//     text1: SharedString,
//   },
//   dynamicObjectTypes: [
//   ],
// }

// export class ISchemas implements ISchema{
//   initialObjects!: {
//     map1: SharedMap,
//     text1: SharedString,
//   }
//   dynamicObjectTypes!: [
//   ]
//   constructor(){}
// }

export const Schema = {
  initialObjects: {
    map1: SharedMap,
    description: SharedString,
  },
  dynamicObjectTypes: [
  ]
}