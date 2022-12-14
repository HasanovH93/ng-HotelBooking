const Hotel = require("../models/Hotel");


async function getAll(skip,limit){
   return Hotel.find({}).skip(skip).limit(limit).lean();

}

async function getLastFour() {
   return await Hotel.find({})
     .populate("owner")
     .limit(5)
     .lean();
 }

async function getByUserId(userId){
    return Hotel.find({owner: userId})
}


async function getHotelById(id){
  return await Hotel.findById(id).lean();
}

async function create(item){
   const newHotel = new Hotel(item)
  return await newHotel.save()

}

async function changeImage(id, newImage, newEmail){
   const existing = await Hotel.findById(id)
  
 
   existing.ownerImage =  newImage
   existing.ownerEmail =  newEmail

   return  existing.save()
}

async function deleteById(id){
   const getHotel = await getHotelById(id);
   const result = await Hotel.deleteOne(getHotel)
   return result

}

async function likeHotel(id,userId){
   const currentHotel = await Hotel.findById(id);
   
   if(currentHotel.likedUsers.includes(userId)){
      throw new Error('Cannot Like twice')
   }
   currentHotel.likedUsers.push(userId);
   await currentHotel.save()
}
async function edit(id,item){
   const existing = await Hotel.findById(id)

   existing.name = item.make;
   existing.location = item.model;
   existing.description = item.description;
   existing.price = item.price;
   existing.img = item.img;
   
   return existing.update();
}


async function deleteItem(id){
   return Hotel.findByIdAndDelete(id)
}

module.exports = {
    getAll,
    getHotelById,
    create,
    edit,
    deleteItem,
    getByUserId,
    getLastFour,
    changeImage,
    deleteById,
    likeHotel
}