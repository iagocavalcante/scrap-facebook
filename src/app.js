const puppeteer = require('puppeteer')
require('dotenv').config()

let scrape = async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  console.log(process.env.FACEBOOK_URL)
  await page.goto(process.env.FACEBOOK_URL)

  await page.type('#email', process.env.FACEBOOK_LOGIN)
  await page.type('#pass', process.env.FACEBOOK_PASSWORD)

  await page.click('[data-testid="royal_login_button"]')
  
  await page.waitFor(5000)
  
  await page.goto(process.env.URL_PROFILE_LINK)

  await page.waitFor(5000)
    
  await page.click('[data-tab-key="photos"]')

  const teste = []

  await page.waitFor(10000)
  
  await page.evaluate(() => {
    const ulImages = document.querySelector('.fbStarGrid')
    ulImages.children.forEach((image) => {
      teste.push(image.dataset.starredSrc)
    })
  })

  return teste
}

scrape().then((value) => {
  console.log(value) // Success!
})