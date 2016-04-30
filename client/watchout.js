// start slingin' some d3 here.

window.updateEnemies = function(data) {
  var enemies = d3.select('.board')
    .selectAll('.enemy')
    .data(data, obj => obj.key);

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
  enemies.transition()
    .attr('cy', obj => obj.y)
    .attr('cx', obj => obj.x);
};

window.drag = d3.behavior.drag().on('drag', function() { 
  d3.select(this).attr('cx', d3.event.x).attr('cy', d3.event.y); 
});

window.player = function(data) {
  var playerSelect = d3.select('.board')
    .selectAll('.player')
    .data(data, obj => obj.key);

  playerSelect.enter()
    .append('circle')
    .attr('class', 'player')
    .attr('cx', obj => obj.x)
    .attr('cy', obj => obj.y)
    .attr('r', obj => obj.r)
    .attr('stroke-width', '2px')
    .attr('fill', obj => obj.color)
    .call(drag);

  playerSelect.exit().remove();

};

player([{ 
  key: 0, 
  x: 0.5 * document.documentElement.clientWidth,
  y: 250,
  r: 25,
  color: 'orange'
}]);

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
  randomEnemies();
  updateEnemies(enemyArray);
}, 1000);
