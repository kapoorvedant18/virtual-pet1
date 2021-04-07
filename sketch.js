var dog,happydog,database;
var foodS,foodStock,foodobj;
var lastFed,fedTime,feed,addFood;
function preload(){
Dogimg = loadImage("images/dogImg.png");
Dogimg1= loadImage("images/dogImg1.png");	
milk= loadImage("images/Milk.png");
}

function setup() { 
  database = firebase.database();  
                  
	createCanvas(1000,400);  
     foodobj = new food();
     //foodobj.addImage(milk);
   
   foodStock = database.ref('food');
   foodStock.on("value",readStock)
   dog = createSprite(800,200,150,150 );   
   dog.addImage("dog",Dogimg);
   dog.scale = 0.15;

   feed = createButton("Feed the dog");
   feed.position(700,95);
   feed.mousePressed(feedDog);
  addFood = createButton("add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods )
   
}


function draw() {  
    background(46,139,87);

    foodobj.display();
      fedTime = database.ref('FeedTime');
      fedTime.on("value",function (data){
        lastFed = data.val();
      })

      fill(255,255,254);
      textSize(15);
      if (lastFed >= 12){
        text("last Feed:"+lastFed %12 + "PM",350,30);
      }
      else if (lastFed == 0) {
        text("last Feed: 12AM",350,30);
      }
      else {
        text("last Feed:"+ lastFed %12 + "PM",350,30);
      }
   
     drawSprites();
  

}
function readStock(data){ 
  foodS=data.val();
  foodobj.updateFoodStock(foodS);
}

function feedDog() {
  dog.addImage(Dogimg1);
  foodobj.updateFoodStock(foodobj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodobj.getFoodStock(),
    FeedTime : hour()

  })
} 

function addFoods () {
  foodS++;
  database.ref('/'),update({
    Food: foodS
  })
}





