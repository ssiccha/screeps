var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var basics = require('basics');

var ROLES_MINIMA = { harvester: 3, builder: 3, upgrader: 1 };

var ROLES = Object.keys(ROLES_MINIMA);
var CREEPS_BY_ROLES = {};
for (var i in ROLES) {
    var role = ROLES[i];
    CREEPS_BY_ROLES[role] = _.filter(
        Game.creeps,
        (creep) => creep.memory.role == role
    );
}

var COUNT_CREEPS_BY_ROLES = {};
for (var i in ROLES) {
    var role = ROLES[i];
    COUNT_CREEPS_BY_ROLES[role] =
        ( CREEPS_BY_ROLES[role] == undefined ? 0 : CREEPS_BY_ROLES[role].length )
}

var TO_PRODUCE = _.map(
    ROLES,
    (x) => ({
        role: x,
        count: ROLES_MINIMA[x] - COUNT_CREEPS_BY_ROLES[x]
    })
);
TO_PRODUCE = _.sortBy( TO_PRODUCE, (x) => -1 * x.count ); // descending order

// return specific type of body
var specifyBody = function( type, energy ) {
    if ( type == 'worker' ) {
        if ( energy < 400 ) {
            return [ WORK, CARRY, MOVE ];
        }
        else if ( energy = 400 ){
            return [ WORK, WORK, CARRY, CARRY, MOVE, MOVE ];
        }
    }
    return [];
}

module.exports.loop = function () {
    // Produce creeps if minima are not met //
    Game.spawns['MainSpawn'].createCreep(
        specifyBody( 'worker', 150 ),
        null,
        { role: TO_PRODUCE[0].role }
    );
    if ( Game.spawns['MainSpawn'].spawning != null ) {
        console.log( "Spawning: ", TO_PRODUCE[0].role );
    }

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
    for (var name in Game.creeps) {
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
