import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Calendar, FileText, Key, Clock, TrendingUp, Users } from "lucide-react";

// Mock data para gráficos
const reservationData = [
  { month: "Jan", total: 24, pending: 8, completed: 16 },
  { month: "Fev", total: 32, pending: 12, completed: 20 },
  { month: "Mar", total: 28, pending: 10, completed: 18 },
  { month: "Abr", total: 35, pending: 15, completed: 20 },
  { month: "Mai", total: 42, pending: 18, completed: 24 },
  { month: "Jun", total: 38, pending: 14, completed: 24 },
];

const contractStatusData = [
  { name: "Pendente", value: 12, color: "#f59e0b" },
  { name: "Em Elaboração", value: 8, color: "#3b82f6" },
  { name: "Assinado", value: 35, color: "#10b981" },
  { name: "Concluído", value: 28, color: "#6366f1" },
];

const keyMovementData = [
  { date: "01/06", retrieved: 5, returned: 3 },
  { date: "02/06", retrieved: 4, returned: 4 },
  { date: "03/06", retrieved: 6, returned: 2 },
  { date: "04/06", retrieved: 3, returned: 5 },
  { date: "05/06", retrieved: 7, returned: 6 },
  { date: "06/06", retrieved: 4, returned: 3 },
];

const COLORS = ["#f59e0b", "#3b82f6", "#10b981", "#6366f1"];

export default function Dashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const [, navigate] = useLocation();

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

  const isGestor = user?.role === "gestor";

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-600 mt-1">Bem-vindo, {user?.name}</p>
          </div>
          {isGestor && (
            <div className="flex gap-2">
              <Button variant="outline">Exportar Relatório</Button>
              <Button>Novo Registro</Button>
            </div>
          )}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 font-medium">Reservas Ativas</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">24</p>
                  <p className="text-xs text-green-600 mt-1">↑ 12% vs mês anterior</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 font-medium">Contratos</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">83</p>
                  <p className="text-xs text-green-600 mt-1">↑ 8% vs mês anterior</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 font-medium">Chaves em Circulação</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">12</p>
                  <p className="text-xs text-amber-600 mt-1">3 pendentes de devolução</p>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Key className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 font-medium">Agendamentos</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">7</p>
                  <p className="text-xs text-slate-600 mt-1">Próximos 7 dias</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <Tabs defaultValue="reservations" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="reservations">Reservas</TabsTrigger>
            <TabsTrigger value="contracts">Contratos</TabsTrigger>
            <TabsTrigger value="keys">Chaves</TabsTrigger>
          </TabsList>

          <TabsContent value="reservations" className="space-y-4">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Reservas por Mês</CardTitle>
                <CardDescription>Tendência de reservas nos últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={reservationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pending" stackId="a" fill="#f59e0b" name="Pendentes" />
                    <Bar dataKey="completed" stackId="a" fill="#10b981" name="Concluídas" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contracts" className="space-y-4">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Status dos Contratos</CardTitle>
                <CardDescription>Distribuição de contratos por status</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={contractStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {contractStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="keys" className="space-y-4">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Movimentação de Chaves</CardTitle>
                <CardDescription>Retiradas e devoluções nos últimos 6 dias</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={keyMovementData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="retrieved" stroke="#3b82f6" name="Retiradas" strokeWidth={2} />
                    <Line type="monotone" dataKey="returned" stroke="#10b981" name="Devoluções" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Activity Section */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Atividades Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Reserva criada", user: "João Silva", time: "há 2 horas", type: "reservation" },
                { action: "Contrato assinado", user: "Maria Santos", time: "há 4 horas", type: "contract" },
                { action: "Chave devolvida", user: "Pedro Costa", time: "há 6 horas", type: "key" },
                { action: "Agendamento confirmado", user: "Ana Oliveira", time: "há 1 dia", type: "appointment" },
              ].map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                      <p className="text-xs text-slate-600">por {activity.user}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
