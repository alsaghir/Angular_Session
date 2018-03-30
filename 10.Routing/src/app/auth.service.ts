export class AuthService {
  loggedIn = false;

  isAuthenticated() {
    const promise = new Promise( // constructor of Promise
        (resolve, reject) => {  // Anon method ES6 style (typescript as well)
                  setTimeout(  () => { resolve(this.loggedIn); }   , 800);
                              }
    );
    return promise;
  }

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }
}
