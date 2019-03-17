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
  "Salse": "1Pbd0JdAhUJJkFqh4ejUoAEoO8CJppilCRq3kDro2W8E",
  "Primi": "1ybcKx80KS3-WM3nun24Inzr4ux-28GSgwA6XpT0esLs",
  "Secondi": "1wAD_QNn6CmQ1xfrCotejI_ZKoUUA_-pSNCZWzxQU0fE",
  "Contorni": "1wAD_QNn6CmQ1xfrCotejI_ZKoUUA_-pSNCZWzxQU0fE",
  "Piatti unici": "1ybcKx80KS3-WM3nun24Inzr4ux-28GSgwA6XpT0esLs",
  "Dessert": "1HvMBoJzR3XWt9KGHO6WItp3-f0YCmwt3ZpsjGjwGMRs",
  "Liquori": "1HvMBoJzR3XWt9KGHO6WItp3-f0YCmwt3ZpsjGjwGMRs",
  "Varie": "1wAD_QNn6CmQ1xfrCotejI_ZKoUUA_-pSNCZWzxQU0fE"
};

var whiteStar = '\u2606';
var blackStar = '\u2605';

function createRecipeDoc(e) {
  
  var name = "test";//e.values[1];
  var category = "Antipasti";//e.values[2];
  var base_ingredient = "test";//e.values[3];
  
  var stars = 5;//e.values[4];
  var servings = "test";//e.values[5];
  var prep_time = "test";//e.values[6];
  var calories = "test";//e.values[7];
  
  var ingredients = "1\n2\n3";//e.values[8];
  var directions = "4\n5\n6\n7";//e.values[9];
  var notes = e.values[10];
  
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
  
  var endIngredients = insertAsList(body, ingredients, 0, DocumentApp.GlyphType.BULLET);
  
  insertAsList(body, directions, endIngredients, DocumentApp.GlyphType.NUMBER);
  
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
  var l = content.split("\n");
  var el = body.getListItems()[offset];
  el.setText(l[0]);
  el.setGlyphType(glyphType);
  for (var i=1; i<l.length; i++) {
    var nextElem = body.getChildIndex(body.getListItems()[offset + i-1].getNextSibling())
    var el = body.insertListItem(nextElem, l[i]);
    el.setGlyphType(glyphType);
  }
  return l.length;
}
