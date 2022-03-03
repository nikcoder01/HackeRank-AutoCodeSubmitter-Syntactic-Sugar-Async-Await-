
// hackerrank automation project using ASYNC AWAIT

const loginLink = "https://www.hackerrank.com/auth/login";
const puppeteer = require('puppeteer')    //using puppeteer node module 

const codeFile = require('./code') // Importing module for codeFiles under solutions in code.js

//puppeteer module fullly based on promises
let page

// let email="teboka3579@petloca.com"
let email = "galad95077@toudrum.com"
let password = "lolololo"
console.log("before");

/***** */
(async function ()  //iife
{
    try {
        let browserwillOpen = await puppeteer.launch({
            headless: false,
            defaultViewport: null,   // passing resolution for full screen
            args: ['--start-maximized']   // rgs also to set full screen dimension in object
        })


        let newTab = await browserwillOpen.newPage()  //opens new tab in browseer
        await newTab.goto(loginLink)   // opens new page with given link
        await newTab.type("input[id='input-1']", email, { delay: 100 });
        await newTab.type("input[id='input-2']", password, { delay: 100 });   // toring to input password using .type() function of puppeteer
        await newTab.click("button[data-analytics='LoginPassword']", { delay: 100 })  // .click() used for clicking on the selected selector parameter
        await waitandClick('a[data-cd-topic-slug="algorithms"]', newTab)  //waiitandClick is user defined function, to wait before findinf Selector
        await waitandClick('input[value="warmup"]', newTab) // wait and click function executed
        let ChallengesArr = await newTab.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled', { delay: 100 });
        console.log("Array Length ---->" + ChallengesArr.length)
        await questionSolver(newTab, ChallengesArr[0], codeFile.answers[0])

    }
    catch (error) {
        console.log(error)
    }
})();    // ; is compulsary in iife


async function questionSolver(page, question, answer) {
    await question.click()  // .click in puppeteer to click on question
    await waitandClick('.monaco-editor.no-user-select.vs', page);// to go to the Editor Text Section
    await waitandClick("input[type='checkbox']", page);
    await page.waitForSelector('.input.text-area.custominput.auto-width') // Selecting input area
    await page.type('.input.text-area.custominput.auto-width', answer, { delay: 10 }); //typing the code from code.js

    await page.keyboard.down('Control') //Syntax to press ctrl
    await page.keyboard.press('A', { delay: 100 });  //Syntax to press A (select all text)
    await page.keyboard.press('X', { delay: 100 });   //Syntax to press X (cut all text)
    await page.keyboard.up('Control')   //Syntax to unpress ctrl (unpress ctrl)
    await waitandClick('.monaco-editor.no-user-select.vs', page); // Again heading to editor area

    await page.keyboard.down('Control') //Syntax to press ctrl
    await page.keyboard.press('A', { delay: 100 });   //Syntax to press A (select all text)
    await page.keyboard.press('V', { delay: 100 });   //Syntax to press A (select all text)
    await page.keyboard.down('Control') //Syntax to press ctrl
    await page.click('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled', { delay: 50 })
}


async function waitandClick(selector, cpage) {
    await cpage.waitForSelector(selector)
    //waitForSelector is puppeteer function for waiting before html and selecting selector
    await cpage.click(selector, { delay: 100 });
}
console.log("after")