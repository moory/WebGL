const HOME=Game.spawns['Spawn1'];
const ROOM=Game.rooms['W14N11'];
const CREEP_TOTAL=10;
const CREEP_NAME='Worker';


module.exports.loop = function () {

    born();

    for(let k in Game.creeps){
        if(k==='Worker3'||k==='Worker4'||k==='Worker5'||k==='Worker6'||k==='Worker7'||k==='Worker8'||k==='Worker9'||k==='Worker10'){
            upgradeRCL(Game.creeps[k])
        }else{
            work(Game.creeps[k],HOME,0)
        }

    }

}

const born=()=>{
    for(let i=0;i<CREEP_TOTAL;i++){
        if(!findCreeps(CREEP_NAME+i)){
            let err_code;
            err_code=HOME.spawnCreep([WORK, CARRY, MOVE], CREEP_NAME+i);
            return;
        }
    }
}

const work=(c,t,s)=>{
    if(c.carry.energy < c.carryCapacity) {
        let sources = c.room.find(FIND_SOURCES);
        if(c.harvest(sources[s]) === ERR_NOT_IN_RANGE) {
            c.moveTo(sources[s]);
        }
    }
    else {
        if( c.transfer(t, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE ) {
            c.moveTo(t);
        }
    }
}

const build=(c)=>{
    if(c.carry.energy < c.carryCapacity) {
        if(c.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
            c.moveTo(sources[0]);
        }
    }
    else {
        if( c.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE ) {
            c.moveTo(Game.spawns['Spawn1']);
        }
    }
}

const upgradeRCL=(c)=>{
    if(c.carry.energy===0){
        let sources = c.room.find(FIND_SOURCES);
        if(c.harvest(sources[1]) === ERR_NOT_IN_RANGE) {
            c.moveTo(sources[1]);
        }
    }else if(c.carry.energy === c.carryCapacity){
        if( c.upgradeController(ROOM.controller) === ERR_NOT_IN_RANGE ) {
            c.moveTo(ROOM.controller);
        }
    }else if(calcPath(42,8,c)>calcPath(44,19,c)){//离矿更近

        let sources = c.room.find(FIND_SOURCES);
        if(c.harvest(sources[1]) === ERR_NOT_IN_RANGE) {
            c.moveTo(sources[1]);
        }
    }else{


        if( c.upgradeController(ROOM.controller) === ERR_NOT_IN_RANGE ) {
            c.moveTo(ROOM.controller);
        }
    }

}

const calcPath=(x,y,c)=>{

    return PathFinder.search(Game.rooms['W14N11'].getPositionAt(x,y),c).cost
}

const findCreeps=(name)=>{
    return Game.creeps[name]
}

//=========================================

// 修路
// Game.rooms['W14N11'].createConstructionSite(43,11,STRUCTURE_ROAD);