function dataInputParser(req) {

    const data = {
        hotelName: req.body.hotelName,
        roomType: req.body.roomType,
        location: req.body.location,
        stars: parseStringToNumber(req.body.stars),
        description: req.body.description,
        price: parseStringToNumber(req.body.price),
        imageUrls: req.body.imageUrls,

    }
}

function parseStringToNumber(param) {
    if (param && param !== "") {
      if ((typeof param) !== 'number') {
        const data = Number(param.split(" ").join(""));
        return data;
      }
        return param
    }
    throw new Error("Fields couldn't be empty");
  }
  

  module.exports = {
    dataInputParser
  }