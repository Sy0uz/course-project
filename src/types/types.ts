export interface IClient {
    driverLicenceNumber: string;
    fullName: string;
    passportData: string;
    address: string;
}

export interface ICar {
    registrationNumber: string;
    brand: string;
    color: string;
    year: number;
    isAvailable: boolean;
}

export interface IRent {
    client: IClient;
    registrationNumber: string;
    issueDate: string;
    returnDate: string;
}
