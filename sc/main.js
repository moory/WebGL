
Game.rooms['W14N11'].createConstructionSite(4,12,STRUCTURE_ROAD)

//--------------------------------
const HOME=Game.spawns['Spawn1'];
const ROOM=Game.rooms['W14N11'];
const CREEP_TOTAL=8;
const CREEP_NAME='Worker';

module.exports.loop = function () {
    born();

    for(let k in Game.creeps){
        if(k==='Worker5'||k==='Worker0'){
            upgradeRCL(Game.creeps[k])

        }else{
            work(Game.creeps[k],HOME,0)
            // work(Game.creeps[k],ROOM.controller,1)
        }

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

const work=(c,t,s)=>{
    if(c.carry.energy < c.carryCapacity) {
        var sources = c.room.find(FIND_SOURCES);
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
    if( c.upgradeController(ROOM.controller) === ERR_NOT_IN_RANGE ) {
        c.moveTo(ROOM.controller);
    }
}

const findCreeps=(name)=>{
    return Game.creeps[name]
}

