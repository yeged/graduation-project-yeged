class Ticket {
  constructor(
    id,
    firstName,
    lastName,
    age,
    tcNo,
    address,
    application,
    applicationNo,
    isClosed,
    response,
    createdAt,
    respondAt,
    file
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.tcNo = tcNo;
    this.address = address;
    this.application = application;
    this.applicationNo = applicationNo;
    this.isClosed = isClosed;
    this.response = response;
    this.createdAt = createdAt;
    this.respondAt = respondAt;
    this.file = file;
  }
}

export default Ticket;
