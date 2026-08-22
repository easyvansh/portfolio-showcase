export type MenuCategory = "Coffee" | "Tea" | "Breakfast" | "All Day" | "Pasta" | "Desserts";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image: string;
  ingredients: string[];
  vegetarian?: boolean;
  vegan?: boolean;
  glutenFree?: boolean;
  bestseller?: boolean;
  seasonal?: boolean;
  chefsPick?: boolean;
};

const photos = {
  latte: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=1200&q=85",
  cold: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=1200&q=85",
  toast: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=1200&q=85",
  breakfast: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1200&q=85",
  cake: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=85",
  pasta: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=85",
};

export const menu: MenuItem[] = [
  {id:"honey-latte",name:"Himalayan Honey Latte",description:"Espresso, local honey and cinnamon.",price:240,category:"Coffee",image:photos.latte,ingredients:["Double espresso","Local honey","Milk","Cinnamon"],vegetarian:true,bestseller:true},
  {id:"viet-cold",name:"Vietnamese Cold Coffee",description:"Condensed milk and double espresso.",price:260,category:"Coffee",image:photos.cold,ingredients:["Double espresso","Condensed milk","Ice"],vegetarian:true},
  {id:"pour-over",name:"Estate Pour Over",description:"A rotating single-origin coffee brewed by hand.",price:280,category:"Coffee",image:photos.latte,ingredients:["Single-origin coffee","Filtered water"],vegan:true,glutenFree:true,seasonal:true},
  {id:"cappuccino",name:"Classic Cappuccino",description:"Double espresso with textured milk.",price:210,category:"Coffee",image:photos.latte,ingredients:["Espresso","Milk"],vegetarian:true},
  {id:"masala-tea",name:"Doon Masala Chai",description:"Assam tea, fresh spices and milk.",price:160,category:"Tea",image:photos.cold,ingredients:["Assam tea","Ginger","Cardamom","Milk"],vegetarian:true},
  {id:"green-tea",name:"Himalayan Green Tea",description:"Clean, floral and gently vegetal.",price:190,category:"Tea",image:photos.cold,ingredients:["Whole-leaf green tea","Spring water"],vegan:true,glutenFree:true},
  {id:"mushroom-toast",name:"Wild Mushroom Toast",description:"Sourdough, garlic mushrooms and herbs.",price:390,category:"Breakfast",image:photos.toast,ingredients:["Sourdough","Mushrooms","Garlic","Herbs"],vegetarian:true,bestseller:true},
  {id:"mountain-breakfast",name:"Mountain Breakfast",description:"Eggs, toast, potatoes and greens.",price:420,category:"Breakfast",image:photos.breakfast,ingredients:["Eggs","Sourdough","Potatoes","Seasonal greens"],vegetarian:true},
  {id:"granola",name:"House Granola Bowl",description:"Seasonal fruit, yoghurt, seeds and honey.",price:290,category:"Breakfast",image:photos.breakfast,ingredients:["Granola","Yoghurt","Fruit","Seeds","Honey"],vegetarian:true,glutenFree:true},
  {id:"ricotta-toast",name:"Ricotta Chilli Toast",description:"Whipped ricotta, chilli crisp and local honey.",price:330,category:"All Day",image:photos.toast,ingredients:["Sourdough","Ricotta","Chilli crisp","Honey"],vegetarian:true},
  {id:"grain-bowl",name:"Forest Grain Bowl",description:"Millets, roasted vegetables, herbs and tahini.",price:380,category:"All Day",image:photos.breakfast,ingredients:["Millets","Vegetables","Tahini","Herbs"],vegan:true,glutenFree:true},
  {id:"grilled-cheese",name:"Three Cheese Toastie",description:"Cheddar, mozzarella, smoked cheese and mustard.",price:350,category:"All Day",image:photos.toast,ingredients:["Sourdough","Three cheeses","Mustard"],vegetarian:true},
  {id:"rigatoni",name:"Arrabbiata Rigatoni",description:"Tomato, garlic, chilli and parmesan.",price:430,category:"Pasta",image:photos.pasta,ingredients:["Rigatoni","Tomato","Garlic","Chilli","Parmesan"],vegetarian:true},
  {id:"mushroom-pasta",name:"Mushroom Tagliatelle",description:"Forest mushrooms, thyme and brown butter.",price:480,category:"Pasta",image:photos.pasta,ingredients:["Tagliatelle","Mushrooms","Thyme","Brown butter"],vegetarian:true,chefsPick:true},
  {id:"pesto-pasta",name:"Garden Pesto Casarecce",description:"Basil, walnut, parmesan and lemon.",price:450,category:"Pasta",image:photos.pasta,ingredients:["Casarecce","Basil","Walnut","Parmesan","Lemon"],vegetarian:true},
  {id:"basque",name:"Burnt Basque Cheesecake",description:"House baked with seasonal preserve.",price:290,category:"Desserts",image:photos.cake,ingredients:["Cream cheese","Eggs","Cream","Seasonal fruit"],vegetarian:true,chefsPick:true},
  {id:"tea-cake",name:"Lemon Tea Cake",description:"Candied lemon and vanilla cream.",price:220,category:"Desserts",image:photos.cake,ingredients:["Lemon","Vanilla","Flour","Butter"],vegetarian:true},
  {id:"chocolate",name:"Dark Chocolate Tart",description:"Sea salt, espresso cream and cacao nibs.",price:310,category:"Desserts",image:photos.cake,ingredients:["Dark chocolate","Espresso","Cream","Cacao"],vegetarian:true,glutenFree:true},
];

export const featuredIds = ["honey-latte","viet-cold","mushroom-toast","mountain-breakfast","basque","rigatoni"];

export const coffees = [
  {name:"Ratnagiri Estate",origin:"Chikmagalur, Karnataka",process:"Anaerobic natural",notes:["Papaya","Cacao","Red grape"],roast:"Light",brew:"Pour over",color:"#c96a3d"},
  {name:"Kalledevarapura",origin:"Bababudangiri, Karnataka",process:"Washed",notes:["Sweet lime","Jasmine","Caramel"],roast:"Light",brew:"Aeropress",color:"#3f513b"},
  {name:"Riverdale Estate",origin:"Yercaud, Tamil Nadu",process:"Natural",notes:["Blueberry","Chocolate","Hazelnut"],roast:"Medium",brew:"Espresso",color:"#5a3e2b"},
];

export const events = [
  {date:"FRI 28",time:"7:30 PM",title:"Acoustic evening",copy:"An unplugged set in the garden. Seating is limited."},
  {date:"SAT 29",time:"11:00 AM",title:"Coffee tasting",copy:"Taste three Indian coffees with our bar team."},
  {date:"SUN 30",time:"10:00 AM",title:"Community table",copy:"Breakfast, conversation and a long shared table."},
];

export const gallery = [
  "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1400&q=85",
];
