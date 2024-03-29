// @NotOnlyCurrentDoc

var folders = {
  "Antipasti": "1D7fz95qjeZwn92GO7xWAuYPfG1KoLWNb",
  "Salse": "1kI0aiPGwA6RRNTDtbDuVwfQJGuBunIn5",
  "Primi": "1zl22Km-afJPwZpHwYVmZhBmcFh8aJs0k",
  "Secondi": "1wYdlYDmdEzs_T2nXwPt90qgP14273kjn",
  "Contorni": "1RW96eaRNRD7KBq1Bdmiihykv9gtIH1cu",
  "Piatti unici": "1TicjUQwxlZdWzAAfP4ZTpDwIizF8g_gr",
  "Dessert": "1sKQ5MowoiYaTNf4XTK7VQnr5NaPSvHaO",
  "Liquori": "1R9d3mAYk2mtpgl-kr9T1ddnqZuK2m0u3",
  "Varie": "1gXizDmB2urzs0JsvY-xDhQurXJm6Wss0"
};

var templates = {
  "Antipasti": "1Pbd0JdAhUJJkFqh4ejUoAEoO8CJppilCRq3kDro2W8E",
  "Salse": "1sW9OdPpAQ0ErlNAzqGI1U_pW3kx6FNxC20wT1I_UTm8",
  "Primi": "1ybcKx80KS3-WM3nun24Inzr4ux-28GSgwA6XpT0esLs",
  "Secondi": "1wAD_QNn6CmQ1xfrCotejI_ZKoUUA_-pSNCZWzxQU0fE",
  "Contorni": "1EHIeq90Dx36-aHhb9bOzxjaAb1NBIUOJR3STLwUhlH4",
  "Piatti unici": "1zkXesodYhx3zKoIgULt1l9g0RM5snEmLv6ieQ76Ie28",
  "Dessert": "1HvMBoJzR3XWt9KGHO6WItp3-f0YCmwt3ZpsjGjwGMRs",
  "Liquori": "1cVnRmWioGAB-pBclVroq_VJly6MiSmTqKvHrlZVW7_Q",
  "Varie": "1ywFRndCFW69c6LBIM8MofgT-IMZCrFmMQ4foX0sqw3A"
};

var whiteStar = '\u2606';
var blackStar = '\u2605';

function createRecipeDoc(e) {
  
  var name = e.values[1] == ""? "Nome ricetta": e.values[1];
  var category = e.values[2] == ""? "Varie": e.values[2];
  var base_ingredient = e.values[3] == ""? "Ingrediente principale": e.values[3];
  
  Logger.log("Name: " + name);
  Logger.log("Category: " + category);
  Logger.log("Base ingredient: " + base_ingredient);
  
  var stars = e.values[4] == ""? 3: e.values[4];
  var servings = e.values[5] == ""? "X": e.values[5];
  var prep_time = e.values[6] == ""? "X": e.values[6];
  var calories = e.values[7] == ""? "X": e.values[7];
  
  Logger.log("Stars: " + stars);
  Logger.log("Servings: " + servings);
  Logger.log("Prep time: " + prep_time);
  Logger.log("Calories: " + calories);
  
  var ingredients = e.values[8] == ""? "Ingrediente": e.values[8];
  var directions = e.values[9] == ""? "Istruzione": e.values[9];
  var notes = e.values[10] == ""? "Appunti": e.values[10];
  
  Logger.log("Ingredients: " + ingredients);
  Logger.log("Directions: " + directions);
  Logger.log("Notes: " + notes);
  
  Logger.log("Folder: " + folders[category]);
  Logger.log("Template: " + templates[category]);
  
  var folder = DriveApp.getFolderById(folders[category]);
  var docId = DriveApp.getFileById(templates[category]).makeCopy(name, folder).getId();
  
  var doc = DocumentApp.openById(docId);
  var body = doc.getBody();
  
  body.replaceText("##name##", name);
  body.replaceText("##category##", category);
  body.replaceText("##base_ingredient##", base_ingredient);
  
  insertStars(body, stars);
  body.replaceText("##servings##", servings);
  body.replaceText("##prep_time##", prep_time);
  body.replaceText("##calories##", calories);
  
  var ingredientsOffset = 1;
  if (ingredients != "") {
    ingredientsOffset = insertAsList(body, ingredients, 0, DocumentApp.GlyphType.BULLET);
  }
  if (directions != "") {
    insertAsList(body, directions, ingredientsOffset, DocumentApp.GlyphType.NUMBER);
  }
  
  body.replaceText("##notes##", notes);
  
  doc.saveAndClose();
}

function insertStars(body, stars) {
  if (stars == '' || stars <= 0) {
    stars = 1;
  }
  if (stars > 5) {
    stars = 5;
  }
  
  var blackStars = '';
  for (var i=0; i<stars; i++) {
    blackStars += blackStar;
  }
  var whiteStars = '';
  for (var i=stars; i<5; i++) {
    whiteStars += whiteStar;
  }
  body.replaceText("##stars##", blackStars + whiteStars);
}

function insertAsList(body, content, offset, glyphType) {
  var l = content.split("\n").filter(isEmpty);
  if (l.length == 0) { return 0; }
  
  var el = body.getListItems()[offset];
  el.setText(l[0]);
  el.setGlyphType(glyphType);
  
  for (var i=1; i<l.length; i++) {
    
    var nextElem = body.getChildIndex(body.getListItems()[offset + i-1].getNextSibling())
    var el = body.insertListItem(nextElem, l[i]);
    el.setGlyphType(glyphType);
  }
  Logger.log("N. of elements added: " + l.length);
  return l.length;
}

function isEmpty(x) {
  return x != "";
}
