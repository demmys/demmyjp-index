window.onload = function(event){
    var field = document.getElementById('field');
    document.ondblclick = function(event){
        event.preventDefault();
        addBalls(field, 10, event.offsetX, event.offsetY);
    };

    var interval = 50;
    window.setInterval(function(){
        var balls = document.getElementsByClassName('ball');
        for(var i = 0; i < balls.length; i++){
            animateBall(balls[i], 0.07, interval / 1000);
        };
    }, interval);
};

function addBalls(parent, num, originX, originY){
    for(var i = 0; i < num; i++){
        createBall(parent, originX, originY);
    }
}

function createBall(parent, originX, originY){
        var ball = document.createElement('img');
        ball.src = 'ball.png';
        ball.setAttribute('class', 'ball');
        ball.setAttribute('data-increment-x', 'true');
        ball.setAttribute('data-increment-y', 'false');
        ball.setAttribute('data-velocity-x', getRandomVelocity());
        ball.setAttribute('data-velocity-y', getRandomVelocity());
        ball.setAttribute('data-dragging', 'false');
        ball.style.left = originX + 'px';
        ball.style.top = originY + 'px';
        ball.style.webkitTransform = 'rotate(0deg)';
        ball.onmousedown = dragStart;
        ball.onmouseup = dragEnd;
        ball.onmouseout = dragEnd;
        ball.onmousemove = dragging;
        parent.appendChild(ball);
}

function getRandomVelocity(){
    return String(Math.random() * 3500 - 1750);
}

function dragStart(event){
    event.target.setAttribute('data-dragging', 'true');
}
function dragEnd(event){
    var target = event.target;
    if(target.getAttribute('data-dragging') == 'true'){
        target.setAttribute('data-velocity-x', getRandomVelocity());
        target.setAttribute('data-dragging', 'false');
    }
}
function dragging(event){
    event.preventDefault();
    var target = event.target;
    var parentRect = target.parentNode.getBoundingClientRect()
    var pointerX = event.clientX - parentRect.left;
    var pointerY = event.clientY - parentRect.top;
    if(target.getAttribute('data-dragging') == 'true'){
        var refreshX = pointerX - (target.width / 2);
        var refreshY = pointerY - (target.height / 2);
        target.style.left = refreshX + 'px';
        target.style.top = refreshY + 'px';
    }
}

var G = 9.8;
var E = 0.75 * 0.70;
var M = 0.2;
function animateBall(ball, ballDiameter, interval){
    if(ball.getAttribute('data-dragging') == 'true'){
        return;
    }
    var parent = ball.parentNode;
    var baseWidth = parseInt(parent.style.width) - ball.width;
    var baseHeight = parseInt(parent.style.height) - ball.height;
    var currentX = parseInt(ball.style.left);
    var currentY = parseInt(ball.style.top);
    var velocityX = parseInt(ball.getAttribute('data-velocity-x')) / 1000;
    var velocityY = parseInt(ball.getAttribute('data-velocity-y')) / 1000;
    var velocityD = G * interval;
    var meter = ball.width / ballDiameter;

    velocityY += velocityD;
    currentY += velocityY * interval * meter;
    if(currentY > baseHeight || currentY < 0){
        if(currentY < 0){
            currentY = 0;
        } else{
            currentY = baseHeight;
        }
        velocityY = -velocityY * E;
    }

    if(currentY == baseHeight){
        velocityX *= (1 - M);
    }
    var distance = velocityX * interval;
    currentX += distance * meter;
    if(currentY == baseHeight){
        rotateBall(ball, ballDiameter, distance);
    }
    if(currentX > baseWidth || currentX < 0){
        if(currentX < 0){
            currentX = 0;
        } else{
            currentX = baseWidth;
        }
        velocityX = -velocityX * E;
    }

    ball.style.left = Math.round(currentX) + 'px';
    ball.style.top = Math.round(currentY) + 'px';
    ball.setAttribute('data-velocity-x', Math.round(velocityX * 1000));
    ball.setAttribute('data-velocity-y', Math.round(velocityY * 1000));
}

function rotateBall(ball, diameter, distance){
    var circle = diameter * Math.PI;
    var degree = (distance / circle) * 360 + getRotate(ball) % 360;
    ball.style.webkitTransform = 'rotate(' + degree + 'deg)';
}

function getRotate(element){
    var transform = element.style.webkitTransform;
    var sentence = transform.match(/rotate\(-?[0-9.]+deg\)/g);
    var res = parseInt(sentence[0].slice(7, -4));
    return res;
}
