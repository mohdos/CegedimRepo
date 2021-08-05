
// function shuffleArray(array) {
//     let arr = [...array];
//     // [arr[14], arr[15]] = [arr[15], arr[14]];
//     // return arr;
//     for (let i = arr.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [arr[i], arr[j]] = [arr[j], arr[i]];
//     }
//     return arr;
// }

function shuffleArray(array, numShuffles = 15)
{
    let arr = [...array];
    // [arr[14], arr[15]] = [arr[15], arr[14]];
    // return arr;

    let emptyInd = 15;
    let indNeighbors = getNeighboursOfIndex(emptyInd);

    for (let i = 0; i < numShuffles; i++) {
        const randomNeighborInd = getRandomElement(indNeighbors);
        arr = swap(arr, emptyInd, randomNeighborInd);
        emptyInd = randomNeighborInd;
        indNeighbors = getNeighboursOfIndex(emptyInd);
    }

    return arr;
}

function swap(arr, ind1, ind2)
{
    let arrCopy = [...arr];
    [arrCopy[ind1], arrCopy[ind2]] = [arrCopy[ind2], arrCopy[ind1]];
    return arrCopy;
}

function getIndexOfEmpty(arr)
{
    return arr.findIndex((value, index) => value == 16);
}

function getNeighboursOfIndex(index)
{
    const row = index / 4;
    const col = index % 4;
    
    let neighborInd = [];

    if ((index - 4) >= 0)
    {
        neighborInd.push(index - 4);
    }
    
    if ((index + 4) < 16)
    {
        neighborInd.push(index + 4);
    }
    
    if ((index - 1) >= 0)
    {
        neighborInd.push(index - 1);
    }
    
    if ((index + 1) < 16)
    {
        neighborInd.push(index + 1);
    }

    return neighborInd;
}

function getRandomElement(arr)
{
    return arr[Math.floor(Math.random()*arr.length)];
}

module.exports = {shuffleArray, getRandomElement};
