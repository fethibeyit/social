import { schema as basicSchema } from "prosemirror-schema-basic";
import { Schema } from 'prosemirror-model';
import { addMentionNodes, addTagNodes } from '../prosemirror-mentions';

const schema1 = new Schema({
  nodes: addTagNodes(addMentionNodes(basicSchema.spec.nodes)),
  marks: basicSchema.spec.marks
});

export default schema1;
