var dog, happyDog;
var database;
var foodS, foodStock;

function preload()
{  
	dogImg = loadImage("images/dogImg.png");
  dogImg1 = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);

  database = firebase.database();
  console.log(database);

  dog = createSprite(450,250,5,5)
  dog.addImage(dogImg)
  dog.scale = 0.2


  foodStock = database.ref('Food');
    foodStock.on("value",readStock);

    feed = createButton("Feed the dog");
    feed.position(700,95);
    feed.mousePressed(feedDog);

    addFood = createButton("Add Food");
    addFood.position(800,95);
    addFood.mousePressed(addFoods);
   
}


function draw() {  
background(46, 139, 87)
  drawSprites();

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg1);
  }

  fill("black");
  textSize(13); 
text("Food remaining:" +foodS,170,200);   

fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed : "+ lastFed%12 + " PM", 350,30);
}else if(lastFed==0){
  text("Last Feed : 12 AM",350,30);
}else{
  text("Last Feed : "+ lastFed + " AM", 350,30);
}
}


function readStock(data){
  foodS = data.val();

}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
  }

  function feedDog(){
    dog.addImage(dogImg1);

    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food:foodObj.getFoodStock(),
      FeedTime:hour()
    })
  }

  function addFoods(){
    foodS++;
    database.ref('/').update({
      Food:foodS
    })
  }

 




