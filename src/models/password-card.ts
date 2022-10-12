class PasswordCard {
  id: string;
  serviceName: string;
  password: string;

  constructor(serviceName: string, password: string) {
    this.id = new Date().toISOString();
    this.serviceName = serviceName;
    this.password = password;
  }
}

export default PasswordCard;
