/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = [];
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target

  let kitten = {
    id:generateId(),
    name: form.name.value,
    mood: "Tolerant",
    affection: 5

  }
  kittens.push(kitten)
  saveKittens()
  form.reset()
  drawKittens()
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()
}


/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let savedKittens = JSON.parse(window.localStorage.getItem("kittens"))

  if(savedKittens){
    kittens = savedKittens
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let kittenListElement = document.getElementById("kittens")
  let kittensTemplate = ""
  kittens.forEach(kitten => {
    kittensTemplate += `
    <div class="card">
      <img class="kitten" src=https://robohash.org/${kitten.name}?set=set4 height="150" width="150">
      <div class="mt-2 text-light">
      
        <div class="d-flex justify-content-center"> Name: ${kitten.name}</div>
        <div class="d-flex justify-content-center"> Mood: ${kitten.mood}</div>
        <div class="d-flex justify-content-center"> Affection: ${kitten.affection}</div>

        <div>
        <button onclick="pet('${kitten.id}')">Pet The Baby!</button>
        <button onclick="catnip('${kitten.id}')">Give Treat!</button>
        </div>
        </div>
        <hr>
        <div class="d-flex justify-content-center">
        <i class="fa fa-trash text-danger action button-large" id="delete-btn"aria-hidden="true" onclick="removeKitten('${kitten.id}')"></i></div>
      </div>
      `
    
  })
  kittenListElement.innerHTML = kittensTemplate
}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
function pet(id) {
  let currentKitten = findKittenById(id)
  let randomNumber = Math.random()
  if (randomNumber > 0.7) {
    currentKitten.affection ++;
    setKittenMood(currentKitten)
    saveKittens()
  }
  else currentKitten.affection --;
  setKittenMood(currentKitten)
  saveKittens()
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {
  let currentKitten = findKittenById(id)
  currentKitten.mood = "Tolerant"
  currentKitten.affection = 5;
  saveKittens()
}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
  document.getElementById("kittens").classList.remove(kitten.mood)
  if (kitten.affection >= 6) {kitten.mood = "Happy"}
  if (kitten.affection <= 5) {kitten.mood = "Tolerant"}
  if (kitten.affection <= 3) {kitten.mood = "Angry"}
  if (kitten.affection <= 0) {kitten.mood = "Gone"}
 
  document.getElementById("kittens").classList.add(kitten.mood)
  saveKittens()
}

function getStarted() {
  document.getElementById("welcome").remove();
  drawKittens();
}

/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}
