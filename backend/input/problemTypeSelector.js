function generateInput(metadata){
    switch(metadata.problemType.type){
        case "single-array-traversal": 
            return generateSinglearrayTraversal(metadata);
        case "array-index-logic":
            return generateArrayIndexLogic(metadata);
        case "two-pointer":
            return generateTwoPointer(metadata);
        case "sliding-window-fixed":
            return generateSlidingWindowFixed(metadata);
        case "sliding-window-variable":
            return generateSlidingWindowVariable(metadata);
        case "hash-map-frequency":
            return generateHashmapFrequency(metadata);
        case "sorting-based":
            return generateSortingBased(metadata);
        case "binary-search-direct":
            return generateBinarySerachDirect(metadata);
        case "binary-search-on-answer":
            return generateBinarySearchOnAnswer(metadata);
        case "string-parsing":
            return generateStringParsing(metadata);
        case "prefix-sum":
            return generatePrefixSum(metadata);
        case "matrix-2d":
            return generateMatrix2d(metadata);      return generateMatrixInputs(metadata);
        default:
            throw new Error("Unsupported problemType");
    }
}
module.exports = { generateInputs };