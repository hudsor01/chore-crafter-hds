
export type UserRole = 'parent' | 'child';

export interface UserPermissions {
  canCreateCharts: boolean;
  canEditCharts: boolean;
  canDeleteCharts: boolean;
  canAssignChores: boolean;
  canCompleteChores: boolean;
  canVerifyCompletions: boolean;
  canViewReports: boolean;
  canManageChildren: boolean;
}

export const getPermissionsForRole = (role: UserRole): UserPermissions => {
  switch (role) {
    case 'parent':
      return {
        canCreateCharts: true,
        canEditCharts: true,
        canDeleteCharts: true,
        canAssignChores: true,
        canCompleteChores: false,
        canVerifyCompletions: true,
        canViewReports: true,
        canManageChildren: true,
      };
    case 'child':
      return {
        canCreateCharts: false,
        canEditCharts: false,
        canDeleteCharts: false,
        canAssignChores: false,
        canCompleteChores: true,
        canVerifyCompletions: false,
        canViewReports: false,
        canManageChildren: false,
      };
    default:
      return {
        canCreateCharts: false,
        canEditCharts: false,
        canDeleteCharts: false,
        canAssignChores: false,
        canCompleteChores: false,
        canVerifyCompletions: false,
        canViewReports: false,
        canManageChildren: false,
      };
  }
};
