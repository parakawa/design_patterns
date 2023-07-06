// npx ts-node filename.ts
class AccountBank {
  private idAccount: Number;
  private accountAmount: Number;

  constructor(idAccount: Number, accountAmount: Number) {
    this.idAccount = idAccount;
    this.accountAmount = accountAmount;
  }

  public getAmount(): Number {
    return this.accountAmount;
  }
  public setAmount(amount: Number) {
    this.accountAmount = amount;
  }
  public setIdAccount(idAccount: Number) {
    this.idAccount = idAccount;
  }
}

interface IAccountBank {
  outMoney(account: AccountBank, amount: Number);
  inMoney(account: AccountBank, amount: Number);
  showMoney(account: AccountBank);
}

class Esebankerito implements IAccountBank {
  public outMoney(account: AccountBank, amount: Number) {
    const currentAmount = Number(account.getAmount()) - (amount as number);
    account.setAmount(currentAmount);
    console.log("Saldo actual:", account.getAmount());
    return account;
  }
  public inMoney(account: AccountBank, amount: Number) {
    const currentAmount = Number(account.getAmount()) + (amount as number);
    account.setAmount(currentAmount);
    console.log("Saldo actual:", account.getAmount());
    return account;
  }
  public showMoney(account: AccountBank) {
    console.log("Saldo actual:", account.getAmount());
  }
}

class Otrobankerito implements IAccountBank {
  public outMoney(account: AccountBank, amount: Number) {
    const currentAmount = Number(account.getAmount()) - (amount as number) - 10;
    account.setAmount(currentAmount);
    console.log("Saldo actual:", account.getAmount());
    return account;
  }
  public inMoney(account: AccountBank, amount: Number) {
    const currentAmount = Number(account.getAmount()) + (amount as number) + 10;
    account.setAmount(currentAmount);
    console.log("Saldo actual:", account.getAmount());
    return account;
  }
  public showMoney(account: AccountBank) {
    console.log("Saldo actual:", account.getAmount());
  }
}

class ProxyBank implements IAccountBank {
  private realAccount: Esebankerito;

  public outMoney(account: AccountBank, amount: Number) {
    console.log("____cuenta proxy_____retirar dinero____");
    if (!this.realAccount) {
      this.realAccount = new Esebankerito();
    }
    return this.realAccount.outMoney(account, amount);
  }

  public inMoney(account: AccountBank, amount: Number) {
    console.log("____cuenta proxy_____depositar dinero____");
    if (!this.realAccount) {
      this.realAccount = new Esebankerito();
    }
    return this.realAccount.inMoney(account, amount);
  }

  public showMoney(account: AccountBank) {
    console.log("____cuenta proxy_____mostrar saldo____");
    if (!this.realAccount) {
      this.realAccount = new Esebankerito();
    }
    return this.realAccount.showMoney(account);
  }
}

function clientApp() {
  const acc = new AccountBank(1, 100);
  const accProxy = new ProxyBank();
  accProxy.showMoney(acc);
  accProxy.inMoney(acc, 50);
  accProxy.outMoney(acc, 20);
}

clientApp();
