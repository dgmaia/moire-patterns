//= require_tree .

$(function(){

    var browserWidth = (Math.max(document.documentElement.clientWidth, window.innerWidth || 0))*2;
    var browserHeight = (Math.max(document.documentElement.clientHeight, window.innerHeight || 0))*2;

    var rotateValue = null;
    var xValue = null;
    var yValue = null;
    var scale = null;
    var canvas = null;
    var result = null;

    var ctx = $("#canvas")[0].getContext('2d');
    var ctx2 = $("#canvas2")[0].getContext('2d');

    function draw() {
        ctx.canvas.width = browserWidth;
        ctx.canvas.height = browserHeight;
        ctx2.canvas.width = browserWidth;
        ctx2.canvas.height = browserHeight;

        canvas = $('#canvas-size').val();
        var squareNumberX = Math.round((browserWidth)/canvas);
        var squareNumberY = Math.round((browserHeight)/canvas);

        var triangleNumberX = Math.round((browserWidth)/canvas);
        var triangleNumberY = Math.round((browserHeight)/canvas);

        function trianglesLines() {
          var height =  (Math.sqrt(3)/2)*canvas;
          for (var i = 0; i < triangleNumberY*2; i=i+4) {
            for (var j = 0; j < triangleNumberX; j=j+2) {
              if (j===0) {
                ctx.beginPath();
                ctx.moveTo(canvas, (height*i)); //top
                ctx.lineTo(0, height*(2+i)); // bottom left
                ctx.lineTo(canvas*2, height*(2+i)); // bottom right
                ctx.closePath();
                ctx.fill();
                ctx2.beginPath();
                ctx2.moveTo(canvas, (height*i)); //top
                ctx2.lineTo(0, height*(2+i)); // bottom left
                ctx2.lineTo(canvas*2, height*(2+i)); // bottom right
                ctx2.closePath();
                ctx2.fill();
              } else {
                ctx.beginPath();
                ctx.moveTo(canvas*(j+1), (height*i)); //top
                ctx.lineTo(canvas*j, height*(2+i)); // bottom left
                ctx.lineTo(canvas*(2+j), height*(2+i)); // bottom right
                ctx.closePath();
                ctx.fill();
                ctx2.beginPath();
                ctx2.moveTo(canvas*(j+1), (height*i)); //top
                ctx2.lineTo(canvas*j, height*(2+i)); // bottom left
                ctx2.lineTo(canvas*(2+j), height*(2+i)); // bottom right
                ctx2.closePath();
                ctx2.fill();
              }
            }
            for (var j = 0; j < triangleNumberX; j=j+2) {
              if (j===0) {
                ctx.beginPath();
                ctx.moveTo(0, height*(2+i)); //top
                ctx.lineTo(0, height*(4+i)); // bottom left
                ctx.lineTo(canvas, height*(4+i)); // bottom right
                ctx.closePath();
                ctx.fill();
                ctx2.beginPath();
                ctx2.moveTo(0, height*(2+i)); //top
                ctx2.lineTo(0, height*(4+i)); // bottom left
                ctx2.lineTo(canvas, height*(4+i)); // bottom right
                ctx2.closePath();
                ctx2.fill();
              } else if (j===2) {
                ctx.beginPath();
                ctx.moveTo(canvas*j, height*(2+i)); //top
                ctx.lineTo(canvas, height*(4+i)); // bottom left
                ctx.lineTo(canvas*(1+j), height*(4+i)); // bottom right
                ctx.closePath();
                ctx.fill();
                ctx2.beginPath();
                ctx2.moveTo(canvas*j, height*(2+i)); //top
                ctx2.lineTo(canvas, height*(4+i)); // bottom left
                ctx2.lineTo(canvas*(1+j), height*(4+i)); // bottom right
                ctx2.closePath();
                ctx2.fill();
              } else {
                ctx.beginPath();
                ctx.moveTo(canvas*j, height*(2+i)); //top
                ctx.lineTo(canvas*(j-1), height*(4+i)); // bottom left
                ctx.lineTo(canvas*(1+j), height*(4+i)); // bottom right
                ctx.closePath();
                ctx.fill();
                ctx2.beginPath();
                ctx2.moveTo(canvas*j, height*(2+i)); //top
                ctx2.lineTo(canvas*(j-1), height*(4+i)); // bottom left
                ctx2.lineTo(canvas*(1+j), height*(4+i)); // bottom right
                ctx2.closePath();
                ctx2.fill();
              }
            }
          }
        }

        function squareLines1() {
          for (var i = 0; i < squareNumberX; i++) {
            for (var j = 0; j < squareNumberY; j++) {
              ctx.fillRect(i*2*canvas, j*2*canvas, canvas, canvas);
              ctx2.fillRect(i*2*canvas, j*2*canvas, canvas, canvas);
            }
          };
        }

        function squareLines2() {
          for (var j = 0; j < squareNumberY; j=j+2) {
            for (var i = 0; i < squareNumberX; i++) {
              if ( i%2===0) {
                ctx.fillRect(i*canvas, canvas*j, canvas, canvas);
                ctx2.fillRect(i*canvas, canvas*j, canvas, canvas);
              } else {
                ctx.fillRect(i*canvas, canvas*(j+1), canvas, canvas);
                ctx2.fillRect(i*canvas, canvas*(j+1), canvas, canvas);
              }
            }
          }
        }

        function circles() {
          for (var j = 0; j < squareNumberY; j=j+2) {
            for (var i = 0; i < squareNumberX; i++) {
              if ( i%2===0) {
                ctx.beginPath();
                ctx.arc(canvas*i*2,canvas*j*2,canvas,0,2*Math.PI);
                ctx.fill();
                ctx2.beginPath();
                ctx2.arc(canvas*i*2,canvas*j*2,canvas,0,2*Math.PI);
                ctx2.fill();
              } else {
                ctx.beginPath();
                ctx.arc(canvas*i*2,canvas*(j+1)*2,canvas,0,2*Math.PI);
                ctx.fill();
                ctx2.beginPath();
                ctx2.arc(canvas*i*2,canvas*(j+1)*2,canvas,0,2*Math.PI);
                ctx2.fill();
              }
            }
          }
        }

        function randomLines1() {
          for (var j = 0; j < squareNumberY; j=j+2) {
            for (var i = 0; i < squareNumberX; i++) {
              var random = Math.floor((Math.random() * 100) + 1);
              if ( i%2===0) {
                if (random % 2 === 0 ) {
                  ctx.fillRect(i*canvas, canvas*j, canvas, canvas);
                  ctx2.fillRect(i*canvas, canvas*j, canvas, canvas);
                }
              } else {
                random = Math.floor((Math.random() * 100) + 1);
                if (random % 2 === 0 ) {
                  ctx.fillRect(i*canvas, canvas*(j+1), canvas, canvas);
                  ctx2.fillRect(i*canvas, canvas*(j+1), canvas, canvas);
                }
              }
            }
          }
        }

        function randomLines2() {
          for (var i = 0; i < squareNumberX; i++) {
            for (var j = 0; j < squareNumberY; j++) {
              var random = Math.floor((Math.random() * 100) + 1);
              if (random % 2 === 0 ) {
                ctx.fillRect(i*2*canvas, j*2*canvas, canvas, canvas);
                ctx2.fillRect(i*2*canvas, j*2*canvas, canvas, canvas);
              } else {
                random = Math.floor((Math.random() * 100) + 1);
              }
            }
          };
        }

        if ( $('#type').val() === "triangle" ) {
          trianglesLines();
        } else if ( $('#type').val() === "square1" ) {
          squareLines2();
        } else if ( $('#type').val() === "random1" ) {
          randomLines1();
        } else if ( $('#type').val() === "circle" ) {
          circles();
        } else {
          randomLines2();
        };
    }

    $("#draw").on( "click", function() {
      draw();
      rotateValue = $('#range').val("0");
      xValue = $('#x-value').val("0");
      yValue = $('#y-value').val("0");
      scale = $('#size-value').val("1");
      result = "";
      $("#canvas2").css({
        'transform' : result
      })
    });

    $(".values").change(function(){

        rotateValue = $('#range').val();
        rotateValue = "rotate(" + rotateValue + "deg)";

        xValue = $('#x-value').val();
        xValue = "translateX(" + xValue + "px)";

        yValue = $('#y-value').val();
        yValue = "translateY(" + yValue + "px)";

        scale = $('#size-value').val();
        scale = "scale(" + scale + ")";

        result = rotateValue + " " + xValue  + " " + yValue + " " + scale;

        $("#canvas2").css({
            'transform' : result
        })

    });

});