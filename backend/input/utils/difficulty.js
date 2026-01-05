function sizeByDifficulty(difficulty){
    if( difficulty == "easy") return 10;
    if ( difficulty == "medium" ) return 1000;
    else 100000;
}

module.exports = { sizeByDifficulty }