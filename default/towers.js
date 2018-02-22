var run = function() {
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
}

module.exports = {
    run: run
}
