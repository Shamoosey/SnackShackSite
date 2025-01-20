import { TransactionType } from "./Enums/TransactionType";

export interface UpdateAccountRequest {
  userId: string,
  accountId: string,
  amount: number,
  notes: string,
  transactionType: TransactionType
}