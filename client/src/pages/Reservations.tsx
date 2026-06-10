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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit2, Trash2, Eye } from "lucide-react";

const statusColors: Record<string, string> = {
  pending_docs: "bg-yellow-100 text-yellow-800",
  pending_review: "bg-blue-100 text-blue-800",
  pending_signature: "bg-purple-100 text-purple-800",
  contract_signed: "bg-green-100 text-green-800",
  withdrawal: "bg-red-100 text-red-800",
};

const statusLabels: Record<string, string> = {
  pending_docs: "Aguardando Docs",
  pending_review: "Em Revisão",
  pending_signature: "Pendente Assinatura",
  contract_signed: "Contrato Assinado",
  withdrawal: "Desistência",
};

const mockReservations = [
  {
    id: 1,
    propertyCode: "RES-2024-001",
    address: "Rua das Flores, 123 - Belo Horizonte",
    clientName: "João Silva",
    clientPhone: "(31) 99999-1111",
    ownerName: "Maria Santos",
    consultantName: "Pedro Costa",
    status: "contract_signed",
    leaseValue: 2500,
    createdAt: "2026-06-01",
  },
  {
    id: 2,
    propertyCode: "RES-2024-002",
    address: "Avenida Brasil, 456 - Savassi",
    clientName: "Ana Oliveira",
    clientPhone: "(31) 99999-2222",
    ownerName: "Carlos Mendes",
    consultantName: "João Santos",
    status: "pending_signature",
    leaseValue: 3200,
    createdAt: "2026-06-02",
  },
  {
    id: 3,
    propertyCode: "RES-2024-003",
    address: "Rua Paraíba, 789 - Funcionários",
    clientName: "Lucas Ferreira",
    clientPhone: "(31) 99999-3333",
    ownerName: "Fernanda Costa",
    consultantName: "Pedro Costa",
    status: "pending_review",
    leaseValue: 2800,
    createdAt: "2026-06-03",
  },
  {
    id: 4,
    propertyCode: "RES-2024-004",
    address: "Avenida Getúlio Vargas, 1000 - Centro",
    clientName: "Patricia Lima",
    clientPhone: "(31) 99999-4444",
    ownerName: "Roberto Alves",
    consultantName: "Ana Silva",
    status: "pending_docs",
    leaseValue: 3500,
    createdAt: "2026-06-04",
  },
];

export default function Reservations() {
  const { user, isAuthenticated, loading } = useAuth();
  const [, navigate] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
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

  const filteredReservations = mockReservations.filter((reservation) => {
    const matchesSearch =
      reservation.propertyCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || reservation.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Gerenciamento de Reservas</h1>
            <p className="text-slate-600 mt-1">Total de {mockReservations.length} reservas cadastradas</p>
          </div>
          {user?.role === "gestor" && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Nova Reserva
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Criar Nova Reserva</DialogTitle>
                  <DialogDescription>Preencha os dados da nova reserva</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="propertyCode">Código do Imóvel</Label>
                      <Input id="propertyCode" placeholder="RES-2024-005" />
                    </div>
                    <div>
                      <Label htmlFor="leaseValue">Valor de Locação</Label>
                      <Input id="leaseValue" type="number" placeholder="2500.00" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Endereço</Label>
                    <Input id="address" placeholder="Rua/Avenida, número - Bairro" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="clientName">Nome do Cliente</Label>
                      <Input id="clientName" placeholder="Nome completo" />
                    </div>
                    <div>
                      <Label htmlFor="clientPhone">Telefone</Label>
                      <Input id="clientPhone" placeholder="(31) 99999-9999" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ownerName">Nome do Proprietário</Label>
                      <Input id="ownerName" placeholder="Nome completo" />
                    </div>
                    <div>
                      <Label htmlFor="consultantName">Consultor/Corretor</Label>
                      <Input id="consultantName" placeholder="Nome do consultor" />
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end mt-6">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button>Criar Reserva</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Buscar por código, cliente ou endereço..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="pending_docs">Aguardando Docs</SelectItem>
                  <SelectItem value="pending_review">Em Revisão</SelectItem>
                  <SelectItem value="pending_signature">Pendente Assinatura</SelectItem>
                  <SelectItem value="contract_signed">Contrato Assinado</SelectItem>
                  <SelectItem value="withdrawal">Desistência</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Reservas Cadastradas</CardTitle>
            <CardDescription>Listagem completa de todas as reservas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200">
                    <TableHead>Código</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Endereço</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReservations.map((reservation) => (
                    <TableRow key={reservation.id} className="border-slate-200 hover:bg-slate-50">
                      <TableCell className="font-medium text-slate-900">{reservation.propertyCode}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-slate-900">{reservation.clientName}</p>
                          <p className="text-xs text-slate-600">{reservation.clientPhone}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600">{reservation.address}</TableCell>
                      <TableCell className="font-medium">R$ {reservation.leaseValue.toLocaleString("pt-BR")}</TableCell>
                      <TableCell>
                        <Badge className={statusColors[reservation.status]}>
                          {statusLabels[reservation.status]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600">{reservation.createdAt}</TableCell>
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
      </div>
    </DashboardLayout>
  );
}
