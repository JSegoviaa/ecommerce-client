export interface RolesResp {
  ok: boolean;
  msg: string;
  roles: Roles[];
}

export interface Roles {
  id: RoleID;
  role: Role;
}

export type RoleID = 1 | 2 | 3 | 4 | 5;

export type Role =
  | 'Super Administrador'
  | 'Administrador'
  | 'Moderador'
  | 'Usuario'
  | 'Distribuidor';
