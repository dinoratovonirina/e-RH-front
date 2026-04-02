import { Routes } from "@angular/router";
import { UserList } from "./components/user-list/user-list";
import { authGuard } from "../../core/guards/auth-guard";
import { UserAdd } from "./components/user-add/user-add";

export const user_routes: Routes = [
    {
        path: 'user-list',
        component: UserList,
        canActivate: [authGuard]
    },
    {
        path: 'user-add',
        component: UserAdd,
        canActivate: [authGuard]
    }
];