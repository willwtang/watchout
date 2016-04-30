window.updateEnemies = function(data) {
  var enemies = d3.select('.board')
    .selectAll('.enemy')
    .data(data, obj => obj.key);

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

window.updateScores = function() {
  var collisionSelect = d3.select('.collisions').select('span');
  var currentCollisions = +collisionSelect.text() + 1;
  collisionSelect.text(currentCollisions);

  var currentScoreSelect = d3.select('.current').select('span');
  var currentScore = +currentScoreSelect.text();

  var highScoreSelect = d3.select('.highScore').select('span');
  var highScore = +highScoreSelect.text();

  if (highScore < currentScore) {
    highScoreSelect.text(currentScore);
  }

  currentScoreSelect.text('0');
};

window.checkCollisions = function() {
  var enemies = d3.selectAll('.enemy');
  var players = d3.select('.player');

  enemies.each(function() {
    var [x, y, r] = [d3.select(this).attr('cx'), d3.select(this).attr('cy'), d3.select(this).attr('r')];
    var [a, b, pr] = [players.attr('cx'), players.attr('cy'), players.attr('r')];

    var combinedR = Math.sqrt( Math.pow(x - a, 2) + Math.pow(y - b, 2));
    if ( combinedR < (r + pr) ) {
      updateScores();
    }
  });
};

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
  for (var i = 0; i < 20; i++) {
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

window.enemyMoveInterval = setInterval(() => {
  randomEnemies();
  updateEnemies(enemyArray);
}, 1000);

window.checkCollisionInterval = setInterval( () => {
  checkCollisions();
}, 1);

window.addScore = setInterval( () => {
  var currentScoreSelect = d3.select('.current').select('span');
  var currentScore = +currentScoreSelect.text() + 10;
  currentScoreSelect.text(currentScore);
}, 10);
