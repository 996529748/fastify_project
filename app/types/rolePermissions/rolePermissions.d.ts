
interface UserRolePermissions {
  userId:string,
  role:UserRolePermissionsRole
}
//角色权限列表
type UserRolePermissionsRole = 'admin' | 'member' | null;

// 选项化用户角色权限
type OptionalUserRolePermissions = Partial<UserRolePermissions>;

interface UserRolePermissionsInfo {
  userId:string,
}
