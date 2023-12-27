// import { marks, schema as baseSchema } from 'ngx-editor/schema';
import { schema as basicSchema } from "prosemirror-schema-basic";
import { Schema } from 'prosemirror-model';
import { addMentionNodes, addTagNodes } from '../../../utils/prosemirror-mentions';

const schema1 = new Schema({
  // nodes: addTagNodes(addMentionNodes(baseSchema.spec.nodes)),
  nodes: addTagNodes(addMentionNodes(basicSchema.spec.nodes)),
  marks: basicSchema.spec.marks
});

export default schema1;
