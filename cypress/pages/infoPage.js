class InfoPage {

    selectorsList () {
        const selectors = {
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

            return selectors	
    }	

        fillPersonalDetails(firstname, lastname) {
            cy.get(this.selectorsList().firstNameField).clear().type(firstname)
            cy.get(this.selectorsList().lastNameField).clear().type(lastname)
        }

        fillEmploeeDetails(id, other_id, licence, date, test_Field) {
            cy.get(this.selectorsList().genericField).eq(3).clear().type(id) //id
            cy.get(this.selectorsList().genericField).eq(4).clear().type(other_id) //other id
            cy.get(this.selectorsList().genericField).eq(5).clear().type(licence) //Driver's License Number
            cy.get(this.selectorsList().dateField).eq(0).clear().type(date) //campo de data 1
            cy.get(this.selectorsList().dateCloseButton).click()
            cy.get(this.selectorsList().genericField).eq(8).clear().type(test_Field)
            cy.get(this.selectorsList().secondCombobox).eq(0).click() // escolha do sexo
            
        }

        fillStatus() {
            cy.get(this.selectorsList().genericCombobox).eq(0).click({ force: true }) // escolha do país
            cy.get(this.selectorsList().firstItemCombobox).click()
            cy.get(this.selectorsList().genericCombobox).eq(1).click({ force: true })// escolha do estado civil
            cy.get(this.selectorsList().secondItemCombobox).click()
        }

        
        saveForm() {
            cy.get(this.selectorsList().submitButton).eq(1).click({ force: true }) //Botão salvar
            cy.get('body').should('contain', 'Successfully Saved')
            cy.get('.oxd-toast-close') //confirmação mensagem de sucesso
        }










}

export default InfoPage