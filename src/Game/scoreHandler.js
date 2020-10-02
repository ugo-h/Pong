const scoreLeft = document.getElementById('score1');
const scoreRight = document.getElementById('score2');

export function scoreLeftHandler() {
    let score = parseInt(scoreLeft.innerText);
    score++;
    scoreLeft.innerText = score;
    return score
}

export function scoreRightHandler() {
    let score = parseInt(scoreRight.innerText);
    score++;
    scoreRight.innerText = score;
    return score
}

export function setScoresToZero() {
    scoreLeft.innerText = 0;
    scoreRight.innerText = 0;
}
