
interface GameConfigType {
  // 槽容量
  slotNum: number;
  // 需要多少个一样块的才能合成
  composeNum: number;
  // 动物类别数
  typeNum: number;
  // 每层块数（大致）
  levelBlockNum: number;
  // 边界收缩步长
  borderStep: number;
  // 总层数（最小为 2）
  levelNum: number;
  // 随机区块数（数组长度代表随机区数量，值表示每个随机区生产多少块）
  randomBlocks: number[];
  // 动物数组
  animals?: string[];
  // 最上层块数（已废弃）
  // topBlockNum: 40,
  // 最下层块数最小值（已废弃）
  // minBottomBlockNum: 20,
}
interface MyInfo {
  name: string;
  age: number;
  arr: Array<number>;
  setTime: Function;
}
interface Game2 {
  blocks:GameConfigType[]
}
interface componentListType {
  type: String;
  name: String;
  icon: String;
  InputType?: String;
  componentContent?: Object;
}
interface componetDataType {
  title: String;
  componentList: componentListType[];
}