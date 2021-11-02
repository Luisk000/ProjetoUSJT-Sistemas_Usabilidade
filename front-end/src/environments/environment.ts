// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //Microsservicos
  apiVagasUsuario: 'http://localhost:6000/vagasUsuario/',
  apiCadastroUsuario: 'http://localhost:4000/cadastroUsuario/',
  apiVagasAdmin: 'http://localhost:5000/vagasAdmin/',
  apiCadastroAdmin: 'http://localhost:3000/cadastroAdmin/',
  //Monolito
  apiVagasUsuarioMonolito: 'http://localhost:8000/vagasUsuario/',
  apiCadastroUsuarioMonolito: 'http://localhost:8000/cadastroUsuario/',
  apiVagasAdminMonolito: 'http://localhost:8000/vagasAdmin/',
  apiCadastroAdminMonolito: 'http://localhost:8000/cadastroAdmin/',
  apiAutenticacaoAdminMonolito: 'http://localhost:8000/users/',
  apiAutenticacaoUsuarioMonolito: 'http://localhost:8000/users/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
