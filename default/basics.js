var harvest = function(creep) {
    var closestTarget = creep.pos.findClosestByPath(FIND_SOURCES);
    if(closestTarget != null && creep.harvest(closestTarget) == ERR_NOT_IN_RANGE) {
        creep.moveTo(
            closestTarget,
            {visualizePathStyle: {stroke: '#ffaa00'}}
        );
    }
}

var deliver = function(creep) {
    var closestTarget = creep.pos.findClosestByPath(
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
    if(closestTarget != null && creep.transfer(closestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(
            closestTarget,
            {visualizePathStyle: {stroke: '#ffffff'}}
        );
    }
};

var build = function(creep) {
    var closestTarget = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
    if(closestTarget == null) {
        return "no_targets";
    }
    if(creep.build(closestTarget) == ERR_NOT_IN_RANGE) {
        creep.moveTo(
            closestTarget,
            {visualizePathStyle: {stroke: '#ffffff'}}
        );
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
