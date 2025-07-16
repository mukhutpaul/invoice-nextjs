import { Invoice as PrismaInvoice } from "@/app/generated/prisma";
import { InvoiceLine } from "./app/generated/prisma";


export interface Invoice extends PrismaInvoice {
  lines: InvoiceLine;
}

export interface Totals {
  totalHT: number;
  totalVAT: number;
  totalTTC: number;
}
