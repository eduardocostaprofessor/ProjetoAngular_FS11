import { Component, OnInit } from '@angular/core';

// import dos ícones
import { faUser, faLock, faN } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //insetar o user service 
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  userModel = new User()
  mensagem = ""
  faUser = faUser
  faLock = faLock

  helloWorld() {
    console.log('Hello Funcionando');

  }

  validarLogin(): boolean {

    let blackList = ["SELECT", "OR", ' ""="" ', "-- ", ";", "1 = 1", "1=1", "DROP", "\"\"=\"\"", "'='"];//lista de palavras chave

    let ataque = 0;

    blackList.forEach((palavra) => {//passa por cada palavra - parecido com um form
      if (this.userModel.email?.toUpperCase().includes(palavra)) {//se o que foi digitado é igual à palavra da balcklist
        ataque++;//conta mais uma palavra proibida
      }
    })


    if (
      ataque > 0 ||
      this.userModel.email === "" || this.userModel.email === undefined ||
      this.userModel.password === "" || this.userModel.password === undefined
    ) {//não pode logar/ chamar a api
      return false;
    } else {
      return true;
    }

  }




  fazerLogin() {

    // console.log('DADOS', this.userModel);
    //clicando no send do insomnia
    // this.userService.login(this.userModel).subscribe(fnOK, fnErr)
    // this.userService.login(this.userModel).subscribe({next: fnSuccess, next: fnSuccess})




    if (this.validarLogin()) {//pode logar
      this.userService.login(this.userModel).subscribe({
        next: (response) => {
          this.mensagem = "Login efetuado com sucesso"
        },
        error: (responseError) => {
          console.log("MENSAGNES DE ERRO", responseError);

          let txtErro = responseError.error//mensage de erro em inglês

          if (txtErro == "Cannot find user") {
            this.mensagem = "Usuário Inválido"
          } else if (txtErro == "Incorrect password") {
            this.mensagem = "Senha Inválida"
          } else if (txtErro == "Password is too short") {
            this.mensagem = "Senha muito curta"
          } else if (txtErro == "Email and password are required") {
            this.mensagem = "Preencher todos os campos"
          } else if (txtErro == "Email format is invalid") {
            this.mensagem = "Formato de email inválido"
          } else {
            this.mensagem = "Erro Genérico! Entrar em contato com o admnistrador do sistema"
          }

        }
      })
    } else {//não pode logar ou está sob ataque

      this.mensagem = "Preencher os dados corretamente!!!!!!!"

    }





  } //fim da função




  // (response) => {
  //   console.log(response);
  //   this.mensagem = "Login efetuado com sucesso"

  //       // console.log("Status Code", response.status);
  //       // console.log("Status Text", response.statusText);
  //       // console.log("Access Token", response.body.accessToken);
  //       // console.log("Usuário retornado", response.body.user);

  //   },  (responseError) => {
  //     console.log('ERROOOOOOOOOOO', responseError);
  //     this.mensagem = responseError.error

  //   }











}
