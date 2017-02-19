var utils = require('utils');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

var runCreeps = function() {
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        // TODO use exitCode to determine alternative task
        var exitCode;
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            if ( roleBuilder.run(creep) == "no_targets" ) {
                roleUpgrader.run(creep);
            }
        }
    }
}

var autoSpawn = function( TO_PRODUCE ) {
    // Produce creeps if minima are not met
    // TODO how much energy available?
    var body = utils.specifyBody( 'worker', 150 );
    for (var name in Game.spawns) {
        var spawn = Game.spawns[name];
        if ( TO_PRODUCE[0].count > 0 && spawn.canCreateCreep(body) == OK ) {
            spawn.createCreep(
                body,
                null,
                { role: TO_PRODUCE[0].role }
            );
            console.log( name, " spawning: ", TO_PRODUCE[0].role );
        }
    }
}

module.exports = {
    autoSpawn: autoSpawn,
    runCreeps: runCreeps
};
