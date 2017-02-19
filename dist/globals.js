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

    STATS.TO_PRODUCE = _.map(
        STATS.ROLES,
        (x) => ({
            role: x,
            count: STATS.ROLES_MINIMA[x] - STATS.COUNT_CREEPS_BY_ROLES[x]
        })
    );
    // descending order
    STATS.TO_PRODUCE = _.sortBy( STATS.TO_PRODUCE, (x) => -1 * x.count );
}

module.exports = {
    update: update
};
