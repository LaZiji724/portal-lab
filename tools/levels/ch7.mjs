// 第 7 章：星海万象。把前面所有机制揉在一起：弱引力的小行星群、引力电梯、各有各的“下方”的房间、首尾相连的世界，最后是通向四个小世界的星门广场。
// 为了好维护，每组关卡放在 ch7/ 下面的一个文件里，这里按关卡顺序汇总。
import galaxyRing from './ch7/galaxy-ring.mjs'; // [33 银河漫步, 36 环形世界]
import liftCorners from './ch7/lift-corners.mjs'; // [34 引力电梯, 35 三个直角]
import finale from './ch7/finale.mjs'; // [37 万象]

const levels = [galaxyRing[0], liftCorners[0], liftCorners[1], galaxyRing[1], finale[0]];
export default levels;
