import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from "typeorm";
import { TransactionType, TransactionStatus } from "../types/enums";

@Entity("transactions")
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "user_id", type: "uuid" })
  @Index("idx_transactions_user_id")
  userId!: string;

  @Column({
    type: "enum",
    enum: TransactionType,
  })
  @Index("idx_transactions_type")
  type!: TransactionType;

  @Column({ type: "decimal", precision: 18, scale: 4 })
  amount!: string;

  @Column({ name: "stellar_tx_hash", type: "varchar", length: 64, nullable: true })
  stellarTxHash!: string | null;

  @Column({
    type: "enum",
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  })
  @Index("idx_transactions_status")
  status!: TransactionStatus;

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  timestamp!: Date;

  @ManyToOne("User", "transactions", { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user!: import("./User.model").User;
}
