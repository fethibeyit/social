import { schema as basicSchema } from "./customSchema";
import { Schema } from 'prosemirror-model';
import { addMentionNodes, addTagNodes } from '../prosemirror-mentions';


const schema1 = new Schema({
  nodes: addTagNodes(addMentionNodes(basicSchema.spec.nodes))
});

export default schema1;
