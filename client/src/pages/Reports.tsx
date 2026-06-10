import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { Download, Filter, FileText } from "lucide-react";

const reportTypes = [
  { value: "all", label: "Todos os Relatórios" },
  { value: "reservations", label: "Relatório de Reservas" },
  { value: "contracts", label: "Relatório de Contratos" },
  { value: "keys", label: "Relatório de Chaves" },
  { value: "appointments", label: "Relatório de Agendamentos" },
  { value: "financial", label: "Relatório Financeiro" },
];

const mockReports = [
  {
    id: 1,
    title: "Relatório de Reservas - Junho 2026",
    type: "reservations",
    createdAt: "2026-06-10",
    createdBy: "Pedro Costa",
    period: "01/06 - 10/06/2026",
    records: 24,
    status: "completed",
  },
  {
    id: 2,
    title: "Relatório de Contratos - Maio 2026",
    type: "contracts",
    createdAt: "2026-06-05",
    createdBy: "Ana Silva",
    period: "01/05 - 31/05/2026",
    records: 18,
    status: "completed",
  },
  {
    id: 3,
    title: "Relatório de Movimentação de Chaves",
    type: "keys",
    createdAt: "2026-06-08",
    createdBy: "João Santos",
    period: "01/06 - 08/06/2026",
    records: 42,
    status: "completed",
  },
  {
    id: 4,
    title: "Relatório Financeiro - Q2 2026",
    type: "financial",
    createdAt: "2026-06-01",
    createdBy: "Mariana Souza",
    period: "01/04 - 30/06/2026",
    records: 156,
    status: "completed",
  },
  {
    id: 5,
    title: "Relatório de Agendamentos - Junho 2026",
    type: "appointments",
    createdAt: "2026-06-10",
    createdBy: "Roberto Alves",
    period: "01/06 - 10/06/2026",
    records: 31,
    status: "completed",
  },
];

const monthlyReservationData = [
  { month: "Jan", reservas: 18, contratos: 12, chaves: 25 },
  { month: "Fev", reservas: 22, contratos: 15, chaves: 28 },
  { month: "Mar", reservas: 28, contratos: 20, chaves: 35 },
  { month: "Abr", reservas: 35, contratos: 25, chaves: 42 },
  { month: "Mai", reservas: 42, contratos: 30, chaves: 48 },
  { month: "Jun", reservas: 24, contratos: 18, chaves: 31 },
];

const financialData = [
  { month: "Jan", revenue: 45000, expenses: 12000 },
  { month: "Fev", revenue: 52000, expenses: 14000 },
  { month: "Mar", revenue: 61000, expenses: 16000 },
  { month: "Abr", revenue: 73000, expenses: 18000 },
  { month: "Mai", revenue: 85000, expenses: 20000 },
  { month: "Jun", revenue: 58000, expenses: 15000 },
];

export default function Reports() {
  const { user, isAuthenticated, loading } = useAuth();
  const [, navigate] = useLocation();
  const [reportType, setReportType] = useState("all");
  const [dateFrom, setDateFrom] = useState("2026-06-01");
  const [dateTo, setDateTo] = useState("2026-06-10");

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  const filteredReports = mockReports.filter((report) => reportType === "all" || report.type === reportType);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Relatórios</h1>
          <p className="text-slate-600 mt-1">Análise e histórico de atividades do sistema</p>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="reportType">Tipo de Relatório</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger id="reportType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dateFrom">Data Inicial</Label>
                <Input id="dateFrom" type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="dateTo">Data Final</Label>
                <Input id="dateTo" type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
              </div>
              <div className="flex items-end">
                <Button className="w-full gap-2">
                  <Filter className="w-4 h-4" />
                  Aplicar Filtros
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Atividades por Mês</CardTitle>
              <CardDescription>Comparativo de reservas, contratos e chaves</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyReservationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="reservas" fill="#3b82f6" name="Reservas" />
                  <Bar dataKey="contratos" fill="#10b981" name="Contratos" />
                  <Bar dataKey="chaves" fill="#f59e0b" name="Chaves" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Análise Financeira</CardTitle>
              <CardDescription>Receita vs Despesas</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={financialData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `R$ ${value.toLocaleString("pt-BR")}`} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#10b981" name="Receita" strokeWidth={2} />
                  <Line type="monotone" dataKey="expenses" stroke="#ef4444" name="Despesas" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Reports List */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Relatórios Disponíveis
            </CardTitle>
            <CardDescription>Histórico de relatórios gerados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200">
                    <TableHead>Título</TableHead>
                    <TableHead>Período</TableHead>
                    <TableHead>Registros</TableHead>
                    <TableHead>Gerado por</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id} className="border-slate-200 hover:bg-slate-50">
                      <TableCell className="font-medium text-slate-900">{report.title}</TableCell>
                      <TableCell className="text-sm text-slate-600">{report.period}</TableCell>
                      <TableCell className="font-medium">{report.records}</TableCell>
                      <TableCell className="text-sm text-slate-600">{report.createdBy}</TableCell>
                      <TableCell className="text-sm text-slate-600">{report.createdAt}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">Concluído</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button size="sm" variant="outline" className="gap-1">
                            <Download className="w-4 h-4" />
                            PDF
                          </Button>
                          <Button size="sm" variant="outline" className="gap-1">
                            <Download className="w-4 h-4" />
                            Excel
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-slate-600 font-medium">Total de Reservas</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">169</p>
                <p className="text-xs text-slate-500 mt-1">Neste período</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-slate-600 font-medium">Total de Contratos</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">120</p>
                <p className="text-xs text-slate-500 mt-1">Neste período</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-slate-600 font-medium">Receita Total</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">R$ 374K</p>
                <p className="text-xs text-green-600 mt-1">↑ 8% vs período anterior</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-slate-600 font-medium">Taxa de Conclusão</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">94%</p>
                <p className="text-xs text-slate-500 mt-1">Contratos finalizados</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
