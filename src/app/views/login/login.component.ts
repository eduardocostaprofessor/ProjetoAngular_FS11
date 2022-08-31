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

  fazerLogin() {

    // console.log('DADOS', this.userModel);
    //clicando no send do insomnia
    // this.userService.login(this.userModel).subscribe(fnOK, fnErr)
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

  }




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
