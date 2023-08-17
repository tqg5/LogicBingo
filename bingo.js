const db = require('./db');

module.exports = (() => {
    const generateCard = async() => {
        const board = [
          [1,2,3],
          [4,5,6],
          [7,8,9]
        ]

        await db.push("/arraytest/card", board )
    };

    return {
        generateCard
    }
})();