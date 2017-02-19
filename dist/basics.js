var harvest = function(creep) {
    var sources = creep.room.find(FIND_SOURCES);
    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
    }
}

var deliver = function(creep) {
    var targets = creep.room.find(
        FIND_STRUCTURES,
        {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER) &&
                    structure.energy < structure.energyCapacity;
            }
        }
    );
    if(targets.length > 0) {
        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(
                targets[0],
                {visualizePathStyle: {stroke: '#ffffff'}}
            );
        }
    }
};

var build = function(creep) {
    var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    if(targets.length) {
        if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
    else {
        return "no_targets";
    }
}

var upgrade = function(creep) {
    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(
            creep.room.controller,
            {visualizePathStyle: {stroke: '#ffffff'}}
        );
    }
}

module.exports = {
    deliver: deliver,
    build: build,
    harvest: harvest,
    upgrade: upgrade
}
