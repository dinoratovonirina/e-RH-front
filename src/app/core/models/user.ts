import { Departement } from "./departement";
import { Role } from "./role";

export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    role: Role;
    departement: Departement;
}