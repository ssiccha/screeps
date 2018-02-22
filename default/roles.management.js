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

var spawnWorker = function(spawn, role, energy = undefined) {
    if(energy == undefined) {
        energy = spawn.room.energyCapacityAvailable;
    }
    var body = utils.specifyBody( 'worker', energy );
    if (role != null && spawn.spawnCreep(body, role + Game.time, {dryRun: true}) == 0) {
        res = spawn.spawnCreep(
            body,
            role + Game.time,
            { memory: { role: role } }
        );
        console.log(res, spawn.name, "spawning:", role, "with", body.length, "body parts");
        return;
    }
}

module.exports = {
    spawnWorker: spawnWorker,
    runCreeps: runCreeps
};
