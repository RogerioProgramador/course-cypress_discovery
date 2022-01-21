import SignupPage from '../pages/SignupPage'
import signupFactory from '../factories/SignupFactory'

describe('Signup', ()=> {

    it('User should be a deliveryman', function() {
        
        var deliver = signupFactory.deliver()

        SignupPage.go()
        SignupPage.fillForm(deliver)
        SignupPage.submit()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        SignupPage.modalContentShouldBe(expectedMessage)        
    })

    it('Invalid Document', function() {

        var deliver = signupFactory.deliver()

        deliver.cpf = '000000141aa'

        SignupPage.go()
        SignupPage.fillForm(deliver)
        SignupPage.submit()
        SignupPage.alertMessageShouldBe('Oops! CPF inválido')
    })

    it('Invalid Email', function() {

        var deliver = signupFactory.deliver()

        deliver.email = 'user.com.br'

        SignupPage.go()
        SignupPage.fillForm(deliver)
        SignupPage.submit()
        SignupPage.alertMessageShouldBe('Oops! Email com formato inválido.')
    })

    /*
        Frameworks de testes costumam ser procedurais, ou seja, param quando algo errado acontece,
        porém há casos que seria legal continuar o teste validando os campos restantes. Para isso
        temos esse exemplo utilizando contexto.

        Abaixo temos comentado como seria feito o teste da forma padrão. dessa forma caso ocorresse
        um erro, o teste pararia e não seriam testados os campos restantes.
    */
    context('Required Fields', ()=> {

        const messages = [
            {field: 'name', output: 'É necessário informar o nome'},
            {field: 'cpf', output: 'É necessário informar o CPF'},
            {field: 'email', output: 'É necessário informar o email'},
            {field: 'postalcode', output: 'É necessário informar o CEP'},
            {field: 'number', output: 'É necessário informar o número do endereço'},
            {field: 'delivery_method', output: 'Selecione o método de entrega'},
            {field: 'cnh', output: 'Adicione uma foto da sua CNH'}
        ]

        before(()=> {
            SignupPage.go()
            SignupPage.submit()
        })

        messages.forEach((msg)=> {

            it(`${msg.field} is required`, ()=> {
                SignupPage.alertMessageShouldBe(msg.output)
            }) 

        })
    })

    /*
        it('Required Fields', function() {
            SignupPage.go()
            SignupPage.submit()
            SignupPage.alertMessageShouldBe('É necessário informar o nome')
            SignupPage.alertMessageShouldBe('É necessário informar o CPF')
            SignupPage.alertMessageShouldBe('É necessário informar o e-mail')
            SignupPage.alertMessageShouldBe('É necessário informar o CEP')
            SignupPage.alertMessageShouldBe('É necessário informar o número do endereço')
            SignupPage.alertMessageShouldBe('Selecione o método de entrega')
            SignupPage.alertMessageShouldBe('Adicione uma foto da sua CNH')
        })
    */

})

/*
    before(()=> {
        cy.log('Tudo aqui é executado uma única vez ANTES de TODOS os casos de testes')
    })

    beforeEach(()=> {
        cy.log('Tudo aqui é executado sempre ANTES de CADA caso de teste')

    })

    afterEach(() => {
        
        cy.log('Tudo aqui é executado sempre DEPOIS de CADA caso de teste')
    });

    after(()=> {
        cy.log('Tudo aqui é executado uma única vez DEPOIS de TODOS os casos de testes')

    })
*/
