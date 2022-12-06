const Hotel = require("../models/Hotel");


async function getAll(){
   return Hotel.find({});

}

async function getLastFour() {
   return await Hotel.find({})
     .populate("owner")
     .limit(5)
     .lean();
 }

async function getByUserId(userId){
    return Hotel.find({_ownerId: userId})
}


async function getById(id){
  return Hotel.findById(id);
}

async function create(item){
   const newHotel = new Hotel(item)
  return await newHotel.save()

}


async function edit(id,item){
   const existing = await Hotel.findById(id)

   existing.name = item.make;
   existing.location = item.model;
   existing.description = item.description;
   existing.price = item.price;
   existing.img = item.img;
   
   return existing.save();
}


async function deleteItem(id){
   return Hotel.findByIdAndDelete(id)
}

module.exports = {
    getAll,
    getById,
    create,
    edit,
    deleteItem,
    getByUserId,
    getLastFour
}