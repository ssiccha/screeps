var basics = require('basics');
var globals = require('globals');
var towers = require('towers');
var roles = require('roles.management');

var STATS = {
    ROLES_MINIMA: { harvester: 3, builder: 3, upgrader: 1 },
    ROLES: [ 'harvester', 'builder', 'upgrader' ],
    CREEPS_BY_ROLES: {},
    COUNT_CREEPS_BY_ROLES: {},
    TO_PRODUCE: []
};

module.exports.loop = function () {
    // console.log("--- NEW TICK ---");

    // Update globals
    // TODO: Collect stats room-wise
    globals.update( STATS );

    //      TOWERS
    towers.run();

    // Produce creeps if minima are not met
    roles.autoSpawn( STATS.TO_PRODUCE );

    // Perform roles
    roles.runCreeps();
}
