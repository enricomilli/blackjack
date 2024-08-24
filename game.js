"use strict";
import blackjackdeck from './deck'

const houseEl = document.getElementById("house-el")
let houseCards = []
let houseSum = 0
const houseSumEl = document.getElementById("housesum-el")
const startBtn = document.getElementById("start-btn");
const newcardBtn = document.getElementById("newcard-btn")
const stayBtn = document.getElementById("stay-btn")
let playerCards = []
let playerSum = 0
const playerSumEl = document.getElementById("sum-el")
const playerCardsEl = document.getElementById("cards-el")
let isAlive = false
let message = ""
const messageEl = document.getElementById("message-el")
const bjHeader = document.getElementById('blackjack-header')

function startGame(){
    bjHeader.style.fontSize = '50px'
    buttonRefresh()
    isAlive = true
    playerSum = 0
    houseSum = 0
    playerCards = []
    fetchCard(playerCards)
    fetchCard(playerCards)
    houseCards = []
    fetchCard(houseCards)
    houseSum = findPlayerSum(houseCards)
    message = `Would you like to hit or stay?`
    renderGame()
}

function renderGame(){
    if (playerCards.includes(undefined) || houseCards.includes(undefined)){
        location.reload()
        console.log('Error with playing cards')
    }
    playerSum = findPlayerSum(playerCards)
    houseEl.innerHTML = `<p>House cards: ${houseSum}</p>` + gatherImg(houseCards) + `<img src='./images/${blackjackdeck[13].image}' class='card-img'</img>`
    playerCardsEl.innerHTML = `<p>Your cards: ${playerSum}</p>` + gatherImg(playerCards)
    if (playerSum === 21) {
        message = `You've got Blackjack!`
    } else if (playerSum < 21) {
        message = `Would you like to hit or stay?`
    } else {
        message = `You're OUT!`
        isAlive = false
    }
    messageEl.textContent = message
    buttonRefresh()
}

function gatherImg(type){
    let hc = ``
    for (let c of type){
        hc +=`<img src='/images/${c.image}' class='card-img'</img>`
    }
    return hc
}

function fetchCard(array){
    const getNumber = Math.floor((Math.random() * blackjackdeck.length) - 1)
    array.push(blackjackdeck[getNumber])
}

function findPlayerSum(playerCardsArray) { 
    let total = 0
    console.log(playerCardsArray)
    playerCardsArray.map( cardObj => {
        console.log(cardObj.cardsum)
        total += cardObj.cardsum
    })
    return total
}

function buttonRefresh() {
    if (isAlive === true) {
        startBtn.style.display = 'none';
        newcardBtn.style.display = 'inline';
        stayBtn.style.display = 'inline';
        document.getElementById('another-round').style.display = `none`
    } else {
        startBtn.style.display = 'inline';
        newcardBtn.style.display = 'none';
        stayBtn.style.display = 'none';
        document.getElementById('another-round').style.display = `inline`
    }
}

function hit() {
    fetchCard(playerCards)
    renderGame()
}

function gameOn() {
    fetchCard(houseCards)
    houseSum = findPlayerSum(houseCards)
    houseEl.innerHTML = `<p>House cards: ${houseSum}</p>` + gatherImg(houseCards)
    if (playerSum > 21) {
        message = "You're out of the game!"
        isAlive = false
    } else if (houseSum < playerSum && houseSum <22) { 
        gameOn()
    } else if (houseSum <= 21 && houseSum > playerSum) {
        message = "You're out of the game!"
        isAlive = false
    } else if (playerSum <= 21 && playerSum > houseSum) {
        message = "You're have WON the game!"
        isAlive = false
    } else if (playerSum === houseSum){ 
        message = "You're have TIED!"
        isAlive = false
    } else if (houseSum > 21) {
        message = "You're have WON the game!"
        isAlive = false
    }
    messageEl.textContent = message
    buttonRefresh()
}