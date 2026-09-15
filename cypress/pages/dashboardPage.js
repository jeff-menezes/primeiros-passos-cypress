class DashboardPage {

    selectorsList () {
        const selectors = {
            dashboarGrid: ".orangehrm-dashboard-grid",     
        }

        return selectors	
    }	

    checkDashboardPage() {
        cy.location('pathname').should('equal', '/web/index.php/dashboard/index')
        cy.get(this.selectorsList().dashboarGrid).should('be.visible')
    }
}

export default DashboardPage