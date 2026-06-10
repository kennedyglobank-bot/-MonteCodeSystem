import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, FileText, Key, Clock, AlertCircle, CheckCircle2, Clock3 } from "lucide-react";

export default function Overview() {
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

  const recentActivities = [
    {
      id: 1,
      type: "reservation",
      title: "Nova Reserva Criada",
      description: "Imóvel código RES-2024-001 - Cliente: João Silva",
      timestamp: "há 2 horas",
      status: "completed",
      icon: Calendar,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      type: "contract",
      title: "Contrato Assinado",
      description: "Contrato CON-2024-045 - Locação Residencial",
      timestamp: "há 4 horas",
      status: "completed",
      icon: FileText,
      color: "bg-green-100 text-green-600",
    },
    {
      id: 3,
      type: "key",
      title: "Chave Devolvida",
      description: "Chave CH-001 - Devolvida por Pedro Costa",
      timestamp: "há 6 horas",
      status: "completed",
      icon: Key,
      color: "bg-amber-100 text-amber-600",
    },
    {
      id: 4,
      type: "appointment",
      title: "Agendamento Confirmado",
      description: "Vistoria do imóvel - Data: 15/06/2026 às 14:00",
      timestamp: "há 8 horas",
      status: "pending",
      icon: Clock,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: 5,
      type: "key",
      title: "Termo de Chave Assinado",
      description: "Assinatura digital - Chave CH-005 - Cliente: Ana Oliveira",
      timestamp: "há 1 dia",
      status: "completed",
      icon: FileText,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      id: 6,
      type: "reservation",
      title: "Documentação Recebida",
      description: "Reserva RES-2024-002 - Documentação completa enviada",
      timestamp: "há 1 dia",
      status: "completed",
      icon: Calendar,
      color: "bg-cyan-100 text-cyan-600",
    },
  ];

  const pendingTasks = [
    {
      id: 1,
      title: "Revisar Documentação",
      description: "Reserva RES-2024-003 aguardando análise jurídica",
      priority: "high",
      dueDate: "15/06/2026",
    },
    {
      id: 2,
      title: "Enviar Contrato",
      description: "Contrato CON-2024-046 pronto para envio",
      priority: "medium",
      dueDate: "16/06/2026",
    },
    {
      id: 3,
      title: "Devolução de Chave",
      description: "Chave CH-003 - Prazo de devolução vencendo",
      priority: "high",
      dueDate: "14/06/2026",
    },
    {
      id: 4,
      title: "Confirmar Agendamento",
      description: "Vistoria do imóvel - Aguardando confirmação do cliente",
      priority: "medium",
      dueDate: "17/06/2026",
    },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      title: "Vistoria do Imóvel",
      date: "14/06/2026",
      time: "10:00",
      location: "Rua das Flores, 123 - Belo Horizonte",
      client: "Maria Santos",
      status: "confirmed",
    },
    {
      id: 2,
      title: "Assinatura de Contrato",
      date: "15/06/2026",
      time: "14:00",
      location: "Escritório Central",
      client: "João Silva",
      status: "pending",
    },
    {
      id: 3,
      title: "Entrega de Chaves",
      date: "16/06/2026",
      time: "11:00",
      location: "Imóvel - Avenida Brasil, 456",
      client: "Pedro Costa",
      status: "confirmed",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Overview</h1>
          <p className="text-slate-600 mt-1">Resumo de atividades e tarefas pendentes</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-slate-600 font-medium">Tarefas Pendentes</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">4</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-slate-600 font-medium">Agendamentos</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">3</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-slate-600 font-medium">Chaves em Circulação</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">5</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-slate-600 font-medium">Atividades Hoje</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">2</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="activities" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="activities">Atividades Recentes</TabsTrigger>
            <TabsTrigger value="tasks">Tarefas Pendentes</TabsTrigger>
            <TabsTrigger value="appointments">Próximos Agendamentos</TabsTrigger>
          </TabsList>

          {/* Atividades Recentes */}
          <TabsContent value="activities" className="space-y-4">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Atividades Recentes</CardTitle>
                <CardDescription>Últimas operações realizadas no sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => {
                    const IconComponent = activity.icon;
                    return (
                      <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${activity.color}`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-slate-900">{activity.title}</p>
                            <Badge variant={activity.status === "completed" ? "default" : "secondary"} className="text-xs">
                              {activity.status === "completed" ? "Concluído" : "Pendente"}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 mt-1">{activity.description}</p>
                          <p className="text-xs text-slate-500 mt-2">{activity.timestamp}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tarefas Pendentes */}
          <TabsContent value="tasks" className="space-y-4">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Tarefas Pendentes</CardTitle>
                <CardDescription>Ações que requerem sua atenção</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingTasks.map((task) => (
                    <div key={task.id} className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                      <div className="flex-shrink-0 mt-1">
                        {task.priority === "high" ? (
                          <AlertCircle className="w-5 h-5 text-red-500" />
                        ) : (
                          <Clock3 className="w-5 h-5 text-amber-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-slate-900">{task.title}</p>
                          <Badge variant={task.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                            {task.priority === "high" ? "Urgente" : "Normal"}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 mt-1">{task.description}</p>
                        <p className="text-xs text-slate-500 mt-2">Vencimento: {task.dueDate}</p>
                      </div>
                      <Button size="sm" variant="outline" className="flex-shrink-0">
                        Atender
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Próximos Agendamentos */}
          <TabsContent value="appointments" className="space-y-4">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Próximos Agendamentos</CardTitle>
                <CardDescription>Compromissos programados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-start gap-4 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-slate-900">{appointment.title}</p>
                          <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"} className="text-xs">
                            {appointment.status === "confirmed" ? "Confirmado" : "Pendente"}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                          <div>
                            <p className="text-slate-600">Data e Hora</p>
                            <p className="font-medium text-slate-900">{appointment.date} às {appointment.time}</p>
                          </div>
                          <div>
                            <p className="text-slate-600">Cliente</p>
                            <p className="font-medium text-slate-900">{appointment.client}</p>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 mt-2">📍 {appointment.location}</p>
                      </div>
                      <Button size="sm" variant="outline" className="flex-shrink-0">
                        Detalhes
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
