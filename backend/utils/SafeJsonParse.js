// es file ka kaam ka hum me question generate kar liya ab hum ko check kar na ki ko output aa raha ha vo correct formate me ha ya nahi ho huma es file me check kar rahe ha

function SafeJsonParse( text ){
    try {
        return Json.parse(text);
    }catch{
        throw new Error("AI returning invalid data ");
    }
}

module.exports = { SafeJsonParse };