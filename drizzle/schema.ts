import { pgTable, serial, text, timestamp, varchar, integer, decimal, boolean, pgEnum, date } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

/**
 * Core user table backing auth flow.
 * Columns use camelCase to match both database fields and generated types.
 */
export const userRoleEnum = pgEnum("user_role", ["usuario", "gestor"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: userRoleEnum("role").default("usuario").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
  phone: varchar("phone", { length: 20 }),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Enums para Reservas
export const reservationStatusEnum = pgEnum("reservation_status", [
  "pending_docs",
  "pending_review",
  "pending_signature",
  "contract_signed",
  "withdrawal"
]);

// Tabela de Reservas
export const reservations = pgTable("reservations", {
  id: serial("id").primaryKey(),
  propertyCode: varchar("propertyCode", { length: 100 }).notNull(),
  address: text("address"),
  clientName: varchar("clientName", { length: 255 }).notNull(),
  clientPhone: varchar("clientPhone", { length: 20 }),
  ownerName: varchar("ownerName", { length: 255 }),
  ownerPhone: varchar("ownerPhone", { length: 20 }),
  consultantName: varchar("consultantName", { length: 255 }),
  reservedAtDate: timestamp("reservedAtDate"),
  status: reservationStatusEnum("status").default("pending_docs"),
  docsSubmittedAt: timestamp("docsSubmittedAt"),
  contractSignedAt: timestamp("contractSignedAt"),
  leaseValue: decimal("leaseValue", { precision: 12, scale: 2 }),
  guaranteeType: varchar("guaranteeType", { length: 100 }),
  isSiteActive: boolean("isSiteActive").default(true),
  createdBy: integer("createdBy"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type Reservation = typeof reservations.$inferSelect;
export type InsertReservation = typeof reservations.$inferInsert;

// Enums para Contratos
export const contractStatusEnum = pgEnum("contract_status", [
  "pendente_elaboracao",
  "em_elaboracao",
  "contrato_enviado",
  "contrato_assinado",
  "troca_titularidade_pagamento",
  "concluido"
]);

export const locacaoTipoEnum = pgEnum("locacao_tipo", ["comercial", "residencial"]);

// Tabela de Contratos
export const contracts = pgTable("contracts", {
  id: serial("id").primaryKey(),
  clientName: varchar("clientName", { length: 255 }).notNull(),
  clientPhone: varchar("clientPhone", { length: 20 }),
  clientEmail: varchar("clientEmail", { length: 255 }),
  status: contractStatusEnum("status").default("pendente_elaboracao"),
  locacaoTipo: locacaoTipoEnum("locacaoTipo"),
  garantia: varchar("garantia", { length: 100 }),
  endereco: text("endereco"),
  cep: varchar("cep", { length: 20 }),
  valorAluguel: decimal("valorAluguel", { precision: 12, scale: 2 }),
  condominio: decimal("condominio", { precision: 12, scale: 2 }),
  proprietario: varchar("proprietario", { length: 255 }),
  observacoes: text("observacoes"),
  dataInicioContrato: timestamp("dataInicioContrato"),
  createdBy: integer("createdBy"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type Contract = typeof contracts.$inferSelect;
export type InsertContract = typeof contracts.$inferInsert;

// Enums para Chaves
export const personTypeEnum = pgEnum("person_type", [
  "cliente",
  "prestador",
  "proprietario",
  "vistoriador",
  "corretor"
]);

export const keyStatusEnum = pgEnum("key_status", ["retrieved", "returned"]);
export const returnPolicyEnum = pgEnum("return_policy", ["retorna", "fica"]);

// Tabela de Chaves
export const keys = pgTable("keys", {
  id: serial("id").primaryKey(),
  keyCode: varchar("keyCode", { length: 100 }).notNull().unique(),
  clientName: varchar("clientName", { length: 255 }).notNull(),
  clientPhone: varchar("clientPhone", { length: 20 }),
  personType: personTypeEnum("personType"),
  reason: varchar("reason", { length: 255 }),
  retrievalDate: timestamp("retrievalDate"),
  returnPolicy: returnPolicyEnum("returnPolicy"),
  status: keyStatusEnum("status").default("retrieved"),
  returnDate: timestamp("returnDate"),
  receiverName: varchar("receiverName", { length: 255 }),
  responsibleStaff: varchar("responsibleStaff", { length: 255 }),
  acceptedTerms: boolean("acceptedTerms").default(false),
  acceptedAt: timestamp("acceptedAt"),
  acceptedBy: integer("acceptedBy"),
  createdBy: integer("createdBy"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type Key = typeof keys.$inferSelect;
export type InsertKey = typeof keys.$inferInsert;

// Enum para Histórico de Chaves
export const keyActionEnum = pgEnum("key_action", ["retrieved", "returned", "terms_signed"]);

// Tabela de Histórico de Chaves
export const keyHistory = pgTable("keyHistory", {
  id: serial("id").primaryKey(),
  keyId: integer("keyId").notNull(),
  action: keyActionEnum("action"),
  performedBy: integer("performedBy"),
  performedByName: varchar("performedByName", { length: 255 }),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type KeyHistory = typeof keyHistory.$inferSelect;
export type InsertKeyHistory = typeof keyHistory.$inferInsert;

// Enum para Agendamentos
export const appointmentStatusEnum = pgEnum("appointment_status", ["scheduled", "completed", "cancelled"]);

// Tabela de Agendamentos
export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  consultantId: integer("consultantId"),
  consultantName: varchar("consultantName", { length: 255 }),
  clientName: varchar("clientName", { length: 255 }).notNull(),
  clientPhone: varchar("clientPhone", { length: 20 }),
  propertyCode: varchar("propertyCode", { length: 100 }),
  address: text("address"),
  scheduledAt: timestamp("scheduledAt").notNull(),
  durationMinutes: integer("durationMinutes").default(90),
  observacoes: text("observacoes"),
  status: appointmentStatusEnum("status").default("scheduled"),
  createdBy: integer("createdBy"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type Appointment = typeof appointments.$inferSelect;
export type InsertAppointment = typeof appointments.$inferInsert;

// Enum para Relatórios
export const reportTypeEnum = pgEnum("report_type", [
  "reservations",
  "contracts",
  "keys",
  "appointments",
  "general"
]);

// Tabela de Relatórios
export const reports = pgTable("reports", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  type: reportTypeEnum("type"),
  startDate: timestamp("startDate"),
  endDate: timestamp("endDate"),
  data: text("data"),
  generatedBy: integer("generatedBy"),
  generatedByName: varchar("generatedByName", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type Report = typeof reports.$inferSelect;
export type InsertReport = typeof reports.$inferInsert;

// Enum para Atividades
export const activityTypeEnum = pgEnum("activity_type", [
  "reservation_created",
  "contract_updated",
  "key_retrieved",
  "key_returned",
  "appointment_scheduled",
  "report_generated",
  "terms_signed"
]);

// Tabela de Atividades (para Overview)
export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  userId: integer("userId"),
  userName: varchar("userName", { length: 255 }),
  activityType: activityTypeEnum("activityType"),
  description: text("description"),
  relatedId: integer("relatedId"),
  relatedType: varchar("relatedType", { length: 50 }),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type Activity = typeof activities.$inferSelect;
export type InsertActivity = typeof activities.$inferInsert;

// Relações
export const usersRelations = relations(users, ({ many }) => ({
  reservations: many(reservations),
  contracts: many(contracts),
  keys: many(keys),
  appointments: many(appointments),
  reports: many(reports),
  activities: many(activities),
}));

export const reservationsRelations = relations(reservations, ({ one }) => ({
  createdByUser: one(users, {
    fields: [reservations.createdBy],
    references: [users.id],
  }),
}));

export const contractsRelations = relations(contracts, ({ one }) => ({
  createdByUser: one(users, {
    fields: [contracts.createdBy],
    references: [users.id],
  }),
}));

export const keysRelations = relations(keys, ({ one, many }) => ({
  createdByUser: one(users, {
    fields: [keys.createdBy],
    references: [users.id],
  }),
  acceptedByUser: one(users, {
    fields: [keys.acceptedBy],
    references: [users.id],
  }),
  history: many(keyHistory),
}));

export const keyHistoryRelations = relations(keyHistory, ({ one }) => ({
  key: one(keys, {
    fields: [keyHistory.keyId],
    references: [keys.id],
  }),
}));

export const appointmentsRelations = relations(appointments, ({ one }) => ({
  createdByUser: one(users, {
    fields: [appointments.createdBy],
    references: [users.id],
  }),
}));

export const reportsRelations = relations(reports, ({ one }) => ({
  generatedByUser: one(users, {
    fields: [reports.generatedBy],
    references: [users.id],
  }),
}));

export const activitiesRelations = relations(activities, ({ one }) => ({
  user: one(users, {
    fields: [activities.userId],
    references: [users.id],
  }),
}));
