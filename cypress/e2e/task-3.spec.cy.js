import data from "../fixtures/example.json";

  describe('Homework Task 3', () => {

    const baseUrl = Cypress.config('baseUrl');

    it('Create user', () =>{

        cy.request({
          method: 'POST',
          url: '/user',
          body: {
              "id": data.id,
              "username" : data.userName,
              "firstName": data.firstName,
              "lastName": data.lastName,
              "email": data.email,
              "password": data.password,
              "phone": data.phone,
              "userStatus": 0
            }

        }).then((response) =>{
          expect(response.status).to.eq(200);
        })

    })

    it('Verify created user', () =>{

      cy.request('GET','/user/Dzo').then((response) =>{
        expect(response.status).to.eq(200);
        expect(response.body.username).to.eq(data.userName);
      })
      
    })

    it('Login user', () =>{

      cy.request({
        method: 'GET',
        url: '/user/login',
        body: {
            "username": data.userName,
            "password": data.password,
          }

      }).then((response) =>{
        expect(response.status).to.eq(200)
        expect(response.body.message).to.contain('logged in user session:')
      })

    })

    it('Creating list of user', () =>{

      cy.request({
        method: 'POST',
        url: '/user/createWithList',
        body: 
          [
            {
              "id": data.id2,
              "username": data.userName2,
              "firstName": data.firstName2,
              "lastName": data.lastName2,
              "email": data.email2,
              "password": data.password,
              "phone": data.phone2,
              "userStatus": 0
            },

            {
              "id": data.id3,
              "username": data.username3,
              "firstName": data.firstName3,
              "lastName": data.lastName3,
              "email": data.email3,
              "password": data.password,
              "phone": data.phone3,
              "userStatus": 0
            },

          ]

      }).then((response) =>{
        expect(response.status).to.eq(200)
      })

    })

    it('Verify users created through list', () =>{

      cy.request('GET',`/user/${data.userName2}`).then((response) =>{
        expect(response.status).to.eq(200);
        expect(response.body.username).to.eq(data.userName2);
      })

      cy.request('GET',`/user/${data.username3}`).then((response) =>{
        expect(response.status).to.eq(200);
        expect(response.body.username).to.eq(data.username3);
      })
      
    })

    it('Logout user', () =>{

      cy.request({
        method: 'GET',
        url: '/user/login',
        body: {
            "username": data.userName,
            "password": data.password,
          }

      }).then((response) =>{
        expect(response.status).to.eq(200)
        expect(response.body.message).to.contain('logged in user session:')
      })

      cy.request({method: 'GET', url: 'user/logout'}).then((response) =>{
        expect(response.status).to.eq(200)
        expect(response.body.message).not.to.contain('logged in user session:')
      })

    })

    it('Add new pet', () =>{

      cy.request({
        method: 'POST',
        url: '/pet',
        body: {
          "id": data.petId,
          "category": {
            "id": 1,
            "name": data.categoryName
          },
          "name": data.petName,
          "photoUrls": [
            data.petPhotoUrl
          ],
          "tags": [
            {
              "id": 1,
              "name": data.tagName
            }
          ],
          "status": data.petStatusAvailable
        }

      }).then((response) =>{
        expect(response.status).to.eq(200)
        expect(response.body.category.name).to.eq(data.categoryName)
        expect(response.body.name).to.eq(data.petName)
      })

    })

    it('Update pet image', () =>{

      cy.request({
        method: 'PUT',
        url: '/pet',
        body: {
          "id": data.petId,
          "category": {
            "id": 1,
            "name": data.categoryName
          },
          "name": data.petName,
          "photoUrls": [
            data.petPhotoUrlUpdated
          ],
          "tags": [
            {
              "id": 1,
              "name": data.tagName
            }
          ],
          "status": data.petStatusAvailable
        }

      }).then((response) =>{
        expect(response.status).to.eq(200)
        expect(response.body.photoUrls).to.include(data.petPhotoUrlUpdated)
        expect(response.body.photoUrls).not.to.include(data.petPhotoUrl)
      })

    })

    it('Update pet name and status', () =>{

      cy.request({
        method: 'PUT',
        url: '/pet',
        body: {
          "id": data.petId,
          "category": {
            "id": 1,
            "name": data.categoryName
          },
          "name": data.petNameUpdated,
          "photoUrls": [
            data.petPhotoUrlUpdated
          ],
          "tags": [
            {
              "id": 1,
              "name": data.tagName
            }
          ],
          "status": data.petStatusSold
        }

      }).then((response) =>{
        expect(response.status).to.eq(200)
        expect(response.body.name).to.eq(data.petNameUpdated)
        expect(response.body.status).to.eq(data.petStatusSold)
      })

    })

    it('Delete pet', () =>{

      cy.request({
        method: 'DELETE',
        url: `/pet/${data.petId}`,

      }).then((response) =>{
        expect(response.status).to.eq(200)
      })

    })

    it('Check if pet is deleted', () =>{

      cy.request({
        method: 'GET',
        url: `/pet/${data.petId}`,
        failOnStatusCode: false

      }).then((response) =>{
        expect(response.status).to.eq(404)
        expect(response.body.message).to.eq('Pet not found')
      })

    })
})
