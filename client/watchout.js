// start slingin' some d3 here.

window.updateEnemies = function(data) {
  var enemies = d3.select('.board').selectAll('.enemy').data(data, obj => obj.key);

  // create new enemies as required
  enemies.enter()
    .append('circle')
    .attr('class', 'enemy')
    .attr('cx', obj => obj.x)
    .attr('cy', obj => obj.y)
    .attr('r', obj => obj.r)
    .attr('stroke-width', '2px')
    .attr('fill', 'white');

  enemies.exit().remove();
  enemies.transition().attr('cy', obj => obj.y).attr('cx', obj => obj.x);
};

window.enemyArray = [];
window.randomEnemies = function() {
  for (var i = 0; i < 40; i++) {
    if (enemyArray[i] === undefined) {
      enemyArray[i] = {};
    }
    var obj = enemyArray[i];
    obj.key = i;
    obj.x = Math.random() * document.documentElement.clientWidth;
    obj.y = Math.random() * 500;
    obj.r = Math.random() * 20;
  }
};
window.interval = setInterval(() => { 
  console.log(enemyArray.length);
  randomEnemies();
  updateEnemies(enemyArray);
}, 1000);

// create 10 enemies



  // call update update enemy position func 1/sec

    // generating new random pos for each enemy object

    // call updateEnemies