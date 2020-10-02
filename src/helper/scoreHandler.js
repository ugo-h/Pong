const scoreLeft = document.getElementById('score1');
const scoreRight = document.getElementById('score2');

export function scoreLeftHandler() {
    let score = parseInt(scoreLeft.innerText);
    score++;
    scoreLeft.innerText = score;
}

export function scoreRightHandler() {
    let score = parseInt(scoreRight.innerText);
    console.log(score)
    score++;
    scoreRight.innerText = score;
}
