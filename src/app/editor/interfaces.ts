import { ISequenceDeltaRange } from "@fluidframework/sequence";

export interface IProvideRichTextEditor {
	readonly IRichTextEditor: IRichTextEditor;
}

export interface IRichTextEditor extends IProvideRichTextEditor {
	getValue(): string;
	initializeValue(value: string): void;
}

interface SchemaSpec<Nodes extends string = any, Marks extends string = any> {

}

export declare class Schema<Nodes extends string = any, Marks extends string = any>{
    spec: any
    marks: any
    nodes: any
    constructor(spec: SchemaSpec<Nodes, Marks>);
    nodeFromJSON(json: any): Node;
}

export declare class Fragment {
  static fromJSON(schema: Schema, value: any): Fragment;
}
export declare class Slice {    
  constructor( content: Fragment, openStart: number, openEnd: number)
}

export interface IProseMirrorNode {
	[key: string]: any;
	type: string;
	content?: IProseMirrorNode[];
	marks?: any[];
	_open?: boolean;
}

export interface IProseMirrorSlice {
	openStart?: number;
	openEnd?: number;
	content: IProseMirrorNode[];
}


export interface IThing {
	type: "ether" | "delete" | "insert" | "annotate";
	event?: ISequenceDeltaRange;
	length: number;
	// TODO make use of me!
	annotations?: any;
}

export interface IThingGroup {
	items: IThing[];
	position: number;
}

export declare class Plugin<PluginState = any> {
  // state: any

  constructor(spec: PluginSpec<PluginState>)
  
}

export interface PluginSpec<PluginState> {
}

export declare class Mark {
}

export declare class MarkType {
}

export declare class Transaction extends Transform{
  setMeta(key: string | Plugin | any, value: any): this;
}

export declare class Transform{
  step(step: Step): this;
  replaceRange(from: number, to: number, slice: Slice): this;
  removeMark(from: number, to: number, mark?: Mark | MarkType | null): this;
  addMark(from: number, to: number, mark: Mark): this;
}

declare abstract class Step {
}

export declare class ReplaceAroundStep extends Step {
  constructor(from: number, to: number, gapFrom: number, gapTo: number, slice: Slice, insert: number, structure?: boolean)
}

export interface NodeSpec {
}

// export declare class EditorState {
// }

// export declare class EditorView {
// }