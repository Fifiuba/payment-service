class AlreadyExistingWallet extends Error {
    constructor(message) {
      super(message);
      this.name = 'AlreadyExistingWallet';
      this.code = 500;
    }
}