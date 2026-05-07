import { UserStatus } from "@prisma/client";


export class User {
  id!: string;
  name!: string;
  email!: string;
  phone?: string;
  password?: string;
  role!: string;
  status!: UserStatus;
  createdAt!: Date;
  updatedAt!: Date;
}

// export class UserComplete {
//   id: number;
//   name: string;
//   email: string;
//   password?: string;
//   role: string;
//   groupId: number | null;
//   groupName: string | null;
//   companyCode: number | null;
//   companyName: string | null;
//   state: boolean;
//   createdAt: Date;
//   updatedAt: Date;
// }
