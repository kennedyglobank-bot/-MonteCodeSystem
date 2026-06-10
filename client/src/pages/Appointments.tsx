import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Calendar, Clock, MapPin, User, Edit2, Trash2, Eye } from "lucide-react";

const appointmentStatusColors: Record<string, string> = {
  scheduled: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const appointmentStatusLabels: Record<string, string> = {
  scheduled: "Agendado",
  completed: "Concluído",
  cancelled: "Cancelado",
};

const mockAppointments = [
  {
    id: 1,
    consultantName: "Pedro Costa",
    clientName: "João Silva",
    clientPhone: "(31) 99999-1111",
    propertyCode: "RES-2024-001",
    address: "Rua das Flores, 123 - Belo Horizonte",
    scheduledAt: "2026-06-14 10:00",
    durationMinutes: 90,
    observacoes: "Vistoria completa do imóvel",
    status: "scheduled",
  },
  {
    id: 2,
    consultantName: "Ana Silva",
    clientName: "Maria Santos",
    clientPhone: "(31) 99999-2222",
    propertyCode: "RES-2024-002",
    address: "Avenida Brasil, 456 - Savassi",
    scheduledAt: "2026-06-15 14:00",
    durationMinutes: 60,
    observacoes: "Assinatura de contrato",
    status: "scheduled",
  },
  {
    id: 3,
    consultantName: "João Santos",
    clientName: "Lucas Ferreira",
    clientPhone: "(31) 99999-3333",
    propertyCode: "RES-2024-003",
    address: "Rua Paraíba, 789 - Funcionários",
    scheduledAt: "2026-06-12 11:30",
    durationMinutes: 45,
    observacoes: "Entrega de chaves",
    status: "completed",
  },
  {
    id: 4,
    consultantName: "Pedro Costa",
    clientName: "Patricia Lima",
    clientPhone: "(31) 99999-4444",
    propertyCode: "RES-2024-004",
    address: "Avenida Getúlio Vargas, 1000 - Centro",
    scheduledAt: "2026-06-10 09:00",
    durationMinutes: 120,
    observacoes: "Vistoria com cliente",
    status: "cancelled",
  },
];

export default function Appointments() {
  const { user, isAuthenticated, loading } = useAuth();
  const [, navigate] = useLocation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const upcomingAppointments = mockAppointments.filter((apt) => apt.status === "scheduled");
  const completedAppointments = mockAppointments.filter((apt) => apt.status === "completed");

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Gerenciamento de Agendamentos</h1>
            <p className="text-slate-600 mt-1">Total de {mockAppointments.length} agendamentos</p>
          </div>
          {user?.role === "gestor" && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Novo Agendamento
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Criar Novo Agendamento</DialogTitle>
                  <DialogDescription>Preencha os dados do agendamento</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="consultantName">Consultor</Label>
                      <Input id="consultantName" placeholder="Nome do consultor" />
                    </div>
                    <div>
                      <Label htmlFor="clientName">Cliente</Label>
                      <Input id="clientName" placeholder="Nome do cliente" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="clientPhone">Telefone</Label>
                      <Input id="clientPhone" placeholder="(31) 99999-9999" />
                    </div>
                    <div>
                      <Label htmlFor="propertyCode">Código do Imóvel</Label>
                      <Input id="propertyCode" placeholder="RES-2024-005" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Endereço</Label>
                    <Input id="address" placeholder="Rua/Avenida, número - Bairro" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="scheduledAt">Data e Hora</Label>
                      <Input id="scheduledAt" type="datetime-local" />
                    </div>
                    <div>
                      <Label htmlFor="durationMinutes">Duração (minutos)</Label>
                      <Input id="durationMinutes" type="number" placeholder="90" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="observacoes">Observações</Label>
                    <Textarea id="observacoes" placeholder="Detalhes adicionais do agendamento" className="min-h-24" />
                  </div>
                  <div className="flex gap-2 justify-end mt-6">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button>Criar Agendamento</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-slate-600 font-medium">Agendamentos</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{upcomingAppointments.length}</p>
                <p className="text-xs text-blue-600 mt-1">Próximos compromissos</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-slate-600 font-medium">Concluídos</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{completedAppointments.length}</p>
                <p className="text-xs text-green-600 mt-1">Neste mês</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-slate-600 font-medium">Total</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{mockAppointments.length}</p>
                <p className="text-xs text-slate-600 mt-1">Todos os agendamentos</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Appointments */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Próximos Agendamentos
            </CardTitle>
            <CardDescription>Compromissos programados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200">
                    <TableHead>Data e Hora</TableHead>
                    <TableHead>Consultor</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Endereço</TableHead>
                    <TableHead>Duração</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingAppointments.map((appointment) => (
                    <TableRow key={appointment.id} className="border-slate-200 hover:bg-slate-50">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span className="font-medium text-slate-900">{appointment.scheduledAt}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-slate-400" />
                          {appointment.consultantName}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-slate-900">{appointment.clientName}</p>
                          <p className="text-xs text-slate-600">{appointment.clientPhone}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-start gap-1">
                          <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-600">{appointment.address}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-slate-400" />
                          {appointment.durationMinutes}min
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={appointmentStatusColors[appointment.status]}>
                          {appointmentStatusLabels[appointment.status]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button size="sm" variant="ghost" className="gap-1">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {user?.role === "gestor" && (
                            <>
                              <Button size="sm" variant="ghost" className="gap-1">
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="gap-1 text-red-600 hover:text-red-700">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Completed Appointments */}
        {completedAppointments.length > 0 && (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Agendamentos Concluídos</CardTitle>
              <CardDescription>Histórico de compromissos realizados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {completedAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-start gap-4 p-3 bg-slate-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{appointment.clientName}</p>
                      <p className="text-sm text-slate-600 mt-1">{appointment.observacoes}</p>
                      <p className="text-xs text-slate-500 mt-2">{appointment.scheduledAt}</p>
                    </div>
                    <Badge className={appointmentStatusColors[appointment.status]}>
                      {appointmentStatusLabels[appointment.status]}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
