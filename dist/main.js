var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var basics = require('basics');

var ROLE_MINIMA = { harvester: 3, builder: 3, upgrader: 1 }
var ROLES = ROLE_MINIMA.keys;

module.exports.loop = function () {

    //      TOWERS      //
    var tower = Game.getObjectById('cd43a2e1548c5df5004b6d5e');
    if(tower) {
        var closestDamagedStructure
            = tower.pos.findClosestByRange( FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    //      ROLES       //
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        // TODO perform upgrader if exit code not successfull
        var exitCode;
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}
