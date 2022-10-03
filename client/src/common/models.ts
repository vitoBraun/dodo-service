export interface UserInfo {
  id: number;
  formatted_name: string;
  user_type: "admin" | "manager" | "operator" | "engineer";
  email?: string;
}

type Status = "new" | "work" | "completed" | "closed";

export interface Order {
  _id: string;
  status: Status;
  author: string;
  executor?: string;
  branch: string;
  operatorsComment?: string;
  created: string;
  takenToWork?: string;
  completed?: string;
  description: string;
  faultIndex: number;
  photoUrl: string;
  photoUrlWorkComplete?: string;
}
