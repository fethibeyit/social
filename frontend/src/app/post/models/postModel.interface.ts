export interface PostModel {
  id : string;
  title : string;
  content : string;
  publicationDate? : Date,
  views : number[],
  likes : number[],
  shares : number[]
}
