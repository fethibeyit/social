export enum LikeType {
  ThumbsUp = "ThumbsUp",
  Love = "Love",
  Smile = "Smile",
  Laughing = "Laughing",
  Surprised = "Surprised",
  Sad = "Sad",
  Angry = "Angry"
}

export const smileys = {
  ThumbsUp : {file: "thumbs-up.gif", alt : "👍", name: "Like", type:LikeType.ThumbsUp},
  Love : {file: "red-heart.gif", alt : "❤", name: "Love", type:LikeType.Love},
  Smile : {file: "smile.gif", alt : "😀", name: "Smile", type:LikeType.Smile},
  Laughing : {file: "laughing.gif", alt : "😆", name: "Haha", type:LikeType.Laughing},
  Surprised : {file: "surprised.gif", alt : "😯", name: "Wow", type:LikeType.Surprised},
  Sad : {file: "cry.gif", alt : "😢", name: "Sad", type:LikeType.Sad},
  Angry : {file: "rage.gif", alt : "😡", name: "Angry", type:LikeType.Angry}
}
