const HOME=Game.spawns['Spawn1'];
const ROOM=Game.rooms['W14N11'];
const CREEP_TOTAL=13;
const CREEP_NAME='Worker';


module.exports.loop = function () {

    born();

    for(let k in Game.creeps){
        if(k==='Worker0'||k==='Worker1'){
            work(Game.creeps[k],HOME,0)
        }else if(k==='Worker2'||k==='Worker3'||k==='Worker4'||k==='Worker5'){
           build(Game.creeps[k]);
        }else if(k==='Worker12'){
            repair(Game.creeps[k])
        }else{
            upgradeRCL(Game.creeps[k])
        }

    }

}

/*
* 爆兵
* */
const born=()=>{
    for(let i=0;i<CREEP_TOTAL;i++){
        if(!findCreeps(CREEP_NAME+i)){
            let err_code;
            err_code=HOME.spawnCreep([WORK, CARRY, MOVE], CREEP_NAME+i);
            return;
        }
    }
}

/*
* 工作（采集，home溢出时升级RCL）
* */
const work=(c,t,s)=>{
    if(c.carry.energy < c.carryCapacity) {
        let source=nearGold(c);
        if(c.harvest(source) === ERR_NOT_IN_RANGE) {
            c.moveTo(source);
        }
    }
    else {
        if(t.energy===t.energyCapacity){
            upgradeRCL(c);
            return;
        }
        if( c.transfer(t, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE ) {
            c.moveTo(t);
        }
    }
}

/*
* 建造
* */
const build=(c)=>{
    for(let k in Game.constructionSites){
       let target= Game.constructionSites[k];
        let source=nearGold(c);
        if(c.carry.energy===0){

            if(c.harvest(source) === ERR_NOT_IN_RANGE) {
                c.moveTo(source);
            }
        }else if(c.carry.energy === c.carryCapacity){
            if( c.build(target) === ERR_NOT_IN_RANGE ) {
                c.moveTo(target);
            }
        }else if(calcPath(target,c)>calcPath(source,c)){//离矿更近

            let sources = c.room.find(FIND_SOURCES);
            if(c.harvest(source) === ERR_NOT_IN_RANGE) {
                c.moveTo(source);
            }
        }else{
            if( c.build(target) === ERR_NOT_IN_RANGE ) {
                c.moveTo(target);
            }
        }

        return;
    }
}

/*
* 升级RCL
* */
const upgradeRCL=(c)=>{
    let source=nearGold(c);

    if(c.carry.energy===0){
        if(c.harvest(source) === ERR_NOT_IN_RANGE) {
            c.moveTo(source);
        }
    }else if(c.carry.energy === c.carryCapacity){
        if( c.upgradeController(ROOM.controller) === ERR_NOT_IN_RANGE ) {
            c.moveTo(ROOM.controller);
        }
    }else if(calcPath(ROOM.controller,c)>calcPath(source,c)){//离矿更近
        if(c.harvest(source) === ERR_NOT_IN_RANGE) {
            c.moveTo(source);
        }
    }else{
        if( c.upgradeController(ROOM.controller) === ERR_NOT_IN_RANGE ) {
            c.moveTo(ROOM.controller);
        }
    }

}

/*维修*/
const repair=(c)=>{
    for(let k in Game.structures){
        let target= Game.structures[k];
        let source=nearGold(c);
        if(c.carry.energy===0){

            if(c.harvest(source) === ERR_NOT_IN_RANGE) {
                c.moveTo(source);
            }
        }else if(c.carry.energy === c.carryCapacity){
            if( c.repair(target) === ERR_NOT_IN_RANGE ) {
                c.moveTo(target);
            }
        }else if(calcPath(target,c)>calcPath(source,c)){//离矿更近

            let sources = c.room.find(FIND_SOURCES);
            if(c.harvest(source) === ERR_NOT_IN_RANGE) {
                c.moveTo(source);
            }
        }else{
            if( c.repair(target) === ERR_NOT_IN_RANGE ) {
                c.moveTo(target);
            }
        }

        return;
    }
}

/*
* 计算最近的金矿
* */
const nearGold=(c)=>{
    let sources = ROOM.find(FIND_SOURCES);
    if(calcPath(sources[0],c)<calcPath(sources[1],c)){
        return sources[0]
    }else{
        return sources[1]
    }

}

/*
* 距离量算
* */
const calcPath=(t,c)=>{
    return PathFinder.search(t.pos,c).cost
}

const findCreeps=(name)=>{
    return Game.creeps[name]
}

//=========================================

// 修路
// Game.rooms['W14N11'].createConstructionSite(12,16,STRUCTURE_ROAD);