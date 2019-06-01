let shizi = {
  "title": "两只小狮子",
    "content": [
      "狮子妈妈生下了两只小狮子。",
      "一只小狮子整天练习滚、扑、撕、咬，非常刻苦。另一只却总是懒洋洋地晒太阳，什么也不干。",
      "一棵小树问懒狮子：“你怎么不学点本领啊？”",
      "懒狮子抬起头来，慢吞吞地说：“我才不去吃那苦头呢！”",
      "小树说：“那你以后怎样生活呢？”",
      "懒狮子说：“我爸爸和妈妈是百兽之王，凭着他们的地位，我会生活得很好！”",
      "这话被狮子妈妈听到了，她对懒狮子说：“孩子，将来我们老了，不在了，你靠谁呢？你也应该学会生活的本领，做一只真正的狮子！”"
    ]
}


let jingyesi = {
  "title":"静夜思",
  "author":"李白《唐》",
  "type":"gushici",
  "content":[
    "床前明月光，",
    "疑是地上霜。",
    "举头望明月，",
    "低头思故乡。"
  ]
}

let rumengling = {
  "title": "如梦令",
  "author": "李清照《宋》",
  "type": "gushici",
  "content": [
    "昨夜雨疏风骤，",
    "浓睡不消残酒，",
    "试问卷帘人，",
    "却道海棠依旧。",
    "知否，",
    "知否，",
    "应是绿肥红瘦。",
  ]
}

let pigeon = {
  "title":"The Thirsty Pigeon",
  "content":[
    "A PIGEON, oppressed by excessive thirst, saw a goblet of water painted on a signboard.  Not supposing it to be only a picture, she flew towards it with a loud whir and unwittingly dashed against the signboard, jarring herself terribly.  Having broken her wings by the blow, she fell to the ground, and was caught by one of the bystanders.  "
  ]
}

let fileList = [
  {
    "type": "儿童故事",
    "files": [
      { "name": "shizi", "label": "两只小狮子" }
    ]
  },
  {
    "type": "古代诗词",
    "files": [
      { "name": "jingyesi", "label": "静夜思" },
      { "name": "rumengling", "label": "如梦令" }
    ]
  },
  {
    "type": "英文阅读",
    "files": [
      { "name": "pigeon", "label": "The Thirsty Pigeon" }
    ]
  }
]

module.exports = {
  selectFile:null,
  fileList,

  shizi,
  jingyesi,
  rumengling,
  pigeon
}