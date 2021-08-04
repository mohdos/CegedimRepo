
function shuffleArray(array) {
    let arr = [...array];
    // [arr[14], arr[15]] = [arr[15], arr[14]];
    // return arr;
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

module.exports = {shuffleArray};
