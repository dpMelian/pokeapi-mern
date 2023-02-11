const colorRanges = {
    low: "#FF0000",
    medium: "#FFF400",
    high: "#A3FF00",
    top: "#2CBA00",
}

export const getColorRange = (statValue: number) => {
    switch(true){
        case (statValue >= 1) && (statValue <= 63):
            return colorRanges["low"];
        case (statValue >= 64) && (statValue <= 127):
            return colorRanges["medium"];
        case (statValue >= 128) && (statValue <= 191):
            return colorRanges["high"];
        case (statValue >= 192) && (statValue <= 255):
            return colorRanges["top"];
    }
}
