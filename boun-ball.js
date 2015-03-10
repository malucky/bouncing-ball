//SVG's
(function () {
  'use strict';
  var containerWidth = 500;
  var containerHeight = 500;
  window.balls = [];

  function createElm () {
    var data = [{
        dx: Math.random() * 5,
        dy: Math.random() * 5,
    }];
    var svg = d3.select('svg');
    var self = this;
    var elm = d3.select(this);
    var newElm = svg.append('circle').data(data).attr({
      cx: function(){ return containerWidth/2 },
      cy: function(){ return containerHeight/2 },
      r: 25,
      fill: "red",
      stroke: "white",
      "stroke-opacity": 0.7,
      "fill-opacity": Math.random()
    }).classed("d3-balls", true);    
    
    newElm.on("mouseover", createElm);

    balls.push(newElm);
    console.log(balls);
  }

  function ticker () {
      d3.selectAll(balls)
        .each(transition);
    
    window.setTimeout(ticker, 5);
  }
  function transition() {
    var ball = this;
    var dx = ball.data()[0].dx;
    var dy = ball.data()[0].dy;
    var x = parseInt(ball.attr("cx")) + dx;
    var y = parseInt(ball.attr("cy")) + dy;
    var r = parseInt(ball.attr("r"));


    if (x <= r || x + r >= containerWidth) {
      dx = -dx;
    } 

    if (y <= r || y + r >= containerHeight) {
      dy = -dy;
    }

    x += dx;
    y += dy;
 
    ball.data([{dx: dx, dy: dy}]);
    ball.attr("cx", x);
    ball.attr("cy", y);
    
  }

  function init () {
    createElm();
    ticker();
  }

  document.addEventListener('DOMContentLoaded', init);

})();

