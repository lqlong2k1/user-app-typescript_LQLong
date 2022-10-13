export interface IUser {
    readonly _id?: string;
    username: string;
    password: string;
    name: string;
    dob: Date;
    address: string;
    phoneNumber: string;
    roles: string;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: Number;
}

