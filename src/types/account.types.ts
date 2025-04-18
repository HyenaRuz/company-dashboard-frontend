import { TCompany } from "./company.types";

type TAccount = {
  id: number;
  email: string;
  username: string;
  role: string;
  avatarUrl?: string;
  createdAt: Date;
  companiesCount?: number;
  companies?: TCompany[];
};

export type { TAccount };
