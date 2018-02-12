var update = function( STATS ) {
    // Cleanup //
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    // Update STATS //
    for (var i in STATS.ROLES) {
        var role = STATS.ROLES[i];
        STATS.CREEPS_BY_ROLES[role] = _.filter(
            Game.creeps,
            (creep) => creep.memory.role == role
        );
        STATS.COUNT_CREEPS_BY_ROLES[role] = (
            STATS.CREEPS_BY_ROLES[role] == undefined
            ? 0
            : STATS.CREEPS_BY_ROLES[role].length
        );
    }

    // Determine which role to produce next
    var PRODUCE_COUNTS = STATS.PRODUCE_COUNTS;
    PRODUCE_COUNTS = _.map(
        STATS.ROLES,
        (x) => ({
            role: x,
            count: STATS.ROLES_MINIMA[x] - STATS.COUNT_CREEPS_BY_ROLES[x]
        })
    );
    // Produce the "most needed" first, sort in descending order
    PRODUCE_COUNTS = _.sortBy(PRODUCE_COUNTS, (x) => -1 * x.count);
    if(PRODUCE_COUNTS[0].count > 0) {
        STATS.PRODUCE = PRODUCE_COUNTS[0].role;
    }
    else {
        STATS.PRODUCE = null;
    }
}

module.exports = {
    update: update
};
