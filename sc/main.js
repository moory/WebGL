
Game.rooms['W14N11'].createConstructionSite(4,12,STRUCTURE_ROAD)

//--------------------------------
const HOME=Game.spawns['Spawn1'];
const ROOM=Game.rooms['W14N11'];
const CREEP_TOTAL=7;
const CREEP_NAME='Worker';

module.exports.loop = function () {
    born();

    for(let k in Game.creeps){
        work(Game.creeps[k],ROOM.controller)
    }

}

const born=()=>{
    for(let i=0;i<CREEP_TOTAL;i++){
        if(!findCreeps(CREEP_NAME+i)){
            let err_code;
            // if(i===0){
            //      err_code=HOME.spawnCreep([BUILD, CARRY, MOVE], CREEP_NAME+i);
            // }else{
            err_code=HOME.spawnCreep([WORK, CARRY, MOVE], CREEP_NAME+i);
            // }
        }
    }
}

const work=(c,t)=>{
    if(c.carry.energy < c.carryCapacity) {
        var sources = c.room.find(FIND_SOURCES);
        if(c.harvest(sources[1]) === ERR_NOT_IN_RANGE) {
            c.moveTo(sources[1]);
        }
    }
    else {
        if( c.transfer(ROOM.controller, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE ) {
            c.moveTo(ROOM.controller);
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

const findCreeps=(name)=>{
    return Game.creeps[name]
}

