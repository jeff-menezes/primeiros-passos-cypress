import userData from '../fixtures/userData.json'
import LoginPage from '../pages/loginPage.js'
import DashboardPage from '../pages/dashboardPage.js'
import MenuPage from '../pages/menuPage.js'

const loginPage = new LoginPage()
const dashboardPage = new DashboardPage()
const menuPage = new MenuPage

describe('Orange HRM Tests', () => {

  const selectorsList = {
    
    firstNameField: "[name='firstName']",
    lastNameField: "[name='lastName']",
    genericField: ".oxd-input--active",//posição 1 não existe no código
    genericCombobox: ".oxd-select-text--arrow",
    firstItemCombobox: ".oxd-select-dropdown > :nth-child(25) > span", // país
    secondItemCombobox: ".oxd-select-dropdown > :nth-child(3)", // estado cicil
    secondCombobox: ":nth-child(2) > :nth-child(2) > .oxd-radio-wrapper > label", // sexo
    dateField: "[placeholder='yyyy-dd-mm']",
    dateCloseButton: ".--close",
    submitButton: "[type='submit']",
    selectList: ".oxd-select-text--arrow",
  }

  it.only('User Info Update - success', () => {
    loginPage.accessLoginPage()
    loginPage.loginWithAnyUser(userData.userSuccess.username, userData.userSuccess.password)
    
    dashboardPage.checkDashboardPage()

    menuPage.accessMyInfo()
    
   
    cy.get(selectorsList.firstNameField).clear().type('firstnametest')
    cy.get(selectorsList.lastNameField).clear().type('lastnametest')
    cy.get(selectorsList.genericField).eq(3).clear().type('ID_1')//id
    cy.get(selectorsList.genericField).eq(4).clear().type('ID_other')//other id
    cy.get(selectorsList.genericField).eq(5).clear().type('License_test')//Driver's License Number
    cy.get(selectorsList.dateField).eq(0).clear().type('2026-09-14')//campo de data 1
    cy.get(selectorsList.dateCloseButton).click()
    cy.get(selectorsList.genericField).eq(8).clear().type('test_123')//Test_Field

    cy.get(selectorsList.genericCombobox).eq(0).click({ force: true }) // escolha do país
    cy.get(selectorsList.firstItemCombobox).click()
    cy.get(selectorsList.genericCombobox).eq(1).click({ force: true })// escolha do estado civil
    cy.get(selectorsList.secondItemCombobox).click()
    cy.get(selectorsList.secondCombobox).eq(0).click() // escolha do sexo
    
    
    cy.get(selectorsList.submitButton).eq(1).click()//Botão salvar
    cy.get('body').should('contain', 'Successfully Updated')
    cy.get('.oxd-toast-close')//confirmação mensagem de sucesso
   
  })

    it('Login - Fail', () => {
    cy.visit('/auth/login')
    cy.get(selectorsList.usernameField).type(userData.userFail.username)
    cy.get(selectorsList.passwordField).type(userData.userFail.password)
    cy.get(selectorsList.loginButton).click()
    cy.get(selectorsList.wrongCredentialAlert)   
  })
})