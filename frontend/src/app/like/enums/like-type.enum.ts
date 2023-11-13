export enum LikeType {
  THUMBS_UP = "THUMBS_UP",
  LOVE = "LOVE",
  SMILE = "SMILE",
  LAUGHING = "LAUGHING",
  SURPRISED = "SURPRISED",
  SAD = "SAD",
  ANGRY = "ANGRY"
}

export const smileys = {
  THUMBS_UP : {file: "thumbs-up.gif", alt : "👍", name: "Like", type:LikeType.THUMBS_UP},
  LOVE : {file: "red-heart.gif", alt : "❤", name: "Love", type:LikeType.LOVE},
  SMILE : {file: "smile.gif", alt : "😀", name: "Smile", type:LikeType.SMILE},
  LAUGHING : {file: "laughing.gif", alt : "😆", name: "Haha", type:LikeType.LAUGHING},
  SURPRISED : {file: "surprised.gif", alt : "😯", name: "Wow", type:LikeType.SURPRISED},
  SAD : {file: "cry.gif", alt : "😢", name: "Sad", type:LikeType.SAD},
  ANGRY : {file: "rage.gif", alt : "😡", name: "Angry", type:LikeType.ANGRY}
}
