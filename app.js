//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


// MONGO DB
// Create a new MongoDB db or connect to one existing
mongoose.connect("mongodb+srv://admin-alex:SparveN23@cluster0.nudk0.mongodb.net/todolistDB");

// Item Schema, one field, name, String
const itemsSchema = new mongoose.Schema ({
  title: String,
  desc: String
});

// Create Model (CAPITALIZED), Singular name of collection
const Item = mongoose.model("Item", itemsSchema);

// Create 3 new docs MongoDB
const itemOne = new Item({
  title: "Tutorial 1",
  desc: "You can add new todos Above"
});

const itemTwo = new Item({
  title: "Tutorial 2",
  desc: "Delete todos to your right"
});

const itemThree = new Item({
  title: "Tutorial 3",
  desc: "Tap the todo TITLE to edit todos!"
});

const defaultItems = [itemOne, itemTwo, itemThree];


// Dynamic Schema for EXPRESS Route Params
// const listSchema = {
//   name: String,
//   items: [itemsSchema] // have an array of item Doc 
// };

// const List = mongoose.model("List", listSchema);




// ROUTES GET / POST

app.get("/", function(req, res) {

  // Find all {}
  Item.find({}, function(err, foundItems){
    // if itemCollection is empty, add default 3 items
    if (foundItems.length === 0){
      Item.insertMany(defaultItems, function(err){
      if (err) {
        console.log(err);
      } else {
        console.log("Saved Default Items in TodoList DB");
      }
      });
      res.redirect("/");
    } else {
      res.render("list", {listTitle: "Today", newListItems: foundItems});
    }
  });

});


app.post("/", function(req, res){
  // text posted in inputField
  const itemTitle = req.body.newItemTitle;
  const itemDesc = req.body.newItemDesc;

  // Create new item for Mongo DB
  const newItem = new Item({
    title: itemTitle,
    desc: itemDesc
  });

  // Save
  newItem.save();

  res.redirect("/");
});


// DELETE FROM THE LIST
app.post("/delete", function(req, res){
  const deletedItemId = req.body.deleteButton;

  // For animation Jquery on frontend to have effect
  setTimeout(() => {
    Item.findByIdAndRemove(deletedItemId, function(err){
      if (!err) {
        console.log(deletedItemId + " deleted from DB");
        res.redirect("/");
      }
    });
  }, 300);

});


// UPDATE THE ITEM
app.post("/update", function(req,res){
  const updatedItemId = req.body.updateItemId;
  const updateItemTitle = req.body.updateTitle;
  const updateItemDesc = req.body.updateDesc;

  Item.findByIdAndUpdate(updatedItemId, {title: updateItemTitle, desc: updateItemDesc}, function(err){
    if (!err) {
      console.log(updatedItemId + " updated in DB");
      res.redirect("/");
    }
  });

});


// EXPRESS ROUTE PARAMS

// app.get("/:customListName", function(req, res){
//   const customListName = req.params.customListName; // whatever user writes after /

//   List.findOne({name: customListName}, function(err, foundList){
//     if (!err){
//       if (!foundList){
//         // Create a new list
//         const list = new List({
//           name: customListName, // whatever user typed in
//           items: defaultItems // prev used default documents, in an ARRAY
//         });
//         list.save();
//         res.redirect("/" + customListName);

//       } else {
//         res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
//       }
//     }
//   });

// });



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
