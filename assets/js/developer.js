import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js'
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js'

const appSettings = {
    // databaseURL: "https://add-to-cart-90381-default-rtdb.asia-southeast1.firebasedatabase.app/"
    databaseURL: "https://addtocart---app-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingList = document.getElementById("shopping-list")


addButtonEl.addEventListener("click", function(){
    let inputValue = inputFieldEl.value
    push(shoppingListInDB, inputValue)
    clearInputEl()
})

onValue(shoppingListInDB, function(snapshot){

    if(snapshot.exists()){
        let shoppingList =  Object.entries(snapshot.val())
        clearShoppingListEl();
        
        for(let i = 0; i < shoppingList.length; i++) {
            let currentItem = shoppingList[i]
            appendItemToShoppingListEl(currentItem)
        }
    } else {
        shoppingList.innerHTML = `<li class="noItem">No Items here yet...</li>`
    }
})

function clearInputEl() {
    inputFieldEl.value = ""
}

function clearShoppingListEl() {
    shoppingList.innerHTML = ""
}

function appendItemToShoppingListEl(item){
    
    let itemID = item[0];
    let itemValue = item[1];

    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue

    newEl.addEventListener("dblclick", function(){
        let exactLocationOfItem = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItem)
    })

    shoppingList.append(newEl)
}